import { useState } from 'react';
import MemberTabSet from '../../features/members/data/MemberTabset';
import MemberTabPanel from '../../features/members/data/MemberTabPanel';
import UsersRoleList from '../../features/admin/data/UsersRoleList';

const AdminPanel = () => {
  const [value, setValue] = useState(0);
  return (
    <div className="container">
      <h1 className="ml-10 my-5">Admin Panel</h1>
      <MemberTabSet
        username="admin"
        value={value}
        setValue={setValue}
        labels={['User Management', 'Photo Management']}
      >
        <MemberTabPanel value={value} index={0}>
          <UsersRoleList />
        </MemberTabPanel>
        <MemberTabPanel value={value} index={1}>
          <h2>Photo Management</h2>
        </MemberTabPanel>
      </MemberTabSet>
    </div>
  );
};

export default AdminPanel;
