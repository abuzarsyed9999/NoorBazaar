 
const Product = require("../models/Product.model");
const Category = require("../models/Category.model");
const ErrorHandler = require("../utils/errorHandler");
const ApiFeatures = require("../utils/apiFeatures");
const logger = require("../utils/logger");
const {
  uploadMultipleImages,
  deleteMultipleImages,
} = require("../utils/uploadToCloudinary");

// ==============================
// @desc    Get All Products
// @route   GET /api/v1/products
// @access  Public
// ==============================
exports.getAllProducts = async (req, res, next) => {
  try {
    const resPerPage = 12;

    // ✅ Build base filter
    const baseFilter = { isActive: true };

    // ✅ Handle category — slug OR ObjectId
    if (req.query.category) {
      const isObjectId = /^[0-9a-fA-F]{24}$/.test(req.query.category);

      if (isObjectId) {
        baseFilter.category = req.query.category;
      } else {
        // It's a slug — find category first
        const category = await Category.findOne({
          slug: req.query.category,
        }).lean();

        if (category) {
          baseFilter.category = category._id;
          // ✅ Replace slug with ObjectId in query so ApiFeatures works
          req.query.category = category._id.toString();
        } else {
          // Category slug not found
          return res.status(200).json({
            success: true,
            message: "No products found for this category",
            count: 0,
            total: 0,
            data: [],
            pagination: { page: 1, limit: resPerPage, totalPages: 0 },
          });
        }
      }
    }

    // ✅ Count with correct filter (including category)
    const totalProducts = await Product.countDocuments(baseFilter);

    const apiFeature = new ApiFeatures(
      Product.find({ isActive: true }).populate(
        "category",
        "name slug nameArabic",
      ),
      req.query,
    )
      .search()
      .filter()
      .sort()
      .limitFields()
      .paginate(resPerPage);

    const products = await apiFeature.query;

    res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      count: products.length,
      total: totalProducts,
      pagination: {
        page: apiFeature.page,
        limit: apiFeature.limit,
        totalPages: Math.ceil(totalProducts / resPerPage),
      },
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

// ==============================
// @desc    Get Featured Products
// @route   GET /api/v1/products/featured
// @access  Public
// ==============================
exports.getFeaturedProducts = async (req, res, next) => {
  try {
    const limit = Number(req.query.limit) || 8;
    const products = await Product.getFeaturedProducts(limit);

    res.status(200).json({
      success: true,
      message: "Featured products fetched successfully",
      count: products.length,
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

// ==============================
// @desc    Get Bestsellers
// @route   GET /api/v1/products/bestsellers
// @access  Public
// ==============================
exports.getBestsellers = async (req, res, next) => {
  try {
    const limit = Number(req.query.limit) || 8;
    const products = await Product.getBestsellers(limit);

    res.status(200).json({
      success: true,
      message: "Bestsellers fetched successfully",
      count: products.length,
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

// ==============================
// @desc    Get New Arrivals
// @route   GET /api/v1/products/new-arrivals
// @access  Public
// ==============================
exports.getNewArrivals = async (req, res, next) => {
  try {
    const limit = Number(req.query.limit) || 8;
    const products = await Product.getNewArrivals(limit);

    res.status(200).json({
      success: true,
      message: "New arrivals fetched successfully",
      count: products.length,
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

// ==============================
// @desc    Get Products By Category
// @route   GET /api/v1/products/category/:slug
// @access  Public
// ==============================
exports.getProductsByCategory = async (req, res, next) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug }).lean();

    if (!category) {
      return next(new ErrorHandler("Category not found", 404));
    }

    const resPerPage = 12;
    const total = await Product.countDocuments({
      category: category._id,
      isActive: true,
    });

    const apiFeature = new ApiFeatures(
      Product.find({
        category: category._id,
        isActive: true,
      }).populate("category", "name slug nameArabic"),
      req.query,
    )
      .sort()
      .paginate(resPerPage);

    const products = await apiFeature.query;

    res.status(200).json({
      success: true,
      message: `Products in ${category.name} fetched successfully`,
      category,
      count: products.length,
      total,
      pagination: {
        page: apiFeature.page,
        limit: apiFeature.limit,
        totalPages: Math.ceil(total / resPerPage),
      },
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

// ==============================
// @desc    Get Single Product
// @route   GET /api/v1/products/:slug
// @access  Public
// ==============================
exports.getSingleProduct = async (req, res, next) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug })
      .populate("category", "name slug nameArabic")
      .lean();

    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

// ==============================
// @desc    Create Product
// @route   POST /api/v1/products
// @access  Admin
// ==============================
exports.createProduct = async (req, res, next) => {
  try {
    // Trim all keys
    const trimmedBody = {};
    Object.keys(req.body).forEach((key) => {
      trimmedBody[key.trim()] =
        typeof req.body[key] === "string"
          ? req.body[key].trim()
          : req.body[key];
    });

    const {
      name,
      nameArabic,
      description,
      shortDescription,
      price,
      originalPrice,
      stock,
      category,
      isFeatured,
      isBestseller,
      isNewArrival,
      isGiftable,
      lowStockThreshold,
    } = trimmedBody;

    // Validate required fields
    if (!name) return next(new ErrorHandler("Product name is required", 400));
    if (!description)
      return next(new ErrorHandler("Product description is required", 400));
    if (!price) return next(new ErrorHandler("Product price is required", 400));
    if (!stock && stock !== 0)
      return next(new ErrorHandler("Product stock is required", 400));
    if (!category)
      return next(new ErrorHandler("Product category is required", 400));

    // Validate category exists
    const categoryExists = await Category.findById(category);
    if (!categoryExists)
      return next(new ErrorHandler("Category not found", 404));

    // Upload images
    if (!req.files || req.files.length === 0) {
      return next(
        new ErrorHandler("Please upload at least one product image", 400),
      );
    }
    const images = await uploadMultipleImages(req.files, "noorbazaar/products");

    // Parse tags
    let tags = [];
    if (trimmedBody.tags) {
      if (typeof trimmedBody.tags === "string") {
        try {
          tags = JSON.parse(trimmedBody.tags);
        } catch {
          tags = trimmedBody.tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean);
        }
      } else if (Array.isArray(trimmedBody.tags)) {
        tags = trimmedBody.tags;
      }
    }

    // Parse details
    let details = {};
    if (trimmedBody.details) {
      if (typeof trimmedBody.details === "string") {
        try {
          details = JSON.parse(trimmedBody.details);
        } catch {
          details = {};
        }
      } else {
        details = trimmedBody.details;
      }
    }

    const parseBool = (val) => val === "true" || val === true || val === "1";

    const product = await Product.create({
      name,
      nameArabic,
      description,
      shortDescription,
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : undefined,
      stock: Number(stock),
      category,
      tags,
      details,
      images,
      isFeatured: parseBool(isFeatured),
      isBestseller: parseBool(isBestseller),
      isNewArrival: parseBool(isNewArrival),
      isGiftable: parseBool(isGiftable),
      lowStockThreshold: lowStockThreshold ? Number(lowStockThreshold) : 5,
      createdBy: req.user._id,
    });

    await product.populate("category", "name slug nameArabic");
    logger.info(`✅ Product created: ${product.name}`);

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

// ==============================
// @desc    Update Product
// @route   PUT /api/v1/products/:id
// @access  Admin
// ==============================
exports.updateProduct = async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) return next(new ErrorHandler("Product not found", 404));

    const trimmedBody = {};
    Object.keys(req.body).forEach((key) => {
      trimmedBody[key.trim()] =
        typeof req.body[key] === "string"
          ? req.body[key].trim()
          : req.body[key];
    });

    // Upload new images if provided
    if (req.files && req.files.length > 0) {
      const oldImageIds = product.images.map((img) => img.public_id);
      await deleteMultipleImages(oldImageIds);
      trimmedBody.images = await uploadMultipleImages(
        req.files,
        "noorbazaar/products",
      );
    }

    // Parse tags
    if (trimmedBody.tags && typeof trimmedBody.tags === "string") {
      try {
        trimmedBody.tags = JSON.parse(trimmedBody.tags);
      } catch {
        trimmedBody.tags = trimmedBody.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean);
      }
    }

    // Parse details
    if (trimmedBody.details && typeof trimmedBody.details === "string") {
      try {
        trimmedBody.details = JSON.parse(trimmedBody.details);
      } catch {
        trimmedBody.details = {};
      }
    }

    product = await Product.findByIdAndUpdate(req.params.id, trimmedBody, {
      new: true,
      runValidators: true,
    }).populate("category", "name slug nameArabic");

    logger.info(`✅ Product updated: ${product.name}`);

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

// ==============================
// @desc    Delete Product
// @route   DELETE /api/v1/products/:id
// @access  Admin
// ==============================
exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return next(new ErrorHandler("Product not found", 404));

    const imageIds = product.images.map((img) => img.public_id);
    await deleteMultipleImages(imageIds);
    await product.deleteOne();

    logger.info(`🗑️ Product deleted: ${product.name}`);

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// ==============================
// @desc    Toggle Product Status
// @route   PATCH /api/v1/products/:id/toggle
// @access  Admin
// ==============================
exports.toggleProductStatus = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return next(new ErrorHandler("Product not found", 404));

    product.isActive = !product.isActive;
    await product.save();

    logger.info(
      `✅ Product ${product.isActive ? "activated" : "deactivated"}: ${product.name}`,
    );

    res.status(200).json({
      success: true,
      message: `Product ${product.isActive ? "activated" : "deactivated"} successfully`,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

// ==============================
// @desc    Get Admin All Products
// @route   GET /api/v1/products/admin/all
// @access  Admin
// ==============================
exports.getAdminProducts = async (req, res, next) => {
  try {
    const resPerPage = 20;
    const total = await Product.countDocuments();

    const apiFeature = new ApiFeatures(
      Product.find().populate("category", "name slug"),
      req.query,
    )
      .search()
      .filter()
      .sort()
      .paginate(resPerPage);

    const products = await apiFeature.query;

    res.status(200).json({
      success: true,
      message: "All products fetched successfully",
      count: products.length,
      total,
      pagination: {
        page: apiFeature.page,
        limit: apiFeature.limit,
        totalPages: Math.ceil(total / resPerPage),
      },
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

// ==============================
// @desc    Get Search Suggestions
// @route   GET /api/v1/products/search/suggestions
// @access  Public
// ==============================
exports.getSearchSuggestions = async (req, res, next) => {
  try {
    const { q } = req.query;

    if (!q || q.trim().length < 2) {
      return res.status(200).json({
        success: true,
        data: { products: [], categories: [] },
      });
    }

    const keyword = q.trim();
    const regex = { $regex: keyword, $options: "i" };

    // ── Products ──
    const products = await Product.find({
      isActive: true,
      $or: [
        { name: regex },
        { nameArabic: regex },
        { shortDescription: regex },
        { tags: regex },
      ],
    })
      .select(
        "name nameArabic images price originalPrice slug ratings category",
      )
      .populate("category", "name slug")
      .limit(6)
      .lean();

    // ── Categories ──
    const categories = await Category.find({
      isActive: true,
      $or: [{ name: regex }, { nameArabic: regex }],
    })
      .select("name nameArabic slug")
      .limit(3)
      .lean();

    res.status(200).json({
      success: true,
      data: { products, categories },
    });
  } catch (error) {
    next(error);
  }
};
