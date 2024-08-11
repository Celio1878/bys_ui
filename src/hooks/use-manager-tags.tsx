import { useCallback, useMemo, useRef } from "react";
import { Tag } from "@/app/model/story";
import { UseFormReturn } from "react-hook-form";
import { create_tag } from "@/utils/create-tag";

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

  const sanitized_tags = useMemo(
    () => new Set(tags.map((tag) => tag.id)),
    [tags],
  );

  const ref: any = useRef(null);

  const handle_key_down = useCallback(
    (event: any) => {
      if (event.key === "Enter") {
        event.preventDefault();
        const value = ref.current?.value;
        if (!value) return;
        const tag = create_tag(value);

        if (sanitized_tags.has(tag.id)) return;

        onChange(tag);
        ref.current.value = "";
        event.stopPropagation();
      }
    },
    [onChange, sanitized_tags],
  );

  const handle_selected_tag = useCallback(
    (selected_tag: Tag<string>, on_remove: (index: number) => any) => {
      const tag_index = tags.findIndex((tag) => tag.id === selected_tag.id);
      sanitized_tags.has(selected_tag.id)
        ? on_remove(tag_index)
        : onChange(selected_tag);
    },
    [onChange, sanitized_tags, tags],
  );

  return {
    handle_key_down,
    handle_selected_tag,
    ref,
    sanitized_tags,
    tag_values: tags,
  };
};
