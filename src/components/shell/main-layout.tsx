import { FC, ReactNode } from "react";
import { Header } from "@/components/shell/header";
import { NavMenu } from "@/components/shell/nav-menu";
import { Footer } from "@/components/shell/footer";
import { Contents } from "@/components/contents";
import { Separator } from "@/components/ui/separator";

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <main className="flex-1 flex-col min-h-screen">
      <Header />
      <NavMenu />
      <Separator />
      <Contents> {children} </Contents>
      <Footer />
    </main>
  );
};
