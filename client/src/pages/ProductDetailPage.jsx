// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchProductBySlug } from "../redux/slices/productSlice";
// import { addToCart } from "../redux/slices/cartSlice";
// import { addToWishlist } from "../redux/slices/wishlistSlice";
// import toast from "react-hot-toast";
// import ProductReviews from "../components/product/ProductReviews";
// import RelatedProducts from "../components/product/RelatedProducts";
// import ReviewList from "../components/product/ReviewList";
// import { clearReviews } from "../redux/slices/reviewSlice";
// const Stars = ({ n }) => (
//   <div style={{ display: "flex", gap: "2px" }}>
//     {[1, 2, 3, 4, 5].map((s) => (
//       <svg
//         key={s}
//         style={{ width: "16px", height: "16px" }}
//         fill={s <= n ? "#c9a84c" : "#e2e8f0"}
//         viewBox="0 0 20 20"
//       >
//         <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//       </svg>
//     ))}
//   </div>
// );

// const ProductDetailPage = () => {
//   const { slug } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { product, loading } = useSelector((s) => s.products);
//   const { isAuth } = useSelector((s) => s.auth);

//   const [activeImg, setActiveImg] = useState(0);
//   const [quantity, setQuantity] = useState(1);
//   const [activeTab, setActiveTab] = useState("description");
//   const [addingCart, setAddingCart] = useState(false);

//   useEffect(() => {
//     dispatch(fetchProductBySlug(slug));
//     setActiveImg(0);
//     setQuantity(1);
//     window.scrollTo(0, 0);
//   }, [slug]);

//   const handleAddToCart = async () => {
//     if (!isAuth) {
//       toast.error("Please login first");
//       navigate("/login");
//       return;
//     }
//     setAddingCart(true);
//     const r = await dispatch(addToCart({ productId: product._id, quantity }));
//     setAddingCart(false);
//     if (r.meta.requestStatus === "fulfilled")
//       toast.success(`${product.name} added to cart 🛒`);
//     else toast.error(r.payload || "Failed to add");
//   };

//   const handleWishlist = async () => {
//     if (!isAuth) {
//       toast.error("Please login first");
//       return;
//     }
//     await dispatch(addToWishlist(product._id));
//     toast.success("Added to wishlist ❤️");
//   };

//   const handleBuyNow = async () => {
//     if (!isAuth) {
//       navigate("/login");
//       return;
//     }
//     await dispatch(addToCart({ productId: product._id, quantity }));
//     navigate("/cart");
//   };

//   const disc = product?.effectiveDiscountPercent || 0;

//   // ── Loading ──
//   if (loading)
//     return (
//       <div
//         style={{
//           background: "#ffffff",
//           minHeight: "100vh",
//           padding: "40px 24px",
//         }}
//       >
//         <div style={{ maxWidth: "1152px", margin: "0 auto" }}>
//           <div className="pd-grid">
//             <div>
//               <div
//                 className="shimmer"
//                 style={{
//                   aspectRatio: "1",
//                   borderRadius: "16px",
//                   marginBottom: "12px",
//                 }}
//               />
//               <div
//                 style={{
//                   display: "grid",
//                   gridTemplateColumns: "repeat(4,1fr)",
//                   gap: "8px",
//                 }}
//               >
//                 {Array(4)
//                   .fill(0)
//                   .map((_, i) => (
//                     <div
//                       key={i}
//                       className="shimmer"
//                       style={{ aspectRatio: "1", borderRadius: "10px" }}
//                     />
//                   ))}
//               </div>
//             </div>
//             <div
//               style={{ display: "flex", flexDirection: "column", gap: "16px" }}
//             >
//               {[60, 40, 80, 40, 60, 40, 100].map((w, i) => (
//                 <div
//                   key={i}
//                   className="shimmer"
//                   style={{
//                     height: "20px",
//                     borderRadius: "6px",
//                     width: `${w}%`,
//                   }}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     );

//   if (!product)
//     return (
//       <div
//         style={{
//           background: "#ffffff",
//           minHeight: "100vh",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//       >
//         <div style={{ textAlign: "center" }}>
//           <div style={{ fontSize: "64px", marginBottom: "16px" }}>📦</div>
//           <h2
//             style={{
//               fontFamily: "Cormorant Garamond, serif",
//               fontSize: "28px",
//               color: "#0f172a",
//             }}
//           >
//             Product not found
//           </h2>
//         </div>
//       </div>
//     );

//   return (
//     <>
//       <div style={{ background: "#ffffff", minHeight: "100vh", width: "100%" }}>
//         <div
//           style={{
//             maxWidth: "1152px",
//             margin: "0 auto",
//             padding: "clamp(16px,4vw,40px) 24px",
//           }}
//         >
//           {/* ── Breadcrumb ── */}
//           <div
//             style={{
//               display: "flex",
//               alignItems: "center",
//               gap: "8px",
//               marginBottom: "32px",
//               flexWrap: "wrap",
//               fontFamily: "DM Sans, sans-serif",
//               fontSize: "12px",
//               color: "#94a3b8",
//             }}
//           >
//             <span
//               style={{ cursor: "pointer", transition: "color 0.2s" }}
//               onClick={() => navigate("/")}
//               onMouseEnter={(e) => (e.currentTarget.style.color = "#16a34a")}
//               onMouseLeave={(e) => (e.currentTarget.style.color = "#94a3b8")}
//             >
//               Home
//             </span>
//             <span>/</span>
//             <span
//               style={{ cursor: "pointer", transition: "color 0.2s" }}
//               onClick={() => navigate("/products")}
//               onMouseEnter={(e) => (e.currentTarget.style.color = "#16a34a")}
//               onMouseLeave={(e) => (e.currentTarget.style.color = "#94a3b8")}
//             >
//               Products
//             </span>
//             <span>/</span>
//             <span style={{ color: "#0f172a", fontWeight: "500" }}>
//               {product.name}
//             </span>
//           </div>

