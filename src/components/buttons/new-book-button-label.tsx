import { FC } from "react";
import { PlusIcon } from "lucide-react";

export const NewBookButtonLabel: FC = () => {
  return (
    <div
      className={`flex flex-row items-center gap-2 bg-indigo-400 dark:bg-indigo-700 hover:opacity-75 text-white p-2 rounded-lg transition-all duration-500`}
      id="new-book-button-label"
      title="Criar Livro"
    >
      <PlusIcon className={`h-5 w-5`} />
      <span className="hidden sm:block text-sm">Novo Livro</span>
    </div>
  );
};
