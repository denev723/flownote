import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function DefaultLayout() {
  return (
    <div className="flex h-screen bg-base-100">
      <Sidebar />
      <Outlet />
    </div>
  );
}