//           {/* ── Main Grid ── */}
//           <div
//             className="pd-grid"
//             style={{ marginBottom: "clamp(32px,6vw,64px)" }}
//           >
//             {/* ── Images ── */}
//             <div>
//               {/* Main Image */}
//               <div
//                 style={{
//                   position: "relative",
//                   aspectRatio: "1",
//                   borderRadius: "16px",
//                   overflow: "hidden",
//                   background: "#f8fafc",
//                   border: "1px solid #e2e8f0",
//                   marginBottom: "12px",
//                 }}
//               >
//                 <img
//                   src={product.images?.[activeImg]?.url}
//                   alt={product.name}
//                   style={{
//                     width: "100%",
//                     height: "100%",
//                     objectFit: "cover",
//                     transition: "all 0.3s",
//                   }}
//                 />
//                 {disc > 0 && (
//                   <div
//                     style={{
//                       position: "absolute",
//                       top: "16px",
//                       left: "16px",
//                       background: "#ef4444",
//                       color: "white",
//                       fontFamily: "DM Sans, sans-serif",
//                       fontSize: "12px",
//                       fontWeight: "700",
//                       padding: "4px 12px",
//                       borderRadius: "20px",
//                     }}
//                   >
//                     -{disc}% OFF
//                   </div>
//                 )}
//                 {product.isGiftable && (
//                   <div
//                     style={{
//                       position: "absolute",
//                       top: "16px",
//                       right: "16px",
//                       background: "#fef9c3",
//                       color: "#854d0e",
//                       border: "1px solid #fde68a",
//                       fontFamily: "DM Sans, sans-serif",
//                       fontSize: "11px",
//                       fontWeight: "600",
//                       padding: "4px 12px",
//                       borderRadius: "20px",
//                     }}
//                   >
//                     🎁 Gift Worthy
//                   </div>
//                 )}
//               </div>

//               {/* Thumbnails */}
//               {product.images?.length > 1 && (
//                 <div
//                   style={{
//                     display: "grid",
//                     gridTemplateColumns: "repeat(4,1fr)",
//                     gap: "8px",
//                   }}
//                 >
//                   {product.images.map((img, i) => (
//                     <button
//                       key={i}
//                       onClick={() => setActiveImg(i)}
//                       style={{
//                         aspectRatio: "1",
//                         borderRadius: "10px",
//                         overflow: "hidden",
//                         border:
//                           activeImg === i
//                             ? "2px solid #16a34a"
//                             : "2px solid #e2e8f0",
//                         opacity: activeImg === i ? 1 : 0.65,
//                         cursor: "pointer",
//                         transition: "all 0.2s",
//                         padding: 0,
//                         background: "none",
//                       }}
//                     >
//                       <img
//                         src={img.url}
//                         alt=""
//                         style={{
//                           width: "100%",
//                           height: "100%",
//                           objectFit: "cover",
//                         }}
//                       />
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* ── Product Info ── */}
//             <div>
//               {/* Category */}
//               <p
//                 style={{
//                   fontFamily: "DM Sans, sans-serif",
//                   fontSize: "11px",
//                   fontWeight: "700",
//                   textTransform: "uppercase",
//                   letterSpacing: "0.1em",
//                   color: "#16a34a",
//                   margin: "0 0 10px 0",
//                 }}
//               >
//                 {product.category?.name}
//               </p>

//               {/* Name */}
//               <h1
//                 style={{
//                   fontFamily: "Cormorant Garamond, serif",
//                   fontSize: "clamp(28px, 4vw, 44px)",
//                   fontWeight: "600",
//                   lineHeight: 1.15,
//                   color: "#0f172a",
//                   margin: "0 0 6px 0",
//                 }}
//               >
//                 {product.name}
//               </h1>

//               {/* Arabic */}
//               {product.nameArabic && (
//                 <p
//                   style={{
//                     fontFamily: "Amiri, serif",
//                     fontSize: "20px",
//                     color: "#94a3b8",
//                     margin: "0 0 12px 0",
//                   }}
//                 >
//                   {product.nameArabic}
//                 </p>
//               )}

//               {/* Rating */}
//               <div
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   gap: "10px",
//                   marginBottom: "16px",
//                   flexWrap: "wrap",
//                 }}
//               >
//                 <Stars n={Math.round(product.ratings)} />
//                 <span
//                   style={{
//                     fontFamily: "DM Sans",
//                     fontSize: "14px",
//                     color: "#16a34a",
//                     fontWeight: "600",
//                   }}
//                 >
//                   {product.ratings?.toFixed(1)}
//                 </span>
//                 <span
//                   style={{
//                     fontFamily: "DM Sans",
//                     fontSize: "13px",
//                     color: "#94a3b8",
//                   }}
//                 >
//                   ({product.numOfReviews} reviews)
//                 </span>
//               </div>

//               {/* Divider */}
//               <div
//                 style={{
//                   height: "1px",
//                   background:
//                     "linear-gradient(90deg,transparent,#bbf7d0,transparent)",
//                   margin: "0 0 20px 0",
//                 }}
//               />

