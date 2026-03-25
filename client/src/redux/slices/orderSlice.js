// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import API from "../../services/api";

// export const placeOrder = createAsyncThunk(
//   "orders/place",
//   async (orderData, { rejectWithValue }) => {
//     try {
//       const { data } = await API.post("/payment/cod", orderData);
//       return data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message);
//     }
//   },
// );

// export const fetchMyOrders = createAsyncThunk(
//   "orders/myOrders",
//   async (_, { rejectWithValue }) => {
//     try {
//       const { data } = await API.get("/orders/my-orders");
//       return data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message);
//     }
//   },
// );

// export const fetchOrderById = createAsyncThunk(
//   "orders/fetchOne",
//   async (id, { rejectWithValue }) => {
//     try {
//       const { data } = await API.get(`/orders/${id}`);
//       return data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message);
//     }
//   },
// );

// const orderSlice = createSlice({
//   name: "orders",
//   initialState: {
//     orders: [],
//     order: null,
//     loading: false,
//     error: null,
//     success: false,
//   },
//   reducers: {
//     clearError: (state) => {
//       state.error = null;
//       state.success = false;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(placeOrder.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//         state.success = false;
//       })
//       .addCase(placeOrder.fulfilled, (state, action) => {
//         state.loading = false;
//         state.order = action.payload.data;
//         state.success = true;
//       })
//       .addCase(placeOrder.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       .addCase(fetchMyOrders.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchMyOrders.fulfilled, (state, action) => {
//         state.loading = false;
//         state.orders = action.payload.data;
//       })
//       .addCase(fetchMyOrders.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       .addCase(fetchOrderById.fulfilled, (state, action) => {
//         state.order = action.payload.data;
//       });
//   },
// });

// export const { clearError } = orderSlice.actions;
// export default orderSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../services/api";

// ── Place Order ──
export const placeOrder = createAsyncThunk(
  "orders/place",
  async (orderData, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/payment/cod", orderData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

// ── Fetch My Orders ──
export const fetchMyOrders = createAsyncThunk(
  "orders/myOrders",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get("/orders/my-orders");
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

// ── Fetch Single Order by ID ──
export const fetchOrderById = createAsyncThunk(
  "orders/fetchById",
  async (orderId, { rejectWithValue }) => {
    try {
      const { data } = await API.get(`/orders/${orderId}`);
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

// ── Cancel Order ──
export const cancelOrder = createAsyncThunk(
  "orders/cancel",
  async ({ orderId, reason }, { rejectWithValue }) => {
    try {
      const { data } = await API.put(`/orders/${orderId}/cancel`, { reason });
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    currentOrder: null, // ← used by OrderTrackingPage
    order: null, // ← used by CheckoutPage
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
      state.success = false;
    },
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    },
  },
  extraReducers: (builder) => {
    // ── Place Order ──
    builder
      .addCase(placeOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload.data;
        state.success = true;
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ── Fetch My Orders ──
      .addCase(fetchMyOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.data || [];
      })
      .addCase(fetchMyOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ── Fetch Single Order ──
      .addCase(fetchOrderById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.currentOrder = null;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload;
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ── Cancel Order ──
      .addCase(cancelOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload;
        // ✅ Also update in orders list
        const idx = state.orders.findIndex((o) => o._id === action.payload._id);
        if (idx !== -1) state.orders[idx] = action.payload;
      })
      .addCase(cancelOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearCurrentOrder } = orderSlice.actions;
export default orderSlice.reducer;
