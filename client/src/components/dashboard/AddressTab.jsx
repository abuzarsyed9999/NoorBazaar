// import { useState, useCallback } from "react";
// import { useSelector } from "react-redux";
// import API from "../../services/api";
// import toast from "react-hot-toast";

// const AddressTab = () => {
//   const { user } = useSelector((s) => s.auth);
//   const [addresses, setAddresses] = useState(user?.addresses || []);
//   const [showForm, setShowForm] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const [fullName, setFullName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [addressLine1, setAddressLine1] = useState("");
//   const [addressLine2, setAddressLine2] = useState("");
//   const [city, setCity] = useState("");
//   const [state, setState] = useState("");
//   const [pincode, setPincode] = useState("");
//   const [label, setLabel] = useState("Home");
//   const [isDefault, setIsDefault] = useState(false);

//   const resetForm = () => {
//     setFullName("");
//     setPhone("");
//     setAddressLine1("");
//     setAddressLine2("");
//     setCity("");
//     setState("");
//     setPincode("");
//     setLabel("Home");
//     setIsDefault(false);
//   };

//   const handleAdd = useCallback(
//     async (e) => {
//       e.preventDefault();
//       if (!fullName || !phone || !addressLine1 || !city || !state || !pincode) {
//         toast.error("Please fill all required fields");
//         return;
//       }
//       setLoading(true);
//       try {
//         const { data } = await API.post("/users/address", {
//           label,
//           fullName,
//           phone,
//           addressLine1,
//           addressLine2,
//           city,
//           state,
//           pincode,
//           country: "India",
//           isDefault,
//         });
//         setAddresses(data.data);
//         setShowForm(false);
//         resetForm();
//         toast.success("Address added successfully!");
//       } catch (err) {
//         toast.error(err.response?.data?.message || "Failed to add address");
//       } finally {
//         setLoading(false);
//       }
//     },
//     [
//       fullName,
//       phone,
//       addressLine1,
//       addressLine2,
//       city,
//       state,
//       pincode,
//       label,
//       isDefault,
//     ],
//   );

//   const handleDelete = async (addressId) => {
//     try {
//       const { data } = await API.delete(`/users/address/${addressId}`);
//       setAddresses(data.data);
//       toast.success("Address deleted");
//     } catch {
//       toast.error("Failed to delete address");
//     }
//   };

//   return (
//     <div className="space-y-4">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <p
//           className="font-dm text-xs font-semibold uppercase tracking-wider"
//           style={{ color: "#475569" }}
//         >
//           {addresses.length} Addresses
//         </p>
//         {addresses.length < 5 && (
//           <button
//             onClick={() => setShowForm((v) => !v)}
//             className="flex items-center gap-2 px-4 py-2 rounded-xl font-dm text-xs font-semibold text-white transition-opacity"
//             style={{ background: "#16a34a" }}
//           >
//             {showForm ? "Cancel" : "+ Add Address"}
//           </button>
//         )}
//       </div>

//       {/* Add Form */}
//       {showForm && (
//         <form
//           onSubmit={handleAdd}
//           className="p-5 rounded-2xl space-y-4"
//           style={{
//             background: "#162032",
//             border: "1px solid rgba(22,163,74,0.2)",
//           }}
//         >
//           <p
//             className="font-dm font-semibold text-sm"
//             style={{ color: "#e2e8f0" }}
//           >
//             New Address
//           </p>

//           {/* Label */}
//           <div className="flex gap-2">
//             {["Home", "Work", "Other"].map((l) => (
//               <button
//                 key={l}
//                 type="button"
//                 onClick={() => setLabel(l)}
//                 className="px-3 py-1.5 rounded-lg font-dm text-xs font-medium transition-all"
//                 style={{
//                   background:
//                     label === l
//                       ? "rgba(22,163,74,0.15)"
//                       : "rgba(255,255,255,0.04)",
//                   border:
//                     label === l
//                       ? "1px solid rgba(22,163,74,0.35)"
//                       : "1px solid rgba(255,255,255,0.06)",
//                   color: label === l ? "#4ade80" : "#64748b",
//                 }}
//               >
//                 {l}
//               </button>
//             ))}
//           </div>

