// import { useState, useCallback } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { placeOrder } from "../redux/slices/orderSlice";
// import toast from "react-hot-toast";

// const steps = ["Address", "Payment", "Review"];

// const CheckoutPage = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { items, totalPrice, finalPrice } = useSelector((s) => s.cart);
//   const { user } = useSelector((s) => s.auth);
//   const { loading } = useSelector((s) => s.orders);

//   const [step, setStep] = useState(0);
//   const [method, setMethod] = useState("COD");
//   const [addr, setAddr] = useState({
//     fullName: user?.name || "",
//     phone: user?.phone || "",
//     addressLine1: "",
//     addressLine2: "",
//     city: "",
//     state: "",
//     pincode: "",
//     country: "India",
//   });

//   const shipping = (finalPrice || totalPrice) >= 999 ? 0 : 99;
//   const tax = Math.round(totalPrice * 0.05);
//   const grandTotal = Math.max(0, (finalPrice || totalPrice) + shipping + tax);

//   const handleAddrChange = (e) =>
//     setAddr((p) => ({ ...p, [e.target.name]: e.target.value }));

//   const validateAddr = () => {
//     const required = [
//       "fullName",
//       "phone",
//       "addressLine1",
//       "city",
//       "state",
//       "pincode",
//     ];
//     for (const f of required) {
//       if (!addr[f].trim()) {
//         toast.error(
//           `Please enter ${f.replace(/([A-Z])/g, " $1").toLowerCase()}`,
//         );
//         return false;
//       }
//     }
//     if (!/^[0-9]{10}$/.test(addr.phone)) {
//       toast.error("Enter valid 10 digit phone");
//       return false;
//     }
//     if (!/^[0-9]{6}$/.test(addr.pincode)) {
//       toast.error("Enter valid 6 digit pincode");
//       return false;
//     }
//     return true;
//   };

//   const handlePlaceOrder = async () => {
//     const r = await dispatch(
//       placeOrder({ shippingAddress: addr, paymentMethod: method }),
//     );
//     if (r.meta.requestStatus === "fulfilled") {
//       toast.success("Order placed! JazakAllah Khair 🌙");
//       navigate("/dashboard?tab=orders");
//     } else toast.error(r.payload || "Failed to place order");
//   };

//   const inputStyle = {
//     width: "100%",
//     background: "#f8fafc",
//     border: "1px solid #e2e8f0",
//     borderRadius: "10px",
//     padding: "10px 14px",
//     fontFamily: "DM Sans, sans-serif",
//     fontSize: "14px",
//     color: "#0f172a",
//     outline: "none",
//     transition: "border-color 0.2s",
//     boxSizing: "border-box",
//   };

//   const Field = ({ label, name, placeholder, type = "text" }) => (
//     <div>
//       <label
//         style={{
//           display: "block",
//           fontFamily: "DM Sans",
//           fontSize: "12px",
//           fontWeight: "500",
//           color: "#64748b",
//           marginBottom: "6px",
//         }}
//       >
//         {label}
//       </label>
//       <input
//         type={type}
//         name={name}
//         value={addr[name]}
//         onChange={handleAddrChange}
//         placeholder={placeholder}
//         style={inputStyle}
//         onFocus={(e) => (e.currentTarget.style.borderColor = "#16a34a")}
//         onBlur={(e) => (e.currentTarget.style.borderColor = "#e2e8f0")}
//       />
//     </div>
//   );

//   const cardStyle = {
//     padding: "clamp(16px,3vw,24px)",
//     borderRadius: "16px",
//     background: "#ffffff",
//     border: "1px solid #e2e8f0",
//   };

//   return (
//     <>
//       <div style={{ background: "#ffffff", minHeight: "100vh", width: "100%" }}>
//         <div
//           style={{
//             maxWidth: "1024px",
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
//               Checkout
//             </p>
//             <h1
//               style={{
//                 fontFamily: "Cormorant Garamond, serif",
//                 fontSize: "clamp(24px,4vw,36px)",
//                 fontWeight: "600",
//                 color: "#0f172a",
//                 margin: 0,
//               }}
//             >
//               Complete Your Order
//             </h1>
//           </div>

//           {/* Stepper */}
//           <div
//             style={{
//               display: "flex",
//               alignItems: "center",
//               gap: "8px",
//               marginBottom: "32px",
//               flexWrap: "wrap",
//             }}
//           >
//             {steps.map((s, i) => (
//               <div
//                 key={s}
//                 style={{ display: "flex", alignItems: "center", gap: "8px" }}
//               >
//                 <div
//                   style={{ display: "flex", alignItems: "center", gap: "8px" }}
//                 >
//                   <div
//                     style={{
//                       width: "28px",
//                       height: "28px",
//                       borderRadius: "50%",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       fontFamily: "DM Sans",
//                       fontSize: "12px",
//                       fontWeight: "700",
//                       background: i <= step ? "#16a34a" : "#f0f0f0",
//                       color: i <= step ? "white" : "#94a3b8",
//                       transition: "all 0.3s",
//                     }}
//                   >
//                     {i < step ? "✓" : i + 1}
//                   </div>
//                   <span
//                     style={{
//                       fontFamily: "DM Sans",
//                       fontSize: "13px",
//                       fontWeight: "500",
//                       color: i === step ? "#0f172a" : "#94a3b8",
//                     }}
//                   >
//                     {s}
//                   </span>
//                 </div>
//                 {i < steps.length - 1 && (
//                   <div
//                     style={{
//                       width: "clamp(24px,4vw,64px)",
//                       height: "1px",
//                       background: i < step ? "#16a34a" : "#e2e8f0",
//                       transition: "background 0.3s",
//                     }}
//                   />
//                 )}
//               </div>
//             ))}
//           </div>

