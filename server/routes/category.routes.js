const express = require("express");
const router = express.Router();

const {
  getAllCategories,
  getSingleCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  toggleCategoryStatus,
} = require("../controllers/category.controller");

const { isAuthenticated } = require("../middleware/auth.middleware");
const { isAdmin } = require("../middleware/auth.middleware");
const { uploadSingle } = require("../middleware/upload.middleware");
const { validateCategory } = require("../validators/product.validator");

// ==============================
// Public Routes
// ==============================
router.get("/", getAllCategories);
router.get("/:slug", getSingleCategory);

// ==============================
// Admin Routes
// ==============================
router.post(
  "/",
  isAuthenticated,
  isAdmin,
  uploadSingle,
  validateCategory,
  createCategory,
);

router.put(
  "/:id",
  isAuthenticated,
  isAdmin,
  uploadSingle,
  validateCategory,
  updateCategory,
);

router.delete("/:id", isAuthenticated, isAdmin, deleteCategory);

router.patch("/:id/toggle", isAuthenticated, isAdmin, toggleCategoryStatus);

module.exports = router;
