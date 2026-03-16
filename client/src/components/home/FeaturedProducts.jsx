// // import { useSelector, useDispatch } from "react-redux";
// // import { Link } from "react-router-dom";
// // import { addToCart } from "../../redux/slices/cartSlice";
// // import { addToWishlist } from "../../redux/slices/wishlistSlice";
// // import toast from "react-hot-toast";

// // const Stars = ({ n }) => (
// //   <div style={{ display: "flex", gap: "2px" }}>
// //     {[1, 2, 3, 4, 5].map((s) => (
// //       <svg
// //         key={s}
// //         style={{ width: "13px", height: "13px" }}
// //         fill={s <= n ? "#c9a84c" : "#e2e8f0"}
// //         viewBox="0 0 20 20"
// //       >
// //         <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
// //       </svg>
// //     ))}
// //   </div>
// // );

// // const ProductCard = ({ p }) => {
// //   const dispatch = useDispatch();
// //   const { isAuth } = useSelector((s) => s.auth);
// //   const disc = p?.effectiveDiscountPercent || 0;

// //   const onCart = async (e) => {
// //     e.preventDefault();
// //     e.stopPropagation();
// //     if (!isAuth) {
// //       toast.error("Please login first");
// //       return;
// //     }
// //     const r = await dispatch(addToCart({ productId: p._id, quantity: 1 }));
// //     if (r.meta.requestStatus === "fulfilled") toast.success("Added to cart 🛒");
// //     else toast.error(r.payload || "Failed");
// //   };

// //   const onWish = async (e) => {
// //     e.preventDefault();
// //     e.stopPropagation();
// //     if (!isAuth) {
// //       toast.error("Please login first");
// //       return;
// //     }
// //     await dispatch(addToWishlist(p._id));
// //     toast.success("Added to wishlist ❤️");
// //   };

// //   return (
// //     <Link
// //       to={`/products/${p.slug}`}
// //       style={{ textDecoration: "none", display: "block" }}
// //       onClick={() => window.scrollTo(0, 0)}
// //     >
// //       <div
// //         style={{
// //           background: "#ffffff",
// //           border: "1px solid #e2e8f0",
// //           borderRadius: "16px",
// //           overflow: "hidden",
// //           transition: "all 0.3s ease",
// //           height: "100%",
// //           display: "flex",
// //           flexDirection: "column",
// //         }}
// //         onMouseEnter={(e) => {
// //           e.currentTarget.style.borderColor = "#bbf7d0";
// //           e.currentTarget.style.transform = "translateY(-4px)";
// //           e.currentTarget.style.boxShadow = "0 12px 32px rgba(22,163,74,0.1)";
// //         }}
// //         onMouseLeave={(e) => {
// //           e.currentTarget.style.borderColor = "#e2e8f0";
// //           e.currentTarget.style.transform = "translateY(0)";
// //           e.currentTarget.style.boxShadow = "none";
// //         }}
// //       >
// //         {/* Image */}
// //         <div
// //           style={{
// //             position: "relative",
// //             aspectRatio: "1",
// //             overflow: "hidden",
// //             background: "#f8fafc",
// //           }}
// //         >
// //           <img
// //             src={p.images?.[0]?.url}
// //             alt={p.name}
// //             style={{
// //               width: "100%",
// //               height: "100%",
// //               objectFit: "cover",
// //               transition: "transform 0.5s ease",
// //             }}
// //             onMouseEnter={(e) =>
// //               (e.currentTarget.style.transform = "scale(1.05)")
// //             }
// //             onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
// //           />

// //           {/* Badges */}
// //           <div
// //             style={{
// //               position: "absolute",
// //               top: "10px",
// //               left: "10px",
// //               display: "flex",
// //               flexDirection: "column",
// //               gap: "4px",
// //             }}
// //           >
// //             {disc > 0 && (
// //               <span
// //                 style={{
// //                   background: "#ef4444",
// //                   color: "white",
// //                   fontSize: "10px",
// //                   fontWeight: "700",
// //                   padding: "2px 8px",
// //                   borderRadius: "20px",
// //                   fontFamily: "DM Sans",
// //                 }}
// //               >
// //                 -{disc}%
// //               </span>
// //             )}
// //             {p.isBestseller && (
// //               <span
// //                 style={{
// //                   background: "#fef9c3",
// //                   color: "#854d0e",
// //                   border: "1px solid #fde68a",
// //                   fontSize: "10px",
// //                   fontWeight: "600",
// //                   padding: "2px 8px",
// //                   borderRadius: "20px",
// //                   fontFamily: "DM Sans",
// //                 }}
// //               >
// //                 Bestseller
// //               </span>
// //             )}
// //             {p.isNewArrival && (
// //               <span
// //                 style={{
// //                   background: "#dcfce7",
// //                   color: "#15803d",
// //                   border: "1px solid #bbf7d0",
// //                   fontSize: "10px",
// //                   fontWeight: "600",
// //                   padding: "2px 8px",
// //                   borderRadius: "20px",
// //                   fontFamily: "DM Sans",
// //                 }}
// //               >
// //                 New
// //               </span>
// //             )}
// //           </div>

