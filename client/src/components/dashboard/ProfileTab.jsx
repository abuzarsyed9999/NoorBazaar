// import { useState, useCallback } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { setCredentials } from "../../redux/slices/authSlice";
// import API from "../../services/api";
// import toast from "react-hot-toast";

// const ProfileTab = () => {
//   const dispatch = useDispatch();
//   const { user } = useSelector((s) => s.auth);

//   const [name, setName] = useState(user?.name || "");
//   const [phone, setPhone] = useState(user?.phone || "");
//   const [currPass, setCurrPass] = useState("");
//   const [newPass, setNewPass] = useState("");
//   const [confirmPass, setConfirmPass] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [passLoading, setPassLoading] = useState(false);

//   const handleProfile = useCallback(
//     async (e) => {
//       e.preventDefault();
//       setLoading(true);
//       try {
//         const { data } = await API.put("/users/profile", { name, phone });
//         dispatch(
//           setCredentials({
//             user: data.data,
//             token: localStorage.getItem("token"),
//           }),
//         );
//         localStorage.setItem("user", JSON.stringify(data.data));
//         toast.success("Profile updated successfully!");
//       } catch (err) {
//         toast.error(err.response?.data?.message || "Failed to update");
//       } finally {
//         setLoading(false);
//       }
//     },
//     [name, phone, dispatch],
//   );

//   const handlePassword = useCallback(
//     async (e) => {
//       e.preventDefault();
//       if (newPass !== confirmPass) {
//         toast.error("Passwords do not match");
//         return;
//       }
//       if (newPass.length < 8) {
//         toast.error("Password must be at least 8 characters");
//         return;
//       }
//       setPassLoading(true);
//       try {
//         await API.put("/auth/update-password", {
//           currentPassword: currPass,
//           newPassword: newPass,
//           confirmPassword: confirmPass,
//         });
//         setCurrPass("");
//         setNewPass("");
//         setConfirmPass("");
//         toast.success("Password updated successfully!");
//       } catch (err) {
//         toast.error(err.response?.data?.message || "Failed to update password");
//       } finally {
//         setPassLoading(false);
//       }
//     },
//     [currPass, newPass, confirmPass],
//   );

//   return (
//     <div className="space-y-5">
//       {/* ── Profile Info ── */}
//       <div
//         className="p-6 rounded-2xl"
//         style={{
//           background: "#162032",
//           border: "1px solid rgba(255,255,255,0.05)",
//         }}
//       >
//         <p
//           className="font-dm font-semibold text-sm mb-5"
//           style={{ color: "#e2e8f0" }}
//         >
//           👤 Personal Information
//         </p>

//         <form onSubmit={handleProfile} className="space-y-4">
//           <div className="grid sm:grid-cols-2 gap-4">
//             <div>
//               <label
//                 className="block font-dm text-xs font-medium mb-1.5"
//                 style={{ color: "#64748b" }}
//               >
//                 Full Name
//               </label>
//               <input
//                 type="text"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 className="nb-input"
//                 placeholder="Your name"
//               />
//             </div>
//             <div>
//               <label
//                 className="block font-dm text-xs font-medium mb-1.5"
//                 style={{ color: "#64748b" }}
//               >
//                 Phone Number
//               </label>
//               <input
//                 type="tel"
//                 value={phone}
//                 onChange={(e) => setPhone(e.target.value)}
//                 className="nb-input"
//                 placeholder="10 digit phone"
//               />
//             </div>
//           </div>

//           {/* Email (readonly) */}
//           <div>
//             <label
//               className="block font-dm text-xs font-medium mb-1.5"
//               style={{ color: "#64748b" }}
//             >
//               Email Address
//             </label>
//             <input
//               type="email"
//               value={user?.email}
//               className="nb-input opacity-50 cursor-not-allowed"
//               readOnly
//             />
//             <p
//               className="font-dm text-[10px] mt-1"
//               style={{ color: "#334155" }}
//             >
//               Email cannot be changed
//             </p>
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="px-6 py-2.5 rounded-xl font-dm text-sm font-semibold text-white transition-opacity disabled:opacity-60"
//             style={{ background: "#16a34a" }}
//           >
//             {loading ? "Saving..." : "Save Changes"}
//           </button>
//         </form>
//       </div>

//       {/* ── Change Password ── */}
//       <div
//         className="p-6 rounded-2xl"
//         style={{
//           background: "#162032",
//           border: "1px solid rgba(255,255,255,0.05)",
//         }}
//       >
//         <p
//           className="font-dm font-semibold text-sm mb-5"
//           style={{ color: "#e2e8f0" }}
//         >
//           🔒 Change Password
//         </p>

