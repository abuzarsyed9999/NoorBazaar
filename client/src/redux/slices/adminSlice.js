// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import API from "../../services/api";

// // ── Dashboard Stats ──
// export const fetchAdminStats = createAsyncThunk(
//   "admin/stats",
//   async (_, { rejectWithValue }) => {
//     try {
//       const { data } = await API.get("/admin/dashboard");
//       return data.data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.message);
//     }
//   },
// );

// // ── All Users ──
// export const fetchAdminUsers = createAsyncThunk(
//   "admin/users",
//   async (_, { rejectWithValue }) => {
//     try {
//       const { data } = await API.get("/admin/users");
//       return data.data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.message);
//     }
//   },
// );

// // ── All Orders ──
// export const fetchAdminOrders = createAsyncThunk(
//   "admin/orders",
//   async (_, { rejectWithValue }) => {
//     try {
//       const { data } = await API.get("/admin/orders");
//       return data.data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.message);
//     }
//   },
// );

// // ── Update Order Status ──
// export const updateOrderStatus = createAsyncThunk(
//   "admin/updateOrder",
//   async ({ orderId, status }, { rejectWithValue }) => {
//     try {
//       const { data } = await API.put(`/orders/${orderId}/status`, { status });
//       return data.data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.message);
//     }
//   },
// );

// // ── Toggle User Status ──
// export const toggleUserStatus = createAsyncThunk(
//   "admin/toggleUser",
//   async (userId, { rejectWithValue }) => {
//     try {
//       const { data } = await API.put(`/admin/users/${userId}/toggle`);
//       return data.data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.message);
//     }
//   },
// );

// // ── Delete Product ──
// export const deleteProduct = createAsyncThunk(
//   "admin/deleteProduct",
//   async (productId, { rejectWithValue }) => {
//     try {
//       await API.delete(`/products/${productId}`);
//       return productId;
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.message);
//     }
//   },
// );

// const adminSlice = createSlice({
//   name: "admin",
//   initialState: {
//     stats: null,
//     users: [],
//     orders: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     const load = (s) => {
//       s.loading = true;
//       s.error = null;
//     };
//     const fail = (s, a) => {
//       s.loading = false;
//       s.error = a.payload;
//     };

//     builder
//       .addCase(fetchAdminStats.pending, load)
//       .addCase(fetchAdminStats.fulfilled, (s, a) => {
//         s.loading = false;
//         s.stats = a.payload;
//       })
//       .addCase(fetchAdminStats.rejected, fail)

//       .addCase(fetchAdminUsers.pending, load)
//       .addCase(fetchAdminUsers.fulfilled, (s, a) => {
//         s.loading = false;
//         s.users = a.payload;
//       })
//       .addCase(fetchAdminUsers.rejected, fail)

//       .addCase(fetchAdminOrders.pending, load)
//       .addCase(fetchAdminOrders.fulfilled, (s, a) => {
//         s.loading = false;
//         s.orders = a.payload;
//       })
//       .addCase(fetchAdminOrders.rejected, fail)

//       .addCase(updateOrderStatus.fulfilled, (s, a) => {
//         const idx = s.orders.findIndex((o) => o._id === a.payload._id);
//         if (idx !== -1) s.orders[idx] = a.payload;
//       })

//       .addCase(toggleUserStatus.fulfilled, (s, a) => {
//         const idx = s.users.findIndex((u) => u._id === a.payload._id);
//         if (idx !== -1) s.users[idx] = a.payload;
//       })

//       .addCase(deleteProduct.fulfilled, (s, a) => {
//         // product deleted from products list
//       });
//   },
// });

// export default adminSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../services/api";

// ── Dashboard Stats ──
export const fetchAdminStats = createAsyncThunk(
  "admin/stats",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get("/admin/dashboard");
      const d = data.data;
      return {
        // Counts
        totalRevenue: d.revenue?.totalRevenue || 0,
        totalOrders: d.counts?.totalOrders || 0,
        totalProducts: d.counts?.totalProducts || 0,
        totalUsers: d.counts?.totalUsers || 0,
        totalCategories: d.counts?.totalCategories || 0,
        totalReviews: d.counts?.totalReviews || 0,
        avgOrderValue: d.revenue?.avgOrderValue || 0,
        // Order status breakdown
        pendingOrders:
          d.orderStatusBreakdown?.find((o) => o._id === "Pending")?.count || 0,
        confirmedOrders:
          d.orderStatusBreakdown?.find((o) => o._id === "Confirmed")?.count ||
          0,
        processingOrders:
          d.orderStatusBreakdown?.find((o) => o._id === "Processing")?.count ||
          0,
        shippedOrders:
          d.orderStatusBreakdown?.find((o) => o._id === "Shipped")?.count || 0,
        deliveredOrders:
          d.orderStatusBreakdown?.find((o) => o._id === "Delivered")?.count ||
          0,
        cancelledOrders:
          d.orderStatusBreakdown?.find((o) => o._id === "Cancelled")?.count ||
          0,
        // Lists
        recentOrders: d.recentOrders || [],
        recentUsers: d.recentUsers || [],
        topProducts: d.topProducts || [],
        lowStockProducts: d.lowStockProducts || [],
        monthlySales: d.monthlySales || [],
      };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  },
);

