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
// Place Order Validator
// ==============================
const validatePlaceOrder = [
  body("shippingAddress.fullName")
    .trim()
    .notEmpty()
    .withMessage("Full name is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Full name must be between 2 and 50 characters"),

  body("shippingAddress.phone")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required")
    .matches(/^[0-9]{10}$/)
    .withMessage("Please enter valid 10 digit phone number"),

  body("shippingAddress.addressLine1")
    .trim()
    .notEmpty()
    .withMessage("Address line 1 is required"),

  body("shippingAddress.city")
    .trim()
    .notEmpty()
    .withMessage("City is required"),

  body("shippingAddress.state")
    .trim()
    .notEmpty()
    .withMessage("State is required"),

  body("shippingAddress.pincode")
    .trim()
    .notEmpty()
    .withMessage("Pincode is required")
    .matches(/^[0-9]{6}$/)
    .withMessage("Please enter valid 6 digit pincode"),

  body("paymentMethod")
    .notEmpty()
    .withMessage("Payment method is required")
    .isIn(["COD", "Razorpay"])
    .withMessage("Payment method must be COD or Razorpay"),

  body("isGift")
    .optional()
    .isBoolean()
    .withMessage("isGift must be true or false"),

  body("giftMessage")
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage("Gift message cannot exceed 200 characters"),

  handleValidationErrors,
];

// ==============================
// Update Order Status Validator
// ==============================
const validateUpdateStatus = [
  body("orderStatus")
    .notEmpty()
    .withMessage("Order status is required")
    .isIn([
      "Pending",
      "Confirmed",
      "Processing",
      "Shipped",
      "Delivered",
      "Cancelled",
      "Refunded",
    ])
    .withMessage("Invalid order status"),

  body("message")
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage("Message cannot exceed 200 characters"),

  handleValidationErrors,
];

module.exports = {
  validatePlaceOrder,
  validateUpdateStatus,
};
