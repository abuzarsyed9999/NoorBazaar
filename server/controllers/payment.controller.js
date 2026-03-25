// const crypto = require("crypto");
// const razorpay = require("../config/razorpay");
// const Order = require("../models/Order.model");
// const Cart = require("../models/Cart.model");
// const Product = require("../models/Product.model");
// const Coupon = require("../models/Coupon.model");
// const ErrorHandler = require("../utils/errorHandler");
// const logger = require("../utils/logger");
// const sendEmail = require("../utils/sendEmail");

// // ==============================
// // Calculate Prices Helper
// // ==============================
// const calculatePrices = (items) => {
//   const itemsPrice = items.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0,
//   );
//   const shippingPrice = itemsPrice >= 999 ? 0 : 99;
//   const taxPrice = Math.round(itemsPrice * 0.05);
//   const totalPrice = itemsPrice + shippingPrice + taxPrice;
//   return { itemsPrice, shippingPrice, taxPrice, totalPrice };
// };

// // ==============================
// // Build Order Items Helper
// // ==============================
// const buildOrderItems = (cartItems) => {
//   return cartItems.map((item) => ({
//     product: item.product._id,
//     name: item.product.name,
//     nameArabic: item.product.nameArabic,
//     image: item.product.images[0].url,
//     price: item.price,
//     quantity: item.quantity,
//   }));
// };

// // ==============================
// // Validate Cart Helper
// // ==============================
// const validateCart = async (cart, next) => {
//   if (!cart || cart.items.length === 0) {
//     return next(
//       new ErrorHandler("Cart is empty. Add items before checkout.", 400),
//     );
//   }

//   for (const item of cart.items) {
//     if (!item.product) {
//       return next(new ErrorHandler("One or more products not found", 404));
//     }
//     if (!item.product.isActive) {
//       return next(
//         new ErrorHandler(`${item.product.name} is no longer available`, 400),
//       );
//     }
//     if (item.product.stock < item.quantity) {
//       return next(
//         new ErrorHandler(
//           `Only ${item.product.stock} units of ${item.product.name} available`,
//           400,
//         ),
//       );
//     }
//   }
//   return true;
// };

// // ==============================
// // Apply Coupon Helper
// // ==============================
// const applyCouponToOrder = async (cart, couponCode, userId, totalPrice) => {
//   let discountAmount = 0;
//   let couponData = {};

//   const couponId = cart.coupon || null;
//   const coupon = couponId
//     ? await Coupon.findById(couponId)
//     : couponCode
//       ? await Coupon.findByCode(couponCode)
//       : null;

//   if (coupon) {
//     const validation = coupon.isValid(totalPrice, userId);
//     if (validation.valid) {
//       discountAmount = coupon.calculateDiscount(totalPrice);
//       couponData = {
//         code: coupon.code,
//         discountAmount,
//       };

//       // Update coupon usage
//       coupon.usedCount += 1;
//       const userUsage = coupon.usedBy.find(
//         (u) => u.user.toString() === userId.toString(),
//       );
//       if (userUsage) {
//         userUsage.usedCount += 1;
//       } else {
//         coupon.usedBy.push({ user: userId });
//       }
//       await coupon.save();
//     }
//   }

//   return { discountAmount, couponData };
// };

// // ==============================
// // Update Product Stock Helper
// // ==============================
// const updateProductStock = async (items) => {
//   for (const item of items) {
//     await Product.findByIdAndUpdate(item.product, {
//       $inc: {
//         stock: -item.quantity,
//         sold: item.quantity,
//       },
//     });
//   }
// };

// // ==============================
// // @desc    Create Razorpay Order
// // @route   POST /api/v1/payment/razorpay/create-order
// // @access  Private
// // ==============================
// exports.createRazorpayOrder = async (req, res, next) => {
//   try {
//     const { shippingAddress, couponCode, isGift, giftMessage } = req.body;

//     // Get cart
//     const cart = await Cart.findOne({ user: req.user._id }).populate(
//       "items.product",
//       "name nameArabic images price stock isActive",
//     );

//     // Validate cart
//     const isValid = await validateCart(cart, next);
//     if (!isValid) return;

//     // Build order items
//     const orderItems = buildOrderItems(cart.items);

//     // Calculate prices
//     let { itemsPrice, shippingPrice, taxPrice, totalPrice } =
//       calculatePrices(orderItems);

