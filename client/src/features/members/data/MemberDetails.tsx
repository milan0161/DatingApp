import React from 'react';
import { useGetMemberQuery } from '../api/membersApi';
import MemberTabPanel from './MemberTabPanel';
import MemberTabset from './MemberTabset';
import MemberImageList from './MemberPhotoList';

type MemberDetailsProps = {
  username: string;
};

const MemberDetails = ({ username }: MemberDetailsProps) => {
  const [value, setValue] = React.useState(0);
  const { data: member, isLoading } = useGetMemberQuery(username);

  if (isLoading) {
    return <h2 className="text-center mt-10">Loading....</h2>;
  }

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-4 border flex flex-col justify-between border-slate-300 rounded px-4 pt-4">
        <div className="w-full h-[50%] border border-slate-300 px-1 py-1 rounded">
          <img className="w-full h-full" src={member?.photoUrl} alt={member?.knownAs} />
        </div>
        <div className="flex flex-col gap-y-5">
          <div>
            <strong>Location:</strong>
            <p>
              {member!.city}, {member!.country}
            </p>
          </div>
          <div>
            <strong>Age:</strong>
            <p>{member!.age}</p>
          </div>
          <div>
            <strong>Last active:</strong>
            <p>{member!.lastActive}</p>
          </div>
          <div>
            <strong>Member since:</strong>
            <p>{member!.created}</p>
          </div>
        </div>
        <div className="mb-4">
          <div className="flex flex-row items-center justify-center gap-x-5">
            <button className="btn bg-orange-600 text-white font-bold">Like</button>
            <button className="btn bg-green-600 text-white font-bold">Messages</button>
          </div>
        </div>
      </div>
      <div className="col-span-8">
        <MemberTabset
          username={member!.userName}
          interests={member!.interests}
          introduction={member!.introduction}
          lookingFor={member!.lookingFor}
        />
      </div>
    </div>
  );
};

export default MemberDetails;
