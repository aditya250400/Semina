import { configureStore } from "@reduxjs/toolkit";
import authUserReducer from "./users/authUserSlice";

export const store = configureStore({
  reducer: {
    authUser: authUserReducer,
  },
});
