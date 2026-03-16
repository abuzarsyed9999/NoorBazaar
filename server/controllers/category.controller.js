const Category = require("../models/Category.model");
const Product = require("../models/Product.model");
const ErrorHandler = require("../utils/errorHandler");
const logger = require("../utils/logger");
const {
  uploadSingleImage,
  deleteImage,
} = require("../utils/uploadToCloudinary");

// ==============================
// @desc    Get All Categories
// @route   GET /api/v1/categories
// @access  Public
// ==============================
exports.getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({ isActive: true })
      .sort({ displayOrder: 1 })
      .populate("productCount");

    res.status(200).json({
      success: true,
      message: "Categories fetched successfully",
      count: categories.length,
      data: categories,
    });
  } catch (error) {
    next(error);
  }
};

// ==============================
// @desc    Get Single Category
// @route   GET /api/v1/categories/:slug
// @access  Public
// ==============================
exports.getSingleCategory = async (req, res, next) => {
  try {
    const category = await Category.findOne({
      slug: req.params.slug,
      isActive: true,
    }).populate("productCount");

    if (!category) {
      return next(new ErrorHandler("Category not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Category fetched successfully",
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

// ==============================
// @desc    Create Category
// @route   POST /api/v1/categories
// @access  Admin
// ==============================
exports.createCategory = async (req, res, next) => {
  try {
    const { name, nameArabic, description, displayOrder } = req.body;

    // Check duplicate name
    const existing = await Category.findOne({
      name: { $regex: new RegExp(`^${name}$`, "i") },
    });
    if (existing) {
      return next(
        new ErrorHandler("Category with this name already exists", 400),
      );
    }

    // Upload image if provided
    let image = undefined;
    if (req.file) {
      image = await uploadSingleImage(req.file.buffer, "noorbazaar/categories");
    }

    const category = await Category.create({
      name,
      nameArabic,
      description,
      displayOrder,
      ...(image && { image }),
    });

    logger.info(`✅ Category created: ${name}`);

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

// ==============================
// @desc    Update Category
// @route   PUT /api/v1/categories/:id
// @access  Admin
// ==============================
exports.updateCategory = async (req, res, next) => {
  try {
    let category = await Category.findById(req.params.id);

    if (!category) {
      return next(new ErrorHandler("Category not found", 404));
    }

    // Upload new image if provided
    if (req.file) {
      // Delete old image
      if (
        category.image.public_id &&
        category.image.public_id !== "noorbazaar/categories/default"
      ) {
        await deleteImage(category.image.public_id);
      }
      req.body.image = await uploadSingleImage(
        req.file.buffer,
        "noorbazaar/categories",
      );
    }

    category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    logger.info(`✅ Category updated: ${category.name}`);

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

// ==============================
// @desc    Delete Category
// @route   DELETE /api/v1/categories/:id
// @access  Admin
// ==============================
exports.deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return next(new ErrorHandler("Category not found", 404));
    }

    // Check if category has products
    const productCount = await Product.countDocuments({
      category: req.params.id,
    });

    if (productCount > 0) {
      return next(
        new ErrorHandler(
          `Cannot delete category. It has ${productCount} products. Please reassign or delete products first.`,
          400,
        ),
      );
    }

    // Delete image from cloudinary
    if (
      category.image.public_id &&
      category.image.public_id !== "noorbazaar/categories/default"
    ) {
      await deleteImage(category.image.public_id);
    }

    await category.deleteOne();

    logger.info(`🗑️ Category deleted: ${category.name}`);

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// ==============================
// @desc    Toggle Category Status
// @route   PATCH /api/v1/categories/:id/toggle
// @access  Admin
// ==============================
exports.toggleCategoryStatus = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return next(new ErrorHandler("Category not found", 404));
    }

    category.isActive = !category.isActive;
    await category.save();

    logger.info(
      `✅ Category ${category.isActive ? "activated" : "deactivated"}: ${category.name}`,
    );

    res.status(200).json({
      success: true,
      message: `Category ${category.isActive ? "activated" : "deactivated"} successfully`,
      data: category,
    });
  } catch (error) {
    next(error);
  }
};
