import jwtDecode from 'jwt-decode';

type User = {
  unique_name: string;
  exp: number;
};

export const decodedAToken = (token: string): User | null => {
  return jwtDecode(token);
};
