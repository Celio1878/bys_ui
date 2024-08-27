import {FC} from "react";
import {FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {TagSearchItems} from "@/components/form/tag-search-items";
import {UseFormReturn} from "react-hook-form";
import {SelectComboBox} from "@/components/form/select-combobox/select-combobox";

interface SelectItemsSearchFormFieldProps {
  name: string;
  form: UseFormReturn;
  label: string;
  heading: string;
  listItems: { title: string; id: string }[];
  buttonText: string;
  inputPlaceholder?: string;
  textOnEmpty?: string;
}

export const SelectItemsSearchFormField: FC<SelectItemsSearchFormFieldProps> = ({
  form,
  name,
  label,
  inputPlaceholder,
  heading,
  listItems,
  textOnEmpty,
  buttonText,
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>{label}<FormLabel>
          <SelectComboBox
            name={name}
            listItems={listItems}
            form={form}
            heading={heading}
            buttonText={buttonText}
            textOnEmpty={textOnEmpty}
            inputPlaceholder={inputPlaceholder}
          />
          <FormMessage />
          <TagSearchItems tags={field.value} />
        </FormItem>
      )}
    />
  );
};
