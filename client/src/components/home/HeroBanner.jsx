// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";

// const slides = [
//   {
//     tag: "New Arrivals 2026",
//     title: "The Finest Islamic",
//     accent: "Products",
//     sub: "Curated for the Modern Muslim",
//     desc: "Discover authentic Qurans, handcrafted Tasbih, premium Prayer Mats and exclusive Islamic gifts — all in one place.",
//     cta: { label: "Explore Collection", to: "/products" },
//     ghost: { label: "View Quran", to: "/products/category/quran-and-books" },
//   },
//   {
//     tag: "Ramadan Special 🌙",
//     title: "Premium Quality",
//     accent: "Tasbih & Dhikr",
//     sub: "For Your Daily Remembrance",
//     desc: "Crystal, wooden and digital tasbih counters. Crafted with love for the Muslim who remembers Allah constantly.",
//     cta: { label: "Shop Tasbih", to: "/products/category/tasbih" },
//     ghost: { label: "All Products", to: "/products" },
//   },
//   {
//     tag: "Gift Ideas 🎁",
//     title: "Thoughtful Islamic",
//     accent: "Gift Hampers",
//     sub: "For Every Blessed Occasion",
//     desc: "Eid boxes, Ramadan hampers, Nikah gifts — beautifully packed with authentic Islamic items your loved ones will cherish.",
//     cta: { label: "Shop Gifts", to: "/products/category/gift-sets" },
//     ghost: { label: "All Products", to: "/products" },
//   },
// ];

// const HeroBanner = () => {
//   const [idx, setIdx] = useState(0);
//   const [visible, setVisible] = useState(true);

//   useEffect(() => {
//     const t = setInterval(() => {
//       setVisible(false);
//       setTimeout(() => {
//         setIdx((p) => (p + 1) % slides.length);
//         setVisible(true);
//       }, 300);
//     }, 6000);
//     return () => clearInterval(t);
//   }, []);

//   const s = slides[idx];

//   return (
//     <section
//       style={{
//         background:
//           "linear-gradient(135deg, #f0fdf4 0%, #ffffff 50%, #f0fdf4 100%)",
//         minHeight: "92vh",
//         display: "flex",
//         alignItems: "center",
//         position: "relative",
//         overflow: "hidden",
//         borderBottom: "1px solid #e2e8f0",
//       }}
//     >
//       {/* Background Decorations */}
//       <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
//         <div
//           style={{
//             position: "absolute",
//             top: "-80px",
//             right: "-80px",
//             width: "500px",
//             height: "500px",
//             borderRadius: "50%",
//             background:
//               "radial-gradient(circle, rgba(22,163,74,0.08), transparent 70%)",
//           }}
//         />
//         <div
//           style={{
//             position: "absolute",
//             bottom: "-60px",
//             left: "-60px",
//             width: "400px",
//             height: "400px",
//             borderRadius: "50%",
//             background:
//               "radial-gradient(circle, rgba(22,163,74,0.06), transparent 70%)",
//           }}
//         />
//         {/* Grid Pattern */}
//         <div
//           style={{
//             position: "absolute",
//             inset: 0,
//             opacity: 0.03,
//             backgroundImage: `linear-gradient(#16a34a 1px, transparent 1px), linear-gradient(90deg, #16a34a 1px, transparent 1px)`,
//             backgroundSize: "60px 60px",
//           }}
//         />
//       </div>

//       <div
//         style={{
//           maxWidth: "1280px",
//           margin: "0 auto",
//           padding: "80px 24px",
//           width: "100%",
//           position: "relative",
//         }}
//       >
//         <div
//           style={{
//             maxWidth: "680px",
//             opacity: visible ? 1 : 0,
//             transform: visible ? "translateY(0)" : "translateY(16px)",
//             transition: "all 0.4s ease",
//           }}
//         >
//           {/* Tag */}
//           <div
//             style={{
//               display: "inline-flex",
//               alignItems: "center",
//               background: "#dcfce7",
//               color: "#15803d",
//               border: "1px solid #bbf7d0",
//               borderRadius: "20px",
//               padding: "6px 14px",
//               fontSize: "12px",
//               fontFamily: "DM Sans, sans-serif",
//               fontWeight: "600",
//               marginBottom: "24px",
//               letterSpacing: "0.05em",
//             }}
//           >
//             ✦ {s.tag}
//           </div>

