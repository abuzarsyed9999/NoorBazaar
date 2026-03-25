import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../services/api";

// ── Create Razorpay Order ──
export const createRazorpayOrder = createAsyncThunk(
  "payment/createRazorpay",
  async (orderData, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/payment/razorpay/create", orderData);
      return data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to create order",
      );
    }
  },
);

// ── Verify Payment ──
export const verifyPayment = createAsyncThunk(
  "payment/verify",
  async (paymentData, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/payment/razorpay/verify", paymentData);
      return data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Payment verification failed",
      );
    }
  },
);

// ── COD Order ──
export const placeCODOrder = createAsyncThunk(
  "payment/cod",
  async (orderData, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/payment/cod", orderData);
      return data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to place order",
      );
    }
  },
);

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    loading: false,
    error: null,
    success: false,
    orderId: null,
    orderNumber: null,
    paymentStep: "idle", // idle | creating | processing | verifying | success | failed
  },
  reducers: {
    clearPayment: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.orderId = null;
      state.orderNumber = null;
      state.paymentStep = "idle";
    },
    setPaymentStep: (state, action) => {
      state.paymentStep = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Razorpay Order
      .addCase(createRazorpayOrder.pending, (s) => {
        s.loading = true;
        s.error = null;
        s.paymentStep = "creating";
      })
      .addCase(createRazorpayOrder.fulfilled, (s) => {
        s.loading = false;
        s.paymentStep = "processing";
      })
      .addCase(createRazorpayOrder.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
        s.paymentStep = "failed";
      })

      // Verify Payment
      .addCase(verifyPayment.pending, (s) => {
        s.loading = true;
        s.paymentStep = "verifying";
      })
      .addCase(verifyPayment.fulfilled, (s, a) => {
        s.loading = false;
        s.success = true;
        s.orderId = a.payload.orderId;
        s.orderNumber = a.payload.orderNumber;
        s.paymentStep = "success";
      })
      .addCase(verifyPayment.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
        s.paymentStep = "failed";
      })

      // COD Order
      .addCase(placeCODOrder.pending, (s) => {
        s.loading = true;
        s.error = null;
        s.paymentStep = "creating";
      })
      .addCase(placeCODOrder.fulfilled, (s, a) => {
        s.loading = false;
        s.success = true;
        s.orderId = a.payload.orderId;
        s.orderNumber = a.payload.orderNumber;
        s.paymentStep = "success";
      })
      .addCase(placeCODOrder.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
        s.paymentStep = "failed";
      });
  },
});

export const { clearPayment, setPaymentStep } = paymentSlice.actions;
export default paymentSlice.reducer;
