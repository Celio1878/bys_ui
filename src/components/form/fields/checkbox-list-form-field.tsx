import { FC } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Tag, Warning } from "@/app/model/tags";
import { Checkbox } from "@/components/ui/checkbox";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import { useManagerTags } from "@/hooks/use-manager-tags";

interface CheckboxListFormFieldProps {
  form: UseFormReturn;
  label: string;
  name: string;
  listItems: Tag<Warning>[];
}

export const CheckboxListFormField: FC<CheckboxListFormFieldProps> = ({
  listItems,
  form,
  label,
  name,
}) => {
  const { append, remove } = useFieldArray({ control: form.control, name });
  const { sanitizedTags, handleSelectedTag } = useManagerTags({
    form,
    name,
    onChange: append,
  });

  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <div className="grid grid-flow-row-dense grid-cols-2 gap-3">
        {listItems.map((item) => (
          <FormField
            key={item.id}
            control={form.control}
            name={name}
            render={() => {
              return (
                <FormItem
                  key={item.id}
                  className="flex flex-row items-center space-x-3 space-y-0"
                >
                  <FormControl>
                    <Checkbox
                      className="bg-white"
                      checked={sanitizedTags.has(item.id)}
                      onCheckedChange={() => handleSelectedTag(item, remove)}
                    />
                  </FormControl>
                  <FormLabel className="font-normal text-xs">
                    {item.title}
                  </FormLabel>
                </FormItem>
              );
            }}
          />
        ))}
      </div>
      <FormMessage />
    </FormItem>
  );
};
