const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const reviewSchema = new mongoose.Schema(
  {
    // ==============================
    // References
    // ==============================
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },

    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Product is required"],
    },

    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },

    // ==============================
    // Review Content
    // ==============================
    rating: {
      type: Number,
      required: [true, "Please give a rating"],
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating cannot exceed 5"],
    },

    title: {
      type: String,
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },

    comment: {
      type: String,
      required: [true, "Please write a review"],
      trim: true,
      minlength: [10, "Review must be at least 10 characters"],
      maxlength: [500, "Review cannot exceed 500 characters"],
    },

    // ==============================
    // Images
    // ==============================
    images: {
      type: [
        {
          public_id: { type: String },
          url: { type: String },
        },
      ],
      validate: {
        validator: (imgs) => imgs.length <= 3,
        message: "You can upload maximum 3 images per review",
      },
    },

    // ==============================
    // Flags
    // ==============================
    isVerifiedPurchase: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },

    helpfulVotes: { type: Number, default: 0 },
    reportCount: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    versionKey: false,
    strict: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// ==============================
// Indexes
// ==============================
reviewSchema.index({ user: 1, product: 1 }, { unique: true });
reviewSchema.index({ product: 1, rating: -1 });
reviewSchema.index({ isActive: 1, createdAt: -1 });

// ==============================
// Static — Recalculate Rating
// ==============================
reviewSchema.statics.calculateAverageRating = async function (productId) {
  const result = await this.aggregate([
    { $match: { product: productId, isActive: true } },
    {
      $group: {
        _id: "$product",
        avgRating: { $avg: "$rating" },
        numOfReviews: { $sum: 1 },
      },
    },
  ]);

  await mongoose.model("Product").findByIdAndUpdate(productId, {
    ratings: result.length > 0 ? Math.round(result[0].avgRating * 10) / 10 : 0,
    numOfReviews: result.length > 0 ? result[0].numOfReviews : 0,
  });
};

// ==============================
// Post Hooks — Update Rating
// ==============================
reviewSchema.post("save", function () {
  this.constructor.calculateAverageRating(this.product);
});

reviewSchema.post("findOneAndDelete", function (doc) {
  if (doc) doc.constructor.calculateAverageRating(doc.product);
});

// ==============================
// Plugins
// ==============================
reviewSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Review", reviewSchema);
