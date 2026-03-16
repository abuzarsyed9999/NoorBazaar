const crypto = require("crypto");
const User = require("../models/User.model");
const ErrorHandler = require("../utils/errorHandler");
const logger = require("../utils/logger");
const sendEmail = require("../utils/sendEmail");
const { sendTokenResponse } = require("../utils/generateToken");

// ==============================
// @desc    Register User
// @route   POST /api/v1/auth/register
// @access  Public
// ==============================
exports.register = async (req, res, next) => {
  try {
    const { name, email, phone, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(
        new ErrorHandler("Email already registered. Please login.", 400),
      );
    }

    const user = await User.create({ name, email, phone, password });

    // Send welcome email (non-blocking)
    sendEmail({
      to: user.email,
      templateName: "welcome",
      templateData: [user.name],
    }).catch((err) => logger.error(`Welcome email failed: ${err.message}`));

    logger.info(`✅ New user registered: ${email}`);

    sendTokenResponse(
      user,
      201,
      res,
      "Registration successful. Welcome to NoorBazaar!",
    );
  } catch (error) {
    logger.error(`Register error: ${error.message}`);
    next(error);
  }
};

// ==============================
// @desc    Login User
// @route   POST /api/v1/auth/login
// @access  Public
// ==============================
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select(
      "+password +loginAttempts +lockUntil",
    );

    if (!user) {
      return next(new ErrorHandler("Invalid email or password.", 401));
    }

    if (user.isLocked) {
      return next(
        new ErrorHandler("Account temporarily locked. Try again later.", 423),
      );
    }

    if (!user.isActive) {
      return next(new ErrorHandler("Your account has been deactivated.", 403));
    }

    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
      await user.incrementLoginAttempts();
      logger.warn(`❌ Failed login attempt for: ${email}`);
      return next(new ErrorHandler("Invalid email or password.", 401));
    }

    await User.findByIdAndUpdate(user._id, {
      $set: { loginAttempts: 0, lastLogin: new Date() },
      $unset: { lockUntil: 1 },
    });

    logger.info(`✅ User logged in: ${email}`);

    sendTokenResponse(user, 200, res, "Login successful. Welcome back!");
  } catch (error) {
    logger.error(`Login error: ${error.message}`);
    next(error);
  }
};

// ==============================
// @desc    Logout User
// @route   POST /api/v1/auth/logout
// @access  Private
// ==============================
exports.logout = async (req, res, next) => {
  try {
    res.cookie("token", "none", {
      expires: new Date(Date.now() + 5 * 1000),
      httpOnly: true,
    });

    logger.info(`✅ User logged out: ${req.user.email}`);

    res.status(200).json({
      success: true,
      message: "Logged out successfully.",
    });
  } catch (error) {
    next(error);
  }
};

// ==============================
// @desc    Get Current User
// @route   GET /api/v1/auth/me
// @access  Private
// ==============================
exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).populate(
      "wishlist",
      "name price images ratings slug",
    );

    if (!user) {
      return next(new ErrorHandler("User not found.", 404));
    }

    res.status(200).json({
      success: true,
      message: "User profile fetched successfully.",
      user: user.toPublicProfile(),
    });
  } catch (error) {
    next(error);
  }
};

// ==============================
// @desc    Forgot Password
// @route   POST /api/v1/auth/forgot-password
// @access  Public
// ==============================
exports.forgotPassword = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(200).json({
        success: true,
        message: "If this email exists, a reset link has been sent.",
      });
    }

    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    const emailResult = await sendEmail({
      to: user.email,
      templateName: "passwordReset",
      templateData: [user.name, resetUrl],
    });

    if (!emailResult.success) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save({ validateBeforeSave: false });
      return next(
        new ErrorHandler("Email could not be sent. Please try again.", 500),
      );
    }

    logger.info(`📧 Password reset email sent to: ${user.email}`);

    res.status(200).json({
      success: true,
      message: "If this email exists, a reset link has been sent.",
    });
  } catch (error) {
    next(error);
  }
};

// ==============================
// @desc    Reset Password
// @route   PUT /api/v1/auth/reset-password/:token
// @access  Public
// ==============================
exports.resetPassword = async (req, res, next) => {
  try {
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return next(new ErrorHandler("Invalid or expired reset token.", 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    user.loginAttempts = 0;
    user.lockUntil = undefined;

    await user.save();

    logger.info(`✅ Password reset for: ${user.email}`);

    sendTokenResponse(user, 200, res, "Password reset successful.");
  } catch (error) {
    next(error);
  }
};

// ==============================
// @desc    Update Password
// @route   PUT /api/v1/auth/update-password
// @access  Private
// ==============================
exports.updatePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id).select("+password");

    if (!user) {
      return next(new ErrorHandler("User not found.", 404));
    }

    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return next(new ErrorHandler("Current password is incorrect.", 400));
    }

    user.password = newPassword;
    await user.save();

    logger.info(`✅ Password updated for: ${user.email}`);

    sendTokenResponse(user, 200, res, "Password updated successfully.");
  } catch (error) {
    next(error);
  }
};
