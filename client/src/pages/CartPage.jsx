// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   fetchCart,
//   updateCartItem,
//   removeFromCart,
//   clearCart,
// } from "../redux/slices/cartSlice";
// import toast from "react-hot-toast";
// import API from "../services/api";

// const CartPage = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { items, totalPrice, discountAmount, finalPrice, loading } =
//     useSelector((s) => s.cart);

//   const [coupon, setCoupon] = useState("");
//   const [applying, setApplying] = useState(false);
//   const [couponData, setCouponData] = useState(null);

//   useEffect(() => {
//     dispatch(fetchCart());
//   }, []);

//   const handleQty = async (productId, qty) => {
//     if (qty < 1) return;
//     await dispatch(updateCartItem({ productId, quantity: qty }));
//   };

//   const handleRemove = async (productId) => {
//     await dispatch(removeFromCart(productId));
//     toast.success("Item removed from cart");
//   };

//   const handleClear = async () => {
//     await dispatch(clearCart());
//     toast.success("Cart cleared");
//   };

//   const handleApplyCoupon = async () => {
//     if (!coupon.trim()) return;
//     setApplying(true);
//     try {
//       const { data } = await API.post("/coupons/validate", {
//         code: coupon.trim(),
//         orderAmount: totalPrice,
//       });
//       setCouponData(data.data);
//       toast.success(data.message);
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Invalid coupon");
//     } finally {
//       setApplying(false);
//     }
//   };

//   const shipping = finalPrice >= 999 ? 0 : 99;
//   const tax = Math.round(totalPrice * 0.05);
//   const discount = couponData?.discountAmount || discountAmount || 0;
//   const grandTotal = Math.max(
//     0,
//     (finalPrice || totalPrice) + shipping + tax - discount,
//   );

//   if (loading)
//     return (
//       <div
//         style={{ background: "#f8fffe", minHeight: "100vh" }}
//         className="px-4 py-10"
//       >
//         <div className="max-w-6xl mx-auto">
//           <div className="h-8 shimmer rounded w-40 mb-8" />
//           <div className="grid lg:grid-cols-3 gap-6">
//             <div className="lg:col-span-2 space-y-3">
//               {Array(3)
//                 .fill(0)
//                 .map((_, i) => (
//                   <div key={i} className="h-28 shimmer rounded-2xl" />
//                 ))}
//             </div>
//             <div className="h-80 shimmer rounded-2xl" />
//           </div>
//         </div>
//       </div>
//     );

//   if (items.length === 0)
//     return (
//       <div
//         style={{ background: "#0f1923", minHeight: "100vh" }}
//         className="flex items-center justify-center px-4"
//       >
//         <div className="text-center">
//           <div className="text-8xl mb-6">🛒</div>
//           <h2
//             className="font-cormorant text-3xl font-semibold mb-3"
//             style={{ color: "#e2e8f0" }}
//           >
//             Your Cart is Empty
//           </h2>
//           <p className="font-dm text-sm mb-6" style={{ color: "#475569" }}>
//             Add some beautiful Islamic products to your cart
//           </p>
//           <Link
//             to="/products"
//             className="inline-block px-8 py-3.5 rounded-xl font-dm font-semibold text-sm text-white"
//             style={{ background: "#16a34a" }}
//           >
//             Browse Products
//           </Link>
//         </div>
//       </div>
//     );

//   return (
//     <div style={{ background: "#0f1923", minHeight: "100vh" }}>
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-8">
//           <div>
//             <p
//               className="font-dm text-xs font-semibold tracking-widest uppercase mb-1"
//               style={{ color: "#16a34a" }}
//             >
//               Shopping
//             </p>
//             <h1
//               className="font-cormorant text-3xl font-semibold"
//               style={{ color: "#e2e8f0" }}
//             >
//               Your Cart ({items.length} items)
//             </h1>
//           </div>
//           <button
//             onClick={handleClear}
//             className="font-dm text-xs transition-colors"
//             style={{ color: "#475569" }}
//             onMouseEnter={(e) => (e.currentTarget.style.color = "#ef4444")}
//             onMouseLeave={(e) => (e.currentTarget.style.color = "#475569")}
//           >
//             Clear all
//           </button>
//         </div>

