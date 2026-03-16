const express = require("express");
const router = express.Router();

const {
  getMyProfile,
  updateProfile,
  updateAvatar,
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  addAddress,
  updateAddress,
  deleteAddress,
} = require("../controllers/user.controller");

const { isAuthenticated } = require("../middleware/auth.middleware");
const { uploadSingle } = require("../middleware/upload.middleware");

// All user routes are private
router.use(isAuthenticated);

// ==============================
// Profile Routes
// ==============================
router.get("/profile", getMyProfile);
router.put("/profile", updateProfile);
router.post("/avatar", uploadSingle, updateAvatar);

// ==============================
// Wishlist Routes
// ==============================
router.get("/wishlist", getWishlist);
router.post("/wishlist/:productId", addToWishlist);
router.delete("/wishlist/:productId", removeFromWishlist);

// ==============================
// Address Routes
// ==============================
router.post("/address", addAddress);
router.put("/address/:addressId", updateAddress);
router.delete("/address/:addressId", deleteAddress);

module.exports = router;
