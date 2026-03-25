// // const nodemailer = require("nodemailer");
// // const logger = require("./logger");

// // // ==============================
// // // Create Transporter
// // // ==============================
// // const createTransporter = () => {
// //   return nodemailer.createTransport({
// //     host: process.env.SMTP_HOST,
// //     port: process.env.SMTP_PORT,
// //     secure: false,
// //     auth: {
// //       user: process.env.SMTP_EMAIL,
// //       pass: process.env.SMTP_PASSWORD,
// //     },
// //   });
// // };

// // // ==============================
// // // Email Templates
// // // ==============================
// // const emailTemplates = {
// //   // Welcome Email
// //   welcome: (name) => ({
// //     subject: "🌙 Welcome to NoorBazaar — بسم الله",
// //     html: `
// //       <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #0d1117; color: #e8dcc8; padding: 40px; border-radius: 12px;">
// //         <div style="text-align: center; margin-bottom: 30px;">
// //           <h1 style="color: #d4af37; font-size: 28px;">🌙 NoorBazaar</h1>
// //           <p style="color: #888; font-size: 12px; letter-spacing: 3px;">نور بازار • ISLAMIC STORE</p>
// //         </div>
// //         <h2 style="color: #d4af37;">As-salamu alaykum, ${name}! 👋</h2>
// //         <p style="line-height: 1.8;">Welcome to NoorBazaar — your trusted destination for authentic Islamic products.</p>
// //         <p style="line-height: 1.8;">We are honored to have you as part of our community. May Allah bless your journey with us.</p>
// //         <div style="background: #161b22; border: 1px solid #2a2a1a; border-radius: 8px; padding: 20px; margin: 20px 0; text-align: center;">
// //           <p style="color: #d4af37; font-size: 18px; font-style: italic;">"Indeed, with hardship comes ease."</p>
// //           <p style="color: #888; font-size: 12px;">Surah Ash-Sharh 94:6</p>
// //         </div>
// //         <p style="color: #888; font-size: 12px; text-align: center; margin-top: 30px;">© 2024 NoorBazaar. All rights reserved.</p>
// //       </div>
// //     `,
// //   }),

// //   // Password Reset Email
// //   passwordReset: (name, resetUrl) => ({
// //     subject: "🔐 NoorBazaar — Password Reset Request",
// //     html: `
// //       <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #0d1117; color: #e8dcc8; padding: 40px; border-radius: 12px;">
// //         <div style="text-align: center; margin-bottom: 30px;">
// //           <h1 style="color: #d4af37; font-size: 28px;">🌙 NoorBazaar</h1>
// //         </div>
// //         <h2 style="color: #d4af37;">Password Reset Request</h2>
// //         <p>As-salamu alaykum ${name},</p>
// //         <p>You requested to reset your password. Click the button below:</p>
// //         <div style="text-align: center; margin: 30px 0;">
// //           <a href="${resetUrl}"
// //              style="background: #d4af37; color: #0d1117; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 16px;">
// //             Reset Password
// //           </a>
// //         </div>
// //         <p style="color: #888; font-size: 13px;">This link expires in <strong style="color: #e8dcc8;">15 minutes</strong>.</p>
// //         <p style="color: #888; font-size: 13px;">If you did not request this, please ignore this email.</p>
// //         <p style="color: #888; font-size: 11px; margin-top: 20px;">Or copy this link: <br/><span style="color: #d4af37;">${resetUrl}</span></p>
// //       </div>
// //     `,
// //   }),

// //   // Order Confirmation Email
// //   orderConfirmation: (name, orderNumber, totalPrice) => ({
// //     subject: `✅ NoorBazaar — Order Confirmed #${orderNumber}`,
// //     html: `
// //       <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #0d1117; color: #e8dcc8; padding: 40px; border-radius: 12px;">
// //         <div style="text-align: center; margin-bottom: 30px;">
// //           <h1 style="color: #d4af37; font-size: 28px;">🌙 NoorBazaar</h1>
// //         </div>
// //         <h2 style="color: #d4af37;">JazakAllah Khair for your order! 🎉</h2>
// //         <p>As-salamu alaykum ${name},</p>
// //         <p>Your order has been confirmed successfully.</p>
// //         <div style="background: #161b22; border: 1px solid #d4af37; border-radius: 8px; padding: 20px; margin: 20px 0;">
// //           <p><strong style="color: #d4af37;">Order Number:</strong> #${orderNumber}</p>
// //           <p><strong style="color: #d4af37;">Total Amount:</strong> ₹${totalPrice}</p>
// //           <p><strong style="color: #d4af37;">Status:</strong> Confirmed ✅</p>
// //         </div>
// //         <p style="color: #888;">You will receive shipping updates via email.</p>
// //       </div>
// //     `,
// //   }),
// // };

// // // ==============================
// // // Send Email Function
// // // ==============================
// // const sendEmail = async ({ to, templateName, templateData }) => {
// //   try {
// //     const transporter = createTransporter();
// //     const template = emailTemplates[templateName](...templateData);

