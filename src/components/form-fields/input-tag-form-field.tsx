import { FC } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TagItems } from "@/components/form-fields/tag-items";

interface InputTagFormFieldProps {
  form_control: any;
  label: string;
  name: string;
  placeholder?: string;
}

export const InputTagFormField: FC<InputTagFormFieldProps> = ({
  form_control,
  label,
  name,
  placeholder = "",
}) => {
  return (
    <FormField
      control={form_control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              placeholder={placeholder}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  field.onChange([...field.value, event.currentTarget.value]);
                }
              }}
            />
          </FormControl>
          <TagItems tags={field.value} on_change={field.onChange} />
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
