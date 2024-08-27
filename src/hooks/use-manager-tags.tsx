import { useCallback, useMemo, useRef } from "react";
import { Tag } from "@/app/model/tags";
import { UseFormReturn } from "react-hook-form";
import { createTag } from "@/utils/create-tag";

interface UseManagerTagsProps {
  form: UseFormReturn;
  name: string;
  onChange: (tag: Tag<string>) => void;
}

export const useManagerTags = ({
  form,
  name,
  onChange,
}: UseManagerTagsProps) => {
  const tags: Tag<string>[] = form.watch(name);

  const sanitizedTags = useMemo(() => new Set(tags.map((t) => t.id)), [tags]);

  const ref: any = useRef(null);

  const handleKeyDown = useCallback(
    (event: any) => {
      if (event.key === "Enter") {
        event.preventDefault();
        const value = ref.current?.value;
        if (!value) return;
        const tag = createTag(value);

        if (sanitizedTags.has(tag.id)) return;

        onChange(tag);
        ref.current.value = "";
        event.stopPropagation();
      }
    },
    [onChange, sanitizedTags],
  );

  const handleSelectedTag = useCallback(
    (selectedTag: Tag<string>, onRemove: (index: number) => void) => {
      const tagIndex = tags.findIndex((t) => t.id === selectedTag.id);
      sanitizedTags.has(selectedTag.id)
        ? onRemove(tagIndex)
        : onChange(selectedTag);
    },
    [onChange, sanitizedTags, tags],
  );

  return {
    handleKeyDown,
    handleSelectedTag,
    ref,
    sanitizedTags,
    tags,
  };
};
