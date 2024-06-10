import { FC, useState } from "react";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { UserImage } from "@/components/user-image";
import { PopoverInfUser } from "@/components/popover_inf_user";

interface Props {
  session?: { picture: string; name: string; email: string };
}

export const PopoverUser: FC<Props> = ({ session }) => {
  const [open, set_open] = useState(false);

  return (
    <Popover open={open} onOpenChange={set_open}>
      <PopoverTrigger>
        <UserImage {...{ width: 45, height: 45 }} />
      </PopoverTrigger>
      <PopoverInfUser {...{ session }} />
    </Popover>
  );
};