// //           {/* Wishlist */}
// //           <button
// //             onClick={onWish}
// //             style={{
// //               position: "absolute",
// //               top: "10px",
// //               right: "10px",
// //               width: "32px",
// //               height: "32px",
// //               borderRadius: "8px",
// //               background: "white",
// //               border: "1px solid #e2e8f0",
// //               display: "flex",
// //               alignItems: "center",
// //               justifyContent: "center",
// //               cursor: "pointer",
// //               color: "#94a3b8",
// //               transition: "all 0.2s",
// //               opacity: 0,
// //             }}
// //             className="wishlist-btn"
// //             onMouseEnter={(e) => {
// //               e.currentTarget.style.borderColor = "#fca5a5";
// //               e.currentTarget.style.color = "#ef4444";
// //             }}
// //             onMouseLeave={(e) => {
// //               e.currentTarget.style.borderColor = "#e2e8f0";
// //               e.currentTarget.style.color = "#94a3b8";
// //             }}
// //           >
// //             <svg
// //               style={{ width: "14px", height: "14px" }}
// //               fill="none"
// //               stroke="currentColor"
// //               viewBox="0 0 24 24"
// //             >
// //               <path
// //                 strokeLinecap="round"
// //                 strokeLinejoin="round"
// //                 strokeWidth={2}
// //                 d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
// //               />
// //             </svg>
// //           </button>

// //           {/* Quick Add */}
// //           <div
// //             style={{
// //               position: "absolute",
// //               bottom: 0,
// //               left: 0,
// //               right: 0,
// //               padding: "10px",
// //               transform: "translateY(100%)",
// //               transition: "transform 0.3s ease",
// //             }}
// //             className="quick-add"
// //           >
// //             <button
// //               onClick={onCart}
// //               disabled={p.stock === 0}
// //               style={{
// //                 width: "100%",
// //                 padding: "10px",
// //                 borderRadius: "8px",
// //                 background: "#16a34a",
// //                 color: "white",
// //                 fontFamily: "DM Sans",
// //                 fontSize: "13px",
// //                 fontWeight: "600",
// //                 border: "none",
// //                 cursor: p.stock === 0 ? "not-allowed" : "pointer",
// //                 opacity: p.stock === 0 ? 0.6 : 1,
// //               }}
// //             >
// //               {p.stock === 0 ? "Out of Stock" : "Add to Cart"}
// //             </button>
// //           </div>
// //         </div>

// //         {/* Info */}
// //         <div
// //           style={{
// //             padding: "16px",
// //             flex: 1,
// //             display: "flex",
// //             flexDirection: "column",
// //           }}
// //         >
// //           <p
// //             style={{
// //               fontFamily: "DM Sans",
// //               fontSize: "11px",
// //               fontWeight: "600",
// //               textTransform: "uppercase",
// //               letterSpacing: "0.05em",
// //               color: "#16a34a",
// //               marginBottom: "6px",
// //             }}
// //           >
// //             {p.category?.name}
// //           </p>
// //           <h3
// //             style={{
// //               fontFamily: "DM Sans",
// //               fontSize: "14px",
// //               fontWeight: "600",
// //               color: "#0f172a",
// //               marginBottom: "4px",
// //               flex: 1,
// //               display: "-webkit-box",
// //               WebkitLineClamp: 2,
// //               WebkitBoxOrient: "vertical",
// //               overflow: "hidden",
// //             }}
// //           >
// //             {p.name}
// //           </h3>
// //           {p.nameArabic && (
// //             <p
// //               style={{
// //                 fontFamily: "Amiri",
// //                 fontSize: "12px",
// //                 color: "#94a3b8",
// //                 marginBottom: "8px",
// //               }}
// //             >
// //               {p.nameArabic}
// //             </p>
// //           )}
// //           <div
// //             style={{
// //               display: "flex",
// //               alignItems: "center",
// //               gap: "6px",
// //               marginBottom: "10px",
// //             }}
// //           >
// //             <Stars n={Math.round(p.ratings)} />
// //             <span
// //               style={{
// //                 fontFamily: "DM Sans",
// //                 fontSize: "11px",
// //                 color: "#94a3b8",
// //               }}
// //             >
// //               ({p.numOfReviews})
// //             </span>
// //           </div>
// //           <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
// //             <span
// //               style={{
// //                 fontFamily: "Cormorant Garamond, serif",
// //                 fontWeight: "600",
// //                 fontSize: "20px",
// //                 color: "#16a34a",
// //               }}
// //             >
// //               ₹{p.price?.toLocaleString()}
// //             </span>
// //             {p.originalPrice && p.originalPrice > p.price && (
// //               <span
// //                 style={{
// //                   fontFamily: "DM Sans",
// //                   fontSize: "12px",
// //                   color: "#94a3b8",
// //                   textDecoration: "line-through",
// //                 }}
// //               >
// //                 ₹{p.originalPrice?.toLocaleString()}
// //               </span>
// //             )}
// //           </div>
// //           {p.stock <= 5 && p.stock > 0 && (
// //             <p
// //               style={{
// //                 fontFamily: "DM Sans",
// //                 fontSize: "11px",
// //                 color: "#ef4444",
// //                 marginTop: "4px",
// //               }}
// //             >
// //               Only {p.stock} left!
// //             </p>
// //           )}
// //         </div>
// //       </div>

