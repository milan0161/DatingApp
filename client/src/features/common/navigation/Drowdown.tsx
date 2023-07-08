import { useState } from "react";

type DropDownProps = {
  username: string;
};

const Drowdown = ({ username }: DropDownProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  let [prvo, ...ostatak] = username;

  return (
    <>
      <div className=" cursor-pointer my-5 text-center mx-auto">
        <button className="" onClick={() => setIsVisible((prev) => !prev)}>
          {prvo.toUpperCase().concat(...ostatak)}
        </button>
        {isVisible && (
          <div className="flex flex-col gap-y-1 bg-slate-500 mt-[25px] border border-slate-800 rounded w-28 items-center py-2">
            <p className="hover:translate-x-2 duration-150">Edit Profile</p>
            <p className="hover:translate-x-2 duration-150">Logout</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Drowdown;
