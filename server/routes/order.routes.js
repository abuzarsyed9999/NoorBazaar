const express = require("express");
const router = express.Router();

const {
  placeOrder,
  getMyOrders,
  getSingleOrder,
  cancelOrder,
  getAllOrders,
  updateOrderStatus,
  getMonthlySales,
} = require("../controllers/order.controller");

const { isAuthenticated } = require("../middleware/auth.middleware");
const { isAdmin } = require("../middleware/auth.middleware");
const {
  validatePlaceOrder,
  validateUpdateStatus,
} = require("../validators/order.validator");

// ==============================
// Private Routes
// ==============================
router.post("/", isAuthenticated, validatePlaceOrder, placeOrder);

router.get("/my-orders", isAuthenticated, getMyOrders);

router.get("/:id", isAuthenticated, getSingleOrder);

router.put("/:id/cancel", isAuthenticated, cancelOrder);

// ==============================
// Admin Routes
// ==============================
router.get("/admin/all", isAuthenticated, isAdmin, getAllOrders);

router.get("/admin/sales", isAuthenticated, isAdmin, getMonthlySales);

router.put(
  "/admin/:id/status",
  isAuthenticated,
  isAdmin,
  validateUpdateStatus,
  updateOrderStatus,
);

module.exports = router;
