const User = require("../models/User.model");
const Product = require("../models/Product.model");
const Order = require("../models/Order.model");
const Review = require("../models/Review.model");
const Category = require("../models/Category.model");
const ErrorHandler = require("../utils/errorHandler");
const logger = require("../utils/logger");

// ==============================
// @desc    Get Dashboard Stats
// @route   GET /api/v1/admin/dashboard
// @access  Admin
// ==============================
exports.getDashboardStats = async (req, res, next) => {
  try {
    // ==============================
    // Counts
    // ==============================
    const [
      totalUsers,
      totalProducts,
      totalOrders,
      totalCategories,
      totalReviews,
    ] = await Promise.all([
      User.countDocuments({ role: "user" }),
      Product.countDocuments({ isActive: true }),
      Order.countDocuments(),
      Category.countDocuments({ isActive: true }),
      Review.countDocuments({ isActive: true }),
    ]);

    // ==============================
    // Revenue Stats
    // ==============================
    const revenueStats = await Order.aggregate([
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

    // ==============================
    // Order Status Breakdown
    // ==============================
    const orderStatusBreakdown = await Order.aggregate([
      {
        $group: {
          _id: "$orderStatus",
          count: { $sum: 1 },
        },
      },
    ]);

    // ==============================
    // Recent Orders
    // ==============================
    const recentOrders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 })
      .limit(5);

    // ==============================
    // Recent Users
    // ==============================
    const recentUsers = await User.find({ role: "user" })
      .sort({ createdAt: -1 })
      .limit(5)
      .select("name email createdAt avatar");

    // ==============================
    // Top Selling Products
    // ==============================
    const topProducts = await Product.find({ isActive: true })
      .sort({ sold: -1 })
      .limit(5)
      .select("name price images sold ratings");

    // ==============================
    // Monthly Sales Current Year
    // ==============================
    const currentYear = new Date().getFullYear();
    const monthlySales = await Order.getMonthlySales(currentYear);

    // ==============================
    // Low Stock Products
    // ==============================
    const lowStockProducts = await Product.find({
      isActive: true,
      $expr: { $lte: ["$stock", "$lowStockThreshold"] },
    })
      .select("name stock lowStockThreshold images")
      .limit(10);

    res.status(200).json({
      success: true,
      message: "Dashboard stats fetched successfully",
      data: {
        counts: {
          totalUsers,
          totalProducts,
          totalOrders,
          totalCategories,
          totalReviews,
        },
        revenue: revenueStats[0] || {
          totalRevenue: 0,
          totalOrders: 0,
          avgOrderValue: 0,
        },
        orderStatusBreakdown,
        recentOrders,
        recentUsers,
        topProducts,
        monthlySales,
        lowStockProducts,
      },
    });
  } catch (error) {
    next(error);
  }
};

// ==============================
// @desc    Get All Users
// @route   GET /api/v1/admin/users
// @access  Admin
// ==============================
exports.getAllUsers = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const search = req.query.search;

    const filter = search
      ? {
          $or: [
            { name: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    const total = await User.countDocuments(filter);
    const users = await User.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select("-password -resetPasswordToken -resetPasswordExpire");

    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      count: users.length,
      total,
      pagination: {
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

// ==============================
// @desc    Get Single User
// @route   GET /api/v1/admin/users/:id
// @access  Admin
// ==============================
exports.getSingleUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select(
      "-password -resetPasswordToken -resetPasswordExpire",
    );

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    // Get user orders
    const orders = await Order.find({ user: req.params.id })
      .sort({ createdAt: -1 })
      .limit(5);

    // Get user reviews
    const reviews = await Review.find({ user: req.params.id })
      .populate("product", "name images")
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      data: {
        user,
        recentOrders: orders,
        recentReviews: reviews,
        totalOrders: await Order.countDocuments({ user: req.params.id }),
      },
    });
  } catch (error) {
    next(error);
  }
};

// ==============================
// @desc    Update User Role
// @route   PUT /api/v1/admin/users/:id/role
// @access  Admin
// ==============================
exports.updateUserRole = async (req, res, next) => {
  try {
    const { role } = req.body;

    if (!role || !["user", "admin"].includes(role)) {
      return next(new ErrorHandler("Role must be user or admin", 400));
    }

    // Prevent admin from changing own role
    if (req.params.id === req.user._id.toString()) {
      return next(new ErrorHandler("You cannot change your own role", 400));
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true },
    ).select("-password");

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    logger.info(
      `✅ User role updated: ${user.email} → ${role} by ${req.user.email}`,
    );

    res.status(200).json({
      success: true,
      message: `User role updated to ${role} successfully`,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// ==============================
// @desc    Delete User
// @route   DELETE /api/v1/admin/users/:id
// @access  Admin
// ==============================
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    // Prevent deleting own account
    if (req.params.id === req.user._id.toString()) {
      return next(new ErrorHandler("You cannot delete your own account", 400));
    }

    await user.deleteOne();

    logger.info(`🗑️ User deleted: ${user.email} by ${req.user.email}`);

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// ==============================
// @desc    Toggle User Status
// @route   PATCH /api/v1/admin/users/:id/toggle
// @access  Admin
// ==============================
exports.toggleUserStatus = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    if (req.params.id === req.user._id.toString()) {
      return next(
        new ErrorHandler("You cannot deactivate your own account", 400),
      );
    }

    user.isActive = !user.isActive;
    await user.save();

    logger.info(
      `✅ User ${user.isActive ? "activated" : "deactivated"}: ${user.email}`,
    );

    res.status(200).json({
      success: true,
      message: `User ${user.isActive ? "activated" : "deactivated"} successfully`,
      data: { isActive: user.isActive },
    });
  } catch (error) {
    next(error);
  }
};

// ==============================
// @desc    Get Sales Report
// @route   GET /api/v1/admin/sales
// @access  Admin
// ==============================
exports.getSalesReport = async (req, res, next) => {
  try {
    const year = Number(req.query.year) || new Date().getFullYear();
    const monthlySales = await Order.getMonthlySales(year);

    // Top categories by sales
    const topCategories = await Order.aggregate([
      { $match: { paymentStatus: "Paid" } },
      { $unwind: "$items" },
      {
        $lookup: {
          from: "products",
          localField: "items.product",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      { $unwind: "$productDetails" },
      {
        $group: {
          _id: "$productDetails.category",
          revenue: { $sum: { $multiply: ["$items.price", "$items.quantity"] } },
          quantity: { $sum: "$items.quantity" },
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "_id",
          foreignField: "_id",
          as: "category",
        },
      },
      { $unwind: "$category" },
      { $sort: { revenue: -1 } },
      { $limit: 5 },
    ]);

    // Payment method breakdown
    const paymentBreakdown = await Order.aggregate([
      { $match: { paymentStatus: "Paid" } },
      {
        $group: {
          _id: "$paymentMethod",
          count: { $sum: 1 },
          revenue: { $sum: "$totalPrice" },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      message: "Sales report fetched successfully",
      data: {
        year,
        monthlySales,
        topCategories,
        paymentBreakdown,
      },
    });
  } catch (error) {
    next(error);
  }
};
