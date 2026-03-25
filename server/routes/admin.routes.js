// // const express = require("express");
// // const router = express.Router();

// // const {
// //   getDashboardStats,
// //   getAllUsers,
// //   getSingleUser,
// //   updateUserRole,
// //   deleteUser,
// //   toggleUserStatus,
// //   getSalesReport,
// // } = require("../controllers/admin.controller");

// // const { isAuthenticated } = require("../middleware/auth.middleware");
// // const { isAdmin } = require("../middleware/auth.middleware");

// // // All admin routes are protected
// // router.use(isAuthenticated);
// // router.use(isAdmin);

// // // ==============================
// // // Dashboard
// // // ==============================
// // router.get("/dashboard", getDashboardStats);
// // router.get("/sales", getSalesReport);

// // // ==============================
// // // User Management
// // // ==============================
// // router.get("/users", getAllUsers);
// // router.get("/users/:id", getSingleUser);
// // router.put("/users/:id/role", updateUserRole);
// // router.delete("/users/:id", deleteUser);
// // router.patch("/users/:id/toggle", toggleUserStatus);

// // // ── All admin routes require auth + admin role ──
// // router.use(isAuthenticated, isAdmin);

// // router.get("/dashboard", getDashboardStats);
// // router.get("/sales", getSalesReport);
// // router.get("/users", getAllUsers);
// // router.get("/users/:id", getSingleUser);
// // router.put("/users/:id/role", updateUserRole);
// // router.delete("/users/:id", deleteUser);
// // router.put("/users/:id/toggle", toggleUserStatus);

// // module.exports = router;

// const express = require("express");
// const router = express.Router();

// const {
//   getDashboardStats,
//   getAllUsers,
//   getSingleUser,
//   updateUserRole,
//   deleteUser,
//   toggleUserStatus,
//   getSalesReport,
// } = require("../controllers/admin.controller");

// const { isAuthenticated } = require("../middleware/auth.middleware");
// const { isAdmin } = require("../middleware/admin.middleware");

// const Order = require("../models/Order.model");
// const Product = require("../models/Product.model");
// const Category = require("../models/Category.model");
// const Coupon = require("../models/Coupon.model");
// const Review = require("../models/Review.model");

// // ── All routes require auth + admin ──
// router.use(isAuthenticated, isAdmin);

// // ==============================
// // Dashboard
// // ==============================
// router.get("/dashboard", getDashboardStats);
// router.get("/sales", getSalesReport);

// // ==============================
// // Users
// // ==============================
// router.get("/users", getAllUsers);
// router.get("/users/:id", getSingleUser);
// router.put("/users/:id/role", updateUserRole);
// router.delete("/users/:id", deleteUser);
// router.patch("/users/:id/toggle", toggleUserStatus);

// // ==============================
// // Orders
// // ==============================
// router.get("/orders", async (req, res, next) => {
//   try {
//     const orders = await Order.find()
//       .populate("user", "name email phone")
//       .sort("-createdAt")
//       .lean();

//     res.status(200).json({
//       success: true,
//       count: orders.length,
//       data: orders,
//     });
//   } catch (err) {
//     next(err);
//   }
// });

// router.put("/orders/:id/status", async (req, res, next) => {
//   try {
//     const { status } = req.body;
//     const validStatuses = [
//       "Pending",
//       "Confirmed",
//       "Processing",
//       "Shipped",
//       "Delivered",
//       "Cancelled",
//       "Refunded",
//     ];

//     if (!validStatuses.includes(status)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid order status",
//       });
//     }

//     const order = await Order.findById(req.params.id);
//     if (!order) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Order not found" });
//     }

//     order.orderStatus = status;

//     if (status === "Delivered") {
//       order.paymentStatus = "Paid";
//       order.deliveredAt = new Date();
//     }
//     if (status === "Cancelled") {
//       order.cancelledAt = new Date();
//     }

//     await order.save();

//     res.status(200).json({
//       success: true,
//       message: `Order updated to ${status}`,
//       data: order,
//     });
//   } catch (err) {
//     next(err);
//   }
// });

