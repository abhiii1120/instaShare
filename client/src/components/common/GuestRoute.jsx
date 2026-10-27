import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";

import LoadingScreen from "./LoadingScreen";

const GuestRoute = () => {
  const { isAuthenticated, initialized } = useSelector(
    (state) => state.auth
  );

  if (!initialized) {
    return <LoadingScreen label="Loading Kingsta" />;
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default GuestRoute;