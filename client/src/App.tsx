import { RouterProvider } from 'react-router-dom';
import { router } from './app/router/Routes';

import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from './app/hooks/hooks';
import { onLogin } from './features/account/state/accountSlice';
import { getAToken, getMainImage } from './app/utils/saveToken';
import { decodedAToken } from './app/utils/decodeTokens';
import { setIsAdmin } from './features/admin/state/adminSlice';

function App() {
  const isLoggedIn = useAppSelector((state) => state.account.isLoggedIn);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isLoggedIn === true) {
      return;
    }
    const token = getAToken();
    if (token) {
      const decodedToken = decodedAToken(token);
      const imageUrl = getMainImage();
      dispatch(
        onLogin({
          token,
          username: decodedToken!.unique_name,
          photoUrl: imageUrl!,
        }),
      );
      if (!Array.isArray(decodedToken?.role)) {
        if (
          decodedToken?.role == 'Admin' ||
          decodedToken?.role == 'Moderator'
        ) {
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
      }
    }
  }, [isLoggedIn]);

  return <RouterProvider router={router} />;
}

export default App;
