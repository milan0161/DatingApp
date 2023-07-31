import Modal from '../../common/UI/Modal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import EditRoleForm from './EditRoleForm';

type EditModalProps = {
  onEdit: () => void;
  username: string;
  memberRoles: string[];
};

const EditModalData = ({ onEdit, username, memberRoles }: EditModalProps) => {
  return (
    <Modal onConfirmBackdrop={onEdit} className="edit_modal ">
      <div className="w-1/3 text-black bg-white py-2 flex flex-col gap-y-3 rounded">
        <div className="flex items-center justify-center">
          <h4 className="text-xl text-center w-full">
            Edit Roles for {username}
          </h4>
          <button
            onClick={onEdit}
            className="text-end flex-[1] mr-2 hover:scale-110 duration-150"
          >
            <FontAwesomeIcon icon={faClose} />
          </button>
        </div>
        <EditRoleForm
          username={username}
          memberRoles={memberRoles}
          onCloseModal={onEdit}
        />
        <div className="flex items-center justify-end p-2">
          <button
            type="submit"
            form="editRoleForm"
            className="text-white bg-orange-600 rounded px-2 py-1 border border-orange-600 hover:bg-white hover:text-orange-600 duration-200"
          >
            Submit
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default EditModalData;
