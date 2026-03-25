import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createReview, updateReview } from "../../redux/slices/reviewSlice";
import toast from "react-hot-toast";

const MAX_IMAGES = 4;
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

const ReviewForm = ({ productId, existingReview, onClose }) => {
  const dispatch = useDispatch();
  const { submitting } = useSelector((s) => s.reviews);
  const fileRef = useRef(null);

  const [rating, setRating] = useState(existingReview?.rating || 0);
  const [hover, setHover] = useState(0);
  const [title, setTitle] = useState(existingReview?.title || "");
  const [comment, setComment] = useState(existingReview?.comment || "");
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState(
    existingReview?.images?.map((img) => ({
      url: img.url,
      isExisting: true,
    })) || [],
  );

  const ratingLabels = {
    1: "Poor 😞",
    2: "Fair 😐",
    3: "Good 😊",
    4: "Very Good 😄",
    5: "Excellent 🌟",
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const total = images.length + files.length;

    if (total > MAX_IMAGES) {
      toast.error(`Maximum ${MAX_IMAGES} images allowed`);
      return;
    }

    const validFiles = files.filter((f) => {
      if (f.size > MAX_SIZE) {
        toast.error(`${f.name} exceeds 5MB`);
        return false;
      }
      return true;
    });

    setImages((prev) => [...prev, ...validFiles]);
    const newPreviews = validFiles.map((f) => ({
      url: URL.createObjectURL(f),
      isExisting: false,
    }));
    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  const removeImage = (idx) => {
    const preview = previews[idx];
    if (!preview.isExisting) {
      URL.revokeObjectURL(preview.url);
      setImages((prev) => {
        const newImages = [...prev];
        // find index in images array (skip existing ones)
        const nonExistingBefore = previews
          .slice(0, idx)
          .filter((p) => !p.isExisting).length;
        newImages.splice(nonExistingBefore, 1);
        return newImages;
      });
    }
    setPreviews((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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

    const formData = new FormData();
    formData.append("productId", productId);
    formData.append("rating", rating);
    formData.append("title", title.trim());
    formData.append("comment", comment.trim());
    images.forEach((img) => formData.append("images", img));

    if (existingReview) {
      const result = await dispatch(
        updateReview({ id: existingReview._id, formData }),
      );
      if (!result.error) {
        toast.success("Review updated! 🌙");
        onClose?.();
      } else toast.error(result.payload || "Failed to update review");
    } else {
      const result = await dispatch(createReview(formData));
      if (!result.error) {
        toast.success("Review submitted! JazakAllah Khair 🌙");
        onClose?.();
      } else toast.error(result.payload || "Failed to submit review");
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
    boxSizing: "border-box",
    transition: "border-color 0.2s",
  };

  return (
    <div
      style={{
        padding: "24px",
        borderRadius: "16px",
        background: "white",
        border: "1px solid #e2e8f0",
        boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <h3
          style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: "22px",
            fontWeight: "600",
            color: "#0f172a",
            margin: 0,
          }}
        >
          {existingReview ? "Edit Your Review" : "Write a Review"} 🌙
        </h3>
        {onClose && (
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#94a3b8",
              fontSize: "20px",
              padding: "4px",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#ef4444")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#94a3b8")}
          >
            ✕
          </button>
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "18px" }}
      >
        {/* Star Rating */}
        <div>
          <label
            style={{
              display: "block",
              fontFamily: "DM Sans",
              fontSize: "13px",
              fontWeight: "600",
              color: "#64748b",
              marginBottom: "8px",
            }}
          >
            Your Rating *
          </label>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
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
                    padding: "2px",
                    transition: "transform 0.1s",
                  }}
                  onMouseDown={(e) =>
                    (e.currentTarget.style.transform = "scale(0.9)")
                  }
                  onMouseUp={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  <svg
                    style={{
                      width: "32px",
                      height: "32px",
                      transition: "all 0.15s",
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
                  fontSize: "14px",
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
          <label
            style={{
              display: "block",
              fontFamily: "DM Sans",
              fontSize: "13px",
              fontWeight: "600",
              color: "#64748b",
              marginBottom: "6px",
            }}
          >
            Review Title{" "}
            <span style={{ color: "#94a3b8", fontWeight: "400" }}>
              (optional)
            </span>
          </label>
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
              fontSize: "11px",
              color: "#94a3b8",
              margin: "3px 0 0 0",
              textAlign: "right",
            }}
          >
            {title.length}/100
          </p>
        </div>

        {/* Comment */}
        <div>
          <label
            style={{
              display: "block",
              fontFamily: "DM Sans",
              fontSize: "13px",
              fontWeight: "600",
              color: "#64748b",
              marginBottom: "6px",
            }}
          >
            Your Review *
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience with this product... What did you like or dislike?"
            rows={4}
            maxLength={1000}
            style={{
              ...inputStyle,
              resize: "vertical",
              minHeight: "100px",
              lineHeight: "1.6",
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "#16a34a")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "#e2e8f0")}
          />
          <p
            style={{
              fontFamily: "DM Sans",
              fontSize: "11px",
              color: comment.length >= 900 ? "#ef4444" : "#94a3b8",
              margin: "3px 0 0 0",
              textAlign: "right",
            }}
          >
            {comment.length}/1000
          </p>
        </div>

        {/* Image Upload */}
        <div>
          <label
            style={{
              display: "block",
              fontFamily: "DM Sans",
              fontSize: "13px",
              fontWeight: "600",
              color: "#64748b",
              marginBottom: "8px",
            }}
          >
            Add Photos{" "}
            <span style={{ color: "#94a3b8", fontWeight: "400" }}>
              (up to {MAX_IMAGES})
            </span>
          </label>

          {/* Previews */}
          {previews.length > 0 && (
            <div
              style={{
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
                marginBottom: "10px",
              }}
            >
              {previews.map((preview, idx) => (
                <div
                  key={idx}
                  style={{
                    position: "relative",
                    width: "80px",
                    height: "80px",
                  }}
                >
                  <img
                    src={preview.url}
                    alt={`Review image ${idx + 1}`}
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
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      background: "#ef4444",
                      border: "none",
                      color: "white",
                      cursor: "pointer",
                      fontSize: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                    }}
                  >
                    ✕
                  </button>
                </div>
              ))}

              {/* Add more */}
              {previews.length < MAX_IMAGES && (
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "8px",
                    border: "2px dashed #e2e8f0",
                    background: "#f8fafc",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "4px",
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
                  <span style={{ fontSize: "20px" }}>📷</span>
                  <span
                    style={{
                      fontFamily: "DM Sans",
                      fontSize: "9px",
                      color: "#94a3b8",
                    }}
                  >
                    Add
                  </span>
                </button>
              )}
            </div>
          )}

          {/* Upload Area */}
          {previews.length === 0 && (
            <div
              onClick={() => fileRef.current?.click()}
              style={{
                padding: "24px",
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
              <div style={{ fontSize: "32px", marginBottom: "8px" }}>📷</div>
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
                PNG, JPG up to 5MB each (max {MAX_IMAGES} photos)
              </p>
            </div>
          )}

          <input
            ref={fileRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={submitting}
          style={{
            padding: "13px 24px",
            borderRadius: "12px",
            background: submitting ? "#86efac" : "#16a34a",
            color: "white",
            fontFamily: "DM Sans",
            fontSize: "15px",
            fontWeight: "600",
            border: "none",
            cursor: submitting ? "not-allowed" : "pointer",
            transition: "all 0.2s",
            boxShadow: submitting ? "none" : "0 4px 12px rgba(22,163,74,0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
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
                  width: "16px",
                  height: "16px",
                  borderRadius: "50%",
                  border: "2px solid rgba(255,255,255,0.4)",
                  borderTopColor: "white",
                  animation: "spin 0.6s linear infinite",
                }}
              />
              Submitting...
            </>
          ) : existingReview ? (
            "✅ Update Review"
          ) : (
            "🌙 Submit Review"
          )}
        </button>
      </form>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default ReviewForm;