// //       <style>{`
// //         a:hover .wishlist-btn { opacity: 1 !important; }
// //         a:hover .quick-add    { transform: translateY(0) !important; }
// //       `}</style>
// //     </Link>
// //   );
// // };

// // const FeaturedProducts = () => {
// //   const { featuredProducts, loading } = useSelector((s) => s.products);

// //   return (
// //     <section
// //       style={{
// //         background: "#f8fffe",
// //         padding: "80px 24px",
// //         borderTop: "1px solid #e2e8f0",
// //       }}
// //     >
// //       <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
// //         {/* Header */}
// //         <div
// //           style={{
// //             display: "flex",
// //             alignItems: "flex-end",
// //             justifyContent: "space-between",
// //             marginBottom: "40px",
// //           }}
// //         >
// //           <div>
// //             <p
// //               style={{
// //                 fontFamily: "DM Sans",
// //                 fontSize: "12px",
// //                 fontWeight: "600",
// //                 textTransform: "uppercase",
// //                 letterSpacing: "0.1em",
// //                 color: "#16a34a",
// //                 marginBottom: "8px",
// //               }}
// //             >
// //               Featured
// //             </p>
// //             <h2
// //               style={{
// //                 fontFamily: "Cormorant Garamond, serif",
// //                 fontSize: "38px",
// //                 fontWeight: "600",
// //                 color: "#0f172a",
// //                 margin: 0,
// //               }}
// //             >
// //               Our Best Products
// //             </h2>
// //           </div>
// //           <Link
// //             to="/products"
// //             style={{
// //               fontFamily: "DM Sans",
// //               fontSize: "14px",
// //               fontWeight: "500",
// //               color: "#16a34a",
// //               textDecoration: "none",
// //               display: "flex",
// //               alignItems: "center",
// //               gap: "4px",
// //             }}
// //             onMouseEnter={(e) => (e.currentTarget.style.color = "#15803d")}
// //             onMouseLeave={(e) => (e.currentTarget.style.color = "#16a34a")}
// //           >
// //             View all
// //             <svg
// //               style={{ width: "16px", height: "16px" }}
// //               fill="none"
// //               stroke="currentColor"
// //               viewBox="0 0 24 24"
// //             >
// //               <path
// //                 strokeLinecap="round"
// //                 strokeLinejoin="round"
// //                 strokeWidth={2}
// //                 d="M17 8l4 4m0 0l-4 4m4-4H3"
// //               />
// //             </svg>
// //           </Link>
// //         </div>

// //         {/* Grid */}
// //         <div
// //           style={{
// //             display: "grid",
// //             gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
// //             gap: "20px",
// //           }}
// //         >
// //           {loading
// //             ? Array(8)
// //                 .fill(0)
// //                 .map((_, i) => (
// //                   <div
// //                     key={i}
// //                     style={{
// //                       borderRadius: "16px",
// //                       overflow: "hidden",
// //                       border: "1px solid #e2e8f0",
// //                     }}
// //                   >
// //                     <div className="shimmer" style={{ aspectRatio: "1" }} />
// //                     <div style={{ padding: "16px" }}>
// //                       <div
// //                         className="shimmer"
// //                         style={{
// //                           height: "10px",
// //                           borderRadius: "4px",
// //                           marginBottom: "8px",
// //                           width: "40%",
// //                         }}
// //                       />
// //                       <div
// //                         className="shimmer"
// //                         style={{
// //                           height: "14px",
// //                           borderRadius: "4px",
// //                           marginBottom: "8px",
// //                         }}
// //                       />
// //                       <div
// //                         className="shimmer"
// //                         style={{
// //                           height: "20px",
// //                           borderRadius: "4px",
// //                           width: "30%",
// //                         }}
// //                       />
// //                     </div>
// //                   </div>
// //                 ))
// //             : featuredProducts.map((p) => <ProductCard key={p._id} p={p} />)}
// //         </div>
// //       </div>
// //     </section>
// //   );
// // };

// // export default FeaturedProducts;

// import { useSelector, useDispatch } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import { addToCart } from "../../redux/slices/cartSlice";
// import { addToWishlist } from "../../redux/slices/wishlistSlice";
// import toast from "react-hot-toast";

