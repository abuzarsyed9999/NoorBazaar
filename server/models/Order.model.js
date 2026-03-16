const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const orderItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    name: { type: String, required: true },
    nameArabic: { type: String },
    image: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 1 },
  },
  { _id: true },
);

const statusHistorySchema = new mongoose.Schema(
  {
    status: { type: String, required: true },
    message: { type: String },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    timestamp: { type: Date, default: Date.now },
  },
  { _id: false },
);

const orderSchema = new mongoose.Schema(
  {
    // ==============================
    // Order Reference
    // ==============================
    orderNumber: {
      type: String,
      uppercase: true,
    },

    // ==============================
    // User
    // ==============================
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },

    // ==============================
    // Items
    // ==============================
    items: {
      type: [orderItemSchema],
      validate: {
        validator: (items) => items.length > 0,
        message: "Order must have at least one item",
      },
    },

    // ==============================
    // Shipping Address
    // ==============================
    shippingAddress: {
      fullName: { type: String, required: true },
      phone: { type: String, required: true },
      addressLine1: { type: String, required: true },
      addressLine2: { type: String },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true },
      country: { type: String, default: "India" },
    },

    // ==============================
    // Payment
    // ==============================
    paymentMethod: {
      type: String,
      enum: {
        values: ["COD", "Razorpay"],
        message: "Payment method must be COD or Razorpay",
      },
      required: true,
    },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed", "Refunded"],
      default: "Pending",
    },

    paymentInfo: {
      razorpay_order_id: { type: String },
      razorpay_payment_id: { type: String },
      razorpay_signature: { type: String },
      paidAt: { type: Date },
    },

    // ==============================
    // Pricing
    // ==============================
    itemsPrice: { type: Number, required: true, default: 0 },
    shippingPrice: { type: Number, required: true, default: 0 },
    taxPrice: { type: Number, required: true, default: 0 },
    discountAmount: { type: Number, default: 0 },
    totalPrice: { type: Number, required: true, default: 0 },

    // ==============================
    // Coupon
    // ==============================
    coupon: {
      code: { type: String, uppercase: true },
      discountAmount: { type: Number, default: 0 },
    },

    // ==============================
    // Order Status
    // ==============================
    orderStatus: {
      type: String,
      enum: [
        "Pending",
        "Confirmed",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
        "Refunded",
      ],
      default: "Pending",
    },

    statusHistory: {
      type: [statusHistorySchema],
      default: [],
    },

    // ==============================
    // Tracking
    // ==============================
    trackingNumber: { type: String },
    trackingUrl: { type: String },

    // ==============================
    // Timestamps
    // ==============================
    confirmedAt: { type: Date },
    shippedAt: { type: Date },
    deliveredAt: { type: Date },
    cancelledAt: { type: Date },
    refundedAt: { type: Date },

    cancellationReason: { type: String },
    refundReason: { type: String },

    // ==============================
    // Gift
    // ==============================
    isGift: { type: Boolean, default: false },
    giftMessage: { type: String, maxlength: 200 },
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
orderSchema.index({ orderNumber: 1 }, { unique: true, sparse: true });
orderSchema.index({ user: 1, createdAt: -1 });
orderSchema.index({ orderStatus: 1 });
orderSchema.index({ paymentStatus: 1 });
orderSchema.index({ createdAt: -1 });

// ==============================
// Virtuals
// ==============================
orderSchema.virtual("isCancellable").get(function () {
  return ["Pending", "Confirmed"].includes(this.orderStatus);
});

orderSchema.virtual("isDelivered").get(function () {
  return this.orderStatus === "Delivered";
});

orderSchema.virtual("totalQuantity").get(function () {
  return this.items.reduce((sum, item) => sum + item.quantity, 0);
});

// ==============================
// Pre Save — Order Number + Status History
// ==============================
orderSchema.pre("save", async function () {
  if (!this.orderNumber) {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0");
    this.orderNumber = `NB${timestamp}${random}`;
  }

  if (this.isModified("orderStatus")) {
    this.statusHistory.push({
      status: this.orderStatus,
      timestamp: new Date(),
    });
    if (this.orderStatus === "Delivered") this.deliveredAt = new Date();
    if (this.orderStatus === "Cancelled") this.cancelledAt = new Date();
    if (this.orderStatus === "Shipped") this.shippedAt = new Date();
    if (this.orderStatus === "Confirmed") this.confirmedAt = new Date();
  }
});

// ==============================
// Static Methods
// ==============================
orderSchema.statics.getRevenueStats = async function () {
  return await this.aggregate([
    { $match: { paymentStatus: "Paid" } },
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: "$totalPrice" },
        totalOrders: { $sum: 1 },
        avgOrderValue: { $avg: "$totalPrice" },
      },
    },
  ]);
};

orderSchema.statics.getMonthlySales = async function (year) {
  return await this.aggregate([
    {
      $match: {
        paymentStatus: "Paid",
        createdAt: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },
    {
      $group: {
        _id: { month: { $month: "$createdAt" } },
        revenue: { $sum: "$totalPrice" },
        orders: { $sum: 1 },
      },
    },
    { $sort: { "_id.month": 1 } },
  ]);
};

// ==============================
// Plugins
// ==============================
orderSchema.plugin(mongoosePaginate);
orderSchema.plugin(aggregatePaginate);

module.exports = mongoose.model("Order", orderSchema);
