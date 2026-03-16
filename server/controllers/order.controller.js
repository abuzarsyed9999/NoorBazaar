const Order = require("../models/Order.model");
const Cart = require("../models/Cart.model");
const Product = require("../models/Product.model");
const Coupon = require("../models/Coupon.model");
const ErrorHandler = require("../utils/errorHandler");
const logger = require("../utils/logger");
const sendEmail = require("../utils/sendEmail");

// ==============================
// Calculate Prices
// ==============================
const calculatePrices = (items) => {
  const itemsPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shippingPrice = itemsPrice >= 999 ? 0 : 99;
  const taxPrice = Math.round(itemsPrice * 0.05);
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  return { itemsPrice, shippingPrice, taxPrice, totalPrice };
};

// ==============================
// @desc    Place Order
// @route   POST /api/v1/orders
// @access  Private
// ==============================
exports.placeOrder = async (req, res, next) => {
  try {
    const { shippingAddress, paymentMethod, isGift, giftMessage, couponCode } =
      req.body;

    // Get user cart
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product",
      "name nameArabic images price stock isActive",
    );

    if (!cart || cart.items.length === 0) {
      return next(
        new ErrorHandler(
          "Your cart is empty. Add items before placing order.",
          400,
        ),
      );
    }

    // Validate all items are available
    for (const item of cart.items) {
      if (!item.product) {
        return next(new ErrorHandler("One or more products not found", 404));
      }
      if (!item.product.isActive) {
        return next(
          new ErrorHandler(`${item.product.name} is no longer available`, 400),
        );
      }
      if (item.product.stock < item.quantity) {
        return next(
          new ErrorHandler(
            `Only ${item.product.stock} units of ${item.product.name} available`,
            400,
          ),
        );
      }
    }

    // Build order items
    const orderItems = cart.items.map((item) => ({
      product: item.product._id,
      name: item.product.name,
      nameArabic: item.product.nameArabic,
      image: item.product.images[0].url,
      price: item.price,
      quantity: item.quantity,
    }));

    // Calculate prices
    let { itemsPrice, shippingPrice, taxPrice, totalPrice } =
      calculatePrices(orderItems);

    // Apply coupon if exists
    let discountAmount = 0;
    let couponData = {};

    if (cart.coupon || couponCode) {
      const couponId = cart.coupon || null;
      const coupon = couponId
        ? await Coupon.findById(couponId)
        : await Coupon.findByCode(couponCode);

      if (coupon) {
        const validation = coupon.isValid(itemsPrice, req.user._id);
        if (validation.valid) {
          discountAmount = coupon.calculateDiscount(itemsPrice);
          totalPrice = totalPrice - discountAmount;
          couponData = {
            code: coupon.code,
            discountAmount,
          };

          // Update coupon usage
          coupon.usedCount += 1;
          const userUsage = coupon.usedBy.find(
            (u) => u.user.toString() === req.user._id.toString(),
          );
          if (userUsage) {
            userUsage.usedCount += 1;
          } else {
            coupon.usedBy.push({ user: req.user._id });
          }
          await coupon.save();
        }
      }
    }

    // Create order
    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      shippingAddress,
      paymentMethod,
      paymentStatus: paymentMethod === "COD" ? "Pending" : "Pending",
      itemsPrice,
      shippingPrice,
      taxPrice,
      discountAmount,
      totalPrice: Math.max(0, totalPrice),
      coupon: couponData,
      isGift: isGift || false,
      giftMessage: giftMessage || "",
      statusHistory: [
        {
          status: "Pending",
          timestamp: new Date(),
          message: "Order placed successfully",
        },
      ],
    });

    // Reduce stock for each product
    for (const item of cart.items) {
      await Product.findByIdAndUpdate(item.product._id, {
        $inc: {
          stock: -item.quantity,
          sold: item.quantity,
        },
      });
    }

    // Clear cart after order
    cart.clearCart();
    await cart.save();

    // Send confirmation email (non-blocking)
    sendEmail({
      to: req.user.email,
      templateName: "orderConfirmation",
      templateData: [req.user.name, order.orderNumber, order.totalPrice],
    }).catch((err) => logger.error(`Order email failed: ${err.message}`));

    logger.info(`✅ Order placed: ${order.orderNumber} by ${req.user.email}`);

    res.status(201).json({
      success: true,
      message: "Order placed successfully! JazakAllah Khair 🌙",
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

// ==============================
// @desc    Get My Orders
// @route   GET /api/v1/orders/my-orders
// @access  Private
// ==============================
exports.getMyOrders = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await Order.countDocuments({ user: req.user._id });
    const orders = await Order.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("items.product", "name images slug");

    res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      count: orders.length,
      total,
      pagination: {
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
      data: orders,
    });
  } catch (error) {
    next(error);
  }
};

