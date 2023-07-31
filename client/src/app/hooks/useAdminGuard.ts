import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './hooks';
import { getAToken } from '../utils/saveToken';
import { showError } from '../utils/ToastMsg';
import { decodedAToken } from '../utils/decodeTokens';
import { setIsAdmin } from '../../features/admin/state/adminSlice';

const useAdminGuard = () => {
  const isAdmin = useAppSelector((state) => state.admin.isAdmin);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isAdmin === true) {
      return;
    }
    const token = getAToken();
    if (!token) {
      showError('You are not authorized to access');
      return;
    }
    const decodedToken = decodedAToken(token);
    if (!Array.isArray(decodedToken?.role)) {
      if (decodedToken?.role == 'Admin' || decodedToken?.role == 'Moderator') {
        dispatch(setIsAdmin(true));
        return;
      }
    }
    if (
      decodedToken?.role.includes('Admin') ||
      decodedToken?.role.includes('Moderator')
    ) {
      dispatch(setIsAdmin(true));
      return;
    } else {
      showError('You are not authorized to access');
    }
  }, [isAdmin]);

  return isAdmin;
};

export default useAdminGuard;
