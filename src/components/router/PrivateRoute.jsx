import { Navigate, Outlet } from "react-router-dom";
import { LOGIN } from "../../config/routes/paths";
import { useAuthContext } from "../../Context/authContext";

export default function PrivateRoute() {
  const { isAuthenticated } = useAuthContext();

  if (!isAuthenticated) {
    return <Navigate to={LOGIN} />;
  }
  return (
    <>
      <Outlet />
    </>
  );
}
