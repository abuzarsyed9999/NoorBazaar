// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useSearchParams, useNavigate } from "react-router-dom";
// import { fetchMyOrders } from "../redux/slices/orderSlice";
// import { fetchWishlist } from "../redux/slices/wishlistSlice";
// import { fetchCart } from "../redux/slices/cartSlice";
// import ProfileTab from "../components/dashboard/ProfileTab";
// import OrdersTab from "../components/dashboard/OrdersTab";
// import WishlistTab from "../components/dashboard/WishlistTab";
// import AddressTab from "../components/dashboard/AddressTab";

// const tabs = [
//   { id: "profile", icon: "👤", label: "Profile" },
//   { id: "orders", icon: "📦", label: "Orders" },
//   { id: "wishlist", icon: "❤️", label: "Wishlist" },
//   { id: "address", icon: "📍", label: "Addresses" },
// ];

// const DashboardPage = () => {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const activeTab = searchParams.get("tab") || "profile";
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { user } = useSelector((s) => s.auth);

//   useEffect(() => {
//     dispatch(fetchMyOrders());
//     dispatch(fetchWishlist());
//     dispatch(fetchCart());
//   }, []);

//   const setTab = (id) => {
//     setSearchParams({ tab: id });
//   };

//   return (
//     <div style={{ background: "#f8fffe", minHeight: "100vh" }}>
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
//         {/* ── Header Banner ── */}
//         <div
//           className="flex items-center gap-4 p-6 rounded-2xl mb-6"
//           style={{
//             background: "linear-gradient(135deg,#0a2218,#0f2d1c)",
//             border: "1px solid rgba(22,163,74,0.2)",
//           }}
//         >
//           <div
//             className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-cormorant font-bold text-2xl shrink-0"
//             style={{ background: "linear-gradient(135deg,#16a34a,#14532d)" }}
//           >
//             {user?.name?.charAt(0).toUpperCase()}
//           </div>
//           <div className="flex-1 min-w-0">
//             <h1
//               className="font-cormorant text-2xl font-semibold"
//               style={{ color: "#e2e8f0" }}
//             >
//               {user?.name}
//             </h1>
//             <p className="font-dm text-sm" style={{ color: "#475569" }}>
//               {user?.email}
//             </p>
//             {user?.role === "admin" && (
//               <span
//                 className="inline-block mt-1 font-dm text-[10px] font-semibold px-2.5 py-1 rounded-full"
//                 style={{
//                   background: "rgba(22,163,74,0.15)",
//                   color: "#4ade80",
//                   border: "1px solid rgba(22,163,74,0.3)",
//                 }}
//               >
//                 Admin
//               </span>
//             )}
//           </div>
//           <p
//             className="font-arabic text-2xl hidden md:block"
//             style={{ color: "#16a34a" }}
//           >
//             أهلاً
//           </p>
//         </div>

//         <div className="grid lg:grid-cols-4 gap-6">
//           {/* ── Sidebar ── */}
//           <aside className="lg:col-span-1">
//             <div
//               className="rounded-2xl overflow-hidden sticky top-24"
//               style={{
//                 background: "#162032",
//                 border: "1px solid rgba(255,255,255,0.05)",
//               }}
//             >
//               {tabs.map((tab) => (
//                 <button
//                   key={tab.id}
//                   onClick={() => setTab(tab.id)}
//                   className="w-full flex items-center gap-3 px-4 py-3.5 font-dm text-sm font-medium transition-all text-left"
//                   style={{
//                     background:
//                       activeTab === tab.id
//                         ? "rgba(22,163,74,0.1)"
//                         : "transparent",
//                     color: activeTab === tab.id ? "#4ade80" : "#64748b",
//                     borderLeft:
//                       activeTab === tab.id
//                         ? "3px solid #16a34a"
//                         : "3px solid transparent",
//                   }}
//                   onMouseEnter={(e) => {
//                     if (activeTab !== tab.id) {
//                       e.currentTarget.style.color = "#e2e8f0";
//                       e.currentTarget.style.background =
//                         "rgba(255,255,255,0.03)";
//                     }
//                   }}
//                   onMouseLeave={(e) => {
//                     if (activeTab !== tab.id) {
//                       e.currentTarget.style.color = "#64748b";
//                       e.currentTarget.style.background = "transparent";
//                     }
//                   }}
//                 >
//                   <span>{tab.icon}</span>
//                   {tab.label}
//                 </button>
//               ))}

