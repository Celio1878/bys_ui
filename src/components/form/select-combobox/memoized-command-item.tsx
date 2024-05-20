import { FC, memo } from "react";
import { CommandItem } from "@/components/ui/command";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface MemoizedCommandItemProps {
  item: { title: string; id: string };
  sanitized_tags: Set<string>;
  remove: (index: number) => void;
  handle_selected_tag: (
    item: { title: string; id: string },
    remove: (index: number) => void,
  ) => void;
}

export const MemoizedCommandItem: FC<MemoizedCommandItemProps> = memo(
  ({ item, sanitized_tags, remove, handle_selected_tag }) => (
    <CommandItem
      className={`${sanitized_tags.has(item.id) ? "bg-slate-100 " : ""}`}
      value={item.id}
      key={item.id}
      onSelect={() => {
        handle_selected_tag(item, remove);
      }}
    >
      <Check
        className={cn(
          "mr-2 h-4 w-4",
          sanitized_tags.has(item.id) ? "opacity-100" : "opacity-0",
        )}
      />
      {item.title}
    </CommandItem>
  ),
);

MemoizedCommandItem.displayName = "MemoizedCommandItem";
