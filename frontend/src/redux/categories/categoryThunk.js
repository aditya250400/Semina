import { createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../../utils/fetch";

const categoriesIndexAsync = createAsyncThunk(
  "categories/index",

  async (_, { rejectWithValue }) => {
    try {
      const response = await Api.get("/cms/categories");

      return response.data.data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  },
);

const showCategoriesAsync = createAsyncThunk(
  "categories/show",

  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await Api.get(`/cms/categories/${id}`);

      return response.data.data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  },
);

const createCategoryAsync = createAsyncThunk(
  "categories/create",
  async ({ toast, setName, name, modalRef, dispatch }, { rejectWithValue }) => {
    try {
      const response = await Api.post("/cms/categories", { name });

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

      setName("");
      dispatch(categoriesIndexAsync());
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  },
);

const updateCategoryAsync = createAsyncThunk(
  "categories/update",
  async (
    { toast, setName, name, modalRef, dispatch, id },
    { rejectWithValue },
  ) => {
    try {
      const response = await Api.put(`/cms/categories/${id}`, { name });

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

      setName("");
      dispatch(categoriesIndexAsync());
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  },
);

const deleteCategoryAsync = createAsyncThunk(
  "categories/delete",
  async ({ toast, dispatch, id, modalRef }, { rejectWithValue }) => {
    try {
      const response = await Api.delete(`/cms/categories/${id}`);

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

      dispatch(categoriesIndexAsync());
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  },
);

export {
  categoriesIndexAsync,
  createCategoryAsync,
  updateCategoryAsync,
  showCategoriesAsync,
  deleteCategoryAsync,
};
