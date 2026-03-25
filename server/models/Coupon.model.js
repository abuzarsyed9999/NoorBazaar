const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const couponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: [true, "Please enter coupon code"],
      trim: true,
      uppercase: true,
      minlength: [3, "Coupon code must be at least 3 characters"],
      maxlength: [20, "Coupon code cannot exceed 20 characters"],
      match: [
        /^[A-Z0-9]+$/,
        "Coupon code can only contain letters and numbers",
      ],
    },

    description: {
      type: String,
      trim: true,
      maxlength: [100, "Description cannot exceed 100 characters"],
    },

    discountType: {
      type: String,
      enum: {
        values: ["percentage", "fixed"],
        message: "Discount type must be percentage or fixed",
      },
      required: [true, "Please select discount type"],
    },

    discountValue: {
      type: Number,
      required: [true, "Please enter discount value"],
      min: [1, "Discount value must be at least 1"],
    },

    maxDiscountAmount: {
      type: Number,
      default: null,
      min: [0, "Max discount cannot be negative"],
    },

    minOrderAmount: {
      type: Number,
      default: 0,
      min: [0, "Minimum order amount cannot be negative"],
    },

    maxUsageLimit: {
      type: Number,
      default: null,
    },

    maxUsagePerUser: {
      type: Number,
      default: 1,
      min: [1, "Max usage per user must be at least 1"],
    },

    usedCount: {
      type: Number,
      default: 0,
    },

    usedBy: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        usedAt: { type: Date, default: Date.now },
        usedCount: { type: Number, default: 1 },
      },
    ],

    startDate: {
      type: Date,
      default: Date.now,
    },

    expiryDate: {
      type: Date,
      required: [true, "Please enter expiry date"],
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    occasion: {
      type: String,
      enum: ["None", "Ramadan", "Eid", "Special", "NewYear"],
      default: "None",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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
couponSchema.index({ code: 1 }, { unique: true });
couponSchema.index({ isActive: 1, expiryDate: 1 });
couponSchema.index({ expiryDate: 1 });

// ==============================
// Virtuals
// ==============================
couponSchema.virtual("isExpired").get(function () {
  return new Date() > this.expiryDate;
});

couponSchema.virtual("isStarted").get(function () {
  return new Date() >= this.startDate;
});

couponSchema.virtual("remainingUsage").get(function () {
  if (!this.maxUsageLimit) return "Unlimited";
  return this.maxUsageLimit - this.usedCount;
});

// ==============================
// Instance Methods
// ==============================
couponSchema.methods.isValid = function (orderAmount, userId) {
  if (!this.isActive) return { valid: false, message: "Coupon is inactive" };
  if (new Date() < this.startDate)
    return { valid: false, message: "Coupon is not active yet" };
  if (new Date() > this.expiryDate)
    return { valid: false, message: "Coupon has expired" };
  if (this.maxUsageLimit && this.usedCount >= this.maxUsageLimit)
    return { valid: false, message: "Coupon usage limit reached" };
  if (orderAmount < this.minOrderAmount)
    return {
      valid: false,
      message: `Minimum order amount is ₹${this.minOrderAmount}`,
    };
  if (userId) {
    const userUsage = this.usedBy.find(
      (u) => u.user.toString() === userId.toString(),
    );
    if (userUsage && userUsage.usedCount >= this.maxUsagePerUser) {
      return { valid: false, message: "You have already used this coupon" };
    }
  }
  return { valid: true, message: "Coupon is valid" };
};

couponSchema.methods.calculateDiscount = function (orderAmount) {
  let discount = 0;
  if (this.discountType === "percentage") {
    discount = (orderAmount * this.discountValue) / 100;
    if (this.maxDiscountAmount) {
      discount = Math.min(discount, this.maxDiscountAmount);
    }
  } else {
    discount = this.discountValue;
  }
  return Math.min(Math.round(discount), orderAmount);
};

// ==============================
// Static Methods
// ==============================
couponSchema.statics.findByCode = function (code) {
  return this.findOne({
    code: code.toUpperCase().trim(),
    isActive: true,
  });
};

// ==============================
// Plugins
// ==============================
couponSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Coupon", couponSchema);