//           {/* Title */}
//           <h1
//             style={{
//               fontFamily: "Cormorant Garamond, serif",
//               fontSize: "clamp(42px, 6vw, 72px)",
//               fontWeight: "600",
//               lineHeight: 1.1,
//               color: "#0f172a",
//               marginBottom: "8px",
//             }}
//           >
//             {s.title} <span style={{ color: "#16a34a" }}>{s.accent}</span>
//           </h1>

//           {/* Subtitle */}
//           <p
//             style={{
//               fontFamily: "DM Sans, sans-serif",
//               fontSize: "16px",
//               color: "#64748b",
//               marginBottom: "16px",
//               fontStyle: "italic",
//             }}
//           >
//             — {s.sub}
//           </p>

//           {/* Divider */}
//           <div
//             style={{
//               width: "60px",
//               height: "3px",
//               borderRadius: "2px",
//               background: "#16a34a",
//               marginBottom: "24px",
//             }}
//           />

//           {/* Description */}
//           <p
//             style={{
//               fontFamily: "DM Sans, sans-serif",
//               fontSize: "16px",
//               lineHeight: 1.7,
//               color: "#475569",
//               maxWidth: "520px",
//               marginBottom: "36px",
//             }}
//           >
//             {s.desc}
//           </p>

//           {/* Buttons */}
//           <div
//             style={{
//               display: "flex",
//               flexWrap: "wrap",
//               gap: "12px",
//               marginBottom: "56px",
//             }}
//           >
//             <Link
//               to={s.cta.to}
//               style={{
//                 display: "inline-flex",
//                 alignItems: "center",
//                 gap: "8px",
//                 padding: "14px 28px",
//                 borderRadius: "12px",
//                 background: "#16a34a",
//                 color: "white",
//                 fontFamily: "DM Sans, sans-serif",
//                 fontSize: "15px",
//                 fontWeight: "600",
//                 textDecoration: "none",
//                 transition: "all 0.2s",
//                 boxShadow: "0 4px 16px rgba(22,163,74,0.3)",
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.background = "#15803d";
//                 e.currentTarget.style.transform = "translateY(-2px)";
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.background = "#16a34a";
//                 e.currentTarget.style.transform = "translateY(0)";
//               }}
//             >
//               {s.cta.label}
//               <svg
//                 style={{ width: "16px", height: "16px" }}
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M17 8l4 4m0 0l-4 4m4-4H3"
//                 />
//               </svg>
//             </Link>
//             <Link
//               to={s.ghost.to}
//               style={{
//                 display: "inline-flex",
//                 alignItems: "center",
//                 padding: "14px 28px",
//                 borderRadius: "12px",
//                 border: "1px solid #e2e8f0",
//                 color: "#334155",
//                 fontFamily: "DM Sans, sans-serif",
//                 fontSize: "15px",
//                 fontWeight: "500",
//                 textDecoration: "none",
//                 transition: "all 0.2s",
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.borderColor = "#16a34a";
//                 e.currentTarget.style.color = "#16a34a";
//                 e.currentTarget.style.background = "#f0fdf4";
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.borderColor = "#e2e8f0";
//                 e.currentTarget.style.color = "#334155";
//                 e.currentTarget.style.background = "transparent";
//               }}
//             >
//               {s.ghost.label}
//             </Link>
//           </div>

//           {/* Stats */}
//           <div style={{ display: "flex", flexWrap: "wrap", gap: "40px" }}>
//             {[
//               { n: "500+", l: "Products" },
//               { n: "10K+", l: "Customers" },
//               { n: "100%", l: "Authentic" },
//               { n: "4.9★", l: "Rating" },
//             ].map((stat) => (
//               <div key={stat.l}>
//                 <p
//                   style={{
//                     fontFamily: "Cormorant Garamond, serif",
//                     fontWeight: "600",
//                     fontSize: "28px",
//                     color: "#16a34a",
//                     margin: 0,
//                   }}
//                 >
//                   {stat.n}
//                 </p>
//                 <p
//                   style={{
//                     fontFamily: "DM Sans, sans-serif",
//                     fontSize: "11px",
//                     color: "#94a3b8",
//                     textTransform: "uppercase",
//                     letterSpacing: "0.1em",
//                     margin: 0,
//                   }}
//                 >
//                   {stat.l}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Slide Dots */}
//       <div
//         style={{
//           position: "absolute",
//           bottom: "32px",
//           left: "50%",
//           transform: "translateX(-50%)",
//           display: "flex",
//           gap: "8px",
//         }}
//       >
//         {slides.map((_, i) => (
//           <button
//             key={i}
//             onClick={() => {
//               setIdx(i);
//               setVisible(true);
//             }}
//             style={{
//               borderRadius: "4px",
//               border: "none",
//               cursor: "pointer",
//               transition: "all 0.3s",
//               width: i === idx ? "24px" : "8px",
//               height: "8px",
//               background: i === idx ? "#16a34a" : "#bbf7d0",
//             }}
//           />
//         ))}
//       </div>
//     </section>
//   );
// };

