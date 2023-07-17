import { useGetMembersQuery } from "../api/membersApi";
import MemberCard from "./MemberCard";
const MemberList = () => {
  const { data, isSuccess } = useGetMembersQuery();

  return (
    <div>
      <div className=" mx-auto mt-4 gap-6 members_list">
        {isSuccess &&
          data &&
          data.map((member) => {
            return <MemberCard key={member.id} member={member} />;
          })}
      </div>
    </div>
  );
};

export default MemberList;
