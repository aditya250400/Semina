/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import {
  categoriesIndexAsync,
  createCategoryAsync,
  deleteCategoryAsync,
  showCategoriesAsync,
  updateCategoryAsync,
} from "./categoryThunk";

const initialState = {
  categories: [],
  category: null,
  status: "idle",
  errors: null,
  loading: {
    fetch: false,
    show: false,
    create: false,
    update: false,
    delete: false,
  },
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // index
      .addCase(categoriesIndexAsync.pending, (state, action) => {
        state.categories = [];
        state.status = "idle";
        state.errors = null;
        state.loading.fetch = true;
      })
      .addCase(categoriesIndexAsync.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.status = "success";
        state.errors = null;
        state.loading.fetch = false;
      })
      .addCase(categoriesIndexAsync.rejected, (state, action) => {
        state.categories = [];
        state.status = "rejected";
        state.errors = action.payload;
        state.loading.fetch = false;
      })
      //create
      .addCase(createCategoryAsync.pending, (state, action) => {
        state.loading.create = true;
        state.status = "pending";
        state.errors = null;
      })
      .addCase(createCategoryAsync.fulfilled, (state, action) => {
        state.loading.create = false;
        state.status = "success";
        state.errors = null;
      })
      .addCase(createCategoryAsync.rejected, (state, action) => {
        state.loading.create = false;
        state.status = "success";
        state.errors = action.payload;
      })

      //update
      .addCase(updateCategoryAsync.pending, (state, action) => {
        state.loading.update = true;
        state.status = "pending";
        state.errors = null;
      })
      .addCase(updateCategoryAsync.fulfilled, (state, action) => {
        state.loading.update = false;
        state.status = "success";
        state.errors = null;
      })
      .addCase(updateCategoryAsync.rejected, (state, action) => {
        state.loading.update = false;
        state.status = "rejected";

        state.errors = action.payload;
      })
      //delete
      .addCase(deleteCategoryAsync.pending, (state, action) => {
        state.loading.delete = true;
        state.status = "pending";
        state.errors = null;
      })
      .addCase(deleteCategoryAsync.fulfilled, (state, action) => {
        state.loading.delete = false;
        state.status = "success";
        state.errors = null;
      })
      .addCase(deleteCategoryAsync.rejected, (state, action) => {
        state.loading.delete = false;
        state.errors = action.payload;
        state.status = "success";
      })
      //show
      .addCase(showCategoriesAsync.pending, (state, action) => {
        state.loading.show = true;
        state.status = "pending";
        state.errors = null;
        state.category = null;
      })
      .addCase(showCategoriesAsync.fulfilled, (state, action) => {
        state.loading.show = false;
        state.status = "success";
        state.errors = null;
        state.category = action.payload;
      })
      .addCase(showCategoriesAsync.rejected, (state, action) => {
        state.loading.show = false;
        state.errors = action.payload;
        state.status = "success";
        state.category = null;
      });
  },
});

export default categoriesSlice.reducer;
