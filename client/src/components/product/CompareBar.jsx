import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  removeFromCompare,
  clearCompare,
} from "../../redux/slices/compareSlice";

const CompareBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((s) => s.compare);

  if (items.length === 0) return null;

  return (
    <>
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 999,
          background: "white",
          borderTop: "2px solid #16a34a",
          boxShadow: "0 -4px 24px rgba(0,0,0,0.1)",
          animation: "slideUp 0.3s ease",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "12px clamp(12px,3vw,24px)",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          {/* Label */}
          <div style={{ flexShrink: 0 }}>
            <p
              style={{
                fontFamily: "DM Sans",
                fontSize: "12px",
                fontWeight: "700",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "#16a34a",
                margin: "0 0 2px 0",
              }}
            >
              ⚖️ Compare
            </p>
            <p
              style={{
                fontFamily: "DM Sans",
                fontSize: "11px",
                color: "#94a3b8",
                margin: 0,
              }}
            >
              {items.length}/3 products
            </p>
          </div>

          {/* Divider */}
          <div
            style={{
              width: "1px",
              height: "40px",
              background: "#e2e8f0",
              flexShrink: 0,
            }}
          />

          {/* Products */}
          <div
            style={{ display: "flex", gap: "10px", flex: 1, flexWrap: "wrap" }}
          >
            {items.map((product) => (
              <div
                key={product._id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "6px 10px",
                  background: "#f0fdf4",
                  borderRadius: "10px",
                  border: "1px solid #bbf7d0",
                }}
              >
                <img
                  src={product.images?.[0]?.url}
                  alt={product.name}
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "6px",
                    objectFit: "cover",
                    border: "1px solid #e2e8f0",
                  }}
                />
                <div style={{ maxWidth: "120px" }}>
                  <p
                    style={{
                      fontFamily: "DM Sans",
                      fontSize: "12px",
                      fontWeight: "600",
                      color: "#0f172a",
                      margin: 0,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {product.name}
                  </p>
                  <p
                    style={{
                      fontFamily: "DM Sans",
                      fontSize: "11px",
                      color: "#16a34a",
                      fontWeight: "700",
                      margin: 0,
                    }}
                  >
                    ₹{product.price?.toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => dispatch(removeFromCompare(product._id))}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#94a3b8",
                    padding: "2px",
                    display: "flex",
                    alignItems: "center",
                    transition: "color 0.2s",
                    flexShrink: 0,
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#ef4444")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#94a3b8")
                  }
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ))}

            {/* Empty slots */}
            {Array(3 - items.length)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "120px",
                    height: "52px",
                    borderRadius: "10px",
                    border: "2px dashed #e2e8f0",
                    background: "#f8fafc",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "DM Sans",
                      fontSize: "11px",
                      color: "#cbd5e1",
                      margin: 0,
                    }}
                  >
                    + Add product
                  </p>
                </div>
              ))}
          </div>

          {/* Actions */}
          <div
            style={{
              display: "flex",
              gap: "8px",
              flexShrink: 0,
              marginLeft: "auto",
            }}
          >
            <button
              onClick={() => dispatch(clearCompare())}
              style={{
                padding: "8px 16px",
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
                e.currentTarget.style.borderColor = "#ef4444";
                e.currentTarget.style.color = "#ef4444";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#e2e8f0";
                e.currentTarget.style.color = "#64748b";
              }}
            >
              Clear
            </button>
            <button
              onClick={() => navigate("/compare")}
              disabled={items.length < 2}
              style={{
                padding: "8px 20px",
                borderRadius: "10px",
                fontFamily: "DM Sans",
                fontSize: "13px",
                fontWeight: "600",
                cursor: items.length < 2 ? "not-allowed" : "pointer",
                background: items.length >= 2 ? "#16a34a" : "#f0f0f0",
                color: items.length >= 2 ? "white" : "#94a3b8",
                border: "none",
                transition: "all 0.2s",
                boxShadow:
                  items.length >= 2
                    ? "0 4px 12px rgba(22,163,74,0.25)"
                    : "none",
              }}
              onMouseEnter={(e) => {
                if (items.length >= 2)
                  e.currentTarget.style.background = "#15803d";
              }}
              onMouseLeave={(e) => {
                if (items.length >= 2)
                  e.currentTarget.style.background = "#16a34a";
              }}
            >
              Compare Now →
            </button>
          </div>
        </div>
      </div>

      {/* Bottom padding so content not hidden behind bar */}
      <div style={{ height: "80px" }} />

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
      `}</style>
    </>
  );
};

export default CompareBar;
