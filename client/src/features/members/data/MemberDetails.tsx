import { useGetMemberQuery } from '../api/membersApi';
import MemberTabPanel from './MemberTabPanel';
import MemberTabset from './MemberTabset';
import MemberImageList from './MemberPhotoList';
import LoadingSpinner from '../../common/UI/LoadingSpinner';
import MessageThread from '../../messages/data/MessageThread';
import { useAppDispatch, useAppSelector } from '../../../app/hooks/hooks';
import { setTabsetValue } from '../state/memberSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import TimeAgo from '../../common/date/TimeAgo';
import { useNavigate } from 'react-router-dom';
import { useAddLikeMutation } from '../../likes/api/likesApi';
import { showSucces } from '../../../app/utils/ToastMsg';

type MemberDetailsProps = {
  username: string;
};

const MemberDetails = ({ username }: MemberDetailsProps) => {
  const tabsetValue = useAppSelector((state) => state.member.tabsetValue);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onlineUsers = useAppSelector((state) => state.notification.onlineUsers);
  const [addLike, { isSuccess }] = useAddLikeMutation();
  const setValue = (num: number) => {
    dispatch(setTabsetValue(num));
  };

  const { data: member, isLoading } = useGetMemberQuery(username);

  if (isLoading) {
    return <LoadingSpinner />;
  }
  const likeHandler = () => {
    addLike(username);
  };
  if (isSuccess) {
    showSucces('You have successfully liked ' + username);
  }

  const messageHandler = () => {
    navigate(`/members/${username}`);
    dispatch(setTabsetValue(3));
  };

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-4 border flex flex-col justify-between border-slate-300 rounded px-4 pt-4 max-h-[676px] max-w-[420px]">
        <div className="w-full h-[50%] border border-slate-300 px-1 py-1 rounded">
          <img
            className="w-full h-full"
            src={member?.photoUrl}
            alt={member?.knownAs}
            loading="lazy"
          />
        </div>
        <div className="flex flex-col gap-y-4">
          <div className="mt-2">
            <p>
              <FontAwesomeIcon
                className="mr-2"
                icon={faUserCircle}
                color={
                  onlineUsers?.includes(member?.userName!) ? '#008000' : '#000'
                }
              />
              {onlineUsers?.includes(member?.userName!) ? 'Online' : 'Offline'}
            </p>
          </div>
          <div>
            <strong>Location:</strong>
            <p>
              {member?.city}, {member?.country}
            </p>
          </div>
          <div>
            <strong>Age:</strong>
            <p>{member?.age}</p>
          </div>
          <div>
            <strong>Last active:</strong>
            <p>
              <TimeAgo time={member?.lastActive} />
            </p>
          </div>
          <div>
            <strong>Member since:</strong>
            <p>{new Date(member!.created).toDateString()}</p>
          </div>
        </div>
        <div className="mb-4">
          <div className="flex flex-row items-center justify-center gap-x-5">
            <button
              type="button"
              onClick={likeHandler}
              className="btn bg-orange-600 text-white font-bold"
            >
              Like
            </button>
            <button
              type="button"
              onClick={messageHandler}
              className="btn bg-green-600 text-white font-bold"
            >
              Messages
            </button>
          </div>
        </div>
      </div>
      <div className="col-span-8">
        <MemberTabset
          username={member!.userName}
          setValue={setValue}
          value={tabsetValue}
          labels={['About', 'Interest', 'Photos', 'Messages']}
        >
          <MemberTabPanel value={tabsetValue} index={0}>
            <h4 className="text-[30px] text-bold mb-4">Description</h4>
            <p>{member!.introduction}</p>
            <h4 className="text-[30px] text-bold my-4">Looking for</h4>
            <p>{member!.lookingFor}</p>
          </MemberTabPanel>
          <MemberTabPanel value={tabsetValue} index={1}>
            <h4 className="text-[30px] text-bold mb-4">Interests</h4>
            <p>{member!.interests}</p>
          </MemberTabPanel>
          <MemberTabPanel value={tabsetValue} index={2}>
            <MemberImageList images={member!.photos} />
          </MemberTabPanel>
          <MemberTabPanel value={tabsetValue} index={3}>
            <MessageThread username={member!.userName} />
          </MemberTabPanel>
        </MemberTabset>
      </div>
    </div>
  );
};

export default MemberDetails;
