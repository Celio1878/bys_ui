import { FC } from "react";
import { PopoverContent } from "@/components/ui/popover";
import { PopoverUserData } from "@/components/popover-user-data";
import { PopoverUserDataButtons } from "@/components/popover-user-data-buttons";

interface PopoverInfUserProps {
  session?: { picture: string; name: string; email: string };
  on_close_popover: VoidFunction;
}

export const PopoverInfUser: FC<PopoverInfUserProps> = ({
  session,
  on_close_popover,
}) => {
  return (
    <PopoverContent className="flex flex-col items-center justify-center divide-y gap-4">
      <PopoverUserData {...{ session }} />
      <PopoverUserDataButtons {...{ on_close_popover }} />
    </PopoverContent>
  );
};
