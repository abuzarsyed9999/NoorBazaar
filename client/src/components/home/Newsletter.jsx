const features = [
  {
    icon: "🕌",
    title: "100% Authentic",
    desc: "Genuine products sourced from trusted Islamic suppliers worldwide.",
    color: "#16a34a",
    bg: "#f0fdf4",
    border: "#bbf7d0",
  },
  {
    icon: "🚚",
    title: "Fast Delivery",
    desc: "Quick and safe delivery across India. Free shipping above ₹999.",
    color: "#0284c7",
    bg: "#f0f9ff",
    border: "#bae6fd",
  },
  {
    icon: "💎",
    title: "Premium Quality",
    desc: "Every product is carefully inspected to meet the highest standards.",
    color: "#c9a84c",
    bg: "#fefce8",
    border: "#fde68a",
  },
  {
    icon: "🔒",
    title: "Secure Payment",
    desc: "100% secure payments. COD, UPI, Cards and more payment options.",
    color: "#7c3aed",
    bg: "#faf5ff",
    border: "#e9d5ff",
  },
];

const WhyChooseUs = () => (
  <section
    style={{
      background: "#ffffff",
      padding: "80px 24px",
      borderTop: "1px solid #e2e8f0",
    }}
  >
    <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "48px" }}>
        <p
          style={{
            fontFamily: "DM Sans",
            fontSize: "12px",
            fontWeight: "600",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "#16a34a",
            marginBottom: "8px",
          }}
        >
          Why Us
        </p>
        <h2
          style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: "38px",
            fontWeight: "600",
            color: "#0f172a",
            margin: 0,
          }}
        >
          Shop With Confidence
        </h2>
      </div>

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: "20px",
        }}
      >
        {features.map((f) => (
          <div
            key={f.title}
            style={{
              padding: "28px",
              borderRadius: "16px",
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = f.border;
              e.currentTarget.style.background = f.bg;
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow = `0 8px 24px ${f.color}20`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#e2e8f0";
              e.currentTarget.style.background = "#ffffff";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <div
              style={{
                width: "52px",
                height: "52px",
                borderRadius: "14px",
                background: f.bg,
                border: `1px solid ${f.border}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px",
                marginBottom: "16px",
              }}
            >
              {f.icon}
            </div>
            <h3
              style={{
                fontFamily: "DM Sans",
                fontSize: "16px",
                fontWeight: "700",
                color: f.color,
                marginBottom: "8px",
              }}
            >
              {f.title}
            </h3>
            <p
              style={{
                fontFamily: "DM Sans",
                fontSize: "14px",
                color: "#64748b",
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              {f.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyChooseUs;
