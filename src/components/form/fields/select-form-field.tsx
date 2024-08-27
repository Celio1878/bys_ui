import { FC, memo, useCallback } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AgeRange, Copyright, Genre, Tag } from "@/app/model/book-dto";
import { UseFormReturn } from "react-hook-form";

interface SelectFormFieldProps {
  name: string;
  label: string;
  placeholder?: string;
  form: UseFormReturn;
  list_items: Tag<AgeRange | Copyright | Genre>[];
}

export const SelectFormField: FC<SelectFormFieldProps> = memo(
  ({ form, placeholder, label, name, list_items }) => {
    form.watch(name);

    const render_form_field = useCallback(
      ({ field }: any) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="opacity-65">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {list_items.map((item) => (
                <SelectItem
                  className="cursor-pointer hover:font-semibold opacity-100"
                  key={item.id}
                  value={JSON.stringify(item)}
                >
                  {item.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      ),
      [label, placeholder, list_items],
    );

    return (
      <FormField
        control={form.control}
        name={name}
        render={render_form_field}
      />
    );
  },
);

SelectFormField.displayName = "SelectFormField";