// const Stars = ({ n }) => (
//   <div style={{ display: "flex", gap: "2px" }}>
//     {[1, 2, 3, 4, 5].map((s) => (
//       <svg
//         key={s}
//         style={{ width: "12px", height: "12px" }}
//         fill={s <= n ? "#c9a84c" : "#1e2d42"}
//         viewBox="0 0 20 20"
//       >
//         <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//       </svg>
//     ))}
//   </div>
// );

// const ProductCard = ({ p }) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { isAuth } = useSelector((s) => s.auth);
//   const disc = p?.effectiveDiscountPercent || 0;

//   const onCart = async (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (!isAuth) {
//       toast.error("Please login first");
//       navigate("/login");
//       return;
//     }
//     const r = await dispatch(addToCart({ productId: p._id, quantity: 1 }));
//     if (r.meta.requestStatus === "fulfilled") toast.success("Added to cart 🛒");
//     else toast.error(r.payload || "Failed");
//   };

//   const onWish = async (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (!isAuth) {
//       toast.error("Please login first");
//       navigate("/login");
//       return;
//     }
//     await dispatch(addToWishlist(p._id));
//     toast.success("Added to wishlist ❤️");
//   };

//   if (!p) return null;

//   return (
//     <>
//       <Link
//         to={`/products/${p.slug}`}
//         className="product-card-link"
//         style={{ textDecoration: "none", display: "block", height: "100%" }}
//         onClick={() => window.scrollTo(0, 0)}
//       >
//         <div
//           className="product-card"
//           style={{
//             background: "#162032",
//             border: "1px solid rgba(255,255,255,0.06)",
//             borderRadius: "16px",
//             overflow: "hidden",
//             transition: "all 0.3s ease",
//             height: "100%",
//             display: "flex",
//             flexDirection: "column",
//           }}
//         >
//           {/* ── Image ── */}
//           <div
//             style={{
//               position: "relative",
//               aspectRatio: "1",
//               overflow: "hidden",
//               background: "#0f1923",
//               flexShrink: 0,
//             }}
//           >
//             <img
//               src={p.images?.[0]?.url}
//               alt={p.name}
//               style={{
//                 width: "100%",
//                 height: "100%",
//                 objectFit: "cover",
//                 transition: "transform 0.5s ease",
//               }}
//               className="product-card-img"
//             />

//             {/* Badges */}
//             <div
//               style={{
//                 position: "absolute",
//                 top: "10px",
//                 left: "10px",
//                 display: "flex",
//                 flexDirection: "column",
//                 gap: "4px",
//               }}
//             >
//               {disc > 0 && (
//                 <span
//                   style={{
//                     background: "#ef4444",
//                     color: "white",
//                     fontSize: "10px",
//                     fontWeight: "700",
//                     padding: "2px 8px",
//                     borderRadius: "20px",
//                     fontFamily: "DM Sans",
//                   }}
//                 >
//                   -{disc}%
//                 </span>
//               )}
//               {p.isBestseller && (
//                 <span
//                   style={{
//                     background: "rgba(201,168,76,0.15)",
//                     color: "#c9a84c",
//                     border: "1px solid rgba(201,168,76,0.3)",
//                     fontSize: "10px",
//                     fontWeight: "600",
//                     padding: "2px 8px",
//                     borderRadius: "20px",
//                     fontFamily: "DM Sans",
//                   }}
//                 >
//                   Bestseller
//                 </span>
//               )}
//               {p.isNewArrival && (
//                 <span
//                   style={{
//                     background: "rgba(22,163,74,0.15)",
//                     color: "#4ade80",
//                     border: "1px solid rgba(22,163,74,0.3)",
//                     fontSize: "10px",
//                     fontWeight: "600",
//                     padding: "2px 8px",
//                     borderRadius: "20px",
//                     fontFamily: "DM Sans",
//                   }}
//                 >
//                   New
//                 </span>
//               )}
//             </div>

//             {/* Wishlist Button */}
//             <button
//               onClick={onWish}
//               className="wishlist-btn"
//               style={{
//                 position: "absolute",
//                 top: "10px",
//                 right: "10px",
//                 width: "32px",
//                 height: "32px",
//                 borderRadius: "8px",
//                 background: "rgba(15,25,35,0.85)",
//                 border: "1px solid rgba(255,255,255,0.08)",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 cursor: "pointer",
//                 color: "#94a3b8",
//                 transition: "all 0.2s",
//                 opacity: 0,
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.color = "#f87171";
//                 e.currentTarget.style.borderColor = "rgba(248,113,113,0.4)";
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.color = "#94a3b8";
//                 e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
//               }}
//             >
//               <svg
//                 style={{ width: "14px", height: "14px" }}
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
//                 />
//               </svg>
//             </button>