//               {/* Price */}
//               <div
//                 style={{
//                   display: "flex",
//                   alignItems: "flex-end",
//                   gap: "12px",
//                   marginBottom: "20px",
//                   flexWrap: "wrap",
//                 }}
//               >
//                 <span
//                   style={{
//                     fontFamily: "Cormorant Garamond, serif",
//                     fontWeight: "700",
//                     fontSize: "clamp(32px, 5vw, 44px)",
//                     color: "#16a34a",
//                     lineHeight: 1,
//                   }}
//                 >
//                   ₹{product.price?.toLocaleString()}
//                 </span>
//                 {product.originalPrice &&
//                   product.originalPrice > product.price && (
//                     <>
//                       <span
//                         style={{
//                           fontFamily: "DM Sans",
//                           fontSize: "18px",
//                           color: "#94a3b8",
//                           textDecoration: "line-through",
//                           paddingBottom: "4px",
//                         }}
//                       >
//                         ₹{product.originalPrice?.toLocaleString()}
//                       </span>
//                       <span
//                         style={{
//                           fontFamily: "DM Sans",
//                           fontSize: "14px",
//                           fontWeight: "600",
//                           color: "#16a34a",
//                           paddingBottom: "4px",
//                         }}
//                       >
//                         Save ₹
//                         {(
//                           product.originalPrice - product.price
//                         ).toLocaleString()}
//                       </span>
//                     </>
//                   )}
//               </div>

//               {/* Short Desc */}
//               {product.shortDescription && (
//                 <p
//                   style={{
//                     fontFamily: "DM Sans",
//                     fontSize: "14px",
//                     lineHeight: 1.7,
//                     color: "#64748b",
//                     margin: "0 0 20px 0",
//                   }}
//                 >
//                   {product.shortDescription}
//                 </p>
//               )}

//               {/* Stock */}
//               <div
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   gap: "8px",
//                   marginBottom: "20px",
//                 }}
//               >
//                 <div
//                   style={{
//                     width: "8px",
//                     height: "8px",
//                     borderRadius: "50%",
//                     background: product.stock > 0 ? "#16a34a" : "#ef4444",
//                     flexShrink: 0,
//                   }}
//                 />
//                 <span
//                   style={{
//                     fontFamily: "DM Sans, sans-serif",
//                     fontSize: "14px",
//                     fontWeight: "500",
//                     color: product.stock > 0 ? "#16a34a" : "#ef4444",
//                   }}
//                 >
//                   {product.stock > 10
//                     ? "In Stock"
//                     : product.stock > 0
//                       ? `Only ${product.stock} left`
//                       : "Out of Stock"}
//                 </span>
//               </div>

//               {/* Quantity */}
//               {product.stock > 0 && (
//                 <div
//                   style={{
//                     display: "flex",
//                     alignItems: "center",
//                     gap: "16px",
//                     marginBottom: "20px",
//                     flexWrap: "wrap",
//                   }}
//                 >
//                   <span
//                     style={{
//                       fontFamily: "DM Sans",
//                       fontSize: "14px",
//                       color: "#64748b",
//                       fontWeight: "500",
//                     }}
//                   >
//                     Quantity
//                   </span>
//                   <div
//                     style={{
//                       display: "flex",
//                       alignItems: "center",
//                       border: "1px solid #e2e8f0",
//                       borderRadius: "10px",
//                       overflow: "hidden",
//                     }}
//                   >
//                     <button
//                       onClick={() => setQuantity((q) => Math.max(1, q - 1))}
//                       style={{
//                         width: "40px",
//                         height: "40px",
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         background: "#f8fafc",
//                         border: "none",
//                         cursor: "pointer",
//                         fontSize: "18px",
//                         color: "#64748b",
//                         transition: "all 0.2s",
//                       }}
//                       onMouseEnter={(e) => {
//                         e.currentTarget.style.background = "#f0fdf4";
//                         e.currentTarget.style.color = "#16a34a";
//                       }}
//                       onMouseLeave={(e) => {
//                         e.currentTarget.style.background = "#f8fafc";
//                         e.currentTarget.style.color = "#64748b";
//                       }}
//                     >
//                       −
//                     </button>
//                     <span
//                       style={{
//                         width: "48px",
//                         textAlign: "center",
//                         fontFamily: "DM Sans",
//                         fontSize: "15px",
//                         fontWeight: "600",
//                         color: "#0f172a",
//                       }}
//                     >
//                       {quantity}
//                     </span>
//                     <button
//                       onClick={() =>
//                         setQuantity((q) => Math.min(product.stock, q + 1))
//                       }
//                       style={{
//                         width: "40px",
//                         height: "40px",
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         background: "#f8fafc",
//                         border: "none",
//                         cursor: "pointer",
//                         fontSize: "18px",
//                         color: "#64748b",
//                         transition: "all 0.2s",
//                       }}
//                       onMouseEnter={(e) => {
//                         e.currentTarget.style.background = "#f0fdf4";
//                         e.currentTarget.style.color = "#16a34a";
//                       }}
//                       onMouseLeave={(e) => {
//                         e.currentTarget.style.background = "#f8fafc";
//                         e.currentTarget.style.color = "#64748b";
//                       }}
//                     >
//                       +
//                     </button>
//                   </div>
//                 </div>
//               )}

