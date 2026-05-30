import { createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../../utils/fetch";
import { imageReset } from "../image/imageSlice";

const indexPaymentsAsync = createAsyncThunk(
  "payments/index",

  async (_, { rejectWithValue }) => {
    try {
      const response = await Api.get(`/cms/payments`);

      return response.data.data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  },
);

const showPaymentAsync = createAsyncThunk(
  "payments/show",

  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await Api.get(`/cms/payments/${id}`);

      return response.data.data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  },
);

const createPaymentAsync = createAsyncThunk(
  "payments/create",
  async (
    { toast, setForm, form, modalRef, dispatch, fileInputRef },
    { rejectWithValue },
  ) => {
    try {
      const response = await Api.post("/cms/payments", form);

      dispatch(indexPaymentsAsync());
      dispatch(imageReset());

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

      setForm({ type: "", image: "" });
      fileInputRef.current.value = "";
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  },
);

const updatePaymentAsync = createAsyncThunk(
  "payments/update",
  async (
    { toast, setForm, form, modalRef, dispatch, id },
    { rejectWithValue },
  ) => {
    try {
      const response = await Api.put(`/cms/payments/${id}`, form);

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

      setForm({ type: "", image: "" });
      dispatch(indexPaymentsAsync());
      dispatch(imageReset());
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  },
);

const deletePaymentAsync = createAsyncThunk(
  "payments/delete",
  async ({ toast, dispatch, id, modalRef }, { rejectWithValue }) => {
    try {
      const response = await Api.delete(`/cms/payments/${id}`);

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

      dispatch(indexPaymentsAsync());
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  },
);

export {
  indexPaymentsAsync,
  createPaymentAsync,
  updatePaymentAsync,
  showPaymentAsync,
  deletePaymentAsync,
};
