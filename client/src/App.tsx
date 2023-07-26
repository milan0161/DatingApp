import { RouterProvider } from 'react-router-dom';
import { router } from './app/router/Routes';

import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from './app/hooks/hooks';

import { decodedAToken } from './app/utils/decodeTokens';
import { getAToken, getMainImage } from './app/utils/saveToken';
import { onLogout, onLogin } from './features/account/state/accountSlice';

function App() {
  const isLoggedIn = useAppSelector((state) => state.account.isLoggedIn);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isLoggedIn === true) {
      return;
    }
    const token = getAToken();
    if (!token) {
      dispatch(onLogout());
      return;
    }
    const decodedToken = decodedAToken(token);
    const mainPhoto = getMainImage();
    dispatch(
      onLogin({
        token,
        username: decodedToken!.unique_name,
        photoUrl: mainPhoto!,
      }),
    );
  }, [isLoggedIn]);

  return <RouterProvider router={router} />;
}

export default App;
