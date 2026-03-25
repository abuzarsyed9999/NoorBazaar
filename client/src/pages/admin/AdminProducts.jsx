import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  fetchCategories,
} from "../../redux/slices/productSlice";
import API from "../../services/api";
import toast from "react-hot-toast";

const AdminProducts = () => {
  const dispatch = useDispatch();
  const { products, categories, loading } = useSelector((s) => s.products);
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("all");
  const [deleting, setDeleting] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [saving, setSaving] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [form, setForm] = useState({
    name: "",
    price: "",
    originalPrice: "",
    stock: "",
    description: "",
    shortDescription: "",
    category: "",
  });

  useEffect(() => {
    dispatch(fetchProducts("?limit=100"));
    dispatch(fetchCategories());
  }, []);

  const handleDelete = async (productId, productName) => {
    if (!window.confirm(`Delete "${productName}"?`)) return;
    setDeleting(productId);
    try {
      await API.delete(`/admin/products/${productId}`);
      toast.success("Product deleted");
      dispatch(fetchProducts("?limit=100"));
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete");
    } finally {
      setDeleting(null);
    }
  };

  const handleToggle = async (productId) => {
    try {
      await API.put(`/admin/products/${productId}/toggle`);
      toast.success("Product updated");
      dispatch(fetchProducts("?limit=100"));
    } catch {
      toast.error("Failed to update");
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.category) {
      toast.error("Name, price and category required");
      return;
    }
    setSaving(true);
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([k, v]) => {
        if (v) formData.append(k, v);
      });
      if (imageFile) formData.append("images", imageFile);
      await API.post("/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Product added! 🎉");
      setShowAdd(false);
      setForm({
        name: "",
        price: "",
        originalPrice: "",
        stock: "",
        description: "",
        shortDescription: "",
        category: "",
      });
      setImageFile(null);
      dispatch(fetchProducts("?limit=100"));
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add product");
    } finally {
      setSaving(false);
    }
  };

  const filtered = products.filter((p) => {
    const matchSearch =
      !search || p.name?.toLowerCase().includes(search.toLowerCase());
    const matchCat = catFilter === "all" || p.category?._id === catFilter;
    return matchSearch && matchCat;
  });

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
  const labelStyle = {
    display: "block",
    fontFamily: "DM Sans",
    fontSize: "12px",
    fontWeight: "500",
    color: "#64748b",
    marginBottom: "5px",
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
              fontSize: "26px",
              fontWeight: "600",
              color: "#0f172a",
              margin: 0,
            }}
          >
            Products
          </h2>
          <p
            style={{
              fontFamily: "DM Sans",
              fontSize: "13px",
              color: "#64748b",
              margin: "2px 0 0 0",
            }}
          >
            {products.length} total products
          </p>
        </div>
        <button
          onClick={() => setShowAdd((v) => !v)}
          style={{
            padding: "10px 20px",
            borderRadius: "10px",
            background: showAdd ? "#f8fafc" : "#16a34a",
            color: showAdd ? "#64748b" : "white",
            fontFamily: "DM Sans",
            fontSize: "13px",
            fontWeight: "600",
            border: showAdd ? "1px solid #e2e8f0" : "none",
            cursor: "pointer",
            transition: "all 0.2s",
            boxShadow: showAdd ? "none" : "0 4px 12px rgba(22,163,74,0.2)",
          }}
        >
          {showAdd ? "✕ Cancel" : "+ Add Product"}
        </button>
      </div>

      {/* Add Form */}
      {showAdd && (
        <form
          onSubmit={handleAddProduct}
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
            Add New Product
          </p>
          <div className="ap-form-grid">
            <div>
              <label style={labelStyle}>Product Name *</label>
              <input
                value={form.name}
                onChange={(e) =>
                  setForm((p) => ({ ...p, name: e.target.value }))
                }
                placeholder="Al-Quran Al-Kareem"
                style={inputStyle}
                required
                onFocus={(e) => (e.currentTarget.style.borderColor = "#16a34a")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "#e2e8f0")}
              />
            </div>
            <div>
              <label style={labelStyle}>Category *</label>
              <select
                value={form.category}
                onChange={(e) =>
                  setForm((p) => ({ ...p, category: e.target.value }))
                }
                style={inputStyle}
                required
                onFocus={(e) => (e.currentTarget.style.borderColor = "#16a34a")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "#e2e8f0")}
              >
                <option value="">Select category</option>
                {categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Price (₹) *</label>
              <input
                type="number"
                value={form.price}
                onChange={(e) =>
                  setForm((p) => ({ ...p, price: e.target.value }))
                }
                placeholder="999"
                style={inputStyle}
                required
                onFocus={(e) => (e.currentTarget.style.borderColor = "#16a34a")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "#e2e8f0")}
              />
            </div>
            <div>
              <label style={labelStyle}>Original Price (₹)</label>
              <input
                type="number"
                value={form.originalPrice}
                onChange={(e) =>
                  setForm((p) => ({ ...p, originalPrice: e.target.value }))
                }
                placeholder="1299"
                style={inputStyle}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#16a34a")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "#e2e8f0")}
              />
            </div>
            <div>
              <label style={labelStyle}>Stock *</label>
              <input
                type="number"
                value={form.stock}
                onChange={(e) =>
                  setForm((p) => ({ ...p, stock: e.target.value }))
                }
                placeholder="50"
                style={inputStyle}
                required
                onFocus={(e) => (e.currentTarget.style.borderColor = "#16a34a")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "#e2e8f0")}
              />
            </div>
            <div>
              <label style={labelStyle}>Product Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
                style={{ ...inputStyle, padding: "7px 14px" }}
              />
            </div>
            <div className="ap-col-2">
              <label style={labelStyle}>Short Description</label>
              <input
                value={form.shortDescription}
                onChange={(e) =>
                  setForm((p) => ({ ...p, shortDescription: e.target.value }))
                }
                placeholder="Brief product description..."
                style={inputStyle}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#16a34a")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "#e2e8f0")}
              />
            </div>
            <div className="ap-col-2">
              <label style={labelStyle}>Full Description</label>
              <textarea
                value={form.description}
                onChange={(e) =>
                  setForm((p) => ({ ...p, description: e.target.value }))
                }
                placeholder="Full product description..."
                rows={3}
                style={{ ...inputStyle, resize: "vertical", minHeight: "80px" }}
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
              boxShadow: "0 4px 12px rgba(22,163,74,0.2)",
            }}
          >
            {saving ? "Adding..." : "Add Product"}
          </button>
        </form>
      )}

      {/* Filters */}
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: 1,
            minWidth: "200px",
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "10px",
            padding: "9px 14px",
            fontFamily: "DM Sans",
            fontSize: "13px",
            color: "#0f172a",
            outline: "none",
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = "#16a34a")}
          onBlur={(e) => (e.currentTarget.style.borderColor = "#e2e8f0")}
        />
        <select
          value={catFilter}
          onChange={(e) => setCatFilter(e.target.value)}
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
          <option value="all">All Categories</option>
          {categories.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      {loading ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                style={{
                  height: "60px",
                  borderRadius: "10px",
                  background: "#f0fdf4",
                  animation: "shimmer 1.5s infinite",
                }}
              />
            ))}
        </div>
      ) : (
        <div
          style={{
            background: "#ffffff",
            borderRadius: "16px",
            border: "1px solid #e2e8f0",
            overflow: "hidden",
          }}
        >
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontFamily: "DM Sans",
                minWidth: "700px",
              }}
            >
              <thead
                style={{
                  background: "#f8fafc",
                  borderBottom: "1px solid #e2e8f0",
                }}
              >
                <tr>
                  {[
                    "Product",
                    "Category",
                    "Price",
                    "Stock",
                    "Rating",
                    "Status",
                    "Actions",
                  ].map((h) => (
                    <th
                      key={h}
                      style={{
                        textAlign: "left",
                        padding: "12px 16px",
                        fontSize: "11px",
                        fontWeight: "700",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        color: "#94a3b8",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr
                    key={p._id}
                    style={{
                      borderBottom: "1px solid #f8fafc",
                      transition: "background 0.15s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "#f8fffe")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "transparent")
                    }
                  >
                    <td style={{ padding: "12px 16px" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <img
                          src={p.images?.[0]?.url}
                          alt={p.name}
                          style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "8px",
                            objectFit: "cover",
                            background: "#f8fafc",
                            border: "1px solid #e2e8f0",
                            flexShrink: 0,
                          }}
                        />
                        <span
                          style={{
                            fontFamily: "DM Sans",
                            fontSize: "13px",
                            fontWeight: "600",
                            color: "#0f172a",
                            maxWidth: "180px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {p.name}
                        </span>
                      </div>
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        fontSize: "12px",
                        color: "#64748b",
                      }}
                    >
                      {p.category?.name || "—"}
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        fontFamily: "Cormorant Garamond, serif",
                        fontSize: "16px",
                        fontWeight: "700",
                        color: "#16a34a",
                      }}
                    >
                      ₹{p.price?.toLocaleString()}
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <span
                        style={{
                          fontFamily: "DM Sans",
                          fontSize: "12px",
                          fontWeight: "600",
                          color:
                            p.stock > 10
                              ? "#16a34a"
                              : p.stock > 0
                                ? "#d97706"
                                : "#dc2626",
                        }}
                      >
                        {p.stock} left
                      </span>
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        fontSize: "12px",
                        color: "#c9a84c",
                        fontWeight: "600",
                      }}
                    >
                      ⭐ {p.ratings?.toFixed(1)} ({p.numOfReviews})
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <span
                        style={{
                          fontSize: "11px",
                          fontWeight: "600",
                          padding: "3px 10px",
                          borderRadius: "20px",
                          background:
                            p.isActive !== false ? "#f0fdf4" : "#fff5f5",
                          color: p.isActive !== false ? "#16a34a" : "#dc2626",
                        }}
                      >
                        {p.isActive !== false ? "Active" : "Hidden"}
                      </span>
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <div style={{ display: "flex", gap: "6px" }}>
                        <button
                          onClick={() => handleToggle(p._id)}
                          style={{
                            padding: "5px 10px",
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
                          {p.isActive !== false ? "Hide" : "Show"}
                        </button>
                        <button
                          onClick={() => handleDelete(p._id, p.name)}
                          disabled={deleting === p._id}
                          style={{
                            padding: "5px 10px",
                            borderRadius: "8px",
                            fontFamily: "DM Sans",
                            fontSize: "11px",
                            fontWeight: "600",
                            cursor: "pointer",
                            background: "#fff5f5",
                            border: "1px solid #fca5a5",
                            color: "#dc2626",
                            opacity: deleting === p._id ? 0.6 : 1,
                            transition: "background 0.2s",
                          }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.background = "#fee2e2")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.background = "#fff5f5")
                          }
                        >
                          {deleting === p._id ? "..." : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <p
              style={{
                fontFamily: "DM Sans",
                fontSize: "14px",
                color: "#94a3b8",
                textAlign: "center",
                padding: "48px 0",
                margin: 0,
              }}
            >
              No products found
            </p>
          )}
        </div>
      )}

      <style>{`
        .ap-form-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
        @media (min-width: 768px) { .ap-form-grid { grid-template-columns: repeat(3, 1fr); } }
        .ap-col-2 { grid-column: 1 / -1; }
      `}</style>
    </div>
  );
};

export default AdminProducts;
