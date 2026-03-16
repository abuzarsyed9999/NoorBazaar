// import { useState, useEffect, useRef } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { logoutUser } from "../../redux/slices/authSlice";
// import { fetchCart } from "../../redux/slices/cartSlice";
// import toast from "react-hot-toast";

// const Navbar = () => {
//   const [scrolled, setScrolled] = useState(false);
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [profileOpen, setProfileOpen] = useState(false);
//   const [searchOpen, setSearchOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const profileRef = useRef(null);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { isAuth, user } = useSelector((s) => s.auth);
//   const { totalItems } = useSelector((s) => s.cart);

//   useEffect(() => {
//     if (isAuth) dispatch(fetchCart());
//   }, [isAuth]);

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 40);
//     window.addEventListener("scroll", onScroll);
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   useEffect(() => {
//     setMobileOpen(false);
//     setProfileOpen(false);
//     setSearchOpen(false);
//   }, [location.pathname]);

//   useEffect(() => {
//     document.body.style.overflow = mobileOpen ? "hidden" : "";
//     return () => {
//       document.body.style.overflow = "";
//     };
//   }, [mobileOpen]);

//   useEffect(() => {
//     const handler = (e) => {
//       if (profileRef.current && !profileRef.current.contains(e.target)) {
//         setProfileOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handler);
//     return () => document.removeEventListener("mousedown", handler);
//   }, []);

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (!searchQuery.trim()) return;
//     navigate(`/products?keyword=${searchQuery.trim()}`);
//     setSearchQuery("");
//     setSearchOpen(false);
//   };

//   const handleLogout = async () => {
//     await dispatch(logoutUser());
//     toast.success("See you soon! 🌙");
//     navigate("/");
//     setMobileOpen(false);
//   };

//   const isActive = (to) => {
//     if (to === "/") return location.pathname === "/";
//     return location.pathname.startsWith(to);
//   };

//   const navLinks = [
//     { label: "Home", to: "/" },
//     { label: "All Products", to: "/products" },
//     { label: "Quran", to: "/products/category/quran-and-books" },
//     { label: "Tasbih", to: "/products/category/tasbih" },
//     { label: "Prayer Items", to: "/products/category/prayer-items" },
//     { label: "Islamic Decor", to: "/products/category/islamic-decor" },
//     { label: "Attar", to: "/products/category/attar-fragrances" },
//     { label: "Gifts", to: "/products/category/gift-sets" },
//   ];

//   const categoryLinks = [
//     {
//       icon: "📖",
//       label: "Quran & Books",
//       to: "/products/category/quran-and-books",
//     },
//     { icon: "📿", label: "Tasbih", to: "/products/category/tasbih" },
//     {
//       icon: "🧎",
//       label: "Prayer Items",
//       to: "/products/category/prayer-items",
//     },
//     {
//       icon: "🕌",
//       label: "Islamic Decor",
//       to: "/products/category/islamic-decor",
//     },
//     {
//       icon: "🧴",
//       label: "Attar & Fragrances",
//       to: "/products/category/attar-fragrances",
//     },
//     { icon: "🎁", label: "Gift Sets", to: "/products/category/gift-sets" },
//   ];

//   return (
//     <>
//       {/* ══════════════════════════════
//           ANNOUNCEMENT BAR
//       ══════════════════════════════ */}
//       <div
//         className="hidden md:block text-center py-2 px-4 text-xs font-dm"
//         style={{ background: "#14532d", color: "#86efac" }}
//       >
//         <span className="font-arabic text-sm" style={{ color: "#bbf7d0" }}>
//           بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
//         </span>
//         <span className="mx-4" style={{ color: "#166534" }}>
//           |
//         </span>
//         🚚 Free shipping above ₹999
//         <span className="mx-4" style={{ color: "#166534" }}>
//           |
//         </span>
//         ✅ 100% Authentic Products
//         <span className="mx-4" style={{ color: "#166534" }}>
//           |
//         </span>
//         🎁 Gift wrapping available
//       </div>

//       {/* ══════════════════════════════
//           MAIN NAVBAR
//       ══════════════════════════════ */}
//       <header
//         className="sticky top-0 z-50 transition-all duration-300"
//         style={{
//           width: "100%",
//           background: scrolled ? "rgba(15,25,35,0.97)" : "#0f1923",
//           borderBottom: "1px solid rgba(22,163,74,0.12)",
//           backdropFilter: scrolled ? "blur(20px)" : "none",
//         }}
//       >
//         {/* ══════════════════════════════
//             TOP ROW
//         ══════════════════════════════ */}
//         <div style={{ width: "100%" }}>
//           <div
//             style={{
//               maxWidth: "1280px",
//               margin: "0 auto",
//               padding: "0 24px",
//               width: "100%",
//             }}
//           >
//             <div
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 height: "64px",
//                 gap: "16px",
//                 width: "100%",
//               }}
//             >
//               {/* ── Logo ── */}
//               <Link
//                 to="/"
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   gap: "10px",
//                   flexShrink: 0,
//                   textDecoration: "none",
//                 }}
//               >
//                 <div
//                   style={{
//                     width: "36px",
//                     height: "36px",
//                     borderRadius: "10px",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     color: "white",
//                     fontFamily: "Cormorant Garamond, serif",
//                     fontWeight: "bold",
//                     fontSize: "20px",
//                     background: "linear-gradient(135deg,#16a34a,#14532d)",
//                     flexShrink: 0,
//                   }}
//                 >
//                   ن
//                 </div>
//                 <div style={{ display: "none" }} className="sm:block">
//                   <p
//                     style={{
//                       fontFamily: "Cormorant Garamond, serif",
//                       fontWeight: "600",
//                       fontSize: "18px",
//                       lineHeight: 1,
//                       color: "#faf7f2",
//                       letterSpacing: "0.05em",
//                       margin: 0,
//                     }}
//                   >
//                     NoorBazaar
//                   </p>
//                   <p
//                     style={{
//                       fontFamily: "Amiri, serif",
//                       fontSize: "11px",
//                       color: "#4ade80",
//                       lineHeight: 1,
//                       marginTop: "2px",
//                     }}
//                   >
//                     نور بازار
//                   </p>
//                 </div>
//               </Link>

//               {/* ── Search Bar (Desktop) ── */}
//               <form
//                 onSubmit={handleSearch}
//                 style={{
//                   display: "flex",
//                   flex: 1,
//                   margin: "0 8px",
//                 }}
//                 className="hidden md:flex"
//               >
//                 <input
//                   type="text"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   placeholder="Search Quran, Tasbih, Prayer Mat, Attar..."
//                   style={{
//                     flex: 1,
//                     background: "#162032",
//                     border: "1px solid rgba(255,255,255,0.08)",
//                     borderRight: "none",
//                     borderRadius: "10px 0 0 10px",
//                     padding: "10px 16px",
//                     color: "#faf7f2",
//                     fontFamily: "DM Sans, sans-serif",
//                     fontSize: "14px",
//                     outline: "none",
//                     minWidth: 0,
//                   }}
//                   onFocus={(e) =>
//                     (e.currentTarget.style.borderColor = "rgba(22,163,74,0.5)")
//                   }
//                   onBlur={(e) =>
//                     (e.currentTarget.style.borderColor =
//                       "rgba(255,255,255,0.08)")
//                   }
//                 />
//                 <button
//                   type="submit"
//                   style={{
//                     background: "#16a34a",
//                     borderRadius: "0 10px 10px 0",
//                     padding: "0 20px",
//                     minWidth: "80px",
//                     color: "white",
//                     fontFamily: "DM Sans, sans-serif",
//                     fontSize: "14px",
//                     fontWeight: "600",
//                     border: "none",
//                     cursor: "pointer",
//                     flexShrink: 0,
//                   }}
//                   onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
//                   onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
//                 >
//                   Search
//                 </button>
//               </form>

//               {/* ── Right Actions ── */}
//               <div
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   gap: "4px",
//                   flexShrink: 0,
//                 }}
//               >
//                 {/* Mobile Search */}
//                 <button
//                   onClick={() => setSearchOpen((v) => !v)}
//                   className="md:hidden"
//                   style={{
//                     width: "36px",
//                     height: "36px",
//                     borderRadius: "10px",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     background: "transparent",
//                     border: "none",
//                     color: "#94a3b8",
//                     cursor: "pointer",
//                   }}
//                 >
//                   <svg
//                     className="w-[18px] h-[18px]"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//                     />
//                   </svg>
//                 </button>

//                 {/* Cart */}
//                 <Link
//                   to={isAuth ? "/cart" : "/login"}
//                   style={{
//                     position: "relative",
//                     width: "36px",
//                     height: "36px",
//                     borderRadius: "10px",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     color: "#94a3b8",
//                     textDecoration: "none",
//                   }}
//                   onMouseEnter={(e) => {
//                     e.currentTarget.style.background = "rgba(22,163,74,0.1)";
//                     e.currentTarget.style.color = "#4ade80";
//                   }}
//                   onMouseLeave={(e) => {
//                     e.currentTarget.style.background = "transparent";
//                     e.currentTarget.style.color = "#94a3b8";
//                   }}
//                 >
//                   <svg
//                     className="w-[18px] h-[18px]"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
//                     />
//                   </svg>
//                   {isAuth && totalItems > 0 && (
//                     <span
//                       style={{
//                         position: "absolute",
//                         top: "-4px",
//                         right: "-4px",
//                         width: "18px",
//                         height: "18px",
//                         background: "#16a34a",
//                         color: "white",
//                         fontSize: "10px",
//                         fontWeight: "bold",
//                         borderRadius: "50%",
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                       }}
//                     >
//                       {totalItems > 9 ? "9+" : totalItems}
//                     </span>
//                   )}
//                 </Link>

