/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import {
  createEventAsync,
  deleteEventAsync,
  indexEventsAsync,
  showEventAsync,
  updateEventAsync,
} from "./eventsThunk";

const initialState = {
  events: [],
  event: null,
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

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // index
      .addCase(indexEventsAsync.pending, (state, action) => {
        state.events = [];
        state.status = "idle";
        state.errors = null;
        state.loading.fetch = true;
      })
      .addCase(indexEventsAsync.fulfilled, (state, action) => {
        state.events = action.payload;
        state.status = "success";
        state.errors = null;
        state.loading.fetch = false;
      })
      .addCase(indexEventsAsync.rejected, (state, action) => {
        state.events = [];
        state.status = "rejected";
        state.errors = action.payload;
        state.loading.fetch = false;
      })
      //create
      .addCase(createEventAsync.pending, (state, action) => {
        state.loading.create = true;
        state.status = "pending";
        state.errors = null;
      })
      .addCase(createEventAsync.fulfilled, (state, action) => {
        state.loading.create = false;
        state.status = "success";
        state.errors = null;
      })
      .addCase(createEventAsync.rejected, (state, action) => {
        state.loading.create = false;
        state.status = "success";
        state.errors = action.payload;
      })

      //update
      .addCase(updateEventAsync.pending, (state, action) => {
        state.loading.update = true;
        state.status = "pending";
        state.errors = null;
      })
      .addCase(updateEventAsync.fulfilled, (state, action) => {
        state.loading.update = false;
        state.status = "success";
        state.errors = null;
      })
      .addCase(updateEventAsync.rejected, (state, action) => {
        state.loading.update = false;
        state.status = "rejected";

        state.errors = action.payload;
      })
      //delete
      .addCase(deleteEventAsync.pending, (state, action) => {
        state.loading.delete = true;
        state.status = "pending";
        state.errors = null;
      })
      .addCase(deleteEventAsync.fulfilled, (state, action) => {
        state.loading.delete = false;
        state.status = "success";
        state.errors = null;
      })
      .addCase(deleteEventAsync.rejected, (state, action) => {
        state.loading.delete = false;
        state.errors = action.payload;
        state.status = "success";
      })
      //show
      .addCase(showEventAsync.pending, (state, action) => {
        state.loading.show = true;
        state.status = "pending";
        state.errors = null;
        state.event = null;
      })
      .addCase(showEventAsync.fulfilled, (state, action) => {
        state.loading.show = false;
        state.status = "success";
        state.errors = null;
        state.event = action.payload;
      })
      .addCase(showEventAsync.rejected, (state, action) => {
        state.loading.show = false;
        state.errors = action.payload;
        state.status = "success";
        state.event = null;
      });
  },
});

export default eventsSlice.reducer;