// ==============================
// @desc    Get Single Order
// @route   GET /api/v1/orders/:id
// @access  Private
// ==============================
exports.getSingleOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "name email phone")
      .populate("items.product", "name images slug");

    if (!order) {
      return next(new ErrorHandler("Order not found", 404));
    }

    // Check order belongs to user or is admin
    if (
      order.user._id.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return next(new ErrorHandler("Not authorized to view this order", 403));
    }

    res.status(200).json({
      success: true,
      message: "Order fetched successfully",
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

// ==============================
// @desc    Cancel Order
// @route   PUT /api/v1/orders/:id/cancel
// @access  Private
// ==============================
exports.cancelOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return next(new ErrorHandler("Order not found", 404));
    }

    // Check order belongs to user
    if (order.user.toString() !== req.user._id.toString()) {
      return next(new ErrorHandler("Not authorized to cancel this order", 403));
    }

    // Check if order can be cancelled
    if (!order.isCancellable) {
      return next(
        new ErrorHandler(
          `Order cannot be cancelled. Current status: ${order.orderStatus}`,
          400,
        ),
      );
    }

    // Restore stock
    for (const item of order.items) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: {
          stock: item.quantity,
          sold: -item.quantity,
        },
      });
    }

    order.orderStatus = "Cancelled";
    order.cancellationReason = req.body.reason || "Cancelled by user";
    await order.save();

    logger.info(`🚫 Order cancelled: ${order.orderNumber}`);

    res.status(200).json({
      success: true,
      message: "Order cancelled successfully",
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

// ==============================
// @desc    Get All Orders (Admin)
// @route   GET /api/v1/orders/admin/all
// @access  Admin
// ==============================
exports.getAllOrders = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const status = req.query.status;

    const filter = status ? { orderStatus: status } : {};
    const total = await Order.countDocuments(filter);

    const orders = await Order.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user", "name email phone");

    // Revenue stats
    const stats = await Order.getRevenueStats();

    res.status(200).json({
      success: true,
      message: "All orders fetched successfully",
      count: orders.length,
      total,
      pagination: {
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
      stats: stats[0] || {
        totalRevenue: 0,
        totalOrders: 0,
        avgOrderValue: 0,
      },
      data: orders,
    });
  } catch (error) {
    next(error);
  }
};

// ==============================
// @desc    Update Order Status (Admin)
// @route   PUT /api/v1/orders/admin/:id/status
// @access  Admin
// ==============================
exports.updateOrderStatus = async (req, res, next) => {
  try {
    const { orderStatus, message, trackingNumber, trackingUrl } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return next(new ErrorHandler("Order not found", 404));
    }

    // Prevent invalid status transitions
    const statusFlow = {
      Pending: ["Confirmed", "Cancelled"],
      Confirmed: ["Processing", "Cancelled"],
      Processing: ["Shipped", "Cancelled"],
      Shipped: ["Delivered"],
      Delivered: ["Refunded"],
      Cancelled: [],
      Refunded: [],
    };

    const allowedStatuses = statusFlow[order.orderStatus];
    if (!allowedStatuses.includes(orderStatus)) {
      return next(
        new ErrorHandler(
          `Cannot change status from ${order.orderStatus} to ${orderStatus}`,
          400,
        ),
      );
    }

    order.orderStatus = orderStatus;

    if (trackingNumber) order.trackingNumber = trackingNumber;
    if (trackingUrl) order.trackingUrl = trackingUrl;

    // Update payment status for COD delivered
    if (orderStatus === "Delivered" && order.paymentMethod === "COD") {
      order.paymentStatus = "Paid";
      order.paymentInfo.paidAt = new Date();
    }

    // Add message to status history
    if (message) {
      order.statusHistory[order.statusHistory.length - 1].message = message;
    }

    await order.save();

    logger.info(
      `✅ Order ${order.orderNumber} status updated to ${orderStatus}`,
    );

    res.status(200).json({
      success: true,
      message: `Order status updated to ${orderStatus}`,
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

// ==============================
// @desc    Get Monthly Sales (Admin)
// @route   GET /api/v1/orders/admin/sales
// @access  Admin
// ==============================
exports.getMonthlySales = async (req, res, next) => {
  try {
    const year = req.query.year || new Date().getFullYear();
    const sales = await Order.getMonthlySales(year);

    res.status(200).json({
      success: true,
      message: "Monthly sales fetched successfully",
      year,
      data: sales,
    });
  } catch (error) {
    next(error);
  }
};
