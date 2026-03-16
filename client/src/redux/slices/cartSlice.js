import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../services/api";

export const fetchCart = createAsyncThunk(
  "cart/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get("/cart");
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

export const addToCart = createAsyncThunk(
  "cart/add",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/cart/add", {
        productId,
        quantity,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

export const updateCartItem = createAsyncThunk(
  "cart/update",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const { data } = await API.put("/cart/update", {
        productId,
        quantity,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

export const removeFromCart = createAsyncThunk(
  "cart/remove",
  async (productId, { rejectWithValue }) => {
    try {
      const { data } = await API.delete(`/cart/remove/${productId}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

export const clearCart = createAsyncThunk(
  "cart/clear",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.delete("/cart/clear");
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalItems: 0,
    totalPrice: 0,
    discountAmount: 0,
    finalPrice: 0,
    coupon: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    const handlePending = (state) => {
      state.loading = true;
      state.error = null;
    };

    const handleCart = (state, action) => {
      state.loading = false;
      state.items = action.payload.data.items || [];
      state.totalItems = action.payload.data.totalItems || 0;
      state.totalPrice = action.payload.data.totalPrice || 0;
      state.discountAmount = action.payload.data.discountAmount || 0;
      state.finalPrice = action.payload.data.finalPrice || 0;
      state.coupon = action.payload.data.coupon || null;
    };

    const handleRejected = (state, action) => {
      state.loading = false;
      state.error = action.payload;
    };

    builder
      .addCase(fetchCart.pending, handlePending)
      .addCase(fetchCart.fulfilled, handleCart)
      .addCase(fetchCart.rejected, handleRejected)
      .addCase(addToCart.pending, handlePending)
      .addCase(addToCart.fulfilled, handleCart)
      .addCase(addToCart.rejected, handleRejected)
      .addCase(updateCartItem.pending, handlePending)
      .addCase(updateCartItem.fulfilled, handleCart)
      .addCase(updateCartItem.rejected, handleRejected)
      .addCase(removeFromCart.pending, handlePending)
      .addCase(removeFromCart.fulfilled, handleCart)
      .addCase(removeFromCart.rejected, handleRejected)
      .addCase(clearCart.fulfilled, (state) => {
        state.items = [];
        state.totalItems = 0;
        state.totalPrice = 0;
        state.discountAmount = 0;
        state.finalPrice = 0;
        state.coupon = null;
      });
  },
});

export const { clearError } = cartSlice.actions;
export default cartSlice.reducer;
