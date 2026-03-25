const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  getFeaturedProducts,
  getBestsellers,
  getNewArrivals,
  getProductsByCategory,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  toggleProductStatus,
  getAdminProducts,
  getSearchSuggestions,
} = require("../controllers/product.controller");

const { isAuthenticated } = require("../middleware/auth.middleware");
const { isAdmin } = require("../middleware/auth.middleware");
const { uploadMultiple } = require("../middleware/upload.middleware");
const {
  validateProduct,
  validateUpdateProduct,
} = require("../validators/product.validator");

router.get("/search/suggestions", getSearchSuggestions);
// ==============================
// Public Routes
// ==============================
router.get("/", getAllProducts);
router.get("/featured", getFeaturedProducts);
router.get("/bestsellers", getBestsellers);
router.get("/new-arrivals", getNewArrivals);
router.get("/category/:slug", getProductsByCategory);
router.get("/:slug", getSingleProduct);

// ==============================
// Admin Routes
// ==============================
router.get("/admin/all", isAuthenticated, isAdmin, getAdminProducts);

router.post(
  "/",
  isAuthenticated,
  isAdmin,
  uploadMultiple,
  validateProduct,
  createProduct,
);

router.put(
  "/:id",
  isAuthenticated,
  isAdmin,
  uploadMultiple,
  validateUpdateProduct,
  updateProduct,
);

router.delete("/:id", isAuthenticated, isAdmin, deleteProduct);

router.patch("/:id/toggle", isAuthenticated, isAdmin, toggleProductStatus);

module.exports = router;
