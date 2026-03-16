// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { addToCart } from "../../redux/slices/cartSlice";
// import { addToWishlist } from "../../redux/slices/wishlistSlice";
// import toast from "react-hot-toast";

// const Stars = ({ n }) => (
//   <div className="flex gap-0.5">
//     {[1, 2, 3, 4, 5].map((s) => (
//       <svg
//         key={s}
//         className="w-3 h-3"
//         fill={s <= n ? "#c9a84c" : "#1e2d42"}
//         viewBox="0 0 20 20"
//       >
//         <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//       </svg>
//     ))}
//   </div>
// );

// const ProductCard = ({ product: p }) => {
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
//     if (r.meta.requestStatus === "fulfilled") {
//       toast.success("Added to cart 🛒");
//     } else {
//       toast.error(r.payload || "Failed to add");
//     }
//   };

//   const onWish = async (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (!isAuth) {
//       toast.error("Please login first");
//       navigate("/login");
//       return;
//     }
//     const r = await dispatch(addToWishlist(p._id));
//     if (r.meta.requestStatus === "fulfilled") {
//       toast.success("Added to wishlist ❤️");
//     }
//   };

//   if (!p) return null;

//   return (
//     <Link
//       to={`/products/${p.slug}`}
//       className="group block"
//       onClick={() => window.scrollTo(0, 0)}
//     >
//       <div
//         className="rounded-2xl overflow-hidden transition-all duration-300 h-full flex flex-col"
//         style={{
//           background: "#162032",
//           border: "1px solid rgba(255,255,255,0.05)",
//         }}
//         onMouseEnter={(e) => {
//           e.currentTarget.style.borderColor = "rgba(22,163,74,0.25)";
//           e.currentTarget.style.transform = "translateY(-4px)";
//           e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.4)";
//         }}
//         onMouseLeave={(e) => {
//           e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)";
//           e.currentTarget.style.transform = "translateY(0)";
//           e.currentTarget.style.boxShadow = "none";
//         }}
//       >
//         {/* ── Image ── */}
//         <div
//           className="relative aspect-square overflow-hidden shrink-0"
//           style={{ background: "#0f1923" }}
//         >
//           <img
//             src={p.images?.[0]?.url}
//             alt={p.name}
//             className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
//           />

//           {/* Badges */}
//           <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
//             {disc > 0 && (
//               <span
//                 className="text-[10px] font-dm font-bold px-2 py-0.5 rounded-full text-white"
//                 style={{ background: "#dc2626" }}
//               >
//                 -{disc}%
//               </span>
//             )}
//             {p.isBestseller && (
//               <span
//                 className="text-[10px] font-dm font-semibold px-2 py-0.5 rounded-full"
//                 style={{
//                   background: "rgba(201,168,76,0.15)",
//                   color: "#c9a84c",
//                   border: "1px solid rgba(201,168,76,0.3)",
//                 }}
//               >
//                 Bestseller
//               </span>
//             )}
//             {p.isNewArrival && (
//               <span
//                 className="text-[10px] font-dm font-semibold px-2 py-0.5 rounded-full"
//                 style={{
//                   background: "rgba(22,163,74,0.15)",
//                   color: "#4ade80",
//                   border: "1px solid rgba(22,163,74,0.3)",
//                 }}
//               >
//                 New
//               </span>
//             )}
//           </div>

//           {/* Wishlist Button */}
//           <button
//             onClick={onWish}
//             className="absolute top-2.5 right-2.5 w-8 h-8 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200"
//             style={{
//               background: "rgba(15,25,35,0.85)",
//               color: "#94a3b8",
//             }}
//             onMouseEnter={(e) => (e.currentTarget.style.color = "#f87171")}
//             onMouseLeave={(e) => (e.currentTarget.style.color = "#94a3b8")}
//           >
//             <svg
//               className="w-4 h-4"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
//               />
//             </svg>
//           </button>

//           {/* Quick Add Button */}
//           <div className="absolute bottom-0 inset-x-0 p-2.5 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
//             <button
//               onClick={onCart}
//               disabled={p.stock === 0}
//               className="w-full py-2.5 text-xs font-dm font-semibold rounded-xl text-white disabled:opacity-50 transition-opacity"
//               style={{ background: "#16a34a" }}
//               onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
//               onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
//             >
//               {p.stock === 0 ? "Out of Stock" : "Add to Cart"}
//             </button>
//           </div>
//         </div>

