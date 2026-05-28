import { createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../../utils/fetch";
import Cookies from "js-cookie";

const loginAsync = createAsyncThunk(
  "auth/login",

  async ({ form: credentials, setForm, navigate }, { rejectWithValue }) => {
    try {
      const response = await Api.post("/cms/auth/login", credentials);

      Cookies.set("token", response.data.data.token);
      Cookies.set("user", JSON.stringify(response.data.data.user));
      setForm({ email: "", password: "" });

      navigate("/dashboard");

      return {
        token: response.data.data.token,
        user: response.data.data.user,
      };
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  },
);

export { loginAsync };
