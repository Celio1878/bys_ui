import { FC } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

interface TextAreaFormFieldProps {
  name: string;
  label: string;
  form_control: any;
  placeholder?: string;
}

export const TextAreaFormField: FC<TextAreaFormFieldProps> = ({
  form_control,
  placeholder = "",
  name,
  label,
}) => {
  return (
    <FormField
      control={form_control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea placeholder={placeholder} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
