import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminStats } from "../../redux/slices/adminSlice";
import { Link } from "react-router-dom";

const StatCard = ({ icon, label, value, sub, color, bg, border }) => (
  <div
    style={{
      padding: "20px",
      borderRadius: "16px",
      background: "#ffffff",
      border: `1px solid ${border || "#e2e8f0"}`,
      transition: "all 0.2s",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.borderColor = border || "#bbf7d0";
      e.currentTarget.style.transform = "translateY(-2px)";
      e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.06)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.borderColor = border || "#e2e8f0";
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.boxShadow = "none";
    }}
  >
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "12px",
      }}
    >
      <div
        style={{
          width: "44px",
          height: "44px",
          borderRadius: "12px",
          background: bg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "20px",
        }}
      >
        {icon}
      </div>
      {sub && (
        <span
          style={{
            fontFamily: "DM Sans",
            fontSize: "11px",
            fontWeight: "600",
            color: "#16a34a",
            background: "#f0fdf4",
            padding: "3px 8px",
            borderRadius: "20px",
          }}
        >
          {sub}
        </span>
      )}
    </div>
    <p
      style={{
        fontFamily: "Cormorant Garamond, serif",
        fontWeight: "700",
        fontSize: "28px",
        color,
        margin: "0 0 4px 0",
        lineHeight: 1,
      }}
    >
      {value}
    </p>
    <p
      style={{
        fontFamily: "DM Sans",
        fontSize: "12px",
        color: "#94a3b8",
        margin: 0,
        textTransform: "uppercase",
        letterSpacing: "0.06em",
      }}
    >
      {label}
    </p>
  </div>
);

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { stats, loading } = useSelector((s) => s.admin);

  useEffect(() => {
    dispatch(fetchAdminStats());
  }, []);

  if (loading)
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))",
          gap: "16px",
        }}
      >
        {Array(8)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              style={{
                height: "120px",
                borderRadius: "16px",
                background:
                  "linear-gradient(90deg,#f0fdf4 25%,#dcfce7 50%,#f0fdf4 75%)",
                backgroundSize: "200% 100%",
                animation: "shimmer 1.5s infinite",
              }}
            />
          ))}
      </div>
    );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Header */}
      <div>
        <h2
          style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: "28px",
            fontWeight: "600",
            color: "#0f172a",
            margin: "0 0 4px 0",
          }}
        >
          Welcome back, {useSelector((s) => s.auth.user?.name?.split(" ")[0])}{" "}
          🌙
        </h2>
        <p
          style={{
            fontFamily: "DM Sans",
            fontSize: "14px",
            color: "#64748b",
            margin: 0,
          }}
        >
          Here's what's happening with NoorBazaar today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <StatCard
          icon="💰"
          label="Total Revenue"
          value={`₹${stats?.totalRevenue?.toLocaleString() || 0}`}
          color="#16a34a"
          bg="#f0fdf4"
          border="#bbf7d0"
          sub="All time"
        />
        <StatCard
          icon="🛒"
          label="Total Orders"
          value={stats?.totalOrders || 0}
          color="#0284c7"
          bg="#f0f9ff"
          border="#bae6fd"
        />
        <StatCard
          icon="📦"
          label="Total Products"
          value={stats?.totalProducts || 0}
          color="#7c3aed"
          bg="#faf5ff"
          border="#e9d5ff"
        />
        <StatCard
          icon="👥"
          label="Total Users"
          value={stats?.totalUsers || 0}
          color="#c9a84c"
          bg="#fefce8"
          border="#fde68a"
        />
        <StatCard
          icon="⏳"
          label="Pending Orders"
          value={stats?.pendingOrders || 0}
          color="#d97706"
          bg="#fffbeb"
          border="#fde68a"
        />
        <StatCard
          icon="✅"
          label="Delivered"
          value={stats?.deliveredOrders || 0}
          color="#16a34a"
          bg="#f0fdf4"
          border="#bbf7d0"
        />
        <StatCard
          icon="❌"
          label="Cancelled"
          value={stats?.cancelledOrders || 0}
          color="#dc2626"
          bg="#fff5f5"
          border="#fca5a5"
        />
        <StatCard
          icon="🌟"
          label="Avg Rating"
          value={stats?.avgRating?.toFixed(1) || "—"}
          color="#c9a84c"
          bg="#fefce8"
          border="#fde68a"
        />
      </div>

      {/* Quick Actions */}
      <div
        style={{
          padding: "20px",
          borderRadius: "16px",
          background: "#ffffff",
          border: "1px solid #e2e8f0",
        }}
      >
        <p
          style={{
            fontFamily: "DM Sans",
            fontSize: "13px",
            fontWeight: "700",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "#94a3b8",
            margin: "0 0 16px 0",
          }}
        >
          Quick Actions
        </p>
        <div className="actions-grid">
          {[
            {
              icon: "➕",
              label: "Add Product",
              to: "/admin/products",
              color: "#16a34a",
              bg: "#f0fdf4",
            },
            {
              icon: "📋",
              label: "View Orders",
              to: "/admin/orders",
              color: "#0284c7",
              bg: "#f0f9ff",
            },
            {
              icon: "👥",
              label: "Manage Users",
              to: "/admin/users",
              color: "#7c3aed",
              bg: "#faf5ff",
            },
            {
              icon: "🎟️",
              label: "Add Coupon",
              to: "/admin/coupons",
              color: "#c9a84c",
              bg: "#fefce8",
            },
            {
              icon: "🗂️",
              label: "Categories",
              to: "/admin/categories",
              color: "#db2777",
              bg: "#fdf2f8",
            },
            {
              icon: "⭐",
              label: "Reviews",
              to: "/admin/reviews",
              color: "#d97706",
              bg: "#fffbeb",
            },
          ].map((a) => (
            <Link
              key={a.to}
              to={a.to}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "8px",
                padding: "16px 12px",
                borderRadius: "12px",
                background: a.bg,
                textDecoration: "none",
                transition: "all 0.2s",
                border: "1px solid transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <span style={{ fontSize: "24px" }}>{a.icon}</span>
              <span
                style={{
                  fontFamily: "DM Sans",
                  fontSize: "12px",
                  fontWeight: "600",
                  color: a.color,
                }}
              >
                {a.label}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Orders */}
      <div
        style={{
          padding: "20px",
          borderRadius: "16px",
          background: "#ffffff",
          border: "1px solid #e2e8f0",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "16px",
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
            Recent Orders
          </p>
          <Link
            to="/admin/orders"
            style={{
              fontFamily: "DM Sans",
              fontSize: "13px",
              color: "#16a34a",
              textDecoration: "none",
            }}
          >
            View all →
          </Link>
        </div>
        {stats?.recentOrders?.length > 0 ? (
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontFamily: "DM Sans",
              }}
            >
              <thead>
                <tr style={{ borderBottom: "1px solid #f0fdf4" }}>
                  {["Order #", "Customer", "Amount", "Status", "Date"].map(
                    (h) => (
                      <th
                        key={h}
                        style={{
                          textAlign: "left",
                          padding: "8px 12px",
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
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {stats.recentOrders.map((order) => (
                  <tr
                    key={order._id}
                    style={{ borderBottom: "1px solid #f8fafc" }}
                  >
                    <td
                      style={{
                        padding: "10px 12px",
                        fontSize: "13px",
                        fontWeight: "600",
                        color: "#0f172a",
                      }}
                    >
                      #{order.orderNumber}
                    </td>
                    <td
                      style={{
                        padding: "10px 12px",
                        fontSize: "13px",
                        color: "#64748b",
                      }}
                    >
                      {order.user?.name || "—"}
                    </td>
                    <td
                      style={{
                        padding: "10px 12px",
                        fontSize: "14px",
                        fontWeight: "700",
                        color: "#16a34a",
                        fontFamily: "Cormorant Garamond, serif",
                      }}
                    >
                      ₹{order.totalPrice?.toLocaleString()}
                    </td>
                    <td style={{ padding: "10px 12px" }}>
                      <span
                        style={{
                          fontFamily: "DM Sans",
                          fontSize: "11px",
                          fontWeight: "600",
                          padding: "3px 10px",
                          borderRadius: "20px",
                          background:
                            order.orderStatus === "Delivered"
                              ? "#f0fdf4"
                              : order.orderStatus === "Cancelled"
                                ? "#fff5f5"
                                : "#fefce8",
                          color:
                            order.orderStatus === "Delivered"
                              ? "#16a34a"
                              : order.orderStatus === "Cancelled"
                                ? "#dc2626"
                                : "#d97706",
                        }}
                      >
                        {order.orderStatus}
                      </span>
                    </td>
                    <td
                      style={{
                        padding: "10px 12px",
                        fontSize: "12px",
                        color: "#94a3b8",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {new Date(order.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p
            style={{
              fontFamily: "DM Sans",
              fontSize: "14px",
              color: "#94a3b8",
              textAlign: "center",
              padding: "24px 0",
              margin: 0,
            }}
          >
            No recent orders
          </p>
        )}
      </div>

      <style>{`
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }
        @media (min-width: 640px)  { .stats-grid { grid-template-columns: repeat(4, 1fr); gap: 16px; } }
        @media (min-width: 1280px) { .stats-grid { grid-template-columns: repeat(8, 1fr); } }

        .actions-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }
        @media (min-width: 640px) { .actions-grid { grid-template-columns: repeat(6, 1fr); } }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
