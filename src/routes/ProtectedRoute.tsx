import { Navigate, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
  isAllowed: boolean;
  redirectPath: string;
}

export default function ProtectedRoute({ children, isAllowed, redirectPath }: ProtectedRouteProps) {
  const location = useLocation();
  const allowed = isAllowed || (location.state && location.state.isAllowed);

  if (!allowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
}
