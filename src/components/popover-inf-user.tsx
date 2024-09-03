import { FC } from "react";
import { PopoverContent } from "@/components/ui/popover";
import { PopoverUserData } from "@/components/popover-user-data";
import { PopoverUserDataButtons } from "@/components/popover-user-data-buttons";

interface PopoverInfUserProps {
  session?: { user: { image: string; name: string; email: string } };
}

export const PopoverInfUser: FC<PopoverInfUserProps> = ({ session }) => {
  return (
    <PopoverContent className="flex flex-col items-center justify-center divide-y gap-4">
      <PopoverUserData {...{ session }} />
      <PopoverUserDataButtons userName={session?.user.name!} />
    </PopoverContent>
  );
};
