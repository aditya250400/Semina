import { Route, Routes } from "react-router";
import Dashboard from "../pages/Dashboard";
import CategoryIndex from "../pages/categories";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "../pages/signin";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/categories" element={<CategoryIndex />} />
    </Routes>
  );
}
