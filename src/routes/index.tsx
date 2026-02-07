import ProtectedRoute from "@/components/ProtectedRoute";
import RootLayout from "@/layout/RootLayout";
import { Login } from "@/pages/Login";
import { NotFound } from "@/pages/NotFound";
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
      <ProtectedRoute>
        <RootLayout>
          <UserList />
        </RootLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/users/new",
    element: (
      <ProtectedRoute>
        <RootLayout>
          <UserNew />
        </RootLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/users/:id/edit",
    element: (
      <ProtectedRoute>
        <RootLayout>
          <UserEdit />
        </RootLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
