const User = require("../models/User.model");
const ErrorHandler = require("../utils/errorHandler");
const logger = require("../utils/logger");
const {
  uploadSingleImage,
  deleteImage,
} = require("../utils/uploadToCloudinary");

// ==============================
// @desc    Get My Profile
// @route   GET /api/v1/users/profile
// @access  Private
// ==============================
exports.getMyProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).populate(
      "wishlist",
      "name price images ratings slug isActive",
    );

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Profile fetched successfully",
      data: user.toPublicProfile(),
    });
  } catch (error) {
    next(error);
  }
};

// ==============================
// @desc    Update My Profile
// @route   PUT /api/v1/users/profile
// @access  Private
// ==============================
exports.updateProfile = async (req, res, next) => {
  try {
    const allowedFields = ["name", "phone"];
    const updateData = {};

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });

    if (Object.keys(updateData).length === 0) {
      return next(new ErrorHandler("No valid fields to update", 400));
    }

    const user = await User.findByIdAndUpdate(req.user._id, updateData, {
      new: true,
      runValidators: true,
    });

    logger.info(`✅ Profile updated: ${user.email}`);

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: user.toPublicProfile(),
    });
  } catch (error) {
    next(error);
  }
};

// ==============================
// @desc    Update Avatar
// @route   POST /api/v1/users/avatar
// @access  Private
// ==============================
exports.updateAvatar = async (req, res, next) => {
  try {
    if (!req.file) {
      return next(new ErrorHandler("Please upload an image", 400));
    }

    const user = await User.findById(req.user._id);

    // Delete old avatar if not default
    if (
      user.avatar.public_id &&
      user.avatar.public_id !== "noorbazaar/avatars/default"
    ) {
      await deleteImage(user.avatar.public_id);
    }

    // Upload new avatar
    const avatar = await uploadSingleImage(
      req.file.buffer,
      "noorbazaar/avatars",
    );

    user.avatar = avatar;
    await user.save();

    logger.info(`✅ Avatar updated: ${user.email}`);

    res.status(200).json({
      success: true,
      message: "Avatar updated successfully",
      data: { avatar: user.avatar },
    });
  } catch (error) {
    next(error);
  }
};

// ==============================
// @desc    Get Wishlist
// @route   GET /api/v1/users/wishlist
// @access  Private
// ==============================
exports.getWishlist = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).populate(
      "wishlist",
      "name nameArabic price originalPrice images ratings slug isActive stock",
    );

    res.status(200).json({
      success: true,
      message: "Wishlist fetched successfully",
      count: user.wishlist.length,
      data: user.wishlist,
    });
  } catch (error) {
    next(error);
  }
};

// ==============================
// @desc    Add To Wishlist
// @route   POST /api/v1/users/wishlist/:productId
// @access  Private
// ==============================
exports.addToWishlist = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    // Check already in wishlist
    if (user.wishlist.includes(req.params.productId)) {
      return next(new ErrorHandler("Product already in wishlist", 400));
    }

    // Max 50 items in wishlist
    if (user.wishlist.length >= 50) {
      return next(new ErrorHandler("Wishlist cannot exceed 50 items", 400));
    }

    user.wishlist.push(req.params.productId);
    await user.save();

    res.status(200).json({
      success: true,
      message: "Product added to wishlist successfully",
      data: { wishlistCount: user.wishlist.length },
    });
  } catch (error) {
    next(error);
  }
};

// ==============================
// @desc    Remove From Wishlist
// @route   DELETE /api/v1/users/wishlist/:productId
// @access  Private
// ==============================
exports.removeFromWishlist = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user.wishlist.includes(req.params.productId)) {
      return next(new ErrorHandler("Product not in wishlist", 400));
    }

    user.wishlist = user.wishlist.filter(
      (id) => id.toString() !== req.params.productId,
    );

    await user.save();

    res.status(200).json({
      success: true,
      message: "Product removed from wishlist successfully",
      data: { wishlistCount: user.wishlist.length },
    });
  } catch (error) {
    next(error);
  }
};

// ==============================
// @desc    Add Address
// @route   POST /api/v1/users/address
// @access  Private
// ==============================
exports.addAddress = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (user.addresses.length >= 5) {
      return next(new ErrorHandler("Maximum 5 addresses allowed", 400));
    }

    const {
      label,
      fullName,
      phone,
      addressLine1,
      addressLine2,
      city,
      state,
      pincode,
      country,
      isDefault,
    } = req.body;

    // If new address is default
    // remove default from others
    if (isDefault) {
      user.addresses.forEach((addr) => {
        addr.isDefault = false;
      });
    }

    user.addresses.push({
      label,
      fullName,
      phone,
      addressLine1,
      addressLine2,
      city,
      state,
      pincode,
      country,
      isDefault: isDefault || user.addresses.length === 0,
    });

    await user.save();

    logger.info(`✅ Address added for: ${user.email}`);

    res.status(201).json({
      success: true,
      message: "Address added successfully",
      data: user.addresses,
    });
  } catch (error) {
    next(error);
  }
};

// ==============================
// @desc    Update Address
// @route   PUT /api/v1/users/address/:addressId
// @access  Private
// ==============================
exports.updateAddress = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    const address = user.addresses.id(req.params.addressId);

    if (!address) {
      return next(new ErrorHandler("Address not found", 404));
    }

    const {
      label,
      fullName,
      phone,
      addressLine1,
      addressLine2,
      city,
      state,
      pincode,
      country,
      isDefault,
    } = req.body;

    // If setting as default
    // remove default from others
    if (isDefault) {
      user.addresses.forEach((addr) => {
        addr.isDefault = false;
      });
    }

    address.label = label || address.label;
    address.fullName = fullName || address.fullName;
    address.phone = phone || address.phone;
    address.addressLine1 = addressLine1 || address.addressLine1;
    address.addressLine2 = addressLine2 || address.addressLine2;
    address.city = city || address.city;
    address.state = state || address.state;
    address.pincode = pincode || address.pincode;
    address.country = country || address.country;
    address.isDefault = isDefault !== undefined ? isDefault : address.isDefault;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Address updated successfully",
      data: user.addresses,
    });
  } catch (error) {
    next(error);
  }
};

// ==============================
// @desc    Delete Address
// @route   DELETE /api/v1/users/address/:addressId
// @access  Private
// ==============================
exports.deleteAddress = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    const address = user.addresses.id(req.params.addressId);

    if (!address) {
      return next(new ErrorHandler("Address not found", 404));
    }

    const wasDefault = address.isDefault;

    user.addresses.pull(req.params.addressId);

    // If deleted address was default
    // make first address default
    if (wasDefault && user.addresses.length > 0) {
      user.addresses[0].isDefault = true;
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "Address deleted successfully",
      data: user.addresses,
    });
  } catch (error) {
    next(error);
  }
};
