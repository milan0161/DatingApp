import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './hooks';
import { getAToken, getMainImage } from '../utils/saveToken';
import { onLogin, onLogout } from '../../features/account/state/accountSlice';
import { decodedAToken } from '../utils/decodeTokens';
import { showError } from '../utils/ToastMsg';

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
      showError('You are not authorized to access.');
      return;
    }
    const decodedToken = decodedAToken(token);
    const imageUrl = getMainImage();
    dispatch(
      onLogin({
        token,
        username: decodedToken!.unique_name,
        photoUrl: imageUrl,
      }),
    );
  }, [isLoggedIn]);

  return isLoggedIn;
};

export default useAuth;