//     // Apply coupon
//     const { discountAmount, couponData } = await applyCouponToOrder(
//       cart,
//       couponCode,
//       req.user._id,
//       itemsPrice,
//     );

//     const finalTotal = Math.max(0, totalPrice - discountAmount);

//     // Create Razorpay order
//     const razorpayOrder = await razorpay.orders.create({
//       amount: Math.round(finalTotal * 100), // Convert to paise
//       currency: "INR",
//       receipt: `receipt_${Date.now()}`,
//       notes: {
//         userId: req.user._id.toString(),
//         userEmail: req.user.email,
//       },
//     });

//     // Create pending order in DB
//     const order = await Order.create({
//       user: req.user._id,
//       items: orderItems,
//       shippingAddress,
//       paymentMethod: "Razorpay",
//       paymentStatus: "Pending",
//       paymentInfo: {
//         razorpay_order_id: razorpayOrder.id,
//       },
//       itemsPrice,
//       shippingPrice,
//       taxPrice,
//       discountAmount,
//       totalPrice: finalTotal,
//       coupon: couponData,
//       isGift: isGift || false,
//       giftMessage: giftMessage || "",
//       statusHistory: [
//         {
//           status: "Pending",
//           timestamp: new Date(),
//           message: "Payment initiated via Razorpay",
//         },
//       ],
//     });

//     logger.info(
//       `💳 Razorpay order created: ${razorpayOrder.id} for ${req.user.email}`,
//     );

//     res.status(200).json({
//       success: true,
//       message: "Razorpay order created successfully",
//       data: {
//         razorpayOrderId: razorpayOrder.id,
//         razorpayKeyId: process.env.RAZORPAY_KEY_ID,
//         amount: razorpayOrder.amount,
//         currency: razorpayOrder.currency,
//         orderId: order._id,
//         orderNumber: order.orderNumber,
//         user: {
//           name: req.user.name,
//           email: req.user.email,
//           phone: req.user.phone,
//         },
//       },
//     });
//   } catch (error) {
//     logger.error(`Razorpay create order error: ${error.message}`);
//     next(error);
//   }
// };

// // ==============================
// // @desc    Verify Razorpay Payment
// // @route   POST /api/v1/payment/razorpay/verify
// // @access  Private
// // ==============================
// exports.verifyRazorpayPayment = async (req, res, next) => {
//   try {
//     const {
//       razorpay_order_id,
//       razorpay_payment_id,
//       razorpay_signature,
//       orderId,
//     } = req.body;

//     if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
//       return next(new ErrorHandler("Payment details are incomplete", 400));
//     }

//     // ==============================
//     // Verify Signature
//     // ==============================
//     const body = razorpay_order_id + "|" + razorpay_payment_id;
//     const expectedSignature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//       .update(body.toString())
//       .digest("hex");

//     const isSignatureValid = expectedSignature === razorpay_signature;

//     if (!isSignatureValid) {
//       // Mark order as failed
//       await Order.findByIdAndUpdate(orderId, {
//         paymentStatus: "Failed",
//         orderStatus: "Cancelled",
//       });

//       logger.warn(`❌ Invalid payment signature for order: ${orderId}`);
//       return next(
//         new ErrorHandler(
//           "Payment verification failed. Invalid signature.",
//           400,
//         ),
//       );
//     }

//     // ==============================
//     // Update Order — Payment Success
//     // ==============================
//     const order = await Order.findById(orderId);
//     if (!order) {
//       return next(new ErrorHandler("Order not found", 404));
//     }

//     order.paymentStatus = "Paid";
//     order.orderStatus = "Confirmed";
//     order.paymentInfo = {
//       razorpay_order_id,
//       razorpay_payment_id,
//       razorpay_signature,
//       paidAt: new Date(),
//     };

//     await order.save();

//     // Get cart and update stock
//     const cart = await Cart.findOne({ user: req.user._id }).populate(
//       "items.product",
//       "name stock",
//     );

//     if (cart) {
//       await updateProductStock(order.items);
//       cart.clearCart();
//       await cart.save();
//     }

//     // Send confirmation email
//     sendEmail({
//       to: req.user.email,
//       templateName: "orderConfirmation",
//       templateData: [req.user.name, order.orderNumber, order.totalPrice],
//     }).catch((err) =>
//       logger.error(`Order confirmation email failed: ${err.message}`),
//     );

