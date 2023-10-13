import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const RequireAuth = () => {
  const isAuth = useAuth();

  if (!isAuth) return <Navigate to={'/'} />;

  return <Outlet />;
};

export default RequireAuth;
