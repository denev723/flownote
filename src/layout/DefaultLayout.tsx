import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function DefaultLayout() {
  return (
    <div className="flex h-screen bg-base-100">
      <Sidebar />
      <div className="flex flex-col flex-1 ml-64 overflow-hidden">
        <Topbar />
        <main className="flex-1 p-4 pb-16 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
