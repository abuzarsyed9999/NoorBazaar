 
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const rateLimit = require("express-rate-limit");
const errorMiddleware = require("./middleware/error.middleware");
const logger = require("./utils/logger");
const reviewRoutes = require("./routes/review.routes");
const paymentRoutes = require("./routes/payment.routes");

// ── Import All Models ──
require("./models/User.model");
require("./models/Category.model");
require("./models/Product.model");
require("./models/Cart.model");
require("./models/Order.model");
require("./models/Review.model");
require("./models/Coupon.model");

// ── Route Imports ──
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const productRoutes = require("./routes/product.routes");
const categoryRoutes = require("./routes/category.routes");
const orderRoutes = require("./routes/order.routes");
const cartRoutes = require("./routes/cart.routes");
const couponRoutes = require("./routes/coupon.routes");
const adminRoutes = require("./routes/admin.routes");

const app = express();

// ==============================
// ✅ CORS — ONE TIME ONLY at top
// ==============================
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:3000",
      process.env.CLIENT_URL,
    ].filter(Boolean); // removes undefined if CLIENT_URL not set

    // Allow requests with no origin (Postman, mobile apps)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS blocked: ${origin}`));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
};

app.use(cors(corsOptions));

// ==============================
// Security Middleware
// ==============================
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  }),
);

// ==============================
// Global Rate Limiter
// ==============================
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: "Too many requests, please try again after 15 minutes",
  },
});
app.use("/api", globalLimiter);

// ==============================
// ✅ Webhook MUST be before express.json() to get raw body
// ==============================
app.post(
  "/api/v1/payment/webhook",
  express.raw({ type: "application/json" }),
  (req, res, next) => {
    req.body = JSON.parse(req.body);
    next();
  },
  require("./routes/payment.routes").handle,
);

// ==============================
// General Middleware (after webhook)
// ==============================
app.use(compression());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

// ==============================
// HTTP Request Logger
// ==============================
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else {
  app.use(
    morgan("combined", {
      stream: {
        write: (message) => logger.info(message.trim()),
      },
    }),
  );
}

// ==============================
// API Routes
// ==============================
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/reviews", reviewRoutes);
app.use("/api/v1/payment", paymentRoutes); // ✅ Mount after JSON
app.use("/api/v1/coupons", couponRoutes);
app.use("/api/v1/admin", adminRoutes);

// ==============================
// Health Check
// ==============================
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🌙 NoorBazaar API is running",
    version: "v1",
    environment: process.env.NODE_ENV,
  });
});

// ==============================
// 404 Handler
// ==============================
app.all("/{*splat}", (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

// ==============================
// Global Error Handler
// ==============================
app.use(errorMiddleware);

module.exports = app;