//           <div className="checkout-grid">
//             {/* Left Panel */}
//             <div>
//               {/* Step 0 — Address */}
//               {step === 0 && (
//                 <div style={cardStyle}>
//                   <p
//                     style={{
//                       fontFamily: "DM Sans",
//                       fontSize: "15px",
//                       fontWeight: "700",
//                       color: "#0f172a",
//                       margin: "0 0 20px 0",
//                     }}
//                   >
//                     📍 Shipping Address
//                   </p>
//                   <div className="addr-grid">
//                     <Field
//                       label="Full Name *"
//                       name="fullName"
//                       placeholder="Abuzar Syed"
//                     />
//                     <Field
//                       label="Phone Number *"
//                       name="phone"
//                       placeholder="9876543210"
//                       type="tel"
//                     />
//                     <div className="col-span-2">
//                       <Field
//                         label="Address Line 1 *"
//                         name="addressLine1"
//                         placeholder="House no, Street name"
//                       />
//                     </div>
//                     <div className="col-span-2">
//                       <Field
//                         label="Address Line 2"
//                         name="addressLine2"
//                         placeholder="Landmark (optional)"
//                       />
//                     </div>
//                     <Field label="City *" name="city" placeholder="Nellore" />
//                     <Field
//                       label="State *"
//                       name="state"
//                       placeholder="Andhra Pradesh"
//                     />
//                     <Field
//                       label="Pincode *"
//                       name="pincode"
//                       placeholder="524001"
//                       type="tel"
//                     />
//                     <Field label="Country" name="country" placeholder="India" />
//                   </div>
//                   <button
//                     onClick={() => {
//                       if (validateAddr()) setStep(1);
//                     }}
//                     style={{
//                       marginTop: "20px",
//                       width: "100%",
//                       padding: "14px",
//                       borderRadius: "12px",
//                       background: "#16a34a",
//                       color: "white",
//                       fontFamily: "DM Sans",
//                       fontSize: "14px",
//                       fontWeight: "600",
//                       border: "none",
//                       cursor: "pointer",
//                       boxShadow: "0 4px 12px rgba(22,163,74,0.25)",
//                       transition: "opacity 0.2s",
//                     }}
//                     onMouseEnter={(e) =>
//                       (e.currentTarget.style.opacity = "0.9")
//                     }
//                     onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
//                   >
//                     Continue to Payment →
//                   </button>
//                 </div>
//               )}

//               {/* Step 1 — Payment */}
//               {step === 1 && (
//                 <div style={cardStyle}>
//                   <p
//                     style={{
//                       fontFamily: "DM Sans",
//                       fontSize: "15px",
//                       fontWeight: "700",
//                       color: "#0f172a",
//                       margin: "0 0 20px 0",
//                     }}
//                   >
//                     💳 Payment Method
//                   </p>
//                   <div
//                     style={{
//                       display: "flex",
//                       flexDirection: "column",
//                       gap: "10px",
//                       marginBottom: "20px",
//                     }}
//                   >
//                     {[
//                       {
//                         id: "COD",
//                         icon: "💵",
//                         title: "Cash on Delivery",
//                         desc: "Pay when your order arrives",
//                       },
//                       {
//                         id: "Razorpay",
//                         icon: "💳",
//                         title: "Online Payment",
//                         desc: "UPI, Cards, Net Banking via Razorpay",
//                       },
//                     ].map((m) => (
//                       <button
//                         key={m.id}
//                         onClick={() => setMethod(m.id)}
//                         style={{
//                           display: "flex",
//                           alignItems: "center",
//                           gap: "14px",
//                           padding: "16px",
//                           borderRadius: "12px",
//                           cursor: "pointer",
//                           textAlign: "left",
//                           transition: "all 0.2s",
//                           background: method === m.id ? "#f0fdf4" : "#f8fafc",
//                           border:
//                             method === m.id
//                               ? "1px solid #16a34a"
//                               : "1px solid #e2e8f0",
//                         }}
//                       >
//                         <div
//                           style={{
//                             width: "40px",
//                             height: "40px",
//                             borderRadius: "10px",
//                             background: "#ffffff",
//                             border: "1px solid #e2e8f0",
//                             display: "flex",
//                             alignItems: "center",
//                             justifyContent: "center",
//                             fontSize: "20px",
//                             flexShrink: 0,
//                           }}
//                         >
//                           {m.icon}
//                         </div>
//                         <div style={{ flex: 1 }}>
//                           <p
//                             style={{
//                               fontFamily: "DM Sans",
//                               fontSize: "14px",
//                               fontWeight: "600",
//                               color: "#0f172a",
//                               margin: 0,
//                             }}
//                           >
//                             {m.title}
//                           </p>
//                           <p
//                             style={{
//                               fontFamily: "DM Sans",
//                               fontSize: "12px",
//                               color: "#64748b",
//                               margin: "2px 0 0 0",
//                             }}
//                           >
//                             {m.desc}
//                           </p>
//                         </div>
//                         <div
//                           style={{
//                             width: "20px",
//                             height: "20px",
//                             borderRadius: "50%",
//                             border: `2px solid ${method === m.id ? "#16a34a" : "#e2e8f0"}`,
//                             display: "flex",
//                             alignItems: "center",
//                             justifyContent: "center",
//                             flexShrink: 0,
//                           }}
//                         >
//                           {method === m.id && (
//                             <div
//                               style={{
//                                 width: "10px",
//                                 height: "10px",
//                                 borderRadius: "50%",
//                                 background: "#16a34a",
//                               }}
//                             />
//                           )}
//                         </div>
//                       </button>
//                     ))}
//                   </div>
//                   <div style={{ display: "flex", gap: "10px" }}>
//                     <button
//                       onClick={() => setStep(0)}
//                       style={{
//                         flex: 1,
//                         padding: "13px",
//                         borderRadius: "12px",
//                         background: "transparent",
//                         border: "1px solid #e2e8f0",
//                         fontFamily: "DM Sans",
//                         fontSize: "14px",
//                         color: "#64748b",
//                         cursor: "pointer",
//                         transition: "all 0.2s",
//                       }}
//                       onMouseEnter={(e) => {
//                         e.currentTarget.style.borderColor = "#bbf7d0";
//                         e.currentTarget.style.color = "#0f172a";
//                       }}
//                       onMouseLeave={(e) => {
//                         e.currentTarget.style.borderColor = "#e2e8f0";
//                         e.currentTarget.style.color = "#64748b";
//                       }}
//                     >
//                       ← Back
//                     </button>
//                     <button
//                       onClick={() => setStep(2)}
//                       style={{
//                         flex: 1,
//                         padding: "13px",
//                         borderRadius: "12px",
//                         background: "#16a34a",
//                         color: "white",
//                         fontFamily: "DM Sans",
//                         fontSize: "14px",
//                         fontWeight: "600",
//                         border: "none",
//                         cursor: "pointer",
//                         transition: "opacity 0.2s",
//                       }}
//                       onMouseEnter={(e) =>
//                         (e.currentTarget.style.opacity = "0.9")
//                       }
//                       onMouseLeave={(e) =>
//                         (e.currentTarget.style.opacity = "1")
//                       }
//                     >
//                       Review Order →
//                     </button>
//                   </div>
//                 </div>
//               )}

