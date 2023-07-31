import { decodedAToken } from './decodeTokens';

export const checkIsAdmin = (aToken: string): boolean => {
  let roles: string[] = [];
  const data = decodedAToken(aToken);

  if (Array.isArray(data!.role)) {
    roles = [...data!.role];
  } else {
    roles.push(data!.role);
  }

  if (roles.includes('Admin') || roles.includes('Moderator')) return true;

  return false;
};
