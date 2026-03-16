import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../redux/slices/productSlice";
import API from "../../services/api";
import toast from "react-hot-toast";

const AdminCategories = () => {
  const dispatch = useDispatch();
  const { categories, loading } = useSelector((s) => s.products);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(null);

  const [name, setName] = useState("");
  const [nameArabic, setNameArabic] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  const handleAdd = useCallback(
    async (e) => {
      e.preventDefault();
      if (!name.trim()) {
        toast.error("Category name is required");
        return;
      }
      setSaving(true);
      try {
        await API.post("/categories", { name, nameArabic, description });
        toast.success("Category added!");
        setShowForm(false);
        setName("");
        setNameArabic("");
        setDescription("");
        dispatch(fetchCategories());
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to add");
      } finally {
        setSaving(false);
      }
    },
    [name, nameArabic, description, dispatch],
  );

  const handleDelete = async (id, catName) => {
    if (!window.confirm(`Delete category "${catName}"?`)) return;
    setDeleting(id);
    try {
      await API.delete(`/categories/${id}`);
      toast.success("Category deleted");
      dispatch(fetchCategories());
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete");
    } finally {
      setDeleting(null);
    }
  };

  const handleToggle = async (id) => {
    try {
      await API.put(`/categories/${id}/toggle`);
      toast.success("Category status updated");
      dispatch(fetchCategories());
    } catch {
      toast.error("Failed to update");
    }
  };

  const inputStyle = {
    width: "100%",
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: "10px",
    padding: "9px 14px",
    fontFamily: "DM Sans",
    fontSize: "13px",
    color: "#0f172a",
    outline: "none",
    boxSizing: "border-box",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* Header */}
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
            Categories
          </h2>
          <p
            style={{
              fontFamily: "DM Sans",
              fontSize: "13px",
              color: "#64748b",
              margin: "2px 0 0 0",
            }}
          >
            {categories.length} categories
          </p>
        </div>
        <button
          onClick={() => setShowForm((v) => !v)}
          style={{
            padding: "10px 20px",
            borderRadius: "10px",
            background: showForm ? "#f8fafc" : "#16a34a",
            color: showForm ? "#64748b" : "white",
            fontFamily: "DM Sans",
            fontSize: "13px",
            fontWeight: "600",
            border: showForm ? "1px solid #e2e8f0" : "none",
            cursor: "pointer",
          }}
        >
          {showForm ? "✕ Cancel" : "+ Add Category"}
        </button>
      </div>

      {/* Add Form */}
      {showForm && (
        <form
          onSubmit={handleAdd}
          style={{
            padding: "20px",
            borderRadius: "16px",
            background: "#ffffff",
            border: "1px solid #bbf7d0",
            display: "flex",
            flexDirection: "column",
            gap: "14px",
          }}
        >
          <p
            style={{
              fontFamily: "DM Sans",
              fontSize: "15px",
              fontWeight: "700",
              color: "#0f172a",
              margin: 0,
            }}
          >
            Add Category
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))",
              gap: "12px",
            }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  fontFamily: "DM Sans",
                  fontSize: "12px",
                  fontWeight: "500",
                  color: "#64748b",
                  marginBottom: "5px",
                }}
              >
                Name (English) *
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Prayer Items"
                style={inputStyle}
                required
                onFocus={(e) => (e.currentTarget.style.borderColor = "#16a34a")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "#e2e8f0")}
              />
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  fontFamily: "DM Sans",
                  fontSize: "12px",
                  fontWeight: "500",
                  color: "#64748b",
                  marginBottom: "5px",
                }}
              >
                Name (Arabic)
              </label>
              <input
                value={nameArabic}
                onChange={(e) => setNameArabic(e.target.value)}
                placeholder="أدوات الصلاة"
                style={{ ...inputStyle, fontFamily: "Amiri, serif" }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#16a34a")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "#e2e8f0")}
              />
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  fontFamily: "DM Sans",
                  fontSize: "12px",
                  fontWeight: "500",
                  color: "#64748b",
                  marginBottom: "5px",
                }}
              >
                Description
              </label>
              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Short description..."
                style={inputStyle}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#16a34a")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "#e2e8f0")}
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={saving}
            style={{
              alignSelf: "flex-start",
              padding: "10px 24px",
              borderRadius: "10px",
              background: "#16a34a",
              color: "white",
              fontFamily: "DM Sans",
              fontSize: "14px",
              fontWeight: "600",
              border: "none",
              cursor: saving ? "not-allowed" : "pointer",
              opacity: saving ? 0.7 : 1,
            }}
          >
            {saving ? "Adding..." : "Add Category"}
          </button>
        </form>
      )}

      {/* Grid */}
      {loading ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))",
            gap: "12px",
          }}
        >
          {Array(6)
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
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))",
            gap: "12px",
          }}
        >
          {categories.map((cat) => (
            <div
              key={cat._id}
              style={{
                padding: "16px",
                borderRadius: "16px",
                background: "#ffffff",
                border:
                  cat.isActive !== false
                    ? "1px solid #e2e8f0"
                    : "1px solid #fca5a5",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#bbf7d0";
                e.currentTarget.style.boxShadow =
                  "0 4px 12px rgba(22,163,74,0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor =
                  cat.isActive !== false ? "#e2e8f0" : "#fca5a5";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  marginBottom: "8px",
                }}
              >
                <div>
                  <p
                    style={{
                      fontFamily: "DM Sans",
                      fontSize: "14px",
                      fontWeight: "700",
                      color: "#0f172a",
                      margin: 0,
                    }}
                  >
                    {cat.name}
                  </p>
                  {cat.nameArabic && (
                    <p
                      style={{
                        fontFamily: "Amiri, serif",
                        fontSize: "14px",
                        color: "#16a34a",
                        margin: "2px 0 0 0",
                      }}
                    >
                      {cat.nameArabic}
                    </p>
                  )}
                </div>
                <span
                  style={{
                    fontSize: "10px",
                    fontWeight: "700",
                    padding: "3px 8px",
                    borderRadius: "20px",
                    background: cat.isActive !== false ? "#f0fdf4" : "#fff5f5",
                    color: cat.isActive !== false ? "#16a34a" : "#dc2626",
                    flexShrink: 0,
                  }}
                >
                  {cat.isActive !== false ? "Active" : "Hidden"}
                </span>
              </div>
              {cat.description && (
                <p
                  style={{
                    fontFamily: "DM Sans",
                    fontSize: "12px",
                    color: "#94a3b8",
                    margin: "0 0 10px 0",
                  }}
                >
                  {cat.description}
                </p>
              )}
              <p
                style={{
                  fontFamily: "DM Sans",
                  fontSize: "11px",
                  color: "#94a3b8",
                  margin: "0 0 12px 0",
                }}
              >
                Slug: {cat.slug}
              </p>
              <div style={{ display: "flex", gap: "8px" }}>
                <button
                  onClick={() => handleToggle(cat._id)}
                  style={{
                    flex: 1,
                    padding: "6px",
                    borderRadius: "8px",
                    fontFamily: "DM Sans",
                    fontSize: "11px",
                    fontWeight: "600",
                    cursor: "pointer",
                    background: "#f0fdf4",
                    border: "1px solid #bbf7d0",
                    color: "#15803d",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#dcfce7")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "#f0fdf4")
                  }
                >
                  {cat.isActive !== false ? "Hide" : "Show"}
                </button>
                <button
                  onClick={() => handleDelete(cat._id, cat.name)}
                  disabled={deleting === cat._id}
                  style={{
                    flex: 1,
                    padding: "6px",
                    borderRadius: "8px",
                    fontFamily: "DM Sans",
                    fontSize: "11px",
                    fontWeight: "600",
                    cursor: "pointer",
                    background: "#fff5f5",
                    border: "1px solid #fca5a5",
                    color: "#dc2626",
                    opacity: deleting === cat._id ? 0.6 : 1,
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#fee2e2")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "#fff5f5")
                  }
                >
                  {deleting === cat._id ? "..." : "Delete"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminCategories;
