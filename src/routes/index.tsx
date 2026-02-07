import RootLayout from "@/layout/RootLayout";
import { Login } from "@/pages/Login";
import { UserEdit } from "@/pages/UserEdit";
import UserList from "@/pages/UserList";
import { UserNew } from "@/pages/UserNew";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  // modificar rota para funcionar no gitpages
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: (
      <RootLayout>
        <UserList />
      </RootLayout>
    ),
  },
  {
    path: "/users/new",
    element: (
      <RootLayout>
        <UserNew />
      </RootLayout>
    ),
  },
  {
    path: "/users/:id/edit",
    element: (
      <RootLayout>
        <UserEdit />
      </RootLayout>
    ),
  },
]);
