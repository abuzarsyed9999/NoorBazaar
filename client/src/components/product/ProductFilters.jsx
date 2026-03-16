// import { useState } from "react";
// import { useSelector } from "react-redux";

// const ProductFilters = ({ setParam, minPrice, maxPrice, searchParams }) => {
//   const { categories } = useSelector((s) => s.products);
//   const [min, setMin] = useState(minPrice || "");
//   const [max, setMax] = useState(maxPrice || "");

//   const activeCategory = searchParams.get("category") || "";

//   const applyPrice = () => {
//     setParam("minPrice", min);
//     setParam("maxPrice", max);
//   };

//   const clearAll = () => {
//     setParam("category", "");
//     setParam("minPrice", "");
//     setParam("maxPrice", "");
//     setMin("");
//     setMax("");
//   };

//   const Section = ({ title, children }) => (
//     <div className="mb-6">
//       <p
//         className="font-dm text-[10px] font-semibold uppercase tracking-widest mb-3"
//         style={{ color: "#475569" }}
//       >
//         {title}
//       </p>
//       {children}
//     </div>
//   );

//   return (
//     <div>
//       {/* Header */}
//       <div className="flex items-center justify-between mb-6">
//         <p
//           className="font-dm font-semibold text-sm"
//           style={{ color: "#e2e8f0" }}
//         >
//           Filters
//         </p>
//         <button
//           onClick={clearAll}
//           className="font-dm text-xs transition-colors"
//           style={{ color: "#475569" }}
//           onMouseEnter={(e) => (e.currentTarget.style.color = "#4ade80")}
//           onMouseLeave={(e) => (e.currentTarget.style.color = "#475569")}
//         >
//           Clear all
//         </button>
//       </div>

//       {/* Categories */}
//       <Section title="Category">
//         <div className="space-y-1">
//           <button
//             onClick={() => setParam("category", "")}
//             className="w-full text-left px-3 py-2.5 rounded-xl font-dm text-xs transition-all"
//             style={{
//               background: !activeCategory
//                 ? "rgba(22,163,74,0.12)"
//                 : "transparent",
//               color: !activeCategory ? "#4ade80" : "#64748b",
//               border: !activeCategory
//                 ? "1px solid rgba(22,163,74,0.2)"
//                 : "1px solid transparent",
//             }}
//           >
//             All Categories
//           </button>
//           {categories.map((cat) => (
//             <button
//               key={cat._id}
//               onClick={() => setParam("category", cat.slug)}
//               className="w-full text-left px-3 py-2.5 rounded-xl font-dm text-xs transition-all"
//               style={{
//                 background:
//                   activeCategory === cat.slug
//                     ? "rgba(22,163,74,0.12)"
//                     : "transparent",
//                 color: activeCategory === cat.slug ? "#4ade80" : "#64748b",
//                 border:
//                   activeCategory === cat.slug
//                     ? "1px solid rgba(22,163,74,0.2)"
//                     : "1px solid transparent",
//               }}
//             >
//               {cat.name}
//             </button>
//           ))}
//         </div>
//       </Section>

//       {/* Price Range */}
//       <Section title="Price Range">
//         <div className="space-y-2">
//           <div className="flex gap-2">
//             <input
//               type="number"
//               placeholder="Min ₹"
//               value={min}
//               onChange={(e) => setMin(e.target.value)}
//               className="nb-input text-xs"
//               style={{ padding: "8px 12px" }}
//             />
//             <input
//               type="number"
//               placeholder="Max ₹"
//               value={max}
//               onChange={(e) => setMax(e.target.value)}
//               className="nb-input text-xs"
//               style={{ padding: "8px 12px" }}
//             />
//           </div>
//           <button
//             onClick={applyPrice}
//             className="w-full py-2.5 rounded-xl font-dm text-xs font-semibold text-white transition-opacity"
//             style={{ background: "#16a34a" }}
//             onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
//             onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
//           >
//             Apply Price
//           </button>
//         </div>

