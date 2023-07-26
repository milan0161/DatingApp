import { Outlet, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';

import { showError } from '../utils/ToastMsg';
import { useEffect } from 'react';
import { getAToken } from '../utils/saveToken';
import { onLogin, onLogout } from '../../features/account/state/accountSlice';
import { decodedAToken } from '../utils/decodeTokens';

const RequireAuth = () => {
  const navigate = useNavigate();

  const isLoggedIn = useAppSelector((state) => state.account.isLoggedIn);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isLoggedIn === true) {
      return;
    }
    const token = getAToken();
    if (!token) {
      dispatch(onLogout());
      navigate('/');
      showError('You are not authorized to access.');
      return;
    }
    const decodedToken = decodedAToken(token);
    dispatch(onLogin({ token, username: decodedToken!.unique_name }));
  }, [isLoggedIn]);

  return <Outlet />;
};

export default RequireAuth;
