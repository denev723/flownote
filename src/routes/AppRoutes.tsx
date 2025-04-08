import { Route, Routes } from "react-router-dom";
import { ROUTES } from "./routesMap";
import DefaultLayout from "../layout/DefaultLayout";
import DashBoard from "../pages/dashboard/DashBoard";
import TodoInputBox from "../pages/todo-bot/TodoInputBox";
import MemoInputbox from "../pages/memo-bot/MemoInputBox";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route path={ROUTES.dashboard} element={<DashBoard />} />
        <Route path={ROUTES.todobot} element={<TodoInputBox />} />
        <Route path={ROUTES.memobot} element={<MemoInputbox />} />
      </Route>
    </Routes>
  );
}