//               {/* ── Admin Link ── */}
//               {user?.role === "admin" && (
//                 <>
//                   <div
//                     style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
//                   />
//                   <button
//                     onClick={() => navigate("/admin")}
//                     className="w-full flex items-center gap-3 px-4 py-3.5 font-dm text-sm font-medium transition-all text-left"
//                     style={{ color: "#4ade80" }}
//                     onMouseEnter={(e) =>
//                       (e.currentTarget.style.background =
//                         "rgba(22,163,74,0.07)")
//                     }
//                     onMouseLeave={(e) =>
//                       (e.currentTarget.style.background = "transparent")
//                     }
//                   >
//                     <span>⚙️</span>
//                     Admin Panel
//                   </button>
//                 </>
//               )}
//             </div>
//           </aside>

//           {/* ── Content ── */}
//           <div className="lg:col-span-3">
//             {activeTab === "profile" && <ProfileTab />}
//             {activeTab === "orders" && <OrdersTab />}
//             {activeTab === "wishlist" && <WishlistTab />}
//             {activeTab === "address" && <AddressTab />}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardPage;
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";
import { fetchMyOrders } from "../redux/slices/orderSlice";
import { fetchWishlist } from "../redux/slices/wishlistSlice";
import { fetchCart } from "../redux/slices/cartSlice";
import ProfileTab from "../components/dashboard/ProfileTab";
import OrdersTab from "../components/dashboard/OrdersTab";
import WishlistTab from "../components/dashboard/WishlistTab";
import AddressTab from "../components/dashboard/AddressTab";

const tabs = [
  { id: "profile", icon: "👤", label: "Profile" },
  { id: "orders", icon: "📦", label: "Orders" },
  { id: "wishlist", icon: "❤️", label: "Wishlist" },
  { id: "address", icon: "📍", label: "Addresses" },
];

const DashboardPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "profile";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((s) => s.auth);

  useEffect(() => {
    dispatch(fetchMyOrders());
    dispatch(fetchWishlist());
    dispatch(fetchCart());
  }, []);

  const setTab = (id) => setSearchParams({ tab: id });

  return (
    <>
      <div style={{ background: "#ffffff", minHeight: "100vh", width: "100%" }}>
        <div
          style={{
            maxWidth: "1152px",
            margin: "0 auto",
            padding: "clamp(16px,4vw,40px) 24px",
          }}
        >
          {/* Header Banner */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "clamp(12px,2vw,20px)",
              padding: "clamp(16px,3vw,24px)",
              borderRadius: "16px",
              marginBottom: "24px",
              background: "linear-gradient(135deg,#f0fdf4,#dcfce7)",
              border: "1px solid #bbf7d0",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                width: "clamp(48px,8vw,64px)",
                height: "clamp(48px,8vw,64px)",
                borderRadius: "14px",
                background: "linear-gradient(135deg,#16a34a,#14532d)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontFamily: "Cormorant Garamond, serif",
                fontWeight: "bold",
                fontSize: "clamp(18px,3vw,26px)",
                flexShrink: 0,
              }}
            >
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <h1
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontSize: "clamp(20px,3vw,28px)",
                  fontWeight: "600",
                  color: "#0f172a",
                  margin: "0 0 2px 0",
                }}
              >
                {user?.name}
              </h1>
              <p
                style={{
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: "13px",
                  color: "#64748b",
                  margin: 0,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {user?.email}
              </p>
              {user?.role === "admin" && (
                <span
                  style={{
                    display: "inline-block",
                    marginTop: "6px",
                    fontFamily: "DM Sans",
                    fontSize: "10px",
                    fontWeight: "700",
                    padding: "3px 10px",
                    borderRadius: "20px",
                    background: "#dcfce7",
                    color: "#15803d",
                    border: "1px solid #bbf7d0",
                  }}
                >
                  Admin
                </span>
              )}
            </div>
            <p
              style={{
                fontFamily: "Amiri, serif",
                fontSize: "24px",
                color: "#16a34a",
                flexShrink: 0,
              }}
            >
              أهلاً
            </p>
          </div>

          <div className="dash-grid">
            {/* Sidebar */}
            <aside className="dash-sidebar">
              <div
                style={{
                  borderRadius: "16px",
                  overflow: "hidden",
                  border: "1px solid #e2e8f0",
                  background: "#ffffff",
                  position: "sticky",
                  top: "96px",
                }}
              >
                {tabs.map((tab, i) => (
                  <button
                    key={tab.id}
                    onClick={() => setTab(tab.id)}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "14px 16px",
                      fontFamily: "DM Sans, sans-serif",
                      fontSize: "14px",
                      fontWeight: "500",
                      cursor: "pointer",
                      textAlign: "left",
                      transition: "all 0.2s",
                      background:
                        activeTab === tab.id ? "#f0fdf4" : "transparent",
                      color: activeTab === tab.id ? "#16a34a" : "#64748b",
                      borderLeft:
                        activeTab === tab.id
                          ? "3px solid #16a34a"
                          : "3px solid transparent",
                      borderTop: i > 0 ? "1px solid #f8fafc" : "none",
                      border: "none",
                      borderLeft:
                        activeTab === tab.id
                          ? "3px solid #16a34a"
                          : "3px solid transparent",
                    }}
                    onMouseEnter={(e) => {
                      if (activeTab !== tab.id) {
                        e.currentTarget.style.background = "#f8fafc";
                        e.currentTarget.style.color = "#0f172a";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (activeTab !== tab.id) {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.color = "#64748b";
                      }
                    }}
                  >
                    <span style={{ fontSize: "16px" }}>{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}

                {user?.role === "admin" && (
                  <>
                    <div style={{ height: "1px", background: "#f0fdf4" }} />
                    <button
                      onClick={() => navigate("/admin")}
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        padding: "14px 16px",
                        fontFamily: "DM Sans",
                        fontSize: "14px",
                        fontWeight: "500",
                        cursor: "pointer",
                        textAlign: "left",
                        background: "transparent",
                        color: "#16a34a",
                        border: "none",
                        borderLeft: "3px solid transparent",
                        transition: "all 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#f0fdf4";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                      }}
                    >
                      <span>⚙️</span> Admin Panel
                    </button>
                  </>
                )}
              </div>
            </aside>

            {/* Content */}
            <div>
              {activeTab === "profile" && <ProfileTab />}
              {activeTab === "orders" && <OrdersTab />}
              {activeTab === "wishlist" && <WishlistTab />}
              {activeTab === "address" && <AddressTab />}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .dash-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }
        .dash-sidebar { display: none; }

        @media (min-width: 1024px) {
          .dash-grid {
            grid-template-columns: 220px 1fr;
            gap: 24px;
            align-items: start;
          }
          .dash-sidebar { display: block; }
        }

        /* Mobile: show tabs as horizontal scroll */
        @media (max-width: 1023px) {
          .dash-mobile-tabs {
            display: flex;
            overflow-x: auto;
            gap: 8px;
            padding-bottom: 4px;
            margin-bottom: 20px;
            scrollbar-width: none;
          }
          .dash-mobile-tabs::-webkit-scrollbar { display: none; }
        }
      `}</style>
    </>
  );
};

export default DashboardPage;
