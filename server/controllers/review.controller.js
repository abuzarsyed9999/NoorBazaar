// const Review = require("../models/Review.model");
// const Product = require("../models/Product.model");
// const Order = require("../models/Order.model");
// const ErrorHandler = require("../utils/errorHandler");
// const logger = require("../utils/logger");

// // ==============================
// // @desc    Add Review
// // @route   POST /api/v1/reviews/:productId
// // @access  Private
// // ==============================
// exports.addReview = async (req, res, next) => {
//   try {
//     const { rating, title, comment } = req.body;
//     const productId = req.params.productId;

//     // Check product exists
//     const product = await Product.findById(productId);
//     if (!product) {
//       return next(new ErrorHandler("Product not found", 404));
//     }

//     // Check already reviewed
//     const existingReview = await Review.findOne({
//       user: req.user._id,
//       product: productId,
//     });

//     if (existingReview) {
//       return next(
//         new ErrorHandler(
//           "You have already reviewed this product. Please update your existing review.",
//           400,
//         ),
//       );
//     }

//     // Check verified purchase
//     const order = await Order.findOne({
//       user: req.user._id,
//       "items.product": productId,
//       orderStatus: "Delivered",
//     });

//     const review = await Review.create({
//       user: req.user._id,
//       product: productId,
//       rating: Number(rating),
//       title,
//       comment,
//       isVerifiedPurchase: !!order,
//     });

//     await review.populate("user", "name avatar");

//     logger.info(
//       `✅ Review added for product: ${product.name} by ${req.user.email}`,
//     );

//     res.status(201).json({
//       success: true,
//       message: "Review added successfully. JazakAllah Khair! 🌙",
//       data: review,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // ==============================
// // @desc    Get Product Reviews
// // @route   GET /api/v1/reviews/:productId
// // @access  Public
// // ==============================
// exports.getProductReviews = async (req, res, next) => {
//   try {
//     const product = await Product.findById(req.params.productId);
//     if (!product) {
//       return next(new ErrorHandler("Product not found", 404));
//     }

//     const page = Number(req.query.page) || 1;
//     const limit = Number(req.query.limit) || 10;
//     const skip = (page - 1) * limit;

//     const total = await Review.countDocuments({
//       product: req.params.productId,
//       isActive: true,
//     });

//     const reviews = await Review.find({
//       product: req.params.productId,
//       isActive: true,
//     })
//       .populate("user", "name avatar")
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(limit);

//     // Rating breakdown
//     const ratingBreakdown = await Review.aggregate([
//       {
//         $match: {
//           product: product._id,
//           isActive: true,
//         },
//       },
//       {
//         $group: {
//           _id: "$rating",
//           count: { $sum: 1 },
//         },
//       },
//       { $sort: { _id: -1 } },
//     ]);

//     res.status(200).json({
//       success: true,
//       message: "Reviews fetched successfully",
//       count: reviews.length,
//       total,
//       pagination: {
//         page,
//         limit,
//         totalPages: Math.ceil(total / limit),
//       },
//       averageRating: product.ratings,
//       numOfReviews: product.numOfReviews,
//       ratingBreakdown,
//       data: reviews,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // ==============================
// // @desc    Update Review
// // @route   PUT /api/v1/reviews/:id
// // @access  Private
// // ==============================
// exports.updateReview = async (req, res, next) => {
//   try {
//     const { rating, title, comment } = req.body;

//     const review = await Review.findById(req.params.id);
//     if (!review) {
//       return next(new ErrorHandler("Review not found", 404));
//     }

//     // Check review belongs to user
//     if (review.user.toString() !== req.user._id.toString()) {
//       return next(
//         new ErrorHandler("Not authorized to update this review", 403),
//       );
//     }

//     review.rating = Number(rating) || review.rating;
//     review.title = title || review.title;
//     review.comment = comment || review.comment;

//     await review.save();

//     await review.populate("user", "name avatar");

//     logger.info(`✅ Review updated: ${review._id}`);

//     res.status(200).json({
//       success: true,
//       message: "Review updated successfully",
//       data: review,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // ==============================
// // @desc    Delete Review
// // @route   DELETE /api/v1/reviews/:id
// // @access  Private
// // ==============================
// exports.deleteReview = async (req, res, next) => {
//   try {
//     const review = await Review.findById(req.params.id);
//     if (!review) {
//       return next(new ErrorHandler("Review not found", 404));
//     }

