// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import API from "../services/api";
// import toast from "react-hot-toast";

// const CouponsPage = () => {
//   const navigate = useNavigate();
//   const { isAuth } = useSelector((s) => s.auth);
//   const { totalPrice } = useSelector((s) => s.cart);

//   const [coupons, setCoupons] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [copying, setCopying] = useState(null);

//   useEffect(() => {
//     if (!isAuth) {
//       navigate("/login");
//       return;
//     }
//     fetchCoupons();
//   }, [isAuth]);

//   const fetchCoupons = async () => {
//     setLoading(true);
//     try {
//       // ✅ Use validate endpoint to get public coupons
//       const { data } = await API.get("/coupons/public");
//       setCoupons(data.data || []);
//     } catch (err) {
//       // ✅ Fallback — if 404, try admin route
//       if (err.response?.status === 404) {
//         try {
//           const { data } = await API.get("/admin/coupons");
//           // Filter only active and non-expired
//           const now = new Date();
//           const active = (data.data || []).filter((c) => {
//             if (!c.isActive) return false;
//             if (c.expiresAt && new Date(c.expiresAt) < now) return false;
//             return true;
//           });
//           setCoupons(active);
//         } catch {
//           toast.error("Failed to load coupons");
//         }
//       } else {
//         toast.error("Failed to load coupons");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCopy = async (code) => {
//     try {
//       await navigator.clipboard.writeText(code);
//       setCopying(code);
//       toast.success(`Copied: ${code} 🎉`);
//       setTimeout(() => setCopying(null), 2000);
//     } catch {
//       // Fallback for older browsers
//       const el = document.createElement("textarea");
//       el.value = code;
//       document.body.appendChild(el);
//       el.select();
//       document.execCommand("copy");
//       document.body.removeChild(el);
//       setCopying(code);
//       toast.success(`Copied: ${code} 🎉`);
//       setTimeout(() => setCopying(null), 2000);
//     }
//   };

//   const handleUseNow = (code) => {
//     navigate("/cart");
//     // Store coupon in sessionStorage so CartPage can auto-apply
//     sessionStorage.setItem("pendingCoupon", code);
//     toast.success(`Go apply ${code} in cart! 🎟️`);
//   };

//   const isExpiringSoon = (expiresAt) => {
//     if (!expiresAt) return false;
//     const diff = new Date(expiresAt) - new Date();
//     return diff > 0 && diff < 3 * 24 * 60 * 60 * 1000;
//   };

//   const isEligible = (coupon) => {
//     if (!coupon.minOrderAmount) return true;
//     return totalPrice >= coupon.minOrderAmount;
//   };

//   // ✅ Handle both field name variants from model
//   // const getDiscount = (coupon) => coupon.discount || coupon.discountValue || 0;
//   // const getExpiry = (coupon) => coupon.expiresAt || coupon.expiryDate || null;
//   // const getMinOrder = (coupon) =>
//   //   coupon.minOrderAmount || coupon.minimumOrderAmount || 0;
//   // const getMaxDisc = (coupon) =>
//   //   coupon.maxDiscountAmount || coupon.maximumDiscount || 0;
//   // const getUsed = (coupon) => coupon.usedCount || coupon.timesUsed || 0;
//   // const getLimit = (coupon) => coupon.usageLimit || coupon.maxUsage || 0;
//   // ✅ Replace these helper functions in CouponsPage.jsx
//   const getDiscount = (coupon) => coupon.discountValue || 0;
//   const getExpiry = (coupon) => coupon.expiryDate || null;
//   const getMinOrder = (coupon) => coupon.minOrderAmount || 0;
//   const getMaxDisc = (coupon) => coupon.maxDiscountAmount || 0;
//   const getUsed = (coupon) => coupon.usedCount || 0;
//   const getLimit = (coupon) => coupon.maxUsageLimit || 0;
//   const shimmer = {
//     background: "linear-gradient(90deg,#f0fdf4 25%,#dcfce7 50%,#f0fdf4 75%)",
//     backgroundSize: "200% 100%",
//     animation: "shimmer 1.5s infinite",
//     borderRadius: "16px",
//   };

//   return (
//     <>
//       <div style={{ background: "#ffffff", minHeight: "100vh" }}>
//         <div
//           style={{
//             maxWidth: "900px",
//             margin: "0 auto",
//             padding: "clamp(16px,4vw,40px) 24px",
//           }}
//         >
//           {/* Header */}
//           <div style={{ marginBottom: "32px" }}>
//             <p
//               style={{
//                 fontFamily: "DM Sans",
//                 fontSize: "11px",
//                 fontWeight: "700",
//                 textTransform: "uppercase",
//                 letterSpacing: "0.12em",
//                 color: "#16a34a",
//                 margin: "0 0 4px 0",
//               }}
//             >
//               Special Offers
//             </p>
//             <h1
//               style={{
//                 fontFamily: "Cormorant Garamond, serif",
//                 fontSize: "clamp(24px,4vw,36px)",
//                 fontWeight: "600",
//                 color: "#0f172a",
//                 margin: "0 0 8px 0",
//               }}
//             >
//               Available Coupons 🎟️
//             </h1>
//             <p
//               style={{
//                 fontFamily: "DM Sans",
//                 fontSize: "14px",
//                 color: "#64748b",
//                 margin: 0,
//               }}
//             >
//               Apply these coupon codes at checkout to save on your order.
//             </p>
//           </div>

