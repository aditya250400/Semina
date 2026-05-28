import { createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../../utils/fetch";
import Cookies from "js-cookie";

const loginAsync = createAsyncThunk(
  "auth/login",

  async ({ form: credentials, setForm }, { rejectWithValue }) => {
    try {
      const response = await Api.post("/auth/login", credentials);

      Cookies.set("token", response.data.data.token);
      setForm({ email: "", password: "" });

      alert("login success");

      return {
        token: response.data.data.token,
      };
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  },
);

export { loginAsync };
