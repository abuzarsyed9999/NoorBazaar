// import { useSelector, useDispatch } from "react-redux";
// import { Link } from "react-router-dom";
// import { removeFromWishlist } from "../../redux/slices/wishlistSlice";
// import { addToCart } from "../../redux/slices/cartSlice";
// import toast from "react-hot-toast";

// const WishlistTab = () => {
//   const dispatch = useDispatch();
//   const { items, loading } = useSelector((s) => s.wishlist);

//   const handleRemove = async (id) => {
//     await dispatch(removeFromWishlist(id));
//     toast.success("Removed from wishlist");
//   };

//   const handleAddToCart = async (id) => {
//     const r = await dispatch(addToCart({ productId: id, quantity: 1 }));
//     if (r.meta.requestStatus === "fulfilled") {
//       toast.success("Added to cart 🛒");
//     }
//   };

//   if (loading)
//     return (
//       <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//         {Array(6)
//           .fill(0)
//           .map((_, i) => (
//             <div key={i} className="rounded-2xl overflow-hidden shimmer h-48" />
//           ))}
//       </div>
//     );

//   if (items.length === 0)
//     return (
//       <div
//         className="p-12 rounded-2xl text-center"
//         style={{
//           background: "#162032",
//           border: "1px solid rgba(255,255,255,0.05)",
//         }}
//       >
//         <div className="text-5xl mb-4">❤️</div>
//         <h3
//           className="font-cormorant text-2xl font-semibold mb-2"
//           style={{ color: "#e2e8f0" }}
//         >
//           Wishlist is Empty
//         </h3>
//         <p className="font-dm text-sm mb-5" style={{ color: "#475569" }}>
//           Save products you love to your wishlist
//         </p>
//         <Link
//           to="/products"
//           className="inline-block px-6 py-3 rounded-xl font-dm text-sm font-semibold text-white"
//           style={{ background: "#16a34a" }}
//         >
//           Browse Products
//         </Link>
//       </div>
//     );

//   return (
//     <div>
//       <p
//         className="font-dm text-xs font-semibold uppercase tracking-wider mb-4"
//         style={{ color: "#475569" }}
//       >
//         {items.length} Saved Items
//       </p>

//       <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//         {items.map((p) => (
//           <div
//             key={p._id}
//             className="rounded-2xl overflow-hidden group"
//             style={{
//               background: "#162032",
//               border: "1px solid rgba(255,255,255,0.05)",
//             }}
//           >
//             {/* Image */}
//             <Link to={`/products/${p.slug}`} className="block relative">
//               <img
//                 src={p.images?.[0]?.url}
//                 alt={p.name}
//                 className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
//                 style={{ background: "#0f1923" }}
//               />
//               {/* Remove */}
//               <button
//                 onClick={(e) => {
//                   e.preventDefault();
//                   handleRemove(p._id);
//                 }}
//                 className="absolute top-2 right-2 w-7 h-7 rounded-lg flex items-center justify-center transition-all"
//                 style={{
//                   background: "rgba(15,25,35,0.85)",
//                   color: "#ef4444",
//                 }}
//               >
//                 ✕
//               </button>
//             </Link>

//             {/* Info */}
//             <div className="p-3">
//               <Link to={`/products/${p.slug}`}>
//                 <p
//                   className="font-dm text-xs font-medium mb-1 line-clamp-2"
//                   style={{ color: "#e2e8f0" }}
//                 >
//                   {p.name}
//                 </p>
//               </Link>
//               <p
//                 className="font-cormorant font-semibold text-base mb-2"
//                 style={{ color: "#4ade80" }}
//               >
//                 ₹{p.price?.toLocaleString()}
//               </p>
//               <button
//                 onClick={() => handleAddToCart(p._id)}
//                 className="w-full py-2 rounded-lg font-dm text-xs font-semibold text-white transition-opacity"
//                 style={{ background: "#16a34a" }}
//                 onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
//                 onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
//               >
//                 Add to Cart
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default WishlistTab;

import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeFromWishlist } from "../../redux/slices/wishlistSlice";
import { addToCart } from "../../redux/slices/cartSlice";
import toast from "react-hot-toast";

