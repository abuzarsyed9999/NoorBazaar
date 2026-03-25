// // import { useEffect, useState } from "react";
// // import { useSelector } from "react-redux";
// // import API from "../../services/api";
// // import toast from "react-hot-toast";

// // const Stars = ({ n, interactive = false, onSet }) => (
// //   <div className="flex gap-1">
// //     {[1, 2, 3, 4, 5].map((s) => (
// //       <button
// //         key={s}
// //         onClick={() => interactive && onSet(s)}
// //         disabled={!interactive}
// //         className={
// //           interactive
// //             ? "cursor-pointer hover:scale-110 transition-transform"
// //             : "cursor-default"
// //         }
// //       >
// //         <svg
// //           className="w-5 h-5"
// //           fill={s <= n ? "#c9a84c" : "#1e2d42"}
// //           viewBox="0 0 20 20"
// //         >
// //           <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
// //         </svg>
// //       </button>
// //     ))}
// //   </div>
// // );

// // const ProductReviews = ({ productId, numOfReviews, ratings }) => {
// //   const { isAuth } = useSelector((s) => s.auth);
// //   const [reviews, setReviews] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [rating, setRating] = useState(5);
// //   const [comment, setComment] = useState("");
// //   const [title, setTitle] = useState("");
// //   const [submitting, setSubmitting] = useState(false);

// //   useEffect(() => {
// //     if (!productId) return;
// //     setLoading(true);
// //     API.get(`/reviews/${productId}`)
// //       .then((r) => setReviews(r.data.data || []))
// //       .catch(() => {})
// //       .finally(() => setLoading(false));
// //   }, [productId]);

// //   const submitReview = async (e) => {
// //     e.preventDefault();
// //     if (!comment.trim()) {
// //       toast.error("Please write a comment");
// //       return;
// //     }
// //     setSubmitting(true);
// //     try {
// //       const { data } = await API.post(`/reviews/${productId}`, {
// //         rating,
// //         title,
// //         comment,
// //       });
// //       setReviews((p) => [data.data, ...p]);
// //       setComment("");
// //       setTitle("");
// //       setRating(5);
// //       toast.success("Review added! JazakAllah Khair 🌙");
// //     } catch (err) {
// //       toast.error(err.response?.data?.message || "Failed to submit");
// //     } finally {
// //       setSubmitting(false);
// //     }
// //   };

// //   return (
// //     <div>
// //       {/* Summary */}
// //       <div
// //         className="flex items-center gap-6 p-6 rounded-2xl mb-6"
// //         style={{
// //           background: "#162032",
// //           border: "1px solid rgba(255,255,255,0.05)",
// //         }}
// //       >
// //         <div className="text-center">
// //           <p
// //             className="font-cormorant font-semibold text-5xl"
// //             style={{ color: "#c9a84c" }}
// //           >
// //             {ratings?.toFixed(1)}
// //           </p>
// //           <Stars n={Math.round(ratings)} />
// //           <p className="font-dm text-xs mt-1" style={{ color: "#475569" }}>
// //             {numOfReviews} reviews
// //           </p>
// //         </div>
// //         <div className="flex-1">
// //           {[5, 4, 3, 2, 1].map((star) => {
// //             const count = reviews.filter((r) => r.rating === star).length;
// //             const pct = reviews.length ? (count / reviews.length) * 100 : 0;
// //             return (
// //               <div key={star} className="flex items-center gap-2 mb-1.5">
// //                 <span
// //                   className="font-dm text-xs w-2"
// //                   style={{ color: "#475569" }}
// //                 >
// //                   {star}
// //                 </span>
// //                 <svg className="w-3 h-3" fill="#c9a84c" viewBox="0 0 20 20">
// //                   <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
// //                 </svg>
// //                 <div
// //                   className="flex-1 h-1.5 rounded-full overflow-hidden"
// //                   style={{ background: "#1e2d42" }}
// //                 >
// //                   <div
// //                     className="h-full rounded-full transition-all duration-500"
// //                     style={{ width: `${pct}%`, background: "#c9a84c" }}
// //                   />
// //                 </div>
// //                 <span
// //                   className="font-dm text-[10px] w-6 text-right"
// //                   style={{ color: "#475569" }}
// //                 >
// //                   {count}
// //                 </span>
// //               </div>
// //             );
// //           })}
// //         </div>
// //       </div>

// //       {/* Add Review Form */}
// //       {isAuth && (
// //         <form
// //           onSubmit={submitReview}
// //           className="p-6 rounded-2xl mb-6"
// //           style={{
// //             background: "#162032",
// //             border: "1px solid rgba(255,255,255,0.05)",
// //           }}
// //         >
// //           <p
// //             className="font-dm font-semibold text-sm mb-4"
// //             style={{ color: "#e2e8f0" }}
// //           >
// //             Write a Review
// //           </p>
// //           <div className="mb-4">
// //             <p className="font-dm text-xs mb-2" style={{ color: "#475569" }}>
// //               Your Rating
// //             </p>
// //             <Stars n={rating} interactive onSet={setRating} />
// //           </div>
// //           <input
// //             type="text"
// //             placeholder="Review title (optional)"
// //             value={title}
// //             onChange={(e) => setTitle(e.target.value)}
// //             className="nb-input mb-3 text-sm"
// //           />
// //           <textarea
// //             placeholder="Share your experience with this product..."
// //             value={comment}
// //             onChange={(e) => setComment(e.target.value)}
// //             rows={4}
// //             className="nb-input mb-4 text-sm resize-none"
// //             required
// //           />
// //           <button
// //             type="submit"
// //             disabled={submitting}
// //             className="px-6 py-2.5 rounded-xl font-dm text-sm font-semibold text-white transition-opacity disabled:opacity-60"
// //             style={{ background: "#16a34a" }}
// //           >
// //             {submitting ? "Submitting..." : "Submit Review"}
// //           </button>
// //         </form>
// //       )}

