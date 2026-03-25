// const express = require("express");
// const router = express.Router();

// const {
//   addReview,
//   getProductReviews,
//   updateReview,
//   deleteReview,
//   getMyReviews,
//   voteHelpful,
// } = require("../controllers/review.controller");

// const { isAuthenticated } = require("../middleware/auth.middleware");

// // ==============================
// // Public Routes
// // ==============================
// router.get("/:productId", getProductReviews);

// // ==============================
// // Private Routes
// // ==============================
// router.use(isAuthenticated);

// router.get("/my-reviews", getMyReviews);
// router.post("/:productId", addReview);
// router.put("/:id/helpful", voteHelpful);
// router.put("/:id", updateReview);
// router.delete("/:id", deleteReview);

// module.exports = router;

const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
  createReview,
  getProductReviews,
  updateReview,
  deleteReview,
  toggleHelpful,
} = require("../controllers/review.controller");

const { isAuthenticated } = require("../middleware/auth.middleware");

// Multer — memory storage for Cloudinary
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) cb(null, true);
    else cb(new Error("Only images allowed"), false);
  },
});

// ── Routes ──
router.post("/", isAuthenticated, upload.array("images", 4), createReview);

router.get("/:productId", isAuthenticated, getProductReviews);

router.put("/:id", isAuthenticated, upload.array("images", 4), updateReview);

router.delete("/:id", isAuthenticated, deleteReview);

router.put("/:id/helpful", isAuthenticated, toggleHelpful);

module.exports = router;
