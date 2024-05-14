import { FC } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface InputFormFieldProps {
  name: string;
  label: string;
  form_control: any;
  placeholder?: string;
}

export const InputFormField: FC<InputFormFieldProps> = ({
  name,
  label,
  form_control,
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
            <Input placeholder={placeholder} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