// //     const mailOptions = {
// //       from: `"${process.env.FROM_NAME}" <${process.env.FROM_EMAIL}>`,
// //       to,
// //       subject: template.subject,
// //       html: template.html,
// //     };

// //     const info = await transporter.sendMail(mailOptions);
// //     logger.info(`📧 Email sent: ${info.messageId} to ${to}`);
// //     return { success: true, messageId: info.messageId };
// //   } catch (error) {
// //     logger.error(`❌ Email failed: ${error.message}`);
// //     return { success: false, error: error.message };
// //   }
// // };

// // module.exports = sendEmail;

// const nodemailer = require("nodemailer");
// const logger = require("./logger");

// // ==============================
// // Create Transporter
// // ==============================
// const createTransporter = () => {
//   return nodemailer.createTransport({
//     host: process.env.SMTP_HOST || "smtp.gmail.com",
//     port: Number(process.env.SMTP_PORT) || 587,
//     secure: false,
//     auth: {
//       user: process.env.SMTP_EMAIL,
//       pass: process.env.SMTP_PASSWORD,
//     },
//     tls: { rejectUnauthorized: false },
//   });
// };

// // ==============================
// // Email Templates
// // ==============================
// const getEmailTemplate = (templateName, templateData) => {
//   const templates = {
//     // ── Order Confirmation ──
//     orderConfirmation: (data) => ({
//       subject: `🌙 Order Confirmed — #${data.orderNumber} | NoorBazaar`,
//       html: `
// <!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8"/>
//   <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
//   <title>Order Confirmation</title>
// </head>
// <body style="margin:0;padding:0;background:#f8fafc;font-family:'DM Sans',Arial,sans-serif;">
//   <div style="max-width:600px;margin:0 auto;padding:24px 16px;">

//     <!-- Header -->
//     <div style="background:linear-gradient(135deg,#14532d,#16a34a);border-radius:16px 16px 0 0;padding:32px 24px;text-align:center;">
//       <p style="font-family:Georgia,serif;font-size:28px;color:#bbf7d0;margin:0 0 4px 0;letter-spacing:0.05em;">بِسْمِ اللَّهِ</p>
//       <h1 style="font-family:Georgia,serif;font-size:28px;color:white;margin:8px 0 4px 0;letter-spacing:0.02em;">NoorBazaar</h1>
//       <p style="font-size:13px;color:#86efac;margin:0;">نور بازار</p>
//     </div>

//     <!-- Body -->
//     <div style="background:white;padding:32px 24px;">

//       <!-- Greeting -->
//       <div style="text-align:center;margin-bottom:28px;">
//         <div style="font-size:48px;margin-bottom:12px;">🌙</div>
//         <h2 style="font-family:Georgia,serif;font-size:24px;color:#0f172a;margin:0 0 8px 0;">
//           JazakAllah Khair, ${data.userName}!
//         </h2>
//         <p style="font-size:14px;color:#64748b;margin:0;">
//           Your order has been placed successfully. May Allah bless your purchase.
//         </p>
//       </div>

//       <!-- Order Details Box -->
//       <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px;padding:20px;margin-bottom:24px;">
//         <div style="display:flex;justify-content:space-between;flex-wrap:wrap;gap:12px;">
//           <div>
//             <p style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#16a34a;margin:0 0 4px 0;">Order Number</p>
//             <p style="font-size:18px;font-weight:800;color:#0f172a;margin:0;letter-spacing:0.05em;">#${data.orderNumber}</p>
//           </div>
//           <div>
//             <p style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#16a34a;margin:0 0 4px 0;">Order Date</p>
//             <p style="font-size:14px;color:#0f172a;margin:0;">${data.orderDate}</p>
//           </div>
//           <div>
//             <p style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#16a34a;margin:0 0 4px 0;">Payment</p>
//             <p style="font-size:14px;color:#0f172a;margin:0;">${data.paymentMethod}</p>
//           </div>
//           <div>
//             <p style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#16a34a;margin:0 0 4px 0;">Status</p>
//             <span style="font-size:12px;font-weight:700;padding:3px 10px;border-radius:20px;background:#dcfce7;color:#15803d;">Confirmed ✅</span>
//           </div>
//         </div>
//       </div>

//       <!-- Items -->
//       <h3 style="font-family:Georgia,serif;font-size:18px;color:#0f172a;margin:0 0 16px 0;">Order Items</h3>
//       <div style="border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;margin-bottom:24px;">
//         ${data.items
//           .map(
//             (item, i) => `
//         <div style="display:flex;align-items:center;gap:16px;padding:14px 16px;${i < data.items.length - 1 ? "border-bottom:1px solid #f8fafc;" : ""}background:${i % 2 === 0 ? "white" : "#f8fafc"};">
//           <img src="${item.image}" alt="${item.name}" style="width:56px;height:56px;border-radius:8px;object-fit:cover;border:1px solid #e2e8f0;flex-shrink:0;"/>
//           <div style="flex:1;min-width:0;">
//             <p style="font-size:14px;font-weight:600;color:#0f172a;margin:0 0 2px 0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${item.name}</p>
//             <p style="font-size:12px;color:#94a3b8;margin:0;">Qty: ${item.quantity} × ₹${item.price.toLocaleString()}</p>
//           </div>
//           <p style="font-size:16px;font-weight:700;color:#16a34a;margin:0;white-space:nowrap;">₹${(item.price * item.quantity).toLocaleString()}</p>
//         </div>
//         `,
//           )
//           .join("")}
//       </div>