//         <div className="grid lg:grid-cols-3 gap-6">
//           {/* ── Cart Items ── */}
//           <div className="lg:col-span-2 space-y-3">
//             {items.map((item) => {
//               const p = item.product;
//               if (!p) return null;
//               return (
//                 <div
//                   key={item._id}
//                   className="flex gap-4 p-4 rounded-2xl"
//                   style={{
//                     background: "#162032",
//                     border: "1px solid rgba(255,255,255,0.05)",
//                   }}
//                 >
//                   {/* Image */}
//                   <Link to={`/products/${p.slug}`} className="shrink-0">
//                     <img
//                       src={p.images?.[0]?.url}
//                       alt={p.name}
//                       className="w-20 h-20 rounded-xl object-cover"
//                       style={{ background: "#0f1923" }}
//                     />
//                   </Link>

//                   {/* Info */}
//                   <div className="flex-1 min-w-0">
//                     <Link to={`/products/${p.slug}`}>
//                       <h3
//                         className="font-dm text-sm font-medium mb-0.5 hover:text-g-400 transition-colors line-clamp-2"
//                         style={{ color: "#e2e8f0" }}
//                       >
//                         {p.name}
//                       </h3>
//                     </Link>
//                     <p
//                       className="font-dm text-xs mb-2"
//                       style={{ color: "#475569" }}
//                     >
//                       {p.category?.name}
//                     </p>

//                     <div className="flex items-center justify-between">
//                       {/* Quantity */}
//                       <div
//                         className="flex items-center rounded-lg overflow-hidden"
//                         style={{ border: "1px solid rgba(255,255,255,0.08)" }}
//                       >
//                         <button
//                           onClick={() => handleQty(p._id, item.quantity - 1)}
//                           className="w-8 h-8 flex items-center justify-center font-dm text-sm transition-colors"
//                           style={{
//                             color: "#94a3b8",
//                             background: "rgba(255,255,255,0.04)",
//                           }}
//                           onMouseEnter={(e) =>
//                             (e.currentTarget.style.color = "#4ade80")
//                           }
//                           onMouseLeave={(e) =>
//                             (e.currentTarget.style.color = "#94a3b8")
//                           }
//                         >
//                           −
//                         </button>
//                         <span
//                           className="w-10 text-center font-dm text-sm"
//                           style={{ color: "#e2e8f0" }}
//                         >
//                           {item.quantity}
//                         </span>
//                         <button
//                           onClick={() => handleQty(p._id, item.quantity + 1)}
//                           disabled={item.quantity >= p.stock}
//                           className="w-8 h-8 flex items-center justify-center font-dm text-sm transition-colors disabled:opacity-30"
//                           style={{
//                             color: "#94a3b8",
//                             background: "rgba(255,255,255,0.04)",
//                           }}
//                           onMouseEnter={(e) =>
//                             (e.currentTarget.style.color = "#4ade80")
//                           }
//                           onMouseLeave={(e) =>
//                             (e.currentTarget.style.color = "#94a3b8")
//                           }
//                         >
//                           +
//                         </button>
//                       </div>

//                       {/* Price + Remove */}
//                       <div className="flex items-center gap-4">
//                         <span
//                           className="font-cormorant font-semibold text-lg"
//                           style={{ color: "#4ade80" }}
//                         >
//                           ₹{(item.price * item.quantity).toLocaleString()}
//                         </span>
//                         <button
//                           onClick={() => handleRemove(p._id)}
//                           className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors"
//                           style={{ color: "#334155" }}
//                           onMouseEnter={(e) => {
//                             e.currentTarget.style.color = "#ef4444";
//                             e.currentTarget.style.background =
//                               "rgba(239,68,68,0.08)";
//                           }}
//                           onMouseLeave={(e) => {
//                             e.currentTarget.style.color = "#334155";
//                             e.currentTarget.style.background = "transparent";
//                           }}
//                         >
//                           <svg
//                             className="w-4 h-4"
//                             fill="none"
//                             stroke="currentColor"
//                             viewBox="0 0 24 24"
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth={2}
//                               d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
//                             />
//                           </svg>
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}

//             {/* Continue Shopping */}
//             <Link
//               to="/products"
//               className="flex items-center gap-2 font-dm text-sm transition-colors pt-2"
//               style={{ color: "#475569" }}
//               onMouseEnter={(e) => (e.currentTarget.style.color = "#4ade80")}
//               onMouseLeave={(e) => (e.currentTarget.style.color = "#475569")}
//             >
//               ← Continue Shopping
//             </Link>
//           </div>

