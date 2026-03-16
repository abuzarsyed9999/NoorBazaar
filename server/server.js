require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");
const logger = require("./utils/logger");

const PORT = process.env.PORT || 5000;

// ==============================
// Start Server
// ==============================
const startServer = async () => {
  try {
    // Connect to MongoDB first
    await connectDB();

    // Then start server
    const server = app.listen(PORT, () => {
      logger.info(
        `🌙 NoorBazaar Server running in ${process.env.NODE_ENV} mode`,
      );
      logger.info(`🔗 http://localhost:${PORT}`);
    });

    // ==============================
    // Handle Unhandled Rejections
    // ==============================
    process.on("unhandledRejection", (err) => {
      logger.error(`❌ Unhandled Rejection: ${err.message}`);
      server.close(() => {
        logger.error("💀 Server shutting down...");
        process.exit(1);
      });
    });

    // ==============================
    // Handle Uncaught Exceptions
    // ==============================
    process.on("uncaughtException", (err) => {
      logger.error(`❌ Uncaught Exception: ${err.message}`);
      logger.error("💀 Server shutting down...");
      process.exit(1);
    });

    // ==============================
    // Graceful Shutdown (CTRL+C)
    // ==============================
    process.on("SIGTERM", () => {
      logger.info("👋 SIGTERM received. Shutting down gracefully...");
      server.close(() => {
        logger.info("✅ Process terminated");
      });
    });
  } catch (error) {
    logger.error(`❌ Server failed to start: ${error.message}`);
    process.exit(1);
  }
};

startServer();
