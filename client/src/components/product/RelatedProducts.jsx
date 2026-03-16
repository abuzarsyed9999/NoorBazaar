// import { useEffect, useState } from "react";
// import API from "../../services/api";
// import ProductCard from "./ProductCard";

// const RelatedProducts = ({ categoryId, currentProductId }) => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (!categoryId) return;
//     setLoading(true);
//     API.get(`/products?category=${categoryId}&limit=4`)
//       .then((r) => {
//         const filtered = (r.data.data || []).filter(
//           (p) => p._id !== currentProductId,
//         );
//         setProducts(filtered.slice(0, 4));
//       })
//       .catch(() => {})
//       .finally(() => setLoading(false));
//   }, [categoryId, currentProductId]);

//   if (!loading && products.length === 0) return null;

//   return (
//     <div>
//       <div className="mb-6">
//         <p
//           className="font-dm text-xs font-semibold tracking-widest uppercase mb-1"
//           style={{ color: "#16a34a" }}
//         >
//           Related
//         </p>
//         <h2
//           className="font-cormorant text-2xl font-semibold"
//           style={{ color: "#e2e8f0" }}
//         >
//           You May Also Like
//         </h2>
//       </div>

//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         {loading
//           ? Array(4)
//               .fill(0)
//               .map((_, i) => (
//                 <div
//                   key={i}
//                   className="rounded-2xl overflow-hidden"
//                   style={{ background: "#162032" }}
//                 >
//                   <div className="aspect-square shimmer" />
//                   <div className="p-4 space-y-2">
//                     <div className="h-3 shimmer rounded w-1/2" />
//                     <div className="h-4 shimmer rounded" />
//                     <div className="h-4 shimmer rounded w-1/3" />
//                   </div>
//                 </div>
//               ))
//           : products.map((p) => <ProductCard key={p._id} product={p} />)}
//       </div>
//     </div>
//   );
// };

// export default RelatedProducts;

import { useEffect, useState } from "react";
import API from "../../services/api";
import ProductCard from "./ProductCard";

const RelatedProducts = ({ categoryId, currentProductId }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!categoryId) return;
    setLoading(true);
    API.get(`/products?category=${categoryId}&limit=5`)
      .then((r) => {
        const filtered = (r.data.data || []).filter(
          (p) => p._id !== currentProductId,
        );
        setProducts(filtered.slice(0, 4));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [categoryId, currentProductId]);

  if (!loading && products.length === 0) return null;

  return (
    <>
      <div>
        {/* Header */}
        <div style={{ marginBottom: "24px" }}>
          <p
            style={{
              fontFamily: "DM Sans, sans-serif",
              fontSize: "11px",
              fontWeight: "700",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: "#16a34a",
              margin: "0 0 6px 0",
            }}
          >
            Related
          </p>
          <h2
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "clamp(24px, 3vw, 32px)",
              fontWeight: "600",
              color: "#0f172a",
              margin: 0,
            }}
          >
            You May Also Like
          </h2>
        </div>

        {/* Grid */}
        <div className="rp-grid">
          {loading
            ? Array(4)
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
                          marginBottom: "8px",
                          background: "#f0fdf4",
                        }}
                      />
                      <div
                        style={{
                          height: "18px",
                          borderRadius: "4px",
                          width: "30%",
                          background: "#f0fdf4",
                        }}
                      />
                    </div>
                  </div>
                ))
            : products.map((p) => <ProductCard key={p._id} product={p} />)}
        </div>
      </div>

      {/* Responsive */}
      <style>{`
        .rp-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }
        @media (min-width: 640px) {
          .rp-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
          }
        }
        @media (min-width: 768px) {
          .rp-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 16px;
          }
        }
        @media (min-width: 1024px) {
          .rp-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
          }
        }
      `}</style>
    </>
  );
};

export default RelatedProducts;