//               {/* Action Buttons */}
//               <div
//                 style={{
//                   display: "flex",
//                   gap: "10px",
//                   marginBottom: "20px",
//                   flexWrap: "wrap",
//                 }}
//               >
//                 <button
//                   onClick={handleAddToCart}
//                   disabled={addingCart || product.stock === 0}
//                   style={{
//                     flex: 1,
//                     minWidth: "120px",
//                     padding: "14px 20px",
//                     borderRadius: "12px",
//                     background: "#16a34a",
//                     color: "white",
//                     fontFamily: "DM Sans, sans-serif",
//                     fontSize: "14px",
//                     fontWeight: "600",
//                     border: "none",
//                     cursor:
//                       addingCart || product.stock === 0
//                         ? "not-allowed"
//                         : "pointer",
//                     opacity: addingCart || product.stock === 0 ? 0.6 : 1,
//                     transition: "all 0.2s",
//                     boxShadow: "0 4px 12px rgba(22,163,74,0.25)",
//                   }}
//                   onMouseEnter={(e) => {
//                     if (!addingCart && product.stock > 0) {
//                       e.currentTarget.style.background = "#15803d";
//                       e.currentTarget.style.transform = "translateY(-1px)";
//                     }
//                   }}
//                   onMouseLeave={(e) => {
//                     e.currentTarget.style.background = "#16a34a";
//                     e.currentTarget.style.transform = "translateY(0)";
//                   }}
//                 >
//                   {addingCart
//                     ? "Adding..."
//                     : product.stock === 0
//                       ? "Out of Stock"
//                       : "Add to Cart"}
//                 </button>

//                 <button
//                   onClick={handleBuyNow}
//                   disabled={product.stock === 0}
//                   style={{
//                     flex: 1,
//                     minWidth: "120px",
//                     padding: "14px 20px",
//                     borderRadius: "12px",
//                     background: "transparent",
//                     color: "#16a34a",
//                     fontFamily: "DM Sans, sans-serif",
//                     fontSize: "14px",
//                     fontWeight: "600",
//                     border: "1px solid #16a34a",
//                     cursor: product.stock === 0 ? "not-allowed" : "pointer",
//                     opacity: product.stock === 0 ? 0.5 : 1,
//                     transition: "all 0.2s",
//                   }}
//                   onMouseEnter={(e) => {
//                     if (product.stock > 0) {
//                       e.currentTarget.style.background = "#f0fdf4";
//                     }
//                   }}
//                   onMouseLeave={(e) => {
//                     e.currentTarget.style.background = "transparent";
//                   }}
//                 >
//                   Buy Now
//                 </button>

//                 <button
//                   onClick={handleWishlist}
//                   style={{
//                     width: "48px",
//                     height: "48px",
//                     borderRadius: "12px",
//                     background: "transparent",
//                     border: "1px solid #e2e8f0",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     cursor: "pointer",
//                     color: "#94a3b8",
//                     transition: "all 0.2s",
//                     flexShrink: 0,
//                   }}
//                   onMouseEnter={(e) => {
//                     e.currentTarget.style.borderColor = "#fca5a5";
//                     e.currentTarget.style.color = "#ef4444";
//                     e.currentTarget.style.background = "#fff5f5";
//                   }}
//                   onMouseLeave={(e) => {
//                     e.currentTarget.style.borderColor = "#e2e8f0";
//                     e.currentTarget.style.color = "#94a3b8";
//                     e.currentTarget.style.background = "transparent";
//                   }}
//                 >
//                   <svg
//                     style={{ width: "20px", height: "20px" }}
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
//                     />
//                   </svg>
//                 </button>
//               </div>

//               {/* Trust Badges */}
//               <div
//                 style={{
//                   display: "grid",
//                   gridTemplateColumns: "repeat(3,1fr)",
//                   gap: "8px",
//                   padding: "16px",
//                   borderRadius: "12px",
//                   background: "#f0fdf4",
//                   border: "1px solid #bbf7d0",
//                 }}
//               >
//                 {[
//                   { icon: "✅", label: "100% Authentic" },
//                   { icon: "🚚", label: "Free Shipping ₹999+" },
//                   { icon: "🔄", label: "Easy Returns" },
//                 ].map((b) => (
//                   <div key={b.label} style={{ textAlign: "center" }}>
//                     <div style={{ fontSize: "20px", marginBottom: "4px" }}>
//                       {b.icon}
//                     </div>
//                     <p
//                       style={{
//                         fontFamily: "DM Sans",
//                         fontSize: "10px",
//                         color: "#15803d",
//                         margin: 0,
//                         fontWeight: "500",
//                       }}
//                     >
//                       {b.label}
//                     </p>
//                   </div>
//                 ))}
//               </div>

//               {/* Tags */}
//               {product.tags?.length > 0 && (
//                 <div
//                   style={{
//                     display: "flex",
//                     flexWrap: "wrap",
//                     gap: "8px",
//                     marginTop: "16px",
//                   }}
//                 >
//                   {product.tags.map((tag) => (
//                     <span
//                       key={tag}
//                       style={{
//                         fontFamily: "DM Sans, sans-serif",
//                         fontSize: "11px",
//                         padding: "4px 10px",
//                         borderRadius: "20px",
//                         background: "#f0fdf4",
//                         border: "1px solid #bbf7d0",
//                         color: "#15803d",
//                       }}
//                     >
//                       #{tag}
//                     </span>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* ── Tabs ── */}
//           <div style={{ marginBottom: "40px" }}>
//             {/* Tab Buttons */}
//             <div
//               style={{
//                 display: "flex",
//                 gap: "4px",
//                 marginBottom: "20px",
//                 padding: "4px",
//                 borderRadius: "12px",
//                 background: "#f8fafc",
//                 border: "1px solid #e2e8f0",
//                 width: "fit-content",
//                 flexWrap: "wrap",
//               }}
//             >
//               {["description", "details", "reviews"].map((tab) => (
//                 <button
//                   key={tab}
//                   onClick={() => setActiveTab(tab)}
//                   style={{
//                     padding: "10px 20px",
//                     borderRadius: "8px",
//                     fontFamily: "DM Sans, sans-serif",
//                     fontSize: "13px",
//                     fontWeight: "500",
//                     textTransform: "capitalize",
//                     cursor: "pointer",
//                     transition: "all 0.2s",
//                     border: "none",
//                     background: activeTab === tab ? "#16a34a" : "transparent",
//                     color: activeTab === tab ? "white" : "#64748b",
//                     boxShadow:
//                       activeTab === tab
//                         ? "0 2px 8px rgba(22,163,74,0.3)"
//                         : "none",
//                   }}
//                 >
//                   {tab} {tab === "reviews" && `(${product.numOfReviews})`}
//                 </button>
//               ))}
//             </div>

