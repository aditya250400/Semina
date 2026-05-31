import { useSelector } from "react-redux";
import AppRoutes from "./routes";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";

export default function App() {
  const { theme } = useSelector((state) => state.theme);

  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", theme);
  }, [theme]);
  return (
    <>
      <Toaster />
      <AppRoutes />
    </>
  );
}
