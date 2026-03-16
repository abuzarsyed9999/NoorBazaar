const Cart = require("../models/Cart.model");
const Product = require("../models/Product.model");
const Coupon = require("../models/Coupon.model");
const ErrorHandler = require("../utils/errorHandler");
const logger = require("../utils/logger");

// ==============================
// @desc    Get My Cart
// @route   GET /api/v1/cart
// @access  Private
// ==============================
exports.getCart = async (req, res, next) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id })
      .populate(
        "items.product",
        "name nameArabic images price stock slug isActive",
      )
      .populate("coupon", "code discountType discountValue");

    // Create empty cart if not exists
    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        items: [],
      });
    }

    res.status(200).json({
      success: true,
      message: "Cart fetched successfully",
      data: cart,
    });
  } catch (error) {
    next(error);
  }
};

// ==============================
// @desc    Add Item To Cart
// @route   POST /api/v1/cart/add
// @access  Private
// ==============================
exports.addToCart = async (req, res, next) => {
  try {
    const { productId, quantity = 1 } = req.body;

    if (!productId) {
      return next(new ErrorHandler("Product ID is required", 400));
    }

    // Check product exists and is active
    const product = await Product.findById(productId);
    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }
    if (!product.isActive) {
      return next(new ErrorHandler("Product is not available", 400));
    }
    if (product.stock < quantity) {
      return next(
        new ErrorHandler(`Only ${product.stock} units available in stock`, 400),
      );
    }

    // Get or create cart
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        items: [],
      });
    }

    // Check if item already in cart
    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId,
    );

    if (existingItem) {
      // Check stock for updated quantity
      const newQuantity = existingItem.quantity + Number(quantity);
      if (newQuantity > product.stock) {
        return next(
          new ErrorHandler(
            `Only ${product.stock} units available in stock`,
            400,
          ),
        );
      }
      existingItem.quantity = Math.min(newQuantity, 10);
      existingItem.price = product.price;
    } else {
      cart.items.push({
        product: productId,
        quantity: Number(quantity),
        price: product.price,
      });
    }

    await cart.save();

    // Populate and return
    await cart.populate(
      "items.product",
      "name nameArabic images price stock slug",
    );

    logger.info(`🛒 Item added to cart: ${product.name} by ${req.user.email}`);

    res.status(200).json({
      success: true,
      message: `${product.name} added to cart successfully`,
      data: cart,
    });
  } catch (error) {
    next(error);
  }
};

// ==============================
// @desc    Update Cart Item Quantity
// @route   PUT /api/v1/cart/update
// @access  Private
// ==============================
exports.updateCartItem = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      return next(
        new ErrorHandler("Product ID and quantity are required", 400),
      );
    }

    if (quantity < 1 || quantity > 10) {
      return next(new ErrorHandler("Quantity must be between 1 and 10", 400));
    }

    // Check product stock
    const product = await Product.findById(productId);
    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }
    if (product.stock < quantity) {
      return next(
        new ErrorHandler(`Only ${product.stock} units available in stock`, 400),
      );
    }

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return next(new ErrorHandler("Cart not found", 404));
    }

    const item = cart.items.find(
      (item) => item.product.toString() === productId,
    );

    if (!item) {
      return next(new ErrorHandler("Item not found in cart", 404));
    }

    item.quantity = Number(quantity);
    item.price = product.price;

    await cart.save();

    await cart.populate(
      "items.product",
      "name nameArabic images price stock slug",
    );

    res.status(200).json({
      success: true,
      message: "Cart updated successfully",
      data: cart,
    });
  } catch (error) {
    next(error);
  }
};

// ==============================
// @desc    Remove Item From Cart
// @route   DELETE /api/v1/cart/remove/:productId
// @access  Private
// ==============================
exports.removeFromCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return next(new ErrorHandler("Cart not found", 404));
    }

    const itemExists = cart.items.find(
      (item) => item.product.toString() === req.params.productId,
    );

    if (!itemExists) {
      return next(new ErrorHandler("Item not found in cart", 404));
    }

    cart.removeItem(req.params.productId);
    await cart.save();

    await cart.populate(
      "items.product",
      "name nameArabic images price stock slug",
    );

    res.status(200).json({
      success: true,
      message: "Item removed from cart successfully",
      data: cart,
    });
  } catch (error) {
    next(error);
  }
};

// ==============================
// @desc    Clear Cart
// @route   DELETE /api/v1/cart/clear
// @access  Private
// ==============================
exports.clearCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return next(new ErrorHandler("Cart not found", 404));
    }

    cart.clearCart();
    await cart.save();

    res.status(200).json({
      success: true,
      message: "Cart cleared successfully",
      data: cart,
    });
  } catch (error) {
    next(error);
  }
};

// ==============================
// @desc    Apply Coupon To Cart
// @route   POST /api/v1/cart/apply-coupon
// @access  Private
// ==============================
exports.applyCoupon = async (req, res, next) => {
  try {
    const { code } = req.body;

    if (!code) {
      return next(new ErrorHandler("Coupon code is required", 400));
    }

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return next(new ErrorHandler("Cart not found", 404));
    }

    if (cart.items.length === 0) {
      return next(new ErrorHandler("Cart is empty", 400));
    }

    // Find coupon
    const coupon = await Coupon.findByCode(code);
    if (!coupon) {
      return next(new ErrorHandler("Invalid coupon code", 400));
    }

    // Validate coupon
    const validation = coupon.isValid(cart.totalPrice, req.user._id);
    if (!validation.valid) {
      return next(new ErrorHandler(validation.message, 400));
    }

    // Calculate discount
    const discountAmount = coupon.calculateDiscount(cart.totalPrice);
    cart.coupon = coupon._id;
    cart.discountAmount = discountAmount;

    await cart.save();

    await cart.populate(
      "items.product",
      "name nameArabic images price stock slug",
    );

    res.status(200).json({
      success: true,
      message: `Coupon applied! You saved ₹${discountAmount}`,
      data: cart,
    });
  } catch (error) {
    next(error);
  }
};

// ==============================
// @desc    Remove Coupon From Cart
// @route   DELETE /api/v1/cart/remove-coupon
// @access  Private
// ==============================
exports.removeCoupon = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return next(new ErrorHandler("Cart not found", 404));
    }

    cart.coupon = null;
    cart.discountAmount = 0;

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Coupon removed successfully",
      data: cart,
    });
  } catch (error) {
    next(error);
  }
};