// ── All Users ──
export const fetchAdminUsers = createAsyncThunk(
  "admin/users",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get("/admin/users");
      return data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  },
);

// ── All Orders ──
export const fetchAdminOrders = createAsyncThunk(
  "admin/orders",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get("/admin/orders");
      return data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  },
);

// ── Update Order Status ──
export const updateOrderStatus = createAsyncThunk(
  "admin/updateOrder",
  async ({ orderId, status }, { rejectWithValue }) => {
    try {
      // ✅ Use /admin/orders route — not /orders/:id/status
      const { data } = await API.put(`/admin/orders/${orderId}/status`, {
        status,
      });
      return data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  },
);

// ── Toggle User Status ──
export const toggleUserStatus = createAsyncThunk(
  "admin/toggleUser",
  async (userId, { rejectWithValue }) => {
    try {
      const { data } = await API.patch(`/admin/users/${userId}/toggle`);
      return { _id: userId, isActive: data.data?.isActive };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  },
);

// ── Delete Product ──
export const deleteAdminProduct = createAsyncThunk(
  "admin/deleteProduct",
  async (productId, { rejectWithValue }) => {
    try {
      await API.delete(`/admin/products/${productId}`);
      return productId;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  },
);

// ── Toggle Product Status ──
export const toggleAdminProduct = createAsyncThunk(
  "admin/toggleProduct",
  async (productId, { rejectWithValue }) => {
    try {
      const { data } = await API.put(`/admin/products/${productId}/toggle`);
      return data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  },
);

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    stats: null,
    users: [],
    orders: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearAdminError: (s) => {
      s.error = null;
    },
  },
  extraReducers: (builder) => {
    const load = (s) => {
      s.loading = true;
      s.error = null;
    };
    const fail = (s, a) => {
      s.loading = false;
      s.error = a.payload;
    };

    builder
      // Stats
      .addCase(fetchAdminStats.pending, load)
      .addCase(fetchAdminStats.fulfilled, (s, a) => {
        s.loading = false;
        s.stats = a.payload;
      })
      .addCase(fetchAdminStats.rejected, fail)

      // Users
      .addCase(fetchAdminUsers.pending, load)
      .addCase(fetchAdminUsers.fulfilled, (s, a) => {
        s.loading = false;
        s.users = a.payload;
      })
      .addCase(fetchAdminUsers.rejected, fail)

      // Orders
      .addCase(fetchAdminOrders.pending, load)
      .addCase(fetchAdminOrders.fulfilled, (s, a) => {
        s.loading = false;
        s.orders = a.payload;
      })
      .addCase(fetchAdminOrders.rejected, fail)

      // Update order status
      .addCase(updateOrderStatus.fulfilled, (s, a) => {
        if (!a.payload) return;
        const idx = s.orders.findIndex((o) => o._id === a.payload._id);
        if (idx !== -1) s.orders[idx] = a.payload;
      })

      // Toggle user
      .addCase(toggleUserStatus.fulfilled, (s, a) => {
        if (!a.payload) return;
        const idx = s.users.findIndex((u) => u._id === a.payload._id);
        if (idx !== -1)
          s.users[idx] = { ...s.users[idx], isActive: a.payload.isActive };
      })

      // Delete product
      .addCase(deleteAdminProduct.fulfilled, (s, a) => {
        // Products are managed in productSlice
        // Just log — refresh products list in component
      })

      // Toggle product
      .addCase(toggleAdminProduct.fulfilled, (s, a) => {
        // Products managed in productSlice
      });
  },
});

export const { clearAdminError } = adminSlice.actions;
export default adminSlice.reducer;

// ```

// ---

// ## ✅ What Changed
// ```
// ✅ fetchAdminStats  → properly maps nested data.data
//                       counts, revenue, breakdown all mapped
// ✅ updateOrderStatus → uses /admin/orders/:id/status
//                       (not /orders/:id/status)
// ✅ toggleUserStatus  → uses PATCH (matches backend)
//                       returns {_id, isActive} safely
// ✅ deleteProduct     → renamed to deleteAdminProduct
//                       uses /admin/products/:id
// ✅ toggleAdminProduct → new! uses /admin/products/:id/toggle
// ✅ clearAdminError   → new action exported
