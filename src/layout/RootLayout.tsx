import { Outlet } from "react-router-dom"

export default function RootLayout() {
  return (
    <>
      {/* <Header /> */}
      {/* <p>Meu header</p> */}
      <section>
        {/* INICIO - Renderização das páginas */}
        <Outlet />
        {/* FIM - Renderização das páginas */}
      </section>
      {/* <p>Meu footer</p> */}
      {/* <Footer /> */}
    </>
  )
}
