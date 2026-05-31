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
    { toast, resetForm, form, modalRef, dispatch, fileInputRef },
    { rejectWithValue },
  ) => {
    try {
      const response = await Api.post("/cms/events", form);
      dispatch(
        indexEventsAsync({
          keyword: "",
          talent: "",
          status: "",
          category: "",
        }),
      );

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

      resetForm();
      fileInputRef.current.value = "";
      dispatch(imageReset());
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  },
);

const updateEventAsync = createAsyncThunk(
  "events/update",
  async (
    { toast, resetForm, form, modalRef, dispatch, id },
    { rejectWithValue },
  ) => {
    try {
      const response = await Api.put(`/cms/events/${id}`, form);

      dispatch(
        indexEventsAsync({
          keyword: "",
          talent: "",
          status: "",
          category: "",
        }),
      );
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

      resetForm();
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

      dispatch(
        indexEventsAsync({
          keyword: "",
          talent: "",
          status: "",
          category: "",
        }),
      );
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
