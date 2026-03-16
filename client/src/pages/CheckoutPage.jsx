// import { useState } from "react";
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
//       placeOrder({
//         shippingAddress: addr,
//         paymentMethod: method,
//       }),
//     );
//     if (r.meta.requestStatus === "fulfilled") {
//       toast.success("Order placed! JazakAllah Khair 🌙");
//       navigate("/dashboard?tab=orders");
//     } else {
//       toast.error(r.payload || "Failed to place order");
//     }
//   };

//   const Field = ({ label, name, placeholder, type = "text" }) => (
//     <div>
//       <label
//         className="block font-dm text-xs mb-1.5"
//         style={{ color: "#64748b" }}
//       >
//         {label}
//       </label>
//       <input
//         type={type}
//         name={name}
//         value={addr[name]}
//         onChange={handleAddrChange}
//         placeholder={placeholder}
//         className="nb-input text-sm"
//       />
//     </div>
//   );

//   return (
//     <div style={{ background: "#f8fffe", minHeight: "100vh" }}>
//       <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
//         {/* Header */}
//         <div className="mb-8">
//           <p
//             className="font-dm text-xs font-semibold tracking-widest uppercase mb-1"
//             style={{ color: "#16a34a" }}
//           >
//             Checkout
//           </p>
//           <h1
//             className="font-cormorant text-3xl font-semibold"
//             style={{ color: "#e2e8f0" }}
//           >
//             Complete Your Order
//           </h1>
//         </div>

//         {/* ── Stepper ── */}
//         <div className="flex items-center gap-2 mb-8">
//           {steps.map((s, i) => (
//             <div key={s} className="flex items-center gap-2">
//               <div className="flex items-center gap-2">
//                 <div
//                   className="w-7 h-7 rounded-full flex items-center justify-center font-dm text-xs font-bold transition-all"
//                   style={{
//                     background: i <= step ? "#16a34a" : "#1e2d42",
//                     color: i <= step ? "white" : "#334155",
//                   }}
//                 >
//                   {i < step ? "✓" : i + 1}
//                 </div>
//                 <span
//                   className="font-dm text-xs font-medium hidden sm:block"
//                   style={{ color: i === step ? "#e2e8f0" : "#334155" }}
//                 >
//                   {s}
//                 </span>
//               </div>
//               {i < steps.length - 1 && (
//                 <div
//                   className="flex-1 h-px w-8 sm:w-16"
//                   style={{ background: i < step ? "#16a34a" : "#1e2d42" }}
//                 />
//               )}
//             </div>
//           ))}
//         </div>

//         <div className="grid lg:grid-cols-3 gap-6">
//           {/* ── Left Panel ── */}
//           <div className="lg:col-span-2">
//             {/* Step 0 — Address */}
//             {step === 0 && (
//               <div
//                 className="p-6 rounded-2xl"
//                 style={{
//                   background: "#162032",
//                   border: "1px solid rgba(255,255,255,0.05)",
//                 }}
//               >
//                 <p
//                   className="font-dm font-semibold text-sm mb-5"
//                   style={{ color: "#e2e8f0" }}
//                 >
//                   📍 Shipping Address
//                 </p>
//                 <div className="grid sm:grid-cols-2 gap-4">
//                   <Field
//                     label="Full Name *"
//                     name="fullName"
//                     placeholder="Abuzar Syed"
//                   />
//                   <Field
//                     label="Phone Number *"
//                     name="phone"
//                     placeholder="9876543210"
//                     type="tel"
//                   />
//                   <div className="sm:col-span-2">
//                     <Field
//                       label="Address Line 1 *"
//                       name="addressLine1"
//                       placeholder="House no, Street name"
//                     />
//                   </div>
//                   <div className="sm:col-span-2">
//                     <Field
//                       label="Address Line 2"
//                       name="addressLine2"
//                       placeholder="Landmark, Area (optional)"
//                     />
//                   </div>
//                   <Field label="City *" name="city" placeholder="Nellore" />
//                   <Field
//                     label="State *"
//                     name="state"
//                     placeholder="Andhra Pradesh"
//                   />
//                   <Field
//                     label="Pincode *"
//                     name="pincode"
//                     placeholder="524001"
//                     type="tel"
//                   />
//                   <Field label="Country" name="country" placeholder="India" />
//                 </div>
//                 <button
//                   onClick={() => {
//                     if (validateAddr()) setStep(1);
//                   }}
//                   className="mt-6 w-full py-3.5 rounded-xl font-dm font-semibold text-sm text-white transition-opacity"
//                   style={{ background: "#16a34a" }}
//                 >
//                   Continue to Payment →
//                 </button>
//               </div>
//             )}

