/* eslint-disable no-unused-vars */
import { createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../../utils/fetch";

const postImageAsync = createAsyncThunk(
  "image/post",

  async ({ newImage, setForm, form }, { rejectWithValue }) => {
    try {
      const response = await Api.post("/cms/images", newImage);
      setForm({ ...form, image: response.data.data._id });

      return response.data.data;
    } catch (e) {
      return rejectWithValue("Internal Server Error");
    }
  },
);

export { postImageAsync };
