const express = require("express");
const router = express.Router();

const {
  getDashboardStats,
  getAllUsers,
  getSingleUser,
  updateUserRole,
  deleteUser,
  toggleUserStatus,
  getSalesReport,
} = require("../controllers/admin.controller");

const { isAuthenticated } = require("../middleware/auth.middleware");
const { isAdmin } = require("../middleware/auth.middleware");

// All admin routes are protected
router.use(isAuthenticated);
router.use(isAdmin);

// ==============================
// Dashboard
// ==============================
router.get("/dashboard", getDashboardStats);
router.get("/sales", getSalesReport);

// ==============================
// User Management
// ==============================
router.get("/users", getAllUsers);
router.get("/users/:id", getSingleUser);
router.put("/users/:id/role", updateUserRole);
router.delete("/users/:id", deleteUser);
router.patch("/users/:id/toggle", toggleUserStatus);

// ── All admin routes require auth + admin role ──
router.use(isAuthenticated, isAdmin);

router.get("/dashboard", getDashboardStats);
router.get("/sales", getSalesReport);
router.get("/users", getAllUsers);
router.get("/users/:id", getSingleUser);
router.put("/users/:id/role", updateUserRole);
router.delete("/users/:id", deleteUser);
router.put("/users/:id/toggle", toggleUserStatus);

module.exports = router;
