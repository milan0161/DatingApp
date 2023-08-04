import NavBar from '../../features/common/navigation/NavBar';
import { Outlet, useNavigate } from 'react-router-dom';

import { useEffect, useState } from 'react';
import { HubConnection } from '@microsoft/signalr';
import { onLogin } from '../../features/account/state/accountSlice';
import { setIsAdmin } from '../../features/admin/state/adminSlice';
import { setTabsetValue } from '../../features/members/state/memberSlice';
import {
  addNewOnlineUser,
  removeUser,
  setOnlineUsers,
} from '../../features/notification/state/notificationSlice';
import { useAppSelector, useAppDispatch } from '../hooks/hooks';
import { showNewMessage } from '../utils/ToastMsg';
import { decodedAToken } from '../utils/decodeTokens';
import { getAToken, getMainImage } from '../utils/saveToken';
import {
  createHubConnection,
  stopHubConnection,
  startConnection,
} from '../utils/signalR/connection';

const RootLayout = () => {
  const isLoggedIn = useAppSelector((state) => state.account.isLoggedIn);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [connection, setConnection] = useState<HubConnection>();

  const toMessagesHandler = (username: string) => {
    navigate(`/members/${username}`);
    dispatch(setTabsetValue(3));
  };
  const token = getAToken();
  useEffect(() => {
    if (isLoggedIn === true) {
      // createHubConnection(setConnection, token!);
      return;
    }
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
    //  else {
    //   stopHubConnection(connection!);
    // }
  }, [isLoggedIn]);

  useEffect(() => {
    if (token) {
      createHubConnection(setConnection, token!);
    }
    if (!isLoggedIn) stopHubConnection(connection!);
  }, [token, isLoggedIn]);

  useEffect(() => {
    if (connection) {
      startConnection(connection, dispatch, addNewOnlineUser, removeUser);
      connection?.on('GetOnlineUsers', (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });
      connection.on('NewMessageRecieved', ({ username }) => {
        showNewMessage(username).then((data) => {
          if (data === true) {
            toMessagesHandler(username);
          }
        });
      });
    }
  }, [connection]);
  return (
    <>
      <NavBar />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