//                 {/* Profile — Desktop */}
//                 {isAuth ? (
//                   <div
//                     className="hidden md:block"
//                     ref={profileRef}
//                     style={{ position: "relative" }}
//                   >
//                     <button
//                       onClick={() => setProfileOpen((v) => !v)}
//                       style={{
//                         display: "flex",
//                         alignItems: "center",
//                         gap: "8px",
//                         paddingLeft: "8px",
//                         paddingRight: "12px",
//                         height: "36px",
//                         borderRadius: "10px",
//                         background: profileOpen
//                           ? "rgba(22,163,74,0.12)"
//                           : "rgba(255,255,255,0.04)",
//                         border: "1px solid rgba(255,255,255,0.06)",
//                         cursor: "pointer",
//                         transition: "all 0.2s",
//                       }}
//                     >
//                       <div
//                         style={{
//                           width: "24px",
//                           height: "24px",
//                           borderRadius: "8px",
//                           background: "linear-gradient(135deg,#16a34a,#14532d)",
//                           display: "flex",
//                           alignItems: "center",
//                           justifyContent: "center",
//                           color: "white",
//                           fontSize: "12px",
//                           fontWeight: "bold",
//                         }}
//                       >
//                         {user?.name?.charAt(0).toUpperCase()}
//                       </div>
//                       <span
//                         style={{
//                           fontSize: "12px",
//                           fontFamily: "DM Sans, sans-serif",
//                           color: "#94a3b8",
//                           maxWidth: "80px",
//                           overflow: "hidden",
//                           textOverflow: "ellipsis",
//                           whiteSpace: "nowrap",
//                         }}
//                       >
//                         {user?.name?.split(" ")[0]}
//                       </span>
//                       <svg
//                         style={{
//                           width: "12px",
//                           height: "12px",
//                           color: "#64748b",
//                           transform: profileOpen
//                             ? "rotate(180deg)"
//                             : "rotate(0deg)",
//                           transition: "transform 0.2s",
//                         }}
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M19 9l-7 7-7-7"
//                         />
//                       </svg>
//                     </button>

//                     {/* Dropdown */}
//                     {profileOpen && (
//                       <div
//                         style={{
//                           position: "absolute",
//                           right: 0,
//                           top: "calc(100% + 8px)",
//                           width: "220px",
//                           background: "#162032",
//                           border: "1px solid rgba(255,255,255,0.07)",
//                           borderRadius: "16px",
//                           overflow: "hidden",
//                           boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
//                           animation: "fadeIn 0.15s ease",
//                           zIndex: 200,
//                         }}
//                       >
//                         <div
//                           style={{
//                             padding: "12px 16px",
//                             borderBottom: "1px solid rgba(255,255,255,0.06)",
//                           }}
//                         >
//                           <p
//                             style={{
//                               fontFamily: "DM Sans",
//                               fontSize: "14px",
//                               fontWeight: "600",
//                               color: "#faf7f2",
//                               margin: 0,
//                             }}
//                           >
//                             {user?.name}
//                           </p>
//                           <p
//                             style={{
//                               fontFamily: "DM Sans",
//                               fontSize: "11px",
//                               color: "#475569",
//                               marginTop: "2px",
//                             }}
//                           >
//                             {user?.email}
//                           </p>
//                           {user?.role === "admin" && (
//                             <span
//                               style={{
//                                 display: "inline-block",
//                                 marginTop: "6px",
//                                 fontSize: "10px",
//                                 fontFamily: "DM Sans",
//                                 fontWeight: "600",
//                                 padding: "2px 8px",
//                                 borderRadius: "20px",
//                                 background: "rgba(22,163,74,0.15)",
//                                 color: "#4ade80",
//                                 border: "1px solid rgba(22,163,74,0.25)",
//                               }}
//                             >
//                               Admin
//                             </span>
//                           )}
//                         </div>
//                         <div style={{ padding: "4px 0" }}>
//                           {[
//                             {
//                               icon: "👤",
//                               label: "My Profile",
//                               to: "/dashboard",
//                             },
//                             {
//                               icon: "📦",
//                               label: "My Orders",
//                               to: "/dashboard?tab=orders",
//                             },
//                             {
//                               icon: "❤️",
//                               label: "Wishlist",
//                               to: "/dashboard?tab=wishlist",
//                             },
//                             {
//                               icon: "📍",
//                               label: "Addresses",
//                               to: "/dashboard?tab=address",
//                             },
//                             ...(user?.role === "admin"
//                               ? [
//                                   {
//                                     icon: "⚙️",
//                                     label: "Admin Panel",
//                                     to: "/admin",
//                                   },
//                                 ]
//                               : []),
//                           ].map((item) => (
//                             <Link
//                               key={item.label}
//                               to={item.to}
//                               style={{
//                                 display: "flex",
//                                 alignItems: "center",
//                                 gap: "12px",
//                                 padding: "10px 16px",
//                                 fontFamily: "DM Sans",
//                                 fontSize: "13px",
//                                 color: "#94a3b8",
//                                 textDecoration: "none",
//                                 transition: "all 0.15s",
//                               }}
//                               onMouseEnter={(e) => {
//                                 e.currentTarget.style.background =
//                                   "rgba(22,163,74,0.07)";
//                                 e.currentTarget.style.color = "#f1f5f9";
//                               }}
//                               onMouseLeave={(e) => {
//                                 e.currentTarget.style.background =
//                                   "transparent";
//                                 e.currentTarget.style.color = "#94a3b8";
//                               }}
//                             >
//                               <span>{item.icon}</span>
//                               {item.label}
//                             </Link>
//                           ))}
//                         </div>
//                         <div
//                           style={{
//                             borderTop: "1px solid rgba(255,255,255,0.06)",
//                           }}
//                         >
//                           <button
//                             onClick={handleLogout}
//                             style={{
//                               width: "100%",
//                               display: "flex",
//                               alignItems: "center",
//                               gap: "12px",
//                               padding: "10px 16px",
//                               fontFamily: "DM Sans",
//                               fontSize: "13px",
//                               color: "#f87171",
//                               background: "transparent",
//                               border: "none",
//                               cursor: "pointer",
//                               textAlign: "left",
//                               transition: "background 0.15s",
//                             }}
//                             onMouseEnter={(e) =>
//                               (e.currentTarget.style.background =
//                                 "rgba(248,113,113,0.07)")
//                             }
//                             onMouseLeave={(e) =>
//                               (e.currentTarget.style.background = "transparent")
//                             }
//                           >
//                             <span>🚪</span> Logout
//                           </button>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 ) : (
//                   <div
//                     className="hidden md:flex"
//                     style={{
//                       alignItems: "center",
//                       gap: "8px",
//                       marginLeft: "4px",
//                     }}
//                   >
//                     <Link
//                       to="/login"
//                       style={{
//                         padding: "0 16px",
//                         height: "36px",
//                         display: "flex",
//                         alignItems: "center",
//                         fontFamily: "DM Sans",
//                         fontSize: "14px",
//                         fontWeight: "500",
//                         color: "#94a3b8",
//                         textDecoration: "none",
//                         borderRadius: "10px",
//                         transition: "color 0.2s",
//                       }}
//                       onMouseEnter={(e) =>
//                         (e.currentTarget.style.color = "#f1f5f9")
//                       }
//                       onMouseLeave={(e) =>
//                         (e.currentTarget.style.color = "#94a3b8")
//                       }
//                     >
//                       Login
//                     </Link>
//                     <Link
//                       to="/register"
//                       style={{
//                         padding: "0 16px",
//                         height: "36px",
//                         display: "flex",
//                         alignItems: "center",
//                         fontFamily: "DM Sans",
//                         fontSize: "14px",
//                         fontWeight: "600",
//                         color: "white",
//                         textDecoration: "none",
//                         borderRadius: "10px",
//                         background: "linear-gradient(135deg,#16a34a,#15803d)",
//                         transition: "opacity 0.2s",
//                       }}
//                       onMouseEnter={(e) =>
//                         (e.currentTarget.style.opacity = "0.9")
//                       }
//                       onMouseLeave={(e) =>
//                         (e.currentTarget.style.opacity = "1")
//                       }
//                     >
//                       Sign Up
//                     </Link>
//                   </div>
//                 )}