// //       {/* Reviews List */}
// //       {loading ? (
// //         <div className="space-y-3">
// //           {Array(3)
// //             .fill(0)
// //             .map((_, i) => (
// //               <div key={i} className="p-5 rounded-2xl shimmer h-24" />
// //             ))}
// //         </div>
// //       ) : reviews.length === 0 ? (
// //         <div
// //           className="p-8 rounded-2xl text-center"
// //           style={{
// //             background: "#162032",
// //             border: "1px solid rgba(255,255,255,0.05)",
// //           }}
// //         >
// //           <p className="text-3xl mb-2">💬</p>
// //           <p className="font-dm text-sm" style={{ color: "#475569" }}>
// //             No reviews yet. Be the first to review!
// //           </p>
// //         </div>
// //       ) : (
// //         <div className="space-y-3">
// //           {reviews.map((r) => (
// //             <div
// //               key={r._id}
// //               className="p-5 rounded-2xl"
// //               style={{
// //                 background: "#162032",
// //                 border: "1px solid rgba(255,255,255,0.05)",
// //               }}
// //             >
// //               <div className="flex items-start justify-between mb-2">
// //                 <div className="flex items-center gap-3">
// //                   <div
// //                     className="w-8 h-8 rounded-lg flex items-center justify-center font-dm font-bold text-sm text-white"
// //                     style={{ background: "#16a34a" }}
// //                   >
// //                     {r.user?.name?.charAt(0).toUpperCase()}
// //                   </div>
// //                   <div>
// //                     <p
// //                       className="font-dm text-sm font-semibold"
// //                       style={{ color: "#e2e8f0" }}
// //                     >
// //                       {r.user?.name}
// //                     </p>
// //                     {r.isVerifiedPurchase && (
// //                       <span
// //                         className="font-dm text-[10px]"
// //                         style={{ color: "#4ade80" }}
// //                       >
// //                         ✅ Verified Purchase
// //                       </span>
// //                     )}
// //                   </div>
// //                 </div>
// //                 <div className="flex items-center gap-2">
// //                   <Stars n={r.rating} />
// //                   <span
// //                     className="font-dm text-[10px]"
// //                     style={{ color: "#334155" }}
// //                   >
// //                     {new Date(r.createdAt).toLocaleDateString("en-IN")}
// //                   </span>
// //                 </div>
// //               </div>
// //               {r.title && (
// //                 <p
// //                   className="font-dm text-sm font-semibold mb-1"
// //                   style={{ color: "#e2e8f0" }}
// //                 >
// //                   {r.title}
// //                 </p>
// //               )}
// //               <p
// //                 className="font-dm text-sm leading-relaxed"
// //                 style={{ color: "#64748b" }}
// //               >
// //                 {r.comment}
// //               </p>
// //             </div>
// //           ))}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default ProductReviews;

// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import API from "../../services/api";
// import toast from "react-hot-toast";

// const Stars = ({ n, interactive = false, onSet }) => (
//   <div style={{ display: "flex", gap: "4px" }}>
//     {[1, 2, 3, 4, 5].map((s) => (
//       <button
//         key={s}
//         onClick={() => interactive && onSet(s)}
//         disabled={!interactive}
//         style={{
//           background: "none",
//           border: "none",
//           padding: 0,
//           cursor: interactive ? "pointer" : "default",
//           transition: "transform 0.2s",
//         }}
//         onMouseEnter={(e) => {
//           if (interactive) e.currentTarget.style.transform = "scale(1.2)";
//         }}
//         onMouseLeave={(e) => {
//           if (interactive) e.currentTarget.style.transform = "scale(1)";
//         }}
//       >
//         <svg
//           style={{ width: "20px", height: "20px" }}
//           fill={s <= n ? "#c9a84c" : "#e2e8f0"}
//           viewBox="0 0 20 20"
//         >
//           <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//         </svg>
//       </button>
//     ))}
//   </div>
// );

// const ProductReviews = ({ productId, numOfReviews, ratings }) => {
//   const { isAuth } = useSelector((s) => s.auth);
//   const [reviews, setReviews] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [rating, setRating] = useState(5);
//   const [comment, setComment] = useState("");
//   const [title, setTitle] = useState("");
//   const [submitting, setSubmitting] = useState(false);

//   useEffect(() => {
//     if (!productId) return;
//     setLoading(true);
//     API.get(`/reviews/${productId}`)
//       .then((r) => setReviews(r.data.data || []))
//       .catch(() => {})
//       .finally(() => setLoading(false));
//   }, [productId]);

//   const submitReview = async (e) => {
//     e.preventDefault();
//     if (!comment.trim()) {
//       toast.error("Please write a comment");
//       return;
//     }
//     setSubmitting(true);
//     try {
//       const { data } = await API.post(`/reviews/${productId}`, {
//         rating,
//         title,
//         comment,
//       });
//       setReviews((p) => [data.data, ...p]);
//       setComment("");
//       setTitle("");
//       setRating(5);
//       toast.success("Review added! JazakAllah Khair 🌙");
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to submit");
//     } finally {
//       setSubmitting(false);
//     }
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