//               {/* Step 2 — Review */}
//               {step === 2 && (
//                 <div style={cardStyle}>
//                   <p
//                     style={{
//                       fontFamily: "DM Sans",
//                       fontSize: "15px",
//                       fontWeight: "700",
//                       color: "#0f172a",
//                       margin: "0 0 20px 0",
//                     }}
//                   >
//                     📋 Review Order
//                   </p>

//                   {/* Address */}
//                   <div
//                     style={{
//                       padding: "14px",
//                       borderRadius: "10px",
//                       background: "#f8fafc",
//                       border: "1px solid #e2e8f0",
//                       marginBottom: "12px",
//                     }}
//                   >
//                     <p
//                       style={{
//                         fontFamily: "DM Sans",
//                         fontSize: "11px",
//                         fontWeight: "700",
//                         textTransform: "uppercase",
//                         color: "#94a3b8",
//                         margin: "0 0 8px 0",
//                       }}
//                     >
//                       Delivering to
//                     </p>
//                     <p
//                       style={{
//                         fontFamily: "DM Sans",
//                         fontSize: "14px",
//                         fontWeight: "600",
//                         color: "#0f172a",
//                         margin: 0,
//                       }}
//                     >
//                       {addr.fullName}
//                     </p>
//                     <p
//                       style={{
//                         fontFamily: "DM Sans",
//                         fontSize: "13px",
//                         color: "#64748b",
//                         margin: "2px 0 0 0",
//                       }}
//                     >
//                       {addr.addressLine1}
//                       {addr.addressLine2 && `, ${addr.addressLine2}`},{" "}
//                       {addr.city}, {addr.state} — {addr.pincode}
//                     </p>
//                     <p
//                       style={{
//                         fontFamily: "DM Sans",
//                         fontSize: "12px",
//                         color: "#94a3b8",
//                         margin: "2px 0 0 0",
//                       }}
//                     >
//                       📱 {addr.phone}
//                     </p>
//                   </div>

//                   {/* Payment */}
//                   <div
//                     style={{
//                       padding: "14px",
//                       borderRadius: "10px",
//                       background: "#f8fafc",
//                       border: "1px solid #e2e8f0",
//                       marginBottom: "16px",
//                     }}
//                   >
//                     <p
//                       style={{
//                         fontFamily: "DM Sans",
//                         fontSize: "11px",
//                         fontWeight: "700",
//                         textTransform: "uppercase",
//                         color: "#94a3b8",
//                         margin: "0 0 6px 0",
//                       }}
//                     >
//                       Payment
//                     </p>
//                     <p
//                       style={{
//                         fontFamily: "DM Sans",
//                         fontSize: "14px",
//                         color: "#0f172a",
//                         margin: 0,
//                       }}
//                     >
//                       {method === "COD"
//                         ? "💵 Cash on Delivery"
//                         : "💳 Online Payment (Razorpay)"}
//                     </p>
//                   </div>

//                   {/* Items */}
//                   <div
//                     style={{
//                       display: "flex",
//                       flexDirection: "column",
//                       gap: "10px",
//                       marginBottom: "20px",
//                     }}
//                   >
//                     {items.map((item) => (
//                       <div
//                         key={item._id}
//                         style={{
//                           display: "flex",
//                           alignItems: "center",
//                           gap: "10px",
//                         }}
//                       >
//                         <img
//                           src={item.product?.images?.[0]?.url}
//                           alt={item.product?.name}
//                           style={{
//                             width: "48px",
//                             height: "48px",
//                             borderRadius: "8px",
//                             objectFit: "cover",
//                             background: "#f8fafc",
//                             flexShrink: 0,
//                           }}
//                         />
//                         <div style={{ flex: 1, minWidth: 0 }}>
//                           <p
//                             style={{
//                               fontFamily: "DM Sans",
//                               fontSize: "13px",
//                               fontWeight: "600",
//                               color: "#0f172a",
//                               margin: 0,
//                               overflow: "hidden",
//                               textOverflow: "ellipsis",
//                               whiteSpace: "nowrap",
//                             }}
//                           >
//                             {item.product?.name}
//                           </p>
//                           <p
//                             style={{
//                               fontFamily: "DM Sans",
//                               fontSize: "11px",
//                               color: "#94a3b8",
//                               margin: "2px 0 0 0",
//                             }}
//                           >
//                             Qty: {item.quantity}
//                           </p>
//                         </div>
//                         <span
//                           style={{
//                             fontFamily: "DM Sans",
//                             fontSize: "14px",
//                             fontWeight: "600",
//                             color: "#16a34a",
//                             flexShrink: 0,
//                           }}
//                         >
//                           ₹{(item.price * item.quantity).toLocaleString()}
//                         </span>
//                       </div>
//                     ))}
//                   </div>

//                   <div style={{ display: "flex", gap: "10px" }}>
//                     <button
//                       onClick={() => setStep(1)}
//                       style={{
//                         flex: 1,
//                         padding: "13px",
//                         borderRadius: "12px",
//                         background: "transparent",
//                         border: "1px solid #e2e8f0",
//                         fontFamily: "DM Sans",
//                         fontSize: "14px",
//                         color: "#64748b",
//                         cursor: "pointer",
//                         transition: "all 0.2s",
//                       }}
//                       onMouseEnter={(e) => {
//                         e.currentTarget.style.borderColor = "#bbf7d0";
//                         e.currentTarget.style.color = "#0f172a";
//                       }}
//                       onMouseLeave={(e) => {
//                         e.currentTarget.style.borderColor = "#e2e8f0";
//                         e.currentTarget.style.color = "#64748b";
//                       }}
//                     >
//                       ← Back
//                     </button>
//                     <button
//                       onClick={handlePlaceOrder}
//                       disabled={loading}
//                       style={{
//                         flex: 1,
//                         padding: "13px",
//                         borderRadius: "12px",
//                         background: "linear-gradient(135deg,#16a34a,#15803d)",
//                         color: "white",
//                         fontFamily: "DM Sans",
//                         fontSize: "14px",
//                         fontWeight: "600",
//                         border: "none",
//                         cursor: loading ? "not-allowed" : "pointer",
//                         opacity: loading ? 0.7 : 1,
//                         transition: "opacity 0.2s",
//                         boxShadow: "0 4px 12px rgba(22,163,74,0.25)",
//                       }}
//                     >
//                       {loading ? "Placing..." : "Place Order 🌙"}
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Order Summary Sidebar */}
//             <div style={{ ...cardStyle, height: "fit-content" }}>
//               <p
//                 style={{
//                   fontFamily: "DM Sans",
//                   fontSize: "11px",
//                   fontWeight: "700",
//                   textTransform: "uppercase",
//                   letterSpacing: "0.1em",
//                   color: "#94a3b8",
//                   margin: "0 0 16px 0",
//                 }}
//               >
//                 Order Summary
//               </p>