//             {/* Tab Content */}
//             {activeTab === "description" && (
//               <div
//                 style={{
//                   padding: "clamp(16px,3vw,24px)",
//                   borderRadius: "16px",
//                   background: "#ffffff",
//                   border: "1px solid #e2e8f0",
//                   fontFamily: "DM Sans, sans-serif",
//                   fontSize: "14px",
//                   lineHeight: 1.8,
//                   color: "#64748b",
//                 }}
//               >
//                 {product.description}
//               </div>
//             )}

//             {activeTab === "details" && (
//               <div
//                 style={{
//                   padding: "clamp(16px,3vw,24px)",
//                   borderRadius: "16px",
//                   background: "#ffffff",
//                   border: "1px solid #e2e8f0",
//                 }}
//               >
//                 {product.details &&
//                 Object.entries(product.details).some(([_, v]) => v) ? (
//                   <div className="pd-details-grid">
//                     {Object.entries(product.details)
//                       .filter(([_, v]) => v)
//                       .map(([key, val]) => (
//                         <div
//                           key={key}
//                           style={{
//                             display: "flex",
//                             alignItems: "center",
//                             justifyContent: "space-between",
//                             padding: "10px 14px",
//                             borderRadius: "8px",
//                             background: "#f8fafc",
//                             border: "1px solid #f1f5f9",
//                           }}
//                         >
//                           <span
//                             style={{
//                               fontFamily: "DM Sans",
//                               fontSize: "13px",
//                               color: "#64748b",
//                               textTransform: "capitalize",
//                             }}
//                           >
//                             {key}
//                           </span>
//                           <span
//                             style={{
//                               fontFamily: "DM Sans",
//                               fontSize: "13px",
//                               fontWeight: "600",
//                               color: "#0f172a",
//                             }}
//                           >
//                             {val}
//                           </span>
//                         </div>
//                       ))}
//                   </div>
//                 ) : (
//                   <p
//                     style={{
//                       fontFamily: "DM Sans",
//                       fontSize: "14px",
//                       color: "#94a3b8",
//                       margin: 0,
//                     }}
//                   >
//                     No additional details available.
//                   </p>
//                 )}
//               </div>
//             )}

//             {activeTab === "reviews" && (
//               <ProductReviews
//                 productId={product._id}
//                 numOfReviews={product.numOfReviews}
//                 ratings={product.ratings}
//               />
//             )}
//           </div>

//           {/* ── Related Products ── */}
//           <RelatedProducts
//             categoryId={product.category?._id}
//             currentProductId={product._id}
//           />
//         </div>
//       </div>

//       {/* ── Responsive Styles ── */}
//       <style>{`
//         .pd-grid {
//           display: grid;
//           grid-template-columns: 1fr;
//           gap: 24px;
//         }
//         @media (min-width: 768px) {
//           .pd-grid {
//             grid-template-columns: 1fr 1fr;
//             gap: 40px;
//           }
//         }
//         @media (min-width: 1024px) {
//           .pd-grid {
//             grid-template-columns: 1fr 1fr;
//             gap: 56px;
//           }
//         }
//         .pd-details-grid {
//           display: grid;
//           grid-template-columns: 1fr;
//           gap: 8px;
//         }
//         @media (min-width: 640px) {
//           .pd-details-grid {
//             grid-template-columns: repeat(2, 1fr);
//           }
//         }
//       `}</style>
//     </>
//   );
// };

// export default ProductDetailPage;

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductBySlug } from "../redux/slices/productSlice";
import { addToCart } from "../redux/slices/cartSlice";
import { addToWishlist } from "../redux/slices/wishlistSlice";
import toast from "react-hot-toast";
import ProductReviews from "../components/product/ProductReviews";
import RelatedProducts from "../components/product/RelatedProducts";
import ReviewList from "../components/product/ReviewList"; // ✅ new import
import { clearReviews } from "../redux/slices/reviewSlice"; // ✅ new import

