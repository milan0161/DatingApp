import { useState } from 'react';
import { useGetMessagesQuery } from '../api/messagesApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faEnvelopeOpen,
  faPaperPlane,
} from '@fortawesome/free-solid-svg-icons';
import MessageInbox from './MessageInbox';
import PaginationComponent from '../../common/UI/PaginationComponent';
import LoadingSpinner from '../../common/UI/LoadingSpinner';

const MessagesList = () => {
  const [container, setContainer] = useState<string>('Unread');
  const [pagination, setPagination] = useState<PaginationRequest>({
    itemsPerPage: 5,
    page: 1,
  });
  const { data, isLoading } = useGetMessagesQuery({
    ...pagination,
    container: container,
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    event.preventDefault();
    setPagination((curent) => {
      return { ...curent, page: value };
    });
  };

  return (
    <div className="mt-5 container">
      <div>
        <button
          type="button"
          onClick={() => {
            setContainer('Unread');
          }}
          className={`px-2 py-1  text-white rounded-bl rounded-tl hover:bg-red-400 ${
            container === 'Unread' ? 'bg-red-700' : 'bg-red-500'
          }`}
        >
          <FontAwesomeIcon icon={faEnvelope} /> Unread
        </button>
        <button
          type="button"
          onClick={() => {
            setContainer('Inbox');
          }}
          className={`px-2 py-1 bg-red-500 text-white hover:bg-red-400 ${
            container === 'Inbox' ? 'bg-red-700' : 'bg-red-500'
          }`}
        >
          <FontAwesomeIcon icon={faEnvelopeOpen} /> Inbox
        </button>
        <button
          type="button"
          onClick={() => {
            setContainer('Outbox');
          }}
          className={`px-2 py-1 bg-red-500 text-white rounded-tr rounded-br hover:bg-red-400 ${
            container === 'Outbox' ? 'bg-red-700' : 'bg-red-500'
          }`}
        >
          <FontAwesomeIcon icon={faPaperPlane} /> Outbox
        </button>
      </div>
      {data?.data.length === 0 && (
        <div>
          <h3 className="text-center font-bold text-xl">No Messages</h3>
        </div>
      )}
      {data?.data && data.data.length > 0 && (
        <>
          <div>
            <table className="cursor-pointer w-full">
              <thead className="w-full border-b border-slate-300">
                <tr>
                  <th className="w-[40%] text-start">Message</th>
                  <th className="w-[20%]">From / To</th>
                  <th className="w-[20%]">Sent / Recieved</th>
                  <th className="w-[20%]"></th>
                </tr>
              </thead>
              <tbody className="w-full divide-y-2">
                {data.data.map((message) => {
                  return (
                    <MessageInbox
                      key={message.id}
                      message={message}
                      container={container}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="flex justify-center mt-5">
            <PaginationComponent
              count={data.totalPages}
              page={data.currentPage}
              onChange={handleChange}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default MessagesList;
