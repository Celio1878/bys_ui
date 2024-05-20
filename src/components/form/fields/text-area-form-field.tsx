import { FC, memo } from "react";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useController, UseFormReturn } from "react-hook-form";

interface TextAreaFormFieldProps {
  name: string;
  label: string;
  form: UseFormReturn;
  placeholder?: string;
}

export const TextAreaFormField: FC<TextAreaFormFieldProps> = memo(
  ({ form, placeholder = "", name, label }) => {
    form.watch(name);

    const {
      field: { ref, ...field },
    } = useController({
      name,
      control: form.control,
    });

    return (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <Textarea placeholder={placeholder} ref={ref} {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    );
  },
);

TextAreaFormField.displayName = "TextAreaFormField";
