import { useAppSelector } from "../../../app/hooks/hooks";
import { NavLink } from "react-router-dom";
import LoginForm from "../forms/LoginForm";
import Drowdown from "./Drowdown";

const NavBar = () => {
  const accountState = useAppSelector((state) => state.account);
  return (
    <nav className="navigation_bar">
      <p className=" text-center my-5">
        <NavLink to={"/"} className="text-xl text-white">
          Dating App
        </NavLink>
      </p>
      <ul className="flex text-slate-400 gap-x-9 ml-5 text-lg my-5">
        {accountState.isLoggedIn && (
          <li>
            <NavLink className="text-slate-400" to={"members"}>
              Matches
            </NavLink>
          </li>
        )}
        {accountState.isLoggedIn && <li>List</li>}
        {accountState.isLoggedIn && <li>Messages</li>}
      </ul>
      {!accountState.isLoggedIn && <LoginForm />}
      {accountState.isLoggedIn && (
        <Drowdown username={accountState.user.username} />
      )}
    </nav>
  );
};

export default NavBar;
