import { FC, ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

interface FollowModalProps {
  title: string;
  trigger: ReactNode;
  users: { name: string }[];
}

export const FollowModal: FC<FollowModalProps> = ({
  title,
  trigger,
  users,
}) => {
  return (
    <Dialog>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent className={"max-h-[25rem] overflow-auto"}>
        <DialogDescription></DialogDescription>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <Separator />
        <div className="grid grid-cols-3 gap-4">
          {users?.map((user, index) => {
            return (
              <span className="text-xs font-medium" key={index}>
                {user.name}
              </span>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};
