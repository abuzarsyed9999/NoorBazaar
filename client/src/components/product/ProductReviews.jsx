// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import API from "../../services/api";
// import toast from "react-hot-toast";

// const Stars = ({ n, interactive = false, onSet }) => (
//   <div className="flex gap-1">
//     {[1, 2, 3, 4, 5].map((s) => (
//       <button
//         key={s}
//         onClick={() => interactive && onSet(s)}
//         disabled={!interactive}
//         className={
//           interactive
//             ? "cursor-pointer hover:scale-110 transition-transform"
//             : "cursor-default"
//         }
//       >
//         <svg
//           className="w-5 h-5"
//           fill={s <= n ? "#c9a84c" : "#1e2d42"}
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

//   return (
//     <div>
//       {/* Summary */}
//       <div
//         className="flex items-center gap-6 p-6 rounded-2xl mb-6"
//         style={{
//           background: "#162032",
//           border: "1px solid rgba(255,255,255,0.05)",
//         }}
//       >
//         <div className="text-center">
//           <p
//             className="font-cormorant font-semibold text-5xl"
//             style={{ color: "#c9a84c" }}
//           >
//             {ratings?.toFixed(1)}
//           </p>
//           <Stars n={Math.round(ratings)} />
//           <p className="font-dm text-xs mt-1" style={{ color: "#475569" }}>
//             {numOfReviews} reviews
//           </p>
//         </div>
//         <div className="flex-1">
//           {[5, 4, 3, 2, 1].map((star) => {
//             const count = reviews.filter((r) => r.rating === star).length;
//             const pct = reviews.length ? (count / reviews.length) * 100 : 0;
//             return (
//               <div key={star} className="flex items-center gap-2 mb-1.5">
//                 <span
//                   className="font-dm text-xs w-2"
//                   style={{ color: "#475569" }}
//                 >
//                   {star}
//                 </span>
//                 <svg className="w-3 h-3" fill="#c9a84c" viewBox="0 0 20 20">
//                   <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                 </svg>
//                 <div
//                   className="flex-1 h-1.5 rounded-full overflow-hidden"
//                   style={{ background: "#1e2d42" }}
//                 >
//                   <div
//                     className="h-full rounded-full transition-all duration-500"
//                     style={{ width: `${pct}%`, background: "#c9a84c" }}
//                   />
//                 </div>
//                 <span
//                   className="font-dm text-[10px] w-6 text-right"
//                   style={{ color: "#475569" }}
//                 >
//                   {count}
//                 </span>
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* Add Review Form */}
//       {isAuth && (
//         <form
//           onSubmit={submitReview}
//           className="p-6 rounded-2xl mb-6"
//           style={{
//             background: "#162032",
//             border: "1px solid rgba(255,255,255,0.05)",
//           }}
//         >
//           <p
//             className="font-dm font-semibold text-sm mb-4"
//             style={{ color: "#e2e8f0" }}
//           >
//             Write a Review
//           </p>
//           <div className="mb-4">
//             <p className="font-dm text-xs mb-2" style={{ color: "#475569" }}>
//               Your Rating
//             </p>
//             <Stars n={rating} interactive onSet={setRating} />
//           </div>
//           <input
//             type="text"
//             placeholder="Review title (optional)"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className="nb-input mb-3 text-sm"
//           />
//           <textarea
//             placeholder="Share your experience with this product..."
//             value={comment}
//             onChange={(e) => setComment(e.target.value)}
//             rows={4}
//             className="nb-input mb-4 text-sm resize-none"
//             required
//           />
//           <button
//             type="submit"
//             disabled={submitting}
//             className="px-6 py-2.5 rounded-xl font-dm text-sm font-semibold text-white transition-opacity disabled:opacity-60"
//             style={{ background: "#16a34a" }}
//           >
//             {submitting ? "Submitting..." : "Submit Review"}
//           </button>
//         </form>
//       )}

