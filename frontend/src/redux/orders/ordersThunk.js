import { createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../../utils/fetch";

const indexOrdersAsync = createAsyncThunk(
  "orders/index",

  async ({ page, startDate, endDate }, { rejectWithValue }) => {
    try {
      const response = await Api.get(
        `/cms/orders?page=${page}&startDate=${startDate}&endDate=${endDate}`,
      );

      return response.data.data.orders;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  },
);

export { indexOrdersAsync };
