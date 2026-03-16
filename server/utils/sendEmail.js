const nodemailer = require("nodemailer");
const logger = require("./logger");

// ==============================
// Create Transporter
// ==============================
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });
};

// ==============================
// Email Templates
// ==============================
const emailTemplates = {
  // Welcome Email
  welcome: (name) => ({
    subject: "🌙 Welcome to NoorBazaar — بسم الله",
    html: `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #0d1117; color: #e8dcc8; padding: 40px; border-radius: 12px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #d4af37; font-size: 28px;">🌙 NoorBazaar</h1>
          <p style="color: #888; font-size: 12px; letter-spacing: 3px;">نور بازار • ISLAMIC STORE</p>
        </div>
        <h2 style="color: #d4af37;">As-salamu alaykum, ${name}! 👋</h2>
        <p style="line-height: 1.8;">Welcome to NoorBazaar — your trusted destination for authentic Islamic products.</p>
        <p style="line-height: 1.8;">We are honored to have you as part of our community. May Allah bless your journey with us.</p>
        <div style="background: #161b22; border: 1px solid #2a2a1a; border-radius: 8px; padding: 20px; margin: 20px 0; text-align: center;">
          <p style="color: #d4af37; font-size: 18px; font-style: italic;">"Indeed, with hardship comes ease."</p>
          <p style="color: #888; font-size: 12px;">Surah Ash-Sharh 94:6</p>
        </div>
        <p style="color: #888; font-size: 12px; text-align: center; margin-top: 30px;">© 2024 NoorBazaar. All rights reserved.</p>
      </div>
    `,
  }),

  // Password Reset Email
  passwordReset: (name, resetUrl) => ({
    subject: "🔐 NoorBazaar — Password Reset Request",
    html: `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #0d1117; color: #e8dcc8; padding: 40px; border-radius: 12px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #d4af37; font-size: 28px;">🌙 NoorBazaar</h1>
        </div>
        <h2 style="color: #d4af37;">Password Reset Request</h2>
        <p>As-salamu alaykum ${name},</p>
        <p>You requested to reset your password. Click the button below:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}"
             style="background: #d4af37; color: #0d1117; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 16px;">
            Reset Password
          </a>
        </div>
        <p style="color: #888; font-size: 13px;">This link expires in <strong style="color: #e8dcc8;">15 minutes</strong>.</p>
        <p style="color: #888; font-size: 13px;">If you did not request this, please ignore this email.</p>
        <p style="color: #888; font-size: 11px; margin-top: 20px;">Or copy this link: <br/><span style="color: #d4af37;">${resetUrl}</span></p>
      </div>
    `,
  }),

  // Order Confirmation Email
  orderConfirmation: (name, orderNumber, totalPrice) => ({
    subject: `✅ NoorBazaar — Order Confirmed #${orderNumber}`,
    html: `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #0d1117; color: #e8dcc8; padding: 40px; border-radius: 12px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #d4af37; font-size: 28px;">🌙 NoorBazaar</h1>
        </div>
        <h2 style="color: #d4af37;">JazakAllah Khair for your order! 🎉</h2>
        <p>As-salamu alaykum ${name},</p>
        <p>Your order has been confirmed successfully.</p>
        <div style="background: #161b22; border: 1px solid #d4af37; border-radius: 8px; padding: 20px; margin: 20px 0;">
          <p><strong style="color: #d4af37;">Order Number:</strong> #${orderNumber}</p>
          <p><strong style="color: #d4af37;">Total Amount:</strong> ₹${totalPrice}</p>
          <p><strong style="color: #d4af37;">Status:</strong> Confirmed ✅</p>
        </div>
        <p style="color: #888;">You will receive shipping updates via email.</p>
      </div>
    `,
  }),
};

// ==============================
// Send Email Function
// ==============================
const sendEmail = async ({ to, templateName, templateData }) => {
  try {
    const transporter = createTransporter();
    const template = emailTemplates[templateName](...templateData);

    const mailOptions = {
      from: `"${process.env.FROM_NAME}" <${process.env.FROM_EMAIL}>`,
      to,
      subject: template.subject,
      html: template.html,
    };

    const info = await transporter.sendMail(mailOptions);
    logger.info(`📧 Email sent: ${info.messageId} to ${to}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    logger.error(`❌ Email failed: ${error.message}`);
    return { success: false, error: error.message };
  }
};

module.exports = sendEmail;