//             {/* Step 1 — Payment */}
//             {step === 1 && (
//               <div
//                 className="p-6 rounded-2xl"
//                 style={{
//                   background: "#162032",
//                   border: "1px solid rgba(255,255,255,0.05)",
//                 }}
//               >
//                 <p
//                   className="font-dm font-semibold text-sm mb-5"
//                   style={{ color: "#e2e8f0" }}
//                 >
//                   💳 Payment Method
//                 </p>

//                 <div className="space-y-3 mb-6">
//                   {[
//                     {
//                       id: "COD",
//                       icon: "💵",
//                       title: "Cash on Delivery",
//                       desc: "Pay when your order arrives",
//                     },
//                     {
//                       id: "Razorpay",
//                       icon: "💳",
//                       title: "Online Payment",
//                       desc: "UPI, Cards, Net Banking via Razorpay",
//                     },
//                   ].map((m) => (
//                     <button
//                       key={m.id}
//                       onClick={() => setMethod(m.id)}
//                       className="w-full flex items-center gap-4 p-4 rounded-xl transition-all text-left"
//                       style={{
//                         background:
//                           method === m.id
//                             ? "rgba(22,163,74,0.08)"
//                             : "rgba(255,255,255,0.02)",
//                         border:
//                           method === m.id
//                             ? "1px solid rgba(22,163,74,0.35)"
//                             : "1px solid rgba(255,255,255,0.06)",
//                       }}
//                     >
//                       <div
//                         className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
//                         style={{ background: "rgba(255,255,255,0.04)" }}
//                       >
//                         {m.icon}
//                       </div>
//                       <div className="flex-1">
//                         <p
//                           className="font-dm text-sm font-semibold"
//                           style={{ color: "#e2e8f0" }}
//                         >
//                           {m.title}
//                         </p>
//                         <p
//                           className="font-dm text-xs"
//                           style={{ color: "#475569" }}
//                         >
//                           {m.desc}
//                         </p>
//                       </div>
//                       <div
//                         className="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0"
//                         style={{
//                           borderColor: method === m.id ? "#16a34a" : "#334155",
//                         }}
//                       >
//                         {method === m.id && (
//                           <div
//                             className="w-2.5 h-2.5 rounded-full"
//                             style={{ background: "#16a34a" }}
//                           />
//                         )}
//                       </div>
//                     </button>
//                   ))}
//                 </div>

//                 <div className="flex gap-3">
//                   <button
//                     onClick={() => setStep(0)}
//                     className="flex-1 py-3.5 rounded-xl font-dm font-medium text-sm transition-all"
//                     style={{
//                       border: "1px solid rgba(255,255,255,0.08)",
//                       color: "#64748b",
//                     }}
//                   >
//                     ← Back
//                   </button>
//                   <button
//                     onClick={() => setStep(2)}
//                     className="flex-1 py-3.5 rounded-xl font-dm font-semibold text-sm text-white transition-opacity"
//                     style={{ background: "#16a34a" }}
//                   >
//                     Review Order →
//                   </button>
//                 </div>
//               </div>
//             )}

