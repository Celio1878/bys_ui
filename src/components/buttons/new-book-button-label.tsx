import { FC } from "react";
import { PlusIcon } from "lucide-react";

export const NewBookButtonLabel: FC = () => {
  return (
    <>
      <PlusIcon />
      <span className="hidden sm:block">Novo Livro</span>
    </>
  );
};
