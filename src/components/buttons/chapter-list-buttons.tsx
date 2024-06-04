import { FC } from "react";
import { Button } from "@/components/ui/button";
import { FilePenLine, Trash } from "lucide-react";

interface ChapterListButtonsProp {
  on_remove: () => void;
  on_edit: () => void;
}

export const ChapterListButtons: FC<ChapterListButtonsProp> = ({
  on_edit,
  on_remove,
}) => {
  return (
    <div className="flex flex-row gap-2">
      <Button onClick={on_edit}>
        <FilePenLine />
      </Button>
      <Button variant="destructive" onClick={on_remove}>
        <Trash />
      </Button>
    </div>
  );
};
