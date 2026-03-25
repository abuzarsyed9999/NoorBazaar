// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { addToCart } from "../../redux/slices/cartSlice";
// import { addToWishlist } from "../../redux/slices/wishlistSlice";
// import toast from "react-hot-toast";

// const Stars = ({ n }) => (
//   <div style={{ display: "flex", gap: "2px" }}>
//     {[1, 2, 3, 4, 5].map((s) => (
//       <svg
//         key={s}
//         style={{ width: "12px", height: "12px" }}
//         fill={s <= n ? "#c9a84c" : "#e2e8f0"}
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
//     if (r.meta.requestStatus === "fulfilled") toast.success("Added to cart 🛒");
//     else toast.error(r.payload || "Failed to add");
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
//     if (r.meta.requestStatus === "fulfilled")
//       toast.success("Added to wishlist ❤️");
//   };

//   if (!p) return null;

//   return (
//     <>
//       <Link
//         to={`/products/${p.slug}`}
//         className="pc-link"
//         style={{ textDecoration: "none", display: "block", height: "100%" }}
//         onClick={() => window.scrollTo(0, 0)}
//       >
//         <div
//           className="pc-card"
//           style={{
//             background: "#ffffff",
//             border: "1px solid #e2e8f0",
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
//               background: "#f8fafc",
//               flexShrink: 0,
//             }}
//           >
//             <img
//               src={p.images?.[0]?.url}
//               alt={p.name}
//               className="pc-img"
//               style={{
//                 width: "100%",
//                 height: "100%",
//                 objectFit: "cover",
//                 transition: "transform 0.5s ease",
//               }}
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
//                     fontFamily: "DM Sans, sans-serif",
//                   }}
//                 >
//                   -{disc}%
//                 </span>
//               )}
//               {p.isBestseller && (
//                 <span
//                   style={{
//                     background: "#fef9c3",
//                     color: "#854d0e",
//                     border: "1px solid #fde68a",
//                     fontSize: "10px",
//                     fontWeight: "600",
//                     padding: "2px 8px",
//                     borderRadius: "20px",
//                     fontFamily: "DM Sans, sans-serif",
//                   }}
//                 >
//                   Bestseller
//                 </span>
//               )}
//               {p.isNewArrival && (
//                 <span
//                   style={{
//                     background: "#dcfce7",
//                     color: "#15803d",
//                     border: "1px solid #bbf7d0",
//                     fontSize: "10px",
//                     fontWeight: "600",
//                     padding: "2px 8px",
//                     borderRadius: "20px",
//                     fontFamily: "DM Sans, sans-serif",
//                   }}
//                 >
//                   New
//                 </span>
//               )}
//             </div>

//             {/* Wishlist */}
//             <button
//               onClick={onWish}
//               className="pc-wish"
//               style={{
//                 position: "absolute",
//                 top: "10px",
//                 right: "10px",
//                 width: "32px",
//                 height: "32px",
//                 borderRadius: "8px",
//                 background: "white",
//                 border: "1px solid #e2e8f0",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 cursor: "pointer",
//                 color: "#94a3b8",
//                 transition: "all 0.2s",
//                 opacity: 0,
//                 boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.color = "#ef4444";
//                 e.currentTarget.style.borderColor = "#fca5a5";
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.color = "#94a3b8";
//                 e.currentTarget.style.borderColor = "#e2e8f0";
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
//               className="pc-quick"
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
//                   fontFamily: "DM Sans, sans-serif",
//                   fontSize: "13px",
//                   fontWeight: "600",
//                   border: "none",
//                   cursor: p.stock === 0 ? "not-allowed" : "pointer",
//                   opacity: p.stock === 0 ? 0.6 : 1,
//                 }}
//                 onMouseEnter={(e) => {
//                   if (p.stock > 0) e.currentTarget.style.background = "#15803d";
//                 }}
//                 onMouseLeave={(e) => {
//                   if (p.stock > 0) e.currentTarget.style.background = "#16a34a";
//                 }}
//               >
//                 {p.stock === 0 ? "Out of Stock" : "Add to Cart"}
//               </button>
//             </div>
//           </div>