//             {/* Quick Add */}
//             <div
//               className="quick-add"
//               style={{
//                 position: "absolute",
//                 bottom: 0,
//                 left: 0,
//                 right: 0,
//                 padding: "10px",
//                 transform: "translateY(100%)",
//                 transition: "transform 0.3s ease",
//               }}
//             >
//               <button
//                 onClick={onCart}
//                 disabled={p.stock === 0}
//                 style={{
//                   width: "100%",
//                   padding: "10px",
//                   borderRadius: "8px",
//                   background: "#16a34a",
//                   color: "white",
//                   fontFamily: "DM Sans",
//                   fontSize: "13px",
//                   fontWeight: "600",
//                   border: "none",
//                   cursor: p.stock === 0 ? "not-allowed" : "pointer",
//                   opacity: p.stock === 0 ? 0.6 : 1,
//                 }}
//               >
//                 {p.stock === 0 ? "Out of Stock" : "Add to Cart"}
//               </button>
//             </div>
//           </div>

//           {/* ── Info ── */}
//           <div
//             style={{
//               padding: "14px",
//               flex: 1,
//               display: "flex",
//               flexDirection: "column",
//             }}
//           >
//             <p
//               style={{
//                 fontFamily: "DM Sans, sans-serif",
//                 fontSize: "10px",
//                 fontWeight: "600",
//                 textTransform: "uppercase",
//                 letterSpacing: "0.05em",
//                 color: "#16a34a",
//                 marginBottom: "5px",
//               }}
//             >
//               {p.category?.name}
//             </p>

//             <h3
//               style={{
//                 fontFamily: "DM Sans, sans-serif",
//                 fontSize: "13px",
//                 fontWeight: "600",
//                 color: "#e2e8f0",
//                 marginBottom: "4px",
//                 flex: 1,
//                 display: "-webkit-box",
//                 WebkitLineClamp: 2,
//                 WebkitBoxOrient: "vertical",
//                 overflow: "hidden",
//                 lineHeight: 1.4,
//               }}
//             >
//               {p.name}
//             </h3>

//             {p.nameArabic && (
//               <p
//                 style={{
//                   fontFamily: "Amiri, serif",
//                   fontSize: "12px",
//                   color: "#334155",
//                   marginBottom: "8px",
//                 }}
//               >
//                 {p.nameArabic}
//               </p>
//             )}

//             <div
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "6px",
//                 marginBottom: "8px",
//               }}
//             >
//               <Stars n={Math.round(p.ratings)} />
//               <span
//                 style={{
//                   fontFamily: "DM Sans",
//                   fontSize: "10px",
//                   color: "#475569",
//                 }}
//               >
//                 ({p.numOfReviews})
//               </span>
//             </div>

//             <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
//               <span
//                 style={{
//                   fontFamily: "Cormorant Garamond, serif",
//                   fontWeight: "600",
//                   fontSize: "18px",
//                   color: "#4ade80",
//                 }}
//               >
//                 ₹{p.price?.toLocaleString()}
//               </span>
//               {p.originalPrice && p.originalPrice > p.price && (
//                 <span
//                   style={{
//                     fontFamily: "DM Sans",
//                     fontSize: "12px",
//                     color: "#334155",
//                     textDecoration: "line-through",
//                   }}
//                 >
//                   ₹{p.originalPrice?.toLocaleString()}
//                 </span>
//               )}
//             </div>

//             {p.stock <= 5 && p.stock > 0 && (
//               <p
//                 style={{
//                   fontFamily: "DM Sans",
//                   fontSize: "10px",
//                   color: "#ef4444",
//                   marginTop: "4px",
//                 }}
//               >
//                 Only {p.stock} left!
//               </p>
//             )}
//             {p.stock === 0 && (
//               <p
//                 style={{
//                   fontFamily: "DM Sans",
//                   fontSize: "10px",
//                   color: "#ef4444",
//                   marginTop: "4px",
//                   fontWeight: "600",
//                 }}
//               >
//                 Out of Stock
//               </p>
//             )}
//           </div>
//         </div>
//       </Link>

//       {/* ── Hover Effects ── */}
//       <style>{`
//         .product-card-link:hover .product-card {
//           border-color: rgba(22,163,74,0.3) !important;
//           transform:    translateY(-4px) !important;
//           box-shadow:   0 16px 40px rgba(0,0,0,0.4) !important;
//         }
//         .product-card-link:hover .product-card-img {
//           transform: scale(1.05) !important;
//         }
//         .product-card-link:hover .wishlist-btn {
//           opacity: 1 !important;
//         }
//         .product-card-link:hover .quick-add {
//           transform: translateY(0) !important;
//         }
//       `}</style>
//     </>
//   );
// };

