import SingleMessage from './SingleMessage';
import SendMessageForm from './SendMessageForm';
import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks/hooks';
import {
  addNewMessage,
  selecetMessagesIds,
  // selectAllMessages,
  setMessages,
  updateMessages,
} from '../state/messagesSlice';
import { HubConnection } from '@microsoft/signalr';
import { getAToken } from '../../../app/utils/saveToken';
import {
  createMessageConnection,
  startMessageConnection,
} from '../../../app/utils/signalR/connection';

type MessageThreadProps = {
  username: string;
};

const MessageThread = ({ username }: MessageThreadProps) => {
  const [messageConnection, setMessageConnection] = useState<HubConnection>();
  const token = getAToken();
  const list = useRef<HTMLUListElement>(null);
  const messages = useAppSelector(selecetMessagesIds);

  // const messages = useAppSelector(selectAllMessages);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (token) {
      createMessageConnection(setMessageConnection, username, token);
    }
  }, []);

  useEffect(() => {
    const listElement = list.current;
    if (listElement) {
      listElement.scrollTop = listElement.scrollHeight;
    }
  });

  useEffect(() => {
    if (messageConnection) {
      startMessageConnection(
        messageConnection,
        dispatch,
        setMessages,
        addNewMessage,
        updateMessages,
        username,
      );
    }
    return () => {
      messageConnection?.stop();
    };
  }, [messageConnection]);

  return (
    <div className="">
      {!messages ||
        (messages.length == 0 && (
          <p className="my-3">
            No messages yet... say hi by using the message box bellow
          </p>
        ))}
      {messages && messages?.length > 0 && (
        <ul ref={list} className="overflow-auto h-[500px]">
          {messages.map((message) => {
            return (
              <SingleMessage
                username={username}
                // key={message.id}
                key={message}
                // message={message}
                messageId={message}
              />
            );
          })}
        </ul>
      )}
      <div className="px-3 py-2 bg-slate-300 border-t border-slate-500 rounded">
        <SendMessageForm connection={messageConnection} username={username} />
      </div>
    </div>
  );
};

export default MessageThread;
