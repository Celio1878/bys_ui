import { FC, ReactNode } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface TooltipItemProps {
  trigger: ReactNode | string;
  children: ReactNode;
}

export const PopoverInf: FC<TooltipItemProps> = ({ children, trigger }) => {
  return (
    <Popover>
      <PopoverTrigger className="relative top-11 right-3 float-end cursor-default">
        {trigger}
      </PopoverTrigger>
      <PopoverContent className="text-xs">{children}</PopoverContent>
    </Popover>
  );
};
