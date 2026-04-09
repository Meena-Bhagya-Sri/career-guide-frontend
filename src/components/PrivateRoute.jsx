import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, reverse = false }) => {
  const { isAuth, loading } = useContext(AuthContext);

  const token = localStorage.getItem("access_token");

  // ✅ Wait until auth check completes
  if (loading) {
    return <div>Loading...</div>;
  }

  // ✅ Reverse route (login/signup pages)
  if (reverse) {
    return token || isAuth ? <Navigate to="/app" /> : children;
  }

  // ✅ MAIN FIX: check token ALSO
  if (!token) {
    return <Navigate to="/signin" />;
  }

  return children;
};

export default PrivateRoute;