//         {/* ── Info ── */}
//         <div className="p-4 flex flex-col flex-1">
//           <p
//             className="font-dm text-[10px] font-semibold uppercase tracking-wider mb-1"
//             style={{ color: "#16a34a" }}
//           >
//             {p.category?.name}
//           </p>
//           <h3
//             className="font-dm text-sm font-medium leading-snug mb-1 flex-1 line-clamp-2"
//             style={{ color: "#e2e8f0" }}
//           >
//             {p.name}
//           </h3>
//           {p.nameArabic && (
//             <p
//               className="font-arabic text-xs mb-2"
//               style={{ color: "#334155" }}
//             >
//               {p.nameArabic}
//             </p>
//           )}
//           <div className="flex items-center gap-1.5 mb-2">
//             <Stars n={Math.round(p.ratings)} />
//             <span className="font-dm text-[10px]" style={{ color: "#475569" }}>
//               ({p.numOfReviews})
//             </span>
//           </div>
//           <div className="flex items-center gap-2">
//             <span
//               className="font-cormorant font-semibold text-lg"
//               style={{ color: "#4ade80" }}
//             >
//               ₹{p.price?.toLocaleString()}
//             </span>
//             {p.originalPrice && p.originalPrice > p.price && (
//               <span
//                 className="font-dm text-xs line-through"
//                 style={{ color: "#334155" }}
//               >
//                 ₹{p.originalPrice?.toLocaleString()}
//               </span>
//             )}
//           </div>
//           {p.stock <= 5 && p.stock > 0 && (
//             <p
//               className="font-dm text-[10px] mt-1"
//               style={{ color: "#ef4444" }}
//             >
//               Only {p.stock} left!
//             </p>
//           )}
//           {p.stock === 0 && (
//             <p
//               className="font-dm text-[10px] mt-1 font-semibold"
//               style={{ color: "#ef4444" }}
//             >
//               Out of Stock
//             </p>
//           )}
//         </div>
//       </div>
//     </Link>
//   );
// };

// export default ProductCard;
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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

const ProductCard = ({ product: p }) => {
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
    else toast.error(r.payload || "Failed to add");
  };

  const onWish = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuth) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }
    const r = await dispatch(addToWishlist(p._id));
    if (r.meta.requestStatus === "fulfilled")
      toast.success("Added to wishlist ❤️");
  };

  if (!p) return null;

  return (
    <>
      <Link
        to={`/products/${p.slug}`}
        className="pc-link"
        style={{ textDecoration: "none", display: "block", height: "100%" }}
        onClick={() => window.scrollTo(0, 0)}
      >
        <div
          className="pc-card"
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
              className="pc-img"
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

            {/* Wishlist */}
            <button
              onClick={onWish}
              className="pc-wish"
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
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
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
              className="pc-quick"
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
                  opacity: p.stock === 0 ? 0.6 : 1,
                }}
                onMouseEnter={(e) => {
                  if (p.stock > 0) e.currentTarget.style.background = "#15803d";
                }}
                onMouseLeave={(e) => {
                  if (p.stock > 0) e.currentTarget.style.background = "#16a34a";
                }}
              >
                {p.stock === 0 ? "Out of Stock" : "Add to Cart"}
              </button>
            </div>
          </div>

          {/* ── Info ── */}
          <div
            style={{
              padding: "clamp(10px, 2vw, 16px)",
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
                margin: "0 0 5px 0",
              }}
            >
              {p.category?.name}
            </p>

            <h3
              style={{
                fontFamily: "DM Sans, sans-serif",
                fontSize: "clamp(12px, 1.5vw, 14px)",
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
                  margin: "0 0 6px 0",
                }}
              >
                {p.nameArabic}
              </p>
            )}

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                marginBottom: "8px",
              }}
            >
              <Stars n={Math.round(p.ratings)} />
              <span
                style={{
                  fontFamily: "DM Sans",
                  fontSize: "10px",
                  color: "#94a3b8",
                }}
              >
                ({p.numOfReviews})
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontWeight: "600",
                  fontSize: "clamp(16px, 2vw, 20px)",
                  color: "#16a34a",
                }}
              >
                ₹{p.price?.toLocaleString()}
              </span>
              {p.originalPrice && p.originalPrice > p.price && (
                <span
                  style={{
                    fontFamily: "DM Sans, sans-serif",
                    fontSize: "11px",
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
                  fontFamily: "DM Sans",
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
                  fontFamily: "DM Sans",
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
        .pc-link:hover .pc-card {
          border-color: #bbf7d0 !important;
          transform:    translateY(-4px) !important;
          box-shadow:   0 16px 40px rgba(22,163,74,0.12) !important;
        }
        .pc-link:hover .pc-img  { transform: scale(1.05) !important; }
        .pc-link:hover .pc-wish { opacity: 1 !important; }
        .pc-link:hover .pc-quick{ transform: translateY(0) !important; }
      `}</style>
    </>
  );
};

export default ProductCard;
