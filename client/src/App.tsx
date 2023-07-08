import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import HomePage from "./pages/HomePage";
import ListsPage from "./pages/ListsPage";
import MatchesPage from "./pages/MatchesPage";
import MessagesPage from "./pages/MessagesPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { index: true, element: <HomePage /> },
        {
          path: "lists",
          element: <ListsPage />,
        },
        {
          path: "members",
          element: <MatchesPage />,
        },
        {
          path: "messages",
          element: <MessagesPage />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
