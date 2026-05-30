/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { postImageAsync } from "./imageThunk";

const initialState = {
  status: "idle",
  errors: "",
  loading: false,
  image: "",
};

const imageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {
    imageReset: (state, action) => {
      state.status = "idle";
      state.loading = false;
      state.errors = null;
      state.image = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postImageAsync.pending, (state, action) => {
        state.status = "pending";
        state.loading = true;
        state.errors = null;
        state.image = "";
      })
      .addCase(postImageAsync.fulfilled, (state, action) => {
        state.status = "Success";
        state.loading = false;
        state.errors = null;
        state.image = action.payload;
      })
      .addCase(postImageAsync.rejected, (state, action) => {
        state.status = "Rejected";
        state.loading = false;
        state.errors = action.payload;
        console.log(action.payload);
        state.image = "";
      });
  },
});

export const { imageReset } = imageSlice.actions;
export default imageSlice.reducer;