//   return (
//     <div>
//       {/* ── Rating Summary ── */}
//       <div
//         style={{
//           display: "flex",
//           alignItems: "center",
//           gap: "clamp(16px, 3vw, 32px)",
//           padding: "clamp(16px, 3vw, 24px)",
//           borderRadius: "16px",
//           background: "#ffffff",
//           border: "1px solid #e2e8f0",
//           marginBottom: "20px",
//           flexWrap: "wrap",
//         }}
//       >
//         <div style={{ textAlign: "center", flexShrink: 0 }}>
//           <p
//             style={{
//               fontFamily: "Cormorant Garamond, serif",
//               fontWeight: "700",
//               fontSize: "clamp(36px, 5vw, 52px)",
//               color: "#c9a84c",
//               margin: 0,
//               lineHeight: 1,
//             }}
//           >
//             {ratings?.toFixed(1)}
//           </p>
//           <div style={{ marginTop: "6px" }}>
//             <Stars n={Math.round(ratings)} />
//           </div>
//           <p
//             style={{
//               fontFamily: "DM Sans, sans-serif",
//               fontSize: "12px",
//               color: "#94a3b8",
//               margin: "4px 0 0 0",
//             }}
//           >
//             {numOfReviews} reviews
//           </p>
//         </div>

//         {/* Bar Chart */}
//         <div style={{ flex: 1, minWidth: "160px" }}>
//           {[5, 4, 3, 2, 1].map((star) => {
//             const count = reviews.filter((r) => r.rating === star).length;
//             const pct = reviews.length ? (count / reviews.length) * 100 : 0;
//             return (
//               <div
//                 key={star}
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   gap: "8px",
//                   marginBottom: "6px",
//                 }}
//               >
//                 <span
//                   style={{
//                     fontFamily: "DM Sans",
//                     fontSize: "11px",
//                     color: "#64748b",
//                     width: "8px",
//                   }}
//                 >
//                   {star}
//                 </span>
//                 <svg
//                   style={{ width: "12px", height: "12px", flexShrink: 0 }}
//                   fill="#c9a84c"
//                   viewBox="0 0 20 20"
//                 >
//                   <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                 </svg>
//                 <div
//                   style={{
//                     flex: 1,
//                     height: "6px",
//                     borderRadius: "4px",
//                     background: "#f0f0f0",
//                     overflow: "hidden",
//                   }}
//                 >
//                   <div
//                     style={{
//                       height: "100%",
//                       width: `${pct}%`,
//                       background: "#c9a84c",
//                       borderRadius: "4px",
//                       transition: "width 0.5s ease",
//                     }}
//                   />
//                 </div>
//                 <span
//                   style={{
//                     fontFamily: "DM Sans",
//                     fontSize: "10px",
//                     color: "#94a3b8",
//                     width: "20px",
//                     textAlign: "right",
//                   }}
//                 >
//                   {count}
//                 </span>
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* ── Write Review ── */}
//       {isAuth && (
//         <form
//           onSubmit={submitReview}
//           style={{
//             padding: "clamp(16px, 3vw, 24px)",
//             borderRadius: "16px",
//             background: "#ffffff",
//             border: "1px solid #e2e8f0",
//             marginBottom: "20px",
//           }}
//         >
//           <p
//             style={{
//               fontFamily: "DM Sans, sans-serif",
//               fontSize: "15px",
//               fontWeight: "700",
//               color: "#0f172a",
//               margin: "0 0 16px 0",
//             }}
//           >
//             Write a Review
//           </p>

//           <div style={{ marginBottom: "14px" }}>
//             <p
//               style={{
//                 fontFamily: "DM Sans",
//                 fontSize: "12px",
//                 color: "#64748b",
//                 margin: "0 0 8px 0",
//               }}
//             >
//               Your Rating
//             </p>
//             <Stars n={rating} interactive onSet={setRating} />
//           </div>

//           <input
//             type="text"
//             placeholder="Review title (optional)"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             style={{ ...inputStyle, marginBottom: "10px" }}
//             onFocus={(e) => (e.currentTarget.style.borderColor = "#16a34a")}
//             onBlur={(e) => (e.currentTarget.style.borderColor = "#e2e8f0")}
//           />

//           <textarea
//             placeholder="Share your experience with this product..."
//             value={comment}
//             onChange={(e) => setComment(e.target.value)}
//             rows={4}
//             required
//             style={{
//               ...inputStyle,
//               marginBottom: "14px",
//               resize: "vertical",
//               minHeight: "100px",
//             }}
//             onFocus={(e) => (e.currentTarget.style.borderColor = "#16a34a")}
//             onBlur={(e) => (e.currentTarget.style.borderColor = "#e2e8f0")}
//           />

//           <button
//             type="submit"
//             disabled={submitting}
//             style={{
//               padding: "10px 24px",
//               borderRadius: "10px",
//               background: "#16a34a",
//               color: "white",
//               fontFamily: "DM Sans, sans-serif",
//               fontSize: "14px",
//               fontWeight: "600",
//               border: "none",
//               cursor: submitting ? "not-allowed" : "pointer",
//               opacity: submitting ? 0.7 : 1,
//               transition: "all 0.2s",
//             }}
//             onMouseEnter={(e) => {
//               if (!submitting) e.currentTarget.style.background = "#15803d";
//             }}
//             onMouseLeave={(e) => {
//               if (!submitting) e.currentTarget.style.background = "#16a34a";
//             }}
//           >
//             {submitting ? "Submitting..." : "Submit Review"}
//           </button>
//         </form>
//       )}

