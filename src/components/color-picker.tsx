import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { SwatchBook } from "lucide-react";
import { solid_colors } from "@/utils/list_colors";
import { FC } from "react";

interface ColorPickerProps {
  color: string;
  set_color: (color: string) => void;
}

export const ColorPicker: FC<ColorPickerProps> = ({ set_color, color }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <div className="flex items-center gap-2">
            <SwatchBook size={20} />
            <span
              className="h-4 w-4 rounded !bg-center !bg-cover transition-all"
              style={{ background: color }}
            />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 flex flex-wrap gap-1 mt-0">
        {solid_colors.map((color) => (
          <div
            key={color}
            style={{ background: color }}
            className="rounded-md h-6 w-6 cursor-pointer active:scale-105"
            onClick={() => set_color(color)}
          />
        ))}
      </PopoverContent>
    </Popover>
  );
};
