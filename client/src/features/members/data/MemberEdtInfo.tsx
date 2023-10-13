import TimeAgo from '../../common/date/TimeAgo';

type MemberEditInfoProps = {
  member: Member | undefined;
  isDirty: boolean;
};

const MemberEdtInfo = ({ member, isDirty }: MemberEditInfoProps) => {
  return (
    <div className="col-span-4 border flex flex-col justify-between border-slate-300 rounded px-4 pt-4 max-h-[676px] max-w-[420px]">
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
          <p>
            <TimeAgo time={member?.lastActive} />
          </p>
        </div>
        <div>
          <strong>Member since:</strong>
          <p>{new Date(member!.created).toDateString()}</p>
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
  );
};

export default MemberEdtInfo;
