import { FC } from "react";
import { FilePenLine } from "lucide-react";

export const UpdateButtonLabel: FC = () => {
  return (
    <>
      <FilePenLine className="text-slate-600 dark:text-slate-300" />
      <span>Editar</span>
    </>
  );
};
