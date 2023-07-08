import { useAppDispatch } from "../../../app/hooks/hooks";
import { useRegisterMutation } from "../../account/api/accountApi";
import React, { useRef } from "react";
import { onLogin } from "../../account/state/accountSlice";

type RegisterFormProps = {
  setRegister: React.Dispatch<React.SetStateAction<boolean>>;
};

const RegisterForm = ({ setRegister }: RegisterFormProps) => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const [register] = useRegisterMutation();

  const registerHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    register({
      username: usernameRef.current!.value,
      password: passwordRef.current!.value,
    })
      .unwrap()
      .then((data) => {
        dispatch(onLogin(data));
        usernameRef.current!.value = "";
        passwordRef.current!.value = "";
      })
      .catch((err) => console.log(err));
  };

  return (
    <form
      className=" flex flex-col gap-3 w-[350px] mx-auto my-10"
      onSubmit={registerHandler}
    >
      <h2 className="text-blue-600 text-[35px] text-center mb-2">Sign up</h2>
      <hr />
      <div className="">
        <input
          className="outline-none border-slate-300 border rounded px-2 py-1 w-[350px] placeholder:text-slate-500"
          ref={usernameRef}
          type="text"
          placeholder="Username"
        />
      </div>
      <div>
        <input
          className="outline-none border-slate-300 border rounded px-2 py-1 w-[350px] placeholder:text-slate-500"
          ref={passwordRef}
          type="password"
          placeholder="password"
        />
      </div>
      <div className="flex justify-center gap-2">
        <button
          type="submit"
          className="bg-green-700 text-white px-2 py-1 rounded"
        >
          Register
        </button>
        <button type="button" onClick={() => setRegister(false)}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
