import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../redux/slices/authSlice";
import { fetchCart } from "../../redux/slices/cartSlice";
import SearchBar from "./SearchBar";
import toast from "react-hot-toast";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const profileRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuth, user } = useSelector((s) => s.auth);
  const { totalItems } = useSelector((s) => s.cart);

  useEffect(() => {
    if (isAuth) dispatch(fetchCart());
  }, [isAuth, dispatch]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
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
    { label: "Compare ⚖️", to: "/compare" },
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

  const accountLinks = [
    { icon: "👤", label: "My Profile", to: "/dashboard" },
    { icon: "📦", label: "My Orders", to: "/dashboard?tab=orders" },
    { icon: "❤️", label: "Wishlist", to: "/dashboard?tab=wishlist" },
    { icon: "📍", label: "Addresses", to: "/dashboard?tab=address" },
    { icon: "🎟️", label: "Coupons", to: "/coupons" }, // ← ADD THIS
    { label: "Compare ⚖️", to: "/compare" },
    ...(user?.role === "admin"
      ? [{ icon: "⚙️", label: "Admin Panel", to: "/admin" }]
      : []),
  ];
  return (
    <>
      {/* ── Announcement Bar ── */}
      <div
        className="nb-announce"
        style={{
          background: "#14532d",
          color: "#dcfce7",
          textAlign: "center",
          padding: "7px 16px",
          fontSize: "12px",
          fontFamily: "DM Sans, sans-serif",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: "6px",
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
        <span className="nb-sep" style={{ color: "#166534" }}>
          |
        </span>
        <span>🚚 Free shipping above ₹999</span>
        <span className="nb-sep" style={{ color: "#166534" }}>
          |
        </span>
        <span>✅ 100% Authentic Products</span>
        <span className="nb-sep" style={{ color: "#166534" }}>
          |
        </span>
        <span>🎁 Gift wrapping available</span>
      </div>

      {/* ── Main Header ── */}
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
          transition: "all 0.3s ease",
        }}
      >
        {/* ── Top Row ── */}
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 clamp(12px,3vw,24px)",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              height: "clamp(52px,8vw,64px)",
              gap: "clamp(8px,1.5vw,16px)",
              width: "100%",
            }}
          >
            {/* Logo */}
            <Link
              to="/"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "clamp(6px,1vw,10px)",
                flexShrink: 0,
                textDecoration: "none",
              }}
            >
              <div
                style={{
                  width: "clamp(32px,5vw,38px)",
                  height: "clamp(32px,5vw,38px)",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "linear-gradient(135deg,#16a34a,#14532d)",
                  color: "white",
                  fontFamily: "Cormorant Garamond, serif",
                  fontWeight: "bold",
                  fontSize: "clamp(18px,3vw,22px)",
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
                    fontSize: "clamp(15px,2.5vw,20px)",
                    lineHeight: 1,
                    color: "#0f172a",
                    letterSpacing: "0.02em",
                    margin: 0,
                  }}
                >
                  NoorBazaar
                </p>
                <p
                  className="nb-logo-sub"
                  style={{
                    fontFamily: "Amiri, serif",
                    fontSize: "11px",
                    color: "#16a34a",
                    lineHeight: 1,
                    marginTop: "2px",
                    marginBottom: 0,
                  }}
                >
                  نور بازار
                </p>
              </div>
            </Link>

            {/* Search — Desktop */}
            <div
              className="nb-search-desktop"
              style={{ flex: 1, margin: "0 48px", maxWidth: "880px" }}
            >
              <SearchBar />
            </div>

            {/* Right Actions */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "clamp(2px,0.5vw,4px)",
                flexShrink: 0,
                marginLeft: "auto",
              }}
            >
              {/* Mobile Search Toggle */}
              <button
                onClick={() => setSearchOpen((v) => !v)}
                className="nb-search-toggle"
                style={{
                  width: "clamp(32px,5vw,38px)",
                  height: "clamp(32px,5vw,38px)",
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
                  style={{ width: "18px", height: "18px" }}
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
                  width: "clamp(32px,5vw,38px)",
                  height: "clamp(32px,5vw,38px)",
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
                  style={{ width: "20px", height: "20px" }}
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
                      top: "-3px",
                      right: "-3px",
                      width: "17px",
                      height: "17px",
                      background: "#16a34a",
                      color: "white",
                      fontSize: "9px",
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

              {/* Profile Dropdown — Desktop */}
              {isAuth && (
                <div
                  ref={profileRef}
                  style={{ position: "relative" }}
                  className="nb-profile-desktop"
                >
                  <button
                    onClick={() => setProfileOpen((v) => !v)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "0 10px 0 7px",
                      height: "clamp(32px,5vw,38px)",
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
                        width: "24px",
                        height: "24px",
                        borderRadius: "7px",
                        background: "linear-gradient(135deg,#16a34a,#14532d)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        fontSize: "11px",
                        fontWeight: "bold",
                        flexShrink: 0,
                      }}
                    >
                      {user?.name?.charAt(0).toUpperCase()}
                    </div>
                    <span
                      style={{
                        fontSize: "12px",
                        fontFamily: "DM Sans",
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
                        transform: profileOpen ? "rotate(180deg)" : "none",
                        transition: "transform 0.2s",
                        flexShrink: 0,
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
                        animation: "nbSlideDown 0.2s ease",
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
                            margin: "2px 0 0 0",
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
                        {accountLinks.map((item) => (
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
                              e.currentTarget.style.background = "transparent";
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
              )}

              {/* Auth Buttons — Desktop */}
              {!isAuth && (
                <div
                  className="nb-auth-desktop"
                  style={{ display: "flex", alignItems: "center", gap: "6px" }}
                >
                  <Link
                    to="/login"
                    style={{
                      padding: "0 14px",
                      height: "clamp(32px,5vw,38px)",
                      display: "flex",
                      alignItems: "center",
                      fontFamily: "DM Sans",
                      fontSize: "13px",
                      fontWeight: "500",
                      color: "#334155",
                      textDecoration: "none",
                      borderRadius: "10px",
                      border: "1px solid #e2e8f0",
                      transition: "all 0.2s",
                      whiteSpace: "nowrap",
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
                      padding: "0 14px",
                      height: "clamp(32px,5vw,38px)",
                      display: "flex",
                      alignItems: "center",
                      fontFamily: "DM Sans",
                      fontSize: "13px",
                      fontWeight: "600",
                      color: "white",
                      textDecoration: "none",
                      borderRadius: "10px",
                      background: "#16a34a",
                      transition: "background 0.2s",
                      whiteSpace: "nowrap",
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
                className="nb-hamburger"
                style={{
                  width: "clamp(32px,5vw,38px)",
                  height: "clamp(32px,5vw,38px)",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginLeft: "2px",
                  background: mobileOpen ? "#f0fdf4" : "#f8fafc",
                  border: mobileOpen
                    ? "1px solid #bbf7d0"
                    : "1px solid #e2e8f0",
                  cursor: "pointer",
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
                        ? "rotate(45deg) translate(0,7px)"
                        : "none",
                      background: mobileOpen ? "#16a34a" : "#64748b",
                    },
                    { opacity: mobileOpen ? 0 : 1, background: "#64748b" },
                    {
                      transform: mobileOpen
                        ? "rotate(-45deg) translate(0,-7px)"
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

        {/* ── Nav Links Row ── */}
        <div
          className="nb-navlinks"
          style={{ borderTop: "1px solid #f1f5f9", width: "100%" }}
        >
          <div
            style={{
              maxWidth: "1280px",
              margin: "0 auto",
              padding: "0 clamp(12px,3vw,24px)",
              width: "100%",
              overflowX: "auto",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                height: "40px",
                gap: "0",
              }}
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
                    fontFamily: "DM Sans",
                    fontSize: "clamp(11px,1.2vw,13px)",
                    fontWeight: isActive(l.to) ? "600" : "500",
                    color: isActive(l.to) ? "#16a34a" : "#64748b",
                    textDecoration: "none",
                    padding: "0 clamp(8px,1.2vw,14px)",
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
                        left: "8px",
                        right: "8px",
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

        {/* ── Mobile Search Dropdown ── */}
        <div
          className="nb-mobile-search"
          style={{
            display: "none",
            padding: "12px 16px",
            borderTop: "1px solid #e2e8f0",
            background: "#ffffff",
          }}
        >
          <SearchBar isMobile={true} onClose={() => setSearchOpen(false)} />
        </div>
      </header>

      {/* ── Mobile Drawer Overlay ── */}
      {mobileOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 40,
            background: "rgba(0,0,0,0.35)",
          }}
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ── Mobile Drawer ── */}
      {mobileOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            bottom: 0,
            zIndex: 50,
            width: "min(300px, 82vw)",
            background: "#ffffff",
            borderRight: "1px solid #e2e8f0",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            boxShadow: "4px 0 24px rgba(0,0,0,0.1)",
            animation: "nbSlideInLeft 0.25s ease",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "14px 16px",
              background: "#14532d",
              flexShrink: 0,
            }}
          >
            {isAuth ? (
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <div
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "10px",
                    background: "rgba(255,255,255,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "16px",
                  }}
                >
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
                <div style={{ overflow: "hidden" }}>
                  <p
                    style={{
                      fontFamily: "DM Sans",
                      fontSize: "13px",
                      fontWeight: "600",
                      color: "white",
                      margin: 0,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {user?.name}
                  </p>
                  <p
                    style={{
                      fontFamily: "DM Sans",
                      fontSize: "10px",
                      color: "#86efac",
                      margin: 0,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
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
                    fontSize: "18px",
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
                    fontSize: "11px",
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
                width: "28px",
                height: "28px",
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
                style={{ width: "14px", height: "14px" }}
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
                padding: "12px",
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
                  padding: "9px",
                  fontFamily: "DM Sans",
                  fontSize: "13px",
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
                  padding: "9px",
                  fontFamily: "DM Sans",
                  fontSize: "13px",
                  fontWeight: "600",
                  borderRadius: "10px",
                  background: "#16a34a",
                  color: "white",
                  textDecoration: "none",
                }}
              >
                Sign Up
              </Link>
            </div>
          )}

          {/* Navigation */}
          {[
            {
              title: "Navigation",
              items: [
                { icon: "🏠", label: "Home", to: "/" },
                { icon: "🛍️", label: "All Products", to: "/products" },
                {
                  icon: "🛒",
                  label: `Cart${totalItems > 0 ? ` (${totalItems})` : ""}`,
                  to: "/cart",
                },
              ],
            },
            {
              title: "Shop by Category",
              items: categoryLinks,
            },
            ...(isAuth
              ? [
                  {
                    title: "My Account",
                    items: accountLinks,
                  },
                ]
              : []),
          ].map((section) => (
            <div
              key={section.title}
              style={{
                padding: "10px 12px",
                borderBottom: "1px solid #f1f5f9",
                flexShrink: 0,
              }}
            >
              <p
                style={{
                  fontFamily: "DM Sans",
                  fontSize: "9px",
                  fontWeight: "700",
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: "#94a3b8",
                  padding: "0 6px",
                  marginBottom: "6px",
                  marginTop: 0,
                }}
              >
                {section.title}
              </p>
              {section.items.map((item) => (
                <Link
                  key={item.label || item.to}
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "8px 10px",
                    borderRadius: "10px",
                    fontFamily: "DM Sans",
                    fontSize: "13px",
                    fontWeight: "500",
                    color: isActive(item.to) ? "#16a34a" : "#475569",
                    background: isActive(item.to) ? "#f0fdf4" : "transparent",
                    textDecoration: "none",
                    marginBottom: "2px",
                    transition: "all 0.15s",
                    borderLeft: isActive(item.to)
                      ? "3px solid #16a34a"
                      : "3px solid transparent",
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
          ))}

          {/* Footer */}
          <div style={{ marginTop: "auto", padding: "14px", flexShrink: 0 }}>
            {isAuth && (
              <button
                onClick={handleLogout}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  padding: "10px",
                  borderRadius: "10px",
                  fontFamily: "DM Sans",
                  fontSize: "13px",
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
                fontSize: "13px",
                color: "#94a3b8",
                marginTop: "12px",
                marginBottom: 0,
              }}
            >
              بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
            </p>
          </div>
        </div>
      )}

      {/* ── Responsive CSS ── */}
      <style>{`
        /* Desktop → show searchbar, hide toggle + hamburger */
        .nb-search-desktop  { display: block !important; }
        .nb-search-toggle   { display: none  !important; }
        .nb-mobile-search   { display: none  !important; }
        .nb-navlinks        { display: block !important; }
        .nb-profile-desktop { display: block !important; }
        .nb-auth-desktop    { display: flex  !important; }
        .nb-hamburger       { display: none  !important; }

        /* Tablet (768–1023px) */
        @media (max-width: 1023px) {
          .nb-navlinks  { display: none !important; }
          .nb-hamburger { display: flex !important; }
        }

        /* Mobile (<768px) */
        @media (max-width: 767px) {
          .nb-search-desktop  { display: none  !important; }
          .nb-search-toggle   { display: flex  !important; }
          .nb-profile-desktop { display: none  !important; }
          .nb-auth-desktop    { display: none  !important; }
          .nb-logo-sub        { display: none  !important; }
          .nb-sep             { display: none  !important; }
        }

        /* Show mobile search when open */
        .nb-mobile-search.open { display: block !important; }

        @keyframes nbSlideInLeft {
          from { transform: translateX(-100%); opacity: 0; }
          to   { transform: translateX(0);     opacity: 1; }
        }
        @keyframes nbSlideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0);    }
        }

        body { overflow-x: hidden; }
      `}</style>
    </>
  );
};

export default Navbar;
