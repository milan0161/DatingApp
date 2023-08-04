import { RouterProvider } from 'react-router-dom';
import { router } from './app/router/Routes';

function App() {
  return <RouterProvider router={router} />;
}

export default App;
