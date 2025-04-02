import { Route, Routes } from "react-router-dom";
import { ROUTES } from "./routesMap";
import DefaultLayout from "../layout/DefaultLayout";
import DashBoard from "../pages/dashboard/DashBoard";
import GPTInputBox from "../pages/todo-bot/GPTInputBox";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route path={ROUTES.dashboard} element={<DashBoard />} />
        <Route path={ROUTES.todobot} element={<GPTInputBox />} />
      </Route>
    </Routes>
  );
}
