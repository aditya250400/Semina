/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import {
  indexPaymentsAsync,
  createPaymentAsync,
  deletePaymentAsync,
  showPaymentAsync,
  updatePaymentAsync,
} from "./paymentsThunk";

const initialState = {
  payments: [],
  payment: null,
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

const paymentsSlice = createSlice({
  name: "payments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // index
      .addCase(indexPaymentsAsync.pending, (state, action) => {
        state.payments = [];
        state.status = "idle";
        state.errors = null;
        state.loading.fetch = true;
      })
      .addCase(indexPaymentsAsync.fulfilled, (state, action) => {
        state.payments = action.payload;
        state.status = "success";
        state.errors = null;
        state.loading.fetch = false;
      })
      .addCase(indexPaymentsAsync.rejected, (state, action) => {
        state.payments = [];
        state.status = "rejected";
        state.errors = action.payload;
        state.loading.fetch = false;
      })
      //create
      .addCase(createPaymentAsync.pending, (state, action) => {
        state.loading.create = true;
        state.status = "pending";
        state.errors = null;
      })
      .addCase(createPaymentAsync.fulfilled, (state, action) => {
        state.loading.create = false;
        state.status = "success";
        state.errors = null;
      })
      .addCase(createPaymentAsync.rejected, (state, action) => {
        state.loading.create = false;
        state.status = "success";
        state.errors = action.payload;
      })

      //update
      .addCase(updatePaymentAsync.pending, (state, action) => {
        state.loading.update = true;
        state.status = "pending";
        state.errors = null;
      })
      .addCase(updatePaymentAsync.fulfilled, (state, action) => {
        state.loading.update = false;
        state.status = "success";
        state.errors = null;
      })
      .addCase(updatePaymentAsync.rejected, (state, action) => {
        state.loading.update = false;
        state.status = "rejected";

        state.errors = action.payload;
      })
      //delete
      .addCase(deletePaymentAsync.pending, (state, action) => {
        state.loading.delete = true;
        state.status = "pending";
        state.errors = null;
      })
      .addCase(deletePaymentAsync.fulfilled, (state, action) => {
        state.loading.delete = false;
        state.status = "success";
        state.errors = null;
      })
      .addCase(deletePaymentAsync.rejected, (state, action) => {
        state.loading.delete = false;
        state.errors = action.payload;
        state.status = "success";
      })
      //show
      .addCase(showPaymentAsync.pending, (state, action) => {
        state.loading.show = true;
        state.status = "pending";
        state.errors = null;
        state.payment = null;
      })
      .addCase(showPaymentAsync.fulfilled, (state, action) => {
        state.loading.show = false;
        state.status = "success";
        state.errors = null;
        state.payment = action.payload;
      })
      .addCase(showPaymentAsync.rejected, (state, action) => {
        state.loading.show = false;
        state.errors = action.payload;
        state.status = "success";
        state.payment = null;
      });
  },
});

export default paymentsSlice.reducer;
