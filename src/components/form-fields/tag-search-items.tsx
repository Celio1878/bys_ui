import { FC } from "react";
import { Badge } from "@/components/ui/badge";

interface TagSearchItemsProps {
  tags: string[];
}

export const TagSearchItems: FC<TagSearchItemsProps> = ({ tags }) => {
  return (
    <div className="flex flex-wrap gap-1">
      {tags.map((tag, i) => (
        <Badge variant="outline" key={i}>
          {tag}
        </Badge>
      ))}
    </div>
  );
};