//       <!-- Price Summary -->
//       <div style="background:#f8fafc;border-radius:12px;padding:20px;margin-bottom:24px;">
//         <div style="display:flex;justify-content:space-between;margin-bottom:8px;">
//           <span style="font-size:13px;color:#64748b;">Subtotal</span>
//           <span style="font-size:13px;color:#0f172a;">₹${data.itemsPrice?.toLocaleString()}</span>
//         </div>
//         <div style="display:flex;justify-content:space-between;margin-bottom:8px;">
//           <span style="font-size:13px;color:#64748b;">Shipping</span>
//           <span style="font-size:13px;color:#0f172a;">${data.shippingPrice === 0 ? "FREE 🎉" : "₹" + data.shippingPrice}</span>
//         </div>
//         <div style="display:flex;justify-content:space-between;margin-bottom:8px;">
//           <span style="font-size:13px;color:#64748b;">Tax (5%)</span>
//           <span style="font-size:13px;color:#0f172a;">₹${data.taxPrice?.toLocaleString()}</span>
//         </div>
//         ${
//           data.discountAmount > 0
//             ? `
//         <div style="display:flex;justify-content:space-between;margin-bottom:8px;">
//           <span style="font-size:13px;color:#16a34a;">Discount 🎟️</span>
//           <span style="font-size:13px;color:#16a34a;">-₹${data.discountAmount?.toLocaleString()}</span>
//         </div>
//         `
//             : ""
//         }
//         <div style="height:1px;background:#e2e8f0;margin:12px 0;"></div>
//         <div style="display:flex;justify-content:space-between;">
//           <span style="font-size:16px;font-weight:700;color:#0f172a;">Total</span>
//           <span style="font-family:Georgia,serif;font-size:22px;font-weight:700;color:#16a34a;">₹${data.totalPrice?.toLocaleString()}</span>
//         </div>
//       </div>

//       <!-- Shipping Address -->
//       <div style="border:1px solid #e2e8f0;border-radius:12px;padding:16px;margin-bottom:24px;">
//         <p style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#94a3b8;margin:0 0 10px 0;">📍 Shipping Address</p>
//         <p style="font-size:14px;font-weight:600;color:#0f172a;margin:0 0 4px 0;">${data.shippingAddress?.fullName}</p>
//         <p style="font-size:13px;color:#64748b;margin:0 0 2px 0;">${data.shippingAddress?.addressLine1}${data.shippingAddress?.addressLine2 ? ", " + data.shippingAddress.addressLine2 : ""}</p>
//         <p style="font-size:13px;color:#64748b;margin:0 0 2px 0;">${data.shippingAddress?.city}, ${data.shippingAddress?.state} — ${data.shippingAddress?.pincode}</p>
//         <p style="font-size:13px;color:#94a3b8;margin:0;">📱 ${data.shippingAddress?.phone}</p>
//       </div>

//       <!-- Track Order Button -->
//       <div style="text-align:center;margin-bottom:28px;">
//         <a href="${process.env.FRONTEND_URL || "http://localhost:5173"}/orders/${data.orderId}"
//           style="display:inline-block;padding:14px 32px;background:#16a34a;color:white;text-decoration:none;border-radius:12px;font-size:15px;font-weight:600;letter-spacing:0.02em;box-shadow:0 4px 12px rgba(22,163,74,0.3);">
//           Track Your Order →
//         </a>
//       </div>

//       <!-- Dua -->
//       <div style="text-align:center;padding:20px;background:#f0fdf4;border-radius:12px;border:1px solid #bbf7d0;">
//         <p style="font-family:Georgia,serif;font-size:18px;color:#15803d;margin:0 0 8px 0;">بَارَكَ اللَّهُ لَكَ</p>
//         <p style="font-size:13px;color:#64748b;margin:0;">May Allah bless you in your purchase. JazakAllah Khair for choosing NoorBazaar!</p>
//       </div>
//     </div>

//     <!-- Footer -->
//     <div style="background:#f8fafc;border-radius:0 0 16px 16px;padding:20px 24px;text-align:center;border-top:1px solid #e2e8f0;">
//       <p style="font-size:12px;color:#94a3b8;margin:0 0 4px 0;">NoorBazaar — Your Islamic Lifestyle Store</p>
//       <p style="font-size:11px;color:#cbd5e1;margin:0;">This is an automated email. Please do not reply.</p>
//     </div>

