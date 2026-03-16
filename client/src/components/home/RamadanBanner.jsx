import { Link } from "react-router-dom";

const RamadanBanner = () => (
  <section style={{ padding: "40px 24px", background: "#ffffff" }}>
    <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
      <div
        style={{
          background:
            "linear-gradient(135deg, #14532d 0%, #166534 50%, #15803d 100%)",
          borderRadius: "24px",
          overflow: "hidden",
          position: "relative",
          padding: "48px 40px",
        }}
      >
        {/* BG decoration */}
        <div
          style={{
            position: "absolute",
            top: "-40px",
            right: "-40px",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.05)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-60px",
            left: "20%",
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.03)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "relative",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "32px",
          }}
        >
          {/* Left */}
          <div>
            <p
              style={{
                fontFamily: "Amiri, serif",
                fontSize: "28px",
                color: "#86efac",
                marginBottom: "8px",
              }}
            >
              رمضان مبارك
            </p>
            <h2
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "clamp(28px, 4vw, 44px)",
                fontWeight: "600",
                color: "white",
                marginBottom: "12px",
              }}
            >
              Ramadan <span style={{ color: "#86efac" }}>Special</span> Deals
            </h2>
            <p
              style={{
                fontFamily: "DM Sans, sans-serif",
                fontSize: "15px",
                color: "rgba(255,255,255,0.75)",
                maxWidth: "420px",
                lineHeight: 1.6,
                marginBottom: "20px",
              }}
            >
              Use code{" "}
              <span
                style={{
                  background: "rgba(255,255,255,0.15)",
                  color: "white",
                  padding: "2px 10px",
                  borderRadius: "6px",
                  fontWeight: "600",
                }}
              >
                RAMADAN10
              </span>{" "}
              for 10% off your entire order.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {[
                "🎁 Gift Wrapping",
                "🚚 Free Shipping ₹999+",
                "✅ Authentic Products",
              ].map((f) => (
                <span
                  key={f}
                  style={{
                    background: "rgba(255,255,255,0.12)",
                    color: "rgba(255,255,255,0.9)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    borderRadius: "20px",
                    padding: "4px 14px",
                    fontSize: "12px",
                    fontFamily: "DM Sans",
                  }}
                >
                  {f}
                </span>
              ))}
            </div>
          </div>

          {/* Right */}
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "64px", marginBottom: "16px" }}>🌙</div>
            <Link
              to="/products"
              style={{
                display: "inline-block",
                padding: "14px 28px",
                borderRadius: "12px",
                background: "white",
                color: "#15803d",
                fontFamily: "DM Sans",
                fontSize: "15px",
                fontWeight: "700",
                textDecoration: "none",
                transition: "all 0.2s",
                boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.15)";
              }}
            >
              Shop Ramadan Collection →
            </Link>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default RamadanBanner;
