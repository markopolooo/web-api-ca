// Protected route wrapper - only renders content if user is authenticated, otherwise redirects to login
import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router";
import { AuthContext } from './contexts/authContext';

const ProtectedRoutes = () => {
  const context = useContext(AuthContext);
  const location = useLocation();

  // Render nested routes if authenticated, otherwise redirect to login page
  return context.isAuthenticated === true ? (
    <Outlet />
  ) : (
    <Navigate to='/login' replace state={{ from: location }} />
  );
};

export default ProtectedRoutes;