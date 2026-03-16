// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useSearchParams, useParams } from "react-router-dom";
// import { fetchProducts, fetchCategories } from "../redux/slices/productSlice";
// import ProductCard from "../components/product/ProductCard";
// import ProductFilters from "../components/product/ProductFilters";
// import ProductSort from "../components/product/ProductSort";

// const ProductListingPage = () => {
//   const dispatch = useDispatch();
//   const [searchParams, setSearchParams] = useSearchParams();
//   const [filtersOpen, setFiltersOpen] = useState(false);
//   const { slug } = useParams();

//   const { products, total, pagination, loading } = useSelector(
//     (s) => s.products,
//   );

//   // ── Build query ──
//   const buildQuery = () => {
//     const params = [];
//     if (slug) params.push(`category=${slug}`);
//     if (searchParams.get("keyword"))
//       params.push(`keyword=${searchParams.get("keyword")}`);
//     if (searchParams.get("sort"))
//       params.push(`sort=${searchParams.get("sort")}`);
//     if (searchParams.get("page"))
//       params.push(`page=${searchParams.get("page")}`);
//     if (searchParams.get("minPrice"))
//       params.push(`price[gte]=${searchParams.get("minPrice")}`);
//     if (searchParams.get("maxPrice"))
//       params.push(`price[lte]=${searchParams.get("maxPrice")}`);
//     return params.length ? `?${params.join("&")}` : "";
//   };

//   useEffect(() => {
//     dispatch(fetchProducts(buildQuery()));
//     dispatch(fetchCategories());
//     window.scrollTo(0, 0);
//   }, [searchParams, slug]);

//   const setParam = (key, value) => {
//     const p = new URLSearchParams(searchParams);
//     if (value) p.set(key, value);
//     else p.delete(key);
//     if (key !== "page") p.delete("page");
//     setSearchParams(p);
//   };

//   const keyword = searchParams.get("keyword") || "";
//   const sortBy = searchParams.get("sort") || "";
//   const page = Number(searchParams.get("page")) || 1;
//   const minPrice = searchParams.get("minPrice") || "";
//   const maxPrice = searchParams.get("maxPrice") || "";

//   return (
//     <div style={{ background: "#ffffff", minHeight: "100vh" }}>
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
//         {/* ── Header ── */}
//         <div className="mb-8">
//           <p
//             className="font-dm text-xs font-semibold tracking-widest uppercase mb-1"
//             style={{ color: "#16a34a" }}
//           >
//             {slug
//               ? slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
//               : keyword
//                 ? `Search: "${keyword}"`
//                 : "All Products"}
//           </p>
//           <div className="flex items-center justify-between">
//             <h1
//               className="font-cormorant text-3xl font-semibold"
//               style={{ color: "#e2e8f0" }}
//             >
//               {slug
//                 ? slug
//                     .replace(/-/g, " ")
//                     .replace(/\b\w/g, (l) => l.toUpperCase())
//                 : keyword
//                   ? `Results for "${keyword}"`
//                   : "Islamic Products"}
//             </h1>
//             <span className="font-dm text-sm" style={{ color: "#475569" }}>
//               {loading ? "Loading..." : `${total} products`}
//             </span>
//           </div>
//         </div>

//         <div className="flex gap-6">
//           {/* ── Sidebar Filters ── */}
//           <aside className="hidden lg:block w-60 shrink-0">
//             <ProductFilters
//               setParam={setParam}
//               minPrice={minPrice}
//               maxPrice={maxPrice}
//               searchParams={searchParams}
//               activeSlug={slug}
//             />
//           </aside>

//           {/* ── Main ── */}
//           <div className="flex-1 min-w-0">
//             {/* Sort + Filter Toggle */}
//             <div
//               className="flex items-center justify-between mb-5 pb-4"
//               style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
//             >
//               <button
//                 onClick={() => setFiltersOpen(true)}
//                 className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-xl font-dm text-sm"
//                 style={{
//                   background: "rgba(255,255,255,0.04)",
//                   border: "1px solid rgba(255,255,255,0.06)",
//                   color: "#94a3b8",
//                 }}
//               >
//                 <svg
//                   className="w-4 h-4"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
//                   />
//                 </svg>
//                 Filters
//               </button>
//               <ProductSort sortBy={sortBy} setParam={setParam} />
//             </div>

