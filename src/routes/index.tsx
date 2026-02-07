import RootLayout from "@/layout/RootLayout"
import ContactPage from "@/pages/Contact/ContactPage"
import HomePage from "@/pages/Home"
import { createBrowserRouter } from "react-router-dom"

export const router = createBrowserRouter([
  {
    // caso hospede no gitpages, modificar rota para funcionar
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/contatos",
        element: <ContactPage />,
      },
    ],
  },
])
