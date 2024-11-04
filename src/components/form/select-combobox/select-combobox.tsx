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
import { Tag } from "@/app/model/tags";

interface SelectComboboxProps {
  name: string;
  form: UseFormReturn;
  heading: string;
  listItems: Tag<string>[];
  buttonText: string;
  inputPlaceholder?: string;
  textOnEmpty?: string;
}

export const SelectComboBox: FC<SelectComboboxProps> = ({
  form,
  name,
  inputPlaceholder,
  heading,
  listItems,
  textOnEmpty,
  buttonText,
}) => {
  const { append, remove } = useFieldArray({ control: form.control, name });
  const { sanitizedTags, handleSelectedTag } = useManagerTags({
    form,
    name,
    onChange: append,
  });

  return (
    <Popover>
      <ComboboxTrigger buttonText={buttonText} />
      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder={inputPlaceholder} />
          <CommandList className="max-h-60 overflow-y-auto">
            <CommandEmpty>{textOnEmpty}</CommandEmpty>
            <CommandGroup heading={heading}>
              {listItems?.map((item) => (
                <MemoizedCommandItem
                  key={item.id}
                  item={item}
                  remove={remove}
                  sanitizedTags={sanitizedTags}
                  handleSelectedTag={handleSelectedTag}
                />
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