//   </div>
// </body>
// </html>
//       `,
//     }),

//     // ── Order Status Update ──
//     orderStatusUpdate: (data) => ({
//       subject: `📦 Order #${data.orderNumber} — ${data.status} | NoorBazaar`,
//       html: `
// <!DOCTYPE html>
// <html lang="en">
// <head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/></head>
// <body style="margin:0;padding:0;background:#f8fafc;font-family:Arial,sans-serif;">
//   <div style="max-width:600px;margin:0 auto;padding:24px 16px;">

//     <div style="background:linear-gradient(135deg,#14532d,#16a34a);border-radius:16px 16px 0 0;padding:28px 24px;text-align:center;">
//       <h1 style="font-family:Georgia,serif;font-size:24px;color:white;margin:0;">NoorBazaar 🌙</h1>
//     </div>

//     <div style="background:white;padding:32px 24px;border-radius:0 0 16px 16px;">
//       <div style="text-align:center;margin-bottom:24px;">
//         <div style="font-size:48px;margin-bottom:12px;">${data.statusIcon}</div>
//         <h2 style="font-family:Georgia,serif;font-size:22px;color:#0f172a;margin:0 0 8px 0;">
//           Order ${data.status}!
//         </h2>
//         <p style="font-size:14px;color:#64748b;margin:0;">
//           Assalamu Alaikum ${data.userName}, your order status has been updated.
//         </p>
//       </div>

//       <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px;padding:20px;margin-bottom:24px;text-align:center;">
//         <p style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#16a34a;margin:0 0 6px 0;">Order Number</p>
//         <p style="font-size:22px;font-weight:800;color:#0f172a;margin:0 0 12px 0;">#${data.orderNumber}</p>
//         <span style="font-size:13px;font-weight:700;padding:6px 16px;border-radius:20px;background:#16a34a;color:white;">${data.status}</span>
//       </div>

//       <p style="font-size:14px;color:#64748b;text-align:center;margin:0 0 24px 0;">${data.statusMessage}</p>

//       ${
//         data.trackingNumber
//           ? `
//       <div style="background:#f8fafc;border-radius:12px;padding:16px;margin-bottom:24px;text-align:center;">
//         <p style="font-size:12px;color:#94a3b8;margin:0 0 4px 0;">TRACKING NUMBER</p>
//         <p style="font-size:18px;font-weight:800;color:#0f172a;letter-spacing:0.1em;margin:0;">${data.trackingNumber}</p>
//       </div>
//       `
//           : ""
//       }

//       <div style="text-align:center;margin-bottom:24px;">
//         <a href="${process.env.FRONTEND_URL || "http://localhost:5173"}/orders/${data.orderId}"
//           style="display:inline-block;padding:14px 32px;background:#16a34a;color:white;text-decoration:none;border-radius:12px;font-size:15px;font-weight:600;box-shadow:0 4px 12px rgba(22,163,74,0.3);">
//           View Order Details →
//         </a>
//       </div>

//       <div style="text-align:center;padding:16px;background:#f0fdf4;border-radius:12px;border:1px solid #bbf7d0;">
//         <p style="font-family:Georgia,serif;font-size:16px;color:#15803d;margin:0 0 6px 0;">جَزَاكَ اللَّهُ خَيْرًا</p>
//         <p style="font-size:12px;color:#64748b;margin:0;">JazakAllah Khair for choosing NoorBazaar!</p>
//       </div>
//     </div>

//   </div>
// </body>
// </html>
//       `,
//     }),

//     // ── Welcome Email ──
//     welcome: (data) => ({
//       subject: `🌙 Welcome to NoorBazaar, ${data.userName}!`,
//       html: `
// <!DOCTYPE html>
// <html lang="en">
// <head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/></head>
// <body style="margin:0;padding:0;background:#f8fafc;font-family:Arial,sans-serif;">
//   <div style="max-width:600px;margin:0 auto;padding:24px 16px;">

//     <div style="background:linear-gradient(135deg,#14532d,#16a34a);border-radius:16px 16px 0 0;padding:40px 24px;text-align:center;">
//       <p style="font-family:Georgia,serif;font-size:22px;color:#bbf7d0;margin:0 0 8px 0;">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</p>
//       <h1 style="font-family:Georgia,serif;font-size:32px;color:white;margin:8px 0;">NoorBazaar</h1>
//       <p style="font-size:13px;color:#86efac;margin:0;">Your Islamic Lifestyle Store 🌙</p>
//     </div>

//     <div style="background:white;padding:32px 24px;">
//       <div style="text-align:center;margin-bottom:28px;">
//         <div style="font-size:56px;margin-bottom:16px;">🌟</div>
//         <h2 style="font-family:Georgia,serif;font-size:26px;color:#0f172a;margin:0 0 8px 0;">
//           Assalamu Alaikum, ${data.userName}!
//         </h2>
//         <p style="font-size:15px;color:#64748b;margin:0;line-height:1.6;">
//           Welcome to NoorBazaar! We're honoured to have you join our community of Muslims who cherish quality Islamic products.
//         </p>
//       </div>

