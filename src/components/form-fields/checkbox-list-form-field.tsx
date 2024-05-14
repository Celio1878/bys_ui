import { FC } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Tag } from "@/app/model/story";
import { Checkbox } from "@/components/ui/checkbox";

interface CheckboxListFormFieldProps {
  form_control: any;
  label: string;
  name: string;
  list_items: Tag<any>[];
}

export const CheckboxListFormField: FC<CheckboxListFormFieldProps> = ({
  list_items,
  form_control,
  label,
  name,
}) => {
  return (
    <FormField
      control={form_control}
      name={name}
      render={() => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <div className="grid grid-flow-row-dense grid-cols-2 gap-3">
            {list_items.map((item) => (
              <FormField
                key={item.id}
                control={form_control}
                name={name}
                render={({ field }) => {
                  return (
                    <FormItem
                      key={item.id}
                      className="flex flex-row items-center space-x-3 space-y-0"
                    >
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(item.id)}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([...field.value, item.id])
                              : field.onChange(
                                  field.value?.filter(
                                    (value: string) => value !== item.id,
                                  ),
                                );
                          }}
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
      )}
    />
  );
};