//               <div
//                 style={{
//                   display: "flex",
//                   flexDirection: "column",
//                   gap: "10px",
//                   marginBottom: "16px",
//                 }}
//               >
//                 {items.map((item) => (
//                   <div
//                     key={item._id}
//                     style={{
//                       display: "flex",
//                       alignItems: "center",
//                       gap: "10px",
//                     }}
//                   >
//                     <img
//                       src={item.product?.images?.[0]?.url}
//                       alt=""
//                       style={{
//                         width: "40px",
//                         height: "40px",
//                         borderRadius: "8px",
//                         objectFit: "cover",
//                         background: "#f8fafc",
//                         flexShrink: 0,
//                       }}
//                     />
//                     <div style={{ flex: 1, minWidth: 0 }}>
//                       <p
//                         style={{
//                           fontFamily: "DM Sans",
//                           fontSize: "12px",
//                           fontWeight: "500",
//                           color: "#0f172a",
//                           margin: 0,
//                           overflow: "hidden",
//                           textOverflow: "ellipsis",
//                           whiteSpace: "nowrap",
//                         }}
//                       >
//                         {item.product?.name}
//                       </p>
//                       <p
//                         style={{
//                           fontFamily: "DM Sans",
//                           fontSize: "11px",
//                           color: "#94a3b8",
//                           margin: "2px 0 0 0",
//                         }}
//                       >
//                         {item.quantity} × ₹{item.price?.toLocaleString()}
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               <div
//                 style={{
//                   borderTop: "1px solid #e2e8f0",
//                   paddingTop: "14px",
//                   display: "flex",
//                   flexDirection: "column",
//                   gap: "8px",
//                   marginBottom: "14px",
//                 }}
//               >
//                 {[
//                   { l: "Subtotal", v: `₹${totalPrice?.toLocaleString()}` },
//                   {
//                     l: "Shipping",
//                     v: shipping === 0 ? "FREE" : `₹${shipping}`,
//                   },
//                   { l: "Tax (5%)", v: `₹${tax}` },
//                 ].map((r) => (
//                   <div
//                     key={r.l}
//                     style={{
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "space-between",
//                     }}
//                   >
//                     <span
//                       style={{
//                         fontFamily: "DM Sans",
//                         fontSize: "13px",
//                         color: "#64748b",
//                       }}
//                     >
//                       {r.l}
//                     </span>
//                     <span
//                       style={{
//                         fontFamily: "DM Sans",
//                         fontSize: "13px",
//                         fontWeight: "500",
//                         color: "#0f172a",
//                       }}
//                     >
//                       {r.v}
//                     </span>
//                   </div>
//                 ))}
//               </div>

//               <div
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "space-between",
//                   borderTop: "1px solid #e2e8f0",
//                   paddingTop: "14px",
//                 }}
//               >
//                 <span
//                   style={{
//                     fontFamily: "DM Sans",
//                     fontSize: "15px",
//                     fontWeight: "700",
//                     color: "#0f172a",
//                   }}
//                 >
//                   Total
//                 </span>
//                 <span
//                   style={{
//                     fontFamily: "Cormorant Garamond, serif",
//                     fontWeight: "700",
//                     fontSize: "28px",
//                     color: "#16a34a",
//                   }}
//                 >
//                   ₹{grandTotal.toLocaleString()}
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <style>{`
//         .checkout-grid {
//           display: grid;
//           grid-template-columns: 1fr;
//           gap: 20px;
//         }
//         @media (min-width: 1024px) {
//           .checkout-grid {
//             grid-template-columns: 1fr 320px;
//             gap: 24px;
//           }
//         }
//         .addr-grid {
//           display: grid;
//           grid-template-columns: 1fr;
//           gap: 14px;
//         }
//         @media (min-width: 540px) {
//           .addr-grid {
//             grid-template-columns: repeat(2, 1fr);
//           }
//           .col-span-2 { grid-column: 1 / -1; }
//         }
//       `}</style>
//     </>
//   );
// };

// export default CheckoutPage;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createRazorpayOrder,
  verifyPayment,
  placeCODOrder,
  clearPayment,
} from "../redux/slices/paymentSlice";
import toast from "react-hot-toast";

