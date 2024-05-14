import { FC } from "react";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface TagItemsProps {
  tags: string[];
  on_change: (tags: string[]) => void;
}

export const TagItems: FC<TagItemsProps> = ({ tags, on_change }) => {
  return (
    <div className="flex flex-wrap gap-1">
      {tags.map((tag: string, i: number) => (
        <Badge className="gap-1.5" variant="outline" key={i}>
          <span>{tag}</span>
          <button
            className="rounded-full p-0.5 hover:bg-slate-200 hover:opacity-75 transition-all duration-150"
            onClick={() => {
              const tag_items = tags.filter((value: string) => tag !== value);
              on_change(tag_items);
            }}
          >
            <X className="w-3 h-3 text-red-500" />
          </button>
        </Badge>
      ))}
    </div>
  );
};
