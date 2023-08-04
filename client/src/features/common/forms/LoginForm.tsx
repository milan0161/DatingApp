import { useLoginMutation } from '../../account/api/accountApi';
import React, { useRef, useEffect } from 'react';
import { useAppDispatch } from '../../../app/hooks/hooks';
import { onLogin } from '../../account/state/accountSlice';
import { showApiError, showSucces } from '../../../app/utils/ToastMsg';
import { saveMainImgUrl, saveToken } from '../../../app/utils/saveToken';
import { decodedAToken } from '../../../app/utils/decodeTokens';
import { checkIsAdmin } from '../../../app/utils/adminCheck';
import { setIsAdmin } from '../../admin/state/adminSlice';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [login, { isSuccess, data, error, isError }] = useLoginMutation();
  const loginHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    login({
      password: passwordRef.current!.value,
      username: emailRef.current!.value,
    });
  };

  useEffect(() => {
    if (isSuccess && data) {
      const decodedToken = decodedAToken(data.token);
      saveToken(data.token, decodedToken!.exp);
      if (data.photoUrl) {
        saveMainImgUrl(data.photoUrl!, decodedToken!.exp);
      }
      showSucces('You have successfully logged in');
      dispatch(onLogin(data));
      navigate('/members');
      if (checkIsAdmin(data.token)) dispatch(setIsAdmin(true));
    } else if (isError) {
      showApiError(error);
    }
    return;
  }, [isSuccess, data, dispatch, isError, error]);

  return (
    <form onSubmit={loginHandler} className="nav_form">
      <input ref={emailRef} type="text" placeholder="username" />
      <input ref={passwordRef} type="password" placeholder="password" />
      <button>Login</button>
    </form>
  );
};

export default LoginForm;