//       <!-- Features -->
//       <div style="display:grid;gap:12px;margin-bottom:28px;">
//         ${[
//           {
//             icon: "📖",
//             title: "Quran & Books",
//             desc: "Authentic Islamic literature and Qurans",
//           },
//           {
//             icon: "📿",
//             title: "Tasbih & Prayer",
//             desc: "Quality prayer accessories and tasbihs",
//           },
//           {
//             icon: "🕌",
//             title: "Islamic Decor",
//             desc: "Beautiful Islamic art and home decor",
//           },
//           {
//             icon: "🧴",
//             title: "Attar & Fragrances",
//             desc: "Natural Islamic perfumes and attars",
//           },
//         ]
//           .map(
//             (f) => `
//         <div style="display:flex;align-items:center;gap:14px;padding:14px;background:#f8fafc;border-radius:10px;border:1px solid #e2e8f0;">
//           <span style="font-size:24px;">${f.icon}</span>
//           <div>
//             <p style="font-size:14px;font-weight:600;color:#0f172a;margin:0 0 2px 0;">${f.title}</p>
//             <p style="font-size:12px;color:#94a3b8;margin:0;">${f.desc}</p>
//           </div>
//         </div>
//         `,
//           )
//           .join("")}
//       </div>

//       <div style="text-align:center;margin-bottom:28px;">
//         <a href="${process.env.FRONTEND_URL || "http://localhost:5173"}/products"
//           style="display:inline-block;padding:14px 40px;background:#16a34a;color:white;text-decoration:none;border-radius:12px;font-size:16px;font-weight:600;box-shadow:0 4px 12px rgba(22,163,74,0.3);">
//           Start Shopping →
//         </a>
//       </div>

//       <div style="text-align:center;padding:20px;background:#f0fdf4;border-radius:12px;border:1px solid #bbf7d0;">
//         <p style="font-family:Georgia,serif;font-size:18px;color:#15803d;margin:0 0 8px 0;">بَارَكَ اللَّهُ فِيكَ</p>
//         <p style="font-size:13px;color:#64748b;margin:0;">May Allah bless you and your family. JazakAllah Khair!</p>
//       </div>
//     </div>

//     <div style="background:#f8fafc;border-radius:0 0 16px 16px;padding:20px 24px;text-align:center;border-top:1px solid #e2e8f0;">
//       <p style="font-size:12px;color:#94a3b8;margin:0;">NoorBazaar — نور بازار</p>
//     </div>

//   </div>
// </body>
// </html>
//       `,
//     }),
//   };

//   const template = templates[templateName];
//   if (!template) throw new Error(`Template "${templateName}" not found`);
//   return template(templateData);
// };

// // ==============================
// // Main sendEmail Function
// // ==============================
// const sendEmail = async ({ to, templateName, templateData }) => {
//   try {
//     const transporter = createTransporter();
//     const { subject, html } = getEmailTemplate(templateName, templateData);

//     const mailOptions = {
//       from: `"${process.env.FROM_NAME || "NoorBazaar"}" <${process.env.FROM_EMAIL || process.env.SMTP_EMAIL}>`,
//       to,
//       subject,
//       html,
//     };

//     const info = await transporter.sendMail(mailOptions);
//     logger.info(`✅ Email sent: ${templateName} → ${to} (${info.messageId})`);
//     return info;
//   } catch (error) {
//     logger.error(`❌ Email failed: ${templateName} → ${to}: ${error.message}`);
//     throw error;
//   }
// };

// module.exports = sendEmail;

const nodemailer = require("nodemailer");
const logger = require("./logger");

// ==============================
// Create Transporter
// ==============================
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
    tls: { rejectUnauthorized: false },
  });
};