//           {/* Cart total banner */}
//           {totalPrice > 0 && (
//             <div
//               style={{
//                 padding: "14px 20px",
//                 borderRadius: "12px",
//                 background: "#f0fdf4",
//                 border: "1px solid #bbf7d0",
//                 marginBottom: "24px",
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "10px",
//                 flexWrap: "wrap",
//               }}
//             >
//               <span style={{ fontSize: "20px" }}>🛒</span>
//               <p
//                 style={{
//                   fontFamily: "DM Sans",
//                   fontSize: "14px",
//                   color: "#15803d",
//                   fontWeight: "600",
//                   margin: 0,
//                 }}
//               >
//                 Your cart total:{" "}
//                 <span
//                   style={{
//                     fontFamily: "Cormorant Garamond, serif",
//                     fontSize: "18px",
//                   }}
//                 >
//                   ₹{totalPrice?.toLocaleString()}
//                 </span>{" "}
//                 — Eligible coupons are highlighted!
//               </p>
//             </div>
//           )}

//           {/* Coupons Grid */}
//           {loading ? (
//             <div className="coupons-grid">
//               {Array(6)
//                 .fill(0)
//                 .map((_, i) => (
//                   <div key={i} style={{ height: "200px", ...shimmer }} />
//                 ))}
//             </div>
//           ) : coupons.length === 0 ? (
//             <div
//               style={{
//                 padding: "64px 24px",
//                 textAlign: "center",
//                 borderRadius: "16px",
//                 background: "#ffffff",
//                 border: "1px solid #e2e8f0",
//               }}
//             >
//               <div style={{ fontSize: "56px", marginBottom: "16px" }}>🎟️</div>
//               <h3
//                 style={{
//                   fontFamily: "Cormorant Garamond, serif",
//                   fontSize: "24px",
//                   color: "#0f172a",
//                   margin: "0 0 8px 0",
//                 }}
//               >
//                 No Coupons Available
//               </h3>
//               <p
//                 style={{
//                   fontFamily: "DM Sans",
//                   fontSize: "14px",
//                   color: "#64748b",
//                   margin: "0 0 20px 0",
//                 }}
//               >
//                 Check back later for new offers!
//               </p>
//               <button
//                 onClick={() => navigate("/products")}
//                 style={{
//                   padding: "12px 24px",
//                   borderRadius: "12px",
//                   background: "#16a34a",
//                   color: "white",
//                   fontFamily: "DM Sans",
//                   fontSize: "14px",
//                   fontWeight: "600",
//                   border: "none",
//                   cursor: "pointer",
//                 }}
//               >
//                 Browse Products
//               </button>
//             </div>
//           ) : (
//             <div className="coupons-grid">
//               {coupons.map((coupon) => {
//                 const eligible = isEligible(coupon);
//                 const expiry = getExpiry(coupon);
//                 const expiringSoon = isExpiringSoon(expiry);
//                 const copied = copying === coupon.code;
//                 const discountVal = getDiscount(coupon);
//                 const minOrder = getMinOrder(coupon);
//                 const maxDisc = getMaxDisc(coupon);
//                 const usedCount = getUsed(coupon);
//                 const usageLimit = getLimit(coupon);
//                 const usagePercent = usageLimit
//                   ? Math.round((usedCount / usageLimit) * 100)
//                   : 0;