//         <form onSubmit={handlePassword} className="space-y-4">
//           <div>
//             <label
//               className="block font-dm text-xs font-medium mb-1.5"
//               style={{ color: "#64748b" }}
//             >
//               Current Password
//             </label>
//             <input
//               type="password"
//               value={currPass}
//               onChange={(e) => setCurrPass(e.target.value)}
//               className="nb-input"
//               placeholder="••••••••"
//               required
//             />
//           </div>
//           <div className="grid sm:grid-cols-2 gap-4">
//             <div>
//               <label
//                 className="block font-dm text-xs font-medium mb-1.5"
//                 style={{ color: "#64748b" }}
//               >
//                 New Password
//               </label>
//               <input
//                 type="password"
//                 value={newPass}
//                 onChange={(e) => setNewPass(e.target.value)}
//                 className="nb-input"
//                 placeholder="Min 8 characters"
//                 required
//               />
//             </div>
//             <div>
//               <label
//                 className="block font-dm text-xs font-medium mb-1.5"
//                 style={{ color: "#64748b" }}
//               >
//                 Confirm Password
//               </label>
//               <input
//                 type="password"
//                 value={confirmPass}
//                 onChange={(e) => setConfirmPass(e.target.value)}
//                 className="nb-input"
//                 placeholder="Repeat password"
//                 required
//               />
//             </div>
//           </div>

//           <button
//             type="submit"
//             disabled={passLoading}
//             className="px-6 py-2.5 rounded-xl font-dm text-sm font-semibold text-white transition-opacity disabled:opacity-60"
//             style={{ background: "#16a34a" }}
//           >
//             {passLoading ? "Updating..." : "Update Password"}
//           </button>
//         </form>
//       </div>

//       {/* ── Account Stats ── */}
//       <div className="grid grid-cols-3 gap-3">
//         {[
//           { icon: "📦", label: "Total Orders", value: "—" },
//           { icon: "❤️", label: "Wishlist Items", value: "—" },
//           { icon: "⭐", label: "Reviews Given", value: "—" },
//         ].map((s) => (
//           <div
//             key={s.label}
//             className="p-4 rounded-2xl text-center"
//             style={{
//               background: "#162032",
//               border: "1px solid rgba(255,255,255,0.05)",
//             }}
//           >
//             <div className="text-2xl mb-1">{s.icon}</div>
//             <p
//               className="font-cormorant font-semibold text-xl"
//               style={{ color: "#4ade80" }}
//             >
//               {s.value}
//             </p>
//             <p className="font-dm text-[10px]" style={{ color: "#475569" }}>
//               {s.label}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProfileTab;

import { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCredentials } from "../../redux/slices/authSlice";
import API from "../../services/api";
import toast from "react-hot-toast";

