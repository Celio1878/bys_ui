import { FC } from "react";
import { Button } from "@/components/ui/button";
import { FilePenLine, Trash } from "lucide-react";

interface ChapterListButtonsProp {
  onRemove: () => void;
  onEdit: () => void;
}

export const ChapterListButtons: FC<ChapterListButtonsProp> = ({
  onEdit,
  onRemove,
}) => {
  return (
    <div className="flex flex-row gap-4">
      <Button
        id="update-chapter-button"
        title="Editar capítulo"
        variant="outline"
        onClick={onEdit}
      >
        <FilePenLine className="text-sky-400 hover:opacity-65 transition-opacity duration-500" />
      </Button>
      <button
        id="remove-chapter-button"
        title="Remover capítulo"
        className="text-red-500 hover:opacity-50 transition-opacity duration-500"
        onClick={onRemove}
      >
        <Trash />
      </button>
    </div>
  );
};