//             {/* Step 2 — Review */}
//             {step === 2 && (
//               <div
//                 className="p-6 rounded-2xl"
//                 style={{
//                   background: "#162032",
//                   border: "1px solid rgba(255,255,255,0.05)",
//                 }}
//               >
//                 <p
//                   className="font-dm font-semibold text-sm mb-5"
//                   style={{ color: "#e2e8f0" }}
//                 >
//                   📋 Review Order
//                 </p>

//                 {/* Address Summary */}
//                 <div
//                   className="p-4 rounded-xl mb-4"
//                   style={{ background: "rgba(255,255,255,0.03)" }}
//                 >
//                   <p
//                     className="font-dm text-xs font-semibold mb-2"
//                     style={{ color: "#64748b" }}
//                   >
//                     Delivering to
//                   </p>
//                   <p
//                     className="font-dm text-sm font-semibold"
//                     style={{ color: "#e2e8f0" }}
//                   >
//                     {addr.fullName}
//                   </p>
//                   <p className="font-dm text-xs" style={{ color: "#64748b" }}>
//                     {addr.addressLine1},{" "}
//                     {addr.addressLine2 && `${addr.addressLine2}, `}
//                     {addr.city}, {addr.state} — {addr.pincode}
//                   </p>
//                   <p
//                     className="font-dm text-xs mt-0.5"
//                     style={{ color: "#64748b" }}
//                   >
//                     📱 {addr.phone}
//                   </p>
//                 </div>

//                 {/* Payment Summary */}
//                 <div
//                   className="p-4 rounded-xl mb-4"
//                   style={{ background: "rgba(255,255,255,0.03)" }}
//                 >
//                   <p
//                     className="font-dm text-xs font-semibold mb-1"
//                     style={{ color: "#64748b" }}
//                   >
//                     Payment
//                   </p>
//                   <p className="font-dm text-sm" style={{ color: "#e2e8f0" }}>
//                     {method === "COD"
//                       ? "💵 Cash on Delivery"
//                       : "💳 Online Payment (Razorpay)"}
//                   </p>
//                 </div>

//                 {/* Items Summary */}
//                 <div className="space-y-2 mb-5">
//                   {items.map((item) => (
//                     <div key={item._id} className="flex items-center gap-3">
//                       <img
//                         src={item.product?.images?.[0]?.url}
//                         alt={item.product?.name}
//                         className="w-12 h-12 rounded-lg object-cover"
//                         style={{ background: "#0f1923" }}
//                       />
//                       <div className="flex-1 min-w-0">
//                         <p
//                           className="font-dm text-xs font-medium truncate"
//                           style={{ color: "#e2e8f0" }}
//                         >
//                           {item.product?.name}
//                         </p>
//                         <p
//                           className="font-dm text-[10px]"
//                           style={{ color: "#475569" }}
//                         >
//                           Qty: {item.quantity}
//                         </p>
//                       </div>
//                       <span
//                         className="font-dm text-sm font-medium"
//                         style={{ color: "#4ade80" }}
//                       >
//                         ₹{(item.price * item.quantity).toLocaleString()}
//                       </span>
//                     </div>
//                   ))}
//                 </div>

//                 <div className="flex gap-3">
//                   <button
//                     onClick={() => setStep(1)}
//                     className="flex-1 py-3.5 rounded-xl font-dm font-medium text-sm transition-all"
//                     style={{
//                       border: "1px solid rgba(255,255,255,0.08)",
//                       color: "#64748b",
//                     }}
//                   >
//                     ← Back
//                   </button>
//                   <button
//                     onClick={handlePlaceOrder}
//                     disabled={loading}
//                     className="flex-1 py-3.5 rounded-xl font-dm font-semibold text-sm text-white transition-opacity disabled:opacity-60"
//                     style={{
//                       background: "linear-gradient(135deg,#16a34a,#15803d)",
//                     }}
//                   >
//                     {loading ? "Placing..." : "Place Order 🌙"}
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* ── Order Summary Sidebar ── */}
//           <div
//             className="p-5 rounded-2xl h-fit"
//             style={{
//               background: "#162032",
//               border: "1px solid rgba(255,255,255,0.05)",
//             }}
//           >
//             <p
//               className="font-dm text-xs font-semibold uppercase tracking-wider mb-4"
//               style={{ color: "#475569" }}
//             >
//               Order Summary
//             </p>