//         {/* Quick Price Ranges */}
//         <div className="mt-3 space-y-1">
//           {[
//             { label: "Under ₹500", min: "", max: "500" },
//             { label: "₹500 – ₹1000", min: "500", max: "1000" },
//             { label: "₹1000 – ₹2000", min: "1000", max: "2000" },
//             { label: "Above ₹2000", min: "2000", max: "" },
//           ].map((r) => (
//             <button
//               key={r.label}
//               onClick={() => {
//                 setMin(r.min);
//                 setMax(r.max);
//                 setParam("minPrice", r.min);
//                 setParam("maxPrice", r.max);
//               }}
//               className="w-full text-left px-3 py-2 rounded-lg font-dm text-xs transition-colors"
//               style={{ color: "#64748b" }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.color = "#4ade80";
//                 e.currentTarget.style.background = "rgba(22,163,74,0.06)";
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.color = "#64748b";
//                 e.currentTarget.style.background = "transparent";
//               }}
//             >
//               {r.label}
//             </button>
//           ))}
//         </div>
//       </Section>

//       {/* Availability */}
//       <Section title="Availability">
//         <div className="space-y-1">
//           {[
//             { label: "In Stock", value: "inStock" },
//             { label: "New Arrivals", value: "isNewArrival=true" },
//             { label: "Bestsellers", value: "isBestseller=true" },
//             { label: "On Sale", value: "onSale" },
//           ].map((opt) => (
//             <label
//               key={opt.value}
//               className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-colors"
//               style={{ color: "#64748b" }}
//               onMouseEnter={(e) => (e.currentTarget.style.color = "#e2e8f0")}
//               onMouseLeave={(e) => (e.currentTarget.style.color = "#64748b")}
//             >
//               <div
//                 className="w-4 h-4 rounded flex items-center justify-center shrink-0"
//                 style={{
//                   background: "rgba(255,255,255,0.05)",
//                   border: "1px solid rgba(255,255,255,0.1)",
//                 }}
//               />
//               <span className="font-dm text-xs">{opt.label}</span>
//             </label>
//           ))}
//         </div>
//       </Section>
//     </div>
//   );
// };

// export default ProductFilters;

import { useState } from "react";
import { useSelector } from "react-redux";

