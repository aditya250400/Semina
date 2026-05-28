/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { categoriesIndexAsync } from "./categoryThunk";

const initialState = {
  categories: [],
  status: "idle",
  errors: null,
  loading: false,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(categoriesIndexAsync.pending, (state, action) => {
        state.categories = [];
        state.status = "idle";
        state.errors = null;
        state.loading = true;
      })
      .addCase(categoriesIndexAsync.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.status = "success";
        state.errors = null;
        state.loading = false;
      })
      .addCase(categoriesIndexAsync.rejected, (state, action) => {
        state.categories = [];
        state.status = "rejected";
        state.errors = action.payload;
        state.loading = false;
      });
  },
});

export default categoriesSlice.reducer;
