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

export { categoriesIndexAsync };
