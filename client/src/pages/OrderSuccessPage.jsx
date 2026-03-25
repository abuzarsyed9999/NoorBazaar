import { useEffect } from "react";
import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearPayment } from "../redux/slices/paymentSlice";
import { fetchCart } from "../redux/slices/cartSlice";

const OrderSuccessPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { orderNumber, paymentMethod } = location.state || {};

  useEffect(() => {
    dispatch(clearPayment());
    dispatch(fetchCart());
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      style={{
        background: "#ffffff",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      <div style={{ maxWidth: "540px", width: "100%", textAlign: "center" }}>
        {/* Success Animation */}
        <div
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            background: "linear-gradient(135deg,#f0fdf4,#dcfce7)",
            border: "3px solid #16a34a",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 24px auto",
            animation: "popIn 0.5s ease",
          }}
        >
          <svg
            style={{ width: "48px", height: "48px", color: "#16a34a" }}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        {/* Arabic */}
        <p
          style={{
            fontFamily: "Amiri, serif",
            fontSize: "22px",
            color: "#16a34a",
            margin: "0 0 8px 0",
          }}
        >
          الحَمْدُ لِلَّه
        </p>

        <h1
          style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: "clamp(26px,4vw,36px)",
            fontWeight: "600",
            color: "#0f172a",
            margin: "0 0 8px 0",
          }}
        >
          Order Placed Successfully!
        </h1>

        <p
          style={{
            fontFamily: "DM Sans",
            fontSize: "15px",
            color: "#64748b",
            margin: "0 0 24px 0",
            lineHeight: 1.6,
          }}
        >
          JazakAllah Khair for your order. We'll prepare it with care,
          InshaAllah.
        </p>

        {/* Order Details */}
        <div
          style={{
            padding: "20px 24px",
            borderRadius: "16px",
            background: "#f0fdf4",
            border: "1px solid #bbf7d0",
            marginBottom: "28px",
            textAlign: "left",
          }}
        >
          {orderNumber && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "12px",
                paddingBottom: "12px",
                borderBottom: "1px solid #dcfce7",
              }}
            >
              <span
                style={{
                  fontFamily: "DM Sans",
                  fontSize: "13px",
                  color: "#64748b",
                }}
              >
                Order Number
              </span>
              <span
                style={{
                  fontFamily: "DM Sans",
                  fontSize: "14px",
                  fontWeight: "800",
                  color: "#0f172a",
                  letterSpacing: "0.05em",
                }}
              >
                #{orderNumber}
              </span>
            </div>
          )}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "12px",
            }}
          >
            <span
              style={{
                fontFamily: "DM Sans",
                fontSize: "13px",
                color: "#64748b",
              }}
            >
              Payment
            </span>
            <span
              style={{
                fontFamily: "DM Sans",
                fontSize: "13px",
                fontWeight: "600",
                color: "#16a34a",
              }}
            >
              {paymentMethod === "Online"
                ? "✅ Paid Online"
                : "💵 Cash on Delivery"}
            </span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span
              style={{
                fontFamily: "DM Sans",
                fontSize: "13px",
                color: "#64748b",
              }}
            >
              Email
            </span>
            <span
              style={{
                fontFamily: "DM Sans",
                fontSize: "13px",
                color: "#64748b",
              }}
            >
              Confirmation sent ✉️
            </span>
          </div>
        </div>

        {/* What's Next */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            marginBottom: "28px",
            textAlign: "left",
          }}
        >
          {[
            {
              icon: "📧",
              title: "Check your email",
              desc: "Order confirmation sent to your inbox",
            },
            {
              icon: "📦",
              title: "We're preparing it",
              desc: "Your order will be packed with care",
            },
            {
              icon: "🚚",
              title: "Track your order",
              desc: "Get real-time updates on your order status",
            },
          ].map((step) => (
            <div
              key={step.title}
              style={{
                display: "flex",
                gap: "12px",
                padding: "12px",
                borderRadius: "10px",
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
              }}
            >
              <span style={{ fontSize: "20px", flexShrink: 0 }}>
                {step.icon}
              </span>
              <div>
                <p
                  style={{
                    fontFamily: "DM Sans",
                    fontSize: "13px",
                    fontWeight: "700",
                    color: "#0f172a",
                    margin: "0 0 2px 0",
                  }}
                >
                  {step.title}
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
          ))}
        </div>

        {/* Action Buttons */}
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <Link
            to={`/orders/${id}`}
            style={{
              flex: 1,
              padding: "13px",
              borderRadius: "12px",
              background: "#16a34a",
              color: "white",
              fontFamily: "DM Sans",
              fontSize: "14px",
              fontWeight: "600",
              textDecoration: "none",
              textAlign: "center",
              boxShadow: "0 4px 12px rgba(22,163,74,0.25)",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#15803d")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#16a34a")}
          >
            Track Order →
          </Link>
          <Link
            to="/products"
            style={{
              flex: 1,
              padding: "13px",
              borderRadius: "12px",
              background: "transparent",
              color: "#16a34a",
              fontFamily: "DM Sans",
              fontSize: "14px",
              fontWeight: "600",
              textDecoration: "none",
              textAlign: "center",
              border: "1px solid #16a34a",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#f0fdf4")}
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "transparent")
            }
          >
            Continue Shopping
          </Link>
        </div>

        {/* Dua */}
        <div
          style={{
            marginTop: "28px",
            padding: "16px",
            borderRadius: "12px",
            background: "#f0fdf4",
            border: "1px solid #bbf7d0",
          }}
        >
          <p
            style={{
              fontFamily: "Amiri, serif",
              fontSize: "18px",
              color: "#15803d",
              margin: "0 0 6px 0",
            }}
          >
            بَارَكَ اللَّهُ فِيكَ
          </p>
          <p
            style={{
              fontFamily: "DM Sans",
              fontSize: "12px",
              color: "#64748b",
              margin: 0,
            }}
          >
            May Allah bless your purchase. JazakAllah Khair for choosing
            NoorBazaar!
          </p>
        </div>
      </div>

      <style>{`
        @keyframes popIn {
          0%   { transform: scale(0); opacity: 0; }
          70%  { transform: scale(1.1); }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default OrderSuccessPage;
