// import { useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";

// const icons = {
//   "quran-and-books": "📖",
//   tasbih: "📿",
//   "prayer-items": "🧎",
//   "islamic-decor": "🕌",
//   "attar-fragrances": "🧴",
//   "gift-sets": "🎁",
// };

// const CategoryGrid = () => {
//   const { categories } = useSelector((s) => s.products);

//   return (
//     <section className="py-20 px-4">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-10">
//           <p
//             className="font-dm text-xs font-semibold tracking-widest uppercase mb-2"
//             style={{ color: "#16a34a" }}
//           >
//             Browse
//           </p>
//           <h2
//             className="font-cormorant text-4xl font-semibold"
//             style={{ color: "#e2e8f0" }}
//           >
//             Shop by Category
//           </h2>
//         </div>

//         {/* Grid */}
//         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
//           {categories.length > 0
//             ? categories.map((cat) => (
//                 <Link
//                   key={cat._id}
//                   to={`/products/category/${cat.slug}`}
//                   className="group flex flex-col items-center gap-3 p-5 rounded-2xl transition-all duration-300"
//                   style={{
//                     background: "#162032",
//                     border: "1px solid rgba(255,255,255,0.05)",
//                   }}
//                   onMouseEnter={(e) => {
//                     e.currentTarget.style.borderColor = "rgba(22,163,74,0.35)";
//                     e.currentTarget.style.background = "rgba(22,163,74,0.07)";
//                     e.currentTarget.style.transform = "translateY(-4px)";
//                   }}
//                   onMouseLeave={(e) => {
//                     e.currentTarget.style.borderColor =
//                       "rgba(255,255,255,0.05)";
//                     e.currentTarget.style.background = "#162032";
//                     e.currentTarget.style.transform = "translateY(0)";
//                   }}
//                 >
//                   <span className="text-3xl group-hover:scale-110 transition-transform duration-300">
//                     {icons[cat.slug] || "🌙"}
//                   </span>
//                   <div className="text-center">
//                     <p
//                       className="font-dm text-xs font-medium group-hover:text-g-400 transition-colors"
//                       style={{ color: "#cbd5e1" }}
//                     >
//                       {cat.name}
//                     </p>
//                     {cat.nameArabic && (
//                       <p
//                         className="font-arabic text-xs mt-0.5"
//                         style={{ color: "#475569" }}
//                       >
//                         {cat.nameArabic}
//                       </p>
//                     )}
//                   </div>
//                 </Link>
//               ))
//             : Array(6)
//                 .fill(0)
//                 .map((_, i) => (
//                   <div key={i} className="rounded-2xl p-5 shimmer h-28" />
//                 ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default CategoryGrid;

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const icons = {
  "quran-and-books": "📖",
  tasbih: "📿",
  "prayer-items": "🧎",
  "islamic-decor": "🕌",
  "attar-fragrances": "🧴",
  "gift-sets": "🎁",
};

const CategoryGrid = () => {
  const { categories } = useSelector((s) => s.products);

  return (
    <section style={{ background: "#ffffff", padding: "80px 24px" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: "40px" }}>
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
            Browse
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
            Shop by Category
          </h2>
        </div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
            gap: "16px",
          }}
        >
          {categories.length > 0
            ? categories.map((cat) => (
                <Link
                  key={cat._id}
                  to={`/products/category/${cat.slug}`}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "12px",
                    padding: "24px 16px",
                    borderRadius: "16px",
                    background: "#ffffff",
                    border: "1px solid #e2e8f0",
                    textDecoration: "none",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#16a34a";
                    e.currentTarget.style.background = "#f0fdf4";
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 24px rgba(22,163,74,0.12)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#e2e8f0";
                    e.currentTarget.style.background = "#ffffff";
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <span style={{ fontSize: "36px" }}>
                    {icons[cat.slug] || "🌙"}
                  </span>
                  <div style={{ textAlign: "center" }}>
                    <p
                      style={{
                        fontFamily: "DM Sans",
                        fontSize: "13px",
                        fontWeight: "600",
                        color: "#0f172a",
                        margin: 0,
                      }}
                    >
                      {cat.name}
                    </p>
                    {cat.nameArabic && (
                      <p
                        style={{
                          fontFamily: "Amiri",
                          fontSize: "12px",
                          color: "#94a3b8",
                          margin: "2px 0 0",
                        }}
                      >
                        {cat.nameArabic}
                      </p>
                    )}
                  </div>
                </Link>
              ))
            : Array(6)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className="shimmer"
                    style={{ borderRadius: "16px", height: "120px" }}
                  />
                ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