//     // Check review belongs to user or admin
//     if (
//       review.user.toString() !== req.user._id.toString() &&
//       req.user.role !== "admin"
//     ) {
//       return next(
//         new ErrorHandler("Not authorized to delete this review", 403),
//       );
//     }

//     await review.deleteOne();

//     // Recalculate product rating
//     await Review.calculateAverageRating(review.product);

//     logger.info(`🗑️ Review deleted: ${review._id}`);

//     res.status(200).json({
//       success: true,
//       message: "Review deleted successfully",
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // ==============================
// // @desc    Get My Reviews
// // @route   GET /api/v1/reviews/my-reviews
// // @access  Private
// // ==============================
// exports.getMyReviews = async (req, res, next) => {
//   try {
//     const reviews = await Review.find({ user: req.user._id })
//       .populate("product", "name images slug price")
//       .sort({ createdAt: -1 });

//     res.status(200).json({
//       success: true,
//       message: "My reviews fetched successfully",
//       count: reviews.length,
//       data: reviews,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // ==============================
// // @desc    Vote Review Helpful
// // @route   PUT /api/v1/reviews/:id/helpful
// // @access  Private
// // ==============================
// exports.voteHelpful = async (req, res, next) => {
//   try {
//     const review = await Review.findById(req.params.id);
//     if (!review) {
//       return next(new ErrorHandler("Review not found", 404));
//     }

//     review.helpfulVotes += 1;
//     await review.save();

//     res.status(200).json({
//       success: true,
//       message: "Voted as helpful",
//       data: { helpfulVotes: review.helpfulVotes },
//     });
//   } catch (error) {
//     next(error);
//   }
// };

const Review = require("../models/Review.model");
const Product = require("../models/Product.model");
const Order = require("../models/Order.model");
const ErrorHandler = require("../utils/errorHandler");
const logger = require("../utils/logger");
const cloudinary = require("cloudinary").v2;

// ── Helper: update product rating ──
const updateProductRating = async (productId) => {
  const stats = await Review.aggregate([
    { $match: { product: productId, isApproved: true } },
    {
      $group: {
        _id: null,
        average: { $avg: "$rating" },
        count: { $sum: 1 },
      },
    },
  ]);

  await Product.findByIdAndUpdate(productId, {
    ratings: {
      average: stats[0] ? Math.round(stats[0].average * 10) / 10 : 0,
      count: stats[0] ? stats[0].count : 0,
    },
  });
};

