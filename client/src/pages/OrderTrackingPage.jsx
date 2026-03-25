import { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderById } from "../redux/slices/orderSlice";

// ── Status steps in order ──
const STATUS_STEPS = [
  {
    key: "Pending",
    icon: "🕐",
    label: "Order Placed",
    desc: "Your order has been placed",
  },
  {
    key: "Confirmed",
    icon: "✅",
    label: "Confirmed",
    desc: "Seller confirmed your order",
  },
  {
    key: "Processing",
    icon: "📦",
    label: "Processing",
    desc: "Your order is being prepared",
  },
  {
    key: "Shipped",
    icon: "🚚",
    label: "Shipped",
    desc: "Your order is on the way",
  },
  {
    key: "Delivered",
    icon: "🎉",
    label: "Delivered",
    desc: "Your order has been delivered",
  },
];

const CANCELLED_STEP = {
  key: "Cancelled",
  icon: "❌",
  label: "Cancelled",
  desc: "Order was cancelled",
};
const REFUNDED_STEP = {
  key: "Refunded",
  icon: "💰",
  label: "Refunded",
  desc: "Refund has been processed",
};

const statusColors = {
  Pending: { bg: "#fefce8", color: "#854d0e", border: "#fde68a" },
  Confirmed: { bg: "#eff6ff", color: "#1d4ed8", border: "#bfdbfe" },
  Processing: { bg: "#faf5ff", color: "#7e22ce", border: "#e9d5ff" },
  Shipped: { bg: "#f0f9ff", color: "#0369a1", border: "#bae6fd" },
  Delivered: { bg: "#f0fdf4", color: "#15803d", border: "#bbf7d0" },
  Cancelled: { bg: "#fff5f5", color: "#dc2626", border: "#fca5a5" },
  Refunded: { bg: "#f8fafc", color: "#475569", border: "#e2e8f0" },
};

const OrderTrackingPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentOrder: order, loading } = useSelector((s) => s.orders);

  useEffect(() => {
    dispatch(fetchOrderById(id));
    window.scrollTo(0, 0);
  }, [id]);

  // ── Get current step index ──
  const getCurrentStepIndex = () => {
    if (["Cancelled", "Refunded"].includes(order?.orderStatus)) return -1;
    return STATUS_STEPS.findIndex((s) => s.key === order?.orderStatus);
  };

  const stepIndex = getCurrentStepIndex();
  const isCancelled = order?.orderStatus === "Cancelled";
  const isRefunded = order?.orderStatus === "Refunded";
  const sc = statusColors[order?.orderStatus] || statusColors.Pending;

  const shimmer = {
    background: "linear-gradient(90deg,#f0fdf4 25%,#dcfce7 50%,#f0fdf4 75%)",
    backgroundSize: "200% 100%",
    animation: "shimmer 1.5s infinite",
    borderRadius: "12px",
  };

  if (loading)
    return (
      <div
        style={{
          background: "#ffffff",
          minHeight: "100vh",
          padding: "40px 24px",
        }}
      >
        <div
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <div style={{ height: "32px", width: "200px", ...shimmer }} />
          <div style={{ height: "120px", ...shimmer }} />
          <div style={{ height: "200px", ...shimmer }} />
          <div style={{ height: "160px", ...shimmer }} />
        </div>
      </div>
    );

  if (!order)
    return (
      <div
        style={{
          background: "#ffffff",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "64px", marginBottom: "16px" }}>📦</div>
          <h2
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "28px",
              color: "#0f172a",
              margin: "0 0 16px 0",
            }}
          >
            Order not found
          </h2>
          <button
            onClick={() => navigate("/dashboard?tab=orders")}
            style={{
              padding: "12px 28px",
              borderRadius: "12px",
              background: "#16a34a",
              color: "white",
              fontFamily: "DM Sans",
              fontSize: "14px",
              fontWeight: "600",
              border: "none",
              cursor: "pointer",
            }}
          >
            Back to Orders
          </button>
        </div>
      </div>
    );

  return (
    <>
      <div style={{ background: "#ffffff", minHeight: "100vh", width: "100%" }}>
        <div
          style={{
            maxWidth: "860px",
            margin: "0 auto",
            padding: "clamp(16px,4vw,40px) 24px",
          }}
        >
          {/* ── Breadcrumb ── */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "28px",
              flexWrap: "wrap",
              fontFamily: "DM Sans",
              fontSize: "13px",
              color: "#94a3b8",
            }}
          >
            <span
              style={{ cursor: "pointer", transition: "color 0.2s" }}
              onClick={() => navigate("/")}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#16a34a")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#94a3b8")}
            >
              Home
            </span>
            <span>/</span>
            <span
              style={{ cursor: "pointer", transition: "color 0.2s" }}
              onClick={() => navigate("/dashboard?tab=orders")}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#16a34a")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#94a3b8")}
            >
              My Orders
            </span>
            <span>/</span>
            <span style={{ color: "#0f172a", fontWeight: "500" }}>
              #{order.orderNumber}
            </span>
          </div>

          {/* ── Header ── */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
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
                Order Tracking
              </p>
              <h1
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontSize: "clamp(22px,4vw,32px)",
                  fontWeight: "600",
                  color: "#0f172a",
                  margin: 0,
                }}
              >
                #{order.orderNumber}
              </h1>
              <p
                style={{
                  fontFamily: "DM Sans",
                  fontSize: "13px",
                  color: "#94a3b8",
                  margin: "4px 0 0 0",
                }}
              >
                Placed on{" "}
                {new Date(order.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
            <span
              style={{
                fontFamily: "DM Sans",
                fontSize: "13px",
                fontWeight: "700",
                padding: "6px 16px",
                borderRadius: "20px",
                background: sc.bg,
                color: sc.color,
                border: `1px solid ${sc.border}`,
                alignSelf: "flex-start",
              }}
            >
              {order.orderStatus}
            </span>
          </div>

          {/* ── Order Timeline ── */}
          {!isCancelled && !isRefunded ? (
            <div
              style={{
                padding: "clamp(16px,3vw,28px)",
                borderRadius: "16px",
                background: "#ffffff",
                border: "1px solid #e2e8f0",
                marginBottom: "20px",
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
                  margin: "0 0 24px 0",
                }}
              >
                Order Progress
              </p>

              {/* Desktop Timeline */}
              <div className="timeline-desktop">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    position: "relative",
                  }}
                >
                  {/* Progress Line */}
                  <div
                    style={{
                      position: "absolute",
                      top: "20px",
                      left: "10%",
                      right: "10%",
                      height: "3px",
                      background: "#e2e8f0",
                      zIndex: 0,
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        background: "linear-gradient(90deg,#16a34a,#4ade80)",
                        width: `${stepIndex <= 0 ? 0 : (stepIndex / (STATUS_STEPS.length - 1)) * 100}%`,
                        transition: "width 0.5s ease",
                        borderRadius: "4px",
                      }}
                    />
                  </div>

                  {STATUS_STEPS.map((step, idx) => {
                    const done = idx <= stepIndex;
                    const current = idx === stepIndex;
                    return (
                      <div
                        key={step.key}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: "8px",
                          zIndex: 1,
                          flex: 1,
                        }}
                      >
                        <div
                          style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                            background: done ? "#16a34a" : "#f0f0f0",
                            border: current
                              ? "3px solid #4ade80"
                              : done
                                ? "3px solid #16a34a"
                                : "3px solid #e2e8f0",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "18px",
                            transition: "all 0.3s",
                            boxShadow: current
                              ? "0 0 0 4px rgba(22,163,74,0.15)"
                              : "none",
                          }}
                        >
                          {done ? (idx < stepIndex ? "✓" : step.icon) : "○"}
                        </div>
                        <div style={{ textAlign: "center" }}>
                          <p
                            style={{
                              fontFamily: "DM Sans",
                              fontSize: "11px",
                              fontWeight: done ? "700" : "400",
                              color: done ? "#0f172a" : "#94a3b8",
                              margin: 0,
                              whiteSpace: "nowrap",
                            }}
                          >
                            {step.label}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Mobile Timeline */}
              <div className="timeline-mobile">
                {STATUS_STEPS.map((step, idx) => {
                  const done = idx <= stepIndex;
                  const current = idx === stepIndex;
                  return (
                    <div
                      key={step.key}
                      style={{
                        display: "flex",
                        gap: "16px",
                        alignItems: "flex-start",
                        paddingBottom:
                          idx < STATUS_STEPS.length - 1 ? "20px" : "0",
                        position: "relative",
                      }}
                    >
                      {/* Vertical line */}
                      {idx < STATUS_STEPS.length - 1 && (
                        <div
                          style={{
                            position: "absolute",
                            left: "16px",
                            top: "36px",
                            width: "2px",
                            height: "calc(100% - 8px)",
                            background:
                              done && idx < stepIndex ? "#16a34a" : "#e2e8f0",
                            zIndex: 0,
                          }}
                        />
                      )}
                      <div
                        style={{
                          width: "34px",
                          height: "34px",
                          borderRadius: "50%",
                          background: done ? "#16a34a" : "#f8fafc",
                          border: current
                            ? "2px solid #4ade80"
                            : done
                              ? "2px solid #16a34a"
                              : "2px solid #e2e8f0",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "14px",
                          flexShrink: 0,
                          zIndex: 1,
                          boxShadow: current
                            ? "0 0 0 4px rgba(22,163,74,0.15)"
                            : "none",
                        }}
                      >
                        {idx < stepIndex ? "✓" : step.icon}
                      </div>
                      <div style={{ paddingTop: "4px" }}>
                        <p
                          style={{
                            fontFamily: "DM Sans",
                            fontSize: "13px",
                            fontWeight: done ? "700" : "400",
                            color: done ? "#0f172a" : "#94a3b8",
                            margin: "0 0 2px 0",
                          }}
                        >
                          {step.label}
                        </p>
                        <p
                          style={{
                            fontFamily: "DM Sans",
                            fontSize: "12px",
                            color: "#94a3b8",
                            margin: 0,
                          }}
                        >
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Cancelled / Refunded Banner */
            <div
              style={{
                padding: "20px",
                borderRadius: "16px",
                background: isCancelled ? "#fff5f5" : "#f8fafc",
                border: `1px solid ${isCancelled ? "#fca5a5" : "#e2e8f0"}`,
                marginBottom: "20px",
                display: "flex",
                alignItems: "center",
                gap: "16px",
              }}
            >
              <div style={{ fontSize: "40px" }}>
                {isCancelled ? "❌" : "💰"}
              </div>
              <div>
                <p
                  style={{
                    fontFamily: "DM Sans",
                    fontSize: "15px",
                    fontWeight: "700",
                    color: isCancelled ? "#dc2626" : "#475569",
                    margin: "0 0 4px 0",
                  }}
                >
                  Order {isCancelled ? "Cancelled" : "Refunded"}
                </p>
                <p
                  style={{
                    fontFamily: "DM Sans",
                    fontSize: "13px",
                    color: "#64748b",
                    margin: 0,
                  }}
                >
                  {isCancelled
                    ? "This order has been cancelled."
                    : "Your refund has been processed."}
                </p>
              </div>
            </div>
          )}

          {/* ── Order Items ── */}
          <div
            style={{
              padding: "clamp(16px,3vw,24px)",
              borderRadius: "16px",
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              marginBottom: "20px",
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
              Order Items ({order.items?.length})
            </p>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              {order.items?.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "clamp(10px,2vw,16px)",
                    padding: "12px",
                    borderRadius: "12px",
                    background: "#f8fafc",
                    border: "1px solid #f0fdf4",
                    transition: "border-color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.borderColor = "#bbf7d0")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.borderColor = "#f0fdf4")
                  }
                >
                  <img
                    src={item.product?.images?.[0]?.url || item.image}
                    alt={item.product?.name || item.name}
                    style={{
                      width: "clamp(48px,8vw,64px)",
                      height: "clamp(48px,8vw,64px)",
                      borderRadius: "10px",
                      objectFit: "cover",
                      background: "#f8fafc",
                      border: "1px solid #e2e8f0",
                      flexShrink: 0,
                    }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <Link
                      to={`/products/${item.product?.slug}`}
                      style={{ textDecoration: "none" }}
                    >
                      <p
                        style={{
                          fontFamily: "DM Sans",
                          fontSize: "14px",
                          fontWeight: "600",
                          color: "#0f172a",
                          margin: "0 0 4px 0",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          transition: "color 0.2s",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.color = "#16a34a")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.color = "#0f172a")
                        }
                      >
                        {item.product?.name || item.name}
                      </p>
                    </Link>
                    <p
                      style={{
                        fontFamily: "DM Sans",
                        fontSize: "12px",
                        color: "#94a3b8",
                        margin: 0,
                      }}
                    >
                      Qty: {item.quantity} × ₹{item.price?.toLocaleString()}
                    </p>
                  </div>
                  <span
                    style={{
                      fontFamily: "Cormorant Garamond, serif",
                      fontSize: "18px",
                      fontWeight: "700",
                      color: "#16a34a",
                      flexShrink: 0,
                    }}
                  >
                    ₹{(item.price * item.quantity)?.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            {/* Order Total */}
            <div
              style={{
                marginTop: "16px",
                paddingTop: "16px",
                borderTop: "1px solid #e2e8f0",
              }}
            >
              {[
                {
                  label: "Subtotal",
                  value: `₹${order.totalPrice?.toLocaleString()}`,
                },
                {
                  label: "Shipping",
                  value:
                    order.shippingPrice === 0
                      ? "FREE"
                      : `₹${order.shippingPrice}`,
                },
                {
                  label: "Tax",
                  value: `₹${order.taxPrice?.toLocaleString() || 0}`,
                },
              ].map((r) => (
                <div
                  key={r.label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "8px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "DM Sans",
                      fontSize: "13px",
                      color: "#64748b",
                    }}
                  >
                    {r.label}
                  </span>
                  <span
                    style={{
                      fontFamily: "DM Sans",
                      fontSize: "13px",
                      color: "#0f172a",
                    }}
                  >
                    {r.value}
                  </span>
                </div>
              ))}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingTop: "12px",
                  borderTop: "1px solid #e2e8f0",
                  marginTop: "8px",
                }}
              >
                <span
                  style={{
                    fontFamily: "DM Sans",
                    fontSize: "15px",
                    fontWeight: "700",
                    color: "#0f172a",
                  }}
                >
                  Total
                </span>
                <span
                  style={{
                    fontFamily: "Cormorant Garamond, serif",
                    fontSize: "26px",
                    fontWeight: "700",
                    color: "#16a34a",
                  }}
                >
                  ₹{order.totalPrice?.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* ── Bottom Grid ── */}
          <div className="order-bottom-grid">
            {/* Shipping Address */}
            <div
              style={{
                padding: "clamp(16px,3vw,24px)",
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
                  margin: "0 0 14px 0",
                }}
              >
                📍 Shipping Address
              </p>
              <p
                style={{
                  fontFamily: "DM Sans",
                  fontSize: "14px",
                  fontWeight: "700",
                  color: "#0f172a",
                  margin: "0 0 4px 0",
                }}
              >
                {order.shippingAddress?.fullName}
              </p>
              <p
                style={{
                  fontFamily: "DM Sans",
                  fontSize: "13px",
                  color: "#64748b",
                  margin: "0 0 4px 0",
                  lineHeight: 1.6,
                }}
              >
                {order.shippingAddress?.addressLine1}
                {order.shippingAddress?.addressLine2 &&
                  `, ${order.shippingAddress.addressLine2}`}
              </p>
              <p
                style={{
                  fontFamily: "DM Sans",
                  fontSize: "13px",
                  color: "#64748b",
                  margin: "0 0 4px 0",
                }}
              >
                {order.shippingAddress?.city}, {order.shippingAddress?.state} —{" "}
                {order.shippingAddress?.pincode}
              </p>
              <p
                style={{
                  fontFamily: "DM Sans",
                  fontSize: "13px",
                  color: "#94a3b8",
                  margin: 0,
                }}
              >
                📱 {order.shippingAddress?.phone}
              </p>
            </div>

            {/* Payment Info */}
            <div
              style={{
                padding: "clamp(16px,3vw,24px)",
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
                  margin: "0 0 14px 0",
                }}
              >
                💳 Payment Info
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span
                    style={{
                      fontFamily: "DM Sans",
                      fontSize: "13px",
                      color: "#64748b",
                    }}
                  >
                    Method
                  </span>
                  <span
                    style={{
                      fontFamily: "DM Sans",
                      fontSize: "13px",
                      fontWeight: "600",
                      color: "#0f172a",
                    }}
                  >
                    {order.paymentMethod === "COD"
                      ? "💵 Cash on Delivery"
                      : "💳 Online Payment"}
                  </span>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span
                    style={{
                      fontFamily: "DM Sans",
                      fontSize: "13px",
                      color: "#64748b",
                    }}
                  >
                    Status
                  </span>
                  <span
                    style={{
                      fontFamily: "DM Sans",
                      fontSize: "13px",
                      fontWeight: "700",
                      color:
                        order.paymentStatus === "Paid" ? "#16a34a" : "#d97706",
                    }}
                  >
                    {order.paymentStatus === "Paid"
                      ? "✅ Paid"
                      : "⏳ " + order.paymentStatus}
                  </span>
                </div>
                {order.deliveredAt && (
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span
                      style={{
                        fontFamily: "DM Sans",
                        fontSize: "13px",
                        color: "#64748b",
                      }}
                    >
                      Delivered
                    </span>
                    <span
                      style={{
                        fontFamily: "DM Sans",
                        fontSize: "13px",
                        color: "#0f172a",
                      }}
                    >
                      {new Date(order.deliveredAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ── Actions ── */}
          <div
            style={{
              display: "flex",
              gap: "12px",
              marginTop: "20px",
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={() => navigate("/dashboard?tab=orders")}
              style={{
                padding: "12px 24px",
                borderRadius: "12px",
                background: "#16a34a",
                color: "white",
                fontFamily: "DM Sans",
                fontSize: "14px",
                fontWeight: "600",
                border: "none",
                cursor: "pointer",
                transition: "all 0.2s",
                boxShadow: "0 4px 12px rgba(22,163,74,0.25)",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#15803d")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "#16a34a")
              }
            >
              ← Back to Orders
            </button>
            <Link
              to="/products"
              style={{
                padding: "12px 24px",
                borderRadius: "12px",
                background: "transparent",
                color: "#16a34a",
                fontFamily: "DM Sans",
                fontSize: "14px",
                fontWeight: "600",
                border: "1px solid #16a34a",
                textDecoration: "none",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#f0fdf4")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        .timeline-desktop { display: block; }
        .timeline-mobile  { display: none;  }

        @media (max-width: 640px) {
          .timeline-desktop { display: none;  }
          .timeline-mobile  { display: block; }
        }

        .order-bottom-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
          margin-top: 20px;
        }
        @media (min-width: 640px) {
          .order-bottom-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </>
  );
};

export default OrderTrackingPage;