//                 {/* Hamburger */}
//                 <button
//                   onClick={() => setMobileOpen((v) => !v)}
//                   className="lg:hidden"
//                   style={{
//                     width: "36px",
//                     height: "36px",
//                     borderRadius: "10px",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     marginLeft: "4px",
//                     background: mobileOpen
//                       ? "rgba(22,163,74,0.12)"
//                       : "rgba(255,255,255,0.04)",
//                     border: "1px solid rgba(255,255,255,0.06)",
//                     cursor: "pointer",
//                     color: "#94a3b8",
//                   }}
//                 >
//                   <div
//                     style={{
//                       width: "16px",
//                       display: "flex",
//                       flexDirection: "column",
//                       gap: "5px",
//                     }}
//                   >
//                     <span
//                       style={{
//                         display: "block",
//                         height: "2px",
//                         background: mobileOpen ? "#4ade80" : "#94a3b8",
//                         borderRadius: "2px",
//                         transition: "all 0.3s",
//                         transform: mobileOpen
//                           ? "rotate(45deg) translate(0px, 7px)"
//                           : "none",
//                       }}
//                     />
//                     <span
//                       style={{
//                         display: "block",
//                         height: "2px",
//                         background: "#94a3b8",
//                         borderRadius: "2px",
//                         transition: "all 0.3s",
//                         opacity: mobileOpen ? 0 : 1,
//                       }}
//                     />
//                     <span
//                       style={{
//                         display: "block",
//                         height: "2px",
//                         background: mobileOpen ? "#4ade80" : "#94a3b8",
//                         borderRadius: "2px",
//                         transition: "all 0.3s",
//                         transform: mobileOpen
//                           ? "rotate(-45deg) translate(0px, -7px)"
//                           : "none",
//                       }}
//                     />
//                   </div>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* ══════════════════════════════
//             NAV LINKS ROW
//         ══════════════════════════════ */}
//         <div
//           className="hidden lg:block"
//           style={{
//             borderTop: "1px solid rgba(255,255,255,0.04)",
//             width: "100%",
//           }}
//         >
//           <div
//             style={{
//               maxWidth: "1280px",
//               margin: "0 auto",
//               padding: "0 24px",
//               width: "100%",
//             }}
//           >
//             <div
//               style={{ display: "flex", alignItems: "center", height: "40px" }}
//             >
//               {navLinks.map((l) => (
//                 <Link
//                   key={l.to}
//                   to={l.to}
//                   style={{
//                     position: "relative",
//                     height: "100%",
//                     display: "flex",
//                     alignItems: "center",
//                     fontFamily: "DM Sans, sans-serif",
//                     fontSize: "12px",
//                     fontWeight: "500",
//                     color: isActive(l.to) ? "#4ade80" : "#64748b",
//                     textDecoration: "none",
//                     padding: "0 14px",
//                     whiteSpace: "nowrap",
//                     transition: "color 0.2s",
//                   }}
//                   onMouseEnter={(e) => {
//                     if (!isActive(l.to)) {
//                       e.currentTarget.style.color = "#e2e8f0";
//                       e.currentTarget.style.background =
//                         "rgba(255,255,255,0.03)";
//                     }
//                   }}
//                   onMouseLeave={(e) => {
//                     if (!isActive(l.to)) {
//                       e.currentTarget.style.color = "#64748b";
//                       e.currentTarget.style.background = "transparent";
//                     }
//                   }}
//                 >
//                   {l.label}
//                   {isActive(l.to) && (
//                     <span
//                       style={{
//                         position: "absolute",
//                         bottom: 0,
//                         left: "14px",
//                         right: "14px",
//                         height: "2px",
//                         background: "#16a34a",
//                         borderRadius: "2px",
//                       }}
//                     />
//                   )}
//                 </Link>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Mobile Search */}
//         {searchOpen && (
//           <div
//             className="md:hidden"
//             style={{
//               padding: "12px 16px",
//               borderTop: "1px solid rgba(22,163,74,0.12)",
//             }}
//           >
//             <form
//               onSubmit={handleSearch}
//               style={{ display: "flex", gap: "8px" }}
//             >
//               <input
//                 autoFocus
//                 type="text"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 placeholder="Search products..."
//                 className="nb-input flex-1 text-sm"
//                 style={{ padding: "10px 14px" }}
//               />
//               <button
//                 type="submit"
//                 style={{
//                   padding: "0 16px",
//                   borderRadius: "10px",
//                   background: "#16a34a",
//                   color: "white",
//                   fontFamily: "DM Sans",
//                   fontSize: "13px",
//                   fontWeight: "600",
//                   border: "none",
//                   cursor: "pointer",
//                   flexShrink: 0,
//                 }}
//               >
//                 Go
//               </button>
//             </form>
//           </div>
//         )}
//       </header>