// export default HeroBanner;

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const slides = [
  {
    tag: "New Arrivals 2026",
    title: "The Finest Islamic",
    accent: "Products",
    sub: "Curated for the Modern Muslim",
    desc: "Discover authentic Qurans, handcrafted Tasbih, premium Prayer Mats and exclusive Islamic gifts — all in one place.",
    cta: { label: "Explore Collection", to: "/products" },
    ghost: { label: "View Quran", to: "/products/category/quran-and-books" },
  },
  {
    tag: "Ramadan Special 🌙",
    title: "Premium Quality",
    accent: "Tasbih & Dhikr",
    sub: "For Your Daily Remembrance",
    desc: "Crystal, wooden and digital tasbih counters. Crafted with love for the Muslim who remembers Allah constantly.",
    cta: { label: "Shop Tasbih", to: "/products/category/tasbih" },
    ghost: { label: "All Products", to: "/products" },
  },
  {
    tag: "Gift Ideas 🎁",
    title: "Thoughtful Islamic",
    accent: "Gift Hampers",
    sub: "For Every Blessed Occasion",
    desc: "Eid boxes, Ramadan hampers, Nikah gifts — beautifully packed with authentic Islamic items your loved ones will cherish.",
    cta: { label: "Shop Gifts", to: "/products/category/gift-sets" },
    ghost: { label: "All Products", to: "/products" },
  },
];

