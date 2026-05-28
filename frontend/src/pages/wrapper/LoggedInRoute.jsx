import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function LoggedInRoute() {
  const { token } = useSelector((state) => state.authUser);

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}

export default LoggedInRoute;
