// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";

// const statusColors = {
//   Pending: { bg: "rgba(234,179,8,0.12)", color: "#eab308" },
//   Confirmed: { bg: "rgba(59,130,246,0.12)", color: "#3b82f6" },
//   Processing: { bg: "rgba(168,85,247,0.12)", color: "#a855f7" },
//   Shipped: { bg: "rgba(14,165,233,0.12)", color: "#0ea5e9" },
//   Delivered: { bg: "rgba(22,163,74,0.12)", color: "#16a34a" },
//   Cancelled: { bg: "rgba(239,68,68,0.12)", color: "#ef4444" },
//   Refunded: { bg: "rgba(107,114,128,0.12)", color: "#6b7280" },
// };

// const OrdersTab = () => {
//   const { orders, loading } = useSelector((s) => s.orders);

//   if (loading)
//     return (
//       <div className="space-y-3">
//         {Array(3)
//           .fill(0)
//           .map((_, i) => (
//             <div key={i} className="h-24 shimmer rounded-2xl" />
//           ))}
//       </div>
//     );

//   if (orders.length === 0)
//     return (
//       <div
//         className="p-12 rounded-2xl text-center"
//         style={{
//           background: "#162032",
//           border: "1px solid rgba(255,255,255,0.05)",
//         }}
//       >
//         <div className="text-5xl mb-4">📦</div>
//         <h3
//           className="font-cormorant text-2xl font-semibold mb-2"
//           style={{ color: "#e2e8f0" }}
//         >
//           No Orders Yet
//         </h3>
//         <p className="font-dm text-sm mb-5" style={{ color: "#475569" }}>
//           Start shopping to see your orders here
//         </p>
//         <Link
//           to="/products"
//           className="inline-block px-6 py-3 rounded-xl font-dm text-sm font-semibold text-white"
//           style={{ background: "#16a34a" }}
//         >
//           Shop Now
//         </Link>
//       </div>
//     );

//   return (
//     <div className="space-y-3">
//       <p
//         className="font-dm text-xs font-semibold uppercase tracking-wider mb-4"
//         style={{ color: "#475569" }}
//       >
//         {orders.length} Orders
//       </p>

//       {orders.map((order) => {
//         const status = statusColors[order.orderStatus] || statusColors.Pending;
//         return (
//           <div
//             key={order._id}
//             className="p-5 rounded-2xl transition-all"
//             style={{
//               background: "#162032",
//               border: "1px solid rgba(255,255,255,0.05)",
//             }}
//           >
//             {/* Header */}
//             <div className="flex items-start justify-between mb-3">
//               <div>
//                 <p
//                   className="font-dm text-xs font-semibold"
//                   style={{ color: "#e2e8f0" }}
//                 >
//                   #{order.orderNumber}
//                 </p>
//                 <p
//                   className="font-dm text-[10px] mt-0.5"
//                   style={{ color: "#334155" }}
//                 >
//                   {new Date(order.createdAt).toLocaleDateString("en-IN", {
//                     day: "numeric",
//                     month: "short",
//                     year: "numeric",
//                   })}
//                 </p>
//               </div>
//               <span
//                 className="font-dm text-[10px] font-semibold px-2.5 py-1 rounded-full"
//                 style={{
//                   background: status.bg,
//                   color: status.color,
//                 }}
//               >
//                 {order.orderStatus}
//               </span>
//             </div>

//             {/* Items Preview */}
//             <div className="flex items-center gap-2 mb-3">
//               {order.items?.slice(0, 3).map((item, i) => (
//                 <img
//                   key={i}
//                   src={item.image}
//                   alt={item.name}
//                   className="w-10 h-10 rounded-lg object-cover"
//                   style={{ background: "#0f1923" }}
//                 />
//               ))}
//               {order.items?.length > 3 && (
//                 <div
//                   className="w-10 h-10 rounded-lg flex items-center justify-center font-dm text-xs"
//                   style={{
//                     background: "rgba(255,255,255,0.04)",
//                     color: "#475569",
//                   }}
//                 >
//                   +{order.items.length - 3}
//                 </div>
//               )}
//               <div className="flex-1" />
//               <span
//                 className="font-cormorant font-semibold text-lg"
//                 style={{ color: "#4ade80" }}
//               >
//                 ₹{order.totalPrice?.toLocaleString()}
//               </span>
//             </div>