//             {/* Products Grid */}
//             {loading ? (
//               <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
//                 {Array(12)
//                   .fill(0)
//                   .map((_, i) => (
//                     <div
//                       key={i}
//                       className="rounded-2xl overflow-hidden"
//                       style={{ background: "#162032" }}
//                     >
//                       <div className="aspect-square shimmer" />
//                       <div className="p-4 space-y-2">
//                         <div className="h-2.5 shimmer rounded w-1/3" />
//                         <div className="h-4 shimmer rounded" />
//                         <div className="h-3 shimmer rounded w-2/3" />
//                         <div className="h-5 shimmer rounded w-1/4" />
//                       </div>
//                     </div>
//                   ))}
//               </div>
//             ) : products.length === 0 ? (
//               <div className="text-center py-20">
//                 <div className="text-6xl mb-4">🔍</div>
//                 <h3
//                   className="font-cormorant text-2xl font-semibold mb-2"
//                   style={{ color: "#e2e8f0" }}
//                 >
//                   No Products Found
//                 </h3>
//                 <p className="font-dm text-sm" style={{ color: "#475569" }}>
//                   Try adjusting your filters or search query
//                 </p>
//               </div>
//             ) : (
//               <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
//                 {products.map((p) => (
//                   <ProductCard key={p._id} product={p} />
//                 ))}
//               </div>
//             )}

//             {/* Pagination */}
//             {!loading && pagination?.totalPages > 1 && (
//               <div className="flex items-center justify-center gap-2 mt-10">
//                 <button
//                   disabled={page <= 1}
//                   onClick={() => setParam("page", page - 1)}
//                   className="w-9 h-9 rounded-xl flex items-center justify-center font-dm text-sm transition-all disabled:opacity-30"
//                   style={{
//                     background: "rgba(255,255,255,0.04)",
//                     border: "1px solid rgba(255,255,255,0.06)",
//                     color: "#94a3b8",
//                   }}
//                 >
//                   ←
//                 </button>
//                 {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
//                   .filter(
//                     (n) =>
//                       n === 1 ||
//                       n === pagination.totalPages ||
//                       Math.abs(n - page) <= 1,
//                   )
//                   .map((n, idx, arr) => (
//                     <span key={n} className="flex items-center gap-2">
//                       {idx > 0 && arr[idx - 1] !== n - 1 && (
//                         <span style={{ color: "#334155" }}>…</span>
//                       )}
//                       <button
//                         onClick={() => setParam("page", n)}
//                         className="w-9 h-9 rounded-xl flex items-center justify-center font-dm text-sm transition-all"
//                         style={{
//                           background:
//                             page === n ? "#16a34a" : "rgba(255,255,255,0.04)",
//                           border:
//                             page === n
//                               ? "none"
//                               : "1px solid rgba(255,255,255,0.06)",
//                           color: page === n ? "white" : "#94a3b8",
//                         }}
//                       >
//                         {n}
//                       </button>
//                     </span>
//                   ))}
//                 <button
//                   disabled={page >= pagination.totalPages}
//                   onClick={() => setParam("page", page + 1)}
//                   className="w-9 h-9 rounded-xl flex items-center justify-center font-dm text-sm transition-all disabled:opacity-30"
//                   style={{
//                     background: "rgba(255,255,255,0.04)",
//                     border: "1px solid rgba(255,255,255,0.06)",
//                     color: "#94a3b8",
//                   }}
//                 >
//                   →
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* ── Mobile Filter Drawer ── */}
//       {filtersOpen && (
//         <div className="fixed inset-0 z-50 lg:hidden">
//           <div
//             className="absolute inset-0"
//             style={{ background: "rgba(0,0,0,0.6)" }}
//             onClick={() => setFiltersOpen(false)}
//           />
//           <div
//             className="absolute left-0 top-0 bottom-0 w-72 overflow-y-auto animate-fade-in"
//             style={{ background: "#162032" }}
//           >
//             <div
//               className="flex items-center justify-between p-4"
//               style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
//             >
//               <p
//                 className="font-dm font-semibold text-sm"
//                 style={{ color: "#e2e8f0" }}
//               >
//                 Filters
//               </p>
//               <button
//                 onClick={() => setFiltersOpen(false)}
//                 className="w-8 h-8 rounded-lg flex items-center justify-center"
//                 style={{ color: "#94a3b8" }}
//               >
//                 ✕
//               </button>
//             </div>
//             <div className="p-4">
//               <ProductFilters
//                 setParam={setParam}
//                 minPrice={minPrice}
//                 maxPrice={maxPrice}
//                 searchParams={searchParams}
//                 activeSlug={slug}
//               />
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductListingPage;

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useParams } from "react-router-dom";
import { fetchProducts, fetchCategories } from "../redux/slices/productSlice";
import ProductCard from "../components/product/ProductCard";
import ProductFilters from "../components/product/ProductFilters";
import ProductSort from "../components/product/ProductSort";