//           {/* ── Info ── */}
//           <div
//             style={{
//               padding: "clamp(10px, 2vw, 16px)",
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
//                 letterSpacing: "0.06em",
//                 color: "#16a34a",
//                 margin: "0 0 5px 0",
//               }}
//             >
//               {p.category?.name}
//             </p>

//             <h3
//               style={{
//                 fontFamily: "DM Sans, sans-serif",
//                 fontSize: "clamp(12px, 1.5vw, 14px)",
//                 fontWeight: "600",
//                 color: "#0f172a",
//                 margin: "0 0 4px 0",
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
//                   color: "#94a3b8",
//                   margin: "0 0 6px 0",
//                 }}
//               >
//                 {p.nameArabic}
//               </p>
//             )}

//             <div
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "5px",
//                 marginBottom: "8px",
//               }}
//             >
//               <Stars n={Math.round(p.ratings)} />
//               <span
//                 style={{
//                   fontFamily: "DM Sans",
//                   fontSize: "10px",
//                   color: "#94a3b8",
//                 }}
//               >
//                 ({p.numOfReviews})
//               </span>
//             </div>

//             <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
//               <span
//                 style={{
//                   fontFamily: "Cormorant Garamond, serif",
//                   fontWeight: "600",
//                   fontSize: "clamp(16px, 2vw, 20px)",
//                   color: "#16a34a",
//                 }}
//               >
//                 ₹{p.price?.toLocaleString()}
//               </span>
//               {p.originalPrice && p.originalPrice > p.price && (
//                 <span
//                   style={{
//                     fontFamily: "DM Sans, sans-serif",
//                     fontSize: "11px",
//                     color: "#94a3b8",
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
//                   margin: "4px 0 0 0",
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
//                   fontWeight: "600",
//                   margin: "4px 0 0 0",
//                 }}
//               >
//                 Out of Stock
//               </p>
//             )}
//           </div>
//         </div>
//       </Link>

//       <style>{`
//         .pc-link:hover .pc-card {
//           border-color: #bbf7d0 !important;
//           transform:    translateY(-4px) !important;
//           box-shadow:   0 16px 40px rgba(22,163,74,0.12) !important;
//         }
//         .pc-link:hover .pc-img  { transform: scale(1.05) !important; }
//         .pc-link:hover .pc-wish { opacity: 1 !important; }
//         .pc-link:hover .pc-quick{ transform: translateY(0) !important; }
//       `}</style>
//     </>
//   );
// };

// export default ProductCard;

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";
import { addToWishlist } from "../../redux/slices/wishlistSlice";
import { addToCompare } from "../../redux/slices/compareSlice";
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
  const compareItems = useSelector((s) => s.compare.items);
  const isInCompare = compareItems.some((item) => item._id === p._id); // fixed: p._id

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

  const onCompare = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (compareItems.length >= 4 && !isInCompare) {
      toast.error("You can compare up to 4 products.");
      return;
    }
    dispatch(addToCompare(p));
    toast.success(isInCompare ? "Removed from compare" : "Added to compare");
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

            {/* Action Buttons (Wishlist + Compare) */}
            <div
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                display: "flex",
                gap: "6px",
                opacity: 0,
                transition: "opacity 0.2s",
              }}
              className="pc-actions"
            >
              {/* Wishlist Button */}
              <button
                onClick={onWish}
                className="pc-wish"
                style={{
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

              {/* Compare Button */}
              <button
                onClick={onCompare}
                title={isInCompare ? "Remove from compare" : "Add to compare"}
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "8px",
                  background: isInCompare ? "#f0fdf4" : "white",
                  border: isInCompare
                    ? "1px solid #16a34a"
                    : "1px solid #e2e8f0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  fontSize: "14px",
                  transition: "all 0.2s",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                }}
                onMouseEnter={(e) => {
                  if (!isInCompare) {
                    e.currentTarget.style.background = "#f0fdf4";
                    e.currentTarget.style.borderColor = "#16a34a";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isInCompare) {
                    e.currentTarget.style.background = "white";
                    e.currentTarget.style.borderColor = "#e2e8f0";
                  }
                }}
              >
                {isInCompare ? "✅" : "⚖️"}
              </button>
            </div>

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
        .pc-link:hover .pc-actions { opacity: 1 !important; }
        .pc-link:hover .pc-quick { transform: translateY(0) !important; }
      `}</style>
    </>
  );
};

export default ProductCard;
