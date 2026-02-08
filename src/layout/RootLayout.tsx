import Header from "@/components/Header";
import { Toaster } from "@/components/ui/sonner";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-6">{children}</main>
      <Toaster />
    </div>
  );
}
