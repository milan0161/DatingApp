import { useState } from 'react';
import { useAppDispatch } from '../../../app/hooks/hooks';
import { onLogout } from '../../account/state/accountSlice';
import { useNavigate } from 'react-router-dom';
import { removeMainImage, removeToken } from '../../../app/utils/saveToken';
import { stopHubConnection } from '../../../app/utils/signalR/connection';

type DropDownProps = {
  username: string;
};

const Drowdown = ({ username }: DropDownProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // let [prvo, ...ostatak] = username;
  const logoutHandler = () => {
    dispatch(onLogout());
    removeToken();
    removeMainImage();
    navigate('/');
  };
  const toEditHandler = () => {
    navigate('member/edit');
    setIsVisible(false);
  };
  return (
    <>
      <div className=" cursor-pointer my-5 text-center z-10 ml-3 w-36  ">
        <button
          className="w-full"
          onClick={() => setIsVisible((prev) => !prev)}
        >
          {`Welcome ${username}`}
          {/* {"Welcome " + prvo.toUpperCase().concat(...ostatak)} */}
        </button>
        {isVisible && (
          <div className="flex flex-col gap-y-1 bg-slate-500 mt-[25px] border border-slate-800 rounded w-36 items-center py-2">
            <button
              onClick={toEditHandler}
              className="hover:translate-x-2 duration-150 text-white"
            >
              Edit Profile
            </button>
            <button
              onClick={logoutHandler}
              className="hover:translate-x-2 duration-150"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Drowdown;
``;
