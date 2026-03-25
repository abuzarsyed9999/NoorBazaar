import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAdminOrders,
  updateOrderStatus,
} from "../../redux/slices/adminSlice";
import toast from "react-hot-toast";

const statusOptions = [
  "Pending",
  "Confirmed",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];
const statusStyle = {
  Pending: { bg: "#fefce8", color: "#854d0e", border: "#fde68a" },
  Confirmed: { bg: "#eff6ff", color: "#1d4ed8", border: "#bfdbfe" },
  Processing: { bg: "#faf5ff", color: "#7e22ce", border: "#e9d5ff" },
  Shipped: { bg: "#f0f9ff", color: "#0369a1", border: "#bae6fd" },
  Delivered: { bg: "#f0fdf4", color: "#15803d", border: "#bbf7d0" },
  Cancelled: { bg: "#fff5f5", color: "#dc2626", border: "#fca5a5" },
};

const AdminOrders = () => {
  const dispatch = useDispatch();
  const { orders, loading } = useSelector((s) => s.admin);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [updating, setUpdating] = useState(null);

  useEffect(() => {
    dispatch(fetchAdminOrders());
  }, []);

  const handleStatusChange = async (orderId, status) => {
    setUpdating(orderId);
    const r = await dispatch(updateOrderStatus({ orderId, status }));
    setUpdating(null);
    if (r.meta.requestStatus === "fulfilled")
      toast.success(`Order marked as ${status}`);
    else toast.error(r.payload || "Failed to update");
  };

  const filtered = orders.filter((o) => {
    const matchSearch =
      !search ||
      o.orderNumber?.includes(search) ||
      o.user?.name?.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || o.orderStatus === filter;
    return matchSearch && matchFilter;
  });

  const inputStyle = {
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "10px",
    padding: "9px 14px",
    fontFamily: "DM Sans",
    fontSize: "13px",
    color: "#0f172a",
    outline: "none",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* Header */}
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
          Orders
        </h2>
        <p
          style={{
            fontFamily: "DM Sans",
            fontSize: "13px",
            color: "#64748b",
            margin: "2px 0 0 0",
          }}
        >
          {orders.length} total orders
        </p>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <input
          type="text"
          placeholder="Search order # or customer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ ...inputStyle, flex: 1, minWidth: "200px" }}
          onFocus={(e) => (e.currentTarget.style.borderColor = "#16a34a")}
          onBlur={(e) => (e.currentTarget.style.borderColor = "#e2e8f0")}
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{ ...inputStyle, cursor: "pointer" }}
          onFocus={(e) => (e.currentTarget.style.borderColor = "#16a34a")}
          onBlur={(e) => (e.currentTarget.style.borderColor = "#e2e8f0")}
        >
          <option value="all">All Status</option>
          {statusOptions.map((s) => (
            <option key={s} value={s}>
              {s}
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
                  height: "56px",
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
                minWidth: "750px",
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
                    "Order #",
                    "Customer",
                    "Items",
                    "Total",
                    "Payment",
                    "Status",
                    "Date",
                    "Update",
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
                {filtered.map((order) => {
                  const sc =
                    statusStyle[order.orderStatus] || statusStyle.Pending;
                  return (
                    <tr
                      key={order._id}
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
                      <td
                        style={{
                          padding: "12px 16px",
                          fontSize: "13px",
                          fontWeight: "700",
                          color: "#0f172a",
                        }}
                      >
                        #{order.orderNumber}
                      </td>
                      <td
                        style={{
                          padding: "12px 16px",
                          fontSize: "13px",
                          color: "#64748b",
                        }}
                      >
                        {order.user?.name || "—"}
                      </td>
                      <td
                        style={{
                          padding: "12px 16px",
                          fontSize: "13px",
                          color: "#64748b",
                        }}
                      >
                        {order.items?.length}
                      </td>
                      <td
                        style={{
                          padding: "12px 16px",
                          fontSize: "15px",
                          fontWeight: "700",
                          color: "#16a34a",
                          fontFamily: "Cormorant Garamond, serif",
                        }}
                      >
                        ₹{order.totalPrice?.toLocaleString()}
                      </td>
                      <td style={{ padding: "12px 16px" }}>
                        <span
                          style={{
                            fontSize: "12px",
                            fontWeight: "600",
                            color:
                              order.paymentStatus === "Paid"
                                ? "#16a34a"
                                : "#d97706",
                          }}
                        >
                          {order.paymentStatus}
                        </span>
                      </td>
                      <td style={{ padding: "12px 16px" }}>
                        <span
                          style={{
                            fontSize: "11px",
                            fontWeight: "600",
                            padding: "3px 10px",
                            borderRadius: "20px",
                            background: sc.bg,
                            color: sc.color,
                            border: `1px solid ${sc.border}`,
                          }}
                        >
                          {order.orderStatus}
                        </span>
                      </td>
                      <td
                        style={{
                          padding: "12px 16px",
                          fontSize: "12px",
                          color: "#94a3b8",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {new Date(order.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                      <td style={{ padding: "12px 16px" }}>
                        <select
                          value={order.orderStatus}
                          onChange={(e) =>
                            handleStatusChange(order._id, e.target.value)
                          }
                          disabled={
                            updating === order._id ||
                            ["Delivered", "Cancelled"].includes(
                              order.orderStatus,
                            )
                          }
                          style={{
                            background: "#f8fafc",
                            border: "1px solid #e2e8f0",
                            borderRadius: "8px",
                            padding: "5px 8px",
                            fontFamily: "DM Sans",
                            fontSize: "12px",
                            color: "#0f172a",
                            cursor: "pointer",
                            outline: "none",
                            opacity: updating === order._id ? 0.6 : 1,
                          }}
                          onFocus={(e) =>
                            (e.currentTarget.style.borderColor = "#16a34a")
                          }
                          onBlur={(e) =>
                            (e.currentTarget.style.borderColor = "#e2e8f0")
                          }
                        >
                          {statusOptions.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  );
                })}
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
              No orders found
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