// /* ════════════════════════════════
//    SKELETON CARD
// ════════════════════════════════ */
// const SkeletonCard = () => (
//   <div
//     style={{
//       borderRadius: "16px",
//       overflow: "hidden",
//       background: "#162032",
//       border: "1px solid rgba(255,255,255,0.05)",
//     }}
//   >
//     <div className="shimmer" style={{ aspectRatio: "1" }} />
//     <div style={{ padding: "14px" }}>
//       <div
//         className="shimmer"
//         style={{
//           height: "10px",
//           borderRadius: "4px",
//           marginBottom: "8px",
//           width: "40%",
//         }}
//       />
//       <div
//         className="shimmer"
//         style={{ height: "14px", borderRadius: "4px", marginBottom: "6px" }}
//       />
//       <div
//         className="shimmer"
//         style={{
//           height: "14px",
//           borderRadius: "4px",
//           marginBottom: "10px",
//           width: "70%",
//         }}
//       />
//       <div
//         className="shimmer"
//         style={{ height: "20px", borderRadius: "4px", width: "35%" }}
//       />
//     </div>
//   </div>
// );

// /* ════════════════════════════════
//    FEATURED PRODUCTS SECTION
// ════════════════════════════════ */
// const FeaturedProducts = () => {
//   const { featuredProducts, loading } = useSelector((s) => s.products);

//   return (
//     <section
//       style={{
//         background: "#0f1923",
//         padding: "80px 24px",
//         width: "100%",
//       }}
//     >
//       <div style={{ maxWidth: "1280px", margin: "0 auto", width: "100%" }}>
//         {/* ── Header ── */}
//         <div
//           style={{
//             display: "flex",
//             alignItems: "flex-end",
//             justifyContent: "space-between",
//             marginBottom: "40px",
//             flexWrap: "wrap",
//             gap: "12px",
//           }}
//         >
//           <div>
//             <p
//               style={{
//                 fontFamily: "DM Sans, sans-serif",
//                 fontSize: "11px",
//                 fontWeight: "600",
//                 textTransform: "uppercase",
//                 letterSpacing: "0.12em",
//                 color: "#16a34a",
//                 marginBottom: "8px",
//               }}
//             >
//               Featured
//             </p>
//             <h2
//               style={{
//                 fontFamily: "Cormorant Garamond, serif",
//                 fontSize: "clamp(28px, 4vw, 40px)",
//                 fontWeight: "600",
//                 color: "#e2e8f0",
//                 margin: 0,
//               }}
//             >
//               Our Best Products
//             </h2>
//           </div>
//           <Link
//             to="/products"
//             style={{
//               fontFamily: "DM Sans, sans-serif",
//               fontSize: "14px",
//               fontWeight: "500",
//               color: "#4ade80",
//               textDecoration: "none",
//               display: "flex",
//               alignItems: "center",
//               gap: "4px",
//               transition: "color 0.2s",
//               paddingBottom: "4px",
//             }}
//             onMouseEnter={(e) => (e.currentTarget.style.color = "#86efac")}
//             onMouseLeave={(e) => (e.currentTarget.style.color = "#4ade80")}
//           >
//             View all →
//           </Link>
//         </div>

//         {/* ── Products Grid ── */}
//         <div className="featured-grid">
//           {loading
//             ? Array(8)
//                 .fill(0)
//                 .map((_, i) => <SkeletonCard key={i} />)
//             : featuredProducts.map((p) => <ProductCard key={p._id} p={p} />)}
//         </div>
//       </div>

//       {/* ── Responsive Grid ── */}
//       <style>{`
//         /* Mobile: 2 columns */
//         .featured-grid {
//           display: grid;
//           grid-template-columns: repeat(2, 1fr);
//           gap: 12px;
//         }

//         /* Tablet: 3 columns */
//         @media (min-width: 640px) {
//           .featured-grid {
//             grid-template-columns: repeat(3, 1fr);
//             gap: 16px;
//           }
//         }

//         /* Desktop: 4 columns */
//         @media (min-width: 1024px) {
//           .featured-grid {
//             grid-template-columns: repeat(4, 1fr);
//             gap: 20px;
//           }
//         }

//         /* Large Desktop: 5 columns */
//         @media (min-width: 1280px) {
//           .featured-grid {
//             grid-template-columns: repeat(5, 1fr);
//             gap: 20px;
//           }
//         }
//       `}</style>
//     </section>
//   );
// };

// export default FeaturedProducts;

import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addToCart } from "../../redux/slices/cartSlice";
import { addToWishlist } from "../../redux/slices/wishlistSlice";
import toast from "react-hot-toast";

