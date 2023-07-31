import LoadingSpinner from '../../common/UI/LoadingSpinner';
import { useGetUsersWithRoleQuery } from '../api/adminApi';
import SingleUserRow from './SingleUserRow';

const UsersRoleList = () => {
  const { data, isLoading } = useGetUsersWithRoleQuery();
  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <table className="w-full">
        <thead className="w-full">
          <tr>
            <th className="w-[30%] text-start py-2">Username</th>
            <th className="w-[40%] text-start py-2">Active Roles</th>
            <th className="w-[30%] py-2"></th>
          </tr>
        </thead>
        <tbody className="w-full divide-y-2 border border-slate-300">
          {data?.map((user, index) => {
            return (
              <SingleUserRow
                key={index}
                username={user.username}
                role={user.roles}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UsersRoleList;