// // ==============================
// // Products
// // ==============================
// router.get("/products", async (req, res, next) => {
//   try {
//     const products = await Product.find()
//       .populate("category", "name slug")
//       .sort("-createdAt")
//       .lean();

//     res.status(200).json({
//       success: true,
//       count: products.length,
//       data: products,
//     });
//   } catch (err) {
//     next(err);
//   }
// });

// router.put("/products/:id/toggle", async (req, res, next) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Product not found" });
//     }

//     product.isActive = !product.isActive;
//     await product.save();

//     res.status(200).json({
//       success: true,
//       message: `Product ${product.isActive ? "activated" : "deactivated"}`,
//       data: product,
//     });
//   } catch (err) {
//     next(err);
//   }
// });

// router.delete("/products/:id", async (req, res, next) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Product not found" });
//     }

//     // Delete images from Cloudinary if they exist
//     try {
//       const { deleteMultipleImages } = require("../utils/uploadToCloudinary");
//       const imageIds = product.images
//         .map((img) => img.public_id)
//         .filter(Boolean);
//       if (imageIds.length > 0) await deleteMultipleImages(imageIds);
//     } catch (cloudErr) {
//       console.warn("Cloudinary delete warning:", cloudErr.message);
//     }

//     await product.deleteOne();

//     res
//       .status(200)
//       .json({ success: true, message: "Product deleted successfully" });
//   } catch (err) {
//     next(err);
//   }
// });

// // ==============================
// // Categories
// // ==============================
// router.get("/categories", async (req, res, next) => {
//   try {
//     const categories = await Category.find().sort("-createdAt").lean();

//     res.status(200).json({
//       success: true,
//       count: categories.length,
//       data: categories,
//     });
//   } catch (err) {
//     next(err);
//   }
// });

// router.post("/categories", async (req, res, next) => {
//   try {
//     const { name, nameArabic, description } = req.body;

//     if (!name?.trim()) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Category name is required" });
//     }

//     const category = await Category.create({ name, nameArabic, description });

//     res.status(201).json({ success: true, data: category });
//   } catch (err) {
//     // Handle duplicate key error
//     if (err.code === 11000) {
//       return res.status(400).json({
//         success: false,
//         message: "Category with this name already exists",
//       });
//     }
//     next(err);
//   }
// });

// router.put("/categories/:id", async (req, res, next) => {
//   try {
//     const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//       runValidators: true,
//     });
//     if (!category) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Category not found" });
//     }
//     res.status(200).json({ success: true, data: category });
//   } catch (err) {
//     next(err);
//   }
// });

// router.put("/categories/:id/toggle", async (req, res, next) => {
//   try {
//     const category = await Category.findById(req.params.id);
//     if (!category) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Category not found" });
//     }

//     category.isActive = !category.isActive;
//     await category.save();

//     res.status(200).json({
//       success: true,
//       message: `Category ${category.isActive ? "activated" : "deactivated"}`,
//       data: category,
//     });
//   } catch (err) {
//     next(err);
//   }
// });

// router.delete("/categories/:id", async (req, res, next) => {
//   try {
//     const category = await Category.findById(req.params.id);
//     if (!category) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Category not found" });
//     }

//     // Safety check — don't delete if products exist
//     const productCount = await Product.countDocuments({
//       category: req.params.id,
//     });
//     if (productCount > 0) {
//       return res.status(400).json({
//         success: false,
//         message: `Cannot delete — ${productCount} product${productCount > 1 ? "s" : ""} use this category`,
//       });
//     }

//     await category.deleteOne();

//     res
//       .status(200)
//       .json({ success: true, message: "Category deleted successfully" });
//   } catch (err) {
//     next(err);
//   }
// });

// // ==============================
// // Coupons
// // ==============================
// router.get("/coupons", async (req, res, next) => {
//   try {
//     const coupons = await Coupon.find().sort("-createdAt").lean();

//     res.status(200).json({
//       success: true,
//       count: coupons.length,
//       data: coupons,
//     });
//   } catch (err) {
//     next(err);
//   }
// });