//                 return (
//                   <div
//                     key={coupon._id}
//                     style={{
//                       borderRadius: "16px",
//                       background: "#ffffff",
//                       border: eligible
//                         ? "1px solid #bbf7d0"
//                         : "1px solid #e2e8f0",
//                       overflow: "hidden",
//                       transition: "all 0.25s",
//                       opacity: eligible ? 1 : 0.75,
//                     }}
//                     onMouseEnter={(e) => {
//                       if (eligible) {
//                         e.currentTarget.style.transform = "translateY(-3px)";
//                         e.currentTarget.style.boxShadow =
//                           "0 8px 24px rgba(22,163,74,0.12)";
//                       }
//                     }}
//                     onMouseLeave={(e) => {
//                       e.currentTarget.style.transform = "translateY(0)";
//                       e.currentTarget.style.boxShadow = "none";
//                     }}
//                   >
//                     {/* Top Banner */}
//                     <div
//                       style={{
//                         padding: "16px 20px",
//                         background: eligible
//                           ? "linear-gradient(135deg,#f0fdf4,#dcfce7)"
//                           : "#f8fafc",
//                         borderBottom: "1px dashed #bbf7d0",
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "space-between",
//                         gap: "12px",
//                       }}
//                     >
//                       <div>
//                         {expiringSoon && (
//                           <span
//                             style={{
//                               display: "inline-block",
//                               marginBottom: "6px",
//                               fontFamily: "DM Sans",
//                               fontSize: "10px",
//                               fontWeight: "700",
//                               padding: "2px 8px",
//                               borderRadius: "20px",
//                               background: "#fef9c3",
//                               color: "#854d0e",
//                               border: "1px solid #fde68a",
//                             }}
//                           >
//                             ⏰ Expiring Soon
//                           </span>
//                         )}
//                         <div
//                           style={{
//                             display: "flex",
//                             alignItems: "baseline",
//                             gap: "4px",
//                           }}
//                         >
//                           <span
//                             style={{
//                               fontFamily: "Cormorant Garamond, serif",
//                               fontWeight: "700",
//                               fontSize: "clamp(28px,4vw,36px)",
//                               color: "#16a34a",
//                               lineHeight: 1,
//                             }}
//                           >
//                             {coupon.discountType === "percentage"
//                               ? `${discountVal}%`
//                               : `₹${discountVal}`}
//                           </span>
//                           <span
//                             style={{
//                               fontFamily: "DM Sans",
//                               fontSize: "14px",
//                               fontWeight: "600",
//                               color: "#64748b",
//                             }}
//                           >
//                             OFF
//                           </span>
//                         </div>
//                         {coupon.discountType === "percentage" &&
//                           maxDisc > 0 && (
//                             <p
//                               style={{
//                                 fontFamily: "DM Sans",
//                                 fontSize: "11px",
//                                 color: "#64748b",
//                                 margin: "2px 0 0 0",
//                               }}
//                             >
//                               Up to ₹{maxDisc}
//                             </p>
//                           )}
//                       </div>

//                       {/* Code Box */}
//                       <div style={{ textAlign: "right" }}>
//                         <p
//                           style={{
//                             fontFamily: "DM Sans",
//                             fontSize: "10px",
//                             color: "#94a3b8",
//                             margin: "0 0 4px 0",
//                           }}
//                         >
//                           CODE
//                         </p>
//                         <div
//                           onClick={() => handleCopy(coupon.code)}
//                           style={{
//                             fontFamily: "DM Sans",
//                             fontSize: "clamp(12px,2vw,14px)",
//                             fontWeight: "800",
//                             color: "#0f172a",
//                             letterSpacing: "0.12em",
//                             background: "white",
//                             padding: "6px 12px",
//                             borderRadius: "8px",
//                             border: "2px dashed #16a34a",
//                             cursor: "pointer",
//                             transition: "background 0.2s",
//                             userSelect: "none",
//                           }}
//                           onMouseEnter={(e) =>
//                             (e.currentTarget.style.background = "#f0fdf4")
//                           }
//                           onMouseLeave={(e) =>
//                             (e.currentTarget.style.background = "white")
//                           }
//                         >
//                           {copied ? "✅ Copied!" : coupon.code}
//                         </div>
//                       </div>
//                     </div>

//                     {/* Details */}
//                     <div style={{ padding: "14px 20px" }}>
//                       {/* Badges */}
//                       <div
//                         style={{
//                           display: "flex",
//                           flexWrap: "wrap",
//                           gap: "6px",
//                           marginBottom: "12px",
//                         }}
//                       >
//                         {minOrder > 0 && (
//                           <span
//                             style={{
//                               fontFamily: "DM Sans",
//                               fontSize: "11px",
//                               padding: "3px 10px",
//                               borderRadius: "20px",
//                               background: eligible ? "#f0fdf4" : "#f8fafc",
//                               color: eligible ? "#15803d" : "#94a3b8",
//                               border: `1px solid ${eligible ? "#bbf7d0" : "#e2e8f0"}`,
//                             }}
//                           >
//                             Min. ₹{minOrder}
//                           </span>
//                         )}
//                         {expiry ? (
//                           <span
//                             style={{
//                               fontFamily: "DM Sans",
//                               fontSize: "11px",
//                               padding: "3px 10px",
//                               borderRadius: "20px",
//                               background: expiringSoon ? "#fefce8" : "#f8fafc",
//                               color: expiringSoon ? "#854d0e" : "#94a3b8",
//                               border: `1px solid ${expiringSoon ? "#fde68a" : "#e2e8f0"}`,
//                             }}
//                           >
//                             Expires{" "}
//                             {new Date(expiry).toLocaleDateString("en-IN", {
//                               day: "numeric",
//                               month: "short",
//                               year: "numeric",
//                             })}
//                           </span>
//                         ) : (
//                           <span
//                             style={{
//                               fontFamily: "DM Sans",
//                               fontSize: "11px",
//                               padding: "3px 10px",
//                               borderRadius: "20px",
//                               background: "#f0fdf4",
//                               color: "#15803d",
//                               border: "1px solid #bbf7d0",
//                             }}
//                           >
//                             No Expiry
//                           </span>
//                         )}
//                       </div>