//       {/* ── Reviews List ── */}
//       {loading ? (
//         <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
//           {Array(3)
//             .fill(0)
//             .map((_, i) => (
//               <div
//                 key={i}
//                 style={{
//                   height: "100px",
//                   borderRadius: "16px",
//                   background:
//                     "linear-gradient(90deg,#f0fdf4 25%,#dcfce7 50%,#f0fdf4 75%)",
//                   backgroundSize: "200% 100%",
//                   animation: "shimmer 1.5s infinite",
//                 }}
//               />
//             ))}
//         </div>
//       ) : reviews.length === 0 ? (
//         <div
//           style={{
//             padding: "40px",
//             borderRadius: "16px",
//             background: "#ffffff",
//             border: "1px solid #e2e8f0",
//             textAlign: "center",
//           }}
//         >
//           <p style={{ fontSize: "32px", margin: "0 0 8px 0" }}>💬</p>
//           <p
//             style={{
//               fontFamily: "DM Sans, sans-serif",
//               fontSize: "14px",
//               color: "#94a3b8",
//               margin: 0,
//             }}
//           >
//             No reviews yet. Be the first to review!
//           </p>
//         </div>
//       ) : (
//         <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
//           {reviews.map((r) => (
//             <div
//               key={r._id}
//               style={{
//                 padding: "clamp(14px, 2vw, 20px)",
//                 borderRadius: "16px",
//                 background: "#ffffff",
//                 border: "1px solid #e2e8f0",
//                 transition: "border-color 0.2s",
//               }}
//               onMouseEnter={(e) =>
//                 (e.currentTarget.style.borderColor = "#bbf7d0")
//               }
//               onMouseLeave={(e) =>
//                 (e.currentTarget.style.borderColor = "#e2e8f0")
//               }
//             >
//               {/* Review Header */}
//               <div
//                 style={{
//                   display: "flex",
//                   alignItems: "flex-start",
//                   justifyContent: "space-between",
//                   marginBottom: "10px",
//                   flexWrap: "wrap",
//                   gap: "8px",
//                 }}
//               >
//                 <div
//                   style={{ display: "flex", alignItems: "center", gap: "10px" }}
//                 >
//                   <div
//                     style={{
//                       width: "36px",
//                       height: "36px",
//                       borderRadius: "10px",
//                       background: "linear-gradient(135deg,#16a34a,#14532d)",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       color: "white",
//                       fontFamily: "DM Sans, sans-serif",
//                       fontWeight: "700",
//                       fontSize: "14px",
//                       flexShrink: 0,
//                     }}
//                   >
//                     {r.user?.name?.charAt(0).toUpperCase()}
//                   </div>
//                   <div>
//                     <p
//                       style={{
//                         fontFamily: "DM Sans, sans-serif",
//                         fontSize: "14px",
//                         fontWeight: "600",
//                         color: "#0f172a",
//                         margin: 0,
//                       }}
//                     >
//                       {r.user?.name}
//                     </p>
//                     {r.isVerifiedPurchase && (
//                       <span
//                         style={{
//                           fontFamily: "DM Sans, sans-serif",
//                           fontSize: "10px",
//                           color: "#16a34a",
//                           fontWeight: "600",
//                         }}
//                       >
//                         ✅ Verified Purchase
//                       </span>
//                     )}
//                   </div>
//                 </div>
//                 <div
//                   style={{ display: "flex", alignItems: "center", gap: "8px" }}
//                 >
//                   <Stars n={r.rating} />
//                   <span
//                     style={{
//                       fontFamily: "DM Sans, sans-serif",
//                       fontSize: "11px",
//                       color: "#94a3b8",
//                     }}
//                   >
//                     {new Date(r.createdAt).toLocaleDateString("en-IN")}
//                   </span>
//                 </div>
//               </div>

//               {r.title && (
//                 <p
//                   style={{
//                     fontFamily: "DM Sans, sans-serif",
//                     fontSize: "14px",
//                     fontWeight: "600",
//                     color: "#0f172a",
//                     margin: "0 0 6px 0",
//                   }}
//                 >
//                   {r.title}
//                 </p>
//               )}
//               <p
//                 style={{
//                   fontFamily: "DM Sans, sans-serif",
//                   fontSize: "14px",
//                   color: "#64748b",
//                   lineHeight: 1.6,
//                   margin: 0,
//                 }}
//               >
//                 {r.comment}
//               </p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductReviews;
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import API from "../../services/api";
import toast from "react-hot-toast";

// ── Star Component ──
const Stars = ({ n, interactive = false, onSet, size = 20 }) => (
  <div style={{ display: "flex", gap: "3px" }}>
    {[1, 2, 3, 4, 5].map((s) => (
      <button
        key={s}
        type="button"
        onClick={() => interactive && onSet(s)}
        disabled={!interactive}
        style={{
          background: "none",
          border: "none",
          padding: "1px",
          cursor: interactive ? "pointer" : "default",
          transition: "transform 0.15s",
          lineHeight: 0,
        }}
        onMouseEnter={(e) => {
          if (interactive) e.currentTarget.style.transform = "scale(1.2)";
        }}
        onMouseLeave={(e) => {
          if (interactive) e.currentTarget.style.transform = "scale(1)";
        }}
      >
        <svg
          style={{ width: `${size}px`, height: `${size}px` }}
          fill={s <= n ? "#f59e0b" : "#e2e8f0"}
          viewBox="0 0 24 24"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      </button>
    ))}
  </div>
);

