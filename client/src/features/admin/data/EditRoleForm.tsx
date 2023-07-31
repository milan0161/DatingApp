import { useForm } from 'react-hook-form';
import { Role } from '../../../app/utils/decodeTokens';
import { useUpdateMemberRoleMutation } from '../api/adminApi';
import LoadingSpinner from '../../common/UI/LoadingSpinner';
import { useRef, useState } from 'react';

type EditRoleFormProps = {
  memberRoles: string[];
  username: string;
  onCloseModal: () => void;
};

const EditRoleForm = ({
  memberRoles,
  username,
  onCloseModal,
}: EditRoleFormProps) => {
  let roles: Role[] = ['Admin', 'Moderator', 'Member'];
  const { register, handleSubmit } = useForm();
  const [updateRole, { isLoading }] = useUpdateMemberRoleMutation();

  const onSubmitEditRole = (data: any) => {
    updateRole({ role: data.role, username: username });
    onCloseModal();
  };
  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmitEditRole)}
      id="editRoleForm"
      className="px-4"
    >
      {roles.map((role) => (
        <div key={role} className="flex gap-x-5 items-center">
          <input
            className="accent-orange-600"
            type="checkbox"
            {...register('role')}
            id="role"
            value={role}
            defaultChecked={memberRoles.includes(role)}
            disabled={username === 'admin' && role === 'Admin'}
          />
          <label htmlFor="role">{role}</label>
        </div>
      ))}
    </form>
  );
};

export default EditRoleForm;
