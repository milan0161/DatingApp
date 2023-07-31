import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../app/hooks/hooks';
import { setTabsetValue } from '../../members/state/memberSlice';
import { useDeleteMessageMutation } from '../api/messagesApi';
import UserPhoto from '../../../assets/UserPhoto.svg';

import { showSucces } from '../../../app/utils/ToastMsg';
type MessageInboxProps = {
  message: Message;
  container: string;
};
const MessageInbox = ({ container, message }: MessageInboxProps) => {
  const navigate = useNavigate();
  const [deleteMessage, { isSuccess }] = useDeleteMessageMutation();
  const dispatch = useAppDispatch();

  const recipientPhoto = message.recipientPhotoUrl
    ? message.recipientPhotoUrl
    : UserPhoto;
  const senderPhoto = message.senderPhotoUrl
    ? message.senderPhotoUrl
    : UserPhoto;

  const toMessagesHandler = () => {
    navigate(
      `/members/${
        container === 'Outbox'
          ? message.recipientUsername
          : message.senderUsername
      }`,
    );
    dispatch(setTabsetValue(3));
  };

  const deleteMessageHandler = () => {
    deleteMessage(message.id);
  };

  if (isSuccess) {
    showSucces('You have successfully deleted message');
  }
  return (
    <tr className="hover:bg-slate-100 duration-150">
      <td className="" onClick={toMessagesHandler}>
        {message.content}
      </td>
      <td className="flex items-center justify-center">
        <div className=" flex gap-2 items-center py-2  justify-center">
          <img
            className="rounded-full max-h-[50px]"
            //   src={message.recipientPhotoUrl}
            src={container == 'Outbox' ? recipientPhoto : senderPhoto}
            alt={
              container === 'Outbox'
                ? message.recipientUsername
                : message.senderUsername
            }
          />

          <p className="">
            <strong>
              {container === 'Outbox'
                ? message.recipientUsername
                : message.senderUsername}
            </strong>
          </p>
        </div>
      </td>
      <td className=" text-center">
        {new Date(message.messageSent).toDateString()}
      </td>
      <td className="text-center">
        <button
          onClick={deleteMessageHandler}
          className="bg-red-600 text-white px-2 py-1 rounded border border-red-600 hover:bg-white hover:text-red-600 duration-200"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default MessageInbox;