const ProductFilters = ({ setParam, minPrice, maxPrice, searchParams }) => {
  const { categories } = useSelector((s) => s.products);
  const [min, setMin] = useState(minPrice || "");
  const [max, setMax] = useState(maxPrice || "");
  const activeCategory = searchParams.get("category") || "";

  const applyPrice = () => {
    setParam("minPrice", min);
    setParam("maxPrice", max);
  };

  const clearAll = () => {
    setParam("category", "");
    setParam("minPrice", "");
    setParam("maxPrice", "");
    setMin("");
    setMax("");
  };

  const Section = ({ title, children }) => (
    <div style={{ marginBottom: "24px" }}>
      <p
        style={{
          fontFamily: "DM Sans, sans-serif",
          fontSize: "10px",
          fontWeight: "700",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          color: "#94a3b8",
          margin: "0 0 10px 0",
        }}
      >
        {title}
      </p>
      {children}
    </div>
  );

  return (
    <div style={{ width: "100%" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <p
          style={{
            fontFamily: "DM Sans, sans-serif",
            fontSize: "14px",
            fontWeight: "700",
            color: "#0f172a",
            margin: 0,
          }}
        >
          Filters
        </p>
        <button
          onClick={clearAll}
          style={{
            fontFamily: "DM Sans, sans-serif",
            fontSize: "12px",
            color: "#94a3b8",
            background: "none",
            border: "none",
            cursor: "pointer",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#16a34a")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#94a3b8")}
        >
          Clear all
        </button>
      </div>

      {/* Categories */}
      <Section title="Category">
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <button
            onClick={() => setParam("category", "")}
            style={{
              width: "100%",
              textAlign: "left",
              padding: "9px 12px",
              borderRadius: "10px",
              fontFamily: "DM Sans, sans-serif",
              fontSize: "13px",
              cursor: "pointer",
              transition: "all 0.2s",
              background: !activeCategory ? "#f0fdf4" : "transparent",
              color: !activeCategory ? "#15803d" : "#64748b",
              border: !activeCategory
                ? "1px solid #bbf7d0"
                : "1px solid transparent",
              fontWeight: !activeCategory ? "600" : "400",
            }}
          >
            All Categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat._id}
              onClick={() => setParam("category", cat.slug)}
              style={{
                width: "100%",
                textAlign: "left",
                padding: "9px 12px",
                borderRadius: "10px",
                fontFamily: "DM Sans, sans-serif",
                fontSize: "13px",
                cursor: "pointer",
                transition: "all 0.2s",
                background:
                  activeCategory === cat.slug ? "#f0fdf4" : "transparent",
                color: activeCategory === cat.slug ? "#15803d" : "#64748b",
                border:
                  activeCategory === cat.slug
                    ? "1px solid #bbf7d0"
                    : "1px solid transparent",
                fontWeight: activeCategory === cat.slug ? "600" : "400",
              }}
              onMouseEnter={(e) => {
                if (activeCategory !== cat.slug) {
                  e.currentTarget.style.background = "#f8fafc";
                  e.currentTarget.style.color = "#0f172a";
                }
              }}
              onMouseLeave={(e) => {
                if (activeCategory !== cat.slug) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#64748b";
                }
              }}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </Section>

      {/* Price Range */}
      <Section title="Price Range">
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <div style={{ display: "flex", gap: "8px" }}>
            <input
              type="number"
              placeholder="Min ₹"
              value={min}
              onChange={(e) => setMin(e.target.value)}
              style={{
                flex: 1,
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                padding: "8px 10px",
                fontFamily: "DM Sans, sans-serif",
                fontSize: "12px",
                color: "#0f172a",
                outline: "none",
                minWidth: 0,
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#16a34a")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#e2e8f0")}
            />
            <input
              type="number"
              placeholder="Max ₹"
              value={max}
              onChange={(e) => setMax(e.target.value)}
              style={{
                flex: 1,
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                padding: "8px 10px",
                fontFamily: "DM Sans, sans-serif",
                fontSize: "12px",
                color: "#0f172a",
                outline: "none",
                minWidth: 0,
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#16a34a")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#e2e8f0")}
            />
          </div>
          <button
            onClick={applyPrice}
            style={{
              width: "100%",
              padding: "9px",
              borderRadius: "8px",
              background: "#16a34a",
              color: "white",
              fontFamily: "DM Sans, sans-serif",
              fontSize: "12px",
              fontWeight: "600",
              border: "none",
              cursor: "pointer",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#15803d")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#16a34a")}
          >
            Apply Price
          </button>
        </div>

        {/* Quick Price Ranges */}
        <div
          style={{
            marginTop: "10px",
            display: "flex",
            flexDirection: "column",
            gap: "2px",
          }}
        >
          {[
            { label: "Under ₹500", min: "", max: "500" },
            { label: "₹500 – ₹1000", min: "500", max: "1000" },
            { label: "₹1000 – ₹2000", min: "1000", max: "2000" },
            { label: "Above ₹2000", min: "2000", max: "" },
          ].map((r) => (
            <button
              key={r.label}
              onClick={() => {
                setMin(r.min);
                setMax(r.max);
                setParam("minPrice", r.min);
                setParam("maxPrice", r.max);
              }}
              style={{
                width: "100%",
                textAlign: "left",
                padding: "7px 10px",
                borderRadius: "8px",
                fontFamily: "DM Sans, sans-serif",
                fontSize: "12px",
                color: "#64748b",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#f0fdf4";
                e.currentTarget.style.color = "#16a34a";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#64748b";
              }}
            >
              {r.label}
            </button>
          ))}
        </div>
      </Section>

      {/* Availability */}
      <Section title="Availability">
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          {[
            { label: "In Stock", value: "inStock" },
            { label: "New Arrivals", value: "isNewArrival=true" },
            { label: "Bestsellers", value: "isBestseller=true" },
            { label: "On Sale", value: "onSale" },
          ].map((opt) => (
            <label
              key={opt.value}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "8px 10px",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#f8fafc")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              <div
                style={{
                  width: "16px",
                  height: "16px",
                  borderRadius: "4px",
                  background: "#f0fdf4",
                  border: "1px solid #bbf7d0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: "13px",
                  color: "#64748b",
                }}
              >
                {opt.label}
              </span>
            </label>
          ))}
        </div>
      </Section>
    </div>
  );
};

export default ProductFilters;
