import { faEnvelope, faHeart } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom';
import { useAddLikeMutation } from '../../likes/api/likesApi';
import { showSucces } from '../../../app/utils/ToastMsg';
import LoadingSpinner from '../../common/UI/LoadingSpinner';
import { useDispatch } from 'react-redux';
import { setTabsetValue } from '../state/memberSlice';
import { useAppSelector } from '../../../app/hooks/hooks';
import { faUser } from '@fortawesome/free-solid-svg-icons';

type MemberCardProps = {
  member: Member;
};

const MemberCard = ({ member }: MemberCardProps) => {
  const [addLike, { isSuccess, isLoading }] = useAddLikeMutation();
  const navigate = useNavigate();
  const onlineUsers = useAppSelector((state) => state.notification.onlineUsers);
  const dispatch = useDispatch();
  const onLikeHandler = () => {
    addLike(member.userName);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isSuccess) {
    showSucces('You have successfully liked ' + member.knownAs);
  }

  const toMessagesHandler = () => {
    navigate(`/members/${member.userName}`);
    dispatch(setTabsetValue(3));
  };

  return (
    <div className="border border-slate-300 rounded-lg overflow-hidden member_card w-[213px] h-[291px]">
      <div className="h-3/4 overflow-hidden relative img_wrapper">
        <img
          className="w-full h-full hover:scale-125 duration-700 ease-out"
          src={member.photoUrl}
          alt={member.knownAs}
          loading="lazy"
        />
        <ul className="icon_wrapper">
          <li className="w-10 h-10 flex">
            <Link
              to={`/members/${member.userName}`}
              className="w-full flex items-center justify-center bg-orange-600
               hover:bg-orange-700 duration-200 rounded"
            >
              <FontAwesomeIcon icon={faUser} className="" color="#fff" />
            </Link>
          </li>
          <li className="">
            <button onClick={onLikeHandler} className="icon_btn">
              <FontAwesomeIcon icon={faHeart} color="#fff" />
            </button>
          </li>
          <li className="">
            <button className="icon_btn" onClick={toMessagesHandler}>
              <FontAwesomeIcon icon={faEnvelope} color="#fff" />
            </button>
          </li>
        </ul>
      </div>
      <div className="text-center mt-4">
        <h6 className="font-bold">
          <FontAwesomeIcon
            className="mr-2"
            icon={faUser}
            color={onlineUsers?.includes(member?.userName) ? '#008000' : '#000'}
          />
          {member.userName},<span> {member.age}</span>
        </h6>
        <p className="opacity-60">{member.city}</p>
      </div>
    </div>
  );
};

export default MemberCard;
