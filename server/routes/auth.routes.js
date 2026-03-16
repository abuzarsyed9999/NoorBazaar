const express = require("express");
const router = express.Router();

const {
  register,
  login,
  logout,
  getMe,
  forgotPassword,
  resetPassword,
  updatePassword,
} = require("../controllers/auth.controller");

const { isAuthenticated } = require("../middleware/auth.middleware");
const {
  authLimiter,
  forgotPasswordLimiter,
} = require("../middleware/rateLimiter.middleware");

const {
  validateRegister,
  validateLogin,
  validateForgotPassword,
  validateResetPassword,
  validateUpdatePassword,
} = require("../validators/auth.validator");

// ==============================
// Public Routes
// ==============================
router.post("/register", authLimiter, validateRegister, register);

router.post("/login", authLimiter, validateLogin, login);

router.post(
  "/forgot-password",
  forgotPasswordLimiter,
  validateForgotPassword,
  forgotPassword,
);

router.put("/reset-password/:token", validateResetPassword, resetPassword);

// ==============================
// Private Routes
// ==============================
router.post("/logout", isAuthenticated, logout);

router.get("/me", isAuthenticated, getMe);

router.put(
  "/update-password",
  isAuthenticated,
  validateUpdatePassword,
  updatePassword,
);

module.exports = router;

// ```

// ---

// ## ✅ Phase 3 Complete!
// ```
// ✅ utils/generateToken.js
// ✅ utils/sendEmail.js
// ✅ validators/auth.validator.js
// ✅ middleware/auth.middleware.js
// ✅ middleware/rateLimiter.middleware.js
// ✅ controllers/auth.controller.js
// ✅ routes/auth.routes.js
// ```

// ---

// ## 🧪 Test in Postman
// ```
// POST http://localhost:5000/api/v1/auth/register
// Body → JSON:
// {
//   "name": "Abuzar Syed",
//   "email": "abuzar@gmail.com",
//   "phone": "9876543210",
//   "password": "Abuzar@123",
//   "confirmPassword": "Abuzar@123"
// }

// POST http://localhost:5000/api/v1/auth/login
// Body → JSON:
// {
//   "email": "abuzar@gmail.com",
//   "password": "Abuzar@123"
// }

// GET http://localhost:5000/api/v1/auth/me
// Headers → Authorization: Bearer <token>