//           {/* ── Order Summary ── */}
//           <div className="space-y-3">
//             {/* Coupon */}
//             <div
//               className="p-5 rounded-2xl"
//               style={{
//                 background: "#162032",
//                 border: "1px solid rgba(255,255,255,0.05)",
//               }}
//             >
//               <p
//                 className="font-dm text-xs font-semibold uppercase tracking-wider mb-3"
//                 style={{ color: "#475569" }}
//               >
//                 Coupon Code
//               </p>
//               {couponData ? (
//                 <div
//                   className="flex items-center justify-between p-3 rounded-xl"
//                   style={{
//                     background: "rgba(22,163,74,0.08)",
//                     border: "1px solid rgba(22,163,74,0.2)",
//                   }}
//                 >
//                   <div>
//                     <p
//                       className="font-dm text-xs font-semibold"
//                       style={{ color: "#4ade80" }}
//                     >
//                       {couponData.code} applied!
//                     </p>
//                     <p className="font-dm text-xs" style={{ color: "#64748b" }}>
//                       You save ₹{couponData.discountAmount}
//                     </p>
//                   </div>
//                   <button
//                     onClick={() => {
//                       setCouponData(null);
//                       setCoupon("");
//                     }}
//                     className="font-dm text-xs"
//                     style={{ color: "#ef4444" }}
//                   >
//                     Remove
//                   </button>
//                 </div>
//               ) : (
//                 <div className="flex gap-2">
//                   <input
//                     type="text"
//                     value={coupon}
//                     onChange={(e) => setCoupon(e.target.value.toUpperCase())}
//                     placeholder="Enter code"
//                     className="nb-input flex-1 text-xs"
//                     style={{ padding: "10px 12px" }}
//                     onKeyDown={(e) => e.key === "Enter" && handleApplyCoupon()}
//                   />
//                   <button
//                     onClick={handleApplyCoupon}
//                     disabled={applying}
//                     className="px-4 py-2 rounded-xl font-dm text-xs font-semibold text-white transition-opacity disabled:opacity-60 shrink-0"
//                     style={{ background: "#16a34a" }}
//                   >
//                     {applying ? "..." : "Apply"}
//                   </button>
//                 </div>
//               )}
//               <p
//                 className="font-dm text-[10px] mt-2"
//                 style={{ color: "#334155" }}
//               >
//                 Try: RAMADAN10
//               </p>
//             </div>

//             {/* Summary */}
//             <div
//               className="p-5 rounded-2xl"
//               style={{
//                 background: "#162032",
//                 border: "1px solid rgba(255,255,255,0.05)",
//               }}
//             >
//               <p
//                 className="font-dm text-xs font-semibold uppercase tracking-wider mb-4"
//                 style={{ color: "#475569" }}
//               >
//                 Order Summary
//               </p>

//               <div className="space-y-3 mb-4">
//                 {[
//                   {
//                     label: "Subtotal",
//                     value: `₹${totalPrice?.toLocaleString()}`,
//                   },
//                   {
//                     label: "Shipping",
//                     value: shipping === 0 ? "FREE 🎉" : `₹${shipping}`,
//                   },
//                   { label: "Tax (5%)", value: `₹${tax}` },
//                   ...(discount > 0
//                     ? [
//                         {
//                           label: "Discount",
//                           value: `-₹${discount}`,
//                           green: true,
//                         },
//                       ]
//                     : []),
//                 ].map((row) => (
//                   <div
//                     key={row.label}
//                     className="flex items-center justify-between"
//                   >
//                     <span
//                       className="font-dm text-xs"
//                       style={{ color: "#64748b" }}
//                     >
//                       {row.label}
//                     </span>
//                     <span
//                       className="font-dm text-xs font-medium"
//                       style={{ color: row.green ? "#4ade80" : "#94a3b8" }}
//                     >
//                       {row.value}
//                     </span>
//                   </div>
//                 ))}
//               </div>

