import { configureStore } from "@reduxjs/toolkit";
import authUserReducer from "./users/authUserSlice";
import categoriesReducer from "./categories/categoriesSlice";

export const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    categories: categoriesReducer,
  },
});
