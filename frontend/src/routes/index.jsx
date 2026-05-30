import { Navigate, Route, Routes } from "react-router";
import Login from "../pages/signin";
import CategoryIndex from "../pages/Categories/CategoryIndex";
import Dashboard from "../pages/Dashboard";
import ProtectedRoute from "../pages/wrapper/ProtectedRoute";
import LoggedInRoute from "../pages/wrapper/LoggedInRoute";
import TalentIndex from "../pages/Talents/TalentIndex";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/categories" element={<CategoryIndex />} />
        <Route path="/talents" element={<TalentIndex />} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Route>

      <Route element={<LoggedInRoute />}>
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
}
