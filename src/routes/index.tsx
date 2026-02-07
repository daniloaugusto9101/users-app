import RootLayout from "@/layout/RootLayout"
import UserList from "@/pages/UserList"
import { UserNew } from "@/pages/UserNew"
import { createBrowserRouter } from "react-router-dom"

export const router = createBrowserRouter([
  {
    // modificar rota para funcionar no gitpages
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <UserList />,
      },
      {
        path: "/users/new",
        element: <UserNew />,
      },
    ],
  },
])
