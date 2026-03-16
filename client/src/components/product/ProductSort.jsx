// const sortOptions = [
//   { label: "Latest", value: "-createdAt" },
//   { label: "Price: Low", value: "price" },
//   { label: "Price: High", value: "-price" },
//   { label: "Top Rated", value: "-ratings" },
//   { label: "Most Popular", value: "-sold" },
// ];

// const ProductSort = ({ sortBy, setParam }) => (
//   <div className="flex items-center gap-2 ml-auto">
//     <span className="font-dm text-xs shrink-0" style={{ color: "#475569" }}>
//       Sort by
//     </span>
//     <select
//       value={sortBy}
//       onChange={(e) => setParam("sort", e.target.value)}
//       className="font-dm text-xs rounded-xl px-3 py-2 outline-none cursor-pointer"
//       style={{
//         background: "rgba(255,255,255,0.04)",
//         border: "1px solid rgba(255,255,255,0.06)",
//         color: "#94a3b8",
//       }}
//     >
//       {sortOptions.map((o) => (
//         <option
//           key={o.value}
//           value={o.value}
//           style={{ background: "#162032", color: "#e2e8f0" }}
//         >
//           {o.label}
//         </option>
//       ))}
//     </select>
//   </div>
// );

// export default ProductSort;

const sortOptions = [
  { label: "Latest", value: "-createdAt" },
  { label: "Price: Low", value: "price" },
  { label: "Price: High", value: "-price" },
  { label: "Top Rated", value: "-ratings" },
  { label: "Most Popular", value: "-sold" },
];

const ProductSort = ({ sortBy, setParam }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "8px",
      marginLeft: "auto",
    }}
  >
    <span
      style={{
        fontFamily: "DM Sans, sans-serif",
        fontSize: "13px",
        color: "#64748b",
        whiteSpace: "nowrap",
        flexShrink: 0,
      }}
    >
      Sort by
    </span>
    <select
      value={sortBy}
      onChange={(e) => setParam("sort", e.target.value)}
      style={{
        background: "#ffffff",
        border: "1px solid #e2e8f0",
        borderRadius: "10px",
        padding: "8px 12px",
        fontFamily: "DM Sans, sans-serif",
        fontSize: "13px",
        color: "#0f172a",
        outline: "none",
        cursor: "pointer",
        transition: "border-color 0.2s",
      }}
      onFocus={(e) => (e.currentTarget.style.borderColor = "#16a34a")}
      onBlur={(e) => (e.currentTarget.style.borderColor = "#e2e8f0")}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#bbf7d0")}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#e2e8f0")}
    >
      {sortOptions.map((o) => (
        <option
          key={o.value}
          value={o.value}
          style={{ background: "#ffffff", color: "#0f172a" }}
        >
          {o.label}
        </option>
      ))}
    </select>
  </div>
);

export default ProductSort;
