const { body, validationResult } = require("express-validator");

// ==============================
// Handle Validation Errors
// ==============================
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((err) => err.msg);
    return res.status(400).json({
      success: false,
      message: errorMessages[0],
      errors: errorMessages,
    });
  }
  next();
};

// ==============================
// Category Validator
// ==============================
const validateCategory = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Category name is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Category name must be between 2 and 50 characters"),

  body("nameArabic")
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage("Arabic name cannot exceed 50 characters"),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage("Description cannot exceed 200 characters"),

  body("displayOrder")
    .optional()
    .isNumeric()
    .withMessage("Display order must be a number"),

  handleValidationErrors,
];

// ==============================
// Product Validator
// ==============================
// const validateProduct = [
//   body("name")
//     .trim()
//     .notEmpty()
//     .withMessage("Product name is required")
//     .isLength({ min: 3, max: 150 })
//     .withMessage("Product name must be between 3 and 150 characters"),

//   body("nameArabic")
//     .optional()
//     .trim()
//     .isLength({ max: 150 })
//     .withMessage("Arabic name cannot exceed 150 characters"),

//   body("description")
//     .trim()
//     .notEmpty()
//     .withMessage("Product description is required")
//     .isLength({ max: 3000 })
//     .withMessage("Description cannot exceed 3000 characters"),

//   body("price")
//     .notEmpty()
//     .withMessage("Product price is required")
//     .isFloat({ min: 0 })
//     .withMessage("Price must be a positive number"),

//   body("originalPrice")
//     .optional()
//     .isFloat({ min: 0 })
//     .withMessage("Original price must be a positive number")
//     .custom((value, { req }) => {
//       if (value && Number(value) < Number(req.body.price)) {
//         throw new Error("Original price must be greater than selling price");
//       }
//       return true;
//     }),

//   body("stock")
//     .notEmpty()
//     .withMessage("Product stock is required")
//     .isInt({ min: 0 })
//     .withMessage("Stock must be a positive number"),

//   body("category")
//     .notEmpty()
//     .withMessage("Product category is required")
//     .isMongoId()
//     .withMessage("Invalid category ID"),

//   body("tags")
//     .optional()
//     .isArray({ max: 10 })
//     .withMessage("Tags must be an array with maximum 10 items"),

//   body("isFeatured")
//     .optional()
//     .isBoolean()
//     .withMessage("isFeatured must be true or false"),

//   body("isBestseller")
//     .optional()
//     .isBoolean()
//     .withMessage("isBestseller must be true or false"),

//   body("isNewArrival")
//     .optional()
//     .isBoolean()
//     .withMessage("isNewArrival must be true or false"),

//   handleValidationErrors,
// ];

const validateProduct = [
  body("name")
    .if(body("name").exists())
    .trim()
    .notEmpty()
    .withMessage("Product name is required")
    .isLength({ min: 3, max: 150 })
    .withMessage("Product name must be between 3 and 150 characters"),

  body("price")
    .if(body("price").exists())
    .notEmpty()
    .withMessage("Product price is required")
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number"),

  body("stock")
    .if(body("stock").exists())
    .notEmpty()
    .withMessage("Product stock is required")
    .isInt({ min: 0 })
    .withMessage("Stock must be a positive number"),

  body("category")
    .if(body("category").exists())
    .notEmpty()
    .withMessage("Product category is required")
    .isMongoId()
    .withMessage("Invalid category ID"),

  handleValidationErrors,
];
// ==============================
// Update Product Validator
// ==============================
const validateUpdateProduct = [
  body("name")
    .optional()
    .trim()
    .isLength({ min: 3, max: 150 })
    .withMessage("Product name must be between 3 and 150 characters"),

  body("price")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number"),

  body("stock")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Stock must be a positive number"),

  body("category").optional().isMongoId().withMessage("Invalid category ID"),

  handleValidationErrors,
];

module.exports = {
  validateCategory,
  validateProduct,
  validateUpdateProduct,
};