const ProductReviews = ({ productId, numOfReviews, ratings }) => {
  const { isAuth, user } = useSelector((s) => s.auth);

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [title, setTitle] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [lightbox, setLightbox] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [filterStar, setFilterStar] = useState(0);
  const [sortBy, setSortBy] = useState("-createdAt");
  const [userReview, setUserReview] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const ratingLabels = {
    1: "Poor 😞",
    2: "Fair 😐",
    3: "Good 😊",
    4: "Very Good 😄",
    5: "Excellent 🌟",
  };

  // ── Fetch Reviews ──
  useEffect(() => {
    if (!productId) return;
    fetchReviews();
  }, [productId, filterStar, sortBy]);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const { data } = await API.get(
        `/reviews/${productId}?rating=${filterStar}&sort=${sortBy}`,
      );
      setReviews(data.data || []);
      setUserReview(data.userReview || null);
    } catch {
      // silent fail
    } finally {
      setLoading(false);
    }
  };

  // ── Image Handling ──
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (images.length + files.length > 4) {
      toast.error("Maximum 4 images allowed");
      return;
    }
    const valid = files.filter((f) => {
      if (f.size > 5 * 1024 * 1024) {
        toast.error(`${f.name} exceeds 5MB`);
        return false;
      }
      return true;
    });
    setImages((prev) => [...prev, ...valid]);
    setPreviews((prev) => [
      ...prev,
      ...valid.map((f) => URL.createObjectURL(f)),
    ]);
  };

  const removeImage = (idx) => {
    URL.revokeObjectURL(previews[idx]);
    setImages((prev) => prev.filter((_, i) => i !== idx));
    setPreviews((prev) => prev.filter((_, i) => i !== idx));
  };

  const resetForm = () => {
    setRating(5);
    setTitle("");
    setComment("");
    setImages([]);
    setPreviews([]);
    setEditMode(false);
    previews.forEach((url) => URL.revokeObjectURL(url));
  };

  // ── Submit Review (CREATE or UPDATE) ──
  const submitReview = async (e) => {
    e.preventDefault();

    // Guard: productId must be present
    if (!productId) {
      toast.error("Product information is missing. Cannot submit review.");
      return;
    }

    if (!rating) {
      toast.error("Please select a star rating");
      return;
    }
    if (!comment.trim()) {
      toast.error("Please write your review");
      return;
    }
    if (comment.trim().length < 10) {
      toast.error("Review must be at least 10 characters");
      return;
    }

    setSubmitting(true);
    try {
      const formData = new FormData();
      // ✅ Do NOT send productId in body – it's in the URL
      formData.append("rating", rating);
      formData.append("title", title.trim());
      formData.append("comment", comment.trim());
      images.forEach((img) => formData.append("images", img));

      if (editMode && userReview) {
        // ✅ Update existing review
        const { data } = await API.put(`/reviews/${userReview._id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setReviews((prev) =>
          prev.map((r) => (r._id === data.data._id ? data.data : r)),
        );
        setUserReview(data.data);
        toast.success("Review updated! 🌙");
      } else {
        // ✅ Create new review – use productId in URL
        const { data } = await API.post(`/reviews/${productId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setReviews((prev) => [data.data, ...prev]);
        setUserReview(data.data);
        toast.success("Review submitted! JazakAllah Khair 🌙");
      }

      resetForm();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to submit review");
    } finally {
      setSubmitting(false);
    }
  };

  // ── Delete Review ──
  const handleDelete = async (reviewId) => {
    if (!window.confirm("Delete your review?")) return;
    setDeleting(reviewId);
    try {
      await API.delete(`/reviews/${reviewId}`);
      setReviews((prev) => prev.filter((r) => r._id !== reviewId));
      setUserReview(null);
      toast.success("Review deleted");
    } catch {
      toast.error("Failed to delete review");
    } finally {
      setDeleting(null);
    }
  };

  // ── Helpful Vote ──
  const handleHelpful = async (reviewId) => {
    if (!isAuth) {
      toast.error("Please login to vote");
      return;
    }
    try {
      const { data } = await API.put(`/reviews/${reviewId}/helpful`);
      setReviews((prev) =>
        prev.map((r) =>
          r._id === reviewId
            ? { ...r, helpfulVotes: Array(data.helpfulCount).fill(null) }
            : r,
        ),
      );
    } catch {
      toast.error("Failed to vote");
    }
  };

  const avgRating = ratings || 0;
  const totalReviews = numOfReviews || reviews.length || 0;

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

  return (
    <div id="reviews-section" style={{ marginTop: "48px" }}>
      {/* ── Section Header ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "12px",
          marginBottom: "24px",
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
            Customer Reviews
          </p>
          <h2
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "clamp(22px,3vw,28px)",
              fontWeight: "600",
              color: "#0f172a",
              margin: 0,
            }}
          >
            Reviews & Ratings ⭐
          </h2>
        </div>
        {isAuth && !userReview && (
          <button
            onClick={() => {
              setEditMode(false);
              document
                .getElementById("review-form")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            style={{
              padding: "10px 20px",
              borderRadius: "10px",
              background: "#16a34a",
              color: "white",
              fontFamily: "DM Sans",
              fontSize: "13px",
              fontWeight: "600",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(22,163,74,0.25)",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#15803d")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#16a34a")}
          >
            ✍️ Write a Review
          </button>
        )}
      </div>

      {/* ── Rating Summary ── */}
      {totalReviews > 0 && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "clamp(16px,3vw,32px)",
            padding: "clamp(16px,3vw,24px)",
            borderRadius: "16px",
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            marginBottom: "20px",
            flexWrap: "wrap",
          }}
        >
          {/* Average Score */}
          <div style={{ textAlign: "center", flexShrink: 0 }}>
            <p
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontWeight: "700",
                fontSize: "clamp(40px,6vw,56px)",
                color: "#f59e0b",
                margin: "0 0 4px 0",
                lineHeight: 1,
              }}
            >
              {avgRating.toFixed(1)}
            </p>
            <Stars n={Math.round(avgRating)} />
            <p
              style={{
                fontFamily: "DM Sans",
                fontSize: "12px",
                color: "#94a3b8",
                margin: "4px 0 0 0",
              }}
            >
              {totalReviews} review{totalReviews !== 1 ? "s" : ""}
            </p>
          </div>

          {/* Divider */}
          <div
            style={{
              width: "1px",
              height: "60px",
              background: "#e2e8f0",
              flexShrink: 0,
            }}
            className="review-divider"
          />

          {/* Star Breakdown */}
          <div style={{ flex: 1, minWidth: "160px" }}>
            {[5, 4, 3, 2, 1].map((star) => {
              const count = reviews.filter((r) => r.rating === star).length;
              const percent = reviews.length
                ? (count / reviews.length) * 100
                : 0;
              return (
                <div
                  key={star}
                  onClick={() => setFilterStar(filterStar === star ? 0 : star)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "6px",
                    cursor: "pointer",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "DM Sans",
                      fontSize: "11px",
                      color: "#64748b",
                      width: "8px",
                      flexShrink: 0,
                    }}
                  >
                    {star}
                  </span>
                  <svg
                    style={{ width: "11px", height: "11px", flexShrink: 0 }}
                    fill="#f59e0b"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <div
                    style={{
                      flex: 1,
                      height: "6px",
                      borderRadius: "4px",
                      background: "#f0f0f0",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${percent}%`,
                        background: filterStar === star ? "#16a34a" : "#f59e0b",
                        borderRadius: "4px",
                        transition: "width 0.5s ease",
                      }}
                    />
                  </div>
                  <span
                    style={{
                      fontFamily: "DM Sans",
                      fontSize: "10px",
                      color: "#94a3b8",
                      width: "20px",
                      textAlign: "right",
                      flexShrink: 0,
                    }}
                  >
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Filter & Sort Bar ── */}
      {reviews.length > 0 && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "10px",
            marginBottom: "16px",
          }}
        >
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {[0, 5, 4, 3, 2, 1].map((star) => (
              <button
                key={star}
                onClick={() => setFilterStar(star)}
                style={{
                  padding: "5px 12px",
                  borderRadius: "20px",
                  fontFamily: "DM Sans",
                  fontSize: "12px",
                  fontWeight: "600",
                  cursor: "pointer",
                  background: filterStar === star ? "#16a34a" : "#f8fafc",
                  color: filterStar === star ? "white" : "#64748b",
                  border: `1px solid ${
                    filterStar === star ? "#16a34a" : "#e2e8f0"
                  }`,
                  transition: "all 0.2s",
                }}
              >
                {star === 0 ? "All" : `${star}★`}
              </button>
            ))}
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              padding: "6px 12px",
              borderRadius: "8px",
              fontFamily: "DM Sans",
              fontSize: "12px",
              color: "#64748b",
              border: "1px solid #e2e8f0",
              background: "#f8fafc",
              outline: "none",
              cursor: "pointer",
            }}
          >
            <option value="-createdAt">Newest First</option>
            <option value="createdAt">Oldest First</option>
            <option value="-rating">Highest Rated</option>
            <option value="rating">Lowest Rated</option>
          </select>
        </div>
      )}

      {/* ── Write / Edit Review Form ── */}
      {isAuth && (!userReview || editMode) && (
        <form
          id="review-form"
          onSubmit={submitReview}
          style={{
            padding: "clamp(16px,3vw,24px)",
            borderRadius: "16px",
            background: "#ffffff",
            border: "1px solid #bbf7d0",
            marginBottom: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          {/* Form Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <p
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "20px",
                fontWeight: "600",
                color: "#0f172a",
                margin: 0,
              }}
            >
              {editMode ? "Edit Your Review ✏️" : "Write a Review 🌙"}
            </p>
            {editMode && (
              <button
                type="button"
                onClick={resetForm}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#94a3b8",
                  fontSize: "18px",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#ef4444")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#94a3b8")}
              >
                ✕
              </button>
            )}
          </div>

          {/* Star Rating */}
          <div>
            <p
              style={{
                fontFamily: "DM Sans",
                fontSize: "12px",
                fontWeight: "600",
                color: "#64748b",
                margin: "0 0 8px 0",
              }}
            >
              Your Rating *
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ display: "flex", gap: "4px" }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: "1px",
                      transition: "transform 0.1s",
                    }}
                    onMouseDown={(e) =>
                      (e.currentTarget.style.transform = "scale(0.85)")
                    }
                    onMouseUp={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                  >
                    <svg
                      style={{
                        width: "30px",
                        height: "30px",
                        transition: "fill 0.15s",
                        fill: (hover || rating) >= star ? "#f59e0b" : "#e2e8f0",
                      }}
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </button>
                ))}
              </div>
              {(hover || rating) > 0 && (
                <span
                  style={{
                    fontFamily: "DM Sans",
                    fontSize: "13px",
                    fontWeight: "600",
                    color: "#f59e0b",
                  }}
                >
                  {ratingLabels[hover || rating]}
                </span>
              )}
            </div>
          </div>

          {/* Title */}
          <div>
            <p
              style={{
                fontFamily: "DM Sans",
                fontSize: "12px",
                fontWeight: "600",
                color: "#64748b",
                margin: "0 0 6px 0",
              }}
            >
              Review Title{" "}
              <span style={{ color: "#94a3b8", fontWeight: "400" }}>
                (optional)
              </span>
            </p>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Summarize your experience"
              maxLength={100}
              style={inputStyle}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#16a34a")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#e2e8f0")}
            />
            <p
              style={{
                fontFamily: "DM Sans",
                fontSize: "10px",
                color: "#94a3b8",
                margin: "2px 0 0 0",
                textAlign: "right",
              }}
            >
              {title.length}/100
            </p>
          </div>

          {/* Comment */}
          <div>
            <p
              style={{
                fontFamily: "DM Sans",
                fontSize: "12px",
                fontWeight: "600",
                color: "#64748b",
                margin: "0 0 6px 0",
              }}
            >
              Your Review *
            </p>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your honest experience. What did you like or dislike?"
              rows={4}
              maxLength={1000}
              required
              style={{
                ...inputStyle,
                resize: "vertical",
                minHeight: "100px",
                lineHeight: 1.6,
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#16a34a")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#e2e8f0")}
            />
            <p
              style={{
                fontFamily: "DM Sans",
                fontSize: "10px",
                color: comment.length >= 900 ? "#ef4444" : "#94a3b8",
                margin: "2px 0 0 0",
                textAlign: "right",
              }}
            >
              {comment.length}/1000
            </p>
          </div>

          {/* Image Upload */}
          <div>
            <p
              style={{
                fontFamily: "DM Sans",
                fontSize: "12px",
                fontWeight: "600",
                color: "#64748b",
                margin: "0 0 8px 0",
              }}
            >
              Add Photos{" "}
              <span style={{ color: "#94a3b8", fontWeight: "400" }}>
                (up to 4, 5MB each)
              </span>
            </p>

            {/* Previews */}
            {previews.length > 0 && (
              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  flexWrap: "wrap",
                  marginBottom: "10px",
                }}
              >
                {previews.map((url, idx) => (
                  <div
                    key={idx}
                    style={{
                      position: "relative",
                      width: "72px",
                      height: "72px",
                    }}
                  >
                    <img
                      src={url}
                      alt=""
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "8px",
                        border: "1px solid #e2e8f0",
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      style={{
                        position: "absolute",
                        top: "-6px",
                        right: "-6px",
                        width: "18px",
                        height: "18px",
                        borderRadius: "50%",
                        background: "#ef4444",
                        border: "none",
                        color: "white",
                        cursor: "pointer",
                        fontSize: "10px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      ✕
                    </button>
                  </div>
                ))}
                {previews.length < 4 && (
                  <label
                    style={{
                      width: "72px",
                      height: "72px",
                      borderRadius: "8px",
                      border: "2px dashed #e2e8f0",
                      background: "#f8fafc",
                      cursor: "pointer",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "3px",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "#16a34a";
                      e.currentTarget.style.background = "#f0fdf4";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "#e2e8f0";
                      e.currentTarget.style.background = "#f8fafc";
                    }}
                  >
                    <span style={{ fontSize: "18px" }}>📷</span>
                    <span
                      style={{
                        fontFamily: "DM Sans",
                        fontSize: "9px",
                        color: "#94a3b8",
                      }}
                    >
                      Add
                    </span>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageChange}
                      style={{ display: "none" }}
                    />
                  </label>
                )}
              </div>
            )}

            {/* Upload Area */}
            {previews.length === 0 && (
              <label
                style={{
                  display: "block",
                  padding: "20px",
                  border: "2px dashed #e2e8f0",
                  borderRadius: "12px",
                  background: "#f8fafc",
                  cursor: "pointer",
                  textAlign: "center",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#16a34a";
                  e.currentTarget.style.background = "#f0fdf4";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#e2e8f0";
                  e.currentTarget.style.background = "#f8fafc";
                }}
              >
                <div style={{ fontSize: "28px", marginBottom: "6px" }}>📷</div>
                <p
                  style={{
                    fontFamily: "DM Sans",
                    fontSize: "13px",
                    fontWeight: "600",
                    color: "#64748b",
                    margin: "0 0 2px 0",
                  }}
                >
                  Click to upload photos
                </p>
                <p
                  style={{
                    fontFamily: "DM Sans",
                    fontSize: "11px",
                    color: "#94a3b8",
                    margin: 0,
                  }}
                >
                  PNG, JPG up to 5MB · Max 4 photos
                </p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
              </label>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting}
            style={{
              padding: "12px 24px",
              borderRadius: "12px",
              background: submitting ? "#86efac" : "#16a34a",
              color: "white",
              fontFamily: "DM Sans",
              fontSize: "14px",
              fontWeight: "600",
              border: "none",
              cursor: submitting ? "not-allowed" : "pointer",
              transition: "all 0.2s",
              boxShadow: submitting
                ? "none"
                : "0 4px 12px rgba(22,163,74,0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              alignSelf: "flex-start",
            }}
            onMouseEnter={(e) => {
              if (!submitting) e.currentTarget.style.background = "#15803d";
            }}
            onMouseLeave={(e) => {
              if (!submitting) e.currentTarget.style.background = "#16a34a";
            }}
          >
            {submitting ? (
              <>
                <div
                  style={{
                    width: "14px",
                    height: "14px",
                    borderRadius: "50%",
                    border: "2px solid rgba(255,255,255,0.4)",
                    borderTopColor: "white",
                    animation: "spin 0.6s linear infinite",
                  }}
                />
                Submitting...
              </>
            ) : editMode ? (
              "✅ Update Review"
            ) : (
              "🌙 Submit Review"
            )}
          </button>
        </form>
      )}

      {/* ── Reviews List ── */}
      {loading ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                style={{
                  height: "120px",
                  borderRadius: "16px",
                  background:
                    "linear-gradient(90deg,#f0fdf4 25%,#dcfce7 50%,#f0fdf4 75%)",
                  backgroundSize: "200% 100%",
                  animation: "shimmer 1.5s infinite",
                }}
              />
            ))}
        </div>
      ) : reviews.length === 0 ? (
        <div
          style={{
            padding: "48px 24px",
            borderRadius: "16px",
            background: "#f8fafc",
            border: "1px dashed #e2e8f0",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "48px", marginBottom: "12px" }}>⭐</div>
          <h3
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "22px",
              color: "#0f172a",
              margin: "0 0 8px 0",
            }}
          >
            {filterStar > 0
              ? `No ${filterStar}★ reviews yet`
              : "No Reviews Yet"}
          </h3>
          <p
            style={{
              fontFamily: "DM Sans",
              fontSize: "14px",
              color: "#64748b",
              margin: 0,
            }}
          >
            {filterStar > 0
              ? "Try a different rating filter"
              : "Be the first to review this product!"}
          </p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {reviews.map((r) => {
            const isOwn = user?._id === r.user?._id;
            const isDeleting = deleting === r._id;

            return (
              <div
                key={r._id}
                style={{
                  padding: "clamp(14px,2vw,20px)",
                  borderRadius: "14px",
                  background: "white",
                  border: isOwn ? "1px solid #bbf7d0" : "1px solid #e2e8f0",
                  transition: "box-shadow 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.boxShadow =
                    "0 4px 16px rgba(0,0,0,0.05)")
                }
                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
              >
                {/* Review Header */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: "10px",
                    flexWrap: "wrap",
                    marginBottom: "10px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    {/* Avatar */}
                    <div
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "50%",
                        background: "linear-gradient(135deg,#16a34a,#14532d)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        fontFamily: "DM Sans",
                        fontSize: "14px",
                        fontWeight: "700",
                        flexShrink: 0,
                      }}
                    >
                      {r.user?.name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
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
                          {r.user?.name}
                        </p>
                        {r.isVerifiedPurchase && (
                          <span
                            style={{
                              fontFamily: "DM Sans",
                              fontSize: "10px",
                              fontWeight: "600",
                              padding: "2px 6px",
                              borderRadius: "20px",
                              background: "#f0fdf4",
                              color: "#16a34a",
                              border: "1px solid #bbf7d0",
                            }}
                          >
                            ✅ Verified
                          </span>
                        )}
                        {isOwn && (
                          <span
                            style={{
                              fontFamily: "DM Sans",
                              fontSize: "10px",
                              fontWeight: "600",
                              padding: "2px 6px",
                              borderRadius: "20px",
                              background: "#eff6ff",
                              color: "#1d4ed8",
                              border: "1px solid #bfdbfe",
                            }}
                          >
                            You
                          </span>
                        )}
                        {r.isEdited && (
                          <span
                            style={{
                              fontFamily: "DM Sans",
                              fontSize: "10px",
                              color: "#94a3b8",
                            }}
                          >
                            (edited)
                          </span>
                        )}
                      </div>
                      <p
                        style={{
                          fontFamily: "DM Sans",
                          fontSize: "11px",
                          color: "#94a3b8",
                          margin: 0,
                        }}
                      >
                        {new Date(r.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  <Stars n={r.rating} size={15} />
                </div>

                {/* Title */}
                {r.title && (
                  <p
                    style={{
                      fontFamily: "DM Sans",
                      fontSize: "14px",
                      fontWeight: "700",
                      color: "#0f172a",
                      margin: "0 0 6px 0",
                    }}
                  >
                    {r.title}
                  </p>
                )}

                {/* Comment */}
                <p
                  style={{
                    fontFamily: "DM Sans",
                    fontSize: "14px",
                    color: "#475569",
                    margin: "0 0 10px 0",
                    lineHeight: 1.6,
                  }}
                >
                  {r.comment}
                </p>

                {/* Images */}
                {r.images?.length > 0 && (
                  <div
                    style={{
                      display: "flex",
                      gap: "8px",
                      flexWrap: "wrap",
                      marginBottom: "12px",
                    }}
                  >
                    {r.images.map((img, i) => (
                      <img
                        key={i}
                        src={img.url}
                        alt={`Review photo ${i + 1}`}
                        onClick={() => setLightbox(img.url)}
                        style={{
                          width: "64px",
                          height: "64px",
                          objectFit: "cover",
                          borderRadius: "8px",
                          border: "1px solid #e2e8f0",
                          cursor: "pointer",
                          transition: "opacity 0.2s",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.opacity = "0.8")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.opacity = "1")
                        }
                      />
                    ))}
                  </div>
                )}

                {/* Footer */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: "8px",
                  }}
                >
                  <button
                    onClick={() => handleHelpful(r._id)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "5px 12px",
                      borderRadius: "8px",
                      fontFamily: "DM Sans",
                      fontSize: "12px",
                      cursor: "pointer",
                      background: "transparent",
                      border: "1px solid #e2e8f0",
                      color: "#64748b",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "#16a34a";
                      e.currentTarget.style.color = "#16a34a";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "#e2e8f0";
                      e.currentTarget.style.color = "#64748b";
                    }}
                  >
                    👍 Helpful ({r.helpfulVotes?.length || 0})
                  </button>

                  {isOwn && (
                    <div style={{ display: "flex", gap: "6px" }}>
                      <button
                        onClick={() => {
                          setEditMode(true);
                          setRating(r.rating);
                          setTitle(r.title || "");
                          setComment(r.comment);
                          setPreviews(r.images?.map((img) => img.url) || []);
                          document
                            .getElementById("review-form")
                            ?.scrollIntoView({ behavior: "smooth" });
                        }}
                        style={{
                          padding: "5px 12px",
                          borderRadius: "8px",
                          fontFamily: "DM Sans",
                          fontSize: "12px",
                          fontWeight: "600",
                          cursor: "pointer",
                          background: "#f0fdf4",
                          border: "1px solid #bbf7d0",
                          color: "#16a34a",
                          transition: "background 0.2s",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.background = "#dcfce7")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.background = "#f0fdf4")
                        }
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleDelete(r._id)}
                        disabled={isDeleting}
                        style={{
                          padding: "5px 12px",
                          borderRadius: "8px",
                          fontFamily: "DM Sans",
                          fontSize: "12px",
                          fontWeight: "600",
                          cursor: "pointer",
                          background: "#fff5f5",
                          border: "1px solid #fca5a5",
                          color: "#dc2626",
                          opacity: isDeleting ? 0.6 : 1,
                          transition: "background 0.2s",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.background = "#fee2e2")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.background = "#fff5f5")
                        }
                      >
                        {isDeleting ? "..." : "🗑️ Delete"}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Lightbox ── */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "rgba(0,0,0,0.85)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
          }}
        >
          <button
            onClick={() => setLightbox(null)}
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.15)",
              border: "none",
              color: "white",
              fontSize: "18px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ✕
          </button>
          <img
            src={lightbox}
            alt="Review"
            style={{
              maxWidth: "90vw",
              maxHeight: "85vh",
              borderRadius: "12px",
              objectFit: "contain",
            }}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <style>{`
        @keyframes shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @media (max-width: 480px) {
          .review-divider { display: none; }
        }
      `}</style>
    </div>
  );
};

export default ProductReviews;
