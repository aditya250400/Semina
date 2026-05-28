/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    theme: localStorage.getItem("theme") || "light",
  },
  reducers: {
    changeTheme: (state, action) => {
      const newTheme = state.theme === "light" ? "dark" : "light";
      state.theme = newTheme;

      localStorage.setItem("theme", newTheme);

      document.documentElement.setAttribute("data-bs-theme", newTheme);
    },
  },
});

export const { changeTheme } = themeSlice.actions;
export default themeSlice.reducer;
