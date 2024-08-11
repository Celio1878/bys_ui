import { FC } from "react";
import { BookDrawer } from "@/components/book-drawer";
import { NewBookButtonLabel } from "@/components/buttons/new-book-button-label";

interface MyBooksHeaderProps {
  bookCreated: VoidFunction;
}

export const MyBooksHeader: FC<MyBooksHeaderProps> = ({ bookCreated }) => {
  return (
    <div className="flex flex-row w-full justify-between pb-4">
      <h1 className="text-4xl font-bold">Meus Livros</h1>
      <BookDrawer
        buttonLabel={<NewBookButtonLabel />}
        buttonType="default"
        modalTitle="Novo Livro"
        bookCreated={bookCreated}
      />
    </div>
  );
};
