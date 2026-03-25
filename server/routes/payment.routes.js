// const express = require("express");
// const router = express.Router();

// const {
//   createRazorpayOrder,
//   verifyRazorpayPayment,
//   placeCODOrder,
//   getPaymentStatus,
//   razorpayWebhook,
// } = require("../controllers/payment.controller");

// const { isAuthenticated } = require("../middleware/auth.middleware");

// // ==============================
// // Webhook — No Auth Required
// // Must be before isAuthenticated
// // ==============================
// router.post("/webhook", razorpayWebhook);

// // ==============================
// // Private Routes
// // ==============================
// router.use(isAuthenticated);

// router.post("/razorpay/create-order", createRazorpayOrder);
// router.post("/razorpay/verify", verifyRazorpayPayment);
// router.post("/cod", placeCODOrder);
// router.get("/status/:orderId", getPaymentStatus);

// module.exports = router;

const express = require("express");
const router = express.Router();

const {
  createRazorpayOrder,
  verifyRazorpayPayment,
  placeCODOrder,
  handleWebhook,
  getRazorpayKey,
} = require("../controllers/payment.controller");

const { isAuthenticated } = require("../middleware/auth.middleware");

// ── Public ──
router.post("/webhook", handleWebhook);

// ── Private ──
router.get("/razorpay/key", isAuthenticated, getRazorpayKey);
router.post("/razorpay/create", isAuthenticated, createRazorpayOrder);
router.post("/razorpay/verify", isAuthenticated, verifyRazorpayPayment);
router.post("/cod", isAuthenticated, placeCODOrder);

module.exports = router;
