import { useFieldArray, UseFormReturn } from "react-hook-form";
import { FC } from "react";
import { useManagerTags } from "@/hooks/use-manager-tags";
import { Popover, PopoverContent } from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
} from "@/components/ui/command";
import { MemoizedCommandItem } from "@/components/form/select-combobox/memoized-command-item";
import { ComboboxTrigger } from "@/components/form/select-combobox/combobox-trigger";

interface SelectComboboxProps {
  name: string;
  form: UseFormReturn;
  heading: string;
  list_items: { title: string; id: string }[];
  button_text: string;
  input_placeholder?: string;
  text_on_empty?: string;
}

export const SelectComboBox: FC<SelectComboboxProps> = ({
  form,
  name,
  input_placeholder,
  heading,
  list_items,
  text_on_empty,
  button_text,
}) => {
  const { append, remove } = useFieldArray({ control: form.control, name });
  const { sanitized_tags, handle_selected_tag } = useManagerTags({
    form,
    name,
    onChange: append,
  });

  return (
    <Popover>
      <ComboboxTrigger button_text={button_text} />
      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder={input_placeholder} />
          <CommandList>
            <CommandEmpty>{text_on_empty}</CommandEmpty>
            <CommandGroup heading={heading}>
              {list_items.map((item) => (
                <MemoizedCommandItem
                  key={item.id}
                  item={item}
                  remove={remove}
                  sanitized_tags={sanitized_tags}
                  handle_selected_tag={handle_selected_tag}
                />
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