// ==============================
// @desc    Create Review
// @route   POST /api/v1/reviews
// @access  Private
// ==============================
exports.createReview = async (req, res, next) => {
  try {
    const { productId, rating, title, comment } = req.body;

    if (!productId)
      return next(new ErrorHandler("Product ID is required", 400));
    if (!rating) return next(new ErrorHandler("Rating is required", 400));
    if (!comment)
      return next(new ErrorHandler("Review comment is required", 400));

    // Check product exists
    const product = await Product.findById(productId);
    if (!product) return next(new ErrorHandler("Product not found", 404));

    // Check already reviewed
    const existing = await Review.findOne({
      product: productId,
      user: req.user._id,
    });
    if (existing)
      return next(
        new ErrorHandler("You have already reviewed this product", 400),
      );

    // Check if user bought this product
    const hasPurchased = await Order.findOne({
      user: req.user._id,
      "items.product": productId,
      orderStatus: "Delivered",
    });

    // Upload images to cloudinary
    let images = [];
    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map((file) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: "noorbazaar/reviews",
              transformation: [{ width: 800, height: 800, crop: "limit" }],
            },
            (error, result) => {
              if (error) reject(error);
              else
                resolve({
                  url: result.secure_url,
                  public_id: result.public_id,
                });
            },
          );
          stream.end(file.buffer);
        });
      });
      images = await Promise.all(uploadPromises);
    }

    const review = await Review.create({
      product: productId,
      user: req.user._id,
      rating: Number(rating),
      title: title?.trim(),
      comment: comment.trim(),
      images,
      isVerifiedPurchase: !!hasPurchased,
      isApproved: true,
    });

    await review.populate("user", "name");
    await updateProductRating(product._id);

    logger.info(`✅ Review created by ${req.user.email} for ${product.name}`);

    res.status(201).json({
      success: true,
      message: "Review submitted successfully! JazakAllah Khair 🌙",
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
    const { productId } = req.params;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const rating = Number(req.query.rating) || 0;
    const sort = req.query.sort || "-createdAt";
    const skip = (page - 1) * limit;

    const filter = { product: productId, isApproved: true };
    if (rating > 0) filter.rating = rating;

    const total = await Review.countDocuments(filter);
    const reviews = await Review.find(filter)
      .populate("user", "name")
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean();

    // Rating breakdown
    const breakdown = await Review.aggregate([
      {
        $match: {
          product:
            require("mongoose").Types.ObjectId.createFromHexString(productId),
          isApproved: true,
        },
      },
      { $group: { _id: "$rating", count: { $sum: 1 } } },
      { $sort: { _id: -1 } },
    ]);

    const ratingBreakdown = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    breakdown.forEach((b) => {
      ratingBreakdown[b._id] = b.count;
    });

    // Check if current user reviewed
    let userReview = null;
    if (req.user) {
      userReview = await Review.findOne({
        product: productId,
        user: req.user._id,
      }).lean();
    }

    res.status(200).json({
      success: true,
      count: reviews.length,
      total,
      pagination: { page, limit, totalPages: Math.ceil(total / limit) },
      ratingBreakdown,
      userReview,
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
    if (!review) return next(new ErrorHandler("Review not found", 404));

    if (review.user.toString() !== req.user._id.toString()) {
      return next(
        new ErrorHandler("Not authorized to update this review", 403),
      );
    }

    // Upload new images
    let newImages = review.images || [];
    if (req.files && req.files.length > 0) {
      // Delete old images
      if (review.images?.length > 0) {
        await Promise.all(
          review.images.map((img) =>
            cloudinary.uploader.destroy(img.public_id).catch(() => {}),
          ),
        );
      }
      const uploadPromises = req.files.map(
        (file) =>
          new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
              { folder: "noorbazaar/reviews" },
              (error, result) => {
                if (error) reject(error);
                else
                  resolve({
                    url: result.secure_url,
                    public_id: result.public_id,
                  });
              },
            );
            stream.end(file.buffer);
          }),
      );
      newImages = await Promise.all(uploadPromises);
    }

    review.rating = Number(rating) || review.rating;
    review.title = title?.trim() || review.title;
    review.comment = comment?.trim() || review.comment;
    review.images = newImages;
    review.isEdited = true;
    await review.save();

    await updateProductRating(review.product);
    await review.populate("user", "name");

    res
      .status(200)
      .json({ success: true, message: "Review updated!", data: review });
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
    if (!review) return next(new ErrorHandler("Review not found", 404));

    if (
      review.user.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return next(
        new ErrorHandler("Not authorized to delete this review", 403),
      );
    }

    // Delete images from cloudinary
    if (review.images?.length > 0) {
      await Promise.all(
        review.images.map((img) =>
          cloudinary.uploader.destroy(img.public_id).catch(() => {}),
        ),
      );
    }

    const productId = review.product;
    await review.deleteOne();
    await updateProductRating(productId);

    res.status(200).json({ success: true, message: "Review deleted!" });
  } catch (error) {
    next(error);
  }
};

// ==============================
// @desc    Toggle Helpful Vote
// @route   PUT /api/v1/reviews/:id/helpful
// @access  Private
// ==============================
exports.toggleHelpful = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return next(new ErrorHandler("Review not found", 404));

    if (review.user.toString() === req.user._id.toString()) {
      return next(new ErrorHandler("You cannot vote on your own review", 400));
    }

    const idx = review.helpfulVotes.indexOf(req.user._id);
    if (idx === -1) {
      review.helpfulVotes.push(req.user._id);
    } else {
      review.helpfulVotes.splice(idx, 1);
    }
    await review.save();

    res.status(200).json({
      success: true,
      helpfulCount: review.helpfulVotes.length,
      isHelpful: idx === -1,
    });
  } catch (error) {
    next(error);
  }
};