//     logger.info(
//       `✅ Payment verified: ${razorpay_payment_id} for order: ${order.orderNumber}`,
//     );

//     res.status(200).json({
//       success: true,
//       message: "Payment verified successfully! JazakAllah Khair 🌙",
//       data: {
//         orderId: order._id,
//         orderNumber: order.orderNumber,
//         totalPrice: order.totalPrice,
//         paymentId: razorpay_payment_id,
//       },
//     });
//   } catch (error) {
//     logger.error(`Payment verification error: ${error.message}`);
//     next(error);
//   }
// };

// // ==============================
// // @desc    Place COD Order
// // @route   POST /api/v1/payment/cod
// // @access  Private
// // ==============================
// exports.placeCODOrder = async (req, res, next) => {
//   try {
//     const { shippingAddress, couponCode, isGift, giftMessage } = req.body;

//     // Get cart
//     const cart = await Cart.findOne({ user: req.user._id }).populate(
//       "items.product",
//       "name nameArabic images price stock isActive",
//     );

//     // Validate cart
//     const isValid = await validateCart(cart, next);
//     if (!isValid) return;

//     // Build order items
//     const orderItems = buildOrderItems(cart.items);

//     // Calculate prices
//     let { itemsPrice, shippingPrice, taxPrice, totalPrice } =
//       calculatePrices(orderItems);

//     // Apply coupon
//     const { discountAmount, couponData } = await applyCouponToOrder(
//       cart,
//       couponCode,
//       req.user._id,
//       itemsPrice,
//     );

//     const finalTotal = Math.max(0, totalPrice - discountAmount);

//     // Create order
//     const order = await Order.create({
//       user: req.user._id,
//       items: orderItems,
//       shippingAddress,
//       paymentMethod: "COD",
//       paymentStatus: "Pending",
//       itemsPrice,
//       shippingPrice,
//       taxPrice,
//       discountAmount,
//       totalPrice: finalTotal,
//       coupon: couponData,
//       isGift: isGift || false,
//       giftMessage: giftMessage || "",
//       orderStatus: "Confirmed",
//       statusHistory: [
//         {
//           status: "Confirmed",
//           timestamp: new Date(),
//           message: "COD order placed successfully",
//         },
//       ],
//     });

//     // Update product stock
//     await updateProductStock(orderItems);

//     // Clear cart
//     cart.clearCart();
//     await cart.save();

//     // Send confirmation email
//     sendEmail({
//       to: req.user.email,
//       templateName: "orderConfirmation",
//       templateData: [req.user.name, order.orderNumber, order.totalPrice],
//     }).catch((err) => logger.error(`COD order email failed: ${err.message}`));

//     logger.info(
//       `✅ COD order placed: ${order.orderNumber} by ${req.user.email}`,
//     );

//     res.status(201).json({
//       success: true,
//       message: "COD Order placed successfully! JazakAllah Khair 🌙",
//       data: order,
//     });
//   } catch (error) {
//     logger.error(`COD order error: ${error.message}`);
//     next(error);
//   }
// };

// // ==============================
// // @desc    Get Payment Status
// // @route   GET /api/v1/payment/status/:orderId
// // @access  Private
// // ==============================
// exports.getPaymentStatus = async (req, res, next) => {
//   try {
//     const order = await Order.findById(req.params.orderId);

//     if (!order) {
//       return next(new ErrorHandler("Order not found", 404));
//     }

//     // Check order belongs to user
//     if (
//       order.user.toString() !== req.user._id.toString() &&
//       req.user.role !== "admin"
//     ) {
//       return next(new ErrorHandler("Not authorized to view this order", 403));
//     }

//     res.status(200).json({
//       success: true,
//       message: "Payment status fetched successfully",
//       data: {
//         orderId: order._id,
//         orderNumber: order.orderNumber,
//         paymentMethod: order.paymentMethod,
//         paymentStatus: order.paymentStatus,
//         orderStatus: order.orderStatus,
//         totalPrice: order.totalPrice,
//         paidAt: order.paymentInfo?.paidAt,
//       },
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // ==============================
// // @desc    Razorpay Webhook
// // @route   POST /api/v1/payment/webhook
// // @access  Public (Razorpay Server)
// // ==============================
// exports.razorpayWebhook = async (req, res, next) => {
//   try {
//     const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
//     const webhookSignature = req.headers["x-razorpay-signature"];

