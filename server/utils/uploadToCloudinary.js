const cloudinary = require("../config/cloudinary");
const logger = require("./logger");

// ==============================
// Upload Single Image
// ==============================
const uploadSingleImage = async (fileBuffer, folder) => {
  try {
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: "image",
          transformation: [
            { width: 800, height: 800, crop: "limit" },
            { quality: "auto" },
            { fetch_format: "auto" },
          ],
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        },
      );
      uploadStream.end(fileBuffer);
    });

    return {
      public_id: result.public_id,
      url: result.secure_url,
    };
  } catch (error) {
    logger.error(`Cloudinary upload error: ${error.message}`);
    throw new Error("Image upload failed");
  }
};

// ==============================
// Upload Multiple Images
// ==============================
const uploadMultipleImages = async (files, folder) => {
  try {
    const uploadPromises = files.map((file) =>
      uploadSingleImage(file.buffer, folder),
    );
    return await Promise.all(uploadPromises);
  } catch (error) {
    logger.error(`Multiple upload error: ${error.message}`);
    throw new Error("Images upload failed");
  }
};

// ==============================
// Delete Image
// ==============================
const deleteImage = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId);
    logger.info(`🗑️ Image deleted: ${publicId}`);
  } catch (error) {
    logger.error(`Delete image error: ${error.message}`);
  }
};

// ==============================
// Delete Multiple Images
// ==============================
const deleteMultipleImages = async (publicIds) => {
  try {
    const deletePromises = publicIds.map((id) => deleteImage(id));
    await Promise.all(deletePromises);
  } catch (error) {
    logger.error(`Delete multiple images error: ${error.message}`);
  }
};

module.exports = {
  uploadSingleImage,
  uploadMultipleImages,
  deleteImage,
  deleteMultipleImages,
};
