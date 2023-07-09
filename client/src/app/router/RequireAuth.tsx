import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks/hooks";
import { showError } from "../utils/ToastMsg";

const RequireAuth = () => {
  const isAuth = useAppSelector((state) => state.account.isLoggedIn);

  if (!isAuth) {
    showError("Not authorized to access this area");

    return <Navigate to={"/"} />;
  }
  return <Outlet />;
};

export default RequireAuth;
