/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import { loginAsync } from "./userThunk";
import Cookies from "js-cookie";

const initialState = {
  user: null,
  token: Cookies.get("token") || "",
  status: "idle",
  errors: null,
  loading: false,
};

const authUserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state, action) => {
      Cookies.remove("token");
      state.status = "idle";
      state.loading = false;
      state.token = "";
      state.errors = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state, action) => {
        state.status = "pending";
        state.loading = true;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.status = "Success";
        state.loading = false;
        state.token = action.payload.token;
        state.errors = null;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.status = "Rejected";
        state.loading = false;
        state.errors = action.payload;
      });
  },
});

export const { logout } = authUserSlice.actions;
export default authUserSlice.reducer;
