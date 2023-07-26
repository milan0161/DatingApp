type ReqLogin = {
  username: string;
  password: string;
};

type ReqRegister = {
  username: string;
  password: string;
  confirmPassword: string;
  gender: string;
  knownAs: string;
  city: string;
  country: string;
  dateOfBirth: string;
};
type User = {
  username: string;
  token: string;
  photoUrl: string;
  knownAs?: string;
};
interface IAccountInitalState {
  user: User;
  isLoggedIn: boolean | undefined;
}
