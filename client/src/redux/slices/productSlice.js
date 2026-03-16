import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../services/api";

export const fetchProducts = createAsyncThunk(
  "products/fetchAll",
  async (params = "", { rejectWithValue }) => {
    try {
      const { data } = await API.get(`/products${params}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

export const fetchFeaturedProducts = createAsyncThunk(
  "products/featured",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get("/products/featured");
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

export const fetchProductBySlug = createAsyncThunk(
  "products/fetchOne",
  async (slug, { rejectWithValue }) => {
    try {
      const { data } = await API.get(`/products/${slug}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

export const fetchCategories = createAsyncThunk(
  "products/categories",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get("/categories");
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    featuredProducts: [],
    product: null,
    categories: [],
    total: 0,
    pagination: {},
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearProduct: (state) => {
      state.product = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.data;
        state.total = action.payload.total;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchFeaturedProducts.fulfilled, (state, action) => {
        state.featuredProducts = action.payload.data;
      })

      .addCase(fetchProductBySlug.pending, (state) => {
        state.loading = true;
        state.product = null;
      })
      .addCase(fetchProductBySlug.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload.data;
      })
      .addCase(fetchProductBySlug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload.data;
      });
  },
});

export const { clearError, clearProduct } = productSlice.actions;
export default productSlice.reducer;