//             {/* Items */}
//             <div className="space-y-2.5 mb-4">
//               {items.map((item) => (
//                 <div key={item._id} className="flex items-center gap-2.5">
//                   <img
//                     src={item.product?.images?.[0]?.url}
//                     alt=""
//                     className="w-10 h-10 rounded-lg object-cover shrink-0"
//                     style={{ background: "#0f1923" }}
//                   />
//                   <div className="flex-1 min-w-0">
//                     <p
//                       className="font-dm text-[11px] font-medium truncate"
//                       style={{ color: "#e2e8f0" }}
//                     >
//                       {item.product?.name}
//                     </p>
//                     <p
//                       className="font-dm text-[10px]"
//                       style={{ color: "#334155" }}
//                     >
//                       {item.quantity} × ₹{item.price?.toLocaleString()}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <div
//               className="pt-4 space-y-2.5 mb-4"
//               style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
//             >
//               {[
//                 { l: "Subtotal", v: `₹${totalPrice?.toLocaleString()}` },
//                 { l: "Shipping", v: shipping === 0 ? "FREE" : `₹${shipping}` },
//                 { l: "Tax (5%)", v: `₹${tax}` },
//               ].map((r) => (
//                 <div key={r.l} className="flex items-center justify-between">
//                   <span
//                     className="font-dm text-xs"
//                     style={{ color: "#475569" }}
//                   >
//                     {r.l}
//                   </span>
//                   <span
//                     className="font-dm text-xs font-medium"
//                     style={{ color: "#94a3b8" }}
//                   >
//                     {r.v}
//                   </span>
//                 </div>
//               ))}
//             </div>

//             <div
//               className="flex items-center justify-between pt-4"
//               style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
//             >
//               <span
//                 className="font-dm font-semibold text-sm"
//                 style={{ color: "#e2e8f0" }}
//               >
//                 Total
//               </span>
//               <span
//                 className="font-cormorant font-semibold text-2xl"
//                 style={{ color: "#4ade80" }}
//               >
//                 ₹{grandTotal.toLocaleString()}
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CheckoutPage;
import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { placeOrder } from "../redux/slices/orderSlice";
import toast from "react-hot-toast";

