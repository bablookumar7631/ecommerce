import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const AdminRoute = ({ element: Component, ...rest }) => {
  const { user, isAuthenticated } = useSelector((store) => store.auth);

  useEffect(() => {
    if (isAuthenticated && user?.designation !== "admin") {
      window.alert("Only admins can access this page.");
    }
  }, [isAuthenticated, user]);

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" />;
  }

  if (user?.designation !== "admin") {
    return <Navigate to="/" />;
  }

  return <Component {...rest} />;
};

export default AdminRoute;