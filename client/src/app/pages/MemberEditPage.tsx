import React, { useEffect } from 'react';
import { useGetMemberQuery } from '../../features/members/api/membersApi';
import MemberTabset from '../../features/members/data/MemberTabset';
import { useAppSelector } from '../hooks/hooks';
import MemberTabPanel from '../../features/members/data/MemberTabPanel';
import UpdateMemberForm from '../../features/members/data/MemberUpdateForm';
import LoadingSpinner from '../../features/common/UI/LoadingSpinner';
import PhotoEditor from '../../features/members/data/PhotoEditor';
import TimeAgo from '../../features/common/date/TimeAgo';
import MemberEdtInfo from '../../features/members/data/MemberEdtInfo';

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
      <MemberEdtInfo member={member} isDirty={isDirty} />
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
