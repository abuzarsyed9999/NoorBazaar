const express = require("express");
const router = express.Router();

const {
  createCoupon,
  getAllCoupons,
  getSingleCoupon,
  updateCoupon,
  deleteCoupon,
  validateCoupon,
  toggleCouponStatus,
} = require("../controllers/coupon.controller");

const { isAuthenticated } = require("../middleware/auth.middleware");
const { isAdmin } = require("../middleware/auth.middleware");

// ==============================
// Private Routes (User)
// ==============================
router.post("/validate", isAuthenticated, validateCoupon);

// ==============================
// Admin Routes
// ==============================
router.get("/", isAuthenticated, isAdmin, getAllCoupons);

router.post("/", isAuthenticated, isAdmin, createCoupon);

router.get("/:id", isAuthenticated, isAdmin, getSingleCoupon);

router.put("/:id", isAuthenticated, isAdmin, updateCoupon);

router.delete("/:id", isAuthenticated, isAdmin, deleteCoupon);

router.patch("/:id/toggle", isAuthenticated, isAdmin, toggleCouponStatus);

module.exports = router;