// router.post("/coupons", async (req, res, next) => {
//   try {
//     const {
//       code,
//       discountType,
//       discount,
//       minOrderAmount,
//       maxDiscountAmount,
//       expiresAt,
//       usageLimit,
//     } = req.body;

//     if (!code?.trim()) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Coupon code is required" });
//     }
//     if (!discount || Number(discount) <= 0) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Discount value is required" });
//     }
//     if (discountType === "percentage" && Number(discount) > 100) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Percentage cannot exceed 100" });
//     }

//     const coupon = await Coupon.create({
//       code: code.toUpperCase().trim(),
//       discountType: discountType || "percentage",
//       discount: Number(discount),
//       minOrderAmount: Number(minOrderAmount) || 0,
//       maxDiscountAmount: Number(maxDiscountAmount) || undefined,
//       expiresAt: expiresAt || undefined,
//       usageLimit: Number(usageLimit) || undefined,
//     });

//     res.status(201).json({ success: true, data: coupon });
//   } catch (err) {
//     if (err.code === 11000) {
//       return res.status(400).json({
//         success: false,
//         message: "Coupon code already exists",
//       });
//     }
//     next(err);
//   }
// });

// router.put("/coupons/:id/toggle", async (req, res, next) => {
//   try {
//     const coupon = await Coupon.findById(req.params.id);
//     if (!coupon) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Coupon not found" });
//     }

//     coupon.isActive = !coupon.isActive;
//     await coupon.save();

//     res.status(200).json({
//       success: true,
//       message: `Coupon ${coupon.isActive ? "enabled" : "disabled"}`,
//       data: coupon,
//     });
//   } catch (err) {
//     next(err);
//   }
// });

// router.delete("/coupons/:id", async (req, res, next) => {
//   try {
//     const coupon = await Coupon.findByIdAndDelete(req.params.id);
//     if (!coupon) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Coupon not found" });
//     }
//     res
//       .status(200)
//       .json({ success: true, message: "Coupon deleted successfully" });
//   } catch (err) {
//     next(err);
//   }
// });

// // ==============================
// // Reviews
// // ==============================
// router.get("/reviews", async (req, res, next) => {
//   try {
//     const reviews = await Review.find()
//       .populate("user", "name email")
//       .populate("product", "name images slug")
//       .sort("-createdAt")
//       .lean();

//     res.status(200).json({
//       success: true,
//       count: reviews.length,
//       data: reviews,
//     });
//   } catch (err) {
//     next(err);
//   }
// });

// router.delete("/reviews/:id", async (req, res, next) => {
//   try {
//     const review = await Review.findByIdAndDelete(req.params.id);
//     if (!review) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Review not found" });
//     }
//     res
//       .status(200)
//       .json({ success: true, message: "Review deleted successfully" });
//   } catch (err) {
//     next(err);
//   }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();

const {
  getDashboardStats,
  getAllUsers,
  getSingleUser,
  updateUserRole,
  deleteUser,
  toggleUserStatus,
  getSalesReport,
} = require("../controllers/admin.controller");

const { isAuthenticated } = require("../middleware/auth.middleware");
const { isAdmin } = require("../middleware/admin.middleware");

const Order = require("../models/Order.model");
const Product = require("../models/Product.model");
const Category = require("../models/Category.model");
const Coupon = require("../models/Coupon.model");
const Review = require("../models/Review.model");

// ── All routes require auth + admin ──
router.use(isAuthenticated, isAdmin);

// ==============================
// Dashboard
// ==============================
router.get("/dashboard", getDashboardStats);
router.get("/sales", getSalesReport);

// ==============================
// Users
// ==============================
router.get("/users", getAllUsers);
router.get("/users/:id", getSingleUser);
router.put("/users/:id/role", updateUserRole);
router.delete("/users/:id", deleteUser);
router.patch("/users/:id/toggle", toggleUserStatus);

// ==============================
// Orders
// ==============================
router.get("/orders", async (req, res, next) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email phone")
      .sort("-createdAt")
      .lean();
    res.status(200).json({ success: true, count: orders.length, data: orders });
  } catch (err) {
    next(err);
  }
});

