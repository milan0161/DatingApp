import React, { useEffect } from 'react';
import { useGetMemberQuery } from '../../features/members/api/membersApi';
import MemberTabset from '../../features/members/data/MemberTabset';
import { useAppSelector } from '../hooks/hooks';
import MemberTabPanel from '../../features/members/data/MemberTabPanel';
import UpdateMemberForm from '../../features/members/data/MemberUpdateForm';
import LoadingSpinner from '../../features/common/UI/LoadingSpinner';
import PhotoEditor from '../../features/members/data/PhotoEditor';

// interface FormInput {
//   introduction: string;
//   lookingFor: string;
//   interests: string;
//   city: string;
//   country: string;
// }

const MemberEditPage = () => {
  const [value, setValue] = React.useState(0);
  const [isDirty, setIsDirty] = React.useState<boolean>(false);
  const user = useAppSelector((state) => state.account.user);
  const { data: member, isLoading } = useGetMemberQuery(user.username);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const isDirtyHandler = (isDirty: boolean) => {
    setIsDirty(isDirty);
  };

  return (
    <div className="grid grid-cols-12 w-[80%] mx-auto">
      {/* <div className="flex flex-row justify-evenly items-center col-span-12 border border-red-600 h-40"> */}
      <div className="col-span-4 my-6">
        <h1 className="text-[30px] ">Your Profile</h1>
      </div>
      <div className="col-span-8 overflow-hidden">
        {isDirty && (
          <div className="bg-blue-300 h-20 mt-6 rounded-xl px-4 py-2">
            <p>
              <strong>Information: </strong>You have made changes. Any unsaved
              changes will be lost
            </p>
          </div>
        )}
      </div>
      {/* </div> */}
      <div className="col-span-4 border flex flex-col justify-between border-slate-300 rounded px-4 pt-4 max-h-[676px]">
        <div className="w-full h-[50%] border border-slate-300 px-1 py-1 rounded">
          <img
            className="w-full h-full"
            src={member?.photoUrl}
            loading="lazy"
            alt={member?.knownAs}
          />
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
        <div className="mb-4 border flex flex-row">
          <button
            disabled={!isDirty}
            className="w-full disabled:bg-green-400 py-1 rounded bg-green-600 text-white font-bold"
            form="editForm"
          >
            Save changes
          </button>
        </div>
      </div>
      <div className="col-span-8 block">
        <MemberTabset
          username={member!.userName}
          value={value}
          setValue={setValue}
          labels={['About', 'Edit Photos']}
        >
          <MemberTabPanel value={value} index={0}>
            <UpdateMemberForm
              city={member!.city}
              country={member!.country}
              interests={member!.interests}
              introduction={member!.introduction}
              lookingFor={member!.lookingFor}
              onChange={isDirtyHandler}
              setIsDirty={setIsDirty}
            />
          </MemberTabPanel>
          <MemberTabPanel value={value} index={1}>
            <PhotoEditor photos={member!.photos} />
          </MemberTabPanel>
        </MemberTabset>
      </div>
    </div>
  );
};

export default MemberEditPage;
