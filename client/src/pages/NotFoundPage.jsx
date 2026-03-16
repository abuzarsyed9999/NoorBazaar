// import { Link, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";

// const NotFoundPage = () => {
//   const navigate = useNavigate();
//   const [count, setCount] = useState(5);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCount((p) => {
//         if (p <= 1) {
//           clearInterval(timer);
//           navigate("/");
//         }
//         return p - 1;
//       });
//     }, 1000);
//     return () => clearInterval(timer);
//   }, []);

//   return (
//     <div
//       style={{ background: "#ffffff", minHeight: "100vh" }}
//       className="flex items-center justify-center px-4"
//     >
//       {/* Background */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div
//           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-5"
//           style={{
//             background: "radial-gradient(circle,#16a34a,transparent 70%)",
//           }}
//         />
//       </div>

//       <div className="relative text-center max-w-md">
//         {/* 404 */}
//         <h1
//           className="font-cormorant font-bold leading-none mb-4"
//           style={{
//             fontSize: "clamp(100px, 20vw, 180px)",
//             color: "transparent",
//             WebkitTextStroke: "2px rgba(22,163,74,0.3)",
//           }}
//         >
//           404
//         </h1>

//         {/* Icon */}
//         <div className="text-6xl mb-4">🕌</div>

//         {/* Title */}
//         <h2
//           className="font-cormorant text-3xl font-semibold mb-2"
//           style={{ color: "#e2e8f0" }}
//         >
//           Page Not Found
//         </h2>

//         {/* Arabic */}
//         <p className="font-arabic text-xl mb-3" style={{ color: "#16a34a" }}>
//           الصفحة غير موجودة
//         </p>

//         {/* Description */}
//         <p
//           className="font-dm text-sm mb-6 leading-relaxed"
//           style={{ color: "#475569" }}
//         >
//           The page you're looking for doesn't exist or has been moved.
//           Redirecting to home in{" "}
//           <span style={{ color: "#4ade80" }}>{count}</span> seconds...
//         </p>

//         {/* Buttons */}
//         <div className="flex flex-col sm:flex-row gap-3 justify-center">
//           <Link
//             to="/"
//             className="px-8 py-3.5 rounded-xl font-dm font-semibold text-sm text-white transition-opacity"
//             style={{ background: "linear-gradient(135deg,#16a34a,#15803d)" }}
//             onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
//             onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
//           >
//             Back to Home
//           </Link>
//           <Link
//             to="/products"
//             className="px-8 py-3.5 rounded-xl font-dm font-medium text-sm transition-all"
//             style={{
//               border: "1px solid rgba(255,255,255,0.08)",
//               color: "#94a3b8",
//             }}
//             onMouseEnter={(e) => {
//               e.currentTarget.style.borderColor = "rgba(22,163,74,0.3)";
//               e.currentTarget.style.color = "#e2e8f0";
//             }}
//             onMouseLeave={(e) => {
//               e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
//               e.currentTarget.style.color = "#94a3b8";
//             }}
//           >
//             Browse Products
//           </Link>
//         </div>

//         {/* Ayah */}
//         <p className="font-arabic text-sm mt-8" style={{ color: "#1e2d42" }}>
//           وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ
//         </p>
//       </div>
//     </div>
//   );
// };

// export default NotFoundPage;

import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const NotFoundPage = () => {
  const navigate        = useNavigate();
  const [count, setCount] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((p) => {
        if (p <= 1) { clearInterval(timer); navigate("/"); }
        return p - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{
      background:     "linear-gradient(135deg, #f0fdf4 0%, #ffffff 50%, #f0fdf4 100%)",
      minHeight:      "100vh",
      display:        "flex",
      alignItems:     "center",
      justifyContent: "center",
      padding:        "24px",
      width:          "100%",
      position:       "relative",
      overflow:       "hidden",
    }}>
      {/* Background decoration */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div style={{
          position:     "absolute",
          top:          "50%",
          left:         "50%",
          transform:    "translate(-50%,-50%)",
          width:        "600px",
          height:       "600px",
          borderRadius: "50%",
          background:   "radial-gradient(circle, rgba(22,163,74,0.06), transparent 70%)",
        }} />
      </div>

      <div style={{ textAlign: "center", maxWidth: "480px", position: "relative" }}>

        {/* 404 */}
        <h1 style={{
          fontFamily:       "Cormorant Garamond, serif",
          fontWeight:       "700",
          lineHeight:       1,
          marginBottom:     "16px",
          fontSize:         "clamp(80px, 18vw, 160px)",
          color:            "transparent",
          WebkitTextStroke: "2px rgba(22,163,74,0.25)",
          userSelect:       "none",
        }}>
          404
        </h1>

        {/* Icon */}
        <div style={{ fontSize: "clamp(40px,8vw,64px)", marginBottom: "16px" }}>🕌</div>

        {/* Title */}
        <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(22px,4vw,32px)", fontWeight: "600", color: "#0f172a", margin: "0 0 8px 0" }}>
          Page Not Found
        </h2>

        {/* Arabic */}
        <p style={{ fontFamily: "Amiri, serif", fontSize: "clamp(16px,2vw,20px)", color: "#16a34a", margin: "0 0 12px 0" }}>
          الصفحة غير موجودة
        </p>

        {/* Description */}
        <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: "clamp(13px,1.8vw,15px)", lineHeight: 1.7, color: "#64748b", margin: "0 0 32px 0" }}>
          The page you're looking for doesn't exist or has been moved.
          Redirecting to home in{" "}
          <span style={{ color: "#16a34a", fontWeight: "700" }}>{count}</span> seconds...
        </p>

        {/* Buttons */}
        <div style={{
          display:        "flex",
          flexWrap:       "wrap",
          gap:            "12px",
          justifyContent: "center",
          marginBottom:   "32px",
        }}>
          <Link
            to="/"
            style={{
              display:        "inline-flex",
              alignItems:     "center",
              padding:        "clamp(10px,2vw,14px) clamp(20px,4vw,32px)",
              borderRadius:   "12px",
              background:     "linear-gradient(135deg,#16a34a,#15803d)",
              color:          "white",
              fontFamily:     "DM Sans, sans-serif",
              fontSize:       "clamp(13px,1.5vw,15px)",
              fontWeight:     "600",
              textDecoration: "none",
              transition:     "all 0.2s",
              boxShadow:      "0 4px 12px rgba(22,163,74,0.3)",
              whiteSpace:     "nowrap",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.9"; e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            Back to Home
          </Link>
          <Link
            to="/products"
            style={{
              display:        "inline-flex",
              alignItems:     "center",
              padding:        "clamp(10px,2vw,14px) clamp(20px,4vw,32px)",
              borderRadius:   "12px",
              background:     "transparent",
              border:         "1px solid #e2e8f0",
              color:          "#64748b",
              fontFamily:     "DM Sans, sans-serif",
              fontSize:       "clamp(13px,1.5vw,15px)",
              fontWeight:     "500",
              textDecoration: "none",
              transition:     "all 0.2s",
              whiteSpace:     "nowrap",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#16a34a"; e.currentTarget.style.color = "#16a34a"; e.currentTarget.style.background = "#f0fdf4"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.color = "#64748b"; e.currentTarget.style.background = "transparent"; }}
          >
            Browse Products
          </Link>
        </div>

        {/* Ayah */}
        <p style={{ fontFamily: "Amiri, serif", fontSize: "16px", color: "#bbf7d0" }}>
          وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;
 