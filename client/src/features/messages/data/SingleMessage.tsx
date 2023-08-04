import { faClock } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TimeAgo from '../../common/date/TimeAgo';
import UserPhoto from '../../../assets/UserPhoto.svg';
type SingleMessageProps = {
  message: Message;
  username: string;
};

const SingleMessage = ({ message, username }: SingleMessageProps) => {
  return (
    <li className="mb-5 pb-5 border-b border-dotted border-slate-300 flex items-center justify-between flex-row-reverse">
      <span>
        <img
          className="max-h-[50px] rounded-full"
          src={message.senderPhotoUrl ? message.senderPhotoUrl : UserPhoto}
          alt={message.senderUsername ? message.senderUsername : UserPhoto}
        />
      </span>
      <div>
        <div className="header">
          <small>
            <span className="text-slate-400">
              <span className="mr-1">
                <FontAwesomeIcon icon={faClock} />
              </span>
              <TimeAgo time={message.messageSent} />
            </span>
            {!message.dateRead && message.senderUsername !== username && (
              <span className="text-red-600">(unread)</span>
            )}
            {message.dateRead && message.senderUsername !== username && (
              <span className="text-green-600">
                (read
                <TimeAgo time={message.dateRead} />)
              </span>
            )}
          </small>
        </div>
        <p>{message.content}</p>
      </div>
    </li>
  );
};

export default SingleMessage;
