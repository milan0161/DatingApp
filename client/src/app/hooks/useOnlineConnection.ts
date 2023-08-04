import { HubConnectionBuilder, HubConnection } from '@microsoft/signalr';

import { useState, useEffect } from 'react';
import { getAToken } from '../utils/saveToken';
import { showSucces } from '../utils/ToastMsg';

const useOnlineConnection = () => {
  // const isOnline = useAppSelector(state => state.account.isOnline)

  const [connection, setConnection] = useState<HubConnection>();
  const hubUrl = import.meta.env.VITE_REACT_APP_HUB_URL;
  const aToken = getAToken();

  useEffect(() => {
    const connect = new HubConnectionBuilder()
      .withUrl(`${hubUrl}presence`, {
        accessTokenFactory: () => aToken!,
      })
      .withAutomaticReconnect()
      .build();
    setConnection(connect);
  }, []);

  const createHubConnection = (connection: HubConnection) => {
    connection?.start().catch((err) => console.log(err));
    connection?.on('UserIsOnline', (username) => {
      showSucces(username + ' has connected');
    });

    connection?.on('UserIsOffline', (username) => {
      showSucces(username + ' has desconected');
    });
  };

  const stopHubConnection = (connection: HubConnection) => {
    connection?.stop().catch((err) => console.log(err));
  };

  //   useEffect(() => {
  //     connection?.start().catch((err) => console.log(err));
  //     connection?.on('UserIsOnline', (username) => {
  //       showSucces(username + ' has connected');
  //     });
  //     connection?.on('UserIsOffline', (username) => {
  //       showSucces(username + ' has desconected');
  //     });
  //     return () => {
  //       connection?.stop().catch((err) => console.log(err));
  //     };
  //   }, [connection]);
  return { connection, createHubConnection, stopHubConnection };
};

export default useOnlineConnection;

// const createConnection = (connection: HubConnection) => {
//   connection?.start().catch((err) => console.log(err));
//   connection?.on('UserIsOnline', (username) => {
//     showSucces(username + ' has connected');
//   });

//   connection?.on('UserIsOffline', (username) => {
//     showSucces(username + ' has desconected');
//   });
// };

// const stopHubConnection = (connection: HubConnection) => {
//   connection?.stop().catch((err) => console.log(err));
// };