const ProductListingPage = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const { slug } = useParams();

  const { products, total, pagination, loading } = useSelector(
    (s) => s.products,
  );

  const buildQuery = () => {
    const params = [];
    if (slug) params.push(`category=${slug}`);
    if (searchParams.get("keyword"))
      params.push(`keyword=${searchParams.get("keyword")}`);
    if (searchParams.get("sort"))
      params.push(`sort=${searchParams.get("sort")}`);
    if (searchParams.get("page"))
      params.push(`page=${searchParams.get("page")}`);
    if (searchParams.get("minPrice"))
      params.push(`price[gte]=${searchParams.get("minPrice")}`);
    if (searchParams.get("maxPrice"))
      params.push(`price[lte]=${searchParams.get("maxPrice")}`);
    return params.length ? `?${params.join("&")}` : "";
  };

  useEffect(() => {
    dispatch(fetchProducts(buildQuery()));
    dispatch(fetchCategories());
    window.scrollTo(0, 0);
  }, [searchParams, slug]);

  const setParam = (key, value) => {
    const p = new URLSearchParams(searchParams);
    if (value) p.set(key, value);
    else p.delete(key);
    if (key !== "page") p.delete("page");
    setSearchParams(p);
  };

  const keyword = searchParams.get("keyword") || "";
  const sortBy = searchParams.get("sort") || "";
  const page = Number(searchParams.get("page")) || 1;
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";

  const pageTitle = slug
    ? slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
    : keyword
      ? `Results for "${keyword}"`
      : "Islamic Products";

  return (
    <>
      <div style={{ background: "#ffffff", minHeight: "100vh", width: "100%" }}>
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "clamp(16px,4vw,40px) 24px",
          }}
        >
          {/* Header */}
          <div style={{ marginBottom: "32px" }}>
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
              {slug
                ? slug
                    .replace(/-/g, " ")
                    .replace(/\b\w/g, (l) => l.toUpperCase())
                : keyword
                  ? `Search: "${keyword}"`
                  : "All Products"}
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "8px",
              }}
            >
              <h1
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontSize: "clamp(24px,4vw,36px)",
                  fontWeight: "600",
                  color: "#0f172a",
                  margin: 0,
                }}
              >
                {pageTitle}
              </h1>
              <span
                style={{
                  fontFamily: "DM Sans",
                  fontSize: "13px",
                  color: "#94a3b8",
                }}
              >
                {loading ? "Loading..." : `${total} products`}
              </span>
            </div>
          </div>

          <div style={{ display: "flex", gap: "24px" }}>
            {/* Sidebar Filters — Desktop */}
            <aside
              className="plp-sidebar"
              style={{ width: "240px", flexShrink: 0 }}
            >
              <div
                style={{
                  padding: "20px",
                  borderRadius: "16px",
                  background: "#ffffff",
                  border: "1px solid #e2e8f0",
                  position: "sticky",
                  top: "96px",
                }}
              >
                <ProductFilters
                  setParam={setParam}
                  minPrice={minPrice}
                  maxPrice={maxPrice}
                  searchParams={searchParams}
                  activeSlug={slug}
                />
              </div>
            </aside>

            {/* Main Content */}
            <div style={{ flex: 1, minWidth: 0 }}>
              {/* Sort + Filter toggle */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "20px",
                  paddingBottom: "16px",
                  borderBottom: "1px solid #f0fdf4",
                }}
              >
                <button
                  onClick={() => setFiltersOpen(true)}
                  className="plp-filter-btn"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "8px 14px",
                    borderRadius: "10px",
                    fontFamily: "DM Sans",
                    fontSize: "13px",
                    fontWeight: "500",
                    background: "#f0fdf4",
                    border: "1px solid #bbf7d0",
                    color: "#15803d",
                    cursor: "pointer",
                  }}
                >
                  <svg
                    style={{ width: "14px", height: "14px" }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                    />
                  </svg>
                  Filters
                </button>
                <ProductSort sortBy={sortBy} setParam={setParam} />
              </div>

              {/* Products Grid */}
              {loading ? (
                <div className="plp-grid">
                  {Array(12)
                    .fill(0)
                    .map((_, i) => (
                      <div
                        key={i}
                        style={{
                          borderRadius: "16px",
                          overflow: "hidden",
                          background: "#ffffff",
                          border: "1px solid #e2e8f0",
                        }}
                      >
                        <div
                          style={{
                            aspectRatio: "1",
                            background:
                              "linear-gradient(90deg,#f0fdf4 25%,#dcfce7 50%,#f0fdf4 75%)",
                            backgroundSize: "200% 100%",
                            animation: "shimmer 1.5s infinite",
                          }}
                        />
                        <div style={{ padding: "14px" }}>
                          <div
                            style={{
                              height: "10px",
                              borderRadius: "4px",
                              marginBottom: "8px",
                              width: "40%",
                              background: "#f0fdf4",
                            }}
                          />
                          <div
                            style={{
                              height: "14px",
                              borderRadius: "4px",
                              marginBottom: "6px",
                              background: "#f0fdf4",
                            }}
                          />
                          <div
                            style={{
                              height: "20px",
                              borderRadius: "4px",
                              width: "30%",
                              background: "#f0fdf4",
                            }}
                          />
                        </div>
                      </div>
                    ))}
                </div>
              ) : products.length === 0 ? (
                <div style={{ textAlign: "center", padding: "80px 24px" }}>
                  <div style={{ fontSize: "56px", marginBottom: "16px" }}>
                    🔍
                  </div>
                  <h3
                    style={{
                      fontFamily: "Cormorant Garamond, serif",
                      fontSize: "24px",
                      fontWeight: "600",
                      color: "#0f172a",
                      margin: "0 0 8px 0",
                    }}
                  >
                    No Products Found
                  </h3>
                  <p
                    style={{
                      fontFamily: "DM Sans",
                      fontSize: "14px",
                      color: "#64748b",
                      margin: 0,
                    }}
                  >
                    Try adjusting your filters or search query
                  </p>
                </div>
              ) : (
                <div className="plp-grid">
                  {products.map((p) => (
                    <ProductCard key={p._id} product={p} />
                  ))}
                </div>
              )}

              {/* Pagination */}
              {!loading && pagination?.totalPages > 1 && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                    marginTop: "40px",
                    flexWrap: "wrap",
                  }}
                >
                  <button
                    disabled={page <= 1}
                    onClick={() => setParam("page", page - 1)}
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "DM Sans",
                      fontSize: "14px",
                      background: "#ffffff",
                      border: "1px solid #e2e8f0",
                      color: "#64748b",
                      cursor: page <= 1 ? "not-allowed" : "pointer",
                      opacity: page <= 1 ? 0.4 : 1,
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      if (page > 1) {
                        e.currentTarget.style.borderColor = "#16a34a";
                        e.currentTarget.style.color = "#16a34a";
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "#e2e8f0";
                      e.currentTarget.style.color = "#64748b";
                    }}
                  >
                    ←
                  </button>

                  {Array.from(
                    { length: pagination.totalPages },
                    (_, i) => i + 1,
                  )
                    .filter(
                      (n) =>
                        n === 1 ||
                        n === pagination.totalPages ||
                        Math.abs(n - page) <= 1,
                    )
                    .map((n, idx, arr) => (
                      <span
                        key={n}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                        }}
                      >
                        {idx > 0 && arr[idx - 1] !== n - 1 && (
                          <span
                            style={{ color: "#94a3b8", fontFamily: "DM Sans" }}
                          >
                            …
                          </span>
                        )}
                        <button
                          onClick={() => setParam("page", n)}
                          style={{
                            width: "36px",
                            height: "36px",
                            borderRadius: "10px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontFamily: "DM Sans",
                            fontSize: "13px",
                            fontWeight: page === n ? "700" : "400",
                            background: page === n ? "#16a34a" : "#ffffff",
                            border: page === n ? "none" : "1px solid #e2e8f0",
                            color: page === n ? "white" : "#64748b",
                            cursor: "pointer",
                            transition: "all 0.2s",
                            boxShadow:
                              page === n
                                ? "0 2px 8px rgba(22,163,74,0.3)"
                                : "none",
                          }}
                          onMouseEnter={(e) => {
                            if (page !== n) {
                              e.currentTarget.style.borderColor = "#16a34a";
                              e.currentTarget.style.color = "#16a34a";
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (page !== n) {
                              e.currentTarget.style.borderColor = "#e2e8f0";
                              e.currentTarget.style.color = "#64748b";
                            }
                          }}
                        >
                          {n}
                        </button>
                      </span>
                    ))}

                  <button
                    disabled={page >= pagination.totalPages}
                    onClick={() => setParam("page", page + 1)}
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "DM Sans",
                      fontSize: "14px",
                      background: "#ffffff",
                      border: "1px solid #e2e8f0",
                      color: "#64748b",
                      cursor:
                        page >= pagination.totalPages
                          ? "not-allowed"
                          : "pointer",
                      opacity: page >= pagination.totalPages ? 0.4 : 1,
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      if (page < pagination.totalPages) {
                        e.currentTarget.style.borderColor = "#16a34a";
                        e.currentTarget.style.color = "#16a34a";
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "#e2e8f0";
                      e.currentTarget.style.color = "#64748b";
                    }}
                  >
                    →
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {filtersOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 50 }}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.4)",
            }}
            onClick={() => setFiltersOpen(false)}
          />
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: "min(300px, 85vw)",
              background: "#ffffff",
              borderRight: "1px solid #e2e8f0",
              overflowY: "auto",
              animation: "slideInLeft 0.25s ease",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px",
                borderBottom: "1px solid #e2e8f0",
                position: "sticky",
                top: 0,
                background: "#ffffff",
                zIndex: 1,
              }}
            >
              <p
                style={{
                  fontFamily: "DM Sans",
                  fontSize: "15px",
                  fontWeight: "700",
                  color: "#0f172a",
                  margin: 0,
                }}
              >
                Filters
              </p>
              <button
                onClick={() => setFiltersOpen(false)}
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "8px",
                  background: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  cursor: "pointer",
                  color: "#64748b",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "14px",
                }}
              >
                ✕
              </button>
            </div>
            <div style={{ padding: "16px" }}>
              <ProductFilters
                setParam={setParam}
                minPrice={minPrice}
                maxPrice={maxPrice}
                searchParams={searchParams}
                activeSlug={slug}
              />
            </div>
          </div>
        </div>
      )}

      <style>{`
        .plp-sidebar { display: none; }
        .plp-filter-btn { display: flex; }
        @media (min-width: 1024px) {
          .plp-sidebar { display: block; }
          .plp-filter-btn { display: none !important; }
        }
        .plp-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }
        @media (min-width: 640px) {
          .plp-grid { grid-template-columns: repeat(2, 1fr); gap: 14px; }
        }
        @media (min-width: 768px) {
          .plp-grid { grid-template-columns: repeat(3, 1fr); gap: 16px; }
        }
        @media (min-width: 1280px) {
          .plp-grid { grid-template-columns: repeat(4, 1fr); gap: 20px; }
        }
        @keyframes slideInLeft {
          from { transform: translateX(-100%); }
          to   { transform: translateX(0); }
        }
      `}</style>
    </>
  );
};

export default ProductListingPage;