//       {/* ══════════════════════════════
//           MOBILE DRAWER
//       ══════════════════════════════ */}
//       {mobileOpen && (
//         <>
//           <div
//             className="fixed inset-0 z-40 lg:hidden"
//             style={{ background: "rgba(0,0,0,0.65)" }}
//             onClick={() => setMobileOpen(false)}
//           />

//           <div
//             className="fixed top-0 left-0 bottom-0 z-50 lg:hidden flex flex-col"
//             style={{
//               width: "min(320px, 85vw)",
//               background: "#0f1923",
//               borderRight: "1px solid rgba(22,163,74,0.15)",
//               overflowY: "auto",
//               animation: "slideInLeft 0.25s ease",
//             }}
//           >
//             {/* Drawer Header */}
//             <div
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "space-between",
//                 padding: "16px",
//                 background: "linear-gradient(135deg,#0a2218,#0f2d1c)",
//                 borderBottom: "1px solid rgba(22,163,74,0.2)",
//                 flexShrink: 0,
//               }}
//             >
//               {isAuth ? (
//                 <div
//                   style={{ display: "flex", alignItems: "center", gap: "12px" }}
//                 >
//                   <div
//                     style={{
//                       width: "40px",
//                       height: "40px",
//                       borderRadius: "10px",
//                       background: "linear-gradient(135deg,#16a34a,#14532d)",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       color: "white",
//                       fontWeight: "bold",
//                       fontSize: "18px",
//                       fontFamily: "Cormorant Garamond",
//                     }}
//                   >
//                     {user?.name?.charAt(0).toUpperCase()}
//                   </div>
//                   <div>
//                     <p
//                       style={{
//                         fontFamily: "DM Sans",
//                         fontSize: "14px",
//                         fontWeight: "600",
//                         color: "#faf7f2",
//                         margin: 0,
//                       }}
//                     >
//                       {user?.name}
//                     </p>
//                     <p
//                       style={{
//                         fontFamily: "DM Sans",
//                         fontSize: "10px",
//                         color: "#475569",
//                         margin: 0,
//                       }}
//                     >
//                       {user?.email}
//                     </p>
//                   </div>
//                 </div>
//               ) : (
//                 <div>
//                   <p
//                     style={{
//                       fontFamily: "Cormorant Garamond",
//                       fontSize: "18px",
//                       fontWeight: "600",
//                       color: "#faf7f2",
//                       margin: 0,
//                     }}
//                   >
//                     NoorBazaar
//                   </p>
//                   <p
//                     style={{
//                       fontFamily: "Amiri",
//                       fontSize: "12px",
//                       color: "#4ade80",
//                       margin: 0,
//                     }}
//                   >
//                     نور بازار
//                   </p>
//                 </div>
//               )}
//               <button
//                 onClick={() => setMobileOpen(false)}
//                 style={{
//                   width: "32px",
//                   height: "32px",
//                   borderRadius: "8px",
//                   background: "rgba(255,255,255,0.08)",
//                   border: "none",
//                   color: "#94a3b8",
//                   cursor: "pointer",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
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
//                     d="M6 18L18 6M6 6l12 12"
//                   />
//                 </svg>
//               </button>
//             </div>

//             {/* Auth Buttons */}
//             {!isAuth && (
//               <div
//                 style={{
//                   display: "flex",
//                   gap: "8px",
//                   padding: "12px 16px",
//                   borderBottom: "1px solid rgba(255,255,255,0.05)",
//                   flexShrink: 0,
//                 }}
//               >
//                 <Link
//                   to="/login"
//                   onClick={() => setMobileOpen(false)}
//                   style={{
//                     flex: 1,
//                     textAlign: "center",
//                     padding: "10px",
//                     fontFamily: "DM Sans",
//                     fontSize: "14px",
//                     fontWeight: "500",
//                     borderRadius: "10px",
//                     border: "1px solid rgba(22,163,74,0.3)",
//                     color: "#4ade80",
//                     textDecoration: "none",
//                   }}
//                 >
//                   Login
//                 </Link>
//                 <Link
//                   to="/register"
//                   onClick={() => setMobileOpen(false)}
//                   style={{
//                     flex: 1,
//                     textAlign: "center",
//                     padding: "10px",
//                     fontFamily: "DM Sans",
//                     fontSize: "14px",
//                     fontWeight: "600",
//                     borderRadius: "10px",
//                     background: "#16a34a",
//                     color: "white",
//                     textDecoration: "none",
//                     border: "none",
//                   }}
//                 >
//                   Sign Up
//                 </Link>
//               </div>
//             )}

//             {/* Navigation */}
//             <div
//               style={{
//                 padding: "12px",
//                 borderBottom: "1px solid rgba(255,255,255,0.05)",
//                 flexShrink: 0,
//               }}
//             >
//               <p
//                 style={{
//                   fontFamily: "DM Sans",
//                   fontSize: "10px",
//                   fontWeight: "600",
//                   textTransform: "uppercase",
//                   letterSpacing: "0.1em",
//                   color: "#334155",
//                   padding: "0 12px",
//                   marginBottom: "8px",
//                 }}
//               >
//                 Navigation
//               </p>
//               {[
//                 { icon: "🏠", label: "Home", to: "/" },
//                 { icon: "🛍️", label: "All Products", to: "/products" },
//                 {
//                   icon: "🛒",
//                   label: `Cart${totalItems > 0 ? ` (${totalItems})` : ""}`,
//                   to: "/cart",
//                 },
//               ].map((item) => (
//                 <Link
//                   key={item.to}
//                   to={item.to}
//                   onClick={() => setMobileOpen(false)}
//                   style={{
//                     display: "flex",
//                     alignItems: "center",
//                     gap: "12px",
//                     padding: "12px",
//                     borderRadius: "10px",
//                     fontFamily: "DM Sans",
//                     fontSize: "14px",
//                     fontWeight: "500",
//                     color: isActive(item.to) ? "#4ade80" : "#94a3b8",
//                     background: isActive(item.to)
//                       ? "rgba(22,163,74,0.1)"
//                       : "transparent",
//                     borderLeft: isActive(item.to)
//                       ? "3px solid #16a34a"
//                       : "3px solid transparent",
//                     textDecoration: "none",
//                     marginBottom: "2px",
//                     transition: "all 0.15s",
//                   }}
//                 >
//                   <span>{item.icon}</span>
//                   {item.label}
//                 </Link>
//               ))}
//             </div>

