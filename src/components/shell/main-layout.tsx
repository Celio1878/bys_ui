import { FC, ReactNode } from "react";
import { Header } from "@/components/shell/header";
import { NavMenu } from "@/components/shell/nav-menu";
import { Footer } from "@/components/shell/footer";

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <main className="flex flex-col container py-4">
      <Header />
      <NavMenu />
      {children}
      <Footer />
    </main>
  );
};
