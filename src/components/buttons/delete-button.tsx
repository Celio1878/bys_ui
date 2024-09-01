import { Trash2 } from "lucide-react";
import { FC } from "react";

interface DeleteButtonProps {
  onClick: VoidFunction;
}

export const DeleteButton: FC<DeleteButtonProps> = ({ onClick }) => {
  return (
    <button id="delete-button" title={"Remover"} onClick={onClick}>
      <Trash2 className="w-5 h-5 text-red-500 hover:opacity-70" />
    </button>
  );
};