//           <div className="grid sm:grid-cols-2 gap-3">
//             {/* Full Name */}
//             <div>
//               <label
//                 className="block font-dm text-xs mb-1"
//                 style={{ color: "#64748b" }}
//               >
//                 Full Name *
//               </label>
//               <input
//                 type="text"
//                 value={fullName}
//                 onChange={(e) => setFullName(e.target.value)}
//                 placeholder="Full name"
//                 className="nb-input text-sm"
//                 required
//               />
//             </div>

//             {/* Phone */}
//             <div>
//               <label
//                 className="block font-dm text-xs mb-1"
//                 style={{ color: "#64748b" }}
//               >
//                 Phone *
//               </label>
//               <input
//                 type="tel"
//                 value={phone}
//                 onChange={(e) => setPhone(e.target.value)}
//                 placeholder="10 digit phone"
//                 className="nb-input text-sm"
//                 required
//               />
//             </div>

//             {/* Address Line 1 */}
//             <div className="sm:col-span-2">
//               <label
//                 className="block font-dm text-xs mb-1"
//                 style={{ color: "#64748b" }}
//               >
//                 Address Line 1 *
//               </label>
//               <input
//                 type="text"
//                 value={addressLine1}
//                 onChange={(e) => setAddressLine1(e.target.value)}
//                 placeholder="House no, Street"
//                 className="nb-input text-sm"
//                 required
//               />
//             </div>

//             {/* Address Line 2 */}
//             <div className="sm:col-span-2">
//               <label
//                 className="block font-dm text-xs mb-1"
//                 style={{ color: "#64748b" }}
//               >
//                 Address Line 2
//               </label>
//               <input
//                 type="text"
//                 value={addressLine2}
//                 onChange={(e) => setAddressLine2(e.target.value)}
//                 placeholder="Landmark (optional)"
//                 className="nb-input text-sm"
//               />
//             </div>

//             {/* City */}
//             <div>
//               <label
//                 className="block font-dm text-xs mb-1"
//                 style={{ color: "#64748b" }}
//               >
//                 City *
//               </label>
//               <input
//                 type="text"
//                 value={city}
//                 onChange={(e) => setCity(e.target.value)}
//                 placeholder="City"
//                 className="nb-input text-sm"
//                 required
//               />
//             </div>

//             {/* State */}
//             <div>
//               <label
//                 className="block font-dm text-xs mb-1"
//                 style={{ color: "#64748b" }}
//               >
//                 State *
//               </label>
//               <input
//                 type="text"
//                 value={state}
//                 onChange={(e) => setState(e.target.value)}
//                 placeholder="State"
//                 className="nb-input text-sm"
//                 required
//               />
//             </div>

//             {/* Pincode */}
//             <div>
//               <label
//                 className="block font-dm text-xs mb-1"
//                 style={{ color: "#64748b" }}
//               >
//                 Pincode *
//               </label>
//               <input
//                 type="tel"
//                 value={pincode}
//                 onChange={(e) => setPincode(e.target.value)}
//                 placeholder="6 digit pincode"
//                 className="nb-input text-sm"
//                 required
//               />
//             </div>
//           </div>

//           {/* Default */}
//           <label className="flex items-center gap-3 cursor-pointer">
//             <div
//               onClick={() => setIsDefault((v) => !v)}
//               className="w-5 h-5 rounded flex items-center justify-center transition-all"
//               style={{
//                 background: isDefault ? "#16a34a" : "rgba(255,255,255,0.05)",
//                 border: isDefault ? "none" : "1px solid rgba(255,255,255,0.1)",
//               }}
//             >
//               {isDefault && <span className="text-white text-xs">✓</span>}
//             </div>
//             <span className="font-dm text-xs" style={{ color: "#64748b" }}>
//               Set as default address
//             </span>
//           </label>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full py-3 rounded-xl font-dm text-sm font-semibold text-white transition-opacity disabled:opacity-60"
//             style={{ background: "#16a34a" }}
//           >
//             {loading ? "Saving..." : "Save Address"}
//           </button>
//         </form>
//       )}

