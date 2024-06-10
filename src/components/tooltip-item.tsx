import { FC, ReactNode } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TooltipItemProps {
  trigger: ReactNode | string;
  children: ReactNode;
}

export const TooltipItem: FC<TooltipItemProps> = ({ children, trigger }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          type="button"
          className="relative top-11 right-3 float-end cursor-default"
        >
          {trigger}
        </TooltipTrigger>
        <TooltipContent>{children}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
