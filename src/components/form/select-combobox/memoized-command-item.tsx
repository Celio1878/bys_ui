import { FC, memo } from "react";
import { CommandItem } from "@/components/ui/command";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tag } from "@/app/model/tags";

interface MemoizedCommandItemProps {
  item: Tag<string>;
  sanitizedTags: Set<string>;
  remove: (index: number) => void;
  handleSelectedTag: (
    item: Tag<string>,
    remove: (index: number) => void,
  ) => void;
}

export const MemoizedCommandItem: FC<MemoizedCommandItemProps> = memo(
  ({ item, sanitizedTags, remove, handleSelectedTag }) => (
    <CommandItem
      className={`${sanitizedTags.has(item.id) ? "bg-slate-100 dark:bg-slate-800" : ""}`}
      value={item.title}
      key={item.id}
      onSelect={() => {
        handleSelectedTag(item, remove);
      }}
    >
      <Check
        className={cn(
          "mr-2 h-4 w-4",
          sanitizedTags.has(item.id) ? "opacity-100" : "opacity-0",
        )}
      />
      {item.title}
    </CommandItem>
  ),
);

MemoizedCommandItem.displayName = "MemoizedCommandItem";
