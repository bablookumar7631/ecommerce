import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const ClientRoute = ({ element: Component, ...rest }) => {
  const { user, isAuthenticated } = useSelector((store) => store.auth);

  useEffect(() => {
    if (isAuthenticated && user?.designation === "admin") {
      window.alert("Admins cannot access client-side pages.");
    }
  }, [isAuthenticated, user]);

  if (user?.designation === "admin") {
    return <Navigate to="/admin/dashboard" />;
  }

  return <Component {...rest} />;
};

export default ClientRoute;