const HeroBanner = () => {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIdx((p) => (p + 1) % slides.length);
        setVisible(true);
      }, 300);
    }, 6000);
    return () => clearInterval(t);
  }, []);

  const s = slides[idx];

  return (
    <>
      <section
        style={{
          background:
            "linear-gradient(135deg, #f0fdf4 0%, #ffffff 50%, #f0fdf4 100%)",
          minHeight: "92vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          borderBottom: "1px solid #e2e8f0",
          width: "100%",
        }}
      >
        {/* ── Background Decorations ── */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div
            style={{
              position: "absolute",
              top: "-80px",
              right: "-80px",
              width: "500px",
              height: "500px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(22,163,74,0.08), transparent 70%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "-60px",
              left: "-60px",
              width: "400px",
              height: "400px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(22,163,74,0.06), transparent 70%)",
            }}
          />
          {/* Grid Pattern */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0.03,
              backgroundImage: `linear-gradient(#16a34a 1px, transparent 1px),
                              linear-gradient(90deg, #16a34a 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        {/* ── Main Content ── */}
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "80px 24px",
            width: "100%",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            className="hero-content"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(16px)",
              transition: "all 0.4s ease",
              textAlign: "center",
              width: "100%",
            }}
          >
            {/* ── Tag ── */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                background: "#dcfce7",
                color: "#15803d",
                border: "1px solid #bbf7d0",
                borderRadius: "20px",
                padding: "6px 14px",
                fontSize: "12px",
                fontFamily: "DM Sans, sans-serif",
                fontWeight: "600",
                marginBottom: "24px",
                letterSpacing: "0.05em",
              }}
            >
              ✦ {s.tag}
            </div>

            {/* ── Title ── */}
            <h1
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "clamp(36px, 6vw, 72px)",
                fontWeight: "600",
                lineHeight: 1.1,
                color: "#0f172a",
                marginBottom: "8px",
                margin: "0 0 8px 0",
              }}
            >
              {s.title} <span style={{ color: "#16a34a" }}>{s.accent}</span>
            </h1>

            {/* ── Subtitle ── */}
            <p
              style={{
                fontFamily: "DM Sans, sans-serif",
                fontSize: "clamp(14px, 2vw, 16px)",
                color: "#64748b",
                marginBottom: "16px",
                fontStyle: "italic",
                margin: "16px 0",
              }}
            >
              — {s.sub}
            </p>

            {/* ── Divider ── */}
            <div
              style={{
                width: "60px",
                height: "3px",
                borderRadius: "2px",
                background: "#16a34a",
                margin: "0 auto 24px",
              }}
            />

            {/* ── Description ── */}
            <p
              style={{
                fontFamily: "DM Sans, sans-serif",
                fontSize: "clamp(14px, 1.8vw, 16px)",
                lineHeight: 1.7,
                color: "#475569",
                maxWidth: "560px",
                margin: "0 auto 36px",
              }}
            >
              {s.desc}
            </p>

            {/* ── Buttons ── */}
            <div
              className="hero-btns"
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "12px",
                marginBottom: "48px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Link
                to={s.cta.to}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "14px 28px",
                  borderRadius: "12px",
                  background: "#16a34a",
                  color: "white",
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: "clamp(13px, 1.5vw, 15px)",
                  fontWeight: "600",
                  textDecoration: "none",
                  transition: "all 0.2s",
                  boxShadow: "0 4px 16px rgba(22,163,74,0.3)",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#15803d";
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 24px rgba(22,163,74,0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#16a34a";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 16px rgba(22,163,74,0.3)";
                }}
              >
                {s.cta.label}
                <svg
                  style={{ width: "16px", height: "16px" }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>

              <Link
                to={s.ghost.to}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "14px 28px",
                  borderRadius: "12px",
                  border: "1px solid #e2e8f0",
                  color: "#334155",
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: "clamp(13px, 1.5vw, 15px)",
                  fontWeight: "500",
                  textDecoration: "none",
                  transition: "all 0.2s",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#16a34a";
                  e.currentTarget.style.color = "#16a34a";
                  e.currentTarget.style.background = "#f0fdf4";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#e2e8f0";
                  e.currentTarget.style.color = "#334155";
                  e.currentTarget.style.background = "transparent";
                }}
              >
                {s.ghost.label}
              </Link>
            </div>

            {/* ── Stats ── */}
            <div
              className="hero-stats"
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "clamp(20px, 4vw, 48px)",
                justifyContent: "center",
                alignItems: "center",
                padding: "24px 20px",
                borderRadius: "16px",
                background: "rgba(22,163,74,0.04)",
                border: "1px solid #bbf7d0",
                maxWidth: "500px",
                margin: "0 auto",
              }}
            >
              {[
                { n: "500+", l: "Products" },
                { n: "10K+", l: "Customers" },
                { n: "100%", l: "Authentic" },
                { n: "4.9★", l: "Rating" },
              ].map((stat, i) => (
                <div
                  key={stat.l}
                  style={{ textAlign: "center", position: "relative" }}
                >
                  {i > 0 && (
                    <div
                      style={{
                        position: "absolute",
                        left: "calc(-1 * clamp(10px, 2vw, 24px))",
                        top: "50%",
                        transform: "translateY(-50%)",
                        width: "1px",
                        height: "32px",
                        background: "#bbf7d0",
                      }}
                    />
                  )}
                  <p
                    style={{
                      fontFamily: "Cormorant Garamond, serif",
                      fontWeight: "600",
                      fontSize: "clamp(22px, 3vw, 28px)",
                      color: "#16a34a",
                      margin: 0,
                      lineHeight: 1,
                    }}
                  >
                    {stat.n}
                  </p>
                  <p
                    style={{
                      fontFamily: "DM Sans, sans-serif",
                      fontSize: "10px",
                      color: "#94a3b8",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      margin: "4px 0 0 0",
                    }}
                  >
                    {stat.l}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Slide Dots ── */}
        <div
          style={{
            position: "absolute",
            bottom: "32px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: "8px",
          }}
        >
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setIdx(i);
                setVisible(true);
              }}
              style={{
                borderRadius: "4px",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s",
                width: i === idx ? "24px" : "8px",
                height: "8px",
                background: i === idx ? "#16a34a" : "#bbf7d0",
                padding: 0,
              }}
            />
          ))}
        </div>
      </section>

      {/* ── Responsive Styles ── */}
      <style>{`

        /* Mobile: reduce padding + text */
        @media (max-width: 640px) {
          .hero-content {
            padding: 0 8px;
          }
          .hero-btns {
            flex-direction: column !important;
            align-items: center !important;
          }
          .hero-btns a {
            width: 100% !important;
            justify-content: center !important;
            max-width: 320px;
          }
          .hero-stats {
            gap: 16px !important;
            padding: 16px !important;
          }
        }

        /* Tablet */
        @media (min-width: 641px) and (max-width: 1023px) {
          .hero-btns {
            flex-direction: row !important;
            justify-content: center !important;
          }
        }

        /* Desktop */
        @media (min-width: 1024px) {
          .hero-content {
            text-align: center !important;
          }
        }
      `}</style>
    </>
  );
};

export default HeroBanner;