const Stars = ({ n }) => (
  <div style={{ display: "flex", gap: "2px" }}>
    {[1, 2, 3, 4, 5].map((s) => (
      <svg
        key={s}
        style={{ width: "16px", height: "16px" }}
        fill={s <= n ? "#c9a84c" : "#e2e8f0"}
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

const ProductDetailPage = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { product, loading } = useSelector((s) => s.products);
  const { isAuth } = useSelector((s) => s.auth);

  const [activeImg, setActiveImg] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [addingCart, setAddingCart] = useState(false);

  // ✅ Cleanup reviews on unmount
  useEffect(() => {
    return () => {
      dispatch(clearReviews());
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchProductBySlug(slug));
    setActiveImg(0);
    setQuantity(1);
    window.scrollTo(0, 0);
  }, [slug, dispatch]);

  const handleAddToCart = async () => {
    if (!isAuth) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }
    setAddingCart(true);
    const r = await dispatch(addToCart({ productId: product._id, quantity }));
    setAddingCart(false);
    if (r.meta.requestStatus === "fulfilled")
      toast.success(`${product.name} added to cart 🛒`);
    else toast.error(r.payload || "Failed to add");
  };

  const handleWishlist = async () => {
    if (!isAuth) {
      toast.error("Please login first");
      return;
    }
    await dispatch(addToWishlist(product._id));
    toast.success("Added to wishlist ❤️");
  };

  const handleBuyNow = async () => {
    if (!isAuth) {
      navigate("/login");
      return;
    }
    await dispatch(addToCart({ productId: product._id, quantity }));
    navigate("/cart");
  };

  const disc = product?.effectiveDiscountPercent || 0;

  // ── Loading ──
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
          <div className="pd-grid">
            <div>
              <div
                className="shimmer"
                style={{
                  aspectRatio: "1",
                  borderRadius: "16px",
                  marginBottom: "12px",
                }}
              />
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4,1fr)",
                  gap: "8px",
                }}
              >
                {Array(4)
                  .fill(0)
                  .map((_, i) => (
                    <div
                      key={i}
                      className="shimmer"
                      style={{ aspectRatio: "1", borderRadius: "10px" }}
                    />
                  ))}
              </div>
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              {[60, 40, 80, 40, 60, 40, 100].map((w, i) => (
                <div
                  key={i}
                  className="shimmer"
                  style={{
                    height: "20px",
                    borderRadius: "6px",
                    width: `${w}%`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );

  if (!product)
    return (
      <div
        style={{
          background: "#ffffff",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "64px", marginBottom: "16px" }}>📦</div>
          <h2
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "28px",
              color: "#0f172a",
            }}
          >
            Product not found
          </h2>
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
          {/* ── Breadcrumb ── */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "32px",
              flexWrap: "wrap",
              fontFamily: "DM Sans, sans-serif",
              fontSize: "12px",
              color: "#94a3b8",
            }}
          >
            <span
              style={{ cursor: "pointer", transition: "color 0.2s" }}
              onClick={() => navigate("/")}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#16a34a")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#94a3b8")}
            >
              Home
            </span>
            <span>/</span>
            <span
              style={{ cursor: "pointer", transition: "color 0.2s" }}
              onClick={() => navigate("/products")}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#16a34a")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#94a3b8")}
            >
              Products
            </span>
            <span>/</span>
            <span style={{ color: "#0f172a", fontWeight: "500" }}>
              {product.name}
            </span>
          </div>

          {/* ── Main Grid ── */}
          <div
            className="pd-grid"
            style={{ marginBottom: "clamp(32px,6vw,64px)" }}
          >
            {/* ── Images ── */}
            <div>
              {/* Main Image */}
              <div
                style={{
                  position: "relative",
                  aspectRatio: "1",
                  borderRadius: "16px",
                  overflow: "hidden",
                  background: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  marginBottom: "12px",
                }}
              >
                <img
                  src={product.images?.[activeImg]?.url}
                  alt={product.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "all 0.3s",
                  }}
                />
                {disc > 0 && (
                  <div
                    style={{
                      position: "absolute",
                      top: "16px",
                      left: "16px",
                      background: "#ef4444",
                      color: "white",
                      fontFamily: "DM Sans, sans-serif",
                      fontSize: "12px",
                      fontWeight: "700",
                      padding: "4px 12px",
                      borderRadius: "20px",
                    }}
                  >
                    -{disc}% OFF
                  </div>
                )}
                {product.isGiftable && (
                  <div
                    style={{
                      position: "absolute",
                      top: "16px",
                      right: "16px",
                      background: "#fef9c3",
                      color: "#854d0e",
                      border: "1px solid #fde68a",
                      fontFamily: "DM Sans, sans-serif",
                      fontSize: "11px",
                      fontWeight: "600",
                      padding: "4px 12px",
                      borderRadius: "20px",
                    }}
                  >
                    🎁 Gift Worthy
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {product.images?.length > 1 && (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4,1fr)",
                    gap: "8px",
                  }}
                >
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImg(i)}
                      style={{
                        aspectRatio: "1",
                        borderRadius: "10px",
                        overflow: "hidden",
                        border:
                          activeImg === i
                            ? "2px solid #16a34a"
                            : "2px solid #e2e8f0",
                        opacity: activeImg === i ? 1 : 0.65,
                        cursor: "pointer",
                        transition: "all 0.2s",
                        padding: 0,
                        background: "none",
                      }}
                    >
                      <img
                        src={img.url}
                        alt=""
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* ── Product Info ── */}
            <div>
              {/* Category */}
              <p
                style={{
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: "11px",
                  fontWeight: "700",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "#16a34a",
                  margin: "0 0 10px 0",
                }}
              >
                {product.category?.name}
              </p>

              {/* Name */}
              <h1
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontSize: "clamp(28px, 4vw, 44px)",
                  fontWeight: "600",
                  lineHeight: 1.15,
                  color: "#0f172a",
                  margin: "0 0 6px 0",
                }}
              >
                {product.name}
              </h1>

              {/* Arabic */}
              {product.nameArabic && (
                <p
                  style={{
                    fontFamily: "Amiri, serif",
                    fontSize: "20px",
                    color: "#94a3b8",
                    margin: "0 0 12px 0",
                  }}
                >
                  {product.nameArabic}
                </p>
              )}

              {/* Rating */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "16px",
                  flexWrap: "wrap",
                }}
              >
                <Stars n={Math.round(product.ratings)} />
                <span
                  style={{
                    fontFamily: "DM Sans",
                    fontSize: "14px",
                    color: "#16a34a",
                    fontWeight: "600",
                  }}
                >
                  {product.ratings?.toFixed(1)}
                </span>
                <span
                  style={{
                    fontFamily: "DM Sans",
                    fontSize: "13px",
                    color: "#94a3b8",
                  }}
                >
                  ({product.numOfReviews} reviews)
                </span>
              </div>

              {/* Divider */}
              <div
                style={{
                  height: "1px",
                  background:
                    "linear-gradient(90deg,transparent,#bbf7d0,transparent)",
                  margin: "0 0 20px 0",
                }}
              />

              {/* Price */}
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  gap: "12px",
                  marginBottom: "20px",
                  flexWrap: "wrap",
                }}
              >
                <span
                  style={{
                    fontFamily: "Cormorant Garamond, serif",
                    fontWeight: "700",
                    fontSize: "clamp(32px, 5vw, 44px)",
                    color: "#16a34a",
                    lineHeight: 1,
                  }}
                >
                  ₹{product.price?.toLocaleString()}
                </span>
                {product.originalPrice &&
                  product.originalPrice > product.price && (
                    <>
                      <span
                        style={{
                          fontFamily: "DM Sans",
                          fontSize: "18px",
                          color: "#94a3b8",
                          textDecoration: "line-through",
                          paddingBottom: "4px",
                        }}
                      >
                        ₹{product.originalPrice?.toLocaleString()}
                      </span>
                      <span
                        style={{
                          fontFamily: "DM Sans",
                          fontSize: "14px",
                          fontWeight: "600",
                          color: "#16a34a",
                          paddingBottom: "4px",
                        }}
                      >
                        Save ₹
                        {(
                          product.originalPrice - product.price
                        ).toLocaleString()}
                      </span>
                    </>
                  )}
              </div>

              {/* Short Desc */}
              {product.shortDescription && (
                <p
                  style={{
                    fontFamily: "DM Sans",
                    fontSize: "14px",
                    lineHeight: 1.7,
                    color: "#64748b",
                    margin: "0 0 20px 0",
                  }}
                >
                  {product.shortDescription}
                </p>
              )}

              {/* Stock */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "20px",
                }}
              >
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: product.stock > 0 ? "#16a34a" : "#ef4444",
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: "DM Sans, sans-serif",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: product.stock > 0 ? "#16a34a" : "#ef4444",
                  }}
                >
                  {product.stock > 10
                    ? "In Stock"
                    : product.stock > 0
                      ? `Only ${product.stock} left`
                      : "Out of Stock"}
                </span>
              </div>

              {/* Quantity */}
              {product.stock > 0 && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    marginBottom: "20px",
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "DM Sans",
                      fontSize: "14px",
                      color: "#64748b",
                      fontWeight: "500",
                    }}
                  >
                    Quantity
                  </span>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      border: "1px solid #e2e8f0",
                      borderRadius: "10px",
                      overflow: "hidden",
                    }}
                  >
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      style={{
                        width: "40px",
                        height: "40px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "#f8fafc",
                        border: "none",
                        cursor: "pointer",
                        fontSize: "18px",
                        color: "#64748b",
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
                        width: "48px",
                        textAlign: "center",
                        fontFamily: "DM Sans",
                        fontSize: "15px",
                        fontWeight: "600",
                        color: "#0f172a",
                      }}
                    >
                      {quantity}
                    </span>
                    <button
                      onClick={() =>
                        setQuantity((q) => Math.min(product.stock, q + 1))
                      }
                      style={{
                        width: "40px",
                        height: "40px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "#f8fafc",
                        border: "none",
                        cursor: "pointer",
                        fontSize: "18px",
                        color: "#64748b",
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
                      +
                    </button>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  marginBottom: "20px",
                  flexWrap: "wrap",
                }}
              >
                <button
                  onClick={handleAddToCart}
                  disabled={addingCart || product.stock === 0}
                  style={{
                    flex: 1,
                    minWidth: "120px",
                    padding: "14px 20px",
                    borderRadius: "12px",
                    background: "#16a34a",
                    color: "white",
                    fontFamily: "DM Sans, sans-serif",
                    fontSize: "14px",
                    fontWeight: "600",
                    border: "none",
                    cursor:
                      addingCart || product.stock === 0
                        ? "not-allowed"
                        : "pointer",
                    opacity: addingCart || product.stock === 0 ? 0.6 : 1,
                    transition: "all 0.2s",
                    boxShadow: "0 4px 12px rgba(22,163,74,0.25)",
                  }}
                  onMouseEnter={(e) => {
                    if (!addingCart && product.stock > 0) {
                      e.currentTarget.style.background = "#15803d";
                      e.currentTarget.style.transform = "translateY(-1px)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#16a34a";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  {addingCart
                    ? "Adding..."
                    : product.stock === 0
                      ? "Out of Stock"
                      : "Add to Cart"}
                </button>

                <button
                  onClick={handleBuyNow}
                  disabled={product.stock === 0}
                  style={{
                    flex: 1,
                    minWidth: "120px",
                    padding: "14px 20px",
                    borderRadius: "12px",
                    background: "transparent",
                    color: "#16a34a",
                    fontFamily: "DM Sans, sans-serif",
                    fontSize: "14px",
                    fontWeight: "600",
                    border: "1px solid #16a34a",
                    cursor: product.stock === 0 ? "not-allowed" : "pointer",
                    opacity: product.stock === 0 ? 0.5 : 1,
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    if (product.stock > 0) {
                      e.currentTarget.style.background = "#f0fdf4";
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  Buy Now
                </button>

                <button
                  onClick={handleWishlist}
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "12px",
                    background: "transparent",
                    border: "1px solid #e2e8f0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    color: "#94a3b8",
                    transition: "all 0.2s",
                    flexShrink: 0,
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
                    style={{ width: "20px", height: "20px" }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
              </div>

              {/* Trust Badges */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3,1fr)",
                  gap: "8px",
                  padding: "16px",
                  borderRadius: "12px",
                  background: "#f0fdf4",
                  border: "1px solid #bbf7d0",
                }}
              >
                {[
                  { icon: "✅", label: "100% Authentic" },
                  { icon: "🚚", label: "Free Shipping ₹999+" },
                  { icon: "🔄", label: "Easy Returns" },
                ].map((b) => (
                  <div key={b.label} style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "20px", marginBottom: "4px" }}>
                      {b.icon}
                    </div>
                    <p
                      style={{
                        fontFamily: "DM Sans",
                        fontSize: "10px",
                        color: "#15803d",
                        margin: 0,
                        fontWeight: "500",
                      }}
                    >
                      {b.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Tags */}
              {product.tags?.length > 0 && (
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "8px",
                    marginTop: "16px",
                  }}
                >
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontFamily: "DM Sans, sans-serif",
                        fontSize: "11px",
                        padding: "4px 10px",
                        borderRadius: "20px",
                        background: "#f0fdf4",
                        border: "1px solid #bbf7d0",
                        color: "#15803d",
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ── Tabs ── */}
          <div style={{ marginBottom: "40px" }}>
            {/* Tab Buttons */}
            <div
              style={{
                display: "flex",
                gap: "4px",
                marginBottom: "20px",
                padding: "4px",
                borderRadius: "12px",
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
                width: "fit-content",
                flexWrap: "wrap",
              }}
            >
              {["description", "details", "reviews"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    padding: "10px 20px",
                    borderRadius: "8px",
                    fontFamily: "DM Sans, sans-serif",
                    fontSize: "13px",
                    fontWeight: "500",
                    textTransform: "capitalize",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    border: "none",
                    background: activeTab === tab ? "#16a34a" : "transparent",
                    color: activeTab === tab ? "white" : "#64748b",
                    boxShadow:
                      activeTab === tab
                        ? "0 2px 8px rgba(22,163,74,0.3)"
                        : "none",
                  }}
                >
                  {tab} {tab === "reviews" && `(${product.numOfReviews})`}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === "description" && (
              <div
                style={{
                  padding: "clamp(16px,3vw,24px)",
                  borderRadius: "16px",
                  background: "#ffffff",
                  border: "1px solid #e2e8f0",
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: "14px",
                  lineHeight: 1.8,
                  color: "#64748b",
                }}
              >
                {product.description}
              </div>
            )}

            {activeTab === "details" && (
              <div
                style={{
                  padding: "clamp(16px,3vw,24px)",
                  borderRadius: "16px",
                  background: "#ffffff",
                  border: "1px solid #e2e8f0",
                }}
              >
                {product.details &&
                Object.entries(product.details).some(([_, v]) => v) ? (
                  <div className="pd-details-grid">
                    {Object.entries(product.details)
                      .filter(([_, v]) => v)
                      .map(([key, val]) => (
                        <div
                          key={key}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: "10px 14px",
                            borderRadius: "8px",
                            background: "#f8fafc",
                            border: "1px solid #f1f5f9",
                          }}
                        >
                          <span
                            style={{
                              fontFamily: "DM Sans",
                              fontSize: "13px",
                              color: "#64748b",
                              textTransform: "capitalize",
                            }}
                          >
                            {key}
                          </span>
                          <span
                            style={{
                              fontFamily: "DM Sans",
                              fontSize: "13px",
                              fontWeight: "600",
                              color: "#0f172a",
                            }}
                          >
                            {val}
                          </span>
                        </div>
                      ))}
                  </div>
                ) : (
                  <p
                    style={{
                      fontFamily: "DM Sans",
                      fontSize: "14px",
                      color: "#94a3b8",
                      margin: 0,
                    }}
                  >
                    No additional details available.
                  </p>
                )}
              </div>
            )}

            {activeTab === "reviews" && (
              <ProductReviews
                productId={product._id}
                numOfReviews={product.numOfReviews}
                ratings={product.ratings}
              />
            )}
          </div>

          {/* ── Related Products ── */}
          <RelatedProducts
            categoryId={product.category?._id}
            currentProductId={product._id}
          />

          {/* ✅ NEW: Full Review List Section */}
          {product && (
            <div
              id="reviews-section"
              style={{
                maxWidth: "860px",
                margin: "0 auto",
                padding: "0 clamp(16px,3vw,24px)",
                paddingBottom: "48px",
              }}
            >
              <ReviewList productId={product._id} />
            </div>
          )}
        </div>
      </div>

      {/* ── Responsive Styles ── */}
      <style>{`
        .pd-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
        }
        @media (min-width: 768px) {
          .pd-grid {
            grid-template-columns: 1fr 1fr;
            gap: 40px;
          }
        }
        @media (min-width: 1024px) {
          .pd-grid {
            grid-template-columns: 1fr 1fr;
            gap: 56px;
          }
        }
        .pd-details-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 8px;
        }
        @media (min-width: 640px) {
          .pd-details-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </>
  );
};

export default ProductDetailPage;