//       {/* Address List */}
//       {addresses.length === 0 && !showForm ? (
//         <div
//           className="p-10 rounded-2xl text-center"
//           style={{
//             background: "#162032",
//             border: "1px solid rgba(255,255,255,0.05)",
//           }}
//         >
//           <div className="text-4xl mb-3">📍</div>
//           <p className="font-dm text-sm" style={{ color: "#475569" }}>
//             No addresses saved yet
//           </p>
//         </div>
//       ) : (
//         <div className="space-y-3">
//           {addresses.map((addr) => (
//             <div
//               key={addr._id}
//               className="p-5 rounded-2xl"
//               style={{
//                 background: "#162032",
//                 border: addr.isDefault
//                   ? "1px solid rgba(22,163,74,0.3)"
//                   : "1px solid rgba(255,255,255,0.05)",
//               }}
//             >
//               <div className="flex items-start justify-between">
//                 <div className="flex items-center gap-2 mb-2">
//                   <span
//                     className="font-dm text-xs font-semibold px-2.5 py-1 rounded-full"
//                     style={{
//                       background: "rgba(22,163,74,0.1)",
//                       color: "#4ade80",
//                       border: "1px solid rgba(22,163,74,0.2)",
//                     }}
//                   >
//                     {addr.label}
//                   </span>
//                   {addr.isDefault && (
//                     <span
//                       className="font-dm text-[10px] px-2 py-0.5 rounded-full"
//                       style={{
//                         background: "rgba(201,168,76,0.1)",
//                         color: "#c9a84c",
//                       }}
//                     >
//                       Default
//                     </span>
//                   )}
//                 </div>
//                 <button
//                   onClick={() => handleDelete(addr._id)}
//                   className="font-dm text-xs transition-colors"
//                   style={{ color: "#334155" }}
//                   onMouseEnter={(e) =>
//                     (e.currentTarget.style.color = "#ef4444")
//                   }
//                   onMouseLeave={(e) =>
//                     (e.currentTarget.style.color = "#334155")
//                   }
//                 >
//                   Delete
//                 </button>
//               </div>

//               <p
//                 className="font-dm text-sm font-semibold"
//                 style={{ color: "#e2e8f0" }}
//               >
//                 {addr.fullName}
//               </p>
//               <p
//                 className="font-dm text-xs mt-0.5"
//                 style={{ color: "#64748b" }}
//               >
//                 {addr.addressLine1}
//                 {addr.addressLine2 && `, ${addr.addressLine2}`}, {addr.city},{" "}
//                 {addr.state} — {addr.pincode}
//               </p>
//               <p
//                 className="font-dm text-xs mt-0.5"
//                 style={{ color: "#475569" }}
//               >
//                 📱 {addr.phone}
//               </p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AddressTab;

import { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import API from "../../services/api";
import toast from "react-hot-toast";

const AddressTab = () => {
  const { user } = useSelector((s) => s.auth);
  const [addresses, setAddresses] = useState(user?.addresses || []);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [label, setLabel] = useState("Home");
  const [isDefault, setIsDefault] = useState(false);

  const resetForm = () => {
    setFullName("");
    setPhone("");
    setAddressLine1("");
    setAddressLine2("");
    setCity("");
    setState("");
    setPincode("");
    setLabel("Home");
    setIsDefault(false);
  };

  const handleAdd = useCallback(
    async (e) => {
      e.preventDefault();
      if (!fullName || !phone || !addressLine1 || !city || !state || !pincode) {
        toast.error("Please fill all required fields");
        return;
      }
      setLoading(true);
      try {
        const { data } = await API.post("/users/address", {
          label,
          fullName,
          phone,
          addressLine1,
          addressLine2,
          city,
          state,
          pincode,
          country: "India",
          isDefault,
        });
        setAddresses(data.data);
        setShowForm(false);
        resetForm();
        toast.success("Address added successfully!");
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to add address");
      } finally {
        setLoading(false);
      }
    },
    [
      fullName,
      phone,
      addressLine1,
      addressLine2,
      city,
      state,
      pincode,
      label,
      isDefault,
    ],
  );

  const handleDelete = async (addressId) => {
    try {
      const { data } = await API.delete(`/users/address/${addressId}`);
      setAddresses(data.data);
      toast.success("Address deleted");
    } catch {
      toast.error("Failed to delete address");
    }
  };

  const inputStyle = {
    width: "100%",
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: "10px",
    padding: "10px 14px",
    fontFamily: "DM Sans, sans-serif",
    fontSize: "13px",
    color: "#0f172a",
    outline: "none",
    transition: "border-color 0.2s",
    boxSizing: "border-box",
  };

  const Field = ({
    label: lbl,
    value,
    onChange,
    type = "text",
    placeholder,
    required,
  }) => (
    <div>
      <label
        style={{
          display: "block",
          fontFamily: "DM Sans",
          fontSize: "12px",
          fontWeight: "500",
          color: "#64748b",
          marginBottom: "5px",
        }}
      >
        {lbl}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        style={inputStyle}
        onFocus={(e) => (e.currentTarget.style.borderColor = "#16a34a")}
        onBlur={(e) => (e.currentTarget.style.borderColor = "#e2e8f0")}
      />
    </div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <p
          style={{
            fontFamily: "DM Sans",
            fontSize: "12px",
            fontWeight: "700",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "#94a3b8",
            margin: 0,
          }}
        >
          {addresses.length} Addresses
        </p>
        {addresses.length < 5 && (
          <button
            onClick={() => setShowForm((v) => !v)}
            style={{
              padding: "8px 16px",
              borderRadius: "10px",
              background: showForm ? "#f8fafc" : "#16a34a",
              color: showForm ? "#64748b" : "white",
              fontFamily: "DM Sans",
              fontSize: "13px",
              fontWeight: "600",
              border: showForm ? "1px solid #e2e8f0" : "none",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            {showForm ? "Cancel" : "+ Add Address"}
          </button>
        )}
      </div>

      {/* Add Form */}
      {showForm && (
        <form
          onSubmit={handleAdd}
          style={{
            padding: "20px",
            borderRadius: "16px",
            background: "#ffffff",
            border: "1px solid #bbf7d0",
            display: "flex",
            flexDirection: "column",
            gap: "14px",
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
            New Address
          </p>

          {/* Label */}
          <div style={{ display: "flex", gap: "8px" }}>
            {["Home", "Work", "Other"].map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLabel(l)}
                style={{
                  padding: "6px 14px",
                  borderRadius: "8px",
                  fontFamily: "DM Sans",
                  fontSize: "12px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  background: label === l ? "#f0fdf4" : "#f8fafc",
                  border:
                    label === l ? "1px solid #16a34a" : "1px solid #e2e8f0",
                  color: label === l ? "#16a34a" : "#64748b",
                }}
              >
                {l}
              </button>
            ))}
          </div>

          <div className="addr-form-grid">
            <Field
              label="Full Name *"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Full name"
              required
            />
            <Field
              label="Phone *"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="10 digit phone"
              type="tel"
              required
            />
            <div className="col-2">
              <Field
                label="Address Line 1 *"
                value={addressLine1}
                onChange={(e) => setAddressLine1(e.target.value)}
                placeholder="House no, Street"
                required
              />
            </div>
            <div className="col-2">
              <Field
                label="Address Line 2"
                value={addressLine2}
                onChange={(e) => setAddressLine2(e.target.value)}
                placeholder="Landmark (optional)"
              />
            </div>
            <Field
              label="City *"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City"
              required
            />
            <Field
              label="State *"
              value={state}
              onChange={(e) => setState(e.target.value)}
              placeholder="State"
              required
            />
            <Field
              label="Pincode *"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              placeholder="6 digits"
              type="tel"
              required
            />
          </div>

          {/* Default checkbox */}
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              cursor: "pointer",
            }}
          >
            <div
              onClick={() => setIsDefault((v) => !v)}
              style={{
                width: "18px",
                height: "18px",
                borderRadius: "5px",
                background: isDefault ? "#16a34a" : "#f8fafc",
                border: isDefault ? "none" : "1px solid #e2e8f0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {isDefault && (
                <span
                  style={{
                    color: "white",
                    fontSize: "11px",
                    fontWeight: "bold",
                  }}
                >
                  ✓
                </span>
              )}
            </div>
            <span
              style={{
                fontFamily: "DM Sans",
                fontSize: "13px",
                color: "#64748b",
              }}
            >
              Set as default address
            </span>
          </label>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "12px",
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
              boxShadow: "0 4px 12px rgba(22,163,74,0.2)",
            }}
            onMouseEnter={(e) => {
              if (!loading) e.currentTarget.style.background = "#15803d";
            }}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#16a34a")}
          >
            {loading ? "Saving..." : "Save Address"}
          </button>
        </form>
      )}

      {/* Empty */}
      {addresses.length === 0 && !showForm && (
        <div
          style={{
            padding: "48px 24px",
            borderRadius: "16px",
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "40px", marginBottom: "12px" }}>📍</div>
          <p
            style={{
              fontFamily: "DM Sans",
              fontSize: "14px",
              color: "#94a3b8",
              margin: 0,
            }}
          >
            No addresses saved yet
          </p>
        </div>
      )}

      {/* Address List */}
      {addresses.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {addresses.map((addr) => (
            <div
              key={addr._id}
              style={{
                padding: "16px",
                borderRadius: "16px",
                background: "#ffffff",
                border: addr.isDefault
                  ? "1px solid #16a34a"
                  : "1px solid #e2e8f0",
                transition: "border-color 0.2s",
              }}
              onMouseEnter={(e) => {
                if (!addr.isDefault)
                  e.currentTarget.style.borderColor = "#bbf7d0";
              }}
              onMouseLeave={(e) => {
                if (!addr.isDefault)
                  e.currentTarget.style.borderColor = "#e2e8f0";
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "DM Sans",
                      fontSize: "11px",
                      fontWeight: "700",
                      padding: "3px 10px",
                      borderRadius: "20px",
                      background: "#f0fdf4",
                      color: "#16a34a",
                      border: "1px solid #bbf7d0",
                    }}
                  >
                    {addr.label}
                  </span>
                  {addr.isDefault && (
                    <span
                      style={{
                        fontFamily: "DM Sans",
                        fontSize: "10px",
                        fontWeight: "600",
                        padding: "3px 8px",
                        borderRadius: "20px",
                        background: "#fef9c3",
                        color: "#854d0e",
                      }}
                    >
                      Default
                    </span>
                  )}
                </div>
                <button
                  onClick={() => handleDelete(addr._id)}
                  style={{
                    fontFamily: "DM Sans",
                    fontSize: "12px",
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
                  Delete
                </button>
              </div>
              <p
                style={{
                  fontFamily: "DM Sans",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#0f172a",
                  margin: "0 0 4px 0",
                }}
              >
                {addr.fullName}
              </p>
              <p
                style={{
                  fontFamily: "DM Sans",
                  fontSize: "13px",
                  color: "#64748b",
                  margin: "0 0 2px 0",
                }}
              >
                {addr.addressLine1}
                {addr.addressLine2 && `, ${addr.addressLine2}`}, {addr.city},{" "}
                {addr.state} — {addr.pincode}
              </p>
              <p
                style={{
                  fontFamily: "DM Sans",
                  fontSize: "12px",
                  color: "#94a3b8",
                  margin: 0,
                }}
              >
                📱 {addr.phone}
              </p>
            </div>
          ))}
        </div>
      )}

      <style>{`
        .addr-form-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
        }
        @media (min-width: 480px) {
          .addr-form-grid { grid-template-columns: repeat(2, 1fr); }
          .col-2 { grid-column: 1 / -1; }
        }
      `}</style>
    </div>
  );
};

export default AddressTab;
