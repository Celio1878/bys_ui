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
      <Button
        onClick={on_edit}
        className="bg-sky-700 hover:bg-sky-600 dark:bg-sky-900 dark:hover:bg-sky-800"
      >
        <FilePenLine className="text-slate-100 dark:text-slate-300" />
      </Button>
      <Button variant="destructive" onClick={on_remove}>
        <Trash />
      </Button>
    </div>
  );
};