// ── Load Razorpay script ──
const loadRazorpayScript = () =>
  new Promise((resolve) => {
    if (document.getElementById("razorpay-script")) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.id = "razorpay-script";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items, totalPrice, totalItems } = useSelector((s) => s.cart);
  const { user } = useSelector((s) => s.auth);
  const { loading, error, success, orderId, orderNumber, paymentStep } =
    useSelector((s) => s.payment);

  const [step, setStep] = useState(1); // 1=address, 2=payment
  const [paymentMethod, setPaymentMethod] = useState("Online");
  const [isGift, setIsGift] = useState(false);
  const [giftMessage, setGiftMessage] = useState("");

  const [address, setAddress] = useState({
    fullName: user?.name || "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
  });

  const shippingPrice = totalPrice >= 999 ? 0 : 99;
  const taxPrice = Math.round(totalPrice * 0.05);
  const grandTotal = totalPrice + shippingPrice + taxPrice;

  useEffect(() => {
    if (totalItems === 0) navigate("/cart");
    return () => {
      dispatch(clearPayment());
    };
  }, [totalItems]);

  useEffect(() => {
    if (success && orderId) {
      navigate(`/order-success/${orderId}`, {
        state: { orderNumber, paymentMethod },
        replace: true,
      });
    }
  }, [success, orderId]);

  const handleAddressChange = (e) => {
    setAddress((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateAddress = () => {
    const required = [
      "fullName",
      "phone",
      "addressLine1",
      "city",
      "state",
      "pincode",
    ];
    for (const field of required) {
      if (!address[field]?.trim()) {
        toast.error(
          `Please fill in ${field.replace(/([A-Z])/g, " $1").toLowerCase()}`,
        );
        return false;
      }
    }
    if (!/^[6-9]\d{9}$/.test(address.phone)) {
      toast.error("Please enter a valid 10-digit phone number");
      return false;
    }
    if (!/^\d{6}$/.test(address.pincode)) {
      toast.error("Please enter a valid 6-digit pincode");
      return false;
    }
    return true;
  };

  const handleRazorpayPayment = async () => {
    const loaded = await loadRazorpayScript();
    if (!loaded) {
      toast.error("Razorpay failed to load. Check your internet.");
      return;
    }

    const result = await dispatch(
      createRazorpayOrder({
        shippingAddress: address,
      }),
    );

    if (result.error || !result.payload) {
      toast.error(result.payload || "Failed to create order");
      return;
    }

    const { razorpayOrderId, amount, keyId, orderSummary } = result.payload;

    const options = {
      key: keyId,
      amount: amount * 100,
      currency: "INR",
      name: "NoorBazaar",
      description: "Islamic Lifestyle Store",
      image: "/logo.png",
      order_id: razorpayOrderId,
      prefill: {
        name: user.name,
        email: user.email,
        contact: address.phone,
      },
      theme: { color: "#16a34a" },
      modal: {
        ondismiss: () => {
          dispatch(clearPayment());
          toast.error("Payment cancelled");
        },
      },
      handler: async (response) => {
        const verifyResult = await dispatch(
          verifyPayment({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            orderData: {
              ...orderSummary,
              isGift,
              giftMessage,
            },
          }),
        );

        if (verifyResult.error) {
          toast.error(verifyResult.payload || "Payment verification failed");
        }
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.on("payment.failed", (response) => {
      toast.error(`Payment failed: ${response.error.description}`);
      dispatch(clearPayment());
    });
    rzp.open();
  };

  const handleCODOrder = async () => {
    const result = await dispatch(
      placeCODOrder({
        shippingAddress: address,
        isGift,
        giftMessage,
      }),
    );
    if (result.error) {
      toast.error(result.payload || "Failed to place order");
    }
  };

  const handlePlaceOrder = () => {
    if (!validateAddress()) return;
    if (paymentMethod === "Online") handleRazorpayPayment();
    else handleCODOrder();
  };

  const inputStyle = {
    width: "100%",
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: "10px",
    padding: "10px 14px",
    fontFamily: "DM Sans, sans-serif",
    fontSize: "14px",
    color: "#0f172a",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
  };

  const labelStyle = {
    display: "block",
    fontFamily: "DM Sans",
    fontSize: "12px",
    fontWeight: "600",
    color: "#64748b",
    marginBottom: "5px",
  };

  return (
    <div style={{ background: "#ffffff", minHeight: "100vh" }}>
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "clamp(16px,4vw,40px) 24px",
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: "28px" }}>
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
            Secure Checkout
          </p>
          <h1
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "clamp(24px,4vw,32px)",
              fontWeight: "600",
              color: "#0f172a",
              margin: 0,
            }}
          >
            Complete Your Order 🌙
          </h1>
        </div>

        {/* Steps */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "28px",
            flexWrap: "wrap",
          }}
        >
          {["Shipping Address", "Payment"].map((s, i) => (
            <div
              key={s}
              style={{ display: "flex", alignItems: "center", gap: "8px" }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <div
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "DM Sans",
                    fontSize: "13px",
                    fontWeight: "700",
                    background:
                      step > i + 1
                        ? "#16a34a"
                        : step === i + 1
                          ? "#16a34a"
                          : "#f0f0f0",
                    color: step >= i + 1 ? "white" : "#94a3b8",
                    transition: "all 0.3s",
                  }}
                >
                  {step > i + 1 ? "✓" : i + 1}
                </div>
                <span
                  style={{
                    fontFamily: "DM Sans",
                    fontSize: "13px",
                    fontWeight: step === i + 1 ? "700" : "500",
                    color: step === i + 1 ? "#0f172a" : "#94a3b8",
                  }}
                >
                  {s}
                </span>
              </div>
              {i < 1 && (
                <div
                  style={{
                    width: "40px",
                    height: "1px",
                    background: step > i + 1 ? "#16a34a" : "#e2e8f0",
                    transition: "background 0.3s",
                  }}
                />
              )}
            </div>
          ))}
        </div>

        <div className="checkout-grid">
          {/* ── Left Column ── */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            {/* Step 1 — Address */}
            {step === 1 && (
              <div
                style={{
                  padding: "clamp(16px,3vw,24px)",
                  borderRadius: "16px",
                  background: "#ffffff",
                  border: "1px solid #e2e8f0",
                }}
              >
                <h2
                  style={{
                    fontFamily: "Cormorant Garamond, serif",
                    fontSize: "20px",
                    fontWeight: "600",
                    color: "#0f172a",
                    margin: "0 0 20px 0",
                  }}
                >
                  📍 Shipping Address
                </h2>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "14px",
                  }}
                >
                  {/* Full Name */}
                  <div style={{ gridColumn: "1 / -1" }}>
                    <label style={labelStyle}>Full Name *</label>
                    <input
                      name="fullName"
                      value={address.fullName}
                      onChange={handleAddressChange}
                      placeholder="Mohammed Abuzar"
                      style={inputStyle}
                      onFocus={(e) =>
                        (e.currentTarget.style.borderColor = "#16a34a")
                      }
                      onBlur={(e) =>
                        (e.currentTarget.style.borderColor = "#e2e8f0")
                      }
                    />
                  </div>

                  {/* Phone */}
                  <div style={{ gridColumn: "1 / -1" }}>
                    <label style={labelStyle}>Phone Number *</label>
                    <input
                      name="phone"
                      value={address.phone}
                      onChange={handleAddressChange}
                      placeholder="9876543210"
                      maxLength={10}
                      style={inputStyle}
                      onFocus={(e) =>
                        (e.currentTarget.style.borderColor = "#16a34a")
                      }
                      onBlur={(e) =>
                        (e.currentTarget.style.borderColor = "#e2e8f0")
                      }
                    />
                  </div>

                  {/* Address Line 1 */}
                  <div style={{ gridColumn: "1 / -1" }}>
                    <label style={labelStyle}>Address Line 1 *</label>
                    <input
                      name="addressLine1"
                      value={address.addressLine1}
                      onChange={handleAddressChange}
                      placeholder="House No, Street Name"
                      style={inputStyle}
                      onFocus={(e) =>
                        (e.currentTarget.style.borderColor = "#16a34a")
                      }
                      onBlur={(e) =>
                        (e.currentTarget.style.borderColor = "#e2e8f0")
                      }
                    />
                  </div>

                  {/* Address Line 2 */}
                  <div style={{ gridColumn: "1 / -1" }}>
                    <label style={labelStyle}>
                      Address Line 2{" "}
                      <span style={{ color: "#94a3b8", fontWeight: "400" }}>
                        (optional)
                      </span>
                    </label>
                    <input
                      name="addressLine2"
                      value={address.addressLine2}
                      onChange={handleAddressChange}
                      placeholder="Apartment, Area, Landmark"
                      style={inputStyle}
                      onFocus={(e) =>
                        (e.currentTarget.style.borderColor = "#16a34a")
                      }
                      onBlur={(e) =>
                        (e.currentTarget.style.borderColor = "#e2e8f0")
                      }
                    />
                  </div>

                  {/* City */}
                  <div>
                    <label style={labelStyle}>City *</label>
                    <input
                      name="city"
                      value={address.city}
                      onChange={handleAddressChange}
                      placeholder="Mumbai"
                      style={inputStyle}
                      onFocus={(e) =>
                        (e.currentTarget.style.borderColor = "#16a34a")
                      }
                      onBlur={(e) =>
                        (e.currentTarget.style.borderColor = "#e2e8f0")
                      }
                    />
                  </div>

                  {/* State */}
                  <div>
                    <label style={labelStyle}>State *</label>
                    <select
                      name="state"
                      value={address.state}
                      onChange={handleAddressChange}
                      style={inputStyle}
                      onFocus={(e) =>
                        (e.currentTarget.style.borderColor = "#16a34a")
                      }
                      onBlur={(e) =>
                        (e.currentTarget.style.borderColor = "#e2e8f0")
                      }
                    >
                      <option value="">Select State</option>
                      {[
                        "Andhra Pradesh",
                        "Arunachal Pradesh",
                        "Assam",
                        "Bihar",
                        "Chhattisgarh",
                        "Goa",
                        "Gujarat",
                        "Haryana",
                        "Himachal Pradesh",
                        "Jharkhand",
                        "Karnataka",
                        "Kerala",
                        "Madhya Pradesh",
                        "Maharashtra",
                        "Manipur",
                        "Meghalaya",
                        "Mizoram",
                        "Nagaland",
                        "Odisha",
                        "Punjab",
                        "Rajasthan",
                        "Sikkim",
                        "Tamil Nadu",
                        "Telangana",
                        "Tripura",
                        "Uttar Pradesh",
                        "Uttarakhand",
                        "West Bengal",
                        "Delhi",
                        "Jammu & Kashmir",
                        "Ladakh",
                      ].map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Pincode */}
                  <div>
                    <label style={labelStyle}>Pincode *</label>
                    <input
                      name="pincode"
                      value={address.pincode}
                      onChange={handleAddressChange}
                      placeholder="400001"
                      maxLength={6}
                      style={inputStyle}
                      onFocus={(e) =>
                        (e.currentTarget.style.borderColor = "#16a34a")
                      }
                      onBlur={(e) =>
                        (e.currentTarget.style.borderColor = "#e2e8f0")
                      }
                    />
                  </div>

                  {/* Country */}
                  <div>
                    <label style={labelStyle}>Country</label>
                    <input
                      name="country"
                      value="India"
                      disabled
                      style={{
                        ...inputStyle,
                        background: "#f0f0f0",
                        color: "#94a3b8",
                      }}
                    />
                  </div>
                </div>

                {/* Gift Option */}
                <div
                  style={{
                    marginTop: "20px",
                    padding: "16px",
                    borderRadius: "12px",
                    background: "#f8fafc",
                    border: "1px solid #e2e8f0",
                  }}
                >
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      cursor: "pointer",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={isGift}
                      onChange={(e) => setIsGift(e.target.checked)}
                      style={{
                        width: "16px",
                        height: "16px",
                        accentColor: "#16a34a",
                      }}
                    />
                    <span
                      style={{
                        fontFamily: "DM Sans",
                        fontSize: "14px",
                        fontWeight: "500",
                        color: "#0f172a",
                      }}
                    >
                      🎁 This is a gift
                    </span>
                  </label>
                  {isGift && (
                    <textarea
                      value={giftMessage}
                      onChange={(e) => setGiftMessage(e.target.value)}
                      placeholder="Write a gift message... (optional)"
                      rows={2}
                      maxLength={200}
                      style={{
                        ...inputStyle,
                        marginTop: "10px",
                        resize: "none",
                      }}
                      onFocus={(e) =>
                        (e.currentTarget.style.borderColor = "#16a34a")
                      }
                      onBlur={(e) =>
                        (e.currentTarget.style.borderColor = "#e2e8f0")
                      }
                    />
                  )}
                </div>

                <button
                  onClick={() => {
                    if (validateAddress()) setStep(2);
                  }}
                  style={{
                    marginTop: "20px",
                    width: "100%",
                    padding: "13px",
                    borderRadius: "12px",
                    background: "#16a34a",
                    color: "white",
                    fontFamily: "DM Sans",
                    fontSize: "15px",
                    fontWeight: "600",
                    border: "none",
                    cursor: "pointer",
                    transition: "background 0.2s",
                    boxShadow: "0 4px 12px rgba(22,163,74,0.25)",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#15803d")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "#16a34a")
                  }
                >
                  Continue to Payment →
                </button>
              </div>
            )}

            {/* Step 2 — Payment */}
            {step === 2 && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                {/* Address Summary */}
                <div
                  style={{
                    padding: "16px",
                    borderRadius: "12px",
                    background: "#f0fdf4",
                    border: "1px solid #bbf7d0",
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                >
                  <div>
                    <p
                      style={{
                        fontFamily: "DM Sans",
                        fontSize: "11px",
                        fontWeight: "700",
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        color: "#16a34a",
                        margin: "0 0 4px 0",
                      }}
                    >
                      Delivering to
                    </p>
                    <p
                      style={{
                        fontFamily: "DM Sans",
                        fontSize: "13px",
                        fontWeight: "600",
                        color: "#0f172a",
                        margin: "0 0 2px 0",
                      }}
                    >
                      {address.fullName}
                    </p>
                    <p
                      style={{
                        fontFamily: "DM Sans",
                        fontSize: "12px",
                        color: "#64748b",
                        margin: 0,
                      }}
                    >
                      {address.addressLine1}, {address.city}, {address.state} —{" "}
                      {address.pincode}
                    </p>
                  </div>
                  <button
                    onClick={() => setStep(1)}
                    style={{
                      fontFamily: "DM Sans",
                      fontSize: "12px",
                      fontWeight: "600",
                      color: "#16a34a",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Change
                  </button>
                </div>

                {/* Payment Methods */}
                <div
                  style={{
                    padding: "clamp(16px,3vw,24px)",
                    borderRadius: "16px",
                    background: "white",
                    border: "1px solid #e2e8f0",
                  }}
                >
                  <h2
                    style={{
                      fontFamily: "Cormorant Garamond, serif",
                      fontSize: "20px",
                      fontWeight: "600",
                      color: "#0f172a",
                      margin: "0 0 20px 0",
                    }}
                  >
                    💳 Payment Method
                  </h2>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px",
                    }}
                  >
                    {/* Online Payment */}
                    <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "14px",
                        padding: "16px",
                        borderRadius: "12px",
                        border:
                          paymentMethod === "Online"
                            ? "2px solid #16a34a"
                            : "1px solid #e2e8f0",
                        background:
                          paymentMethod === "Online" ? "#f0fdf4" : "white",
                        cursor: "pointer",
                        transition: "all 0.2s",
                      }}
                      onClick={() => setPaymentMethod("Online")}
                    >
                      <div
                        style={{
                          width: "20px",
                          height: "20px",
                          borderRadius: "50%",
                          border:
                            paymentMethod === "Online"
                              ? "6px solid #16a34a"
                              : "2px solid #e2e8f0",
                          transition: "all 0.2s",
                          flexShrink: 0,
                        }}
                      />
                      <div style={{ flex: 1 }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            flexWrap: "wrap",
                          }}
                        >
                          <p
                            style={{
                              fontFamily: "DM Sans",
                              fontSize: "14px",
                              fontWeight: "700",
                              color: "#0f172a",
                              margin: 0,
                            }}
                          >
                            Online Payment
                          </p>
                          <span
                            style={{
                              fontFamily: "DM Sans",
                              fontSize: "10px",
                              fontWeight: "700",
                              padding: "2px 8px",
                              borderRadius: "20px",
                              background: "#f0fdf4",
                              color: "#16a34a",
                              border: "1px solid #bbf7d0",
                            }}
                          >
                            RECOMMENDED
                          </span>
                        </div>
                        <p
                          style={{
                            fontFamily: "DM Sans",
                            fontSize: "12px",
                            color: "#64748b",
                            margin: "2px 0 0 0",
                          }}
                        >
                          Credit/Debit Card, UPI, Net Banking, Wallets
                        </p>
                      </div>
                      {/* Payment Icons */}
                      <div
                        style={{
                          display: "flex",
                          gap: "6px",
                          flexWrap: "wrap",
                          flexShrink: 0,
                        }}
                      >
                        {["UPI", "Visa", "GPay"].map((icon) => (
                          <span
                            key={icon}
                            style={{
                              fontFamily: "DM Sans",
                              fontSize: "9px",
                              fontWeight: "700",
                              padding: "3px 6px",
                              borderRadius: "4px",
                              background: "#f8fafc",
                              border: "1px solid #e2e8f0",
                              color: "#64748b",
                            }}
                          >
                            {icon}
                          </span>
                        ))}
                      </div>
                    </label>

                    {/* COD */}
                    <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "14px",
                        padding: "16px",
                        borderRadius: "12px",
                        border:
                          paymentMethod === "COD"
                            ? "2px solid #16a34a"
                            : "1px solid #e2e8f0",
                        background:
                          paymentMethod === "COD" ? "#f0fdf4" : "white",
                        cursor: "pointer",
                        transition: "all 0.2s",
                      }}
                      onClick={() => setPaymentMethod("COD")}
                    >
                      <div
                        style={{
                          width: "20px",
                          height: "20px",
                          borderRadius: "50%",
                          border:
                            paymentMethod === "COD"
                              ? "6px solid #16a34a"
                              : "2px solid #e2e8f0",
                          transition: "all 0.2s",
                          flexShrink: 0,
                        }}
                      />
                      <div>
                        <p
                          style={{
                            fontFamily: "DM Sans",
                            fontSize: "14px",
                            fontWeight: "700",
                            color: "#0f172a",
                            margin: 0,
                          }}
                        >
                          💵 Cash on Delivery
                        </p>
                        <p
                          style={{
                            fontFamily: "DM Sans",
                            fontSize: "12px",
                            color: "#64748b",
                            margin: "2px 0 0 0",
                          }}
                        >
                          Pay when your order arrives
                        </p>
                      </div>
                    </label>
                  </div>

                  {/* Security Badges */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                      marginTop: "16px",
                      padding: "12px",
                      background: "#f8fafc",
                      borderRadius: "10px",
                      flexWrap: "wrap",
                    }}
                  >
                    {[
                      "🔒 SSL Secured",
                      "✅ 100% Safe",
                      "🛡️ Razorpay Protected",
                    ].map((badge) => (
                      <span
                        key={badge}
                        style={{
                          fontFamily: "DM Sans",
                          fontSize: "11px",
                          color: "#64748b",
                          fontWeight: "500",
                        }}
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Place Order Button */}
                <button
                  onClick={handlePlaceOrder}
                  disabled={loading}
                  style={{
                    width: "100%",
                    padding: "15px",
                    borderRadius: "12px",
                    background: loading ? "#86efac" : "#16a34a",
                    color: "white",
                    fontFamily: "DM Sans",
                    fontSize: "16px",
                    fontWeight: "700",
                    border: "none",
                    cursor: loading ? "not-allowed" : "pointer",
                    transition: "all 0.2s",
                    boxShadow: loading
                      ? "none"
                      : "0 6px 20px rgba(22,163,74,0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                  }}
                  onMouseEnter={(e) => {
                    if (!loading) e.currentTarget.style.background = "#15803d";
                  }}
                  onMouseLeave={(e) => {
                    if (!loading) e.currentTarget.style.background = "#16a34a";
                  }}
                >
                  {loading ? (
                    <>
                      <div
                        style={{
                          width: "18px",
                          height: "18px",
                          borderRadius: "50%",
                          border: "2px solid rgba(255,255,255,0.4)",
                          borderTopColor: "white",
                          animation: "spin 0.6s linear infinite",
                        }}
                      />
                      {paymentStep === "creating"
                        ? "Creating Order..."
                        : paymentStep === "processing"
                          ? "Opening Payment..."
                          : paymentStep === "verifying"
                            ? "Verifying Payment..."
                            : "Processing..."}
                    </>
                  ) : (
                    <>
                      {paymentMethod === "Online" ? "🔒 Pay" : "📦 Place Order"}{" "}
                      — ₹{grandTotal.toLocaleString()}
                    </>
                  )}
                </button>

                <p
                  style={{
                    fontFamily: "DM Sans",
                    fontSize: "12px",
                    color: "#94a3b8",
                    textAlign: "center",
                    margin: 0,
                  }}
                >
                  By placing this order, you agree to our Terms of Service
                </p>
              </div>
            )}
          </div>

          {/* ── Right Column — Order Summary ── */}
          <div>
            <div
              style={{
                padding: "clamp(16px,3vw,24px)",
                borderRadius: "16px",
                background: "white",
                border: "1px solid #e2e8f0",
                position: "sticky",
                top: "80px",
              }}
            >
              <h3
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontSize: "20px",
                  fontWeight: "600",
                  color: "#0f172a",
                  margin: "0 0 16px 0",
                }}
              >
                Order Summary ({totalItems} items)
              </h3>

              {/* Items */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  marginBottom: "16px",
                  maxHeight: "280px",
                  overflowY: "auto",
                  paddingRight: "4px",
                }}
              >
                {items.map((item) => (
                  <div
                    key={item._id}
                    style={{
                      display: "flex",
                      gap: "10px",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ position: "relative", flexShrink: 0 }}>
                      <img
                        src={item.product?.images?.[0]?.url || item.image}
                        alt={item.product?.name || item.name}
                        style={{
                          width: "52px",
                          height: "52px",
                          borderRadius: "8px",
                          objectFit: "cover",
                          border: "1px solid #e2e8f0",
                        }}
                      />
                      <span
                        style={{
                          position: "absolute",
                          top: "-6px",
                          right: "-6px",
                          width: "18px",
                          height: "18px",
                          background: "#16a34a",
                          color: "white",
                          borderRadius: "50%",
                          fontSize: "10px",
                          fontWeight: "700",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {item.quantity}
                      </span>
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p
                        style={{
                          fontFamily: "DM Sans",
                          fontSize: "12px",
                          fontWeight: "600",
                          color: "#0f172a",
                          margin: 0,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {item.product?.name || item.name}
                      </p>
                      <p
                        style={{
                          fontFamily: "DM Sans",
                          fontSize: "11px",
                          color: "#94a3b8",
                          margin: 0,
                        }}
                      >
                        ₹{item.price?.toLocaleString()} × {item.quantity}
                      </p>
                    </div>
                    <p
                      style={{
                        fontFamily: "DM Sans",
                        fontSize: "13px",
                        fontWeight: "700",
                        color: "#0f172a",
                        margin: 0,
                        flexShrink: 0,
                      }}
                    >
                      ₹{(item.price * item.quantity)?.toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>

              <div
                style={{
                  height: "1px",
                  background: "#e2e8f0",
                  margin: "0 0 14px 0",
                }}
              />

              {/* Price Breakdown */}
              {[
                {
                  label: "Subtotal",
                  value: `₹${totalPrice?.toLocaleString()}`,
                },
                {
                  label: "Shipping",
                  value: shippingPrice === 0 ? "FREE 🎉" : `₹${shippingPrice}`,
                },
                { label: "Tax (5%)", value: `₹${taxPrice?.toLocaleString()}` },
              ].map((row) => (
                <div
                  key={row.label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "8px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "DM Sans",
                      fontSize: "13px",
                      color: "#64748b",
                    }}
                  >
                    {row.label}
                  </span>
                  <span
                    style={{
                      fontFamily: "DM Sans",
                      fontSize: "13px",
                      color:
                        shippingPrice === 0 && row.label === "Shipping"
                          ? "#16a34a"
                          : "#0f172a",
                      fontWeight:
                        shippingPrice === 0 && row.label === "Shipping"
                          ? "700"
                          : "400",
                    }}
                  >
                    {row.value}
                  </span>
                </div>
              ))}

              <div
                style={{
                  height: "1px",
                  background: "#e2e8f0",
                  margin: "10px 0",
                }}
              />

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    fontFamily: "DM Sans",
                    fontSize: "15px",
                    fontWeight: "700",
                    color: "#0f172a",
                  }}
                >
                  Total
                </span>
                <span
                  style={{
                    fontFamily: "Cormorant Garamond, serif",
                    fontSize: "26px",
                    fontWeight: "700",
                    color: "#16a34a",
                  }}
                >
                  ₹{grandTotal?.toLocaleString()}
                </span>
              </div>

              {shippingPrice === 0 && (
                <div
                  style={{
                    marginTop: "10px",
                    padding: "8px 12px",
                    borderRadius: "8px",
                    background: "#f0fdf4",
                    border: "1px solid #bbf7d0",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "DM Sans",
                      fontSize: "12px",
                      fontWeight: "600",
                      color: "#16a34a",
                      margin: 0,
                    }}
                  >
                    🎉 You qualify for FREE shipping!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .checkout-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
        }
        @media (min-width: 768px) {
          .checkout-grid { grid-template-columns: 1fr 380px; }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default CheckoutPage;
