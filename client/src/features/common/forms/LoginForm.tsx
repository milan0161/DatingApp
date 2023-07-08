import { useLoginMutation } from "../../account/api/accountApi";
import React, { useRef, useEffect } from "react";
import { useAppDispatch } from "../../../app/hooks/hooks";
import { onLogin } from "../../account/state/accountSlice";
const LoginForm = () => {
  const dispatch = useAppDispatch();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [login, { isSuccess, data }] = useLoginMutation();
  const loginHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    login({
      password: passwordRef.current!.value,
      username: emailRef.current!.value,
    });
  };
  useEffect(() => {
    if (isSuccess && data) {
      dispatch(onLogin(data));
    }
    return;
  }, [isSuccess, data, dispatch]);

  return (
    <form onSubmit={loginHandler} className="nav_form">
      <input ref={emailRef} type="text" placeholder="username" />
      <input ref={passwordRef} type="password" placeholder="password" />
      <button>Login</button>
    </form>
  );
};

export default LoginForm;
