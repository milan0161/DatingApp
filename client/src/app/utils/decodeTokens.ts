import jwtDecode from 'jwt-decode';

export type Role = 'Member' | 'Admin' | 'Moderator';

type User = {
  unique_name: string;
  role: Role | Role[];
  exp: number;
};

export const decodedAToken = (token: string): User | null => {
  return jwtDecode(token);
};
