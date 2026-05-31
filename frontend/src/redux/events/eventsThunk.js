import { createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../../utils/fetch";
import { imageReset } from "../image/imageSlice";

const indexEventsAsync = createAsyncThunk(
  "events/index",

  async ({ keyword, category, talent, status }, { rejectWithValue }) => {
    try {
      const response = await Api.get(
        `/cms/events?keyword=${keyword}&category=${category}&talent=${talent}&status=${status}`,
      );

      return response.data.data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  },
);

const showEventAsync = createAsyncThunk(
  "events/show",

  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await Api.get(`/cms/events/${id}`);

      return response.data.data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  },
);

const createEventAsync = createAsyncThunk(
  "events/create",
  async (
    { toast, setForm, form, modalRef, dispatch, fileInputRef },
    { rejectWithValue },
  ) => {
    try {
      const response = await Api.post("/cms/events", form);

      toast.success(`${response.data.message}`, {
        duration: 4000,
        position: "top-right",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });

      const modalElement = modalRef.current;

      // eslint-disable-next-line no-undef
      const modalInstance = bootstrap.Modal.getInstance(modalElement);
      modalInstance.hide();

      setForm({ name: "", image: "", role: "" });
      fileInputRef.current.value = "";
      dispatch(indexEventsAsync());
      dispatch(imageReset());
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  },
);

const updateEventAsync = createAsyncThunk(
  "events/update",
  async (
    { toast, setForm, form, modalRef, dispatch, id },
    { rejectWithValue },
  ) => {
    try {
      const response = await Api.put(`/cms/events/${id}`, form);

      toast.success(`${response.data.message}`, {
        duration: 4000,
        position: "top-right",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });

      const modalElement = modalRef.current;

      // eslint-disable-next-line no-undef
      const modalInstance = bootstrap.Modal.getInstance(modalElement);
      modalInstance.hide();

      setForm({ name: "", image: "", role: "" });
      dispatch(indexEventsAsync());
      dispatch(imageReset());
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  },
);

const deleteEventAsync = createAsyncThunk(
  "events/delete",
  async ({ toast, dispatch, id, modalRef }, { rejectWithValue }) => {
    try {
      const response = await Api.delete(`/cms/events/${id}`);

      toast.success(`${response.data.message}`, {
        duration: 4000,
        position: "top-right",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });

      const modalElement = modalRef.current;

      // eslint-disable-next-line no-undef
      const modalInstance = bootstrap.Modal.getInstance(modalElement);
      modalInstance.hide();

      dispatch(indexEventsAsync());
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  },
);

export {
  indexEventsAsync,
  createEventAsync,
  updateEventAsync,
  showEventAsync,
  deleteEventAsync,
};
