import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchReviews,
  deleteReview,
  toggleHelpful,
} from "../../redux/slices/reviewSlice";
import ReviewForm from "./ReviewForm";
import toast from "react-hot-toast";

const ReviewList = ({ productId }) => {
  const dispatch = useDispatch();
  const {
    reviews,
    userReview,
    ratingBreakdown,
    total,
    loading,
    totalPages,
    page,
  } = useSelector((s) => s.reviews);
  const { isAuth, user } = useSelector((s) => s.auth);

  const [showForm, setShowForm] = useState(false);
  const [editReview, setEditReview] = useState(null);
  const [filterRating, setFilterRating] = useState(0);
  const [sortBy, setSortBy] = useState("-createdAt");
  const [lightbox, setLightbox] = useState(null);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    dispatch(
      fetchReviews({ productId, page: 1, rating: filterRating, sort: sortBy }),
    );
  }, [productId, filterRating, sortBy]);

  const handleDelete = async (reviewId) => {
    if (!window.confirm("Delete your review?")) return;
    setDeleting(reviewId);
    const result = await dispatch(deleteReview(reviewId));
    if (!result.error) toast.success("Review deleted");
    else toast.error("Failed to delete review");
    setDeleting(null);
  };

  const handleHelpful = (reviewId) => {
    if (!isAuth) {
      toast.error("Please login to vote");
      return;
    }
    dispatch(toggleHelpful(reviewId));
  };

  const loadMore = () => {
    dispatch(
      fetchReviews({
        productId,
        page: page + 1,
        rating: filterRating,
        sort: sortBy,
      }),
    );
  };

  const avgRating =
    Object.entries(ratingBreakdown).reduce(
      (acc, [star, count]) => acc + Number(star) * count,
      0,
    ) / (total || 1);

  const shimmer = {
    background: "linear-gradient(90deg,#f0fdf4 25%,#dcfce7 50%,#f0fdf4 75%)",
    backgroundSize: "200% 100%",
    animation: "shimmer 1.5s infinite",
    borderRadius: "12px",
  };

  return (
    <div style={{ marginTop: "48px" }}>
      {/* Section Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "12px",
          marginBottom: "28px",
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

        {isAuth && !userReview && !showForm && (
          <button
            onClick={() => setShowForm(true)}
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

      {/* Review Form */}
      {(showForm || editReview) && (
        <div style={{ marginBottom: "28px" }}>
          <ReviewForm
            productId={productId}
            existingReview={editReview}
            onClose={() => {
              setShowForm(false);
              setEditReview(null);
            }}
          />
        </div>
      )}

      {/* Rating Summary */}
      {total > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "auto 1fr",
            gap: "24px",
            padding: "clamp(16px,3vw,24px)",
            borderRadius: "16px",
            background: "white",
            border: "1px solid #e2e8f0",
            marginBottom: "24px",
            alignItems: "center",
          }}
        >
          {/* Average */}
          <div
            style={{
              textAlign: "center",
              padding: "0 clamp(8px,2vw,24px)",
              borderRight: "1px solid #e2e8f0",
            }}
          >
            <p
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "clamp(40px,6vw,56px)",
                fontWeight: "700",
                color: "#0f172a",
                margin: "0 0 4px 0",
                lineHeight: 1,
              }}
            >
              {avgRating.toFixed(1)}
            </p>
            <div
              style={{
                display: "flex",
                gap: "2px",
                justifyContent: "center",
                marginBottom: "4px",
              }}
            >
              {[1, 2, 3, 4, 5].map((s) => (
                <svg
                  key={s}
                  style={{
                    width: "16px",
                    height: "16px",
                    fill: s <= Math.round(avgRating) ? "#f59e0b" : "#e2e8f0",
                  }}
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
            <p
              style={{
                fontFamily: "DM Sans",
                fontSize: "12px",
                color: "#94a3b8",
                margin: 0,
              }}
            >
              {total} review{total !== 1 ? "s" : ""}
            </p>
          </div>

          {/* Breakdown Bars */}
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {[5, 4, 3, 2, 1].map((star) => {
              const count = ratingBreakdown[star] || 0;
              const percent = total > 0 ? (count / total) * 100 : 0;
              return (
                <div
                  key={star}
                  onClick={() =>
                    setFilterRating(filterRating === star ? 0 : star)
                  }
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    cursor: "pointer",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "DM Sans",
                      fontSize: "12px",
                      color: "#64748b",
                      width: "8px",
                      flexShrink: 0,
                    }}
                  >
                    {star}
                  </span>
                  <svg
                    style={{
                      width: "12px",
                      height: "12px",
                      fill: "#f59e0b",
                      flexShrink: 0,
                    }}
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <div
                    style={{
                      flex: 1,
                      height: "8px",
                      background: "#f0f0f0",
                      borderRadius: "4px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${percent}%`,
                        background:
                          filterRating === star ? "#16a34a" : "#f59e0b",
                        borderRadius: "4px",
                        transition: "width 0.5s",
                      }}
                    />
                  </div>
                  <span
                    style={{
                      fontFamily: "DM Sans",
                      fontSize: "12px",
                      color: "#94a3b8",
                      width: "28px",
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

      {/* Filters & Sort */}
      {total > 0 && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "10px",
            marginBottom: "20px",
          }}
        >
          {/* Filter Pills */}
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {[0, 5, 4, 3, 2, 1].map((star) => (
              <button
                key={star}
                onClick={() => setFilterRating(star)}
                style={{
                  padding: "5px 12px",
                  borderRadius: "20px",
                  fontFamily: "DM Sans",
                  fontSize: "12px",
                  fontWeight: "600",
                  cursor: "pointer",
                  background: filterRating === star ? "#16a34a" : "#f8fafc",
                  color: filterRating === star ? "white" : "#64748b",
                  border: `1px solid ${filterRating === star ? "#16a34a" : "#e2e8f0"}`,
                  transition: "all 0.2s",
                }}
              >
                {star === 0 ? "All" : `${star}★`}
              </button>
            ))}
          </div>

          {/* Sort */}
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

      {/* Reviews List */}
      {loading ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <div key={i} style={{ height: "140px", ...shimmer }} />
            ))}
        </div>
      ) : reviews.length === 0 ? (
        <div
          style={{
            padding: "48px 24px",
            textAlign: "center",
            borderRadius: "16px",
            background: "#f8fafc",
            border: "1px dashed #e2e8f0",
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
            No Reviews Yet
          </h3>
          <p
            style={{
              fontFamily: "DM Sans",
              fontSize: "14px",
              color: "#64748b",
              margin: "0 0 20px 0",
            }}
          >
            Be the first to review this product!
          </p>
          {isAuth && !userReview && !showForm && (
            <button
              onClick={() => setShowForm(true)}
              style={{
                padding: "10px 24px",
                borderRadius: "10px",
                background: "#16a34a",
                color: "white",
                fontFamily: "DM Sans",
                fontSize: "14px",
                fontWeight: "600",
                border: "none",
                cursor: "pointer",
              }}
            >
              Write First Review
            </button>
          )}
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {reviews.map((review) => {
            const isOwn = user?._id === review.user?._id;
            const isDeleting = deleting === review._id;

            return (
              <div
                key={review._id}
                style={{
                  padding: "clamp(14px,2vw,20px)",
                  borderRadius: "14px",
                  background: "white",
                  border: isOwn ? "1px solid #bbf7d0" : "1px solid #e2e8f0",
                  transition: "box-shadow 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.boxShadow =
                    "0 4px 16px rgba(0,0,0,0.06)")
                }
                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
              >
                {/* Review Header */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: "12px",
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
                      {review.user?.name?.charAt(0).toUpperCase()}
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
                          {review.user?.name}
                        </p>
                        {review.isVerifiedPurchase && (
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
                            ✅ Verified Purchase
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
                            Your Review
                          </span>
                        )}
                        {review.isEdited && (
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
                        {new Date(review.createdAt).toLocaleDateString(
                          "en-IN",
                          { day: "numeric", month: "long", year: "numeric" },
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Stars */}
                  <div style={{ display: "flex", gap: "2px" }}>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <svg
                        key={s}
                        style={{
                          width: "14px",
                          height: "14px",
                          fill: s <= review.rating ? "#f59e0b" : "#e2e8f0",
                        }}
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                </div>

                {/* Title */}
                {review.title && (
                  <p
                    style={{
                      fontFamily: "DM Sans",
                      fontSize: "15px",
                      fontWeight: "700",
                      color: "#0f172a",
                      margin: "0 0 6px 0",
                    }}
                  >
                    {review.title}
                  </p>
                )}

                {/* Comment */}
                <p
                  style={{
                    fontFamily: "DM Sans",
                    fontSize: "14px",
                    color: "#475569",
                    margin: "0 0 12px 0",
                    lineHeight: 1.6,
                  }}
                >
                  {review.comment}
                </p>

                {/* Images */}
                {review.images?.length > 0 && (
                  <div
                    style={{
                      display: "flex",
                      gap: "8px",
                      flexWrap: "wrap",
                      marginBottom: "12px",
                    }}
                  >
                    {review.images.map((img, i) => (
                      <img
                        key={i}
                        src={img.url}
                        alt={`Review photo ${i + 1}`}
                        onClick={() => setLightbox(img.url)}
                        style={{
                          width: "72px",
                          height: "72px",
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
                  {/* Helpful */}
                  <button
                    onClick={() => handleHelpful(review._id)}
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
                    👍 Helpful (
                    {review.helpfulCount || review.helpfulVotes?.length || 0})
                  </button>

                  {/* Edit / Delete for own review */}
                  {isOwn && (
                    <div style={{ display: "flex", gap: "6px" }}>
                      <button
                        onClick={() => {
                          setEditReview(review);
                          setShowForm(false);
                          window.scrollTo({
                            top:
                              document.getElementById("reviews-section")
                                ?.offsetTop - 80,
                            behavior: "smooth",
                          });
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
                        onClick={() => handleDelete(review._id)}
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

      {/* Load More */}
      {page < totalPages && (
        <div style={{ textAlign: "center", marginTop: "24px" }}>
          <button
            onClick={loadMore}
            disabled={loading}
            style={{
              padding: "11px 32px",
              borderRadius: "12px",
              fontFamily: "DM Sans",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
              background: "transparent",
              border: "1px solid #16a34a",
              color: "#16a34a",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#f0fdf4";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
            }}
          >
            Load More Reviews
          </button>
        </div>
      )}

      {/* Lightbox */}
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
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.15)",
              border: "none",
              color: "white",
              fontSize: "20px",
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
            alt="Review image"
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
      `}</style>
    </div>
  );
};

export default ReviewList;
