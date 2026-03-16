import { useEffect, useState, useCallback } from "react";
import API from "../../services/api";
import toast from "react-hot-toast";

const AdminCoupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(null);

  const [code, setCode] = useState("");
  const [discountType, setDiscountType] = useState("percentage");
  const [discount, setDiscount] = useState("");
  const [minOrder, setMinOrder] = useState("");
  const [maxDiscount, setMaxDiscount] = useState("");
  const [expiresAt, setExpiresAt] = useState("");
  const [usageLimit, setUsageLimit] = useState("");

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    setLoading(true);
    try {
      const { data } = await API.get("/coupons");
      setCoupons(data.data || []);
    } catch {
      toast.error("Failed to load coupons");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = useCallback(
    async (e) => {
      e.preventDefault();
      if (!code || !discount) {
        toast.error("Code and discount are required");
        return;
      }
      setSaving(true);
      try {
        await API.post("/coupons", {
          code: code.toUpperCase(),
          discountType,
          discount: Number(discount),
          minOrderAmount: Number(minOrder) || 0,
          maxDiscountAmount: Number(maxDiscount) || undefined,
          expiresAt: expiresAt || undefined,
          usageLimit: Number(usageLimit) || undefined,
        });
        toast.success("Coupon created! 🎟️");
        setShowForm(false);
        setCode("");
        setDiscount("");
        setMinOrder("");
        setMaxDiscount("");
        setExpiresAt("");
        setUsageLimit("");
        fetchCoupons();
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to create coupon");
      } finally {
        setSaving(false);
      }
    },
    [
      code,
      discountType,
      discount,
      minOrder,
      maxDiscount,
      expiresAt,
      usageLimit,
    ],
  );

  const handleToggle = async (id) => {
    try {
      await API.put(`/coupons/${id}/toggle`);
      toast.success("Coupon updated");
      fetchCoupons();
    } catch {
      toast.error("Failed to update");
    }
  };

  const handleDelete = async (id, couponCode) => {
    if (!window.confirm(`Delete coupon "${couponCode}"?`)) return;
    setDeleting(id);
    try {
      await API.delete(`/coupons/${id}`);
      toast.success("Coupon deleted");
      fetchCoupons();
    } catch {
      toast.error("Failed to delete");
    } finally {
      setDeleting(null);
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
            Coupons
          </h2>
          <p
            style={{
              fontFamily: "DM Sans",
              fontSize: "13px",
              color: "#64748b",
              margin: "2px 0 0 0",
            }}
          >
            {coupons.length} coupons
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
          {showForm ? "✕ Cancel" : "+ Create Coupon"}
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
            Create Coupon
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))",
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
                Coupon Code *
              </label>
              <input
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="RAMADAN10"
                style={{
                  ...inputStyle,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  fontWeight: "700",
                }}
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
                Discount Type
              </label>
              <select
                value={discountType}
                onChange={(e) => setDiscountType(e.target.value)}
                style={inputStyle}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#16a34a")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "#e2e8f0")}
              >
                <option value="percentage">Percentage (%)</option>
                <option value="fixed">Fixed (₹)</option>
              </select>
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
                Discount Value *
              </label>
              <input
                type="number"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                placeholder={discountType === "percentage" ? "10" : "100"}
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
                Min Order (₹)
              </label>
              <input
                type="number"
                value={minOrder}
                onChange={(e) => setMinOrder(e.target.value)}
                placeholder="500"
                style={inputStyle}
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
                Max Discount (₹)
              </label>
              <input
                type="number"
                value={maxDiscount}
                onChange={(e) => setMaxDiscount(e.target.value)}
                placeholder="200"
                style={inputStyle}
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
                Expires At
              </label>
              <input
                type="date"
                value={expiresAt}
                onChange={(e) => setExpiresAt(e.target.value)}
                style={inputStyle}
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
                Usage Limit
              </label>
              <input
                type="number"
                value={usageLimit}
                onChange={(e) => setUsageLimit(e.target.value)}
                placeholder="100"
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
            {saving ? "Creating..." : "Create Coupon"}
          </button>
        </form>
      )}

      {/* Coupons Table */}
      {loading ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                style={{
                  height: "60px",
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
                minWidth: "600px",
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
                    "Code",
                    "Type",
                    "Discount",
                    "Min Order",
                    "Used",
                    "Expires",
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
                {coupons.map((c) => {
                  const expired =
                    c.expiresAt && new Date(c.expiresAt) < new Date();
                  return (
                    <tr
                      key={c._id}
                      style={{ borderBottom: "1px solid #f8fafc" }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background = "#f8fffe")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = "transparent")
                      }
                    >
                      <td style={{ padding: "12px 16px" }}>
                        <span
                          style={{
                            fontFamily: "DM Sans",
                            fontSize: "13px",
                            fontWeight: "800",
                            color: "#0f172a",
                            letterSpacing: "0.08em",
                            background: "#f0fdf4",
                            padding: "4px 10px",
                            borderRadius: "8px",
                            border: "1px solid #bbf7d0",
                          }}
                        >
                          {c.code}
                        </span>
                      </td>
                      <td
                        style={{
                          padding: "12px 16px",
                          fontSize: "12px",
                          color: "#64748b",
                          textTransform: "capitalize",
                        }}
                      >
                        {c.discountType}
                      </td>
                      <td
                        style={{
                          padding: "12px 16px",
                          fontSize: "14px",
                          fontWeight: "700",
                          color: "#16a34a",
                        }}
                      >
                        {c.discountType === "percentage"
                          ? `${c.discount}%`
                          : `₹${c.discount}`}
                      </td>
                      <td
                        style={{
                          padding: "12px 16px",
                          fontSize: "13px",
                          color: "#64748b",
                        }}
                      >
                        ₹{c.minOrderAmount || 0}
                      </td>
                      <td
                        style={{
                          padding: "12px 16px",
                          fontSize: "13px",
                          color: "#64748b",
                        }}
                      >
                        {c.usedCount || 0}
                        {c.usageLimit ? `/${c.usageLimit}` : ""}
                      </td>
                      <td
                        style={{
                          padding: "12px 16px",
                          fontSize: "12px",
                          color: expired ? "#dc2626" : "#64748b",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {c.expiresAt
                          ? new Date(c.expiresAt).toLocaleDateString("en-IN")
                          : "No expiry"}
                      </td>
                      <td style={{ padding: "12px 16px" }}>
                        <span
                          style={{
                            fontSize: "11px",
                            fontWeight: "600",
                            padding: "3px 10px",
                            borderRadius: "20px",
                            background:
                              c.isActive && !expired ? "#f0fdf4" : "#fff5f5",
                            color:
                              c.isActive && !expired ? "#16a34a" : "#dc2626",
                          }}
                        >
                          {expired
                            ? "Expired"
                            : c.isActive
                              ? "Active"
                              : "Disabled"}
                        </span>
                      </td>
                      <td style={{ padding: "12px 16px" }}>
                        <div style={{ display: "flex", gap: "6px" }}>
                          <button
                            onClick={() => handleToggle(c._id)}
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
                            }}
                          >
                            {c.isActive ? "Disable" : "Enable"}
                          </button>
                          <button
                            onClick={() => handleDelete(c._id, c.code)}
                            disabled={deleting === c._id}
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
                              opacity: deleting === c._id ? 0.6 : 1,
                            }}
                          >
                            {deleting === c._id ? "..." : "Delete"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {coupons.length === 0 && (
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
              No coupons yet. Create your first one!
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminCoupons;