//       {/* Reviews List */}
//       {loading ? (
//         <div className="space-y-3">
//           {Array(3)
//             .fill(0)
//             .map((_, i) => (
//               <div key={i} className="p-5 rounded-2xl shimmer h-24" />
//             ))}
//         </div>
//       ) : reviews.length === 0 ? (
//         <div
//           className="p-8 rounded-2xl text-center"
//           style={{
//             background: "#162032",
//             border: "1px solid rgba(255,255,255,0.05)",
//           }}
//         >
//           <p className="text-3xl mb-2">💬</p>
//           <p className="font-dm text-sm" style={{ color: "#475569" }}>
//             No reviews yet. Be the first to review!
//           </p>
//         </div>
//       ) : (
//         <div className="space-y-3">
//           {reviews.map((r) => (
//             <div
//               key={r._id}
//               className="p-5 rounded-2xl"
//               style={{
//                 background: "#162032",
//                 border: "1px solid rgba(255,255,255,0.05)",
//               }}
//             >
//               <div className="flex items-start justify-between mb-2">
//                 <div className="flex items-center gap-3">
//                   <div
//                     className="w-8 h-8 rounded-lg flex items-center justify-center font-dm font-bold text-sm text-white"
//                     style={{ background: "#16a34a" }}
//                   >
//                     {r.user?.name?.charAt(0).toUpperCase()}
//                   </div>
//                   <div>
//                     <p
//                       className="font-dm text-sm font-semibold"
//                       style={{ color: "#e2e8f0" }}
//                     >
//                       {r.user?.name}
//                     </p>
//                     {r.isVerifiedPurchase && (
//                       <span
//                         className="font-dm text-[10px]"
//                         style={{ color: "#4ade80" }}
//                       >
//                         ✅ Verified Purchase
//                       </span>
//                     )}
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <Stars n={r.rating} />
//                   <span
//                     className="font-dm text-[10px]"
//                     style={{ color: "#334155" }}
//                   >
//                     {new Date(r.createdAt).toLocaleDateString("en-IN")}
//                   </span>
//                 </div>
//               </div>
//               {r.title && (
//                 <p
//                   className="font-dm text-sm font-semibold mb-1"
//                   style={{ color: "#e2e8f0" }}
//                 >
//                   {r.title}
//                 </p>
//               )}
//               <p
//                 className="font-dm text-sm leading-relaxed"
//                 style={{ color: "#64748b" }}
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

const Stars = ({ n, interactive = false, onSet }) => (
  <div style={{ display: "flex", gap: "4px" }}>
    {[1, 2, 3, 4, 5].map((s) => (
      <button
        key={s}
        onClick={() => interactive && onSet(s)}
        disabled={!interactive}
        style={{
          background: "none",
          border: "none",
          padding: 0,
          cursor: interactive ? "pointer" : "default",
          transition: "transform 0.2s",
        }}
        onMouseEnter={(e) => {
          if (interactive) e.currentTarget.style.transform = "scale(1.2)";
        }}
        onMouseLeave={(e) => {
          if (interactive) e.currentTarget.style.transform = "scale(1)";
        }}
      >
        <svg
          style={{ width: "20px", height: "20px" }}
          fill={s <= n ? "#c9a84c" : "#e2e8f0"}
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      </button>
    ))}
  </div>
);

