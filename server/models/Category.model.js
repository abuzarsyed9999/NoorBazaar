const mongoose = require("mongoose");
const slugify = require("slugify");
const mongoosePaginate = require("mongoose-paginate-v2");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter category name"],
      trim: true,
      minlength: [2, "Category name must be at least 2 characters"],
      maxlength: [50, "Category name cannot exceed 50 characters"],
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
      trim: true,
      maxlength: [200, "Description cannot exceed 200 characters"],
    },

    image: {
      public_id: {
        type: String,
        default: "noorbazaar/categories/default",
      },
      url: {
        type: String,
        default:
          "https://res.cloudinary.com/noorbazaar/image/upload/v1/default.png",
      },
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    displayOrder: {
      type: Number,
      default: 0,
    },

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
categorySchema.index({ slug: 1 }, { unique: true });
categorySchema.index({ name: 1 }, { unique: true });
categorySchema.index({ isActive: 1, displayOrder: 1 });
categorySchema.index({ name: "text" });

// ==============================
// Virtuals
// ==============================
categorySchema.virtual("productCount", {
  ref: "Product",
  localField: "_id",
  foreignField: "category",
  count: true,
});

// ==============================
// Pre Save — Auto Slug
// ==============================
categorySchema.pre("save", async function () {
  if (this.isModified("name")) {
    this.slug = slugify(this.name, {
      lower: true,
      strict: true,
      trim: true,
    });
  }
  if (!this.metaTitle) this.metaTitle = this.name;
});

// ==============================
// Static Methods
// ==============================
categorySchema.statics.getActiveCategories = function () {
  return this.find({ isActive: true }).sort({ displayOrder: 1 });
};

categorySchema.statics.findBySlug = function (slug) {
  return this.findOne({ slug, isActive: true });
};

// ==============================
// Plugins
// ==============================
categorySchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Category", categorySchema);
