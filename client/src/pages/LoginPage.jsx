// import { useState, useEffect, useCallback } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { loginUser, clearError } from "../redux/slices/authSlice";
// import toast from "react-hot-toast";

// const LoginPage = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { loading, error, isAuth } = useSelector((s) => s.auth);

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [show, setShow] = useState(false);

//   useEffect(() => {
//     if (isAuth) navigate("/");
//   }, [isAuth]);

//   useEffect(() => {
//     if (error) {
//       toast.error(error);
//       dispatch(clearError());
//     }
//   }, [error]);

//   const handleSubmit = useCallback(
//     async (e) => {
//       e.preventDefault();
//       if (!email || !password) {
//         toast.error("Please fill all fields");
//         return;
//       }
//       const r = await dispatch(loginUser({ email, password }));
//       if (r.meta.requestStatus === "fulfilled") {
//         toast.success("Welcome back! 🌙");
//         navigate("/");
//       }
//     },
//     [email, password, dispatch, navigate],
//   );

//   return (
//     <div
//       style={{ background: "#f0fdf4", minHeight: "100vh" }}
//       className="flex items-center justify-center px-4 py-12"
//     >
//       <div className="w-full max-w-md">
//         {/* ── Logo ── */}
//         <div className="text-center mb-8">
//           <div
//             className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-cormorant font-bold text-2xl mx-auto mb-4"
//             style={{ background: "linear-gradient(135deg,#16a34a,#14532d)" }}
//           >
//             ن
//           </div>
//           <h1
//             className="font-cormorant text-3xl font-semibold mb-1"
//             style={{ color: "#e2e8f0" }}
//           >
//             Welcome Back
//           </h1>
//           <p className="font-arabic text-lg" style={{ color: "#16a34a" }}>
//             أهلاً وسهلاً
//           </p>
//           <p className="font-dm text-sm mt-1" style={{ color: "#475569" }}>
//             Login to your NoorBazaar account
//           </p>
//         </div>

//         {/* ── Form Card ── */}
//         <div
//           className="p-8 rounded-2xl"
//           style={{
//             background: "#162032",
//             border: "1px solid rgba(255,255,255,0.06)",
//           }}
//         >
//           <form onSubmit={handleSubmit} className="space-y-5">
//             {/* Email */}
//             <div>
//               <label
//                 className="block font-dm text-xs font-medium mb-1.5"
//                 style={{ color: "#64748b" }}
//               >
//                 Email Address
//               </label>
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="your@email.com"
//                 className="nb-input"
//                 autoComplete="email"
//                 required
//               />
//             </div>

//             {/* Password */}
//             <div>
//               <div className="flex items-center justify-between mb-1.5">
//                 <label
//                   className="font-dm text-xs font-medium"
//                   style={{ color: "#64748b" }}
//                 >
//                   Password
//                 </label>
//                 <Link
//                   to="/forgot-password"
//                   className="font-dm text-xs transition-colors"
//                   style={{ color: "#16a34a" }}
//                 >
//                   Forgot password?
//                 </Link>
//               </div>
//               <div className="relative">
//                 <input
//                   type={show ? "text" : "password"}
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   placeholder="••••••••"
//                   className="nb-input pr-16"
//                   autoComplete="current-password"
//                   required
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShow((v) => !v)}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 font-dm text-xs px-2 py-1 rounded"
//                   style={{ color: "#475569" }}
//                 >
//                   {show ? "Hide" : "Show"}
//                 </button>
//               </div>
//             </div>

//             {/* Submit */}
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full py-3.5 rounded-xl font-dm font-semibold text-sm text-white transition-opacity disabled:opacity-60"
//               style={{ background: "linear-gradient(135deg,#16a34a,#15803d)" }}
//             >
//               {loading ? "Logging in..." : "Login to NoorBazaar"}
//             </button>
//           </form>

//           {/* Divider */}
//           <div className="flex items-center gap-3 my-5">
//             <div
//               className="flex-1 h-px"
//               style={{ background: "rgba(255,255,255,0.06)" }}
//             />
//             <span className="font-dm text-xs" style={{ color: "#334155" }}>
//               or
//             </span>
//             <div
//               className="flex-1 h-px"
//               style={{ background: "rgba(255,255,255,0.06)" }}
//             />
//           </div>

//           {/* Register */}
//           <p
//             className="text-center font-dm text-sm"
//             style={{ color: "#475569" }}
//           >
//             Don't have an account?{" "}
//             <Link
//               to="/register"
//               className="font-semibold"
//               style={{ color: "#4ade80" }}
//             >
//               Sign up free
//             </Link>
//           </p>
//         </div>

//         {/* Ayah */}
//         <p
//           className="text-center font-arabic text-sm mt-6"
//           style={{ color: "#334155" }}
//         >
//           بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
//         </p>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;

