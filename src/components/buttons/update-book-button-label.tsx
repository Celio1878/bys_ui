import { FC } from "react";
import { FilePenLine } from "lucide-react";

export const UpdateBookButtonLabel: FC = () => {
  return (
    <div id="update-book" title={"Editar Livro"}>
      <FilePenLine className="text-violet-600 dark:text-violet-300 hover:opacity-75 transition-all duration-200" />
    </div>
  );
};
