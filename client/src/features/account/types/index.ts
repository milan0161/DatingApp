type ReqLogin = {
  username: string;
  password: string;
};

type User = {
  username: string;
  token: string;
};
interface IAccountInitalState {
  user: User;
  isLoggedIn: boolean;
}