//             {/* Categories */}
//             <div
//               style={{
//                 padding: "12px",
//                 borderBottom: "1px solid rgba(255,255,255,0.05)",
//                 flexShrink: 0,
//               }}
//             >
//               <p
//                 style={{
//                   fontFamily: "DM Sans",
//                   fontSize: "10px",
//                   fontWeight: "600",
//                   textTransform: "uppercase",
//                   letterSpacing: "0.1em",
//                   color: "#334155",
//                   padding: "0 12px",
//                   marginBottom: "8px",
//                 }}
//               >
//                 Shop by Category
//               </p>
//               {categoryLinks.map((item) => (
//                 <Link
//                   key={item.to}
//                   to={item.to}
//                   onClick={() => setMobileOpen(false)}
//                   style={{
//                     display: "flex",
//                     alignItems: "center",
//                     gap: "12px",
//                     padding: "10px 12px",
//                     borderRadius: "10px",
//                     fontFamily: "DM Sans",
//                     fontSize: "13px",
//                     color: isActive(item.to) ? "#4ade80" : "#64748b",
//                     background: isActive(item.to)
//                       ? "rgba(22,163,74,0.08)"
//                       : "transparent",
//                     textDecoration: "none",
//                     marginBottom: "2px",
//                     transition: "all 0.15s",
//                   }}
//                   onMouseEnter={(e) => {
//                     if (!isActive(item.to)) {
//                       e.currentTarget.style.background =
//                         "rgba(255,255,255,0.03)";
//                       e.currentTarget.style.color = "#e2e8f0";
//                     }
//                   }}
//                   onMouseLeave={(e) => {
//                     if (!isActive(item.to)) {
//                       e.currentTarget.style.background = "transparent";
//                       e.currentTarget.style.color = "#64748b";
//                     }
//                   }}
//                 >
//                   <span>{item.icon}</span>
//                   {item.label}
//                 </Link>
//               ))}
//             </div>

//             {/* Account */}
//             {isAuth && (
//               <div
//                 style={{
//                   padding: "12px",
//                   borderBottom: "1px solid rgba(255,255,255,0.05)",
//                   flexShrink: 0,
//                 }}
//               >
//                 <p
//                   style={{
//                     fontFamily: "DM Sans",
//                     fontSize: "10px",
//                     fontWeight: "600",
//                     textTransform: "uppercase",
//                     letterSpacing: "0.1em",
//                     color: "#334155",
//                     padding: "0 12px",
//                     marginBottom: "8px",
//                   }}
//                 >
//                   My Account
//                 </p>
//                 {[
//                   { icon: "👤", label: "My Profile", to: "/dashboard" },
//                   {
//                     icon: "📦",
//                     label: "My Orders",
//                     to: "/dashboard?tab=orders",
//                   },
//                   {
//                     icon: "❤️",
//                     label: "Wishlist",
//                     to: "/dashboard?tab=wishlist",
//                   },
//                   {
//                     icon: "📍",
//                     label: "Addresses",
//                     to: "/dashboard?tab=address",
//                   },
//                   ...(user?.role === "admin"
//                     ? [{ icon: "⚙️", label: "Admin Panel", to: "/admin" }]
//                     : []),
//                 ].map((item) => (
//                   <Link
//                     key={item.label}
//                     to={item.to}
//                     onClick={() => setMobileOpen(false)}
//                     style={{
//                       display: "flex",
//                       alignItems: "center",
//                       gap: "12px",
//                       padding: "10px 12px",
//                       borderRadius: "10px",
//                       fontFamily: "DM Sans",
//                       fontSize: "13px",
//                       color: "#64748b",
//                       textDecoration: "none",
//                       marginBottom: "2px",
//                       transition: "all 0.15s",
//                     }}
//                     onMouseEnter={(e) => {
//                       e.currentTarget.style.background =
//                         "rgba(255,255,255,0.03)";
//                       e.currentTarget.style.color = "#e2e8f0";
//                     }}
//                     onMouseLeave={(e) => {
//                       e.currentTarget.style.background = "transparent";
//                       e.currentTarget.style.color = "#64748b";
//                     }}
//                   >
//                     <span>{item.icon}</span>
//                     {item.label}
//                   </Link>
//                 ))}
//               </div>
//             )}

//             {/* Drawer Footer */}
//             <div
//               style={{
//                 marginTop: "auto",
//                 padding: "16px 16px 20px",
//                 flexShrink: 0,
//               }}
//             >
//               {isAuth && (
//                 <button
//                   onClick={handleLogout}
//                   style={{
//                     width: "100%",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     gap: "8px",
//                     padding: "12px",
//                     borderRadius: "10px",
//                     fontFamily: "DM Sans",
//                     fontSize: "14px",
//                     fontWeight: "500",
//                     background: "rgba(239,68,68,0.08)",
//                     border: "1px solid rgba(239,68,68,0.2)",
//                     color: "#f87171",
//                     cursor: "pointer",
//                     transition: "background 0.15s",
//                   }}
//                   onMouseEnter={(e) =>
//                     (e.currentTarget.style.background = "rgba(239,68,68,0.12)")
//                   }
//                   onMouseLeave={(e) =>
//                     (e.currentTarget.style.background = "rgba(239,68,68,0.08)")
//                   }
//                 >
//                   🚪 Logout
//                 </button>
//               )}
//               <p
//                 style={{
//                   textAlign: "center",
//                   fontFamily: "Amiri",
//                   fontSize: "14px",
//                   color: "#1e2d42",
//                   marginTop: "16px",
//                 }}
//               >
//                 بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
//               </p>
//             </div>
//           </div>
//         </>
//       )}

//       <style>{`
//         @keyframes slideInLeft {
//           from { transform: translateX(-100%); opacity: 0; }
//           to   { transform: translateX(0);     opacity: 1; }
//         }
//         @keyframes fadeIn {
//           from { opacity: 0; transform: translateY(-6px); }
//           to   { opacity: 1; transform: translateY(0);    }
//         }
//         .sm\\:block { display: block !important; }
//         @media (max-width: 640px) {
//           .sm\\:block { display: none !important; }
//         }
//         .hidden { display: none !important; }
//         .md\\:flex  { display: none; }
//         .md\\:block { display: none; }
//         @media (min-width: 768px) {
//           .md\\:flex   { display: flex !important; }
//           .md\\:block  { display: block !important; }
//           .md\\:hidden { display: none !important; }
//         }
//         .lg\\:hidden { display: flex; }
//         .lg\\:block  { display: none; }
//         @media (min-width: 1024px) {
//           .lg\\:hidden { display: none !important; }
//           .lg\\:block  { display: block !important; }
//         }
//       `}</style>
//     </>
//   );
// };

// export default Navbar;

