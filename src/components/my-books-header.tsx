import { FC } from "react";
import { BookDrawer } from "@/components/book-drawer";

export const MyBooksHeader: FC = () => {
  return (
    <div className="flex flex-row items-center pt-10 pb-6">
      <h1 className="w-full text-4xl font-bold text-center">Meus Livros</h1>
      <BookDrawer />
    </div>
  );
};
