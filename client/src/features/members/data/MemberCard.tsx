import {
  faEnvelope,
  faHeart,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type MemberCardProps = {
  member: Member;
};

const MemberCard = ({ member }: MemberCardProps) => {
  return (
    <div className="border border-slate-300 rounded  member_card w-[213px] h-[291px] ">
      <div className="h-3/4 overflow-hidden relative img_wrapper">
        <img
          className="w-full h-full hover:scale-125 duration-700 ease-out"
          src={member.photoUrl}
          alt={member.knownAs}
        />
        <ul className="icon_wrapper">
          <li className="">
            <button className="icon_btn">
              <FontAwesomeIcon icon={faUser} color="#fff" />
            </button>
          </li>
          <li className="">
            <button className="icon_btn">
              <FontAwesomeIcon icon={faHeart} color="#fff" />
            </button>
          </li>
          <li className="">
            <button className="icon_btn">
              <FontAwesomeIcon icon={faEnvelope} color="#fff" />
            </button>
          </li>
        </ul>
      </div>
      <div className="text-center mt-4">
        <h6 className="font-bold">
          <FontAwesomeIcon className="mr-2" icon={faUser} />
          {member.userName}
        </h6>
        <p className="opacity-60">{member.city}</p>
      </div>
    </div>
  );
};

export default MemberCard;
