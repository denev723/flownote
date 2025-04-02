import { Route, Routes } from "react-router-dom";
import { ROUTES } from "./routesMap";
import DefaultLayout from "../layout/DefaultLayout";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path={ROUTES.dashboard} element={<DefaultLayout />} />
    </Routes>
  );
}
