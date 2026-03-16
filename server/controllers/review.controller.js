const Review = require("../models/Review.model");
const Product = require("../models/Product.model");
const Order = require("../models/Order.model");
const ErrorHandler = require("../utils/errorHandler");
const logger = require("../utils/logger");

// ==============================
// @desc    Add Review
// @route   POST /api/v1/reviews/:productId
// @access  Private
// ==============================
exports.addReview = async (req, res, next) => {
  try {
    const { rating, title, comment } = req.body;
    const productId = req.params.productId;

    // Check product exists
    const product = await Product.findById(productId);
    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }

    // Check already reviewed
    const existingReview = await Review.findOne({
      user: req.user._id,
      product: productId,
    });

    if (existingReview) {
      return next(
        new ErrorHandler(
          "You have already reviewed this product. Please update your existing review.",
          400,
        ),
      );
    }

    // Check verified purchase
    const order = await Order.findOne({
      user: req.user._id,
      "items.product": productId,
      orderStatus: "Delivered",
    });

    const review = await Review.create({
      user: req.user._id,
      product: productId,
      rating: Number(rating),
      title,
      comment,
      isVerifiedPurchase: !!order,
    });

    await review.populate("user", "name avatar");

    logger.info(
      `✅ Review added for product: ${product.name} by ${req.user.email}`,
    );

    res.status(201).json({
      success: true,
      message: "Review added successfully. JazakAllah Khair! 🌙",
      data: review,
    });
  } catch (error) {
    next(error);
  }
};

// ==============================
// @desc    Get Product Reviews
// @route   GET /api/v1/reviews/:productId
// @access  Public
// ==============================
exports.getProductReviews = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await Review.countDocuments({
      product: req.params.productId,
      isActive: true,
    });

    const reviews = await Review.find({
      product: req.params.productId,
      isActive: true,
    })
      .populate("user", "name avatar")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Rating breakdown
    const ratingBreakdown = await Review.aggregate([
      {
        $match: {
          product: product._id,
          isActive: true,
        },
      },
      {
        $group: {
          _id: "$rating",
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: -1 } },
    ]);

    res.status(200).json({
      success: true,
      message: "Reviews fetched successfully",
      count: reviews.length,
      total,
      pagination: {
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
      averageRating: product.ratings,
      numOfReviews: product.numOfReviews,
      ratingBreakdown,
      data: reviews,
    });
  } catch (error) {
    next(error);
  }
};

// ==============================
// @desc    Update Review
// @route   PUT /api/v1/reviews/:id
// @access  Private
// ==============================
exports.updateReview = async (req, res, next) => {
  try {
    const { rating, title, comment } = req.body;

    const review = await Review.findById(req.params.id);
    if (!review) {
      return next(new ErrorHandler("Review not found", 404));
    }

    // Check review belongs to user
    if (review.user.toString() !== req.user._id.toString()) {
      return next(
        new ErrorHandler("Not authorized to update this review", 403),
      );
    }

    review.rating = Number(rating) || review.rating;
    review.title = title || review.title;
    review.comment = comment || review.comment;

    await review.save();

    await review.populate("user", "name avatar");

    logger.info(`✅ Review updated: ${review._id}`);

    res.status(200).json({
      success: true,
      message: "Review updated successfully",
      data: review,
    });
  } catch (error) {
    next(error);
  }
};

// ==============================
// @desc    Delete Review
// @route   DELETE /api/v1/reviews/:id
// @access  Private
// ==============================
exports.deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return next(new ErrorHandler("Review not found", 404));
    }

    // Check review belongs to user or admin
    if (
      review.user.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return next(
        new ErrorHandler("Not authorized to delete this review", 403),
      );
    }

    await review.deleteOne();

    // Recalculate product rating
    await Review.calculateAverageRating(review.product);

    logger.info(`🗑️ Review deleted: ${review._id}`);

    res.status(200).json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// ==============================
// @desc    Get My Reviews
// @route   GET /api/v1/reviews/my-reviews
// @access  Private
// ==============================
exports.getMyReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ user: req.user._id })
      .populate("product", "name images slug price")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "My reviews fetched successfully",
      count: reviews.length,
      data: reviews,
    });
  } catch (error) {
    next(error);
  }
};

// ==============================
// @desc    Vote Review Helpful
// @route   PUT /api/v1/reviews/:id/helpful
// @access  Private
// ==============================
exports.voteHelpful = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return next(new ErrorHandler("Review not found", 404));
    }

    review.helpfulVotes += 1;
    await review.save();

    res.status(200).json({
      success: true,
      message: "Voted as helpful",
      data: { helpfulVotes: review.helpfulVotes },
    });
  } catch (error) {
    next(error);
  }
};