//     if (webhookSecret) {
//       const expectedSignature = crypto
//         .createHmac("sha256", webhookSecret)
//         .update(JSON.stringify(req.body))
//         .digest("hex");

//       if (expectedSignature !== webhookSignature) {
//         logger.warn("❌ Invalid webhook signature");
//         return res.status(400).json({ success: false });
//       }
//     }

//     const event = req.body.event;
//     const payload = req.body.payload;

//     logger.info(`📡 Razorpay webhook received: ${event}`);

//     if (event === "payment.captured") {
//       const payment = payload.payment.entity;
//       await Order.findOneAndUpdate(
//         { "paymentInfo.razorpay_order_id": payment.order_id },
//         {
//           paymentStatus: "Paid",
//           orderStatus: "Confirmed",
//           "paymentInfo.paidAt": new Date(),
//           "paymentInfo.razorpay_payment_id": payment.id,
//         },
//       );
//       logger.info(
//         `✅ Webhook: Payment captured for order: ${payment.order_id}`,
//       );
//     }

//     if (event === "payment.failed") {
//       const payment = payload.payment.entity;
//       await Order.findOneAndUpdate(
//         { "paymentInfo.razorpay_order_id": payment.order_id },
//         {
//           paymentStatus: "Failed",
//           orderStatus: "Cancelled",
//         },
//       );
//       logger.warn(`❌ Webhook: Payment failed for order: ${payment.order_id}`);
//     }

//     res.status(200).json({ success: true });
//   } catch (error) {
//     logger.error(`Webhook error: ${error.message}`);
//     next(error);
//   }
// };

const Razorpay = require("razorpay");
const crypto = require("crypto");
const Order = require("../models/Order.model");
const Cart = require("../models/Cart.model");
const Product = require("../models/Product.model");
const Coupon = require("../models/Coupon.model");
const ErrorHandler = require("../utils/errorHandler");
const logger = require("../utils/logger");
const sendEmail = require("../utils/sendEmail");

// ── Init Razorpay ──
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ── Calculate Prices ──
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

// ── Apply Coupon Logic ──
const applyCouponLogic = async (cart, itemsPrice, userId) => {
  let discountAmount = 0;
  let couponData = {};

  if (cart.coupon) {
    const coupon = await Coupon.findById(cart.coupon);
    if (coupon) {
      const validation = coupon.isValid(itemsPrice, userId);
      if (validation.valid) {
        discountAmount = coupon.calculateDiscount(itemsPrice);
        couponData = { code: coupon.code, discountAmount };
        coupon.usedCount += 1;
        const userUsage = coupon.usedBy.find(
          (u) => u.user.toString() === userId.toString(),
        );
        if (userUsage) userUsage.usedCount += 1;
        else coupon.usedBy.push({ user: userId });
        await coupon.save();
      }
    }
  }
  return { discountAmount, couponData };
};

