import { useState } from 'react';
import EditModalData from './EditModalData';

type SingleUserRowProps = {
  username: string;
  role: string[];
};

const SingleUserRow = ({ role, username }: SingleUserRowProps) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const editModalHandler = () => {
    setIsEdit(true);
  };
  const closeEditModal = () => {
    setIsEdit(false);
  };
  return (
    <>
      {isEdit && (
        <EditModalData
          username={username}
          onEdit={closeEditModal}
          memberRoles={role}
        />
      )}
      <tr>
        <td className="p-2">{username}</td>
        <td className="py-2">
          {role.map((r, i) => (
            <span key={i} className="mx-1">
              {r}
            </span>
          ))}
        </td>
        <td className="py-2">
          <button
            onClick={editModalHandler}
            className="text-white bg-cyan-600 rounded px-2 py-1 border border-cyan-600 hover:bg-white hover:text-cyan-600 duration-200"
          >
            Edit roles
          </button>
        </td>
      </tr>
    </>
  );
};

export default SingleUserRow;
