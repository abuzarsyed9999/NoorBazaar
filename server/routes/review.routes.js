const express = require("express");
const router = express.Router();

const {
  addReview,
  getProductReviews,
  updateReview,
  deleteReview,
  getMyReviews,
  voteHelpful,
} = require("../controllers/review.controller");

const { isAuthenticated } = require("../middleware/auth.middleware");

// ==============================
// Public Routes
// ==============================
router.get("/:productId", getProductReviews);

// ==============================
// Private Routes
// ==============================
router.use(isAuthenticated);

router.get("/my-reviews", getMyReviews);
router.post("/:productId", addReview);
router.put("/:id/helpful", voteHelpful);
router.put("/:id", updateReview);
router.delete("/:id", deleteReview);

module.exports = router;
