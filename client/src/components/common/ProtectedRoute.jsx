import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";

import LoadingScreen from "./LoadingScreen";

const ProtectedRoute = () => {
  const { isAuthenticated, initialized } = useSelector(
    (state) => state.auth
  );

  // Backend se auth check complete hone ka wait
  if (!initialized) {
    return <LoadingScreen label="Checking access" />;
  }

  // Login nahi hai
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Login hai
  return <Outlet />;
};

export default ProtectedRoute;