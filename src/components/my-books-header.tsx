import { FC } from "react";
import { BookDrawer } from "@/components/book-drawer";
import { NewBookButtonLabel } from "@/components/buttons/new-book-button-label";

export const MyBooksHeader: FC = () => {
  return (
    <div className="flex flex-row w-full pb-4">
      <h1 className="w-full text-4xl font-bold">Meus Livros</h1>
      <BookDrawer
        button_label={<NewBookButtonLabel />}
        button_type="default"
        modal_title="Novo Livro"
      />
    </div>
  );
};