//             {/* Footer */}
//             <div className="flex items-center justify-between">
//               <span
//                 className="font-dm text-[10px]"
//                 style={{ color: "#334155" }}
//               >
//                 {order.paymentMethod} •{" "}
//                 <span
//                   style={{
//                     color:
//                       order.paymentStatus === "Paid" ? "#16a34a" : "#eab308",
//                   }}
//                 >
//                   {order.paymentStatus}
//                 </span>
//               </span>
//               <Link
//                 to={`/orders/${order._id}`}
//                 className="font-dm text-xs font-medium transition-colors"
//                 style={{ color: "#4ade80" }}
//                 onMouseEnter={(e) => (e.currentTarget.style.color = "#86efac")}
//                 onMouseLeave={(e) => (e.currentTarget.style.color = "#4ade80")}
//               >
//                 View Details →
//               </Link>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default OrdersTab;

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const statusColors = {
  Pending: { bg: "#fefce8", color: "#854d0e", border: "#fde68a" },
  Confirmed: { bg: "#eff6ff", color: "#1d4ed8", border: "#bfdbfe" },
  Processing: { bg: "#faf5ff", color: "#7e22ce", border: "#e9d5ff" },
  Shipped: { bg: "#f0f9ff", color: "#0369a1", border: "#bae6fd" },
  Delivered: { bg: "#f0fdf4", color: "#15803d", border: "#bbf7d0" },
  Cancelled: { bg: "#fff5f5", color: "#dc2626", border: "#fca5a5" },
  Refunded: { bg: "#f8fafc", color: "#475569", border: "#e2e8f0" },
};

const OrdersTab = () => {
  const { orders, loading } = useSelector((s) => s.orders);

  if (loading)
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              style={{
                height: "96px",
                borderRadius: "16px",
                background: "#f0fdf4",
                animation: "shimmer 1.5s infinite",
              }}
            />
          ))}
      </div>
    );

  if (orders.length === 0)
    return (
      <div
        style={{
          padding: "48px 24px",
          borderRadius: "16px",
          background: "#ffffff",
          border: "1px solid #e2e8f0",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: "48px", marginBottom: "16px" }}>📦</div>
        <h3
          style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: "24px",
            fontWeight: "600",
            color: "#0f172a",
            margin: "0 0 8px 0",
          }}
        >
          No Orders Yet
        </h3>
        <p
          style={{
            fontFamily: "DM Sans",
            fontSize: "14px",
            color: "#64748b",
            margin: "0 0 20px 0",
          }}
        >
          Start shopping to see your orders here
        </p>
        <Link
          to="/products"
          style={{
            display: "inline-block",
            padding: "10px 24px",
            borderRadius: "10px",
            background: "#16a34a",
            color: "white",
            fontFamily: "DM Sans",
            fontSize: "14px",
            fontWeight: "600",
            textDecoration: "none",
          }}
        >
          Shop Now
        </Link>
      </div>
    );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <p
        style={{
          fontFamily: "DM Sans",
          fontSize: "12px",
          fontWeight: "700",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          color: "#94a3b8",
          margin: "0 0 4px 0",
        }}
      >
        {orders.length} Orders
      </p>

      {orders.map((order) => {
        const status = statusColors[order.orderStatus] || statusColors.Pending;
        return (
          <div
            key={order._id}
            style={{
              padding: "clamp(14px,2vw,20px)",
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
            {/* Header */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                marginBottom: "12px",
                flexWrap: "wrap",
                gap: "8px",
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
                  #{order.orderNumber}
                </p>
                <p
                  style={{
                    fontFamily: "DM Sans",
                    fontSize: "12px",
                    color: "#94a3b8",
                    margin: "2px 0 0 0",
                  }}
                >
                  {new Date(order.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
              <span
                style={{
                  fontFamily: "DM Sans",
                  fontSize: "11px",
                  fontWeight: "700",
                  padding: "4px 12px",
                  borderRadius: "20px",
                  background: status.bg,
                  color: status.color,
                  border: `1px solid ${status.border}`,
                }}
              >
                {order.orderStatus}
              </span>
            </div>

            {/* Items */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "12px",
                flexWrap: "wrap",
              }}
            >
              {order.items?.slice(0, 3).map((item, i) => (
                <img
                  key={i}
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "8px",
                    objectFit: "cover",
                    background: "#f8fafc",
                    border: "1px solid #e2e8f0",
                  }}
                />
              ))}
              {order.items?.length > 3 && (
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "DM Sans",
                    fontSize: "12px",
                    fontWeight: "600",
                    background: "#f0fdf4",
                    color: "#16a34a",
                    border: "1px solid #bbf7d0",
                  }}
                >
                  +{order.items.length - 3}
                </div>
              )}
              <div style={{ flex: 1 }} />
              <span
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontWeight: "700",
                  fontSize: "20px",
                  color: "#16a34a",
                }}
              >
                ₹{order.totalPrice?.toLocaleString()}
              </span>
            </div>

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
              <span
                style={{
                  fontFamily: "DM Sans",
                  fontSize: "12px",
                  color: "#94a3b8",
                }}
              >
                {order.paymentMethod} •{" "}
                <span
                  style={{
                    color:
                      order.paymentStatus === "Paid" ? "#16a34a" : "#d97706",
                    fontWeight: "600",
                  }}
                >
                  {order.paymentStatus}
                </span>
              </span>
              <Link
                to={`/orders/${order._id}`}
                style={{
                  fontFamily: "DM Sans",
                  fontSize: "13px",
                  fontWeight: "600",
                  color: "#16a34a",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#15803d")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#16a34a")}
              >
                View Details →
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrdersTab;