const ProductReviews = ({ productId, numOfReviews, ratings }) => {
  const { isAuth } = useSelector((s) => s.auth);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [title, setTitle] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!productId) return;
    setLoading(true);
    API.get(`/reviews/${productId}`)
      .then((r) => setReviews(r.data.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [productId]);

  const submitReview = async (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      toast.error("Please write a comment");
      return;
    }
    setSubmitting(true);
    try {
      const { data } = await API.post(`/reviews/${productId}`, {
        rating,
        title,
        comment,
      });
      setReviews((p) => [data.data, ...p]);
      setComment("");
      setTitle("");
      setRating(5);
      toast.success("Review added! JazakAllah Khair 🌙");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to submit");
    } finally {
      setSubmitting(false);
    }
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

  return (
    <div>
      {/* ── Rating Summary ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "clamp(16px, 3vw, 32px)",
          padding: "clamp(16px, 3vw, 24px)",
          borderRadius: "16px",
          background: "#ffffff",
          border: "1px solid #e2e8f0",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >
        <div style={{ textAlign: "center", flexShrink: 0 }}>
          <p
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontWeight: "700",
              fontSize: "clamp(36px, 5vw, 52px)",
              color: "#c9a84c",
              margin: 0,
              lineHeight: 1,
            }}
          >
            {ratings?.toFixed(1)}
          </p>
          <div style={{ marginTop: "6px" }}>
            <Stars n={Math.round(ratings)} />
          </div>
          <p
            style={{
              fontFamily: "DM Sans, sans-serif",
              fontSize: "12px",
              color: "#94a3b8",
              margin: "4px 0 0 0",
            }}
          >
            {numOfReviews} reviews
          </p>
        </div>

        {/* Bar Chart */}
        <div style={{ flex: 1, minWidth: "160px" }}>
          {[5, 4, 3, 2, 1].map((star) => {
            const count = reviews.filter((r) => r.rating === star).length;
            const pct = reviews.length ? (count / reviews.length) * 100 : 0;
            return (
              <div
                key={star}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "6px",
                }}
              >
                <span
                  style={{
                    fontFamily: "DM Sans",
                    fontSize: "11px",
                    color: "#64748b",
                    width: "8px",
                  }}
                >
                  {star}
                </span>
                <svg
                  style={{ width: "12px", height: "12px", flexShrink: 0 }}
                  fill="#c9a84c"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
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
                      width: `${pct}%`,
                      background: "#c9a84c",
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
                  }}
                >
                  {count}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Write Review ── */}
      {isAuth && (
        <form
          onSubmit={submitReview}
          style={{
            padding: "clamp(16px, 3vw, 24px)",
            borderRadius: "16px",
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            marginBottom: "20px",
          }}
        >
          <p
            style={{
              fontFamily: "DM Sans, sans-serif",
              fontSize: "15px",
              fontWeight: "700",
              color: "#0f172a",
              margin: "0 0 16px 0",
            }}
          >
            Write a Review
          </p>

          <div style={{ marginBottom: "14px" }}>
            <p
              style={{
                fontFamily: "DM Sans",
                fontSize: "12px",
                color: "#64748b",
                margin: "0 0 8px 0",
              }}
            >
              Your Rating
            </p>
            <Stars n={rating} interactive onSet={setRating} />
          </div>

          <input
            type="text"
            placeholder="Review title (optional)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ ...inputStyle, marginBottom: "10px" }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "#16a34a")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "#e2e8f0")}
          />

          <textarea
            placeholder="Share your experience with this product..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            required
            style={{
              ...inputStyle,
              marginBottom: "14px",
              resize: "vertical",
              minHeight: "100px",
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "#16a34a")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "#e2e8f0")}
          />

          <button
            type="submit"
            disabled={submitting}
            style={{
              padding: "10px 24px",
              borderRadius: "10px",
              background: "#16a34a",
              color: "white",
              fontFamily: "DM Sans, sans-serif",
              fontSize: "14px",
              fontWeight: "600",
              border: "none",
              cursor: submitting ? "not-allowed" : "pointer",
              opacity: submitting ? 0.7 : 1,
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              if (!submitting) e.currentTarget.style.background = "#15803d";
            }}
            onMouseLeave={(e) => {
              if (!submitting) e.currentTarget.style.background = "#16a34a";
            }}
          >
            {submitting ? "Submitting..." : "Submit Review"}
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
                  height: "100px",
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
            padding: "40px",
            borderRadius: "16px",
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            textAlign: "center",
          }}
        >
          <p style={{ fontSize: "32px", margin: "0 0 8px 0" }}>💬</p>
          <p
            style={{
              fontFamily: "DM Sans, sans-serif",
              fontSize: "14px",
              color: "#94a3b8",
              margin: 0,
            }}
          >
            No reviews yet. Be the first to review!
          </p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {reviews.map((r) => (
            <div
              key={r._id}
              style={{
                padding: "clamp(14px, 2vw, 20px)",
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
              {/* Review Header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                  flexWrap: "wrap",
                  gap: "8px",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "10px",
                      background: "linear-gradient(135deg,#16a34a,#14532d)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      fontFamily: "DM Sans, sans-serif",
                      fontWeight: "700",
                      fontSize: "14px",
                      flexShrink: 0,
                    }}
                  >
                    {r.user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p
                      style={{
                        fontFamily: "DM Sans, sans-serif",
                        fontSize: "14px",
                        fontWeight: "600",
                        color: "#0f172a",
                        margin: 0,
                      }}
                    >
                      {r.user?.name}
                    </p>
                    {r.isVerifiedPurchase && (
                      <span
                        style={{
                          fontFamily: "DM Sans, sans-serif",
                          fontSize: "10px",
                          color: "#16a34a",
                          fontWeight: "600",
                        }}
                      >
                        ✅ Verified Purchase
                      </span>
                    )}
                  </div>
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <Stars n={r.rating} />
                  <span
                    style={{
                      fontFamily: "DM Sans, sans-serif",
                      fontSize: "11px",
                      color: "#94a3b8",
                    }}
                  >
                    {new Date(r.createdAt).toLocaleDateString("en-IN")}
                  </span>
                </div>
              </div>

              {r.title && (
                <p
                  style={{
                    fontFamily: "DM Sans, sans-serif",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#0f172a",
                    margin: "0 0 6px 0",
                  }}
                >
                  {r.title}
                </p>
              )}
              <p
                style={{
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: "14px",
                  color: "#64748b",
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {r.comment}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductReviews;