//                       {/* Usage Progress */}
//                       {usageLimit > 0 && (
//                         <div style={{ marginBottom: "12px" }}>
//                           <div
//                             style={{
//                               display: "flex",
//                               justifyContent: "space-between",
//                               marginBottom: "4px",
//                             }}
//                           >
//                             <span
//                               style={{
//                                 fontFamily: "DM Sans",
//                                 fontSize: "11px",
//                                 color: "#94a3b8",
//                               }}
//                             >
//                               Usage
//                             </span>
//                             <span
//                               style={{
//                                 fontFamily: "DM Sans",
//                                 fontSize: "11px",
//                                 color: "#64748b",
//                               }}
//                             >
//                               {usedCount}/{usageLimit}
//                             </span>
//                           </div>
//                           <div
//                             style={{
//                               height: "4px",
//                               background: "#f0f0f0",
//                               borderRadius: "4px",
//                               overflow: "hidden",
//                             }}
//                           >
//                             <div
//                               style={{
//                                 height: "100%",
//                                 width: `${Math.min(100, usagePercent)}%`,
//                                 background:
//                                   usagePercent > 80 ? "#ef4444" : "#16a34a",
//                                 borderRadius: "4px",
//                               }}
//                             />
//                           </div>
//                         </div>
//                       )}

//                       {/* Not eligible message */}
//                       {!eligible && minOrder > 0 && totalPrice > 0 && (
//                         <p
//                           style={{
//                             fontFamily: "DM Sans",
//                             fontSize: "12px",
//                             color: "#ef4444",
//                             margin: "0 0 10px 0",
//                           }}
//                         >
//                           Add ₹{(minOrder - totalPrice).toLocaleString()} more
//                           to use this coupon
//                         </p>
//                       )}
//                       {!eligible && minOrder > 0 && totalPrice === 0 && (
//                         <p
//                           style={{
//                             fontFamily: "DM Sans",
//                             fontSize: "12px",
//                             color: "#94a3b8",
//                             margin: "0 0 10px 0",
//                           }}
//                         >
//                           Add products worth ₹{minOrder.toLocaleString()} to
//                           cart first
//                         </p>
//                       )}

//                       {/* Buttons */}
//                       <div style={{ display: "flex", gap: "8px" }}>
//                         <button
//                           onClick={() => handleCopy(coupon.code)}
//                           style={{
//                             flex: 1,
//                             padding: "9px",
//                             borderRadius: "10px",
//                             fontFamily: "DM Sans",
//                             fontSize: "12px",
//                             fontWeight: "600",
//                             cursor: "pointer",
//                             background: copied ? "#f0fdf4" : "#f8fafc",
//                             border: `1px solid ${copied ? "#bbf7d0" : "#e2e8f0"}`,
//                             color: copied ? "#16a34a" : "#64748b",
//                             transition: "all 0.2s",
//                           }}
//                           onMouseEnter={(e) => {
//                             if (!copied) {
//                               e.currentTarget.style.borderColor = "#16a34a";
//                               e.currentTarget.style.color = "#16a34a";
//                             }
//                           }}
//                           onMouseLeave={(e) => {
//                             if (!copied) {
//                               e.currentTarget.style.borderColor = "#e2e8f0";
//                               e.currentTarget.style.color = "#64748b";
//                             }
//                           }}
//                         >
//                           {copied ? "✅ Copied!" : "📋 Copy Code"}
//                         </button>
//                         <button
//                           onClick={() => handleUseNow(coupon.code)}
//                           disabled={!eligible}
//                           style={{
//                             flex: 1,
//                             padding: "9px",
//                             borderRadius: "10px",
//                             fontFamily: "DM Sans",
//                             fontSize: "12px",
//                             fontWeight: "600",
//                             cursor: eligible ? "pointer" : "not-allowed",
//                             background: eligible ? "#16a34a" : "#f0f0f0",
//                             color: eligible ? "white" : "#94a3b8",
//                             border: "none",
//                             transition: "all 0.2s",
//                             boxShadow: eligible
//                               ? "0 2px 8px rgba(22,163,74,0.2)"
//                               : "none",
//                           }}
//                           onMouseEnter={(e) => {
//                             if (eligible)
//                               e.currentTarget.style.background = "#15803d";
//                           }}
//                           onMouseLeave={(e) => {
//                             if (eligible)
//                               e.currentTarget.style.background = "#16a34a";
//                           }}
//                         >
//                           Use Now →
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}