const Stars = ({ n }) => (
  <div style={{ display: "flex", gap: "2px" }}>
    {[1, 2, 3, 4, 5].map((s) => (
      <svg
        key={s}
        style={{ width: "12px", height: "12px" }}
        fill={s <= n ? "#c9a84c" : "#e2e8f0"}
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

/* ════════════════════════════════
   PRODUCT CARD
════════════════════════════════ */
const ProductCard = ({ p }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuth } = useSelector((s) => s.auth);
  const disc = p?.effectiveDiscountPercent || 0;

  const onCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuth) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }
    const r = await dispatch(addToCart({ productId: p._id, quantity: 1 }));
    if (r.meta.requestStatus === "fulfilled") toast.success("Added to cart 🛒");
    else toast.error(r.payload || "Failed");
  };

  const onWish = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuth) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }
    await dispatch(addToWishlist(p._id));
    toast.success("Added to wishlist ❤️");
  };

  if (!p) return null;

  return (
    <>
      <Link
        to={`/products/${p.slug}`}
        className="nb-card-link"
        style={{ textDecoration: "none", display: "block", height: "100%" }}
        onClick={() => window.scrollTo(0, 0)}
      >
        <div
          className="nb-card"
          style={{
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "16px",
            overflow: "hidden",
            transition: "all 0.3s ease",
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* ── Image ── */}
          <div
            style={{
              position: "relative",
              aspectRatio: "1",
              overflow: "hidden",
              background: "#f8fafc",
              flexShrink: 0,
            }}
          >
            <img
              src={p.images?.[0]?.url}
              alt={p.name}
              className="nb-card-img"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "transform 0.5s ease",
              }}
            />

            {/* Badges */}
            <div
              style={{
                position: "absolute",
                top: "10px",
                left: "10px",
                display: "flex",
                flexDirection: "column",
                gap: "4px",
              }}
            >
              {disc > 0 && (
                <span
                  style={{
                    background: "#ef4444",
                    color: "white",
                    fontSize: "10px",
                    fontWeight: "700",
                    padding: "2px 8px",
                    borderRadius: "20px",
                    fontFamily: "DM Sans, sans-serif",
                  }}
                >
                  -{disc}%
                </span>
              )}
              {p.isBestseller && (
                <span
                  style={{
                    background: "#fef9c3",
                    color: "#854d0e",
                    border: "1px solid #fde68a",
                    fontSize: "10px",
                    fontWeight: "600",
                    padding: "2px 8px",
                    borderRadius: "20px",
                    fontFamily: "DM Sans, sans-serif",
                  }}
                >
                  Bestseller
                </span>
              )}
              {p.isNewArrival && (
                <span
                  style={{
                    background: "#dcfce7",
                    color: "#15803d",
                    border: "1px solid #bbf7d0",
                    fontSize: "10px",
                    fontWeight: "600",
                    padding: "2px 8px",
                    borderRadius: "20px",
                    fontFamily: "DM Sans, sans-serif",
                  }}
                >
                  New
                </span>
              )}
            </div>

            {/* Wishlist Button */}
            <button
              onClick={onWish}
              className="nb-wish-btn"
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                background: "white",
                border: "1px solid #e2e8f0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "#94a3b8",
                transition: "all 0.2s",
                opacity: 0,
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#ef4444";
                e.currentTarget.style.borderColor = "#fca5a5";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#94a3b8";
                e.currentTarget.style.borderColor = "#e2e8f0";
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
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>

            {/* Quick Add */}
            <div
              className="nb-quick-add"
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                padding: "10px",
                transform: "translateY(100%)",
                transition: "transform 0.3s ease",
              }}
            >
              <button
                onClick={onCart}
                disabled={p.stock === 0}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "8px",
                  background: "#16a34a",
                  color: "white",
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: "13px",
                  fontWeight: "600",
                  border: "none",
                  cursor: p.stock === 0 ? "not-allowed" : "pointer",
                  opacity: p.stock === 0 ? 0.7 : 1,
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => {
                  if (p.stock > 0) e.currentTarget.style.opacity = "0.9";
                }}
                onMouseLeave={(e) => {
                  if (p.stock > 0) e.currentTarget.style.opacity = "1";
                }}
              >
                {p.stock === 0 ? "Out of Stock" : "Add to Cart"}
              </button>
            </div>
          </div>

          {/* ── Info ── */}
          <div
            style={{
              padding: "14px",
              flex: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <p
              style={{
                fontFamily: "DM Sans, sans-serif",
                fontSize: "10px",
                fontWeight: "600",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                color: "#16a34a",
                marginBottom: "5px",
                margin: "0 0 5px 0",
              }}
            >
              {p.category?.name}
            </p>

            <h3
              style={{
                fontFamily: "DM Sans, sans-serif",
                fontSize: "13px",
                fontWeight: "600",
                color: "#0f172a",
                margin: "0 0 4px 0",
                flex: 1,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                lineHeight: 1.4,
              }}
            >
              {p.name}
            </h3>

            {p.nameArabic && (
              <p
                style={{
                  fontFamily: "Amiri, serif",
                  fontSize: "12px",
                  color: "#94a3b8",
                  margin: "0 0 8px 0",
                }}
              >
                {p.nameArabic}
              </p>
            )}

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                marginBottom: "8px",
              }}
            >
              <Stars n={Math.round(p.ratings)} />
              <span
                style={{
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: "10px",
                  color: "#94a3b8",
                }}
              >
                ({p.numOfReviews})
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontWeight: "600",
                  fontSize: "20px",
                  color: "#16a34a",
                }}
              >
                ₹{p.price?.toLocaleString()}
              </span>
              {p.originalPrice && p.originalPrice > p.price && (
                <span
                  style={{
                    fontFamily: "DM Sans, sans-serif",
                    fontSize: "12px",
                    color: "#94a3b8",
                    textDecoration: "line-through",
                  }}
                >
                  ₹{p.originalPrice?.toLocaleString()}
                </span>
              )}
            </div>

            {p.stock <= 5 && p.stock > 0 && (
              <p
                style={{
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: "10px",
                  color: "#ef4444",
                  margin: "4px 0 0 0",
                }}
              >
                Only {p.stock} left!
              </p>
            )}
            {p.stock === 0 && (
              <p
                style={{
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: "10px",
                  color: "#ef4444",
                  fontWeight: "600",
                  margin: "4px 0 0 0",
                }}
              >
                Out of Stock
              </p>
            )}
          </div>
        </div>
      </Link>

      <style>{`
        .nb-card-link:hover .nb-card {
          border-color: #bbf7d0 !important;
          transform:    translateY(-4px) !important;
          box-shadow:   0 16px 40px rgba(22,163,74,0.12) !important;
        }
        .nb-card-link:hover .nb-card-img {
          transform: scale(1.05) !important;
        }
        .nb-card-link:hover .nb-wish-btn {
          opacity: 1 !important;
        }
        .nb-card-link:hover .nb-quick-add {
          transform: translateY(0) !important;
        }
      `}</style>
    </>
  );
};

