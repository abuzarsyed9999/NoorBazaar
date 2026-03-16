const Coupon = require("../models/Coupon.model");
const ErrorHandler = require("../utils/errorHandler");
const logger = require("../utils/logger");

// ==============================
// @desc    Create Coupon
// @route   POST /api/v1/coupons
// @access  Admin
// ==============================
exports.createCoupon = async (req, res, next) => {
  try {
    const {
      code,
      description,
      discountType,
      discountValue,
      maxDiscountAmount,
      minOrderAmount,
      maxUsageLimit,
      maxUsagePerUser,
      startDate,
      expiryDate,
      occasion,
    } = req.body;

    // Check duplicate code
    const existing = await Coupon.findOne({ code: code.toUpperCase() });
    if (existing) {
      return next(new ErrorHandler("Coupon code already exists", 400));
    }

    const coupon = await Coupon.create({
      code,
      description,
      discountType,
      discountValue,
      maxDiscountAmount,
      minOrderAmount,
      maxUsageLimit,
      maxUsagePerUser,
      startDate,
      expiryDate,
      occasion,
      createdBy: req.user._id,
    });

    logger.info(`✅ Coupon created: ${coupon.code} by ${req.user.email}`);

    res.status(201).json({
      success: true,
      message: "Coupon created successfully",
      data: coupon,
    });
  } catch (error) {
    next(error);
  }
};

// ==============================
// @desc    Get All Coupons
// @route   GET /api/v1/coupons
// @access  Admin
// ==============================
exports.getAllCoupons = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await Coupon.countDocuments();
    const coupons = await Coupon.find()
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      message: "Coupons fetched successfully",
      count: coupons.length,
      total,
      pagination: {
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
      data: coupons,
    });
  } catch (error) {
    next(error);
  }
};

// ==============================
// @desc    Get Single Coupon
// @route   GET /api/v1/coupons/:id
// @access  Admin
// ==============================
exports.getSingleCoupon = async (req, res, next) => {
  try {
    const coupon = await Coupon.findById(req.params.id).populate(
      "createdBy",
      "name email",
    );

    if (!coupon) {
      return next(new ErrorHandler("Coupon not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Coupon fetched successfully",
      data: coupon,
    });
  } catch (error) {
    next(error);
  }
};

// ==============================
// @desc    Update Coupon
// @route   PUT /api/v1/coupons/:id
// @access  Admin
// ==============================
exports.updateCoupon = async (req, res, next) => {
  try {
    let coupon = await Coupon.findById(req.params.id);

    if (!coupon) {
      return next(new ErrorHandler("Coupon not found", 404));
    }

    coupon = await Coupon.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    logger.info(`✅ Coupon updated: ${coupon.code}`);

    res.status(200).json({
      success: true,
      message: "Coupon updated successfully",
      data: coupon,
    });
  } catch (error) {
    next(error);
  }
};

// ==============================
// @desc    Delete Coupon
// @route   DELETE /api/v1/coupons/:id
// @access  Admin
// ==============================
exports.deleteCoupon = async (req, res, next) => {
  try {
    const coupon = await Coupon.findById(req.params.id);

    if (!coupon) {
      return next(new ErrorHandler("Coupon not found", 404));
    }

    await coupon.deleteOne();

    logger.info(`🗑️ Coupon deleted: ${coupon.code}`);

    res.status(200).json({
      success: true,
      message: "Coupon deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// ==============================
// @desc    Validate Coupon
// @route   POST /api/v1/coupons/validate
// @access  Private
// ==============================
exports.validateCoupon = async (req, res, next) => {
  try {
    const { code, orderAmount } = req.body;

    if (!code) {
      return next(new ErrorHandler("Coupon code is required", 400));
    }

    if (!orderAmount) {
      return next(new ErrorHandler("Order amount is required", 400));
    }

    const coupon = await Coupon.findByCode(code);
    if (!coupon) {
      return next(new ErrorHandler("Invalid coupon code", 400));
    }

    // Validate coupon
    const validation = coupon.isValid(Number(orderAmount), req.user._id);
    if (!validation.valid) {
      return next(new ErrorHandler(validation.message, 400));
    }

    // Calculate discount
    const discountAmount = coupon.calculateDiscount(Number(orderAmount));
    const finalAmount = Number(orderAmount) - discountAmount;

    res.status(200).json({
      success: true,
      message: `Coupon applied! You save ₹${discountAmount} 🎉`,
      data: {
        code: coupon.code,
        discountType: coupon.discountType,
        discountValue: coupon.discountValue,
        discountAmount,
        originalAmount: Number(orderAmount),
        finalAmount: Math.max(0, finalAmount),
        occasion: coupon.occasion,
      },
    });
  } catch (error) {
    next(error);
  }
};

// ==============================
// @desc    Toggle Coupon Status
// @route   PATCH /api/v1/coupons/:id/toggle
// @access  Admin
// ==============================
exports.toggleCouponStatus = async (req, res, next) => {
  try {
    const coupon = await Coupon.findById(req.params.id);

    if (!coupon) {
      return next(new ErrorHandler("Coupon not found", 404));
    }

    coupon.isActive = !coupon.isActive;
    await coupon.save();

    logger.info(
      `✅ Coupon ${coupon.isActive ? "activated" : "deactivated"}: ${coupon.code}`,
    );

    res.status(200).json({
      success: true,
      message: `Coupon ${coupon.isActive ? "activated" : "deactivated"} successfully`,
      data: coupon,
    });
  } catch (error) {
    next(error);
  }
};
