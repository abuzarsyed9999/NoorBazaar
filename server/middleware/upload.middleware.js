const multer = require("multer");
const path = require("path");
const ErrorHandler = require("../utils/errorHandler");

// ==============================
// Memory Storage
// Files stored in buffer
// Then uploaded to Cloudinary
// ==============================
const storage = multer.memoryStorage();

// ==============================
// File Filter
// ==============================
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase(),
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new ErrorHandler("Only images allowed (jpeg, jpg, png, webp)", 400));
  }
};

// ==============================
// Multer Config
// ==============================
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB per file
    files: 6, // Max 6 files
  },
});

// ==============================
// Upload Middlewares
// ==============================

// Single image (avatar)
const uploadSingle = upload.single("image");

// Multiple images (products)
const uploadMultiple = upload.array("images", 6);

// Handle multer errors gracefully
const handleUploadError = (uploadFn) => (req, res, next) => {
  uploadFn(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return next(new ErrorHandler("File size cannot exceed 5MB", 400));
      }
      if (err.code === "LIMIT_FILE_COUNT") {
        return next(new ErrorHandler("Cannot upload more than 6 images", 400));
      }
      return next(new ErrorHandler(err.message, 400));
    }
    if (err) return next(err);
    next();
  });
};

module.exports = {
  uploadSingle: handleUploadError(uploadSingle),
  uploadMultiple: handleUploadError(uploadMultiple),
};
