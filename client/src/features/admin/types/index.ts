interface IAdminInitialState {
  isAdmin: boolean | undefined;
}

interface MemberRoles {
  username: string;
  roles: string[];
}

interface EditRoleReq {
  username: string;
  role: string;
}
