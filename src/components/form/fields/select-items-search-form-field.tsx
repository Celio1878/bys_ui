import { FC } from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { TagSearchItems } from "@/components/form/tag-search-items";
import { UseFormReturn } from "react-hook-form";
import { SelectComboBox } from "@/components/form/select-combobox/select-combobox";

interface SelectItemsSearchFormFieldProps {
  name: string;
  form: UseFormReturn;
  label: string;
  heading: string;
  list_items: { title: string; id: string }[];
  button_text: string;
  input_placeholder?: string;
  text_on_empty?: string;
}

export const SelectItemsSearchFormField: FC<SelectItemsSearchFormFieldProps> = ({
  form,
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
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>{label}</FormLabel>
          <SelectComboBox
            name={name}
            list_items={list_items}
            form={form}
            heading={heading}
            button_text={button_text}
            text_on_empty={text_on_empty}
            input_placeholder={input_placeholder}
          />
          <FormMessage />
          <TagSearchItems tags={field.value} />
        </FormItem>
      )}
    />
  );
};
