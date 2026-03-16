const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const ErrorHandler = require("../utils/errorHandler");
const logger = require("../utils/logger");

// ==============================
// Is Authenticated
// ==============================
const isAuthenticated = async (req, res, next) => {
  try {
    let token;

    // Get token from header or cookie
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return next(
        new ErrorHandler("Access denied. Please login to continue.", 401),
      );
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from DB
    const user = await User.findById(decoded.id).select(
      "+loginAttempts +lockUntil",
    );

    if (!user) {
      return next(new ErrorHandler("User no longer exists.", 401));
    }

    if (!user.isActive) {
      return next(
        new ErrorHandler(
          "Your account has been deactivated. Please contact support.",
          403,
        ),
      );
    }

    if (user.isLocked) {
      return next(
        new ErrorHandler(
          "Account temporarily locked. Please try again later.",
          423,
        ),
      );
    }

    req.user = user;
    next();
  } catch (error) {
    logger.error(`Auth middleware error: ${error.message}`);
    if (error.name === "JsonWebTokenError") {
      return next(new ErrorHandler("Invalid token. Please login again.", 401));
    }
    if (error.name === "TokenExpiredError") {
      return next(new ErrorHandler("Token expired. Please login again.", 401));
    }
    return next(new ErrorHandler("Authentication failed.", 401));
  }
};

// ==============================
// Is Admin
// ==============================
const isAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return next(
      new ErrorHandler("Access denied. Admin privileges required.", 403),
    );
  }
  next();
};

// ==============================
// Optional Auth (doesnt block)
// ==============================
const optionalAuth = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);
      if (user && user.isActive) req.user = user;
    }
  } catch (error) {
    // Silently fail — optional auth
  }
  next();
};

module.exports = { isAuthenticated, isAdmin, optionalAuth };
