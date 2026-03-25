const ErrorHandler = require("../utils/errorHandler");

// ==============================
// @desc   Check if user is Admin
// @usage  router.use(isAuthenticated, isAdmin)
// ==============================
exports.isAdmin = (req, res, next) => {
  if (!req.user) {
    return next(new ErrorHandler("Please login first", 401));
  }

  if (req.user.role !== "admin") {
    return next(
      new ErrorHandler(
        `Access denied. Role '${req.user.role}' is not authorized.`,
        403,
      ),
    );
  }

  next();
};
