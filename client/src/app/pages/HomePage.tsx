import { useState } from 'react';
import RegisterForm from '../../features/common/forms/RegisterForm';
import { useAppSelector } from '../hooks/hooks';
import Welcome from '../../features/common/home/Welcome';
const HomePage = () => {
  const isLoggedIn = useAppSelector((state) => state.account.isLoggedIn);
  const [register, setRegister] = useState<boolean>(false);
  return (
    <>
      {!isLoggedIn && !register && <Welcome setRegister={setRegister} />}
      {!isLoggedIn && register && <RegisterForm setRegister={setRegister} />}
    </>
  );
};

export default HomePage;
