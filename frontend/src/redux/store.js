import { configureStore } from "@reduxjs/toolkit";
import authUserReducer from "./users/authUserSlice";
import categoriesReducer from "./categories/categoriesSlice";
import themeReducer from "./theme/themeSlice";
import talentsReducer from "./talents/talentsSlice";
import imageReducer from "./image/imageSlice";
import paymentReducer from "./payments/paymentsSlice";
import orderReducer from "./orders/ordersSlice";

export const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    categories: categoriesReducer,
    theme: themeReducer,
    talents: talentsReducer,
    image: imageReducer,
    payments: paymentReducer,
    orders: orderReducer,
  },
});
