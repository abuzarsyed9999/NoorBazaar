// import { Link } from "react-router-dom";

// const Footer = () => (
//   <footer style={{ background: "#0f172a", color: "#94a3b8" }}>
//     <div
//       style={{
//         maxWidth: "1280px",
//         margin: "0 auto",
//         padding: "56px 24px 32px",
//       }}
//     >
//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
//           gap: "40px",
//           marginBottom: "40px",
//         }}
//       >
//         {/* Brand */}
//         <div>
//           <Link
//             to="/"
//             style={{
//               display: "flex",
//               alignItems: "center",
//               gap: "10px",
//               textDecoration: "none",
//               marginBottom: "16px",
//             }}
//           >
//             <div
//               style={{
//                 width: "36px",
//                 height: "36px",
//                 borderRadius: "10px",
//                 background: "linear-gradient(135deg,#16a34a,#14532d)",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 color: "white",
//                 fontFamily: "Cormorant Garamond, serif",
//                 fontWeight: "bold",
//                 fontSize: "20px",
//               }}
//             >
//               ن
//             </div>
//             <div>
//               <p
//                 style={{
//                   fontFamily: "Cormorant Garamond, serif",
//                   fontWeight: "600",
//                   fontSize: "18px",
//                   color: "white",
//                   margin: 0,
//                 }}
//               >
//                 NoorBazaar
//               </p>
//               <p
//                 style={{
//                   fontFamily: "Amiri",
//                   fontSize: "11px",
//                   color: "#4ade80",
//                   margin: 0,
//                 }}
//               >
//                 نور بازار
//               </p>
//             </div>
//           </Link>
//           <p
//             style={{
//               fontFamily: "DM Sans",
//               fontSize: "13px",
//               lineHeight: 1.7,
//               color: "#64748b",
//               marginBottom: "16px",
//             }}
//           >
//             Your trusted destination for authentic Islamic products. Shop with
//             barakah.
//           </p>
//           <p
//             style={{
//               fontFamily: "Amiri, serif",
//               fontSize: "16px",
//               color: "#16a34a",
//             }}
//           >
//             بِسْمِ اللَّهِ
//           </p>
//         </div>

//         {/* Quick Links */}
//         <div>
//           <p
//             style={{
//               fontFamily: "DM Sans",
//               fontSize: "11px",
//               fontWeight: "700",
//               textTransform: "uppercase",
//               letterSpacing: "0.1em",
//               color: "white",
//               marginBottom: "16px",
//             }}
//           >
//             Quick Links
//           </p>
//           <ul
//             style={{
//               listStyle: "none",
//               padding: 0,
//               margin: 0,
//               display: "flex",
//               flexDirection: "column",
//               gap: "10px",
//             }}
//           >
//             {[
//               { l: "Home", to: "/" },
//               { l: "Products", to: "/products" },
//               { l: "Cart", to: "/cart" },
//               { l: "Dashboard", to: "/dashboard" },
//             ].map((item) => (
//               <li key={item.l}>
//                 <Link
//                   to={item.to}
//                   style={{
//                     fontFamily: "DM Sans",
//                     fontSize: "13px",
//                     color: "#64748b",
//                     textDecoration: "none",
//                     transition: "color 0.2s",
//                   }}
//                   onMouseEnter={(e) =>
//                     (e.currentTarget.style.color = "#4ade80")
//                   }
//                   onMouseLeave={(e) =>
//                     (e.currentTarget.style.color = "#64748b")
//                   }
//                 >
//                   {item.l}
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Categories */}
//         <div>
//           <p
//             style={{
//               fontFamily: "DM Sans",
//               fontSize: "11px",
//               fontWeight: "700",
//               textTransform: "uppercase",
//               letterSpacing: "0.1em",
//               color: "white",
//               marginBottom: "16px",
//             }}
//           >
//             Categories
//           </p>
//           <ul
//             style={{
//               listStyle: "none",
//               padding: 0,
//               margin: 0,
//               display: "flex",
//               flexDirection: "column",
//               gap: "10px",
//             }}
//           >
//             {[
//               { l: "Quran & Books", to: "/products/category/quran-and-books" },
//               { l: "Tasbih", to: "/products/category/tasbih" },
//               { l: "Prayer Items", to: "/products/category/prayer-items" },
//               { l: "Islamic Decor", to: "/products/category/islamic-decor" },
//               { l: "Gift Sets", to: "/products/category/gift-sets" },
//             ].map((item) => (
//               <li key={item.l}>
//                 <Link
//                   to={item.to}
//                   style={{
//                     fontFamily: "DM Sans",
//                     fontSize: "13px",
//                     color: "#64748b",
//                     textDecoration: "none",
//                     transition: "color 0.2s",
//                   }}
//                   onMouseEnter={(e) =>
//                     (e.currentTarget.style.color = "#4ade80")
//                   }
//                   onMouseLeave={(e) =>
//                     (e.currentTarget.style.color = "#64748b")
//                   }
//                 >
//                   {item.l}
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Contact */}
//         <div>
//           <p
//             style={{
//               fontFamily: "DM Sans",
//               fontSize: "11px",
//               fontWeight: "700",
//               textTransform: "uppercase",
//               letterSpacing: "0.1em",
//               color: "white",
//               marginBottom: "16px",
//             }}
//           >
//             Contact Us
//           </p>
//           <ul
//             style={{
//               listStyle: "none",
//               padding: 0,
//               margin: 0,
//               display: "flex",
//               flexDirection: "column",
//               gap: "10px",
//             }}
//           >
//             {[
//               { icon: "📍", text: "Nellore, Andhra Pradesh" },
//               { icon: "📧", text: "noorbazaar@gmail.com" },
//               { icon: "📱", text: "+91 98765 43210" },
//             ].map((item) => (
//               <li
//                 key={item.text}
//                 style={{
//                   display: "flex",
//                   alignItems: "flex-start",
//                   gap: "8px",
//                   fontFamily: "DM Sans",
//                   fontSize: "13px",
//                   color: "#64748b",
//                 }}
//               >
//                 <span>{item.icon}</span>
//                 <span>{item.text}</span>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>

