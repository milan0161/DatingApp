import jwtDecode from 'jwt-decode';

type User = {
  nameid: string;
  exp: number;
};

export const decodedAToken = (token: string): User | null => {
  return jwtDecode(token);
};