// ==============================
// @desc    Create Razorpay Order
// @route   POST /api/v1/payment/razorpay/create
// @access  Private
// ==============================
exports.createRazorpayOrder = async (req, res, next) => {
  try {
    const { shippingAddress, couponCode } = req.body;

    if (!shippingAddress) {
      return next(new ErrorHandler("Shipping address is required", 400));
    }

    // Get cart
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product",
      "name nameArabic images price stock isActive",
    );

    if (!cart || cart.items.length === 0) {
      return next(new ErrorHandler("Your cart is empty", 400));
    }

    // Validate items
    for (const item of cart.items) {
      if (!item.product) throw new ErrorHandler(`Product not found`, 404);
      if (!item.product.isActive)
        throw new ErrorHandler(`${item.product.name} is unavailable`, 400);
      if (item.product.stock < item.quantity) {
        throw new ErrorHandler(
          `Only ${item.product.stock} units of ${item.product.name} available`,
          400,
        );
      }
    }

    // Build order items
    const orderItems = cart.items.map((item) => ({
      product: item.product._id,
      name: item.product.name,
      nameArabic: item.product.nameArabic,
      image: item.product.images[0]?.url,
      price: item.price,
      quantity: item.quantity,
    }));

    let { itemsPrice, shippingPrice, taxPrice, totalPrice } =
      calculatePrices(orderItems);

    // Apply coupon
    const { discountAmount, couponData } = await applyCouponLogic(
      cart,
      itemsPrice,
      req.user._id,
    );
    const finalTotal = Math.max(0, totalPrice - discountAmount);

    // Create Razorpay order
    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(finalTotal * 100), // paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      notes: {
        userId: req.user._id.toString(),
        userName: req.user.name,
      },
    });

    logger.info(`✅ Razorpay order created: ${razorpayOrder.id}`);

    res.status(200).json({
      success: true,
      data: {
        razorpayOrderId: razorpayOrder.id,
        amount: finalTotal,
        currency: "INR",
        keyId: process.env.RAZORPAY_KEY_ID,
        // Order summary for frontend
        orderSummary: {
          orderItems,
          shippingAddress,
          itemsPrice,
          shippingPrice,
          taxPrice,
          discountAmount,
          totalPrice: finalTotal,
          coupon: couponData,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

// ==============================
// @desc    Verify Payment & Place Order
// @route   POST /api/v1/payment/razorpay/verify
// @access  Private
// ==============================
exports.verifyRazorpayPayment = async (req, res, next) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderData,
    } = req.body;

    // ── Verify Signature ──
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expected = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expected !== razorpay_signature) {
      return next(
        new ErrorHandler(
          "Payment verification failed. Invalid signature.",
          400,
        ),
      );
    }

    const {
      orderItems,
      shippingAddress,
      itemsPrice,
      shippingPrice,
      taxPrice,
      discountAmount,
      totalPrice,
      coupon,
      isGift,
      giftMessage,
    } = orderData;

    // ── Create Order ──
    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      shippingAddress,
      paymentMethod: "Online",
      paymentStatus: "Paid",
      paymentInfo: {
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
        paidAt: new Date(),
      },
      itemsPrice,
      shippingPrice,
      taxPrice,
      discountAmount: discountAmount || 0,
      totalPrice,
      coupon: coupon || {},
      isGift: isGift || false,
      giftMessage: giftMessage || "",
      orderStatus: "Confirmed",
      statusHistory: [
        { status: "Pending", timestamp: new Date(), message: "Order created" },
        {
          status: "Confirmed",
          timestamp: new Date(),
          message: "Payment verified successfully",
        },
      ],
    });

    // ── Reduce Stock ──
    for (const item of orderItems) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: -item.quantity, sold: item.quantity },
      });
    }

    // ── Clear Cart ──
    const cart = await Cart.findOne({ user: req.user._id });
    if (cart) {
      cart.clearCart();
      await cart.save();
    }

    // ── Send Email ──
    const populatedOrder = await Order.findById(order._id)
      .populate("items.product", "name images")
      .lean();

    sendEmail({
      to: req.user.email,
      templateName: "orderConfirmation",
      templateData: {
        userName: req.user.name,
        orderNumber: order.orderNumber,
        orderId: order._id,
        orderDate: new Date().toLocaleDateString("en-IN", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
        paymentMethod: "Online Payment (Razorpay)",
        items: populatedOrder.items.map((item) => ({
          name: item.product?.name || item.name,
          image: item.product?.images?.[0]?.url || item.image,
          price: item.price,
          quantity: item.quantity,
        })),
        itemsPrice,
        shippingPrice,
        taxPrice,
        discountAmount: discountAmount || 0,
        totalPrice,
        shippingAddress,
      },
    }).catch((err) => logger.error(`Email failed: ${err.message}`));

    logger.info(
      `✅ Order placed via Razorpay: ${order.orderNumber} by ${req.user.email}`,
    );

    res.status(201).json({
      success: true,
      message: "Payment verified & order placed! JazakAllah Khair 🌙",
      data: { orderId: order._id, orderNumber: order.orderNumber },
    });
  } catch (error) {
    next(error);
  }
};

