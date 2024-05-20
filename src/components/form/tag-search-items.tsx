import { FC } from "react";
import { Badge } from "@/components/ui/badge";
import { Tag } from "@/app/model/story";

interface TagSearchItemsProps {
  tags: Tag<string>[];
}

export const TagSearchItems: FC<TagSearchItemsProps> = ({ tags }) => {
  return (
    <div className="flex flex-wrap gap-1">
      {tags.map((tag, i) => (
        <Badge className="text-slate-600 bg-sky-50" variant="outline" key={i}>
          {tag.title}
        </Badge>
      ))}
    </div>
  );
};
