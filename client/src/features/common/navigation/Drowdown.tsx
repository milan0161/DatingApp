import { useState } from "react";
import { useAppDispatch } from "../../../app/hooks/hooks";
import { onLogout } from "../../account/state/accountSlice";
import { Link, useNavigate } from "react-router-dom";

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
    navigate("/");
  };
  return (
    <>
      <div className=" cursor-pointer my-5 text-center mx-auto z-10">
        <button className="" onClick={() => setIsVisible((prev) => !prev)}>
          {`Welcome ${username}`}
          {/* {"Welcome " + prvo.toUpperCase().concat(...ostatak)} */}
        </button>
        {isVisible && (
          <div className="flex flex-col gap-y-1 bg-slate-500 mt-[25px] border border-slate-800 rounded w-28 items-center py-2">
            <Link to={'member/edit'} className="hover:translate-x-2 duration-150 text-white">Edit Profile</Link>
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
``