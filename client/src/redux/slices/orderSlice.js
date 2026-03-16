import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../services/api";

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

export const fetchOrderById = createAsyncThunk(
  "orders/fetchOne",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await API.get(`/orders/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    order: null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
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

      .addCase(fetchMyOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMyOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.data;
      })
      .addCase(fetchMyOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.order = action.payload.data;
      });
  },
});

export const { clearError } = orderSlice.actions;
export default orderSlice.reducer;
