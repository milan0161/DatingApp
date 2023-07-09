type WelcomeProps = {
  setRegister: React.Dispatch<React.SetStateAction<boolean>>;
};

const Welcome = ({ setRegister }: WelcomeProps) => {
  return (
    <div className="text-center mt-[50px]">
      <h1 className="text-[50px] mb-5">Find your match</h1>
      <p className="mb-5">
        Come on in to vew your matches... all you need to do is sign up!
      </p>
      <div className="flex justify-center gap-x-2">
        <button
          onClick={() => setRegister(true)}
          className="p-2 px-4 bg-orange-600 font-bold text-white rounded-lg"
        >
          Register
        </button>
        <button className="p-2 bg-cyan-500 text-white font-bold rounded-lg">
          Learn more
        </button>
      </div>
    </div>
  );
};

export default Welcome;
