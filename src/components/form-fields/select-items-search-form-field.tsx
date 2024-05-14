import { FC } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { TagSearchItems } from "@/components/form-fields/tag-search-items";

interface SelectItemsSearchFormFieldProps {
  name: string;
  form_control: any;
  label: string;
  heading: string;
  list_items: { label: string; value: string }[];
  button_text: string;
  input_placeholder?: string;
  text_on_empty?: string;
}

export const SelectItemsSearchFormField: FC<
  SelectItemsSearchFormFieldProps
> = ({
  form_control,
  name,
  label,
  input_placeholder,
  heading,
  list_items,
  text_on_empty,
  button_text,
}) => {
  return (
    <FormField
      control={form_control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className="justify-between"
                >
                  <span className="text-sm font-medium opacity-50">
                    {button_text}
                  </span>
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="p-0">
              <Command>
                <CommandInput placeholder={input_placeholder} />
                <CommandList>
                  <CommandEmpty>{text_on_empty}</CommandEmpty>
                  <CommandGroup heading={heading}>
                    {list_items.map((item) => (
                      <CommandItem
                        value={item.label}
                        key={item.value}
                        onSelect={() => {
                          field.value.includes(item.value)
                            ? field.onChange(
                                field.value?.filter(
                                  (value: string) => value !== item.value,
                                ),
                              )
                            : field.onChange([...field.value, item.value]);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            field.value.includes(item.value)
                              ? "opacity-100"
                              : "opacity-0",
                          )}
                        />
                        {item.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
          <TagSearchItems tags={field.value} />
        </FormItem>
      )}
    />
  );
};
