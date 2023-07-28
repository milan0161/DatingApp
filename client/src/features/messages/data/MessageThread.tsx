import { useGetMessageThreadQuery } from '../api/messagesApi';
import LoadingSpinner from '../../common/UI/LoadingSpinner';
import SingleMessage from './SingleMessage';
import SendMessageForm from './SendMessageForm';

type MessageThreadProps = {
  username: string;
};

const MessageThread = ({ username }: MessageThreadProps) => {
  const { data: messages, isLoading } = useGetMessageThreadQuery(username);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="">
      {messages && messages?.length > 0 && (
        <ul className="overflow-auto h-[700px]">
          {messages.map((message) => {
            return (
              <SingleMessage
                username={username}
                key={message.id}
                message={message}
              />
            );
          })}
        </ul>
      )}
      <div className="px-3 py-2 bg-slate-300 border-t border-slate-500 rounded">
        <SendMessageForm username={username} />
      </div>
    </div>
  );
};

export default MessageThread;
