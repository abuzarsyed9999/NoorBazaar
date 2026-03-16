const express = require("express");
const router = express.Router();

const {
  createRazorpayOrder,
  verifyRazorpayPayment,
  placeCODOrder,
  getPaymentStatus,
  razorpayWebhook,
} = require("../controllers/payment.controller");

const { isAuthenticated } = require("../middleware/auth.middleware");

// ==============================
// Webhook — No Auth Required
// Must be before isAuthenticated
// ==============================
router.post("/webhook", razorpayWebhook);

// ==============================
// Private Routes
// ==============================
router.use(isAuthenticated);

router.post("/razorpay/create-order", createRazorpayOrder);
router.post("/razorpay/verify", verifyRazorpayPayment);
router.post("/cod", placeCODOrder);
router.get("/status/:orderId", getPaymentStatus);

module.exports = router;
