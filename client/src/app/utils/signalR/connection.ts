import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

const hubUrl = import.meta.env.VITE_REACT_APP_HUB_URL;

export const createHubConnection = (
  setConnection: React.Dispatch<
    React.SetStateAction<HubConnection | undefined>
  >,
  token: string,
) => {
  const connect = new HubConnectionBuilder()
    .withUrl(`${hubUrl}presence`, {
      accessTokenFactory: () => token!,
    })
    .build();
  setConnection(connect);
};

export const startConnection = (
  connection: HubConnection | undefined,
  dispatch: any,
  addNewOnlineUser: any,
  removeUser: any,
) => {
  connection?.start().catch((err) => console.log(err));
  connection?.on('UserIsOnline', (username) => {
    dispatch(addNewOnlineUser(username));
  });

  connection?.on('UserIsOffline', (username) => {
    dispatch(removeUser(username));
  });
};

export const stopHubConnection = (connection: HubConnection) => {
  connection
    ?.stop()
    .then(() => {
      'Disconnected';
    })
    .catch((err) => console.log(err));
};
export const createMessageConnection = (
  setConnection: any,
  username: string,

  token: string,
) => {
  const connection = new HubConnectionBuilder()
    .withUrl(`${hubUrl}message?user=${username}`, {
      accessTokenFactory: () => token!,
    })
    .withAutomaticReconnect()
    .build();

  setConnection(connection);
};

export const startMessageConnection = (
  connection: HubConnection,
  dispatch: any,
  setMessages: any,
  addNewMessage: any,
  updateMessages: any,
  username: string,
) => {
  connection
    .start()
    .then()
    .catch((err) => console.log(err));
  connection.on('ReceiveMessageThread', (messages) => {
    dispatch(setMessages(messages));
  });

  connection.on('UpdatedGroup', (group: Group) => {
    if (group.connections.some((x) => x.username === username)) {
      dispatch(updateMessages());
    }
  });
  connection.on('NewMessage', (data) => {
    dispatch(addNewMessage(data));
  });
};
