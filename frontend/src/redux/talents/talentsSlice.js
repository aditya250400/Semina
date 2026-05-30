/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import {
  indexTalentsAsync,
  createTalentsAsync,
  deleteTalentAsync,
  showTalentAsync,
  updateTalentAsync,
} from "./talentsThunk";

const initialState = {
  talents: [],
  talent: null,
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

const talentsSlice = createSlice({
  name: "talents",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // index
      .addCase(indexTalentsAsync.pending, (state, action) => {
        state.talents = [];
        state.status = "idle";
        state.errors = null;
        state.loading.fetch = true;
      })
      .addCase(indexTalentsAsync.fulfilled, (state, action) => {
        state.talents = action.payload;
        state.status = "success";
        state.errors = null;
        state.loading.fetch = false;
      })
      .addCase(indexTalentsAsync.rejected, (state, action) => {
        state.talents = [];
        state.status = "rejected";
        state.errors = action.payload;
        state.loading.fetch = false;
      })
      //create
      .addCase(createTalentsAsync.pending, (state, action) => {
        state.loading.create = true;
        state.status = "pending";
        state.errors = null;
      })
      .addCase(createTalentsAsync.fulfilled, (state, action) => {
        state.loading.create = false;
        state.status = "success";
        state.errors = null;
      })
      .addCase(createTalentsAsync.rejected, (state, action) => {
        state.loading.create = false;
        state.status = "success";
        state.errors = action.payload;
      })

      //update
      .addCase(updateTalentAsync.pending, (state, action) => {
        state.loading.update = true;
        state.status = "pending";
        state.errors = null;
      })
      .addCase(updateTalentAsync.fulfilled, (state, action) => {
        state.loading.update = false;
        state.status = "success";
        state.errors = null;
      })
      .addCase(updateTalentAsync.rejected, (state, action) => {
        state.loading.update = false;
        state.status = "rejected";

        state.errors = action.payload;
      })
      //delete
      .addCase(deleteTalentAsync.pending, (state, action) => {
        state.loading.delete = true;
        state.status = "pending";
        state.errors = null;
      })
      .addCase(deleteTalentAsync.fulfilled, (state, action) => {
        state.loading.delete = false;
        state.status = "success";
        state.errors = null;
      })
      .addCase(deleteTalentAsync.rejected, (state, action) => {
        state.loading.delete = false;
        state.errors = action.payload;
        state.status = "success";
      })
      //show
      .addCase(showTalentAsync.pending, (state, action) => {
        state.loading.show = true;
        state.status = "pending";
        state.errors = null;
        state.talent = null;
      })
      .addCase(showTalentAsync.fulfilled, (state, action) => {
        state.loading.show = false;
        state.status = "success";
        state.errors = null;
        state.talent = action.payload;
      })
      .addCase(showTalentAsync.rejected, (state, action) => {
        state.loading.show = false;
        state.errors = action.payload;
        state.status = "success";
        state.talent = null;
      });
  },
});

export default talentsSlice.reducer;