//               <div
//                 className="flex items-center justify-between pt-4 mb-5"
//                 style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
//               >
//                 <span
//                   className="font-dm font-semibold text-sm"
//                   style={{ color: "#e2e8f0" }}
//                 >
//                   Total
//                 </span>
//                 <span
//                   className="font-cormorant font-semibold text-2xl"
//                   style={{ color: "#4ade80" }}
//                 >
//                   ₹{grandTotal.toLocaleString()}
//                 </span>
//               </div>

//               {/* <button
//                 onClick={() => navigate("/checkout")}
//                 className="w-full py-4 rounded-xl font-dm font-semibold text-sm text-white transition-opacity"
//                 style={{
//                   background: "linear-gradient(135deg,#16a34a,#15803d)",
//                 }}
//                 onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
//                 onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
//               >
//                 Proceed to Checkout →
//               </button> */}
//               <button
//                 onClick={() => navigate("/checkout")}
//                 className="w-full py-4 rounded-xl font-dm font-semibold text-sm text-white"
//                 style={{
//                   background: "linear-gradient(135deg,#16a34a,#15803d)",
//                 }}
//               >
//                 Proceed to Checkout →
//               </button>

//               {/* Shipping note */}
//               {totalPrice < 999 && (
//                 <p
//                   className="font-dm text-[10px] text-center mt-3"
//                   style={{ color: "#475569" }}
//                 >
//                   Add ₹{(999 - totalPrice).toLocaleString()} more for free
//                   shipping!
//                 </p>
//               )}
//             </div>

