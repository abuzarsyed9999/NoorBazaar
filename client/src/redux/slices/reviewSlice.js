import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../services/api";

// ── Fetch Reviews ──
export const fetchReviews = createAsyncThunk(
  "reviews/fetch",
  async (
    { productId, page = 1, rating = 0, sort = "-createdAt" },
    { rejectWithValue },
  ) => {
    try {
      const { data } = await API.get(
        `/reviews/${productId}?page=${page}&rating=${rating}&sort=${sort}`,
      );
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  },
);

// ── Create Review ──
export const createReview = createAsyncThunk(
  "reviews/create",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/reviews", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  },
);

// ── Update Review ──
export const updateReview = createAsyncThunk(
  "reviews/update",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const { data } = await API.put(`/reviews/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  },
);

// ── Delete Review ──
export const deleteReview = createAsyncThunk(
  "reviews/delete",
  async (id, { rejectWithValue }) => {
    try {
      await API.delete(`/reviews/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  },
);

// ── Toggle Helpful ──
export const toggleHelpful = createAsyncThunk(
  "reviews/helpful",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await API.put(`/reviews/${id}/helpful`);
      return { id, helpfulCount: data.helpfulCount, isHelpful: data.isHelpful };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  },
);

const reviewSlice = createSlice({
  name: "reviews",
  initialState: {
    reviews: [],
    userReview: null,
    ratingBreakdown: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
    total: 0,
    loading: false,
    submitting: false,
    error: null,
    page: 1,
    totalPages: 1,
  },
  reducers: {
    clearReviews: (state) => {
      state.reviews = [];
      state.userReview = null;
      state.total = 0;
      state.page = 1;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchReviews.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(fetchReviews.fulfilled, (s, a) => {
        s.loading = false;
        s.reviews = a.payload.data;
        s.total = a.payload.total;
        s.ratingBreakdown = a.payload.ratingBreakdown;
        s.userReview = a.payload.userReview;
        s.totalPages = a.payload.pagination?.totalPages || 1;
        s.page = a.payload.pagination?.page || 1;
      })
      .addCase(fetchReviews.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      })

      // Create
      .addCase(createReview.pending, (s) => {
        s.submitting = true;
        s.error = null;
      })
      .addCase(createReview.fulfilled, (s, a) => {
        s.submitting = false;
        s.reviews.unshift(a.payload);
        s.userReview = a.payload;
        s.total += 1;
      })
      .addCase(createReview.rejected, (s, a) => {
        s.submitting = false;
        s.error = a.payload;
      })

      // Update
      .addCase(updateReview.pending, (s) => {
        s.submitting = true;
      })
      .addCase(updateReview.fulfilled, (s, a) => {
        s.submitting = false;
        const idx = s.reviews.findIndex((r) => r._id === a.payload._id);
        if (idx !== -1) s.reviews[idx] = a.payload;
        s.userReview = a.payload;
      })
      .addCase(updateReview.rejected, (s, a) => {
        s.submitting = false;
        s.error = a.payload;
      })

      // Delete
      .addCase(deleteReview.fulfilled, (s, a) => {
        s.reviews = s.reviews.filter((r) => r._id !== a.payload);
        s.userReview = null;
        s.total = Math.max(0, s.total - 1);
      })

      // Helpful
      .addCase(toggleHelpful.fulfilled, (s, a) => {
        const idx = s.reviews.findIndex((r) => r._id === a.payload.id);
        if (idx !== -1) {
          s.reviews[idx].helpfulCount = a.payload.helpfulCount;
          s.reviews[idx].isHelpfulByUser = a.payload.isHelpful;
        }
      });
  },
});

export const { clearReviews, clearError } = reviewSlice.actions;
export default reviewSlice.reducer;