router.put("/orders/:id/status", async (req, res, next) => {
  try {
    const { status } = req.body;
    const validStatuses = [
      "Pending",
      "Confirmed",
      "Processing",
      "Shipped",
      "Delivered",
      "Cancelled",
      "Refunded",
    ];
    if (!validStatuses.includes(status)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid order status" });
    }
    const order = await Order.findById(req.params.id);
    if (!order)
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });

    order.orderStatus = status;
    if (status === "Delivered") {
      order.paymentStatus = "Paid";
      order.deliveredAt = new Date();
    }
    if (status === "Cancelled") {
      order.cancelledAt = new Date();
    }
    await order.save();

    res.status(200).json({
      success: true,
      message: `Order updated to ${status}`,
      data: order,
    });
  } catch (err) {
    next(err);
  }
});

// ==============================
// Products
// ==============================
router.get("/products", async (req, res, next) => {
  try {
    const products = await Product.find()
      .populate("category", "name slug")
      .sort("-createdAt")
      .lean();
    res
      .status(200)
      .json({ success: true, count: products.length, data: products });
  } catch (err) {
    next(err);
  }
});

router.put("/products/:id/toggle", async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    product.isActive = !product.isActive;
    await product.save();
    res.status(200).json({
      success: true,
      message: `Product ${product.isActive ? "activated" : "deactivated"}`,
      data: product,
    });
  } catch (err) {
    next(err);
  }
});

router.delete("/products/:id", async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    try {
      const { deleteMultipleImages } = require("../utils/uploadToCloudinary");
      const imageIds = product.images
        .map((img) => img.public_id)
        .filter(Boolean);
      if (imageIds.length > 0) await deleteMultipleImages(imageIds);
    } catch (cloudErr) {
      console.warn("Cloudinary warning:", cloudErr.message);
    }
    await product.deleteOne();
    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (err) {
    next(err);
  }
});

// ==============================
// Categories
// ==============================
router.get("/categories", async (req, res, next) => {
  try {
    const categories = await Category.find().sort("-createdAt").lean();
    res
      .status(200)
      .json({ success: true, count: categories.length, data: categories });
  } catch (err) {
    next(err);
  }
});

router.post("/categories", async (req, res, next) => {
  try {
    const { name, nameArabic, description } = req.body;
    if (!name?.trim())
      return res
        .status(400)
        .json({ success: false, message: "Category name is required" });
    const category = await Category.create({ name, nameArabic, description });
    res.status(201).json({ success: true, data: category });
  } catch (err) {
    if (err.code === 11000)
      return res.status(400).json({
        success: false,
        message: "Category with this name already exists",
      });
    next(err);
  }
});

router.put("/categories/:id", async (req, res, next) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!category)
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    res.status(200).json({ success: true, data: category });
  } catch (err) {
    next(err);
  }
});

router.put("/categories/:id/toggle", async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category)
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    category.isActive = !category.isActive;
    await category.save();
    res.status(200).json({
      success: true,
      message: `Category ${category.isActive ? "activated" : "deactivated"}`,
      data: category,
    });
  } catch (err) {
    next(err);
  }
});

router.delete("/categories/:id", async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category)
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    const productCount = await Product.countDocuments({
      category: req.params.id,
    });
    if (productCount > 0) {
      return res.status(400).json({
        success: false,
        message: `Cannot delete — ${productCount} product${productCount > 1 ? "s" : ""} use this category`,
      });
    }
    await category.deleteOne();
    res
      .status(200)
      .json({ success: true, message: "Category deleted successfully" });
  } catch (err) {
    next(err);
  }
});

// ==============================
// Coupons
// ==============================
router.get("/coupons", async (req, res, next) => {
  try {
    const coupons = await Coupon.find().sort("-createdAt").lean();
    res
      .status(200)
      .json({ success: true, count: coupons.length, data: coupons });
  } catch (err) {
    next(err);
  }
});

