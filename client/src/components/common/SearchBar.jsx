import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";

const RECENT_KEY = "nb_recent_searches";
const MAX_RECENT = 5;

const SearchBar = ({ onClose, isMobile = false }) => {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const dropRef = useRef(null);

  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState({
    products: [],
    categories: [],
  });
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const [recentSearches, setRecentSearches] = useState([]);

  // Load recent searches
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(RECENT_KEY) || "[]");
      setRecentSearches(saved);
    } catch {
      setRecentSearches([]);
    }
  }, []);

  // Focus input on mount
  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 100);
  }, []);

  // Debounced search
  useEffect(() => {
    if (query.trim().length < 2) {
      setSuggestions({ products: [], categories: [] });
      setLoading(false);
      return;
    }

    setLoading(true);
    const timer = setTimeout(async () => {
      try {
        const { data } = await API.get(
          `/products/search/suggestions?q=${encodeURIComponent(query.trim())}`,
        );
        setSuggestions(data.data || { products: [], categories: [] });
      } catch {
        setSuggestions({ products: [], categories: [] });
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Close on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const saveRecentSearch = useCallback((term) => {
    try {
      const saved = JSON.parse(localStorage.getItem(RECENT_KEY) || "[]");
      const updated = [term, ...saved.filter((s) => s !== term)].slice(
        0,
        MAX_RECENT,
      );
      localStorage.setItem(RECENT_KEY, JSON.stringify(updated));
      setRecentSearches(updated);
    } catch {}
  }, []);

  const handleSearch = useCallback(
    (searchQuery) => {
      const q = (searchQuery || query).trim();
      if (!q) return;
      saveRecentSearch(q);
      setOpen(false);
      setQuery("");
      onClose?.();
      navigate(`/products?keyword=${encodeURIComponent(q)}`);
    },
    [query, navigate, onClose, saveRecentSearch],
  );

  const handleProductClick = useCallback(
    (product) => {
      saveRecentSearch(product.name);
      setOpen(false);
      setQuery("");
      onClose?.();
      navigate(`/products/${product.slug}`);
    },
    [navigate, onClose, saveRecentSearch],
  );

  const handleCategoryClick = useCallback(
    (category) => {
      setOpen(false);
      setQuery("");
      onClose?.();
      navigate(`/products?category=${category.slug}`);
    },
    [navigate, onClose],
  );

  const clearRecent = useCallback(() => {
    localStorage.removeItem(RECENT_KEY);
    setRecentSearches([]);
  }, []);

  // Keyboard navigation
  const handleKeyDown = (e) => {
    const totalItems =
      suggestions.products.length + suggestions.categories.length;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((p) => Math.min(p + 1, totalItems - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((p) => Math.max(p - 1, -1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIdx >= 0 && activeIdx < suggestions.products.length) {
        handleProductClick(suggestions.products[activeIdx]);
      } else if (activeIdx >= suggestions.products.length) {
        handleCategoryClick(
          suggestions.categories[activeIdx - suggestions.products.length],
        );
      } else {
        handleSearch();
      }
    } else if (e.key === "Escape") {
      setOpen(false);
      onClose?.();
    }
  };

  const hasResults =
    suggestions.products.length > 0 || suggestions.categories.length > 0;
  const showRecent = query.length === 0 && recentSearches.length > 0;
  const showEmpty = query.length >= 2 && !loading && !hasResults;

  return (
    <div ref={dropRef} style={{ position: "relative", width: "100%" }}>
      {/* Search Input */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          background: "#f8fafc",
          border: "1.5px solid #e2e8f0",
          borderRadius: "12px",
          padding: "0 16px",
          transition: "all 0.2s",
        }}
        onFocus={() => setOpen(true)}
      >
        {/* Search Icon */}
        <svg
          style={{
            width: "18px",
            height: "18px",
            color: "#94a3b8",
            flexShrink: 0,
            transition: "color 0.2s",
          }}
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

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
            setActiveIdx(-1);
          }}
          onKeyDown={handleKeyDown}
          onFocus={() => setOpen(true)}
          placeholder="Search products, categories..."
          style={{
            flex: 1,
            border: "none",
            background: "transparent",
            fontFamily: "DM Sans, sans-serif",
            fontSize: "14px",
            color: "#0f172a",
            outline: "none",
            padding: "12px 0",
          }}
        />

        {/* Loading spinner */}
        {loading && (
          <div
            style={{
              width: "16px",
              height: "16px",
              borderRadius: "50%",
              border: "2px solid #e2e8f0",
              borderTopColor: "#16a34a",
              animation: "spin 0.6s linear infinite",
              flexShrink: 0,
            }}
          />
        )}

        {/* Clear button */}
        {query && (
          <button
            onClick={() => {
              setQuery("");
              setSuggestions({ products: [], categories: [] });
              inputRef.current?.focus();
            }}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#94a3b8",
              padding: "4px",
              display: "flex",
              alignItems: "center",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#ef4444")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#94a3b8")}
          >
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}

        {/* Close button (mobile) */}
        {isMobile && onClose && (
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#64748b",
              padding: "4px",
              fontFamily: "DM Sans",
              fontSize: "13px",
            }}
          >
            Cancel
          </button>
        )}
      </div>

      {/* ── Dropdown ── */}
      {open && (showRecent || hasResults || showEmpty || loading) && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 8px)",
            left: 0,
            right: 0,
            background: "#ffffff",
            borderRadius: "16px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 16px 48px rgba(0,0,0,0.12)",
            zIndex: 9999,
            overflow: "hidden",
            maxHeight: "480px",
            overflowY: "auto",
          }}
        >
          {/* ── Recent Searches ── */}
          {showRecent && (
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "12px 16px 8px",
                  borderBottom: "1px solid #f8fafc",
                }}
              >
                <p
                  style={{
                    fontFamily: "DM Sans",
                    fontSize: "11px",
                    fontWeight: "700",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: "#94a3b8",
                    margin: 0,
                  }}
                >
                  Recent Searches
                </p>
                <button
                  onClick={clearRecent}
                  style={{
                    fontFamily: "DM Sans",
                    fontSize: "11px",
                    color: "#94a3b8",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#ef4444")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#94a3b8")
                  }
                >
                  Clear all
                </button>
              </div>
              {recentSearches.map((term) => (
                <div
                  key={term}
                  onClick={() => handleSearch(term)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "10px 16px",
                    cursor: "pointer",
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#f8fafc")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                >
                  <svg
                    style={{
                      width: "14px",
                      height: "14px",
                      color: "#94a3b8",
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
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span
                    style={{
                      fontFamily: "DM Sans",
                      fontSize: "13px",
                      color: "#64748b",
                    }}
                  >
                    {term}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* ── Product Suggestions ── */}
          {suggestions.products.length > 0 && (
            <div>
              <p
                style={{
                  fontFamily: "DM Sans",
                  fontSize: "11px",
                  fontWeight: "700",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "#94a3b8",
                  margin: 0,
                  padding: "12px 16px 8px",
                  borderBottom: "1px solid #f8fafc",
                }}
              >
                Products
              </p>
              {suggestions.products.map((product, idx) => (
                <div
                  key={product._id}
                  onClick={() => handleProductClick(product)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "10px 16px",
                    cursor: "pointer",
                    transition: "background 0.15s",
                    background: activeIdx === idx ? "#f0fdf4" : "transparent",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#f0fdf4";
                    setActiveIdx(idx);
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background =
                      activeIdx === idx ? "#f0fdf4" : "transparent";
                  }}
                >
                  <img
                    src={product.images?.[0]?.url}
                    alt={product.name}
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "8px",
                      objectFit: "cover",
                      background: "#f8fafc",
                      border: "1px solid #e2e8f0",
                      flexShrink: 0,
                    }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p
                      style={{
                        fontFamily: "DM Sans",
                        fontSize: "13px",
                        fontWeight: "600",
                        color: "#0f172a",
                        margin: "0 0 2px 0",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {/* Highlight matching text */}
                      {highlightText(product.name, query)}
                    </p>
                    <p
                      style={{
                        fontFamily: "DM Sans",
                        fontSize: "11px",
                        color: "#94a3b8",
                        margin: 0,
                      }}
                    >
                      {product.category?.name}
                    </p>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <p
                      style={{
                        fontFamily: "Cormorant Garamond, serif",
                        fontSize: "15px",
                        fontWeight: "700",
                        color: "#16a34a",
                        margin: 0,
                      }}
                    >
                      ₹{product.price?.toLocaleString()}
                    </p>
                    {product.originalPrice &&
                      product.originalPrice > product.price && (
                        <p
                          style={{
                            fontFamily: "DM Sans",
                            fontSize: "11px",
                            color: "#94a3b8",
                            textDecoration: "line-through",
                            margin: 0,
                          }}
                        >
                          ₹{product.originalPrice?.toLocaleString()}
                        </p>
                      )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── Category Suggestions ── */}
          {suggestions.categories.length > 0 && (
            <div
              style={{
                borderTop:
                  suggestions.products.length > 0
                    ? "1px solid #f8fafc"
                    : "none",
              }}
            >
              <p
                style={{
                  fontFamily: "DM Sans",
                  fontSize: "11px",
                  fontWeight: "700",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "#94a3b8",
                  margin: 0,
                  padding: "12px 16px 8px",
                }}
              >
                Categories
              </p>
              {suggestions.categories.map((cat, idx) => (
                <div
                  key={cat._id}
                  onClick={() => handleCategoryClick(cat)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "10px 16px",
                    cursor: "pointer",
                    transition: "background 0.15s",
                    background:
                      activeIdx === suggestions.products.length + idx
                        ? "#f0fdf4"
                        : "transparent",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#f0fdf4";
                    setActiveIdx(suggestions.products.length + idx);
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "8px",
                      background: "#f0fdf4",
                      border: "1px solid #bbf7d0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "16px",
                      flexShrink: 0,
                    }}
                  >
                    🗂️
                  </div>
                  <div>
                    <p
                      style={{
                        fontFamily: "DM Sans",
                        fontSize: "13px",
                        fontWeight: "600",
                        color: "#0f172a",
                        margin: "0 0 1px 0",
                      }}
                    >
                      {highlightText(cat.name, query)}
                    </p>
                    {cat.nameArabic && (
                      <p
                        style={{
                          fontFamily: "Amiri, serif",
                          fontSize: "12px",
                          color: "#16a34a",
                          margin: 0,
                        }}
                      >
                        {cat.nameArabic}
                      </p>
                    )}
                  </div>
                  <svg
                    style={{
                      width: "14px",
                      height: "14px",
                      color: "#94a3b8",
                      marginLeft: "auto",
                    }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              ))}
            </div>
          )}

          {/* ── View All Results ── */}
          {hasResults && (
            <div
              onClick={() => handleSearch()}
              style={{
                padding: "12px 16px",
                borderTop: "1px solid #f0fdf4",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#f0fdf4")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              <svg
                style={{ width: "16px", height: "16px", color: "#16a34a" }}
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
              <span
                style={{
                  fontFamily: "DM Sans",
                  fontSize: "13px",
                  fontWeight: "600",
                  color: "#16a34a",
                }}
              >
                View all results for "{query}"
              </span>
            </div>
          )}

          {/* ── Empty State ── */}
          {showEmpty && (
            <div style={{ padding: "32px 16px", textAlign: "center" }}>
              <div style={{ fontSize: "32px", marginBottom: "8px" }}>🔍</div>
              <p
                style={{
                  fontFamily: "DM Sans",
                  fontSize: "14px",
                  color: "#64748b",
                  margin: 0,
                }}
              >
                No results for "<strong>{query}</strong>"
              </p>
              <p
                style={{
                  fontFamily: "DM Sans",
                  fontSize: "12px",
                  color: "#94a3b8",
                  margin: "4px 0 0 0",
                }}
              >
                Try a different search term
              </p>
            </div>
          )}
        </div>
      )}

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

// ── Highlight matching text ──
const highlightText = (text, query) => {
  if (!query || !text) return text;
  const parts = text.split(new RegExp(`(${query})`, "gi"));
  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <mark
        key={i}
        style={{
          background: "#dcfce7",
          color: "#15803d",
          borderRadius: "2px",
          padding: "0 1px",
        }}
      >
        {part}
      </mark>
    ) : (
      part
    ),
  );
};

export default SearchBar;
