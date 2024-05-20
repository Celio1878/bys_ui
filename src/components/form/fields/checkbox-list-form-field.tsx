import { FC } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Tag, Warning } from "@/app/model/story";
import { Checkbox } from "@/components/ui/checkbox";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import { useManagerTags } from "@/hooks/use-manager-tags";

interface CheckboxListFormFieldProps {
  form: UseFormReturn;
  label: string;
  name: string;
  list_items: Tag<Warning>[];
}

export const CheckboxListFormField: FC<CheckboxListFormFieldProps> = ({
  list_items,
  form,
  label,
  name,
}) => {
  const { append, remove } = useFieldArray({ control: form.control, name });
  const { sanitized_tags, handle_selected_tag } = useManagerTags({
    form,
    name,
    on_change: append,
  });

  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <div className="grid grid-flow-row-dense grid-cols-2 gap-3">
        {list_items.map((item) => (
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
                      checked={sanitized_tags.has(item.id)}
                      onCheckedChange={() => handle_selected_tag(item, remove)}
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
