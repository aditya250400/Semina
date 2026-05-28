import { Route, Routes } from "react-router";
import Login from "../pages/signin";
import CategoryIndex from "../pages/Categories/CategoryIndex";
import Dashboard from "../pages/Dashboard";
import ProtectedRoute from "../pages/wrapper/ProtectedRoute";
import LoggedInRoute from "../pages/wrapper/LoggedInRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/categories" element={<CategoryIndex />} />
      </Route>

      <Route element={<LoggedInRoute />}>
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
}