const WishlistTab = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((s) => s.wishlist);

  const handleRemove = async (id) => {
    await dispatch(removeFromWishlist(id));
    toast.success("Removed from wishlist");
  };

  const handleAddToCart = async (id) => {
    const r = await dispatch(addToCart({ productId: id, quantity: 1 }));
    if (r.meta.requestStatus === "fulfilled") toast.success("Added to cart 🛒");
  };

  if (loading)
    return (
      <div className="wish-grid">
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              style={{
                borderRadius: "16px",
                overflow: "hidden",
                background: "#ffffff",
                border: "1px solid #e2e8f0",
              }}
            >
              <div
                style={{
                  aspectRatio: "1",
                  background:
                    "linear-gradient(90deg,#f0fdf4 25%,#dcfce7 50%,#f0fdf4 75%)",
                  backgroundSize: "200% 100%",
                  animation: "shimmer 1.5s infinite",
                }}
              />
              <div style={{ padding: "12px" }}>
                <div
                  style={{
                    height: "12px",
                    borderRadius: "4px",
                    marginBottom: "8px",
                    background: "#f0fdf4",
                  }}
                />
                <div
                  style={{
                    height: "20px",
                    borderRadius: "4px",
                    width: "50%",
                    background: "#f0fdf4",
                  }}
                />
              </div>
            </div>
          ))}
      </div>
    );

  if (items.length === 0)
    return (
      <div
        style={{
          padding: "48px 24px",
          borderRadius: "16px",
          background: "#ffffff",
          border: "1px solid #e2e8f0",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: "48px", marginBottom: "16px" }}>❤️</div>
        <h3
          style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: "24px",
            fontWeight: "600",
            color: "#0f172a",
            margin: "0 0 8px 0",
          }}
        >
          Wishlist is Empty
        </h3>
        <p
          style={{
            fontFamily: "DM Sans, sans-serif",
            fontSize: "14px",
            color: "#64748b",
            margin: "0 0 24px 0",
          }}
        >
          Save products you love to your wishlist
        </p>
        <Link
          to="/products"
          style={{
            display: "inline-block",
            padding: "12px 28px",
            borderRadius: "12px",
            background: "#16a34a",
            color: "white",
            fontFamily: "DM Sans, sans-serif",
            fontSize: "14px",
            fontWeight: "600",
            textDecoration: "none",
            boxShadow: "0 4px 12px rgba(22,163,74,0.25)",
            transition: "opacity 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          Browse Products
        </Link>
      </div>
    );

  return (
    <>
      <p
        style={{
          fontFamily: "DM Sans, sans-serif",
          fontSize: "12px",
          fontWeight: "700",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          color: "#94a3b8",
          margin: "0 0 16px 0",
        }}
      >
        {items.length} Saved Items
      </p>

      <div className="wish-grid">
        {items.map((p) => (
          <div
            key={p._id}
            className="wish-card"
            style={{
              borderRadius: "16px",
              overflow: "hidden",
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#bbf7d0";
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow =
                "0 8px 24px rgba(22,163,74,0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#e2e8f0";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            {/* Image */}
            <Link
              to={`/products/${p.slug}`}
              style={{
                display: "block",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <img
                src={p.images?.[0]?.url}
                alt={p.name}
                className="wish-img"
                style={{
                  width: "100%",
                  aspectRatio: "1",
                  objectFit: "cover",
                  display: "block",
                  background: "#f8fafc",
                  transition: "transform 0.4s ease",
                }}
              />

              {/* Remove Button */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleRemove(p._id);
                }}
                style={{
                  position: "absolute",
                  top: "8px",
                  right: "8px",
                  width: "30px",
                  height: "30px",
                  borderRadius: "8px",
                  background: "white",
                  border: "1px solid #e2e8f0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: "#94a3b8",
                  fontSize: "12px",
                  fontWeight: "bold",
                  transition: "all 0.2s",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#fff5f5";
                  e.currentTarget.style.borderColor = "#fca5a5";
                  e.currentTarget.style.color = "#ef4444";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "white";
                  e.currentTarget.style.borderColor = "#e2e8f0";
                  e.currentTarget.style.color = "#94a3b8";
                }}
              >
                ✕
              </button>

              {/* Out of stock overlay */}
              {p.stock === 0 && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(255,255,255,0.7)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "DM Sans, sans-serif",
                      fontSize: "12px",
                      fontWeight: "700",
                      color: "#ef4444",
                      background: "white",
                      padding: "4px 12px",
                      borderRadius: "20px",
                      border: "1px solid #fca5a5",
                    }}
                  >
                    Out of Stock
                  </span>
                </div>
              )}
            </Link>

            {/* Info */}
            <div style={{ padding: "12px" }}>
              {/* Category */}
              {p.category?.name && (
                <p
                  style={{
                    fontFamily: "DM Sans, sans-serif",
                    fontSize: "10px",
                    fontWeight: "600",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    color: "#16a34a",
                    margin: "0 0 4px 0",
                  }}
                >
                  {p.category.name}
                </p>
              )}

              {/* Name */}
              <Link
                to={`/products/${p.slug}`}
                style={{ textDecoration: "none" }}
              >
                <p
                  style={{
                    fontFamily: "DM Sans, sans-serif",
                    fontSize: "13px",
                    fontWeight: "600",
                    color: "#0f172a",
                    margin: "0 0 6px 0",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    lineHeight: 1.4,
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#16a34a")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#0f172a")
                  }
                >
                  {p.name}
                </p>
              </Link>

              {/* Price Row */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "10px",
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

              {/* Add to Cart */}
              <button
                onClick={() => handleAddToCart(p._id)}
                disabled={p.stock === 0}
                style={{
                  width: "100%",
                  padding: "9px",
                  borderRadius: "10px",
                  background: p.stock === 0 ? "#f0f0f0" : "#16a34a",
                  color: p.stock === 0 ? "#94a3b8" : "white",
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: "12px",
                  fontWeight: "600",
                  border: "none",
                  cursor: p.stock === 0 ? "not-allowed" : "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  if (p.stock > 0) {
                    e.currentTarget.style.background = "#15803d";
                    e.currentTarget.style.boxShadow =
                      "0 4px 12px rgba(22,163,74,0.25)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (p.stock > 0) {
                    e.currentTarget.style.background = "#16a34a";
                    e.currentTarget.style.boxShadow = "none";
                  }
                }}
              >
                {p.stock === 0 ? "Out of Stock" : "Add to Cart"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Responsive + hover styles */}
      <style>{`
        .wish-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }
        @media (min-width: 480px) {
          .wish-grid { grid-template-columns: repeat(2, 1fr); gap: 14px; }
        }
        @media (min-width: 640px) {
          .wish-grid { grid-template-columns: repeat(3, 1fr); gap: 16px; }
        }
        @media (min-width: 1024px) {
          .wish-grid { grid-template-columns: repeat(4, 1fr); gap: 16px; }
        }
        .wish-card:hover .wish-img {
          transform: scale(1.05) !important;
        }
      `}</style>
    </>
  );
};

export default WishlistTab;
