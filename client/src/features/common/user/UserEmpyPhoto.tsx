import { SizeProp } from '@fortawesome/fontawesome-svg-core';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type UserEmptyPhotoProps = {
  size: SizeProp | undefined;
};

const UserEmpyPhoto = ({ size }: UserEmptyPhotoProps) => {
  return <FontAwesomeIcon className="" size={size} icon={faUser} />;
};

export default UserEmpyPhoto;
