import { FC, ReactNode, Suspense } from "react";
import { Header } from "@/components/shell/header";
import { NavMenu } from "@/components/shell/nav-menu";
import { Footer } from "@/components/shell/footer";
import { Contents } from "@/components/shell/contents";
import { Separator } from "@/components/ui/separator";
import { Loading } from "@/components/loading";

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <Suspense fallback={<Loading />}>
      <main className="flex flex-col min-h-screen">
        <Header />
        <NavMenu />
        <Separator />
        <Contents> {children} </Contents>
        <Footer />
      </main>
    </Suspense>
  );
};
