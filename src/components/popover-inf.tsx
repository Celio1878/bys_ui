import { FC, ReactNode } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface PopoverInfProps {
  trigger: ReactNode | string;
  children: ReactNode;
}

export const PopoverInf: FC<PopoverInfProps> = ({ children, trigger }) => {
  return (
    <Popover>
      <PopoverTrigger
        className="relative top-11 right-3 float-end"
        title="Pressione ENTER para inserir TAG"
      >
        {trigger}
      </PopoverTrigger>
      <PopoverContent className="text-xs">{children}</PopoverContent>
    </Popover>
  );
};
