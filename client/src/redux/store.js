import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import productReducer from "./slices/productSlice";
import cartReducer from "./slices/cartSlice";
import orderReducer from "./slices/orderSlice";
import wishlistReducer from "./slices/wishlistSlice";
import adminReducer from "./slices/adminSlice";
import compareReducer from "./slices/compareSlice";
import reviewReducer from "./slices/reviewSlice";
import paymentReducer from "./slices/paymentSlice"; // ← ADD

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    cart: cartReducer,
    orders: orderReducer,
    wishlist: wishlistReducer,
    admin: adminReducer,
    compare: compareReducer,
    reviews: reviewReducer,
    payment: paymentReducer, // ← ADD
  },
});

export default store;