const steps = ["Address", "Payment", "Review"];

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, totalPrice, finalPrice } = useSelector((s) => s.cart);
  const { user } = useSelector((s) => s.auth);
  const { loading } = useSelector((s) => s.orders);

  const [step, setStep] = useState(0);
  const [method, setMethod] = useState("COD");
  const [addr, setAddr] = useState({
    fullName: user?.name || "",
    phone: user?.phone || "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
  });

  const shipping = (finalPrice || totalPrice) >= 999 ? 0 : 99;
  const tax = Math.round(totalPrice * 0.05);
  const grandTotal = Math.max(0, (finalPrice || totalPrice) + shipping + tax);

  const handleAddrChange = (e) =>
    setAddr((p) => ({ ...p, [e.target.name]: e.target.value }));

  const validateAddr = () => {
    const required = [
      "fullName",
      "phone",
      "addressLine1",
      "city",
      "state",
      "pincode",
    ];
    for (const f of required) {
      if (!addr[f].trim()) {
        toast.error(
          `Please enter ${f.replace(/([A-Z])/g, " $1").toLowerCase()}`,
        );
        return false;
      }
    }
    if (!/^[0-9]{10}$/.test(addr.phone)) {
      toast.error("Enter valid 10 digit phone");
      return false;
    }
    if (!/^[0-9]{6}$/.test(addr.pincode)) {
      toast.error("Enter valid 6 digit pincode");
      return false;
    }
    return true;
  };

  const handlePlaceOrder = async () => {
    const r = await dispatch(
      placeOrder({ shippingAddress: addr, paymentMethod: method }),
    );
    if (r.meta.requestStatus === "fulfilled") {
      toast.success("Order placed! JazakAllah Khair 🌙");
      navigate("/dashboard?tab=orders");
    } else toast.error(r.payload || "Failed to place order");
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
    transition: "border-color 0.2s",
    boxSizing: "border-box",
  };

  const Field = ({ label, name, placeholder, type = "text" }) => (
    <div>
      <label
        style={{
          display: "block",
          fontFamily: "DM Sans",
          fontSize: "12px",
          fontWeight: "500",
          color: "#64748b",
          marginBottom: "6px",
        }}
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={addr[name]}
        onChange={handleAddrChange}
        placeholder={placeholder}
        style={inputStyle}
        onFocus={(e) => (e.currentTarget.style.borderColor = "#16a34a")}
        onBlur={(e) => (e.currentTarget.style.borderColor = "#e2e8f0")}
      />
    </div>
  );

  const cardStyle = {
    padding: "clamp(16px,3vw,24px)",
    borderRadius: "16px",
    background: "#ffffff",
    border: "1px solid #e2e8f0",
  };

  return (
    <>
      <div style={{ background: "#ffffff", minHeight: "100vh", width: "100%" }}>
        <div
          style={{
            maxWidth: "1024px",
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
              Checkout
            </p>
            <h1
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "clamp(24px,4vw,36px)",
                fontWeight: "600",
                color: "#0f172a",
                margin: 0,
              }}
            >
              Complete Your Order
            </h1>
          </div>

          {/* Stepper */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "32px",
              flexWrap: "wrap",
            }}
          >
            {steps.map((s, i) => (
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
                      fontSize: "12px",
                      fontWeight: "700",
                      background: i <= step ? "#16a34a" : "#f0f0f0",
                      color: i <= step ? "white" : "#94a3b8",
                      transition: "all 0.3s",
                    }}
                  >
                    {i < step ? "✓" : i + 1}
                  </div>
                  <span
                    style={{
                      fontFamily: "DM Sans",
                      fontSize: "13px",
                      fontWeight: "500",
                      color: i === step ? "#0f172a" : "#94a3b8",
                    }}
                  >
                    {s}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div
                    style={{
                      width: "clamp(24px,4vw,64px)",
                      height: "1px",
                      background: i < step ? "#16a34a" : "#e2e8f0",
                      transition: "background 0.3s",
                    }}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="checkout-grid">
            {/* Left Panel */}
            <div>
              {/* Step 0 — Address */}
              {step === 0 && (
                <div style={cardStyle}>
                  <p
                    style={{
                      fontFamily: "DM Sans",
                      fontSize: "15px",
                      fontWeight: "700",
                      color: "#0f172a",
                      margin: "0 0 20px 0",
                    }}
                  >
                    📍 Shipping Address
                  </p>
                  <div className="addr-grid">
                    <Field
                      label="Full Name *"
                      name="fullName"
                      placeholder="Abuzar Syed"
                    />
                    <Field
                      label="Phone Number *"
                      name="phone"
                      placeholder="9876543210"
                      type="tel"
                    />
                    <div className="col-span-2">
                      <Field
                        label="Address Line 1 *"
                        name="addressLine1"
                        placeholder="House no, Street name"
                      />
                    </div>
                    <div className="col-span-2">
                      <Field
                        label="Address Line 2"
                        name="addressLine2"
                        placeholder="Landmark (optional)"
                      />
                    </div>
                    <Field label="City *" name="city" placeholder="Nellore" />
                    <Field
                      label="State *"
                      name="state"
                      placeholder="Andhra Pradesh"
                    />
                    <Field
                      label="Pincode *"
                      name="pincode"
                      placeholder="524001"
                      type="tel"
                    />
                    <Field label="Country" name="country" placeholder="India" />
                  </div>
                  <button
                    onClick={() => {
                      if (validateAddr()) setStep(1);
                    }}
                    style={{
                      marginTop: "20px",
                      width: "100%",
                      padding: "14px",
                      borderRadius: "12px",
                      background: "#16a34a",
                      color: "white",
                      fontFamily: "DM Sans",
                      fontSize: "14px",
                      fontWeight: "600",
                      border: "none",
                      cursor: "pointer",
                      boxShadow: "0 4px 12px rgba(22,163,74,0.25)",
                      transition: "opacity 0.2s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.opacity = "0.9")
                    }
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                  >
                    Continue to Payment →
                  </button>
                </div>
              )}

              {/* Step 1 — Payment */}
              {step === 1 && (
                <div style={cardStyle}>
                  <p
                    style={{
                      fontFamily: "DM Sans",
                      fontSize: "15px",
                      fontWeight: "700",
                      color: "#0f172a",
                      margin: "0 0 20px 0",
                    }}
                  >
                    💳 Payment Method
                  </p>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                      marginBottom: "20px",
                    }}
                  >
                    {[
                      {
                        id: "COD",
                        icon: "💵",
                        title: "Cash on Delivery",
                        desc: "Pay when your order arrives",
                      },
                      {
                        id: "Razorpay",
                        icon: "💳",
                        title: "Online Payment",
                        desc: "UPI, Cards, Net Banking via Razorpay",
                      },
                    ].map((m) => (
                      <button
                        key={m.id}
                        onClick={() => setMethod(m.id)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "14px",
                          padding: "16px",
                          borderRadius: "12px",
                          cursor: "pointer",
                          textAlign: "left",
                          transition: "all 0.2s",
                          background: method === m.id ? "#f0fdf4" : "#f8fafc",
                          border:
                            method === m.id
                              ? "1px solid #16a34a"
                              : "1px solid #e2e8f0",
                        }}
                      >
                        <div
                          style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "10px",
                            background: "#ffffff",
                            border: "1px solid #e2e8f0",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "20px",
                            flexShrink: 0,
                          }}
                        >
                          {m.icon}
                        </div>
                        <div style={{ flex: 1 }}>
                          <p
                            style={{
                              fontFamily: "DM Sans",
                              fontSize: "14px",
                              fontWeight: "600",
                              color: "#0f172a",
                              margin: 0,
                            }}
                          >
                            {m.title}
                          </p>
                          <p
                            style={{
                              fontFamily: "DM Sans",
                              fontSize: "12px",
                              color: "#64748b",
                              margin: "2px 0 0 0",
                            }}
                          >
                            {m.desc}
                          </p>
                        </div>
                        <div
                          style={{
                            width: "20px",
                            height: "20px",
                            borderRadius: "50%",
                            border: `2px solid ${method === m.id ? "#16a34a" : "#e2e8f0"}`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                        >
                          {method === m.id && (
                            <div
                              style={{
                                width: "10px",
                                height: "10px",
                                borderRadius: "50%",
                                background: "#16a34a",
                              }}
                            />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <button
                      onClick={() => setStep(0)}
                      style={{
                        flex: 1,
                        padding: "13px",
                        borderRadius: "12px",
                        background: "transparent",
                        border: "1px solid #e2e8f0",
                        fontFamily: "DM Sans",
                        fontSize: "14px",
                        color: "#64748b",
                        cursor: "pointer",
                        transition: "all 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "#bbf7d0";
                        e.currentTarget.style.color = "#0f172a";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "#e2e8f0";
                        e.currentTarget.style.color = "#64748b";
                      }}
                    >
                      ← Back
                    </button>
                    <button
                      onClick={() => setStep(2)}
                      style={{
                        flex: 1,
                        padding: "13px",
                        borderRadius: "12px",
                        background: "#16a34a",
                        color: "white",
                        fontFamily: "DM Sans",
                        fontSize: "14px",
                        fontWeight: "600",
                        border: "none",
                        cursor: "pointer",
                        transition: "opacity 0.2s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.opacity = "0.9")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.opacity = "1")
                      }
                    >
                      Review Order →
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2 — Review */}
              {step === 2 && (
                <div style={cardStyle}>
                  <p
                    style={{
                      fontFamily: "DM Sans",
                      fontSize: "15px",
                      fontWeight: "700",
                      color: "#0f172a",
                      margin: "0 0 20px 0",
                    }}
                  >
                    📋 Review Order
                  </p>

                  {/* Address */}
                  <div
                    style={{
                      padding: "14px",
                      borderRadius: "10px",
                      background: "#f8fafc",
                      border: "1px solid #e2e8f0",
                      marginBottom: "12px",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "DM Sans",
                        fontSize: "11px",
                        fontWeight: "700",
                        textTransform: "uppercase",
                        color: "#94a3b8",
                        margin: "0 0 8px 0",
                      }}
                    >
                      Delivering to
                    </p>
                    <p
                      style={{
                        fontFamily: "DM Sans",
                        fontSize: "14px",
                        fontWeight: "600",
                        color: "#0f172a",
                        margin: 0,
                      }}
                    >
                      {addr.fullName}
                    </p>
                    <p
                      style={{
                        fontFamily: "DM Sans",
                        fontSize: "13px",
                        color: "#64748b",
                        margin: "2px 0 0 0",
                      }}
                    >
                      {addr.addressLine1}
                      {addr.addressLine2 && `, ${addr.addressLine2}`},{" "}
                      {addr.city}, {addr.state} — {addr.pincode}
                    </p>
                    <p
                      style={{
                        fontFamily: "DM Sans",
                        fontSize: "12px",
                        color: "#94a3b8",
                        margin: "2px 0 0 0",
                      }}
                    >
                      📱 {addr.phone}
                    </p>
                  </div>

                  {/* Payment */}
                  <div
                    style={{
                      padding: "14px",
                      borderRadius: "10px",
                      background: "#f8fafc",
                      border: "1px solid #e2e8f0",
                      marginBottom: "16px",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "DM Sans",
                        fontSize: "11px",
                        fontWeight: "700",
                        textTransform: "uppercase",
                        color: "#94a3b8",
                        margin: "0 0 6px 0",
                      }}
                    >
                      Payment
                    </p>
                    <p
                      style={{
                        fontFamily: "DM Sans",
                        fontSize: "14px",
                        color: "#0f172a",
                        margin: 0,
                      }}
                    >
                      {method === "COD"
                        ? "💵 Cash on Delivery"
                        : "💳 Online Payment (Razorpay)"}
                    </p>
                  </div>

                  {/* Items */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                      marginBottom: "20px",
                    }}
                  >
                    {items.map((item) => (
                      <div
                        key={item._id}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <img
                          src={item.product?.images?.[0]?.url}
                          alt={item.product?.name}
                          style={{
                            width: "48px",
                            height: "48px",
                            borderRadius: "8px",
                            objectFit: "cover",
                            background: "#f8fafc",
                            flexShrink: 0,
                          }}
                        />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p
                            style={{
                              fontFamily: "DM Sans",
                              fontSize: "13px",
                              fontWeight: "600",
                              color: "#0f172a",
                              margin: 0,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {item.product?.name}
                          </p>
                          <p
                            style={{
                              fontFamily: "DM Sans",
                              fontSize: "11px",
                              color: "#94a3b8",
                              margin: "2px 0 0 0",
                            }}
                          >
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <span
                          style={{
                            fontFamily: "DM Sans",
                            fontSize: "14px",
                            fontWeight: "600",
                            color: "#16a34a",
                            flexShrink: 0,
                          }}
                        >
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: "flex", gap: "10px" }}>
                    <button
                      onClick={() => setStep(1)}
                      style={{
                        flex: 1,
                        padding: "13px",
                        borderRadius: "12px",
                        background: "transparent",
                        border: "1px solid #e2e8f0",
                        fontFamily: "DM Sans",
                        fontSize: "14px",
                        color: "#64748b",
                        cursor: "pointer",
                        transition: "all 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "#bbf7d0";
                        e.currentTarget.style.color = "#0f172a";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "#e2e8f0";
                        e.currentTarget.style.color = "#64748b";
                      }}
                    >
                      ← Back
                    </button>
                    <button
                      onClick={handlePlaceOrder}
                      disabled={loading}
                      style={{
                        flex: 1,
                        padding: "13px",
                        borderRadius: "12px",
                        background: "linear-gradient(135deg,#16a34a,#15803d)",
                        color: "white",
                        fontFamily: "DM Sans",
                        fontSize: "14px",
                        fontWeight: "600",
                        border: "none",
                        cursor: loading ? "not-allowed" : "pointer",
                        opacity: loading ? 0.7 : 1,
                        transition: "opacity 0.2s",
                        boxShadow: "0 4px 12px rgba(22,163,74,0.25)",
                      }}
                    >
                      {loading ? "Placing..." : "Place Order 🌙"}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary Sidebar */}
            <div style={{ ...cardStyle, height: "fit-content" }}>
              <p
                style={{
                  fontFamily: "DM Sans",
                  fontSize: "11px",
                  fontWeight: "700",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "#94a3b8",
                  margin: "0 0 16px 0",
                }}
              >
                Order Summary
              </p>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  marginBottom: "16px",
                }}
              >
                {items.map((item) => (
                  <div
                    key={item._id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <img
                      src={item.product?.images?.[0]?.url}
                      alt=""
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "8px",
                        objectFit: "cover",
                        background: "#f8fafc",
                        flexShrink: 0,
                      }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p
                        style={{
                          fontFamily: "DM Sans",
                          fontSize: "12px",
                          fontWeight: "500",
                          color: "#0f172a",
                          margin: 0,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {item.product?.name}
                      </p>
                      <p
                        style={{
                          fontFamily: "DM Sans",
                          fontSize: "11px",
                          color: "#94a3b8",
                          margin: "2px 0 0 0",
                        }}
                      >
                        {item.quantity} × ₹{item.price?.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div
                style={{
                  borderTop: "1px solid #e2e8f0",
                  paddingTop: "14px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  marginBottom: "14px",
                }}
              >
                {[
                  { l: "Subtotal", v: `₹${totalPrice?.toLocaleString()}` },
                  {
                    l: "Shipping",
                    v: shipping === 0 ? "FREE" : `₹${shipping}`,
                  },
                  { l: "Tax (5%)", v: `₹${tax}` },
                ].map((r) => (
                  <div
                    key={r.l}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "DM Sans",
                        fontSize: "13px",
                        color: "#64748b",
                      }}
                    >
                      {r.l}
                    </span>
                    <span
                      style={{
                        fontFamily: "DM Sans",
                        fontSize: "13px",
                        fontWeight: "500",
                        color: "#0f172a",
                      }}
                    >
                      {r.v}
                    </span>
                  </div>
                ))}
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderTop: "1px solid #e2e8f0",
                  paddingTop: "14px",
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
                    fontWeight: "700",
                    fontSize: "28px",
                    color: "#16a34a",
                  }}
                >
                  ₹{grandTotal.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .checkout-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }
        @media (min-width: 1024px) {
          .checkout-grid {
            grid-template-columns: 1fr 320px;
            gap: 24px;
          }
        }
        .addr-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 14px;
        }
        @media (min-width: 540px) {
          .addr-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .col-span-2 { grid-column: 1 / -1; }
        }
      `}</style>
    </>
  );
};

export default CheckoutPage;
