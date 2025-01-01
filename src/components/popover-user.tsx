import { FC, useState } from "react";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { UserImage } from "@/components/user-image";
import { PopoverInfUser } from "@/components/popover-inf-user";

interface Props {
  session?: { user: { image: string; name: string; email: string } };
}

export const PopoverUser: FC<Props> = ({ session }) => {
  const [open, set_open] = useState(false);

  return (
    <Popover open={open} onOpenChange={set_open}>
      <PopoverTrigger>
        <UserImage
          width={100}
          height={100}
          className={"cursor-pointer w-12 h-10 md:w-12 md:h-12"}
        />
      </PopoverTrigger>
      <PopoverInfUser {...{ session }} />
    </Popover>
  );
};
