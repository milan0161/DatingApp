import { useAppSelector } from '../../../app/hooks/hooks';
import { NavLink } from 'react-router-dom';
import LoginForm from '../forms/LoginForm';
import Drowdown from './Drowdown';

const NavBar = () => {
  const accountState = useAppSelector((state) => state.account);

  return (
    <nav className="navigation_bar">
      <p className=" text-center my-5">
        <NavLink to={'/'} className="text-xl text-white">
          Dating App
        </NavLink>
      </p>
      <ul className="flex text-slate-400 gap-x-9 ml-5 text-lg my-5">
        {accountState.isLoggedIn && (
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? 'nav_links active' : 'nav_links'
              }
              to={'members'}
            >
              Matches
            </NavLink>
          </li>
        )}
        {accountState.isLoggedIn && (
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? 'nav_links active' : 'nav_links'
              }
              to={'lists'}
            >
              Lists
            </NavLink>
          </li>
        )}
        {accountState.isLoggedIn && (
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? 'nav_links active' : 'nav_links'
              }
              to={'messages'}
            >
              Messages
            </NavLink>
          </li>
        )}
      </ul>
      {!accountState.isLoggedIn && <LoginForm />}
      {accountState.isLoggedIn && (
        <div className=" flex justify-center">
          <img
            className="h-10 w-10 mt-[15px] border border-black rounded"
            src={accountState.user.photoUrl}
            loading="lazy"
          />
          <Drowdown username={accountState.user.username} />
        </div>
      )}
    </nav>
  );
};

export default NavBar;
