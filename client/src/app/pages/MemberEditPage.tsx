import React from 'react';
import { useGetMemberQuery } from '../../features/members/api/membersApi';
import MemberTabset from '../../features/members/data/MemberTabset';
import { useAppSelector } from '../hooks/hooks';
import MemberTabPanel from '../../features/members/data/MemberTabPanel';
import UpdateMemberForm from '../../features/members/data/MemberUpdateForm';
import LoadingSpinner from '../../features/common/UI/LoadingSpinner';

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
  // const {
  //   formState: { isDirty },
  //   register,
  // } = useForm<FormInput>({
  //   defaultValues: {
  //     city: member!.city,
  //     country: member!.country,
  //     interests: member!.interests,
  //     introduction: member!.introduction,
  //     lookingFor: member!.lookingFor,
  //   },
  // });

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
          labels={['About', 'Interests']}
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
            {/* <form id="editForm">
              <h4 className="text-[30px] text-bold mb-4">Description</h4>
              <textarea
                className="w-full border border-slate-300 rounded p-2"
                rows={6}
                // name="introduction"
                defaultValue={member!.introduction}
                {...register('introduction')}
              ></textarea>
              <h4 className="text-[30px] text-bold mb-4">Looking for</h4>
              <textarea
                className="w-full border border-slate-300 rounded p-2"
                rows={6}
                {...register('lookingFor')}
                defaultValue={member!.lookingFor}
              ></textarea>
              <h4 className="text-[30px] text-bold mb-4">Interests</h4>
              <textarea
                className="w-full border border-slate-300 rounded p-2"
                rows={6}
                {...register('interests')}
                defaultValue={member!.interests}
              ></textarea>
              <h4 className="text-[30px] text-bold mb-4">Location Details</h4>
              <div className="flex items-center gap-x-4">
                <label htmlFor="city">City:</label>
                <input
                  className="border border-slate-300 rounded p-2"
                  type="text"
                  {...register('city')}
                  defaultValue={member!.city}
                  id="city"
                />
                <label htmlFor="country">Country:</label>
                <input
                  className=" border border-slate-300 rounded p-2"
                  type="text"
                  {...register('country')}
                  defaultValue={member!.country}
                  id="country"
                />
              </div>
            </form> */}
          </MemberTabPanel>
          <MemberTabPanel value={value} index={1}>
            <h4 className="text-[30px] text-bold mb-4">Edit Photos</h4>
            <p>Photo edit will go here</p>
          </MemberTabPanel>
        </MemberTabset>
      </div>
    </div>
  );
};

export default MemberEditPage;
