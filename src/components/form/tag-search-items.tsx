import { FC } from "react";
import { Badge } from "@/components/ui/badge";
import { Tag } from "@/app/model/tags";

interface TagSearchItemsProps {
  tags: Tag<string>[];
}

export const TagSearchItems: FC<TagSearchItemsProps> = ({ tags }) => {
  return (
    <div className="flex flex-wrap gap-1">
      {tags.map((t, i) => (
        <Badge
          className="text-slate-600 bg-sky-50 dark:bg-sky-950"
          variant="outline"
          key={i}
        >
          {t.title}
        </Badge>
      ))}
    </div>
  );
};
