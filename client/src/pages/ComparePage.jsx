import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {
  removeFromCompare,
  clearCompare,
  addToCompare,
} from "../redux/slices/compareSlice";
import { addToCart } from "../redux/slices/cartSlice";
import { addToWishlist } from "../redux/slices/wishlistSlice";
import toast from "react-hot-toast";

const ComparePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((s) => s.compare);
  const { isAuth } = useSelector((s) => s.auth);

  const handleAddToCart = (product) => {
    if (!isAuth) {
      navigate("/login");
      return;
    }
    dispatch(addToCart({ productId: product._id, quantity: 1 }));
    toast.success(`${product.name} added to cart! 🛒`);
  };

  const handleAddToWishlist = (product) => {
    if (!isAuth) {
      navigate("/login");
      return;
    }
    dispatch(addToWishlist(product._id));
  };

  // ── Get all unique spec keys ──
  const getAllSpecKeys = () => {
    const keys = new Set();
    items.forEach((p) => {
      if (p.specifications) {
        Object.keys(p.specifications).forEach((k) => keys.add(k));
      }
    });
    return Array.from(keys);
  };

  // ── Check if values differ ──
  const valuesDiffer = (key, getValue) => {
    const values = items.map(getValue);
    return new Set(values.filter(Boolean)).size > 1;
  };

  const rows = [
    {
      label: "Price",
      key: "price",
      getValue: (p) => `₹${p.price?.toLocaleString()}`,
      render: (p) => (
        <div>
          <p
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "22px",
              fontWeight: "700",
              color: "#16a34a",
              margin: 0,
            }}
          >
            ₹{p.price?.toLocaleString()}
          </p>
          {p.originalPrice && p.originalPrice > p.price && (
            <p
              style={{
                fontFamily: "DM Sans",
                fontSize: "12px",
                color: "#94a3b8",
                textDecoration: "line-through",
                margin: "2px 0 0 0",
              }}
            >
              ₹{p.originalPrice?.toLocaleString()}
            </p>
          )}
        </div>
      ),
    },
    {
      label: "Rating",
      key: "rating",
      getValue: (p) => p.ratings?.average,
      render: (p) => (
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <div style={{ display: "flex", gap: "2px" }}>
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <span
                  key={i}
                  style={{
                    fontSize: "14px",
                    color:
                      i < Math.round(p.ratings?.average || 0)
                        ? "#f59e0b"
                        : "#e2e8f0",
                  }}
                >
                  ★
                </span>
              ))}
          </div>
          <span
            style={{
              fontFamily: "DM Sans",
              fontSize: "12px",
              color: "#64748b",
            }}
          >
            ({p.ratings?.count || 0})
          </span>
        </div>
      ),
    },
    {
      label: "Stock",
      key: "stock",
      getValue: (p) => p.stock,
      render: (p) => (
        <span
          style={{
            fontFamily: "DM Sans",
            fontSize: "13px",
            fontWeight: "600",
            padding: "4px 12px",
            borderRadius: "20px",
            background: p.stock > 0 ? "#f0fdf4" : "#fff5f5",
            color: p.stock > 0 ? "#16a34a" : "#dc2626",
          }}
        >
          {p.stock > 10
            ? "In Stock ✅"
            : p.stock > 0
              ? `Only ${p.stock} left ⚠️`
              : "Out of Stock ❌"}
        </span>
      ),
    },
    {
      label: "Category",
      key: "category",
      getValue: (p) => p.category?.name,
      render: (p) => (
        <span
          style={{ fontFamily: "DM Sans", fontSize: "13px", color: "#64748b" }}
        >
          {p.category?.name || "—"}
        </span>
      ),
    },
    {
      label: "Brand",
      key: "brand",
      getValue: (p) => p.brand,
      render: (p) => (
        <span
          style={{ fontFamily: "DM Sans", fontSize: "13px", color: "#64748b" }}
        >
          {p.brand || "—"}
        </span>
      ),
    },
    {
      label: "Description",
      key: "description",
      getValue: (p) => p.shortDescription,
      render: (p) => (
        <p
          style={{
            fontFamily: "DM Sans",
            fontSize: "12px",
            color: "#64748b",
            margin: 0,
            lineHeight: 1.5,
          }}
        >
          {p.shortDescription || "—"}
        </p>
      ),
    },
  ];

  const specKeys = getAllSpecKeys();

  if (items.length === 0) {
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
        <div style={{ textAlign: "center", padding: "40px" }}>
          <div style={{ fontSize: "64px", marginBottom: "16px" }}>⚖️</div>
          <h2
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "28px",
              color: "#0f172a",
              margin: "0 0 8px 0",
            }}
          >
            No Products to Compare
          </h2>
          <p
            style={{
              fontFamily: "DM Sans",
              fontSize: "14px",
              color: "#64748b",
              margin: "0 0 24px 0",
            }}
          >
            Add products to compare by clicking the compare button on any
            product.
          </p>
          <button
            onClick={() => navigate("/products")}
            style={{
              padding: "12px 28px",
              borderRadius: "12px",
              background: "#16a34a",
              color: "white",
              fontFamily: "DM Sans",
              fontSize: "14px",
              fontWeight: "600",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(22,163,74,0.25)",
            }}
          >
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        background: "#ffffff",
        minHeight: "100vh",
        paddingBottom: "100px",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "clamp(16px,4vw,40px) 24px",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "12px",
            marginBottom: "32px",
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
              Product Comparison
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
              Compare Products ⚖️
            </h1>
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              onClick={() => navigate("/products")}
              style={{
                padding: "10px 16px",
                borderRadius: "10px",
                fontFamily: "DM Sans",
                fontSize: "13px",
                fontWeight: "600",
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
              + Add More
            </button>
            <button
              onClick={() => {
                dispatch(clearCompare());
                navigate("/products");
              }}
              style={{
                padding: "10px 16px",
                borderRadius: "10px",
                fontFamily: "DM Sans",
                fontSize: "13px",
                fontWeight: "600",
                cursor: "pointer",
                background: "#fff5f5",
                border: "1px solid #fca5a5",
                color: "#dc2626",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#fee2e2")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "#fff5f5")
              }
            >
              Clear All
            </button>
          </div>
        </div>

        {/* Compare Table */}
        <div style={{ overflowX: "auto" }}>
          <div style={{ minWidth: `${200 + items.length * 260}px` }}>
            {/* Product Cards Row */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: `200px repeat(${items.length}, 1fr)`,
                gap: "0",
                marginBottom: "0",
              }}
            >
              <div
                style={{
                  padding: "16px",
                  background: "#f8fafc",
                  borderRadius: "16px 0 0 0",
                  border: "1px solid #e2e8f0",
                  borderRight: "none",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <p
                  style={{
                    fontFamily: "DM Sans",
                    fontSize: "12px",
                    fontWeight: "700",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: "#94a3b8",
                    margin: 0,
                  }}
                >
                  Products
                </p>
              </div>
              {items.map((product, idx) => (
                <div
                  key={product._id}
                  style={{
                    padding: "20px",
                    background: "white",
                    border: "1px solid #e2e8f0",
                    borderLeft: idx === 0 ? "1px solid #e2e8f0" : "none",
                    borderRadius: idx === items.length - 1 ? "0 16px 0 0" : "0",
                    position: "relative",
                  }}
                >
                  {/* Remove */}
                  <button
                    onClick={() => dispatch(removeFromCompare(product._id))}
                    style={{
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      background: "#f8fafc",
                      border: "1px solid #e2e8f0",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#94a3b8",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#fef2f2";
                      e.currentTarget.style.color = "#ef4444";
                      e.currentTarget.style.borderColor = "#fca5a5";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "#f8fafc";
                      e.currentTarget.style.color = "#94a3b8";
                      e.currentTarget.style.borderColor = "#e2e8f0";
                    }}
                  >
                    <svg
                      style={{ width: "12px", height: "12px" }}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>

                  {/* Product Image */}
                  <Link to={`/products/${product.slug}`}>
                    <img
                      src={product.images?.[0]?.url}
                      alt={product.name}
                      style={{
                        width: "100%",
                        height: "160px",
                        objectFit: "cover",
                        borderRadius: "10px",
                        border: "1px solid #e2e8f0",
                        marginBottom: "12px",
                        transition: "opacity 0.2s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.opacity = "0.85")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.opacity = "1")
                      }
                    />
                  </Link>

                  <Link
                    to={`/products/${product.slug}`}
                    style={{ textDecoration: "none" }}
                  >
                    <p
                      style={{
                        fontFamily: "DM Sans",
                        fontSize: "14px",
                        fontWeight: "700",
                        color: "#0f172a",
                        margin: "0 0 4px 0",
                        lineHeight: 1.3,
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "#16a34a")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "#0f172a")
                      }
                    >
                      {product.name}
                    </p>
                  </Link>

                  <p
                    style={{
                      fontFamily: "Cormorant Garamond, serif",
                      fontSize: "20px",
                      fontWeight: "700",
                      color: "#16a34a",
                      margin: "0 0 12px 0",
                    }}
                  >
                    ₹{product.price?.toLocaleString()}
                  </p>

                  {/* Action Buttons */}
                  <div style={{ display: "flex", gap: "6px" }}>
                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={product.stock === 0}
                      style={{
                        flex: 1,
                        padding: "8px 0",
                        borderRadius: "8px",
                        fontFamily: "DM Sans",
                        fontSize: "12px",
                        fontWeight: "600",
                        cursor: product.stock > 0 ? "pointer" : "not-allowed",
                        background: product.stock > 0 ? "#16a34a" : "#f0f0f0",
                        color: product.stock > 0 ? "white" : "#94a3b8",
                        border: "none",
                        transition: "background 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        if (product.stock > 0)
                          e.currentTarget.style.background = "#15803d";
                      }}
                      onMouseLeave={(e) => {
                        if (product.stock > 0)
                          e.currentTarget.style.background = "#16a34a";
                      }}
                    >
                      {product.stock > 0 ? "🛒 Add to Cart" : "Out of Stock"}
                    </button>
                    <button
                      onClick={() => handleAddToWishlist(product)}
                      style={{
                        width: "34px",
                        height: "34px",
                        borderRadius: "8px",
                        fontFamily: "DM Sans",
                        fontSize: "16px",
                        cursor: "pointer",
                        background: "#f8fafc",
                        border: "1px solid #e2e8f0",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "all 0.2s",
                        flexShrink: 0,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#fff1f2";
                        e.currentTarget.style.borderColor = "#fda4af";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "#f8fafc";
                        e.currentTarget.style.borderColor = "#e2e8f0";
                      }}
                    >
                      ❤️
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Comparison Rows */}
            {rows.map((row, rowIdx) => {
              const differs = valuesDiffer(row.key, row.getValue);
              return (
                <div
                  key={row.key}
                  style={{
                    display: "grid",
                    gridTemplateColumns: `200px repeat(${items.length}, 1fr)`,
                    gap: 0,
                    background: rowIdx % 2 === 0 ? "#ffffff" : "#f8fafc",
                  }}
                >
                  {/* Label */}
                  <div
                    style={{
                      padding: "14px 16px",
                      border: "1px solid #e2e8f0",
                      borderTop: "none",
                      borderRight: "none",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "DM Sans",
                        fontSize: "12px",
                        fontWeight: "700",
                        color: "#64748b",
                        margin: 0,
                      }}
                    >
                      {row.label}
                    </p>
                    {differs && (
                      <span
                        style={{
                          fontSize: "10px",
                          padding: "1px 6px",
                          borderRadius: "10px",
                          background: "#fef9c3",
                          color: "#854d0e",
                          border: "1px solid #fde68a",
                          whiteSpace: "nowrap",
                        }}
                      >
                        differs
                      </span>
                    )}
                  </div>

                  {/* Values */}
                  {items.map((product, idx) => (
                    <div
                      key={product._id}
                      style={{
                        padding: "14px 16px",
                        border: "1px solid #e2e8f0",
                        borderTop: "none",
                        borderLeft: idx === 0 ? "1px solid #e2e8f0" : "none",
                        background: differs
                          ? rowIdx % 2 === 0
                            ? "#fffbeb"
                            : "#fefce8"
                          : "transparent",
                      }}
                    >
                      {row.render(product)}
                    </div>
                  ))}
                </div>
              );
            })}

            {/* Specs Rows */}
            {specKeys.length > 0 && (
              <>
                {/* Specs Header */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: `200px repeat(${items.length}, 1fr)`,
                    background: "#f0fdf4",
                  }}
                >
                  <div
                    style={{
                      padding: "12px 16px",
                      border: "1px solid #e2e8f0",
                      borderTop: "none",
                      borderRight: "none",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "DM Sans",
                        fontSize: "11px",
                        fontWeight: "700",
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        color: "#16a34a",
                        margin: 0,
                      }}
                    >
                      Specifications
                    </p>
                  </div>
                  {items.map((_, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: "12px 16px",
                        border: "1px solid #e2e8f0",
                        borderTop: "none",
                        borderLeft: idx === 0 ? "1px solid #e2e8f0" : "none",
                        background: "#f0fdf4",
                      }}
                    />
                  ))}
                </div>

                {specKeys.map((key, rowIdx) => {
                  const differs = valuesDiffer(
                    key,
                    (p) => p.specifications?.[key],
                  );
                  return (
                    <div
                      key={key}
                      style={{
                        display: "grid",
                        gridTemplateColumns: `200px repeat(${items.length}, 1fr)`,
                        background: rowIdx % 2 === 0 ? "#ffffff" : "#f8fafc",
                      }}
                    >
                      <div
                        style={{
                          padding: "12px 16px",
                          border: "1px solid #e2e8f0",
                          borderTop: "none",
                          borderRight: "none",
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                        }}
                      >
                        <p
                          style={{
                            fontFamily: "DM Sans",
                            fontSize: "12px",
                            fontWeight: "600",
                            color: "#64748b",
                            margin: 0,
                            textTransform: "capitalize",
                          }}
                        >
                          {key}
                        </p>
                        {differs && (
                          <span
                            style={{
                              fontSize: "10px",
                              padding: "1px 6px",
                              borderRadius: "10px",
                              background: "#fef9c3",
                              color: "#854d0e",
                              border: "1px solid #fde68a",
                            }}
                          >
                            differs
                          </span>
                        )}
                      </div>
                      {items.map((product, idx) => (
                        <div
                          key={product._id}
                          style={{
                            padding: "12px 16px",
                            border: "1px solid #e2e8f0",
                            borderTop: "none",
                            borderLeft:
                              idx === 0 ? "1px solid #e2e8f0" : "none",
                            background: differs ? "#fffbeb" : "transparent",
                          }}
                        >
                          <span
                            style={{
                              fontFamily: "DM Sans",
                              fontSize: "13px",
                              color: "#0f172a",
                            }}
                          >
                            {product.specifications?.[key] || "—"}
                          </span>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </>
            )}

            {/* Bottom rounded corners */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: `200px repeat(${items.length}, 1fr)`,
              }}
            >
              <div
                style={{
                  height: "16px",
                  background: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  borderTop: "none",
                  borderRight: "none",
                  borderRadius: "0 0 0 16px",
                }}
              />
              {items.map((_, idx) => (
                <div
                  key={idx}
                  style={{
                    height: "16px",
                    border: "1px solid #e2e8f0",
                    borderTop: "none",
                    borderLeft: idx === 0 ? "1px solid #e2e8f0" : "none",
                    borderRadius: idx === items.length - 1 ? "0 0 16px 0" : "0",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Verdict */}
        {items.length >= 2 && (
          <div
            style={{
              marginTop: "32px",
              padding: "clamp(16px,3vw,24px)",
              borderRadius: "16px",
              background: "#f0fdf4",
              border: "1px solid #bbf7d0",
            }}
          >
            <p
              style={{
                fontFamily: "DM Sans",
                fontSize: "13px",
                fontWeight: "700",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "#15803d",
                margin: "0 0 16px 0",
              }}
            >
              🏆 Quick Verdict
            </p>
            <div className="verdict-grid">
              {/* Best Price */}
              {(() => {
                const cheapest = [...items].sort(
                  (a, b) => a.price - b.price,
                )[0];
                return (
                  <div
                    style={{
                      padding: "14px",
                      background: "white",
                      borderRadius: "12px",
                      border: "1px solid #bbf7d0",
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
                        margin: "0 0 6px 0",
                      }}
                    >
                      💰 Best Price
                    </p>
                    <p
                      style={{
                        fontFamily: "DM Sans",
                        fontSize: "14px",
                        fontWeight: "700",
                        color: "#0f172a",
                        margin: "0 0 2px 0",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {cheapest.name}
                    </p>
                    <p
                      style={{
                        fontFamily: "Cormorant Garamond, serif",
                        fontSize: "18px",
                        fontWeight: "700",
                        color: "#16a34a",
                        margin: 0,
                      }}
                    >
                      ₹{cheapest.price?.toLocaleString()}
                    </p>
                  </div>
                );
              })()}

              {/* Best Rated */}
              {(() => {
                const bestRated = [...items].sort(
                  (a, b) =>
                    (b.ratings?.average || 0) - (a.ratings?.average || 0),
                )[0];
                return (
                  <div
                    style={{
                      padding: "14px",
                      background: "white",
                      borderRadius: "12px",
                      border: "1px solid #bbf7d0",
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
                        margin: "0 0 6px 0",
                      }}
                    >
                      ⭐ Best Rated
                    </p>
                    <p
                      style={{
                        fontFamily: "DM Sans",
                        fontSize: "14px",
                        fontWeight: "700",
                        color: "#0f172a",
                        margin: "0 0 2px 0",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {bestRated.name}
                    </p>
                    <p
                      style={{
                        fontFamily: "DM Sans",
                        fontSize: "14px",
                        color: "#f59e0b",
                        margin: 0,
                      }}
                    >
                      {"★".repeat(Math.round(bestRated.ratings?.average || 0))}{" "}
                      ({bestRated.ratings?.average?.toFixed(1) || "0.0"})
                    </p>
                  </div>
                );
              })()}

              {/* Most Popular */}
              {(() => {
                const mostPopular = [...items].sort(
                  (a, b) => (b.ratings?.count || 0) - (a.ratings?.count || 0),
                )[0];
                return (
                  <div
                    style={{
                      padding: "14px",
                      background: "white",
                      borderRadius: "12px",
                      border: "1px solid #bbf7d0",
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
                        margin: "0 0 6px 0",
                      }}
                    >
                      🔥 Most Popular
                    </p>
                    <p
                      style={{
                        fontFamily: "DM Sans",
                        fontSize: "14px",
                        fontWeight: "700",
                        color: "#0f172a",
                        margin: "0 0 2px 0",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {mostPopular.name}
                    </p>
                    <p
                      style={{
                        fontFamily: "DM Sans",
                        fontSize: "13px",
                        color: "#64748b",
                        margin: 0,
                      }}
                    >
                      {mostPopular.ratings?.count || 0} reviews
                    </p>
                  </div>
                );
              })()}
            </div>
          </div>
        )}
      </div>

      <style>{`
        .verdict-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
        }
        @media (min-width: 500px) { .verdict-grid { grid-template-columns: repeat(3, 1fr); } }
      `}</style>
    </div>
  );
};

export default ComparePage;
