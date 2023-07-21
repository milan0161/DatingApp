import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './hooks';
import { getAToken } from '../utils/saveToken';
import {
  onLogin,
  onLogout,
  // setIsAuth,
} from '../../features/account/state/accountSlice';
import { decodedAToken } from '../utils/decodeTokens';

const useAuth = () => {
  const isLoggedIn = useAppSelector((state) => state.account.isLoggedIn);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isLoggedIn === true) {
      return;
    }
    const token = getAToken();
    if (!token) {
      dispatch(onLogout());
      // setPersist(false);
      return;
    }
    const decodedToken = decodedAToken(token);
    dispatch(onLogin({ token, username: decodedToken!.nameid }));
  }, [isLoggedIn]);

  return isLoggedIn;
};

export default useAuth;