// router.post("/coupons", async (req, res, next) => {
//   try {
//     const {
//       code,
//       discountType,
//       discount,
//       minOrderAmount,
//       maxDiscountAmount,
//       expiresAt,
//       usageLimit,
//     } = req.body;

/*
// router.post("/coupons", async (req, res, next) => {
//   try {
//     const {
//       code,
//       description,
//       discountType,
//       discountValue, // ✅ Fixed: was 'discount'
//       maxDiscountAmount,
//       minOrderAmount,
//       maxUsageLimit,
//       maxUsagePerUser,
//       expiryDate, // ✅ Fixed: was 'expiresAt'
//       startDate,
//       occasion,
//       isActive,
//     } = req.body;

//     // if (!code?.trim()) {
//     //   return res
//     //     .status(400)
//     //     .json({ success: false, message: "Coupon code is required" });
//     // }
//     // if (!discount || Number(discount) <= 0) {
//     //   return res
//     //     .status(400)
//     //     .json({ success: false, message: "Discount value is required" });
//     // }
//     // if (discountType === "percentage" && Number(discount) > 100) {
//     //   return res
//     //     .status(400)
//     //     .json({ success: false, message: "Percentage cannot exceed 100" });
//     // }
//     // Validation
//     if (!code?.trim()) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Coupon code is required" });
//     }
//     if (!discountType || !["percentage", "fixed"].includes(discountType)) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Valid discount type is required" });
//     }
//     if (discountValue === undefined || Number(discountValue) <= 0) {
//       return res.status(400).json({
//         success: false,
//         message: "Discount value must be greater than 0",
//       });
//     }
//     if (discountType === "percentage" && Number(discountValue) > 100) {
//       return res.status(400).json({
//         success: false,
//         message: "Percentage discount cannot exceed 100",
//       });
//     }

//     // ✅ Fix: properly parse date
//     // let parsedExpiry = undefined;
//     // if (expiresAt) {
//     //   parsedExpiry = new Date(expiresAt);
//     //   if (isNaN(parsedExpiry.getTime())) {
//     //     return res
//     //       .status(400)
//     //       .json({ success: false, message: "Invalid expiry date format" });
//     //   }
//     // }
//     // ✅ Parse expiryDate properly
//     let parsedExpiry = undefined;
//     if (expiryDate) {
//       parsedExpiry = new Date(expiryDate);
//       if (isNaN(parsedExpiry.getTime())) {
//         return res
//           .status(400)
//           .json({ success: false, message: "Invalid expiry date format" });
//       }
//     }
//     // ✅ Parse startDate if provided
//     let parsedStart = undefined;
//     if (startDate) {
//       parsedStart = new Date(startDate);
//       if (isNaN(parsedStart.getTime())) {
//         return res
//           .status(400)
//           .json({ success: false, message: "Invalid start date format" });
//       }
//     }

//     // const coupon = await Coupon.create({
//     //   code: code.toUpperCase().trim(),
//     //   discountType: discountType || "percentage",
//     //   discount: Number(discount),
//     //   minOrderAmount: Number(minOrderAmount) || 0,
//     //   maxDiscountAmount: Number(maxDiscountAmount) || undefined,
//     //   expiresAt: parsedExpiry || undefined,
//     //   usageLimit: Number(usageLimit) || undefined,
//     // });

//     const coupon = await Coupon.create({
//       code: code.toUpperCase().trim(),
//       description: description?.trim(),
//       discountType,
//       discountValue: Number(discountValue), // ✅ Correct field name
//       maxDiscountAmount: maxDiscountAmount
//         ? Number(maxDiscountAmount)
//         : undefined,
//       minOrderAmount: minOrderAmount ? Number(minOrderAmount) : 0,
//       maxUsageLimit: maxUsageLimit ? Number(maxUsageLimit) : undefined,
//       maxUsagePerUser: maxUsagePerUser ? Number(maxUsagePerUser) : 1,
//       expiryDate: parsedExpiry, // ✅ Correct field name
//       startDate: parsedStart || Date.now(),
//       occasion: occasion || "None",
//       isActive: isActive !== undefined ? Boolean(isActive) : true,
//       createdBy: req.user._id,
//     });

//     //     res.status(201).json({ success: true, data: coupon });
//     //   } catch (err) {
//     //     if (err.code === 11000) {
//     //       return res
//     //         .status(400)
//     //         .json({ success: false, message: "Coupon code already exists" });
//     //     }
//     //     next(err);
//     //   }
//     // });
//     res.status(201).json({ success: true, data: coupon });
//   } catch (err) {
//     if (err.code === 11000) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Coupon code already exists" });
//     }
//     if (err.name === "ValidationError") {
//       const messages = Object.values(err.errors).map((e) => e.message);
//       return res
//         .status(400)
//         .json({
//           success: false,
//           message: "Validation failed",
//           errors: messages,
//         });
//     }
//     next(err);
//   }
// });

*/
router.post("/coupons", async (req, res, next) => {
  try {
    const {
      code,
      discountType,
      discount,
      minOrderAmount,
      maxDiscountAmount,
      expiresAt,
      usageLimit,
    } = req.body;

    if (!code?.trim()) {
      return res
        .status(400)
        .json({ success: false, message: "Coupon code is required" });
    }
    if (!discount || Number(discount) <= 0) {
      return res
        .status(400)
        .json({ success: false, message: "Discount value is required" });
    }
    if (discountType === "percentage" && Number(discount) > 100) {
      return res
        .status(400)
        .json({ success: false, message: "Percentage cannot exceed 100" });
    }
    if (!expiresAt) {
      return res
        .status(400)
        .json({ success: false, message: "Expiry date is required" });
    }

    const parsedExpiry = new Date(expiresAt);
    if (isNaN(parsedExpiry.getTime())) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid expiry date" });
    }

    const coupon = await Coupon.create({
      code: code.toUpperCase().trim(),
      discountType: discountType || "percentage",
      discountValue: Number(discount), // ✅ CORRECT field name
      minOrderAmount: Number(minOrderAmount) || 0,
      maxDiscountAmount: maxDiscountAmount ? Number(maxDiscountAmount) : null,
      expiryDate: parsedExpiry, // ✅ CORRECT field name
      maxUsageLimit: usageLimit ? Number(usageLimit) : null, // ✅ CORRECT field name
      createdBy: req.user._id,
    });

    res.status(201).json({ success: true, data: coupon });
  } catch (err) {
    if (err.code === 11000) {
      return res
        .status(400)
        .json({ success: false, message: "Coupon code already exists" });
    }
    next(err);
  }
});