import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../redux/slices/authSlice";
import { fetchCart } from "../../redux/slices/cartSlice";
import toast from "react-hot-toast";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const profileRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuth, user } = useSelector((s) => s.auth);
  const { totalItems } = useSelector((s) => s.cart);

  useEffect(() => {
    if (isAuth) dispatch(fetchCart());
  }, [isAuth]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setProfileOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    navigate(`/products?keyword=${searchQuery.trim()}`);
    setSearchQuery("");
    setSearchOpen(false);
  };

  const handleLogout = async () => {
    await dispatch(logoutUser());
    toast.success("See you soon! 🌙");
    navigate("/");
    setMobileOpen(false);
  };

  const isActive = (to) => {
    if (to === "/") return location.pathname === "/";
    return location.pathname.startsWith(to);
  };

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "All Products", to: "/products" },
    { label: "Quran", to: "/products/category/quran-and-books" },
    { label: "Tasbih", to: "/products/category/tasbih" },
    { label: "Prayer Items", to: "/products/category/prayer-items" },
    { label: "Islamic Decor", to: "/products/category/islamic-decor" },
    { label: "Attar", to: "/products/category/attar-fragrances" },
    { label: "Gifts", to: "/products/category/gift-sets" },
  ];

  const categoryLinks = [
    {
      icon: "📖",
      label: "Quran & Books",
      to: "/products/category/quran-and-books",
    },
    { icon: "📿", label: "Tasbih", to: "/products/category/tasbih" },
    {
      icon: "🧎",
      label: "Prayer Items",
      to: "/products/category/prayer-items",
    },
    {
      icon: "🕌",
      label: "Islamic Decor",
      to: "/products/category/islamic-decor",
    },
    {
      icon: "🧴",
      label: "Attar & Fragrances",
      to: "/products/category/attar-fragrances",
    },
    { icon: "🎁", label: "Gift Sets", to: "/products/category/gift-sets" },
  ];

  return (
    <>
      {/* ══════════════════════════
          ANNOUNCEMENT BAR
      ══════════════════════════ */}
      <div
        style={{
          background: "#14532d",
          color: "#dcfce7",
          textAlign: "center",
          padding: "8px 16px",
          fontSize: "12px",
          fontFamily: "DM Sans, sans-serif",
        }}
      >
        <span
          style={{
            fontFamily: "Amiri, serif",
            fontSize: "14px",
            color: "#bbf7d0",
          }}
        >
          بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
        </span>
        <span style={{ margin: "0 12px", color: "#166534" }}>|</span>
        🚚 Free shipping above ₹999
        <span style={{ margin: "0 12px", color: "#166534" }}>|</span>✅ 100%
        Authentic Products
        <span style={{ margin: "0 12px", color: "#166534" }}>|</span>
        🎁 Gift wrapping available
      </div>

      {/* ══════════════════════════
          MAIN NAVBAR
      ══════════════════════════ */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          width: "100%",
          background: scrolled ? "rgba(255,255,255,0.97)" : "#ffffff",
          borderBottom: "1px solid #e2e8f0",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          boxShadow: scrolled ? "0 2px 12px rgba(0,0,0,0.06)" : "none",
          transition: "all 0.3s",
        }}
      >
        {/* ── TOP ROW ── */}
        <div style={{ width: "100%" }}>
          <div
            style={{
              maxWidth: "1280px",
              margin: "0 auto",
              padding: "0 24px",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                height: "64px",
                gap: "16px",
                width: "100%",
              }}
            >
              {/* Logo */}
              <Link
                to="/"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  flexShrink: 0,
                  textDecoration: "none",
                }}
              >
                <div
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "linear-gradient(135deg,#16a34a,#14532d)",
                    color: "white",
                    fontFamily: "Cormorant Garamond, serif",
                    fontWeight: "bold",
                    fontSize: "22px",
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
                      fontSize: "20px",
                      lineHeight: 1,
                      color: "#0f172a",
                      letterSpacing: "0.02em",
                      margin: 0,
                    }}
                  >
                    NoorBazaar
                  </p>
                  <p
                    style={{
                      fontFamily: "Amiri, serif",
                      fontSize: "11px",
                      color: "#16a34a",
                      lineHeight: 1,
                      marginTop: "2px",
                    }}
                  >
                    نور بازار
                  </p>
                </div>
              </Link>

              {/* Search — Desktop */}
              <form
                onSubmit={handleSearch}
                className="hidden md:flex"
                style={{ flex: 1, margin: "0 8px" }}
              >
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Quran, Tasbih, Prayer Mat, Attar..."
                  style={{
                    flex: 1,
                    background: "#f8fafc",
                    border: "1px solid #e2e8f0",
                    borderRight: "none",
                    borderRadius: "10px 0 0 10px",
                    padding: "10px 16px",
                    color: "#0f172a",
                    fontFamily: "DM Sans, sans-serif",
                    fontSize: "14px",
                    outline: "none",
                    minWidth: 0,
                    transition: "border-color 0.2s",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#16a34a";
                    e.currentTarget.style.background = "#ffffff";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "#e2e8f0";
                    e.currentTarget.style.background = "#f8fafc";
                  }}
                />
                <button
                  type="submit"
                  style={{
                    background: "#16a34a",
                    borderRadius: "0 10px 10px 0",
                    padding: "0 20px",
                    minWidth: "80px",
                    color: "white",
                    fontFamily: "DM Sans, sans-serif",
                    fontSize: "14px",
                    fontWeight: "600",
                    border: "none",
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
                  Search
                </button>
              </form>

              {/* Right Actions */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  flexShrink: 0,
                }}
              >
                {/* Mobile Search */}
                <button
                  onClick={() => setSearchOpen((v) => !v)}
                  className="md:hidden"
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: searchOpen ? "#f0fdf4" : "transparent",
                    border: "none",
                    color: "#64748b",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  <svg
                    className="w-[18px] h-[18px]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>

                {/* Cart */}
                <Link
                  to={isAuth ? "/cart" : "/login"}
                  style={{
                    position: "relative",
                    width: "38px",
                    height: "38px",
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#64748b",
                    textDecoration: "none",
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
                  <svg
                    className="w-[20px] h-[20px]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                  {isAuth && totalItems > 0 && (
                    <span
                      style={{
                        position: "absolute",
                        top: "-4px",
                        right: "-4px",
                        width: "18px",
                        height: "18px",
                        background: "#16a34a",
                        color: "white",
                        fontSize: "10px",
                        fontWeight: "bold",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {totalItems > 9 ? "9+" : totalItems}
                    </span>
                  )}
                </Link>

                {/* Profile — Desktop */}
                {isAuth ? (
                  <div
                    ref={profileRef}
                    style={{ position: "relative" }}
                    className="hidden md:block"
                  >
                    <button
                      onClick={() => setProfileOpen((v) => !v)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "0 12px 0 8px",
                        height: "38px",
                        borderRadius: "10px",
                        cursor: "pointer",
                        transition: "all 0.2s",
                        background: profileOpen ? "#f0fdf4" : "#f8fafc",
                        border: profileOpen
                          ? "1px solid #bbf7d0"
                          : "1px solid #e2e8f0",
                      }}
                    >
                      <div
                        style={{
                          width: "26px",
                          height: "26px",
                          borderRadius: "8px",
                          background: "linear-gradient(135deg,#16a34a,#14532d)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "white",
                          fontSize: "12px",
                          fontWeight: "bold",
                        }}
                      >
                        {user?.name?.charAt(0).toUpperCase()}
                      </div>
                      <span
                        style={{
                          fontSize: "13px",
                          fontFamily: "DM Sans, sans-serif",
                          fontWeight: "500",
                          color: "#334155",
                          maxWidth: "80px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {user?.name?.split(" ")[0]}
                      </span>
                      <svg
                        style={{
                          width: "12px",
                          height: "12px",
                          color: "#94a3b8",
                          transform: profileOpen
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                          transition: "transform 0.2s",
                        }}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    {/* Dropdown */}
                    {profileOpen && (
                      <div
                        style={{
                          position: "absolute",
                          right: 0,
                          top: "calc(100% + 8px)",
                          width: "220px",
                          background: "#ffffff",
                          border: "1px solid #e2e8f0",
                          borderRadius: "16px",
                          overflow: "hidden",
                          boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                          animation: "slideDown 0.2s ease",
                          zIndex: 200,
                        }}
                      >
                        <div
                          style={{
                            padding: "14px 16px",
                            borderBottom: "1px solid #f1f5f9",
                            background: "#f8fffe",
                          }}
                        >
                          <p
                            style={{
                              fontFamily: "DM Sans",
                              fontSize: "14px",
                              fontWeight: "600",
                              color: "#0f172a",
                              margin: 0,
                            }}
                          >
                            {user?.name}
                          </p>
                          <p
                            style={{
                              fontFamily: "DM Sans",
                              fontSize: "11px",
                              color: "#64748b",
                              marginTop: "2px",
                            }}
                          >
                            {user?.email}
                          </p>
                          {user?.role === "admin" && (
                            <span
                              style={{
                                display: "inline-block",
                                marginTop: "6px",
                                fontSize: "10px",
                                fontFamily: "DM Sans",
                                fontWeight: "600",
                                padding: "2px 8px",
                                borderRadius: "20px",
                                background: "#dcfce7",
                                color: "#15803d",
                                border: "1px solid #bbf7d0",
                              }}
                            >
                              Admin
                            </span>
                          )}
                        </div>
                        <div style={{ padding: "6px" }}>
                          {[
                            {
                              icon: "👤",
                              label: "My Profile",
                              to: "/dashboard",
                            },
                            {
                              icon: "📦",
                              label: "My Orders",
                              to: "/dashboard?tab=orders",
                            },
                            {
                              icon: "❤️",
                              label: "Wishlist",
                              to: "/dashboard?tab=wishlist",
                            },
                            {
                              icon: "📍",
                              label: "Addresses",
                              to: "/dashboard?tab=address",
                            },
                            ...(user?.role === "admin"
                              ? [
                                  {
                                    icon: "⚙️",
                                    label: "Admin Panel",
                                    to: "/admin",
                                  },
                                ]
                              : []),
                          ].map((item) => (
                            <Link
                              key={item.label}
                              to={item.to}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                                padding: "9px 10px",
                                fontFamily: "DM Sans",
                                fontSize: "13px",
                                color: "#334155",
                                textDecoration: "none",
                                borderRadius: "8px",
                                transition: "all 0.15s",
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = "#f0fdf4";
                                e.currentTarget.style.color = "#16a34a";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background =
                                  "transparent";
                                e.currentTarget.style.color = "#334155";
                              }}
                            >
                              <span>{item.icon}</span>
                              {item.label}
                            </Link>
                          ))}
                        </div>
                        <div
                          style={{
                            padding: "6px",
                            borderTop: "1px solid #f1f5f9",
                          }}
                        >
                          <button
                            onClick={handleLogout}
                            style={{
                              width: "100%",
                              display: "flex",
                              alignItems: "center",
                              gap: "10px",
                              padding: "9px 10px",
                              fontFamily: "DM Sans",
                              fontSize: "13px",
                              color: "#ef4444",
                              background: "transparent",
                              border: "none",
                              cursor: "pointer",
                              textAlign: "left",
                              borderRadius: "8px",
                              transition: "background 0.15s",
                            }}
                            onMouseEnter={(e) =>
                              (e.currentTarget.style.background = "#fef2f2")
                            }
                            onMouseLeave={(e) =>
                              (e.currentTarget.style.background = "transparent")
                            }
                          >
                            <span>🚪</span> Logout
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div
                    className="hidden md:flex"
                    style={{
                      alignItems: "center",
                      gap: "8px",
                      marginLeft: "4px",
                    }}
                  >
                    <Link
                      to="/login"
                      style={{
                        padding: "0 16px",
                        height: "38px",
                        display: "flex",
                        alignItems: "center",
                        fontFamily: "DM Sans",
                        fontSize: "14px",
                        fontWeight: "500",
                        color: "#334155",
                        textDecoration: "none",
                        borderRadius: "10px",
                        border: "1px solid #e2e8f0",
                        transition: "all 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "#16a34a";
                        e.currentTarget.style.color = "#16a34a";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "#e2e8f0";
                        e.currentTarget.style.color = "#334155";
                      }}
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      style={{
                        padding: "0 16px",
                        height: "38px",
                        display: "flex",
                        alignItems: "center",
                        fontFamily: "DM Sans",
                        fontSize: "14px",
                        fontWeight: "600",
                        color: "white",
                        textDecoration: "none",
                        borderRadius: "10px",
                        background: "#16a34a",
                        transition: "background 0.2s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background = "#15803d")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = "#16a34a")
                      }
                    >
                      Sign Up
                    </Link>
                  </div>
                )}

                {/* Hamburger */}
                <button
                  onClick={() => setMobileOpen((v) => !v)}
                  className="lg:hidden"
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginLeft: "4px",
                    background: mobileOpen ? "#f0fdf4" : "#f8fafc",
                    border: mobileOpen
                      ? "1px solid #bbf7d0"
                      : "1px solid #e2e8f0",
                    cursor: "pointer",
                    color: "#64748b",
                    transition: "all 0.2s",
                  }}
                >
                  <div
                    style={{
                      width: "16px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px",
                    }}
                  >
                    {[
                      {
                        transform: mobileOpen
                          ? "rotate(45deg) translate(0px, 7px)"
                          : "none",
                        background: mobileOpen ? "#16a34a" : "#64748b",
                      },
                      { opacity: mobileOpen ? 0 : 1, background: "#64748b" },
                      {
                        transform: mobileOpen
                          ? "rotate(-45deg) translate(0px, -7px)"
                          : "none",
                        background: mobileOpen ? "#16a34a" : "#64748b",
                      },
                    ].map((s, i) => (
                      <span
                        key={i}
                        style={{
                          display: "block",
                          height: "2px",
                          borderRadius: "2px",
                          transition: "all 0.3s",
                          ...s,
                        }}
                      />
                    ))}
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── NAV LINKS ROW — Desktop ── */}
        <div
          className="hidden lg:block"
          style={{ borderTop: "1px solid #f1f5f9", width: "100%" }}
        >
          <div
            style={{
              maxWidth: "1280px",
              margin: "0 auto",
              padding: "0 24px",
              width: "100%",
            }}
          >
            <div
              style={{ display: "flex", alignItems: "center", height: "40px" }}
            >
              {navLinks.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  style={{
                    position: "relative",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    fontFamily: "DM Sans, sans-serif",
                    fontSize: "13px",
                    fontWeight: isActive(l.to) ? "600" : "500",
                    color: isActive(l.to) ? "#16a34a" : "#64748b",
                    textDecoration: "none",
                    padding: "0 14px",
                    whiteSpace: "nowrap",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive(l.to)) {
                      e.currentTarget.style.color = "#16a34a";
                      e.currentTarget.style.background = "#f0fdf4";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive(l.to)) {
                      e.currentTarget.style.color = "#64748b";
                      e.currentTarget.style.background = "transparent";
                    }
                  }}
                >
                  {l.label}
                  {isActive(l.to) && (
                    <span
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: "14px",
                        right: "14px",
                        height: "2px",
                        background: "#16a34a",
                        borderRadius: "2px",
                      }}
                    />
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Search */}
        {searchOpen && (
          <div
            className="md:hidden"
            style={{
              padding: "12px 16px",
              borderTop: "1px solid #e2e8f0",
              background: "#f8fafc",
            }}
          >
            <form
              onSubmit={handleSearch}
              style={{ display: "flex", gap: "8px" }}
            >
              <input
                autoFocus
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="nb-input"
                style={{ padding: "10px 14px", fontSize: "14px" }}
              />
              <button
                type="submit"
                style={{
                  padding: "0 16px",
                  borderRadius: "10px",
                  background: "#16a34a",
                  color: "white",
                  fontFamily: "DM Sans",
                  fontSize: "13px",
                  fontWeight: "600",
                  border: "none",
                  cursor: "pointer",
                  flexShrink: 0,
                }}
              >
                Go
              </button>
            </form>
          </div>
        )}
      </header>

      {/* ══════════════════════════
          MOBILE DRAWER
      ══════════════════════════ */}
      {mobileOpen && (
        <>
          <div
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 40,
              background: "rgba(0,0,0,0.3)",
            }}
            onClick={() => setMobileOpen(false)}
            className="lg:hidden"
          />

          <div
            className="lg:hidden"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              bottom: 0,
              zIndex: 50,
              width: "min(320px, 85vw)",
              background: "#ffffff",
              borderRight: "1px solid #e2e8f0",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              boxShadow: "4px 0 24px rgba(0,0,0,0.08)",
              animation: "slideInLeft 0.25s ease",
            }}
          >
            {/* Drawer Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px",
                background: "#14532d",
                flexShrink: 0,
              }}
            >
              {isAuth ? (
                <div
                  style={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  <div
                    style={{
                      width: "42px",
                      height: "42px",
                      borderRadius: "12px",
                      background: "rgba(255,255,255,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "18px",
                    }}
                  >
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p
                      style={{
                        fontFamily: "DM Sans",
                        fontSize: "14px",
                        fontWeight: "600",
                        color: "white",
                        margin: 0,
                      }}
                    >
                      {user?.name}
                    </p>
                    <p
                      style={{
                        fontFamily: "DM Sans",
                        fontSize: "11px",
                        color: "#86efac",
                        margin: 0,
                      }}
                    >
                      {user?.email}
                    </p>
                  </div>
                </div>
              ) : (
                <div>
                  <p
                    style={{
                      fontFamily: "Cormorant Garamond",
                      fontSize: "20px",
                      fontWeight: "600",
                      color: "white",
                      margin: 0,
                    }}
                  >
                    NoorBazaar
                  </p>
                  <p
                    style={{
                      fontFamily: "Amiri",
                      fontSize: "12px",
                      color: "#86efac",
                      margin: 0,
                    }}
                  >
                    نور بازار
                  </p>
                </div>
              )}
              <button
                onClick={() => setMobileOpen(false)}
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "8px",
                  background: "rgba(255,255,255,0.15)",
                  border: "none",
                  color: "white",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Auth Buttons */}
            {!isAuth && (
              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  padding: "12px 16px",
                  borderBottom: "1px solid #f1f5f9",
                  flexShrink: 0,
                }}
              >
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  style={{
                    flex: 1,
                    textAlign: "center",
                    padding: "10px",
                    fontFamily: "DM Sans",
                    fontSize: "14px",
                    fontWeight: "500",
                    borderRadius: "10px",
                    border: "1px solid #16a34a",
                    color: "#16a34a",
                    textDecoration: "none",
                  }}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileOpen(false)}
                  style={{
                    flex: 1,
                    textAlign: "center",
                    padding: "10px",
                    fontFamily: "DM Sans",
                    fontSize: "14px",
                    fontWeight: "600",
                    borderRadius: "10px",
                    background: "#16a34a",
                    color: "white",
                    textDecoration: "none",
                    border: "none",
                  }}
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Navigation */}
            <div
              style={{
                padding: "12px",
                borderBottom: "1px solid #f1f5f9",
                flexShrink: 0,
              }}
            >
              <p
                style={{
                  fontFamily: "DM Sans",
                  fontSize: "10px",
                  fontWeight: "600",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "#94a3b8",
                  padding: "0 8px",
                  marginBottom: "6px",
                }}
              >
                Navigation
              </p>
              {[
                { icon: "🏠", label: "Home", to: "/" },
                { icon: "🛍️", label: "All Products", to: "/products" },
                {
                  icon: "🛒",
                  label: `Cart${totalItems > 0 ? ` (${totalItems})` : ""}`,
                  to: "/cart",
                },
              ].map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "10px 12px",
                    borderRadius: "10px",
                    fontFamily: "DM Sans",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: isActive(item.to) ? "#16a34a" : "#334155",
                    background: isActive(item.to) ? "#f0fdf4" : "transparent",
                    textDecoration: "none",
                    marginBottom: "2px",
                    transition: "all 0.15s",
                    borderLeft: isActive(item.to)
                      ? "3px solid #16a34a"
                      : "3px solid transparent",
                  }}
                >
                  <span>{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Categories */}
            <div
              style={{
                padding: "12px",
                borderBottom: "1px solid #f1f5f9",
                flexShrink: 0,
              }}
            >
              <p
                style={{
                  fontFamily: "DM Sans",
                  fontSize: "10px",
                  fontWeight: "600",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "#94a3b8",
                  padding: "0 8px",
                  marginBottom: "6px",
                }}
              >
                Shop by Category
              </p>
              {categoryLinks.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "9px 12px",
                    borderRadius: "10px",
                    fontFamily: "DM Sans",
                    fontSize: "13px",
                    color: isActive(item.to) ? "#16a34a" : "#475569",
                    background: isActive(item.to) ? "#f0fdf4" : "transparent",
                    textDecoration: "none",
                    marginBottom: "2px",
                    transition: "all 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive(item.to)) {
                      e.currentTarget.style.background = "#f0fdf4";
                      e.currentTarget.style.color = "#16a34a";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive(item.to)) {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = "#475569";
                    }
                  }}
                >
                  <span>{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Account */}
            {isAuth && (
              <div
                style={{
                  padding: "12px",
                  borderBottom: "1px solid #f1f5f9",
                  flexShrink: 0,
                }}
              >
                <p
                  style={{
                    fontFamily: "DM Sans",
                    fontSize: "10px",
                    fontWeight: "600",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: "#94a3b8",
                    padding: "0 8px",
                    marginBottom: "6px",
                  }}
                >
                  My Account
                </p>
                {[
                  { icon: "👤", label: "My Profile", to: "/dashboard" },
                  {
                    icon: "📦",
                    label: "My Orders",
                    to: "/dashboard?tab=orders",
                  },
                  {
                    icon: "❤️",
                    label: "Wishlist",
                    to: "/dashboard?tab=wishlist",
                  },
                  {
                    icon: "📍",
                    label: "Addresses",
                    to: "/dashboard?tab=address",
                  },
                  ...(user?.role === "admin"
                    ? [{ icon: "⚙️", label: "Admin Panel", to: "/admin" }]
                    : []),
                ].map((item) => (
                  <Link
                    key={item.label}
                    to={item.to}
                    onClick={() => setMobileOpen(false)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "9px 12px",
                      borderRadius: "10px",
                      fontFamily: "DM Sans",
                      fontSize: "13px",
                      color: "#475569",
                      textDecoration: "none",
                      marginBottom: "2px",
                      transition: "all 0.15s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#f0fdf4";
                      e.currentTarget.style.color = "#16a34a";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = "#475569";
                    }}
                  >
                    <span>{item.icon}</span>
                    {item.label}
                  </Link>
                ))}
              </div>
            )}

            {/* Footer */}
            <div style={{ marginTop: "auto", padding: "16px", flexShrink: 0 }}>
              {isAuth && (
                <button
                  onClick={handleLogout}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    padding: "12px",
                    borderRadius: "10px",
                    fontFamily: "DM Sans",
                    fontSize: "14px",
                    fontWeight: "500",
                    background: "#fef2f2",
                    border: "1px solid #fecaca",
                    color: "#ef4444",
                    cursor: "pointer",
                    transition: "all 0.15s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#fee2e2")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "#fef2f2")
                  }
                >
                  🚪 Logout
                </button>
              )}
              <p
                style={{
                  textAlign: "center",
                  fontFamily: "Amiri, serif",
                  fontSize: "14px",
                  color: "#94a3b8",
                  marginTop: "16px",
                }}
              >
                بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
              </p>
            </div>
          </div>
        </>
      )}

      <style>{`
        @keyframes slideInLeft {
          from { transform: translateX(-100%); opacity: 0; }
          to   { transform: translateX(0);     opacity: 1; }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
      `}</style>
    </>
  );
};

export default Navbar;
