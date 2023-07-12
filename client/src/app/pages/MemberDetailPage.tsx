import { useParams } from "react-router-dom";
import MemberDetails from "../../features/members/data/MemberDetails";

const MemberDetailPage = () => {
  const { username } = useParams();
  console.log(username);
  return (
    <div className="w-[80%] mx-auto mt-10">
      <MemberDetails username={username!} />
    </div>
  );
};

export default MemberDetailPage;
