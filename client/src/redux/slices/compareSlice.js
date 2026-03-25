import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const MAX_COMPARE = 3;

const compareSlice = createSlice({
  name: "compare",
  initialState: {
    items: [], // max 3 products
  },
  reducers: {
    addToCompare: (state, action) => {
      const product = action.payload;
      const exists = state.items.find((p) => p._id === product._id);
      if (exists) {
        toast.error("Product already in comparison!");
        return;
      }
      if (state.items.length >= MAX_COMPARE) {
        toast.error(`You can compare up to ${MAX_COMPARE} products only!`);
        return;
      }
      state.items.push(product);
      toast.success(`${product.name} added to compare ⚖️`);
    },
    removeFromCompare: (state, action) => {
      state.items = state.items.filter((p) => p._id !== action.payload);
    },
    clearCompare: (state) => {
      state.items = [];
    },
  },
});

export const { addToCompare, removeFromCompare, clearCompare } =
  compareSlice.actions;
export default compareSlice.reducer;
