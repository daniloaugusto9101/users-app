import { Outlet } from "react-router-dom"
import { Toaster } from "@/components/ui/sonner"
import Header from "@/components/Header"

export default function RootLayout() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <Outlet />
      </main>

      <Toaster />
    </div>
  )
}