//       {/* Bottom */}
//       <div
//         style={{
//           borderTop: "1px solid #1e293b",
//           paddingTop: "24px",
//           display: "flex",
//           flexWrap: "wrap",
//           alignItems: "center",
//           justifyContent: "space-between",
//           gap: "12px",
//         }}
//       >
//         <p
//           style={{
//             fontFamily: "DM Sans",
//             fontSize: "12px",
//             color: "#334155",
//             margin: 0,
//           }}
//         >
//           © 2024 NoorBazaar. Made with ❤️ for the Ummah.
//         </p>
//         <div style={{ display: "flex", gap: "20px" }}>
//           {["Privacy Policy", "Terms", "Refund Policy"].map((t) => (
//             <Link
//               key={t}
//               to="/"
//               style={{
//                 fontFamily: "DM Sans",
//                 fontSize: "12px",
//                 color: "#334155",
//                 textDecoration: "none",
//                 transition: "color 0.2s",
//               }}
//               onMouseEnter={(e) => (e.currentTarget.style.color = "#64748b")}
//               onMouseLeave={(e) => (e.currentTarget.style.color = "#334155")}
//             >
//               {t}
//             </Link>
//           ))}
//         </div>
//       </div>
//     </div>
//   </footer>
// );

// export default Footer;
import { Link } from "react-router-dom";

