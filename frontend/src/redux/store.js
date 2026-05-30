import { configureStore } from "@reduxjs/toolkit";
import authUserReducer from "./users/authUserSlice";
import categoriesReducer from "./categories/categoriesSlice";
import themeReducer from "./theme/themeSlice";
import talentsReducer from "./talents/talentsSlice";

export const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    categories: categoriesReducer,
    theme: themeReducer,
    talents: talentsReducer,
  },
});