//             {/* Trust */}
//             <div
//               className="p-4 rounded-2xl"
//               style={{
//                 background: "#162032",
//                 border: "1px solid rgba(255,255,255,0.05)",
//               }}
//             >
//               {[
//                 { icon: "🔒", text: "Secure 256-bit SSL checkout" },
//                 { icon: "✅", text: "100% authentic products" },
//                 { icon: "🔄", text: "Easy 7-day returns" },
//               ].map((t) => (
//                 <div key={t.text} className="flex items-center gap-3 py-2">
//                   <span>{t.icon}</span>
//                   <span
//                     className="font-dm text-xs"
//                     style={{ color: "#475569" }}
//                   >
//                     {t.text}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CartPage;
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  fetchCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} from "../redux/slices/cartSlice";
import toast from "react-hot-toast";
import API from "../services/api";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, totalPrice, discountAmount, finalPrice, loading } =
    useSelector((s) => s.cart);

  const [coupon, setCoupon] = useState("");
  const [applying, setApplying] = useState(false);
  const [couponData, setCouponData] = useState(null);

  useEffect(() => {
    dispatch(fetchCart());
  }, []);

  const handleQty = async (productId, qty) => {
    if (qty < 1) return;
    await dispatch(updateCartItem({ productId, quantity: qty }));
  };
  const handleRemove = async (productId) => {
    await dispatch(removeFromCart(productId));
    toast.success("Item removed");
  };
  const handleClear = async () => {
    await dispatch(clearCart());
    toast.success("Cart cleared");
  };

  const handleApplyCoupon = async () => {
    if (!coupon.trim()) return;
    setApplying(true);
    try {
      const { data } = await API.post("/coupons/validate", {
        code: coupon.trim(),
        orderAmount: totalPrice,
      });
      setCouponData(data.data);
      toast.success(data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid coupon");
    } finally {
      setApplying(false);
    }
  };

  const shipping = (finalPrice || totalPrice) >= 999 ? 0 : 99;
  const tax = Math.round(totalPrice * 0.05);
  const discount = couponData?.discountAmount || discountAmount || 0;
  const grandTotal = Math.max(
    0,
    (finalPrice || totalPrice) + shipping + tax - discount,
  );

  if (loading)
    return (
      <div
        style={{
          background: "#ffffff",
          minHeight: "100vh",
          padding: "40px 24px",
        }}
      >
        <div style={{ maxWidth: "1152px", margin: "0 auto" }}>
          <div
            style={{
              height: "32px",
              width: "160px",
              borderRadius: "8px",
              background: "#f0fdf4",
              marginBottom: "32px",
            }}
          />
          <div className="cart-grid">
            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              {Array(3)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    style={{
                      height: "112px",
                      borderRadius: "16px",
                      background: "#f0fdf4",
                    }}
                  />
                ))}
            </div>
            <div
              style={{
                height: "320px",
                borderRadius: "16px",
                background: "#f0fdf4",
              }}
            />
          </div>
        </div>
      </div>
    );

  if (items.length === 0)
    return (
      <div
        style={{
          background: "#ffffff",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "80px", marginBottom: "24px" }}>🛒</div>
          <h2
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "clamp(24px,4vw,32px)",
              fontWeight: "600",
              color: "#0f172a",
              margin: "0 0 12px 0",
            }}
          >
            Your Cart is Empty
          </h2>
          <p
            style={{
              fontFamily: "DM Sans, sans-serif",
              fontSize: "14px",
              color: "#64748b",
              margin: "0 0 24px 0",
            }}
          >
            Add some beautiful Islamic products to your cart
          </p>
          <Link
            to="/products"
            style={{
              display: "inline-block",
              padding: "14px 32px",
              borderRadius: "12px",
              background: "#16a34a",
              color: "white",
              fontFamily: "DM Sans, sans-serif",
              fontSize: "14px",
              fontWeight: "600",
              textDecoration: "none",
              boxShadow: "0 4px 12px rgba(22,163,74,0.3)",
            }}
          >
            Browse Products
          </Link>
        </div>
      </div>
    );

  return (
    <>
      <div style={{ background: "#ffffff", minHeight: "100vh", width: "100%" }}>
        <div
          style={{
            maxWidth: "1152px",
            margin: "0 auto",
            padding: "clamp(16px,4vw,40px) 24px",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "32px",
              flexWrap: "wrap",
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
                  letterSpacing: "0.12em",
                  color: "#16a34a",
                  margin: "0 0 4px 0",
                }}
              >
                Shopping
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
                Your Cart ({items.length} items)
              </h1>
            </div>
            <button
              onClick={handleClear}
              style={{
                fontFamily: "DM Sans",
                fontSize: "13px",
                color: "#94a3b8",
                background: "none",
                border: "none",
                cursor: "pointer",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#ef4444")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#94a3b8")}
            >
              Clear all
            </button>
          </div>

          <div className="cart-grid">
            {/* ── Cart Items ── */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              {items.map((item) => {
                const p = item.product;
                if (!p) return null;
                return (
                  <div
                    key={item._id}
                    style={{
                      display: "flex",
                      gap: "clamp(10px,2vw,16px)",
                      padding: "clamp(12px,2vw,16px)",
                      borderRadius: "16px",
                      background: "#ffffff",
                      border: "1px solid #e2e8f0",
                      transition: "border-color 0.2s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.borderColor = "#bbf7d0")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.borderColor = "#e2e8f0")
                    }
                  >
                    {/* Image */}
                    <Link to={`/products/${p.slug}`} style={{ flexShrink: 0 }}>
                      <img
                        src={p.images?.[0]?.url}
                        alt={p.name}
                        style={{
                          width: "clamp(64px,10vw,80px)",
                          height: "clamp(64px,10vw,80px)",
                          borderRadius: "12px",
                          objectFit: "cover",
                          background: "#f8fafc",
                          border: "1px solid #e2e8f0",
                        }}
                      />
                    </Link>

                    {/* Info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <Link
                        to={`/products/${p.slug}`}
                        style={{ textDecoration: "none" }}
                      >
                        <h3
                          style={{
                            fontFamily: "DM Sans, sans-serif",
                            fontSize: "14px",
                            fontWeight: "600",
                            color: "#0f172a",
                            margin: "0 0 2px 0",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {p.name}
                        </h3>
                      </Link>
                      <p
                        style={{
                          fontFamily: "DM Sans",
                          fontSize: "12px",
                          color: "#94a3b8",
                          margin: "0 0 10px 0",
                        }}
                      >
                        {p.category?.name}
                      </p>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          flexWrap: "wrap",
                          gap: "8px",
                        }}
                      >
                        {/* Qty */}
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            border: "1px solid #e2e8f0",
                            borderRadius: "8px",
                            overflow: "hidden",
                          }}
                        >
                          <button
                            onClick={() => handleQty(p._id, item.quantity - 1)}
                            style={{
                              width: "32px",
                              height: "32px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              background: "#f8fafc",
                              border: "none",
                              cursor: "pointer",
                              color: "#64748b",
                              fontSize: "16px",
                              transition: "all 0.2s",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = "#f0fdf4";
                              e.currentTarget.style.color = "#16a34a";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = "#f8fafc";
                              e.currentTarget.style.color = "#64748b";
                            }}
                          >
                            −
                          </button>
                          <span
                            style={{
                              width: "36px",
                              textAlign: "center",
                              fontFamily: "DM Sans",
                              fontSize: "14px",
                              fontWeight: "600",
                              color: "#0f172a",
                            }}
                          >
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleQty(p._id, item.quantity + 1)}
                            disabled={item.quantity >= p.stock}
                            style={{
                              width: "32px",
                              height: "32px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              background: "#f8fafc",
                              border: "none",
                              cursor:
                                item.quantity >= p.stock
                                  ? "not-allowed"
                                  : "pointer",
                              color: "#64748b",
                              fontSize: "16px",
                              opacity: item.quantity >= p.stock ? 0.4 : 1,
                              transition: "all 0.2s",
                            }}
                            onMouseEnter={(e) => {
                              if (item.quantity < p.stock) {
                                e.currentTarget.style.background = "#f0fdf4";
                                e.currentTarget.style.color = "#16a34a";
                              }
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = "#f8fafc";
                              e.currentTarget.style.color = "#64748b";
                            }}
                          >
                            +
                          </button>
                        </div>

                        {/* Price + Delete */}
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                          }}
                        >
                          <span
                            style={{
                              fontFamily: "Cormorant Garamond, serif",
                              fontWeight: "700",
                              fontSize: "18px",
                              color: "#16a34a",
                            }}
                          >
                            ₹{(item.price * item.quantity).toLocaleString()}
                          </span>
                          <button
                            onClick={() => handleRemove(p._id)}
                            style={{
                              width: "28px",
                              height: "28px",
                              borderRadius: "8px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              background: "transparent",
                              border: "1px solid #e2e8f0",
                              cursor: "pointer",
                              color: "#94a3b8",
                              transition: "all 0.2s",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.borderColor = "#fca5a5";
                              e.currentTarget.style.color = "#ef4444";
                              e.currentTarget.style.background = "#fff5f5";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.borderColor = "#e2e8f0";
                              e.currentTarget.style.color = "#94a3b8";
                              e.currentTarget.style.background = "transparent";
                            }}
                          >
                            <svg
                              style={{ width: "14px", height: "14px" }}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Continue Shopping */}
              <Link
                to="/products"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  fontFamily: "DM Sans",
                  fontSize: "13px",
                  color: "#94a3b8",
                  textDecoration: "none",
                  paddingTop: "8px",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#16a34a")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#94a3b8")}
              >
                ← Continue Shopping
              </Link>
            </div>

            {/* ── Order Summary ── */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              {/* Coupon */}
              <div
                style={{
                  padding: "20px",
                  borderRadius: "16px",
                  background: "#ffffff",
                  border: "1px solid #e2e8f0",
                }}
              >
                <p
                  style={{
                    fontFamily: "DM Sans",
                    fontSize: "11px",
                    fontWeight: "700",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: "#94a3b8",
                    margin: "0 0 12px 0",
                  }}
                >
                  Coupon Code
                </p>
                {couponData ? (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "12px",
                      borderRadius: "10px",
                      background: "#f0fdf4",
                      border: "1px solid #bbf7d0",
                    }}
                  >
                    <div>
                      <p
                        style={{
                          fontFamily: "DM Sans",
                          fontSize: "13px",
                          fontWeight: "600",
                          color: "#16a34a",
                          margin: 0,
                        }}
                      >
                        {couponData.code} applied! 🎉
                      </p>
                      <p
                        style={{
                          fontFamily: "DM Sans",
                          fontSize: "12px",
                          color: "#64748b",
                          margin: "2px 0 0 0",
                        }}
                      >
                        You save ₹{couponData.discountAmount}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setCouponData(null);
                        setCoupon("");
                      }}
                      style={{
                        fontFamily: "DM Sans",
                        fontSize: "12px",
                        color: "#ef4444",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div style={{ display: "flex", gap: "8px" }}>
                    <input
                      type="text"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value.toUpperCase())}
                      placeholder="Enter coupon code"
                      style={{
                        flex: 1,
                        background: "#f8fafc",
                        border: "1px solid #e2e8f0",
                        borderRadius: "8px",
                        padding: "9px 12px",
                        fontFamily: "DM Sans",
                        fontSize: "13px",
                        color: "#0f172a",
                        outline: "none",
                        minWidth: 0,
                      }}
                      onFocus={(e) =>
                        (e.currentTarget.style.borderColor = "#16a34a")
                      }
                      onBlur={(e) =>
                        (e.currentTarget.style.borderColor = "#e2e8f0")
                      }
                      onKeyDown={(e) =>
                        e.key === "Enter" && handleApplyCoupon()
                      }
                    />
                    <button
                      onClick={handleApplyCoupon}
                      disabled={applying}
                      style={{
                        padding: "9px 16px",
                        borderRadius: "8px",
                        background: "#16a34a",
                        color: "white",
                        fontFamily: "DM Sans",
                        fontSize: "13px",
                        fontWeight: "600",
                        border: "none",
                        cursor: applying ? "not-allowed" : "pointer",
                        opacity: applying ? 0.7 : 1,
                        flexShrink: 0,
                      }}
                    >
                      {applying ? "..." : "Apply"}
                    </button>
                  </div>
                )}
                <p
                  style={{
                    fontFamily: "DM Sans",
                    fontSize: "11px",
                    color: "#94a3b8",
                    margin: "8px 0 0 0",
                  }}
                >
                  Try: RAMADAN10
                </p>
              </div>

              {/* Summary */}
              <div
                style={{
                  padding: "20px",
                  borderRadius: "16px",
                  background: "#ffffff",
                  border: "1px solid #e2e8f0",
                }}
              >
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
                  {[
                    {
                      label: "Subtotal",
                      value: `₹${totalPrice?.toLocaleString()}`,
                    },
                    {
                      label: "Shipping",
                      value: shipping === 0 ? "FREE 🎉" : `₹${shipping}`,
                    },
                    { label: "Tax (5%)", value: `₹${tax}` },
                    ...(discount > 0
                      ? [
                          {
                            label: "Discount",
                            value: `-₹${discount}`,
                            green: true,
                          },
                        ]
                      : []),
                  ].map((row) => (
                    <div
                      key={row.label}
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
                        {row.label}
                      </span>
                      <span
                        style={{
                          fontFamily: "DM Sans",
                          fontSize: "13px",
                          fontWeight: "500",
                          color: row.green ? "#16a34a" : "#0f172a",
                        }}
                      >
                        {row.value}
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
                    paddingTop: "16px",
                    marginBottom: "20px",
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

                <button
                  onClick={() => navigate("/checkout")}
                  style={{
                    width: "100%",
                    padding: "16px",
                    borderRadius: "12px",
                    background: "linear-gradient(135deg,#16a34a,#15803d)",
                    color: "white",
                    fontFamily: "DM Sans, sans-serif",
                    fontSize: "15px",
                    fontWeight: "600",
                    border: "none",
                    cursor: "pointer",
                    transition: "opacity 0.2s",
                    boxShadow: "0 4px 16px rgba(22,163,74,0.3)",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  Proceed to Checkout →
                </button>

                {totalPrice < 999 && (
                  <p
                    style={{
                      fontFamily: "DM Sans",
                      fontSize: "12px",
                      color: "#94a3b8",
                      textAlign: "center",
                      margin: "12px 0 0 0",
                    }}
                  >
                    Add ₹{(999 - totalPrice).toLocaleString()} more for free
                    shipping!
                  </p>
                )}
              </div>

              {/* Trust */}
              <div
                style={{
                  padding: "16px",
                  borderRadius: "16px",
                  background: "#f0fdf4",
                  border: "1px solid #bbf7d0",
                }}
              >
                {[
                  { icon: "🔒", text: "Secure 256-bit SSL checkout" },
                  { icon: "✅", text: "100% authentic products" },
                  { icon: "🔄", text: "Easy 7-day returns" },
                ].map((t) => (
                  <div
                    key={t.text}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "6px 0",
                    }}
                  >
                    <span>{t.icon}</span>
                    <span
                      style={{
                        fontFamily: "DM Sans",
                        fontSize: "12px",
                        color: "#15803d",
                        fontWeight: "500",
                      }}
                    >
                      {t.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .cart-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }
        @media (min-width: 1024px) {
          .cart-grid {
            grid-template-columns: 1fr 360px;
            gap: 24px;
          }
        }
      `}</style>
    </>
  );
};

export default CartPage;
