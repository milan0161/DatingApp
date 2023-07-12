import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import HomePage from "../pages/HomePage";
import ListsPage from "../pages/ListsPage";
import MatchesPage from "../pages/MatchesPage";
import MessagesPage from "../pages/MessagesPage";
import RootLayout from "../pages/RootLayout";
import RequireAuth from "./RequireAuth";
import MemberDetailPage from "../pages/MemberDetailPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        element: <RequireAuth />,
        children: [
          {
            path: "lists",
            element: <ListsPage />,
          },
          {
            path: "members",
            element: <MatchesPage />,
          },
          {
            path: "members/:username",
            children: [
              {
                index: true,
                element: <MemberDetailPage />,
              },
            ],
          },
          {
            path: "messages",
            element: <MessagesPage />,
          },
        ],
      },
    ],
  },
]);
