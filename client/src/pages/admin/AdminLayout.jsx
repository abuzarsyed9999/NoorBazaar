import { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/slices/authSlice";
import toast from "react-hot-toast";

const navItems = [
  { icon: "📊", label: "Dashboard", to: "/admin" },
  { icon: "📦", label: "Products", to: "/admin/products" },
  { icon: "🛒", label: "Orders", to: "/admin/orders" },
  { icon: "👥", label: "Users", to: "/admin/users" },
  { icon: "🗂️", label: "Categories", to: "/admin/categories" },
  { icon: "🎟️", label: "Coupons", to: "/admin/coupons" },
  { icon: "⭐", label: "Reviews", to: "/admin/reviews" },
];

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((s) => s.auth);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    toast.success("Logged out!");
    navigate("/");
  };

  const isActive = (to) =>
    to === "/admin"
      ? location.pathname === "/admin"
      : location.pathname.startsWith(to);

  return (
    <>
      <div
        style={{
          display: "flex",
          minHeight: "100vh",
          background: "#f8fafc",
          width: "100%",
        }}
      >
        {/* ── Sidebar ── */}
        <>
          {/* Mobile overlay */}
          {sidebarOpen && (
            <div
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.4)",
                zIndex: 40,
              }}
              onClick={() => setSidebarOpen(false)}
            />
          )}

          <aside
            className="admin-sidebar"
            style={{
              position: "fixed",
              top: 0,
              left: sidebarOpen ? 0 : undefined,
              bottom: 0,
              width: "240px",
              background: "#0f172a",
              borderRight: "1px solid rgba(255,255,255,0.06)",
              display: "flex",
              flexDirection: "column",
              zIndex: 50,
              overflowY: "auto",
              transition: "transform 0.25s ease",
            }}
          >
            {/* Logo */}
            <div
              style={{
                padding: "20px 20px 16px",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <Link
                to="/"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  textDecoration: "none",
                }}
              >
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "8px",
                    background: "linear-gradient(135deg,#16a34a,#14532d)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontFamily: "Cormorant Garamond, serif",
                    fontWeight: "bold",
                    fontSize: "18px",
                    flexShrink: 0,
                  }}
                >
                  ن
                </div>
                <div>
                  <p
                    style={{
                      fontFamily: "Cormorant Garamond, serif",
                      fontWeight: "600",
                      fontSize: "16px",
                      color: "#f1f5f9",
                      margin: 0,
                      lineHeight: 1,
                    }}
                  >
                    NoorBazaar
                  </p>
                  <p
                    style={{
                      fontFamily: "DM Sans",
                      fontSize: "10px",
                      color: "#16a34a",
                      margin: "2px 0 0 0",
                    }}
                  >
                    Admin Panel
                  </p>
                </div>
              </Link>
            </div>

            {/* Nav */}
            <nav style={{ flex: 1, padding: "12px 10px" }}>
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setSidebarOpen(false)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "10px 12px",
                    borderRadius: "10px",
                    marginBottom: "2px",
                    textDecoration: "none",
                    transition: "all 0.2s",
                    background: isActive(item.to)
                      ? "rgba(22,163,74,0.15)"
                      : "transparent",
                    color: isActive(item.to) ? "#4ade80" : "#94a3b8",
                    fontFamily: "DM Sans, sans-serif",
                    fontSize: "13px",
                    fontWeight: isActive(item.to) ? "600" : "400",
                    borderLeft: isActive(item.to)
                      ? "3px solid #16a34a"
                      : "3px solid transparent",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive(item.to)) {
                      e.currentTarget.style.background =
                        "rgba(255,255,255,0.05)";
                      e.currentTarget.style.color = "#e2e8f0";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive(item.to)) {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = "#94a3b8";
                    }
                  }}
                >
                  <span style={{ fontSize: "16px" }}>{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* User Info */}
            <div
              style={{
                padding: "12px 10px",
                borderTop: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "10px 12px",
                  borderRadius: "10px",
                  background: "rgba(255,255,255,0.04)",
                  marginBottom: "8px",
                }}
              >
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "8px",
                    background: "linear-gradient(135deg,#16a34a,#14532d)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "14px",
                    flexShrink: 0,
                  }}
                >
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p
                    style={{
                      fontFamily: "DM Sans",
                      fontSize: "13px",
                      fontWeight: "600",
                      color: "#f1f5f9",
                      margin: 0,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {user?.name}
                  </p>
                  <p
                    style={{
                      fontFamily: "DM Sans",
                      fontSize: "10px",
                      color: "#4ade80",
                      margin: 0,
                    }}
                  >
                    Admin
                  </p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                style={{
                  width: "100%",
                  padding: "9px",
                  borderRadius: "10px",
                  background: "rgba(239,68,68,0.1)",
                  border: "1px solid rgba(239,68,68,0.2)",
                  color: "#f87171",
                  fontFamily: "DM Sans",
                  fontSize: "13px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "rgba(239,68,68,0.15)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "rgba(239,68,68,0.1)")
                }
              >
                🚪 Logout
              </button>
            </div>
          </aside>
        </>

        {/* ── Main Content ── */}
        <div
          className="admin-main"
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          {/* Top Bar */}
          <header
            style={{
              background: "#ffffff",
              borderBottom: "1px solid #e2e8f0",
              padding: "0 24px",
              height: "60px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              position: "sticky",
              top: 0,
              zIndex: 30,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              {/* Mobile menu toggle */}
              <button
                className="admin-menu-btn"
                onClick={() => setSidebarOpen(true)}
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "8px",
                  background: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#64748b",
                }}
              >
                ☰
              </button>
              <h1
                style={{
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: "16px",
                  fontWeight: "700",
                  color: "#0f172a",
                  margin: 0,
                }}
              >
                {navItems.find((n) => isActive(n.to))?.label || "Admin"}
              </h1>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Link
                to="/"
                style={{
                  fontFamily: "DM Sans",
                  fontSize: "13px",
                  color: "#64748b",
                  textDecoration: "none",
                  padding: "6px 12px",
                  borderRadius: "8px",
                  border: "1px solid #e2e8f0",
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
                ← View Store
              </Link>
            </div>
          </header>

          {/* Page Content */}
          <main
            style={{
              flex: 1,
              padding: "clamp(16px,3vw,24px)",
              overflowY: "auto",
            }}
          >
            <Outlet />
          </main>
        </div>
      </div>

      <style>{`
        .admin-sidebar { transform: translateX(0); }
        .admin-main    { margin-left: 240px; }
        .admin-menu-btn { display: none; }

        @media (max-width: 1024px) {
          .admin-sidebar {
            transform: translateX(-100%);
          }
          .admin-main {
            margin-left: 0 !important;
          }
          .admin-menu-btn {
            display: flex !important;
          }
        }
      `}</style>
    </>
  );
};

export default AdminLayout;
