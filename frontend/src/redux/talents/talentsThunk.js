import { createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../../utils/fetch";

const indexTalentsAsync = createAsyncThunk(
  "talents/index",

  async (keyword = "", { rejectWithValue }) => {
    try {
      const response = await Api.get(`/cms/talents?keyword=${keyword}`);

      return response.data.data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  },
);

const showTalentAsync = createAsyncThunk(
  "talents/show",

  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await Api.get(`/cms/talents/${id}`);

      return response.data.data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  },
);

const createTalentsAsync = createAsyncThunk(
  "talents/create",
  async ({ toast, setForm, form, modalRef, dispatch }, { rejectWithValue }) => {
    try {
      const response = await Api.post("/cms/talents", form);

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

      setForm("");
      dispatch(indexTalentsAsync());
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  },
);

const updateTalentAsync = createAsyncThunk(
  "talents/update",
  async (
    { toast, setForm, form, modalRef, dispatch, id },
    { rejectWithValue },
  ) => {
    try {
      const response = await Api.put(`/cms/talents/${id}`, form);

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

      setForm("");
      dispatch(indexTalentsAsync());
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  },
);

const deleteTalentAsync = createAsyncThunk(
  "talents/delete",
  async ({ toast, dispatch, id, modalRef }, { rejectWithValue }) => {
    try {
      const response = await Api.delete(`/cms/talents/${id}`);

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

      dispatch(indexTalentsAsync());
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  },
);

export {
  indexTalentsAsync,
  createTalentsAsync,
  updateTalentAsync,
  showTalentAsync,
  deleteTalentAsync,
};
