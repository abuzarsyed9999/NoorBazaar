const mongoose = require("mongoose");
const slugify = require("slugify");
const mongoosePaginate = require("mongoose-paginate-v2");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter product name"],
      trim: true,
      minlength: [3, "Product name must be at least 3 characters"],
      maxlength: [150, "Product name cannot exceed 150 characters"],
    },

    nameArabic: {
      type: String,
      trim: true,
    },

    slug: {
      type: String,
      lowercase: true,
    },

    description: {
      type: String,
      required: [true, "Please enter product description"],
      trim: true,
      maxlength: [3000, "Description cannot exceed 3000 characters"],
    },

    shortDescription: {
      type: String,
      trim: true,
      maxlength: [200, "Short description cannot exceed 200 characters"],
    },

    price: {
      type: Number,
      required: [true, "Please enter product price"],
      min: [0, "Price cannot be negative"],
    },

    originalPrice: {
      type: Number,
      min: [0, "Original price cannot be negative"],
    },

    discountPercent: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    stock: {
      type: Number,
      required: [true, "Please enter product stock"],
      min: [0, "Stock cannot be negative"],
      default: 0,
    },

    lowStockThreshold: {
      type: Number,
      default: 5,
    },

    sold: {
      type: Number,
      default: 0,
    },

    images: {
      type: [
        {
          public_id: { type: String, required: true },
          url: { type: String, required: true },
        },
      ],
      validate: {
        validator: function (images) {
          return images.length >= 1 && images.length <= 6;
        },
        message: "Product must have between 1 and 6 images",
      },
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Please select a category"],
    },

    tags: {
      type: [{ type: String, trim: true, lowercase: true }],
      validate: {
        validator: function (tags) {
          return tags.length <= 10;
        },
        message: "Product cannot have more than 10 tags",
      },
    },

    details: {
      material: { type: String, trim: true },
      weight: { type: String, trim: true },
      dimensions: { type: String, trim: true },
      origin: { type: String, trim: true },
      language: { type: String, trim: true },
      author: { type: String, trim: true },
      publisher: { type: String, trim: true },
      edition: { type: String, trim: true },
      color: { type: String, trim: true },
      size: { type: String, trim: true },
    },

    ratings: { type: Number, default: 0, min: 0, max: 5 },
    numOfReviews: { type: Number, default: 0 },

    isFeatured: { type: Boolean, default: false },
    isBestseller: { type: Boolean, default: false },
    isNewArrival: { type: Boolean, default: false },
    isGiftable: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },

    metaTitle: {
      type: String,
      trim: true,
      maxlength: [60, "Meta title cannot exceed 60 characters"],
    },

    metaDescription: {
      type: String,
      trim: true,
      maxlength: [160, "Meta description cannot exceed 160 characters"],
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// ==============================
// Indexes
// ==============================
productSchema.index({ name: "text", description: "text", tags: "text" });
productSchema.index({ slug: 1 }, { unique: true });
productSchema.index({ category: 1, price: 1 });
productSchema.index({ ratings: -1, sold: -1 });
productSchema.index({ isFeatured: 1, isActive: 1 });
productSchema.index({ createdAt: -1 });
productSchema.index({ price: 1 });

// ==============================
// Virtuals
// ==============================
productSchema.virtual("isInStock").get(function () {
  return this.stock > 0;
});

productSchema.virtual("isLowStock").get(function () {
  return this.stock > 0 && this.stock <= this.lowStockThreshold;
});

productSchema.virtual("effectiveDiscountPercent").get(function () {
  if (!this.originalPrice || this.originalPrice <= this.price) return 0;
  return Math.round(
    ((this.originalPrice - this.price) / this.originalPrice) * 100,
  );
});

productSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "product",
});

// ==============================
// Pre Save Hooks
// ==============================
productSchema.pre("save", async function () {
  if (this.isModified("name")) {
    this.slug = slugify(this.name, {
      lower: true,
      strict: true,
      trim: true,
    });
  }
  if (this.originalPrice && this.price) {
    this.discountPercent = Math.round(
      ((this.originalPrice - this.price) / this.originalPrice) * 100,
    );
  }
  if (!this.metaTitle) this.metaTitle = this.name;
  if (!this.shortDescription && this.description) {
    this.shortDescription = this.description.substring(0, 150) + "...";
  }
});

// ==============================
// Static Methods
// ==============================
productSchema.statics.getFeaturedProducts = function (limit = 8) {
  return this.find({ isFeatured: true, isActive: true, stock: { $gt: 0 } })
    .populate("category", "name slug")
    .sort({ sold: -1 })
    .limit(limit);
};

productSchema.statics.getBestsellers = function (limit = 8) {
  return this.find({ isBestseller: true, isActive: true, stock: { $gt: 0 } })
    .populate("category", "name slug")
    .sort({ sold: -1 })
    .limit(limit);
};

productSchema.statics.getNewArrivals = function (limit = 8) {
  return this.find({ isNewArrival: true, isActive: true })
    .populate("category", "name slug")
    .sort({ createdAt: -1 })
    .limit(limit);
};

productSchema.statics.findBySlug = function (slug) {
  return this.findOne({ slug, isActive: true })
    .populate("category", "name slug nameArabic")
    .populate("createdBy", "name");
};

// ==============================
// Plugins
// ==============================
productSchema.plugin(mongoosePaginate);
productSchema.plugin(aggregatePaginate);

module.exports = mongoose.model("Product", productSchema);
