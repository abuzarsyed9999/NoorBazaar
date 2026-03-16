const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Product is required"],
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, "Quantity must be at least 1"],
      max: [10, "Quantity cannot exceed 10"],
      default: 1,
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Price cannot be negative"],
    },
  },
  { _id: true },
);

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: {
      type: [cartItemSchema],
      default: [],
    },

    coupon: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Coupon",
      default: null,
    },

    totalItems: {
      type: Number,
      default: 0,
    },

    totalPrice: {
      type: Number,
      default: 0,
    },

    discountAmount: {
      type: Number,
      default: 0,
    },

    finalPrice: {
      type: Number,
      default: 0,
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
cartSchema.index({ user: 1 }, { unique: true });

// ==============================
// Virtuals
// ==============================
cartSchema.virtual("isEmpty").get(function () {
  return this.items.length === 0;
});

cartSchema.virtual("itemCount").get(function () {
  return this.items.reduce((sum, item) => sum + item.quantity, 0);
});

// ==============================
// Pre Save — Auto Calculate
// ==============================
cartSchema.pre("save", async function () {
  this.totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
  this.totalPrice = this.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  this.finalPrice = this.totalPrice - (this.discountAmount || 0);
  if (this.finalPrice < 0) this.finalPrice = 0;
});

// ==============================
// Instance Methods
// ==============================
cartSchema.methods.addItem = function (productId, price, quantity = 1) {
  const existingItem = this.items.find(
    (item) => item.product.toString() === productId.toString(),
  );
  if (existingItem) {
    existingItem.quantity = Math.min(existingItem.quantity + quantity, 10);
  } else {
    this.items.push({ product: productId, price, quantity });
  }
};

cartSchema.methods.removeItem = function (productId) {
  this.items = this.items.filter(
    (item) => item.product.toString() !== productId.toString(),
  );
};

cartSchema.methods.updateQuantity = function (productId, quantity) {
  const item = this.items.find(
    (item) => item.product.toString() === productId.toString(),
  );
  if (item) item.quantity = Math.min(Math.max(1, quantity), 10);
};

cartSchema.methods.clearCart = function () {
  this.items = [];
  this.coupon = null;
  this.discountAmount = 0;
};

module.exports = mongoose.model("Cart", cartSchema);