// ==============================
// @desc    Place COD Order
// @route   POST /api/v1/payment/cod
// @access  Private
// ==============================
exports.placeCODOrder = async (req, res, next) => {
  try {
    const { shippingAddress, isGift, giftMessage } = req.body;

    if (!shippingAddress) {
      return next(new ErrorHandler("Shipping address is required", 400));
    }

    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product",
      "name nameArabic images price stock isActive",
    );

    if (!cart || cart.items.length === 0) {
      return next(new ErrorHandler("Your cart is empty", 400));
    }

    // Validate items
    for (const item of cart.items) {
      if (!item.product) throw new ErrorHandler("Product not found", 404);
      if (!item.product.isActive)
        throw new ErrorHandler(`${item.product.name} is unavailable`, 400);
      if (item.product.stock < item.quantity) {
        throw new ErrorHandler(
          `Only ${item.product.stock} units of ${item.product.name} available`,
          400,
        );
      }
    }

    const orderItems = cart.items.map((item) => ({
      product: item.product._id,
      name: item.product.name,
      nameArabic: item.product.nameArabic,
      image: item.product.images[0]?.url,
      price: item.price,
      quantity: item.quantity,
    }));

    let { itemsPrice, shippingPrice, taxPrice, totalPrice } =
      calculatePrices(orderItems);

    const { discountAmount, couponData } = await applyCouponLogic(
      cart,
      itemsPrice,
      req.user._id,
    );
    const finalTotal = Math.max(0, totalPrice - discountAmount);

    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      shippingAddress,
      paymentMethod: "COD",
      paymentStatus: "Pending",
      itemsPrice,
      shippingPrice,
      taxPrice,
      discountAmount,
      totalPrice: finalTotal,
      coupon: couponData,
      isGift: isGift || false,
      giftMessage: giftMessage || "",
      orderStatus: "Pending",
      statusHistory: [
        {
          status: "Pending",
          timestamp: new Date(),
          message: "Order placed successfully",
        },
      ],
    });

    // Reduce stock
    for (const item of cart.items) {
      await Product.findByIdAndUpdate(item.product._id, {
        $inc: { stock: -item.quantity, sold: item.quantity },
      });
    }

    // Clear cart
    cart.clearCart();
    await cart.save();

    // Send email
    const populatedOrder = await Order.findById(order._id)
      .populate("items.product", "name images")
      .lean();

    sendEmail({
      to: req.user.email,
      templateName: "orderConfirmation",
      templateData: {
        userName: req.user.name,
        orderNumber: order.orderNumber,
        orderId: order._id,
        orderDate: new Date().toLocaleDateString("en-IN", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
        paymentMethod: "Cash on Delivery",
        items: populatedOrder.items.map((item) => ({
          name: item.product?.name || item.name,
          image: item.product?.images?.[0]?.url || item.image,
          price: item.price,
          quantity: item.quantity,
        })),
        itemsPrice,
        shippingPrice,
        taxPrice,
        discountAmount,
        totalPrice: finalTotal,
        shippingAddress,
      },
    }).catch((err) => logger.error(`COD email failed: ${err.message}`));

    logger.info(
      `✅ COD Order placed: ${order.orderNumber} by ${req.user.email}`,
    );

    res.status(201).json({
      success: true,
      message: "Order placed successfully! JazakAllah Khair 🌙",
      data: { orderId: order._id, orderNumber: order.orderNumber },
    });
  } catch (error) {
    next(error);
  }
};

// ==============================
// @desc    Razorpay Webhook
// @route   POST /api/v1/payment/webhook
// @access  Public (Razorpay)
// ==============================
exports.handleWebhook = async (req, res, next) => {
  try {
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    if (!webhookSecret) return res.status(200).json({ received: true });

    const signature = req.headers["x-razorpay-signature"];
    const body = JSON.stringify(req.body);
    const expected = crypto
      .createHmac("sha256", webhookSecret)
      .update(body)
      .digest("hex");

    if (signature !== expected) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid webhook signature" });
    }

    const { event, payload } = req.body;
    logger.info(`📦 Razorpay webhook: ${event}`);

    if (event === "payment.failed") {
      const paymentId = payload.payment.entity.id;
      const orderId = payload.payment.entity.order_id;
      logger.warn(`❌ Payment failed: ${paymentId} for order ${orderId}`);
    }

    res.status(200).json({ received: true });
  } catch (error) {
    logger.error(`Webhook error: ${error.message}`);
    res.status(200).json({ received: true });
  }
};

// ==============================
// @desc    Get Razorpay Key
// @route   GET /api/v1/payment/razorpay/key
// @access  Private
// ==============================
exports.getRazorpayKey = (req, res) => {
  res.status(200).json({
    success: true,
    keyId: process.env.RAZORPAY_KEY_ID,
  });
};