//           {/* How it works */}
//           <div
//             style={{
//               marginTop: "40px",
//               padding: "clamp(16px,3vw,24px)",
//               borderRadius: "16px",
//               background: "#f0fdf4",
//               border: "1px solid #bbf7d0",
//             }}
//           >
//             <p
//               style={{
//                 fontFamily: "DM Sans",
//                 fontSize: "13px",
//                 fontWeight: "700",
//                 textTransform: "uppercase",
//                 letterSpacing: "0.1em",
//                 color: "#15803d",
//                 margin: "0 0 16px 0",
//               }}
//             >
//               How to use coupons
//             </p>
//             <div className="how-grid">
//               {[
//                 {
//                   step: "1",
//                   icon: "📋",
//                   title: "Copy Code",
//                   desc: "Click 'Copy Code' to copy the coupon code",
//                 },
//                 {
//                   step: "2",
//                   icon: "🛒",
//                   title: "Go to Cart",
//                   desc: "Add products to your cart and proceed",
//                 },
//                 {
//                   step: "3",
//                   icon: "🎟️",
//                   title: "Apply Coupon",
//                   desc: "Enter the code in the coupon box and click Apply",
//                 },
//                 {
//                   step: "4",
//                   icon: "💰",
//                   title: "Save Money",
//                   desc: "Discount is applied automatically to your order total",
//                 },
//               ].map((s) => (
//                 <div
//                   key={s.step}
//                   style={{
//                     display: "flex",
//                     alignItems: "flex-start",
//                     gap: "12px",
//                   }}
//                 >
//                   <div
//                     style={{
//                       width: "32px",
//                       height: "32px",
//                       borderRadius: "8px",
//                       background: "#16a34a",
//                       color: "white",
//                       fontFamily: "DM Sans",
//                       fontSize: "14px",
//                       fontWeight: "700",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       flexShrink: 0,
//                     }}
//                   >
//                     {s.step}
//                   </div>
//                   <div>
//                     <p
//                       style={{
//                         fontFamily: "DM Sans",
//                         fontSize: "13px",
//                         fontWeight: "700",
//                         color: "#0f172a",
//                         margin: "0 0 2px 0",
//                       }}
//                     >
//                       {s.icon} {s.title}
//                     </p>
//                     <p
//                       style={{
//                         fontFamily: "DM Sans",
//                         fontSize: "12px",
//                         color: "#64748b",
//                         margin: 0,
//                       }}
//                     >
//                       {s.desc}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       <style>{`
//         .coupons-grid {
//           display: grid;
//           grid-template-columns: 1fr;
//           gap: 16px;
//         }
//         @media (min-width: 540px) { .coupons-grid { grid-template-columns: repeat(2, 1fr); } }
//         @media (min-width: 900px) { .coupons-grid { grid-template-columns: repeat(3, 1fr); } }
//         .how-grid {
//           display: grid;
//           grid-template-columns: 1fr;
//           gap: 14px;
//         }
//         @media (min-width: 540px) { .how-grid { grid-template-columns: repeat(2, 1fr); } }
//         @keyframes shimmer {
//           0%   { background-position: 200% 0; }
//           100% { background-position: -200% 0; }
//         }
//       `}</style>
//     </>
//   );
// };

// export default CouponsPage;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import API from "../services/api";
import toast from "react-hot-toast";

