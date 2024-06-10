import { FC } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TagItems } from "@/components/form/tag-items";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import { useManagerTags } from "@/hooks/use-manager-tags";
import { Info } from "lucide-react";
import { PopoverInf } from "@/components/popover-inf";

interface InputTagFormFieldProps {
  label: string;
  name: string;
  placeholder?: string;
  form: UseFormReturn;
}

export const InputTagFormField: FC<InputTagFormFieldProps> = ({
  label,
  name,
  placeholder = "",
  form,
}) => {
  const { append, remove } = useFieldArray({
    control: form.control,
    name,
  });
  const { handle_key_down, ref, tag_values } = useManagerTags({
    form,
    name,
    on_change: append,
  });

  return (
    <FormField
      control={form.control}
      name={name}
      render={() => (
        <>
          <PopoverInf
            trigger={<Info className="w-4 h-4 opacity-70 text-amber-400" />}
          >
            <p className="text-slate-500 dark:text-slate-100">
              <b>Pressione ENTER</b> para inserir uma tag.
            </p>
          </PopoverInf>
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Input
                ref={ref}
                placeholder={placeholder}
                onKeyDown={handle_key_down}
              />
            </FormControl>
            <TagItems tags={tag_values} on_remove={remove} />
            <FormMessage />
          </FormItem>
        </>
      )}
    />
  );
};