// ==============================
// Email Templates
// ==============================
const getEmailTemplate = (templateName, templateData) => {
  const templates = {
    // ── Order Confirmation ──
    orderConfirmation: (data) => ({
      subject: `🌙 Order Confirmed — #${data.orderNumber} | NoorBazaar`,
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Order Confirmation</title>
</head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:'DM Sans',Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:24px 16px;">

    <!-- Header -->
    <div style="background:linear-gradient(135deg,#14532d,#16a34a);border-radius:16px 16px 0 0;padding:32px 24px;text-align:center;">
      <p style="font-family:Georgia,serif;font-size:28px;color:#bbf7d0;margin:0 0 4px 0;letter-spacing:0.05em;">بِسْمِ اللَّهِ</p>
      <h1 style="font-family:Georgia,serif;font-size:28px;color:white;margin:8px 0 4px 0;letter-spacing:0.02em;">NoorBazaar</h1>
      <p style="font-size:13px;color:#86efac;margin:0;">نور بازار</p>
    </div>

    <!-- Body -->
    <div style="background:white;padding:32px 24px;">

      <!-- Greeting -->
      <div style="text-align:center;margin-bottom:28px;">
        <div style="font-size:48px;margin-bottom:12px;">🌙</div>
        <h2 style="font-family:Georgia,serif;font-size:24px;color:#0f172a;margin:0 0 8px 0;">
          JazakAllah Khair, ${data.userName}!
        </h2>
        <p style="font-size:14px;color:#64748b;margin:0;">
          Your order has been placed successfully. May Allah bless your purchase.
        </p>
      </div>

      <!-- Order Details Box -->
      <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px;padding:20px;margin-bottom:24px;">
        <div style="display:flex;justify-content:space-between;flex-wrap:wrap;gap:12px;">
          <div>
            <p style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#16a34a;margin:0 0 4px 0;">Order Number</p>
            <p style="font-size:18px;font-weight:800;color:#0f172a;margin:0;letter-spacing:0.05em;">#${data.orderNumber}</p>
          </div>
          <div>
            <p style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#16a34a;margin:0 0 4px 0;">Order Date</p>
            <p style="font-size:14px;color:#0f172a;margin:0;">${data.orderDate}</p>
          </div>
          <div>
            <p style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#16a34a;margin:0 0 4px 0;">Payment</p>
            <p style="font-size:14px;color:#0f172a;margin:0;">${data.paymentMethod}</p>
          </div>
          <div>
            <p style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#16a34a;margin:0 0 4px 0;">Status</p>
            <span style="font-size:12px;font-weight:700;padding:3px 10px;border-radius:20px;background:#dcfce7;color:#15803d;">Confirmed ✅</span>
          </div>
        </div>
      </div>

      <!-- Items -->
      <h3 style="font-family:Georgia,serif;font-size:18px;color:#0f172a;margin:0 0 16px 0;">Order Items</h3>
      <div style="border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;margin-bottom:24px;">
        ${data.items
          .map(
            (item, i) => `
        <div style="display:flex;align-items:center;gap:16px;padding:14px 16px;${i < data.items.length - 1 ? "border-bottom:1px solid #f8fafc;" : ""}background:${i % 2 === 0 ? "white" : "#f8fafc"};">
          <img src="${item.image}" alt="${item.name}" style="width:56px;height:56px;border-radius:8px;object-fit:cover;border:1px solid #e2e8f0;flex-shrink:0;"/>
          <div style="flex:1;min-width:0;">
            <p style="font-size:14px;font-weight:600;color:#0f172a;margin:0 0 2px 0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${item.name}</p>
            <p style="font-size:12px;color:#94a3b8;margin:0;">Qty: ${item.quantity} × ₹${item.price.toLocaleString()}</p>
          </div>
          <p style="font-size:16px;font-weight:700;color:#16a34a;margin:0;white-space:nowrap;">₹${(item.price * item.quantity).toLocaleString()}</p>
        </div>
        `,
          )
          .join("")}
      </div>

      <!-- Price Summary -->
      <div style="background:#f8fafc;border-radius:12px;padding:20px;margin-bottom:24px;">
        <div style="display:flex;justify-content:space-between;margin-bottom:8px;">
          <span style="font-size:13px;color:#64748b;">Subtotal</span>
          <span style="font-size:13px;color:#0f172a;">₹${data.itemsPrice?.toLocaleString()}</span>
        </div>
        <div style="display:flex;justify-content:space-between;margin-bottom:8px;">
          <span style="font-size:13px;color:#64748b;">Shipping</span>
          <span style="font-size:13px;color:#0f172a;">${data.shippingPrice === 0 ? "FREE 🎉" : "₹" + data.shippingPrice}</span>
        </div>
        <div style="display:flex;justify-content:space-between;margin-bottom:8px;">
          <span style="font-size:13px;color:#64748b;">Tax (5%)</span>
          <span style="font-size:13px;color:#0f172a;">₹${data.taxPrice?.toLocaleString()}</span>
        </div>
        ${
          data.discountAmount > 0
            ? `
        <div style="display:flex;justify-content:space-between;margin-bottom:8px;">
          <span style="font-size:13px;color:#16a34a;">Discount 🎟️</span>
          <span style="font-size:13px;color:#16a34a;">-₹${data.discountAmount?.toLocaleString()}</span>
        </div>
        `
            : ""
        }
        <div style="height:1px;background:#e2e8f0;margin:12px 0;"></div>
        <div style="display:flex;justify-content:space-between;">
          <span style="font-size:16px;font-weight:700;color:#0f172a;">Total</span>
          <span style="font-family:Georgia,serif;font-size:22px;font-weight:700;color:#16a34a;">₹${data.totalPrice?.toLocaleString()}</span>
        </div>
      </div>

      <!-- Shipping Address -->
      <div style="border:1px solid #e2e8f0;border-radius:12px;padding:16px;margin-bottom:24px;">
        <p style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#94a3b8;margin:0 0 10px 0;">📍 Shipping Address</p>
        <p style="font-size:14px;font-weight:600;color:#0f172a;margin:0 0 4px 0;">${data.shippingAddress?.fullName}</p>
        <p style="font-size:13px;color:#64748b;margin:0 0 2px 0;">${data.shippingAddress?.addressLine1}${data.shippingAddress?.addressLine2 ? ", " + data.shippingAddress.addressLine2 : ""}</p>
        <p style="font-size:13px;color:#64748b;margin:0 0 2px 0;">${data.shippingAddress?.city}, ${data.shippingAddress?.state} — ${data.shippingAddress?.pincode}</p>
        <p style="font-size:13px;color:#94a3b8;margin:0;">📱 ${data.shippingAddress?.phone}</p>
      </div>

      <!-- Track Order Button -->
      <div style="text-align:center;margin-bottom:28px;">
        <a href="${process.env.FRONTEND_URL || "http://localhost:5173"}/orders/${data.orderId}"
          style="display:inline-block;padding:14px 32px;background:#16a34a;color:white;text-decoration:none;border-radius:12px;font-size:15px;font-weight:600;letter-spacing:0.02em;box-shadow:0 4px 12px rgba(22,163,74,0.3);">
          Track Your Order →
        </a>
      </div>

      <!-- Dua -->
      <div style="text-align:center;padding:20px;background:#f0fdf4;border-radius:12px;border:1px solid #bbf7d0;">
        <p style="font-family:Georgia,serif;font-size:18px;color:#15803d;margin:0 0 8px 0;">بَارَكَ اللَّهُ لَكَ</p>
        <p style="font-size:13px;color:#64748b;margin:0;">May Allah bless you in your purchase. JazakAllah Khair for choosing NoorBazaar!</p>
      </div>
    </div>

    <!-- Footer -->
    <div style="background:#f8fafc;border-radius:0 0 16px 16px;padding:20px 24px;text-align:center;border-top:1px solid #e2e8f0;">
      <p style="font-size:12px;color:#94a3b8;margin:0 0 4px 0;">NoorBazaar — Your Islamic Lifestyle Store</p>
      <p style="font-size:11px;color:#cbd5e1;margin:0;">This is an automated email. Please do not reply.</p>
    </div>

  </div>
</body>
</html>
      `,
    }),

    // ── Order Status Update ──
    orderStatusUpdate: (data) => ({
      subject: `📦 Order #${data.orderNumber} — ${data.status} | NoorBazaar`,
      html: `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/></head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:24px 16px;">

    <div style="background:linear-gradient(135deg,#14532d,#16a34a);border-radius:16px 16px 0 0;padding:28px 24px;text-align:center;">
      <h1 style="font-family:Georgia,serif;font-size:24px;color:white;margin:0;">NoorBazaar 🌙</h1>
    </div>

    <div style="background:white;padding:32px 24px;border-radius:0 0 16px 16px;">
      <div style="text-align:center;margin-bottom:24px;">
        <div style="font-size:48px;margin-bottom:12px;">${data.statusIcon}</div>
        <h2 style="font-family:Georgia,serif;font-size:22px;color:#0f172a;margin:0 0 8px 0;">
          Order ${data.status}!
        </h2>
        <p style="font-size:14px;color:#64748b;margin:0;">
          Assalamu Alaikum ${data.userName}, your order status has been updated.
        </p>
      </div>

      <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px;padding:20px;margin-bottom:24px;text-align:center;">
        <p style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#16a34a;margin:0 0 6px 0;">Order Number</p>
        <p style="font-size:22px;font-weight:800;color:#0f172a;margin:0 0 12px 0;">#${data.orderNumber}</p>
        <span style="font-size:13px;font-weight:700;padding:6px 16px;border-radius:20px;background:#16a34a;color:white;">${data.status}</span>
      </div>

      <p style="font-size:14px;color:#64748b;text-align:center;margin:0 0 24px 0;">${data.statusMessage}</p>

      ${
        data.trackingNumber
          ? `
      <div style="background:#f8fafc;border-radius:12px;padding:16px;margin-bottom:24px;text-align:center;">
        <p style="font-size:12px;color:#94a3b8;margin:0 0 4px 0;">TRACKING NUMBER</p>
        <p style="font-size:18px;font-weight:800;color:#0f172a;letter-spacing:0.1em;margin:0;">${data.trackingNumber}</p>
      </div>
      `
          : ""
      }

      <div style="text-align:center;margin-bottom:24px;">
        <a href="${process.env.FRONTEND_URL || "http://localhost:5173"}/orders/${data.orderId}"
          style="display:inline-block;padding:14px 32px;background:#16a34a;color:white;text-decoration:none;border-radius:12px;font-size:15px;font-weight:600;box-shadow:0 4px 12px rgba(22,163,74,0.3);">
          View Order Details →
        </a>
      </div>

      <div style="text-align:center;padding:16px;background:#f0fdf4;border-radius:12px;border:1px solid #bbf7d0;">
        <p style="font-family:Georgia,serif;font-size:16px;color:#15803d;margin:0 0 6px 0;">جَزَاكَ اللَّهُ خَيْرًا</p>
        <p style="font-size:12px;color:#64748b;margin:0;">JazakAllah Khair for choosing NoorBazaar!</p>
      </div>
    </div>

  </div>
</body>
</html>
      `,
    }),

    // ── Welcome Email ──
    welcome: (data) => ({
      subject: `🌙 Welcome to NoorBazaar, ${data.userName}!`,
      html: `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/></head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:24px 16px;">

    <div style="background:linear-gradient(135deg,#14532d,#16a34a);border-radius:16px 16px 0 0;padding:40px 24px;text-align:center;">
      <p style="font-family:Georgia,serif;font-size:22px;color:#bbf7d0;margin:0 0 8px 0;">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</p>
      <h1 style="font-family:Georgia,serif;font-size:32px;color:white;margin:8px 0;">NoorBazaar</h1>
      <p style="font-size:13px;color:#86efac;margin:0;">Your Islamic Lifestyle Store 🌙</p>
    </div>

    <div style="background:white;padding:32px 24px;">
      <div style="text-align:center;margin-bottom:28px;">
        <div style="font-size:56px;margin-bottom:16px;">🌟</div>
        <h2 style="font-family:Georgia,serif;font-size:26px;color:#0f172a;margin:0 0 8px 0;">
          Assalamu Alaikum, ${data.userName}!
        </h2>
        <p style="font-size:15px;color:#64748b;margin:0;line-height:1.6;">
          Welcome to NoorBazaar! We're honoured to have you join our community of Muslims who cherish quality Islamic products.
        </p>
      </div>

      <!-- Features -->
      <div style="display:grid;gap:12px;margin-bottom:28px;">
        ${[
          {
            icon: "📖",
            title: "Quran & Books",
            desc: "Authentic Islamic literature and Qurans",
          },
          {
            icon: "📿",
            title: "Tasbih & Prayer",
            desc: "Quality prayer accessories and tasbihs",
          },
          {
            icon: "🕌",
            title: "Islamic Decor",
            desc: "Beautiful Islamic art and home decor",
          },
          {
            icon: "🧴",
            title: "Attar & Fragrances",
            desc: "Natural Islamic perfumes and attars",
          },
        ]
          .map(
            (f) => `
        <div style="display:flex;align-items:center;gap:14px;padding:14px;background:#f8fafc;border-radius:10px;border:1px solid #e2e8f0;">
          <span style="font-size:24px;">${f.icon}</span>
          <div>
            <p style="font-size:14px;font-weight:600;color:#0f172a;margin:0 0 2px 0;">${f.title}</p>
            <p style="font-size:12px;color:#94a3b8;margin:0;">${f.desc}</p>
          </div>
        </div>
        `,
          )
          .join("")}
      </div>

      <div style="text-align:center;margin-bottom:28px;">
        <a href="${process.env.FRONTEND_URL || "http://localhost:5173"}/products"
          style="display:inline-block;padding:14px 40px;background:#16a34a;color:white;text-decoration:none;border-radius:12px;font-size:16px;font-weight:600;box-shadow:0 4px 12px rgba(22,163,74,0.3);">
          Start Shopping →
        </a>
      </div>

      <div style="text-align:center;padding:20px;background:#f0fdf4;border-radius:12px;border:1px solid #bbf7d0;">
        <p style="font-family:Georgia,serif;font-size:18px;color:#15803d;margin:0 0 8px 0;">بَارَكَ اللَّهُ فِيكَ</p>
        <p style="font-size:13px;color:#64748b;margin:0;">May Allah bless you and your family. JazakAllah Khair!</p>
      </div>
    </div>

    <div style="background:#f8fafc;border-radius:0 0 16px 16px;padding:20px 24px;text-align:center;border-top:1px solid #e2e8f0;">
      <p style="font-size:12px;color:#94a3b8;margin:0;">NoorBazaar — نور بازار</p>
    </div>

  </div>
</body>
</html>
      `,
    }),
  };

  const template = templates[templateName];
  if (!template) throw new Error(`Template "${templateName}" not found`);
  return template(templateData);
};

// ==============================
// Main sendEmail Function
// ==============================
const sendEmail = async ({ to, templateName, templateData }) => {
  try {
    const transporter = createTransporter();
    const { subject, html } = getEmailTemplate(templateName, templateData);

    const mailOptions = {
      from: `"${process.env.FROM_NAME || "NoorBazaar"}" <${process.env.FROM_EMAIL || process.env.SMTP_EMAIL}>`,
      to,
      subject,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    logger.info(`✅ Email sent: ${templateName} → ${to} (${info.messageId})`);
    return info;
  } catch (error) {
    logger.error(`❌ Email failed: ${templateName} → ${to}: ${error.message}`);
    throw error;
  }
};

module.exports = sendEmail;