const CouponsPage = () => {
  const navigate = useNavigate();
  const { isAuth } = useSelector((s) => s.auth);
  const { totalPrice } = useSelector((s) => s.cart);

  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copying, setCopying] = useState(null);

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
      return;
    }
    fetchCoupons();
  }, [isAuth]);

  const fetchCoupons = async () => {
    setLoading(true);
    try {
      const { data } = await API.get("/coupons/public");
      setCoupons(data.data || []);
    } catch {
      toast.error("Failed to load coupons");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async (code) => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      const el = document.createElement("textarea");
      el.value = code;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopying(code);
    toast.success(`Copied: ${code} 🎉`);
    setTimeout(() => setCopying(null), 2000);
  };

  const handleUseNow = (code) => {
    sessionStorage.setItem("pendingCoupon", code);
    navigate("/cart");
    toast.success(`Apply ${code} in cart! 🎟️`);
  };

  const isExpiringSoon = (expiryDate) => {
    if (!expiryDate) return false;
    const diff = new Date(expiryDate) - new Date();
    return diff > 0 && diff < 3 * 24 * 60 * 60 * 1000;
  };

  const isEligible = (coupon) => {
    if (!coupon.minOrderAmount) return true;
    return totalPrice >= coupon.minOrderAmount;
  };

  // ✅ Correct model field names
  const getDiscount = (c) => c.discountValue || 0;
  const getExpiry = (c) => c.expiryDate || null;
  const getMinOrder = (c) => c.minOrderAmount || 0;
  const getMaxDisc = (c) => c.maxDiscountAmount || 0;
  const getUsed = (c) => c.usedCount || 0;
  const getLimit = (c) => c.maxUsageLimit || 0;

  const shimmer = {
    background: "linear-gradient(90deg,#f0fdf4 25%,#dcfce7 50%,#f0fdf4 75%)",
    backgroundSize: "200% 100%",
    animation: "shimmer 1.5s infinite",
    borderRadius: "16px",
  };

  return (
    <>
      <div style={{ background: "#ffffff", minHeight: "100vh" }}>
        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            padding: "clamp(16px,4vw,40px) 24px",
          }}
        >
          {/* Header */}
          <div style={{ marginBottom: "32px" }}>
            <p
              style={{
                fontFamily: "DM Sans",
                fontSize: "11px",
                fontWeight: "700",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "#16a34a",
                margin: "0 0 4px 0",
              }}
            >
              Special Offers
            </p>
            <h1
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "clamp(24px,4vw,36px)",
                fontWeight: "600",
                color: "#0f172a",
                margin: "0 0 8px 0",
              }}
            >
              Available Coupons 🎟️
            </h1>
            <p
              style={{
                fontFamily: "DM Sans",
                fontSize: "14px",
                color: "#64748b",
                margin: 0,
              }}
            >
              Apply these coupon codes at checkout to save on your order.
            </p>
          </div>

          {/* Cart Banner */}
          {totalPrice > 0 && (
            <div
              style={{
                padding: "14px 20px",
                borderRadius: "12px",
                background: "#f0fdf4",
                border: "1px solid #bbf7d0",
                marginBottom: "24px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                flexWrap: "wrap",
              }}
            >
              <span style={{ fontSize: "20px" }}>🛒</span>
              <p
                style={{
                  fontFamily: "DM Sans",
                  fontSize: "14px",
                  color: "#15803d",
                  fontWeight: "600",
                  margin: 0,
                }}
              >
                Your cart total:{" "}
                <span
                  style={{
                    fontFamily: "Cormorant Garamond, serif",
                    fontSize: "18px",
                  }}
                >
                  ₹{totalPrice?.toLocaleString()}
                </span>{" "}
                — Eligible coupons are highlighted!
              </p>
            </div>
          )}

          {/* Grid */}
          {loading ? (
            <div className="cp-grid">
              {Array(6)
                .fill(0)
                .map((_, i) => (
                  <div key={i} style={{ height: "200px", ...shimmer }} />
                ))}
            </div>
          ) : coupons.length === 0 ? (
            <div
              style={{
                padding: "64px 24px",
                textAlign: "center",
                borderRadius: "16px",
                background: "#ffffff",
                border: "1px solid #e2e8f0",
              }}
            >
              <div style={{ fontSize: "56px", marginBottom: "16px" }}>🎟️</div>
              <h3
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontSize: "24px",
                  color: "#0f172a",
                  margin: "0 0 8px 0",
                }}
              >
                No Coupons Available
              </h3>
              <p
                style={{
                  fontFamily: "DM Sans",
                  fontSize: "14px",
                  color: "#64748b",
                  margin: "0 0 20px 0",
                }}
              >
                Check back later for new offers!
              </p>
              <button
                onClick={() => navigate("/products")}
                style={{
                  padding: "12px 24px",
                  borderRadius: "12px",
                  background: "#16a34a",
                  color: "white",
                  fontFamily: "DM Sans",
                  fontSize: "14px",
                  fontWeight: "600",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Browse Products
              </button>
            </div>
          ) : (
            <div className="cp-grid">
              {coupons.map((coupon) => {
                const eligible = isEligible(coupon);
                const expiry = getExpiry(coupon);
                const expiringSoon = isExpiringSoon(expiry);
                const copied = copying === coupon.code;
                const discountVal = getDiscount(coupon);
                const minOrder = getMinOrder(coupon);
                const maxDisc = getMaxDisc(coupon);
                const usedCount = getUsed(coupon);
                const usageLimit = getLimit(coupon);
                const usagePct = usageLimit
                  ? Math.round((usedCount / usageLimit) * 100)
                  : 0;

                return (
                  <div
                    key={coupon._id}
                    style={{
                      borderRadius: "16px",
                      background: "#ffffff",
                      border: eligible
                        ? "1px solid #bbf7d0"
                        : "1px solid #e2e8f0",
                      overflow: "hidden",
                      transition: "all 0.25s",
                      opacity: eligible ? 1 : 0.75,
                    }}
                    onMouseEnter={(e) => {
                      if (eligible) {
                        e.currentTarget.style.transform = "translateY(-3px)";
                        e.currentTarget.style.boxShadow =
                          "0 8px 24px rgba(22,163,74,0.12)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    {/* Top Banner */}
                    <div
                      style={{
                        padding: "16px 20px",
                        background: eligible
                          ? "linear-gradient(135deg,#f0fdf4,#dcfce7)"
                          : "#f8fafc",
                        borderBottom: "1px dashed #bbf7d0",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "12px",
                      }}
                    >
                      <div>
                        {expiringSoon && (
                          <span
                            style={{
                              display: "inline-block",
                              marginBottom: "6px",
                              fontFamily: "DM Sans",
                              fontSize: "10px",
                              fontWeight: "700",
                              padding: "2px 8px",
                              borderRadius: "20px",
                              background: "#fef9c3",
                              color: "#854d0e",
                              border: "1px solid #fde68a",
                            }}
                          >
                            ⏰ Expiring Soon
                          </span>
                        )}
                        <div
                          style={{
                            display: "flex",
                            alignItems: "baseline",
                            gap: "4px",
                          }}
                        >
                          <span
                            style={{
                              fontFamily: "Cormorant Garamond, serif",
                              fontWeight: "700",
                              fontSize: "clamp(28px,4vw,36px)",
                              color: "#16a34a",
                              lineHeight: 1,
                            }}
                          >
                            {coupon.discountType === "percentage"
                              ? `${discountVal}%`
                              : `₹${discountVal}`}
                          </span>
                          <span
                            style={{
                              fontFamily: "DM Sans",
                              fontSize: "14px",
                              fontWeight: "600",
                              color: "#64748b",
                            }}
                          >
                            OFF
                          </span>
                        </div>
                        {coupon.discountType === "percentage" &&
                          maxDisc > 0 && (
                            <p
                              style={{
                                fontFamily: "DM Sans",
                                fontSize: "11px",
                                color: "#64748b",
                                margin: "2px 0 0 0",
                              }}
                            >
                              Up to ₹{maxDisc}
                            </p>
                          )}
                      </div>

                      {/* Code */}
                      <div style={{ textAlign: "right" }}>
                        <p
                          style={{
                            fontFamily: "DM Sans",
                            fontSize: "10px",
                            color: "#94a3b8",
                            margin: "0 0 4px 0",
                          }}
                        >
                          CODE
                        </p>
                        <div
                          onClick={() => handleCopy(coupon.code)}
                          style={{
                            fontFamily: "DM Sans",
                            fontSize: "clamp(12px,2vw,14px)",
                            fontWeight: "800",
                            color: "#0f172a",
                            letterSpacing: "0.12em",
                            background: "white",
                            padding: "6px 12px",
                            borderRadius: "8px",
                            border: "2px dashed #16a34a",
                            cursor: "pointer",
                            transition: "background 0.2s",
                            userSelect: "none",
                          }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.background = "#f0fdf4")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.background = "white")
                          }
                        >
                          {copied ? "✅ Copied!" : coupon.code}
                        </div>
                      </div>
                    </div>

                    {/* Details */}
                    <div style={{ padding: "14px 20px" }}>
                      {/* Badges */}
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "6px",
                          marginBottom: "12px",
                        }}
                      >
                        {minOrder > 0 && (
                          <span
                            style={{
                              fontFamily: "DM Sans",
                              fontSize: "11px",
                              padding: "3px 10px",
                              borderRadius: "20px",
                              background: eligible ? "#f0fdf4" : "#f8fafc",
                              color: eligible ? "#15803d" : "#94a3b8",
                              border: `1px solid ${eligible ? "#bbf7d0" : "#e2e8f0"}`,
                            }}
                          >
                            Min. ₹{minOrder}
                          </span>
                        )}
                        {expiry ? (
                          <span
                            style={{
                              fontFamily: "DM Sans",
                              fontSize: "11px",
                              padding: "3px 10px",
                              borderRadius: "20px",
                              background: expiringSoon ? "#fefce8" : "#f8fafc",
                              color: expiringSoon ? "#854d0e" : "#94a3b8",
                              border: `1px solid ${expiringSoon ? "#fde68a" : "#e2e8f0"}`,
                            }}
                          >
                            Expires{" "}
                            {new Date(expiry).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </span>
                        ) : (
                          <span
                            style={{
                              fontFamily: "DM Sans",
                              fontSize: "11px",
                              padding: "3px 10px",
                              borderRadius: "20px",
                              background: "#f0fdf4",
                              color: "#15803d",
                              border: "1px solid #bbf7d0",
                            }}
                          >
                            No Expiry
                          </span>
                        )}
                      </div>

                      {/* Usage bar */}
                      {usageLimit > 0 && (
                        <div style={{ marginBottom: "12px" }}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              marginBottom: "4px",
                            }}
                          >
                            <span
                              style={{
                                fontFamily: "DM Sans",
                                fontSize: "11px",
                                color: "#94a3b8",
                              }}
                            >
                              Usage
                            </span>
                            <span
                              style={{
                                fontFamily: "DM Sans",
                                fontSize: "11px",
                                color: "#64748b",
                              }}
                            >
                              {usedCount}/{usageLimit}
                            </span>
                          </div>
                          <div
                            style={{
                              height: "4px",
                              background: "#f0f0f0",
                              borderRadius: "4px",
                              overflow: "hidden",
                            }}
                          >
                            <div
                              style={{
                                height: "100%",
                                width: `${Math.min(100, usagePct)}%`,
                                background:
                                  usagePct > 80 ? "#ef4444" : "#16a34a",
                                borderRadius: "4px",
                              }}
                            />
                          </div>
                        </div>
                      )}

                      {/* Not eligible messages */}
                      {!eligible && minOrder > 0 && totalPrice > 0 && (
                        <p
                          style={{
                            fontFamily: "DM Sans",
                            fontSize: "12px",
                            color: "#ef4444",
                            margin: "0 0 10px 0",
                          }}
                        >
                          Add ₹{(minOrder - totalPrice).toLocaleString()} more
                          to use this coupon
                        </p>
                      )}
                      {!eligible && minOrder > 0 && totalPrice === 0 && (
                        <p
                          style={{
                            fontFamily: "DM Sans",
                            fontSize: "12px",
                            color: "#94a3b8",
                            margin: "0 0 10px 0",
                          }}
                        >
                          Add products worth ₹{minOrder.toLocaleString()} to
                          cart first
                        </p>
                      )}

                      {/* Buttons */}
                      <div style={{ display: "flex", gap: "8px" }}>
                        <button
                          onClick={() => handleCopy(coupon.code)}
                          style={{
                            flex: 1,
                            padding: "9px",
                            borderRadius: "10px",
                            fontFamily: "DM Sans",
                            fontSize: "12px",
                            fontWeight: "600",
                            cursor: "pointer",
                            background: copied ? "#f0fdf4" : "#f8fafc",
                            border: `1px solid ${copied ? "#bbf7d0" : "#e2e8f0"}`,
                            color: copied ? "#16a34a" : "#64748b",
                            transition: "all 0.2s",
                          }}
                          onMouseEnter={(e) => {
                            if (!copied) {
                              e.currentTarget.style.borderColor = "#16a34a";
                              e.currentTarget.style.color = "#16a34a";
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!copied) {
                              e.currentTarget.style.borderColor = "#e2e8f0";
                              e.currentTarget.style.color = "#64748b";
                            }
                          }}
                        >
                          {copied ? "✅ Copied!" : "📋 Copy Code"}
                        </button>
                        <button
                          onClick={() => handleUseNow(coupon.code)}
                          disabled={!eligible}
                          style={{
                            flex: 1,
                            padding: "9px",
                            borderRadius: "10px",
                            fontFamily: "DM Sans",
                            fontSize: "12px",
                            fontWeight: "600",
                            cursor: eligible ? "pointer" : "not-allowed",
                            background: eligible ? "#16a34a" : "#f0f0f0",
                            color: eligible ? "white" : "#94a3b8",
                            border: "none",
                            transition: "all 0.2s",
                            boxShadow: eligible
                              ? "0 2px 8px rgba(22,163,74,0.2)"
                              : "none",
                          }}
                          onMouseEnter={(e) => {
                            if (eligible)
                              e.currentTarget.style.background = "#15803d";
                          }}
                          onMouseLeave={(e) => {
                            if (eligible)
                              e.currentTarget.style.background = "#16a34a";
                          }}
                        >
                          Use Now →
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* How it works */}
          <div
            style={{
              marginTop: "40px",
              padding: "clamp(16px,3vw,24px)",
              borderRadius: "16px",
              background: "#f0fdf4",
              border: "1px solid #bbf7d0",
            }}
          >
            <p
              style={{
                fontFamily: "DM Sans",
                fontSize: "13px",
                fontWeight: "700",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "#15803d",
                margin: "0 0 16px 0",
              }}
            >
              How to use coupons
            </p>
            <div className="cp-how-grid">
              {[
                {
                  step: "1",
                  icon: "📋",
                  title: "Copy Code",
                  desc: "Click 'Copy Code' or the code box to copy",
                },
                {
                  step: "2",
                  icon: "🛒",
                  title: "Go to Cart",
                  desc: "Add products to cart and go to checkout",
                },
                {
                  step: "3",
                  icon: "🎟️",
                  title: "Apply Coupon",
                  desc: "Enter the code in the coupon box and click Apply",
                },
                {
                  step: "4",
                  icon: "💰",
                  title: "Save Money",
                  desc: "Discount applied automatically to your total",
                },
              ].map((s) => (
                <div
                  key={s.step}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "12px",
                  }}
                >
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "8px",
                      background: "#16a34a",
                      color: "white",
                      fontFamily: "DM Sans",
                      fontSize: "14px",
                      fontWeight: "700",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {s.step}
                  </div>
                  <div>
                    <p
                      style={{
                        fontFamily: "DM Sans",
                        fontSize: "13px",
                        fontWeight: "700",
                        color: "#0f172a",
                        margin: "0 0 2px 0",
                      }}
                    >
                      {s.icon} {s.title}
                    </p>
                    <p
                      style={{
                        fontFamily: "DM Sans",
                        fontSize: "12px",
                        color: "#64748b",
                        margin: 0,
                      }}
                    >
                      {s.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .cp-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }
        @media (min-width: 540px) { .cp-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 900px) { .cp-grid { grid-template-columns: repeat(3, 1fr); } }
        .cp-how-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 14px;
        }
        @media (min-width: 540px) { .cp-how-grid { grid-template-columns: repeat(2, 1fr); } }
        @keyframes shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </>
  );
};

export default CouponsPage;
