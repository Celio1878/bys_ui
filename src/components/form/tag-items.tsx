import { FC } from "react";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { Tag } from "@/app/model/tags";

interface TagItemsProps {
  tags: Tag<string>[];
  on_remove: (index: number) => void;
}

export const TagItems: FC<TagItemsProps> = ({ tags, on_remove }) => {
  return (
    <div className="flex flex-wrap gap-1">
      {tags?.map((t, i) => (
        <Badge
          className="gap-1.5 text-slate-600 bg-sky-50 dark:bg-sky-950"
          variant="outline"
          key={i}
        >
          <span>{t.title}</span>
          <button
            className="rounded-full p-0.5 hover:bg-slate-200 dark:hover:bg-slate-600 hover:opacity-75 transition-all duration-150"
            onClick={(event) => {
              event.preventDefault();
              on_remove(i);
            }}
          >
            <X className="w-3 h-3 text-red-500" />
          </button>
        </Badge>
      ))}
    </div>
  );
};
