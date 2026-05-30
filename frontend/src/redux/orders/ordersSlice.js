/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { indexOrdersAsync } from "./ordersThunk";

const initialState = {
  orders: [],
  status: "idle",
  errors: null,
  loading: {
    fetch: false,
  },
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    resetOrders: (state, action) => {
      state.orders = [];
      state.status = "idle";
      state.errors = null;
      state.loading = {
        fetch: false,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // index
      .addCase(indexOrdersAsync.pending, (state, action) => {
        state.orders = [];
        state.status = "idle";
        state.errors = null;
        state.loading.fetch = true;
      })
      .addCase(indexOrdersAsync.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.status = "success";
        state.errors = null;
        state.loading.fetch = false;
      })
      .addCase(indexOrdersAsync.rejected, (state, action) => {
        state.orders = [];
        state.status = "rejected";
        state.errors = action.payload;
        state.loading.fetch = false;
      });
  },
});

export const { resetOrders } = ordersSlice.actions;
export default ordersSlice.reducer;
