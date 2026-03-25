// const express = require("express");
// const router = express.Router();
// const { isAuthenticated } = require("../middleware/auth.middleware");
// const Coupon = require("../models/Coupon.model");

// // ==============================
// // @desc   Validate / Apply Coupon
// // @route  POST /api/v1/coupons/validate
// // @access Private
// // ==============================
// router.post("/validate", isAuthenticated, async (req, res, next) => {
//   try {
//     const { code, orderAmount } = req.body;

//     if (!code?.trim()) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Please enter a coupon code" });
//     }
//     if (!orderAmount || orderAmount <= 0) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Invalid order amount" });
//     }

//     const coupon = await Coupon.findOne({ code: code.toUpperCase().trim() });

//     if (!coupon) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Invalid coupon code" });
//     }

//     // ✅ Use model's isValid method
//     const validation = coupon.isValid(orderAmount, req.user._id);
//     if (!validation.valid) {
//       return res
//         .status(400)
//         .json({ success: false, message: validation.message });
//     }

//     // ✅ Use model's calculateDiscount method
//     const discountAmount = coupon.calculateDiscount(orderAmount);

//     res.status(200).json({
//       success: true,
//       message: `Coupon applied! You save ₹${discountAmount} 🎉`,
//       data: {
//         code: coupon.code,
//         discountType: coupon.discountType,
//         discount: coupon.discountValue, // ✅ model field
//         discountAmount,
//         minOrderAmount: coupon.minOrderAmount,
//         finalAmount: Math.max(0, orderAmount - discountAmount),
//       },
//     });
//   } catch (error) {
//     next(error);
//   }
// });

// // ==============================
// // @desc   Get Active Public Coupons
// // @route  GET /api/v1/coupons/public
// // @access Private
// // ==============================
// router.get("/public", isAuthenticated, async (req, res, next) => {
//   try {
//     const now = new Date();
//     const coupons = await Coupon.find({
//       isActive: true,
//       expiryDate: { $gt: now }, // ✅ model field name
//       startDate: { $lte: now },
//       $or: [
//         { maxUsageLimit: null }, // ✅ model field name
//         { maxUsageLimit: { $exists: false } },
//         { $expr: { $lt: ["$usedCount", "$maxUsageLimit"] } },
//       ],
//     })
//       .select(
//         "code discountType discountValue minOrderAmount maxDiscountAmount expiryDate maxUsageLimit usedCount occasion description",
//       )
//       .sort("-createdAt")
//       .lean();

//     res.status(200).json({
//       success: true,
//       count: coupons.length,
//       data: coupons,
//     });
//   } catch (error) {
//     next(error);
//   }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middleware/auth.middleware");
const Coupon = require("../models/Coupon.model");

// ==============================
// @desc   Validate / Apply Coupon
// @route  POST /api/v1/coupons/validate
// @access Private
// ==============================
router.post("/validate", isAuthenticated, async (req, res, next) => {
  try {
    const { code, orderAmount } = req.body;

    if (!code?.trim()) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter a coupon code" });
    }
    if (!orderAmount || Number(orderAmount) <= 0) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid order amount" });
    }

    const coupon = await Coupon.findOne({ code: code.toUpperCase().trim() });

    if (!coupon) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid coupon code" });
    }

    // ✅ Use model's isValid method
    const validation = coupon.isValid(Number(orderAmount), req.user._id);
    if (!validation.valid) {
      return res
        .status(400)
        .json({ success: false, message: validation.message });
    }

    // ✅ Use model's calculateDiscount method
    const discountAmount = coupon.calculateDiscount(Number(orderAmount));

    res.status(200).json({
      success: true,
      message: `Coupon applied! You save ₹${discountAmount} 🎉`,
      data: {
        code: coupon.code,
        discountType: coupon.discountType,
        discount: coupon.discountValue, // ✅ correct model field
        discountAmount,
        minOrderAmount: coupon.minOrderAmount,
        finalAmount: Math.max(0, Number(orderAmount) - discountAmount),
      },
    });
  } catch (error) {
    next(error);
  }
});

// ==============================
// @desc   Get Active Public Coupons
// @route  GET /api/v1/coupons/public
// @access Private
// ==============================
router.get("/public", isAuthenticated, async (req, res, next) => {
  try {
    const now = new Date();

    const coupons = await Coupon.find({
      isActive: true,
      expiryDate: { $gt: now }, // ✅ correct model field
      startDate: { $lte: now },
    })
      .select(
        "code discountType discountValue minOrderAmount maxDiscountAmount expiryDate maxUsageLimit usedCount occasion description",
      )
      .sort("-createdAt")
      .lean();

    // Filter out fully used coupons
    const available = coupons.filter((c) => {
      if (c.maxUsageLimit && c.usedCount >= c.maxUsageLimit) return false;
      return true;
    });

    res.status(200).json({
      success: true,
      count: available.length,
      data: available,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