import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearError } from "../redux/slices/authSlice";
import toast from "react-hot-toast";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuth } = useSelector((s) => s.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isAuth) navigate("/");
  }, [isAuth]);
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!email || !password) {
        toast.error("Please fill all fields");
        return;
      }
      const r = await dispatch(loginUser({ email, password }));
      if (r.meta.requestStatus === "fulfilled") {
        toast.success("Welcome back! 🌙");
        navigate("/");
      }
    },
    [email, password, dispatch, navigate],
  );

  const inputStyle = {
    width: "100%",
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: "10px",
    padding: "12px 16px",
    fontFamily: "DM Sans, sans-serif",
    fontSize: "14px",
    color: "#0f172a",
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
    boxSizing: "border-box",
  };

  return (
    <div
      style={{
        background:
          "linear-gradient(135deg, #f0fdf4 0%, #ffffff 50%, #f0fdf4 100%)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(16px,4vw,48px) 24px",
        width: "100%",
      }}
    >
      <div style={{ width: "100%", maxWidth: "440px" }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "16px",
              background: "linear-gradient(135deg,#16a34a,#14532d)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontFamily: "Cormorant Garamond, serif",
              fontWeight: "bold",
              fontSize: "24px",
              margin: "0 auto 16px",
              boxShadow: "0 8px 24px rgba(22,163,74,0.3)",
            }}
          >
            ن
          </div>
          <h1
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "clamp(26px,4vw,32px)",
              fontWeight: "600",
              color: "#0f172a",
              margin: "0 0 4px 0",
            }}
          >
            Welcome Back
          </h1>
          <p
            style={{
              fontFamily: "Amiri, serif",
              fontSize: "18px",
              color: "#16a34a",
              margin: "0 0 6px 0",
            }}
          >
            أهلاً وسهلاً
          </p>
          <p
            style={{
              fontFamily: "DM Sans, sans-serif",
              fontSize: "14px",
              color: "#64748b",
              margin: 0,
            }}
          >
            Login to your NoorBazaar account
          </p>
        </div>

        {/* Form Card */}
        <div
          style={{
            padding: "clamp(20px,4vw,32px)",
            borderRadius: "20px",
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            boxShadow: "0 4px 24px rgba(22,163,74,0.06)",
          }}
        >
          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div style={{ marginBottom: "16px" }}>
              <label
                style={{
                  display: "block",
                  fontFamily: "DM Sans",
                  fontSize: "13px",
                  fontWeight: "600",
                  color: "#374151",
                  marginBottom: "6px",
                }}
              >
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                style={inputStyle}
                autoComplete="email"
                required
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#16a34a";
                  e.currentTarget.style.boxShadow =
                    "0 0 0 3px rgba(22,163,74,0.1)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "#e2e8f0";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
            </div>

            {/* Password */}
            <div style={{ marginBottom: "20px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "6px",
                }}
              >
                <label
                  style={{
                    fontFamily: "DM Sans",
                    fontSize: "13px",
                    fontWeight: "600",
                    color: "#374151",
                  }}
                >
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  style={{
                    fontFamily: "DM Sans",
                    fontSize: "12px",
                    color: "#16a34a",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#15803d")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#16a34a")
                  }
                >
                  Forgot password?
                </Link>
              </div>
              <div style={{ position: "relative" }}>
                <input
                  type={show ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  style={{ ...inputStyle, paddingRight: "56px" }}
                  autoComplete="current-password"
                  required
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#16a34a";
                    e.currentTarget.style.boxShadow =
                      "0 0 0 3px rgba(22,163,74,0.1)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "#e2e8f0";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShow((v) => !v)}
                  style={{
                    position: "absolute",
                    right: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    fontFamily: "DM Sans",
                    fontSize: "12px",
                    fontWeight: "600",
                    color: "#94a3b8",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    transition: "color 0.2s",
                    padding: "4px 6px",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#16a34a")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#94a3b8")
                  }
                >
                  {show ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: "12px",
                background: "linear-gradient(135deg,#16a34a,#15803d)",
                color: "white",
                fontFamily: "DM Sans, sans-serif",
                fontSize: "15px",
                fontWeight: "600",
                border: "none",
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.7 : 1,
                transition: "all 0.2s",
                boxShadow: "0 4px 12px rgba(22,163,74,0.3)",
              }}
              onMouseEnter={(e) => {
                if (!loading) e.currentTarget.style.opacity = "0.9";
              }}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              {loading ? "Logging in..." : "Login to NoorBazaar"}
            </button>
          </form>

          {/* Divider */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              margin: "20px 0",
            }}
          >
            <div style={{ flex: 1, height: "1px", background: "#f0f0f0" }} />
            <span
              style={{
                fontFamily: "DM Sans",
                fontSize: "12px",
                color: "#94a3b8",
              }}
            >
              or
            </span>
            <div style={{ flex: 1, height: "1px", background: "#f0f0f0" }} />
          </div>

          {/* Register link */}
          <p
            style={{
              textAlign: "center",
              fontFamily: "DM Sans",
              fontSize: "14px",
              color: "#64748b",
              margin: 0,
            }}
          >
            Don't have an account?{" "}
            <Link
              to="/register"
              style={{
                fontFamily: "DM Sans",
                fontSize: "14px",
                fontWeight: "700",
                color: "#16a34a",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#15803d")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#16a34a")}
            >
              Sign up free
            </Link>
          </p>
        </div>

        {/* Ayah */}
        <p
          style={{
            textAlign: "center",
            fontFamily: "Amiri, serif",
            fontSize: "14px",
            color: "#bbf7d0",
            marginTop: "24px",
          }}
        >
          بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