router.put("/coupons/:id/toggle", async (req, res, next) => {
  try {
    const coupon = await Coupon.findById(req.params.id);
    if (!coupon)
      return res
        .status(404)
        .json({ success: false, message: "Coupon not found" });
    coupon.isActive = !coupon.isActive;
    await coupon.save();
    res.status(200).json({
      success: true,
      message: `Coupon ${coupon.isActive ? "enabled" : "disabled"}`,
      data: coupon,
    });
  } catch (err) {
    next(err);
  }
});

router.delete("/coupons/:id", async (req, res, next) => {
  try {
    const coupon = await Coupon.findByIdAndDelete(req.params.id);
    if (!coupon)
      return res
        .status(404)
        .json({ success: false, message: "Coupon not found" });
    res
      .status(200)
      .json({ success: true, message: "Coupon deleted successfully" });
  } catch (err) {
    next(err);
  }
});

// ==============================
// Reviews
// ==============================
router.get("/reviews", async (req, res, next) => {
  try {
    const reviews = await Review.find()
      .populate("user", "name email")
      .populate("product", "name images slug")
      .sort("-createdAt")
      .lean();
    res
      .status(200)
      .json({ success: true, count: reviews.length, data: reviews });
  } catch (err) {
    next(err);
  }
});

router.delete("/reviews/:id", async (req, res, next) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review)
      return res
        .status(404)
        .json({ success: false, message: "Review not found" });
    res
      .status(200)
      .json({ success: true, message: "Review deleted successfully" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
