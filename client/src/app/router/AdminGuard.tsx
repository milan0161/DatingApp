import { Outlet, Navigate } from 'react-router-dom';
import { getAToken } from '../utils/saveToken';
import { checkIsAdmin } from '../utils/adminCheck';

const AdminGuard = () => {
  // const isAdmin = useAdminGuard();
  // console.log(isAdmin);
  const aToken = getAToken();
  if (aToken) {
    const isAdmin = checkIsAdmin(aToken!);
    if (isAdmin) return <Outlet />;
  }

  return <Navigate to={'/'} />;
};

export default AdminGuard;