const Footer = () => (
  <>
    <footer
      style={{
        background: "#ffffff",
        color: "#94a3b8",
        width: "100%",
        borderTop: "1px solid #e2e8f0",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "56px 24px 32px",
          width: "100%",
        }}
      >
        {/* ══════════════════════════════
            TOP GRID
        ══════════════════════════════ */}
        <div className="footer-grid" style={{ marginBottom: "48px" }}>
          {/* ── Brand ── */}
          <div className="footer-brand">
            <Link
              to="/"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                textDecoration: "none",
                marginBottom: "16px",
              }}
            >
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "10px",
                  background: "linear-gradient(135deg,#16a34a,#14532d)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontFamily: "Cormorant Garamond, serif",
                  fontWeight: "bold",
                  fontSize: "20px",
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
                    fontSize: "18px",
                    color: "#0f172a",
                    margin: 0,
                    lineHeight: 1,
                  }}
                >
                  NoorBazaar
                </p>
                <p
                  style={{
                    fontFamily: "Amiri, serif",
                    fontSize: "11px",
                    color: "#16a34a",
                    margin: "2px 0 0 0",
                  }}
                >
                  نور بازار
                </p>
              </div>
            </Link>

            <p
              style={{
                fontFamily: "DM Sans, sans-serif",
                fontSize: "13px",
                lineHeight: 1.7,
                color: "#64748b",
                margin: "0 0 16px 0",
              }}
            >
              Your trusted destination for authentic Islamic products. Shop with
              barakah. 🌙
            </p>

            <p
              style={{
                fontFamily: "Amiri, serif",
                fontSize: "18px",
                color: "#16a34a",
                margin: "0 0 20px 0",
              }}
            >
              بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
            </p>

            {/* Social Icons */}
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {[
                { icon: "📘", label: "Facebook" },
                { icon: "📸", label: "Instagram" },
                { icon: "🐦", label: "Twitter" },
                { icon: "▶️", label: "YouTube" },
              ].map((s) => (
                <button
                  key={s.label}
                  title={s.label}
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "16px",
                    background: "#f0fdf4",
                    border: "1px solid #bbf7d0",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#16a34a";
                    e.currentTarget.style.borderColor = "#16a34a";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#f0fdf4";
                    e.currentTarget.style.borderColor = "#bbf7d0";
                  }}
                >
                  {s.icon}
                </button>
              ))}
            </div>
          </div>

          {/* ── Quick Links ── */}
          <div className="footer-col">
            <p
              style={{
                fontFamily: "DM Sans, sans-serif",
                fontSize: "11px",
                fontWeight: "700",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "#0f172a",
                margin: "0 0 16px 0",
              }}
            >
              Quick Links
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {[
                { l: "Home", to: "/" },
                { l: "Products", to: "/products" },
                { l: "Cart", to: "/cart" },
                { l: "Dashboard", to: "/dashboard" },
                { l: "Login", to: "/login" },
                { l: "Register", to: "/register" },
              ].map((item) => (
                <li key={item.l} style={{ marginBottom: "10px" }}>
                  <Link
                    to={item.to}
                    style={{
                      fontFamily: "DM Sans, sans-serif",
                      fontSize: "13px",
                      color: "#64748b",
                      textDecoration: "none",
                      transition: "color 0.2s",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "#16a34a")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "#64748b")
                    }
                  >
                    <span style={{ color: "#16a34a", fontSize: "10px" }}>
                      ›
                    </span>
                    {item.l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Categories ── */}
          <div className="footer-col">
            <p
              style={{
                fontFamily: "DM Sans, sans-serif",
                fontSize: "11px",
                fontWeight: "700",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "#0f172a",
                margin: "0 0 16px 0",
              }}
            >
              Categories
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {[
                {
                  l: "Quran & Books",
                  to: "/products/category/quran-and-books",
                },
                { l: "Tasbih", to: "/products/category/tasbih" },
                { l: "Prayer Items", to: "/products/category/prayer-items" },
                { l: "Islamic Decor", to: "/products/category/islamic-decor" },
                {
                  l: "Attar & Fragrances",
                  to: "/products/category/attar-fragrances",
                },
                { l: "Gift Sets", to: "/products/category/gift-sets" },
              ].map((item) => (
                <li key={item.l} style={{ marginBottom: "10px" }}>
                  <Link
                    to={item.to}
                    style={{
                      fontFamily: "DM Sans, sans-serif",
                      fontSize: "13px",
                      color: "#64748b",
                      textDecoration: "none",
                      transition: "color 0.2s",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "#16a34a")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "#64748b")
                    }
                  >
                    <span style={{ color: "#16a34a", fontSize: "10px" }}>
                      ›
                    </span>
                    {item.l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Contact ── */}
          <div className="footer-col">
            <p
              style={{
                fontFamily: "DM Sans, sans-serif",
                fontSize: "11px",
                fontWeight: "700",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "#0f172a",
                margin: "0 0 16px 0",
              }}
            >
              Contact Us
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {[
                { icon: "📍", text: "Madanapalle, Andhra Pradesh, India" },
                { icon: "📧", text: "abuzar7993@gmail.com" },
                { icon: "📱", text: "+91 6301372060" },
                { icon: "🕐", text: "Mon–Sat: 9AM – 7PM" },
              ].map((item) => (
                <li
                  key={item.text}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "10px",
                    fontFamily: "DM Sans, sans-serif",
                    fontSize: "13px",
                    color: "#64748b",
                    marginBottom: "12px",
                    lineHeight: 1.5,
                  }}
                >
                  <span style={{ flexShrink: 0, marginTop: "1px" }}>
                    {item.icon}
                  </span>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>

            {/* Newsletter mini */}
            <div style={{ marginTop: "16px" }}>
              <p
                style={{
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: "12px",
                  fontWeight: "600",
                  color: "#0f172a",
                  margin: "0 0 8px 0",
                }}
              >
                Stay Updated
              </p>
              <div style={{ display: "flex" }}>
                <input
                  type="email"
                  placeholder="your@email.com"
                  style={{
                    flex: 1,
                    background: "#f8fafc",
                    border: "1px solid #e2e8f0",
                    borderRight: "none",
                    borderRadius: "8px 0 0 8px",
                    padding: "9px 12px",
                    color: "#0f172a",
                    fontFamily: "DM Sans, sans-serif",
                    fontSize: "12px",
                    outline: "none",
                    minWidth: 0,
                  }}
                  onFocus={(e) =>
                    (e.currentTarget.style.borderColor = "#16a34a")
                  }
                  onBlur={(e) =>
                    (e.currentTarget.style.borderColor = "#e2e8f0")
                  }
                />
                <button
                  style={{
                    background: "#16a34a",
                    border: "none",
                    borderRadius: "0 8px 8px 0",
                    padding: "9px 14px",
                    color: "white",
                    fontFamily: "DM Sans, sans-serif",
                    fontSize: "12px",
                    fontWeight: "600",
                    cursor: "pointer",
                    flexShrink: 0,
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#15803d")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "#16a34a")
                  }
                >
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════
            TRUST BADGES
        ══════════════════════════════ */}
        <div
          className="footer-trust"
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            gap: "clamp(12px, 2vw, 32px)",
            padding: "20px 24px",
            borderRadius: "12px",
            background: "#f0fdf4",
            border: "1px solid #bbf7d0",
            marginBottom: "32px",
          }}
        >
          {[
            { icon: "✅", text: "100% Authentic" },
            { icon: "🔒", text: "Secure Payments" },
            { icon: "🚚", text: "Free Shipping ₹999+" },
            { icon: "🔄", text: "Easy Returns" },
            { icon: "💬", text: "24/7 Support" },
          ].map((t) => (
            <div
              key={t.text}
              style={{ display: "flex", alignItems: "center", gap: "6px" }}
            >
              <span style={{ fontSize: "14px" }}>{t.icon}</span>
              <span
                style={{
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: "12px",
                  fontWeight: "600",
                  color: "#15803d",
                  whiteSpace: "nowrap",
                }}
              >
                {t.text}
              </span>
            </div>
          ))}
        </div>

        {/* ══════════════════════════════
            BOTTOM BAR
        ══════════════════════════════ */}
        <div
          className="footer-bottom"
          style={{
            borderTop: "1px solid #e2e8f0",
            paddingTop: "24px",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
          }}
        >
          <p
            style={{
              fontFamily: "DM Sans, sans-serif",
              fontSize: "12px",
              color: "#94a3b8",
              margin: 0,
            }}
          >
            © 2026 NoorBazaar. Made with ❤️ for the Ummah.
          </p>

          <div
            className="footer-bottom-links"
            style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}
          >
            {["Privacy Policy", "Terms of Service", "Refund Policy"].map(
              (t) => (
                <Link
                  key={t}
                  to="/"
                  style={{
                    fontFamily: "DM Sans, sans-serif",
                    fontSize: "12px",
                    color: "#94a3b8",
                    textDecoration: "none",
                    transition: "color 0.2s",
                    whiteSpace: "nowrap",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#16a34a")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#94a3b8")
                  }
                >
                  {t}
                </Link>
              ),
            )}
          </div>
        </div>
      </div>
    </footer>

    {/* ── Responsive Styles ── */}
    <style>{`
      .footer-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 32px;
      }
      .footer-brand { text-align: center; }
      .footer-brand > a  { justify-content: center; }
      .footer-col        { text-align: center; }
      .footer-col ul li a{ justify-content: center; }

      @media (min-width: 540px) {
        .footer-grid {
          grid-template-columns: repeat(2, 1fr);
          gap: 28px;
        }
        .footer-brand { text-align: left; grid-column: 1 / -1; }
        .footer-brand > a  { justify-content: flex-start; }
        .footer-col        { text-align: left; }
        .footer-col ul li a{ justify-content: flex-start; }
      }

      @media (min-width: 768px) {
        .footer-grid {
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
        }
        .footer-brand { grid-column: 1 / -1; }
      }

      @media (min-width: 1024px) {
        .footer-grid {
          grid-template-columns: 2fr 1fr 1fr 1.5fr;
          gap: 40px;
          align-items: start;
        }
        .footer-brand { grid-column: auto; text-align: left; }
        .footer-brand > a  { justify-content: flex-start; }
        .footer-col        { text-align: left; }
        .footer-col ul li a{ justify-content: flex-start; }
      }

      @media (max-width: 640px) {
        .footer-bottom {
          flex-direction: column !important;
          align-items: center !important;
          text-align: center;
        }
        .footer-bottom-links {
          justify-content: center;
          gap: 12px !important;
        }
        .footer-trust {
          gap: 10px !important;
          padding: 14px 12px !important;
        }
      }
    `}</style>
  </>
);

export default Footer;
