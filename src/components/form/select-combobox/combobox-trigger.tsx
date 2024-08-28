import { FC } from "react";
import { FormControl } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown } from "lucide-react";
import { PopoverTrigger } from "@/components/ui/popover";

interface ComboboxTriggerProps {
  buttonText: string;
}

export const ComboboxTrigger: FC<ComboboxTriggerProps> = ({ buttonText }) => {
  return (
    <PopoverTrigger asChild>
      <FormControl>
        <Button variant="outline" role="combobox" className="justify-between">
          <span className="text-sm font-medium opacity-50">{buttonText}</span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </FormControl>
    </PopoverTrigger>
  );
};
