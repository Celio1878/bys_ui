import { FC, memo, useCallback } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";

interface InputFormFieldProps {
  name: string;
  label: string;
  form: UseFormReturn;
  placeholder?: string;
  disabled?: boolean;
}

export const InputFormField: FC<InputFormFieldProps> = memo(
  ({ name, label, form, placeholder, disabled }) => {
    form.watch(name);

    const renderFormField = useCallback(
      ({ field }: any) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input placeholder={placeholder} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      ),
      [label, placeholder],
    );

    return (
      <FormField
        disabled={disabled}
        control={form.control}
        name={name}
        render={renderFormField}
      />
    );
  },
);

InputFormField.displayName = "InputFormField";
