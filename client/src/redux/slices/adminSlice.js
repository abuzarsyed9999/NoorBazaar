import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../services/api";

// ── Dashboard Stats ──
export const fetchAdminStats = createAsyncThunk(
  "admin/stats",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get("/admin/dashboard");
      return data.data;
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
      const { data } = await API.put(`/orders/${orderId}/status`, { status });
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
      const { data } = await API.put(`/admin/users/${userId}/toggle`);
      return data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  },
);

// ── Delete Product ──
export const deleteProduct = createAsyncThunk(
  "admin/deleteProduct",
  async (productId, { rejectWithValue }) => {
    try {
      await API.delete(`/products/${productId}`);
      return productId;
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
  reducers: {},
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
      .addCase(fetchAdminStats.pending, load)
      .addCase(fetchAdminStats.fulfilled, (s, a) => {
        s.loading = false;
        s.stats = a.payload;
      })
      .addCase(fetchAdminStats.rejected, fail)

      .addCase(fetchAdminUsers.pending, load)
      .addCase(fetchAdminUsers.fulfilled, (s, a) => {
        s.loading = false;
        s.users = a.payload;
      })
      .addCase(fetchAdminUsers.rejected, fail)

      .addCase(fetchAdminOrders.pending, load)
      .addCase(fetchAdminOrders.fulfilled, (s, a) => {
        s.loading = false;
        s.orders = a.payload;
      })
      .addCase(fetchAdminOrders.rejected, fail)

      .addCase(updateOrderStatus.fulfilled, (s, a) => {
        const idx = s.orders.findIndex((o) => o._id === a.payload._id);
        if (idx !== -1) s.orders[idx] = a.payload;
      })

      .addCase(toggleUserStatus.fulfilled, (s, a) => {
        const idx = s.users.findIndex((u) => u._id === a.payload._id);
        if (idx !== -1) s.users[idx] = a.payload;
      })

      .addCase(deleteProduct.fulfilled, (s, a) => {
        // product deleted from products list
      });
  },
});

export default adminSlice.reducer;
