import { Route, Routes } from "react-router-dom";
import { ROUTES } from "./routesMap";
import DefaultLayout from "../layout/DefaultLayout";
import DashBoard from "../pages/dashboard/DashBoard";
import TodoInputBox from "../pages/todo-bot/TodoInputBox";
import MemoInputbox from "../pages/memo-bot/MemoInputBox";
import TodoComplete from "../pages/todo-bot/TodoComplete";
import { useTodoStore } from "../store/todoStore";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
  const { isComplete } = useTodoStore();
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route path={ROUTES.dashboard} element={<DashBoard />} />
        <Route path={ROUTES.todobot} element={<TodoInputBox />} />
        <Route
          path={`${ROUTES.todobot}/complete`}
          element={
            <ProtectedRoute isAllowed={isComplete} redirectPath={ROUTES.todobot}>
              <TodoComplete />
            </ProtectedRoute>
          }
        />
        <Route path={ROUTES.memobot} element={<MemoInputbox />} />
      </Route>
    </Routes>
  );
}
