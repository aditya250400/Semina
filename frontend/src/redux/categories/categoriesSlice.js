/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { categoriesIndexAsync, createCategoryAsync } from "./categoryThunk";

const initialState = {
  data: [],
  status: "idle",
  errors: null,
  loading: false,
  loadingCreate: false,
  loadingUpdate: false,
  loadingDelete: false,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // index
      .addCase(categoriesIndexAsync.pending, (state, action) => {
        state.data = [];
        state.status = "idle";
        state.errors = null;
        state.loading = true;
      })
      .addCase(categoriesIndexAsync.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "success";
        state.errors = null;
        state.loading = false;
      })
      .addCase(categoriesIndexAsync.rejected, (state, action) => {
        state.data = [];
        state.status = "rejected";
        state.errors = action.payload;
        state.loading = false;
      })
      //create
      .addCase(createCategoryAsync.pending, (state, action) => {
        state.loadingCreate = true;
      })
      .addCase(createCategoryAsync.fulfilled, (state, action) => {
        state.loadingCreate = false;
      })
      .addCase(createCategoryAsync.rejected, (state, action) => {
        state.loadingCreate = false;
        state.errors = action.payload;
      });
  },
});

export default categoriesSlice.reducer;