/* ════════════════════════════════
   SKELETON CARD
════════════════════════════════ */
const SkeletonCard = () => (
  <div
    style={{
      borderRadius: "16px",
      overflow: "hidden",
      background: "#ffffff",
      border: "1px solid #e2e8f0",
    }}
  >
    <div
      className="shimmer"
      style={{
        aspectRatio: "1",
        background:
          "linear-gradient(90deg,#f0fdf4 25%,#dcfce7 50%,#f0fdf4 75%)",
        backgroundSize: "200% 100%",
      }}
    />
    <div style={{ padding: "14px" }}>
      <div
        style={{
          height: "10px",
          borderRadius: "4px",
          marginBottom: "8px",
          width: "40%",
          background: "#f0fdf4",
        }}
      />
      <div
        style={{
          height: "14px",
          borderRadius: "4px",
          marginBottom: "6px",
          background: "#f0fdf4",
        }}
      />
      <div
        style={{
          height: "14px",
          borderRadius: "4px",
          marginBottom: "10px",
          width: "70%",
          background: "#f0fdf4",
        }}
      />
      <div
        style={{
          height: "20px",
          borderRadius: "4px",
          width: "35%",
          background: "#f0fdf4",
        }}
      />
    </div>
  </div>
);

/* ════════════════════════════════
   FEATURED PRODUCTS SECTION
════════════════════════════════ */
const FeaturedProducts = () => {
  const { featuredProducts, loading } = useSelector((s) => s.products);

  return (
    <section
      style={{
        background: "#ffffff",
        padding: "80px 24px",
        width: "100%",
        borderTop: "1px solid #f0fdf4",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto", width: "100%" }}>
        {/* ── Header ── */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: "40px",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <div>
            <p
              style={{
                fontFamily: "DM Sans, sans-serif",
                fontSize: "11px",
                fontWeight: "600",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "#16a34a",
                margin: "0 0 8px 0",
              }}
            >
              Featured
            </p>
            <h2
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "clamp(28px, 4vw, 40px)",
                fontWeight: "600",
                color: "#0f172a",
                margin: 0,
              }}
            >
              Our Best Products
            </h2>
          </div>
          <Link
            to="/products"
            style={{
              fontFamily: "DM Sans, sans-serif",
              fontSize: "14px",
              fontWeight: "500",
              color: "#16a34a",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "4px",
              paddingBottom: "4px",
              transition: "color 0.2s",
              borderBottom: "1px solid #bbf7d0",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#14532d";
              e.currentTarget.style.borderBottomColor = "#16a34a";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#16a34a";
              e.currentTarget.style.borderBottomColor = "#bbf7d0";
            }}
          >
            View all →
          </Link>
        </div>

        {/* ── Products Grid ── */}
        <div className="nb-featured-grid">
          {loading
            ? Array(8)
                .fill(0)
                .map((_, i) => <SkeletonCard key={i} />)
            : featuredProducts.map((p) => <ProductCard key={p._id} p={p} />)}
        </div>
      </div>

      {/* ── Responsive Grid ── */}
      <style>{`
        .nb-featured-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }
        @media (min-width: 640px) {
          .nb-featured-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 16px;
          }
        }
        @media (min-width: 1024px) {
          .nb-featured-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
          }
        }
        @media (min-width: 1280px) {
          .nb-featured-grid {
            grid-template-columns: repeat(5, 1fr);
            gap: 20px;
          }
        }
      `}</style>
    </section>
  );
};

export default FeaturedProducts;
