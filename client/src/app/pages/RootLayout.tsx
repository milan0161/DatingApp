import NavBar from '../../features/common/navigation/NavBar';
import { Outlet } from 'react-router-dom';

const RootLayout = () => {
  return (
    <>
      <NavBar />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
