import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAdminUsers,
  toggleUserStatus,
} from "../../redux/slices/adminSlice";
import toast from "react-hot-toast";

const AdminUsers = () => {
  const dispatch = useDispatch();
  const { users, loading } = useSelector((s) => s.admin);
  const [search, setSearch] = useState("");
  const [toggling, setToggling] = useState(null);

  useEffect(() => {
    dispatch(fetchAdminUsers());
  }, []);

  const handleToggle = async (userId) => {
    setToggling(userId);
    const r = await dispatch(toggleUserStatus(userId));
    setToggling(null);
    if (r.meta.requestStatus === "fulfilled")
      toast.success("User status updated");
    else toast.error(r.payload || "Failed");
  };

  const filtered = users.filter(
    (u) =>
      !search ||
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div>
        <h2
          style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: "26px",
            fontWeight: "600",
            color: "#0f172a",
            margin: 0,
          }}
        >
          Users
        </h2>
        <p
          style={{
            fontFamily: "DM Sans",
            fontSize: "13px",
            color: "#64748b",
            margin: "2px 0 0 0",
          }}
        >
          {users.length} registered users
        </p>
      </div>

      <input
        type="text"
        placeholder="Search by name or email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          maxWidth: "360px",
          background: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: "10px",
          padding: "9px 14px",
          fontFamily: "DM Sans",
          fontSize: "13px",
          color: "#0f172a",
          outline: "none",
        }}
        onFocus={(e) => (e.currentTarget.style.borderColor = "#16a34a")}
        onBlur={(e) => (e.currentTarget.style.borderColor = "#e2e8f0")}
      />

      {loading ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                style={{
                  height: "56px",
                  borderRadius: "10px",
                  background: "#f0fdf4",
                  animation: "shimmer 1.5s infinite",
                }}
              />
            ))}
        </div>
      ) : (
        <div
          style={{
            background: "#ffffff",
            borderRadius: "16px",
            border: "1px solid #e2e8f0",
            overflow: "hidden",
          }}
        >
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontFamily: "DM Sans",
                minWidth: "600px",
              }}
            >
              <thead
                style={{
                  background: "#f8fafc",
                  borderBottom: "1px solid #e2e8f0",
                }}
              >
                <tr>
                  {[
                    "User",
                    "Email",
                    "Phone",
                    "Role",
                    "Joined",
                    "Status",
                    "Action",
                  ].map((h) => (
                    <th
                      key={h}
                      style={{
                        textAlign: "left",
                        padding: "12px 16px",
                        fontSize: "11px",
                        fontWeight: "700",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        color: "#94a3b8",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((user) => (
                  <tr
                    key={user._id}
                    style={{
                      borderBottom: "1px solid #f8fafc",
                      transition: "background 0.15s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "#f8fffe")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "transparent")
                    }
                  >
                    <td style={{ padding: "12px 16px" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <div
                          style={{
                            width: "32px",
                            height: "32px",
                            borderRadius: "8px",
                            background:
                              "linear-gradient(135deg,#16a34a,#14532d)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "white",
                            fontWeight: "700",
                            fontSize: "13px",
                            flexShrink: 0,
                          }}
                        >
                          {user.name?.charAt(0).toUpperCase()}
                        </div>
                        <span
                          style={{
                            fontFamily: "DM Sans",
                            fontSize: "13px",
                            fontWeight: "600",
                            color: "#0f172a",
                          }}
                        >
                          {user.name}
                        </span>
                      </div>
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        fontSize: "13px",
                        color: "#64748b",
                      }}
                    >
                      {user.email}
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        fontSize: "13px",
                        color: "#64748b",
                      }}
                    >
                      {user.phone || "—"}
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <span
                        style={{
                          fontSize: "11px",
                          fontWeight: "700",
                          padding: "3px 10px",
                          borderRadius: "20px",
                          background:
                            user.role === "admin" ? "#f0fdf4" : "#f8fafc",
                          color: user.role === "admin" ? "#16a34a" : "#64748b",
                          border:
                            user.role === "admin"
                              ? "1px solid #bbf7d0"
                              : "1px solid #e2e8f0",
                        }}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        fontSize: "12px",
                        color: "#94a3b8",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {new Date(user.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <span
                        style={{
                          fontSize: "11px",
                          fontWeight: "600",
                          padding: "3px 10px",
                          borderRadius: "20px",
                          background:
                            user.isActive !== false ? "#f0fdf4" : "#fff5f5",
                          color:
                            user.isActive !== false ? "#16a34a" : "#dc2626",
                        }}
                      >
                        {user.isActive !== false ? "Active" : "Blocked"}
                      </span>
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <button
                        onClick={() => handleToggle(user._id)}
                        disabled={
                          toggling === user._id || user.role === "admin"
                        }
                        style={{
                          padding: "5px 14px",
                          borderRadius: "8px",
                          fontFamily: "DM Sans",
                          fontSize: "12px",
                          fontWeight: "600",
                          cursor:
                            user.role === "admin" ? "not-allowed" : "pointer",
                          opacity:
                            toggling === user._id || user.role === "admin"
                              ? 0.5
                              : 1,
                          background:
                            user.isActive !== false ? "#fff5f5" : "#f0fdf4",
                          color:
                            user.isActive !== false ? "#dc2626" : "#16a34a",
                          border:
                            user.isActive !== false
                              ? "1px solid #fca5a5"
                              : "1px solid #bbf7d0",
                          transition: "all 0.2s",
                        }}
                      >
                        {toggling === user._id
                          ? "..."
                          : user.isActive !== false
                            ? "Block"
                            : "Unblock"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <p
              style={{
                fontFamily: "DM Sans",
                fontSize: "14px",
                color: "#94a3b8",
                textAlign: "center",
                padding: "48px 0",
                margin: 0,
              }}
            >
              No users found
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
