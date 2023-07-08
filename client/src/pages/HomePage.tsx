import { useState } from "react";
import RegisterForm from "../features/common/forms/RegisterForm";

const HomePage = () => {
  const [register, setRegister] = useState<boolean>(false);
  return (
    <>
      {!register && (
        <div className="text-center mt-[50px]">
          <h1 className="text-[50px] mb-5">Find your match</h1>
          <p className="mb-5">
            Come on in to vew your matches... all you need to do is sign up!
          </p>
          <div className="flex justify-center gap-x-2">
            <button
              onClick={() => setRegister(true)}
              className="p-2 bg-blue-600 text-white rounded-lg"
            >
              Register
            </button>
            <button className="p-2 bg-cyan-500 text-black font-bold rounded-lg">
              Learn more
            </button>
          </div>
        </div>
      )}
      {register && <RegisterForm setRegister={setRegister} />}
    </>
  );
};

export default HomePage;