const ProfileTab = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((s) => s.auth);

  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [currPass, setCurrPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [passLoading, setPassLoading] = useState(false);

  const handleProfile = useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
        const { data } = await API.put("/users/profile", { name, phone });
        dispatch(
          setCredentials({
            user: data.data,
            token: localStorage.getItem("token"),
          }),
        );
        localStorage.setItem("user", JSON.stringify(data.data));
        toast.success("Profile updated successfully!");
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to update");
      } finally {
        setLoading(false);
      }
    },
    [name, phone, dispatch],
  );

  const handlePassword = useCallback(
    async (e) => {
      e.preventDefault();
      if (newPass !== confirmPass) {
        toast.error("Passwords do not match");
        return;
      }
      if (newPass.length < 8) {
        toast.error("Password must be at least 8 characters");
        return;
      }
      setPassLoading(true);
      try {
        await API.put("/auth/update-password", {
          currentPassword: currPass,
          newPassword: newPass,
          confirmPassword: confirmPass,
        });
        setCurrPass("");
        setNewPass("");
        setConfirmPass("");
        toast.success("Password updated successfully!");
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to update password");
      } finally {
        setPassLoading(false);
      }
    },
    [currPass, newPass, confirmPass],
  );

  const inputStyle = {
    width: "100%",
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: "10px",
    padding: "10px 14px",
    fontFamily: "DM Sans, sans-serif",
    fontSize: "14px",
    color: "#0f172a",
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
    boxSizing: "border-box",
  };

  const cardStyle = {
    padding: "clamp(16px,3vw,24px)",
    borderRadius: "16px",
    background: "#ffffff",
    border: "1px solid #e2e8f0",
  };

  const labelStyle = {
    display: "block",
    fontFamily: "DM Sans",
    fontSize: "13px",
    fontWeight: "500",
    color: "#64748b",
    marginBottom: "6px",
  };

  const onFocus = (e) => {
    e.currentTarget.style.borderColor = "#16a34a";
    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(22,163,74,0.1)";
  };
  const onBlur = (e) => {
    e.currentTarget.style.borderColor = "#e2e8f0";
    e.currentTarget.style.boxShadow = "none";
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* Profile Info */}
      <div style={cardStyle}>
        <p
          style={{
            fontFamily: "DM Sans",
            fontSize: "15px",
            fontWeight: "700",
            color: "#0f172a",
            margin: "0 0 20px 0",
          }}
        >
          👤 Personal Information
        </p>
        <form
          onSubmit={handleProfile}
          style={{ display: "flex", flexDirection: "column", gap: "14px" }}
        >
          <div className="profile-grid">
            <div>
              <label style={labelStyle}>Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                style={inputStyle}
                onFocus={onFocus}
                onBlur={onBlur}
              />
            </div>
            <div>
              <label style={labelStyle}>Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="10 digit phone"
                style={inputStyle}
                onFocus={onFocus}
                onBlur={onBlur}
              />
            </div>
          </div>
          <div>
            <label style={labelStyle}>Email Address</label>
            <input
              type="email"
              value={user?.email}
              readOnly
              style={{ ...inputStyle, opacity: 0.5, cursor: "not-allowed" }}
            />
            <p
              style={{
                fontFamily: "DM Sans",
                fontSize: "11px",
                color: "#94a3b8",
                margin: "4px 0 0 0",
              }}
            >
              Email cannot be changed
            </p>
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: "10px 24px",
                borderRadius: "10px",
                background: "#16a34a",
                color: "white",
                fontFamily: "DM Sans",
                fontSize: "14px",
                fontWeight: "600",
                border: "none",
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.7 : 1,
                transition: "all 0.2s",
                boxShadow: "0 2px 8px rgba(22,163,74,0.2)",
              }}
              onMouseEnter={(e) => {
                if (!loading) e.currentTarget.style.background = "#15803d";
              }}
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "#16a34a")
              }
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>

      {/* Change Password */}
      <div style={cardStyle}>
        <p
          style={{
            fontFamily: "DM Sans",
            fontSize: "15px",
            fontWeight: "700",
            color: "#0f172a",
            margin: "0 0 20px 0",
          }}
        >
          🔒 Change Password
        </p>
        <form
          onSubmit={handlePassword}
          style={{ display: "flex", flexDirection: "column", gap: "14px" }}
        >
          <div>
            <label style={labelStyle}>Current Password</label>
            <input
              type="password"
              value={currPass}
              onChange={(e) => setCurrPass(e.target.value)}
              placeholder="••••••••"
              required
              style={inputStyle}
              onFocus={onFocus}
              onBlur={onBlur}
            />
          </div>
          <div className="profile-grid">
            <div>
              <label style={labelStyle}>New Password</label>
              <input
                type="password"
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
                placeholder="Min 8 characters"
                required
                style={inputStyle}
                onFocus={onFocus}
                onBlur={onBlur}
              />
            </div>
            <div>
              <label style={labelStyle}>Confirm Password</label>
              <input
                type="password"
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
                placeholder="Repeat password"
                required
                style={inputStyle}
                onFocus={onFocus}
                onBlur={onBlur}
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              disabled={passLoading}
              style={{
                padding: "10px 24px",
                borderRadius: "10px",
                background: "#16a34a",
                color: "white",
                fontFamily: "DM Sans",
                fontSize: "14px",
                fontWeight: "600",
                border: "none",
                cursor: passLoading ? "not-allowed" : "pointer",
                opacity: passLoading ? 0.7 : 1,
                transition: "all 0.2s",
                boxShadow: "0 2px 8px rgba(22,163,74,0.2)",
              }}
              onMouseEnter={(e) => {
                if (!passLoading) e.currentTarget.style.background = "#15803d";
              }}
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "#16a34a")
              }
            >
              {passLoading ? "Updating..." : "Update Password"}
            </button>
          </div>
        </form>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        {[
          { icon: "📦", label: "Total Orders", value: "—" },
          { icon: "❤️", label: "Wishlist Items", value: "—" },
          { icon: "⭐", label: "Reviews Given", value: "—" },
        ].map((s) => (
          <div
            key={s.label}
            style={{
              padding: "20px 16px",
              borderRadius: "16px",
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              textAlign: "center",
              transition: "border-color 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.borderColor = "#bbf7d0")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.borderColor = "#e2e8f0")
            }
          >
            <div style={{ fontSize: "24px", marginBottom: "8px" }}>
              {s.icon}
            </div>
            <p
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontWeight: "700",
                fontSize: "24px",
                color: "#16a34a",
                margin: "0 0 4px 0",
              }}
            >
              {s.value}
            </p>
            <p
              style={{
                fontFamily: "DM Sans",
                fontSize: "11px",
                color: "#94a3b8",
                margin: 0,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              {s.label}
            </p>
          </div>
        ))}
      </div>

      <style>{`
        .profile-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 14px;
        }
        @media (min-width: 480px) {
          .profile-grid { grid-template-columns: repeat(2, 1fr); }
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }
        @media (max-width: 400px) {
          .stats-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
};

export default ProfileTab;
