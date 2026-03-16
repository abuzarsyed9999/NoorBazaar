import { useEffect, useState } from "react";
import API from "../../services/api";
import toast from "react-hot-toast";

const AdminReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const { data } = await API.get("/reviews/admin/all");
      setReviews(data.data || []);
    } catch {
      toast.error("Failed to load reviews");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (reviewId) => {
    if (!window.confirm("Delete this review?")) return;
    setDeleting(reviewId);
    try {
      await API.delete(`/reviews/${reviewId}`);
      toast.success("Review deleted");
      setReviews((p) => p.filter((r) => r._id !== reviewId));
    } catch {
      toast.error("Failed to delete");
    } finally {
      setDeleting(null);
    }
  };

  const Stars = ({ n }) => (
    <div style={{ display: "flex", gap: "1px" }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <span
          key={s}
          style={{ fontSize: "12px", color: s <= n ? "#c9a84c" : "#e2e8f0" }}
        >
          ★
        </span>
      ))}
    </div>
  );

  const filtered =
    filter === "all"
      ? reviews
      : reviews.filter((r) => r.rating === Number(filter));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <div>
          <h2
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "24px",
              fontWeight: "600",
              color: "#0f172a",
              margin: 0,
            }}
          >
            Reviews
          </h2>
          <p
            style={{
              fontFamily: "DM Sans",
              fontSize: "13px",
              color: "#64748b",
              margin: "2px 0 0 0",
            }}
          >
            {reviews.length} total reviews
          </p>
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "10px",
            padding: "9px 14px",
            fontFamily: "DM Sans",
            fontSize: "13px",
            color: "#0f172a",
            outline: "none",
            cursor: "pointer",
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = "#16a34a")}
          onBlur={(e) => (e.currentTarget.style.borderColor = "#e2e8f0")}
        >
          <option value="all">All Ratings</option>
          {[5, 4, 3, 2, 1].map((n) => (
            <option key={n} value={n}>
              {n} Star{n !== 1 ? "s" : ""}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                style={{
                  height: "100px",
                  borderRadius: "12px",
                  background: "#f0fdf4",
                  animation: "shimmer 1.5s infinite",
                }}
              />
            ))}
        </div>
      ) : filtered.length === 0 ? (
        <div
          style={{
            padding: "48px",
            textAlign: "center",
            borderRadius: "16px",
            background: "#ffffff",
            border: "1px solid #e2e8f0",
          }}
        >
          <p
            style={{
              fontFamily: "DM Sans",
              fontSize: "14px",
              color: "#94a3b8",
              margin: 0,
            }}
          >
            No reviews found
          </p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {filtered.map((r) => (
            <div
              key={r._id}
              style={{
                padding: "16px",
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
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  gap: "12px",
                  flexWrap: "wrap",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "12px",
                    flex: 1,
                    minWidth: 0,
                  }}
                >
                  {/* User Avatar */}
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
                      fontWeight: "700",
                      fontSize: "14px",
                      flexShrink: 0,
                    }}
                  >
                    {r.user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        flexWrap: "wrap",
                        marginBottom: "4px",
                      }}
                    >
                      <p
                        style={{
                          fontFamily: "DM Sans",
                          fontSize: "13px",
                          fontWeight: "700",
                          color: "#0f172a",
                          margin: 0,
                        }}
                      >
                        {r.user?.name}
                      </p>
                      <Stars n={r.rating} />
                      {r.isVerifiedPurchase && (
                        <span
                          style={{
                            fontFamily: "DM Sans",
                            fontSize: "10px",
                            fontWeight: "600",
                            color: "#16a34a",
                          }}
                        >
                          ✅ Verified
                        </span>
                      )}
                    </div>
                    {r.title && (
                      <p
                        style={{
                          fontFamily: "DM Sans",
                          fontSize: "13px",
                          fontWeight: "600",
                          color: "#0f172a",
                          margin: "0 0 4px 0",
                        }}
                      >
                        {r.title}
                      </p>
                    )}
                    <p
                      style={{
                        fontFamily: "DM Sans",
                        fontSize: "13px",
                        color: "#64748b",
                        margin: "0 0 6px 0",
                        lineHeight: 1.5,
                      }}
                    >
                      {r.comment}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        flexWrap: "wrap",
                      }}
                    >
                      {r.product && (
                        <span
                          style={{
                            fontFamily: "DM Sans",
                            fontSize: "11px",
                            color: "#94a3b8",
                          }}
                        >
                          Product:{" "}
                          <span style={{ color: "#16a34a", fontWeight: "600" }}>
                            {r.product?.name}
                          </span>
                        </span>
                      )}
                      <span
                        style={{
                          fontFamily: "DM Sans",
                          fontSize: "11px",
                          color: "#94a3b8",
                        }}
                      >
                        {new Date(r.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleDelete(r._id)}
                  disabled={deleting === r._id}
                  style={{
                    padding: "6px 14px",
                    borderRadius: "8px",
                    fontFamily: "DM Sans",
                    fontSize: "12px",
                    fontWeight: "600",
                    cursor: "pointer",
                    background: "#fff5f5",
                    border: "1px solid #fca5a5",
                    color: "#dc2626",
                    opacity: deleting === r._id ? 0.6 : 1,
                    flexShrink: 0,
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#fee2e2")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "#fff5f5")
                  }
                >
                  {deleting === r._id ? "..." : "Delete"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminReviews;
