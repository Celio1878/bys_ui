import { FC } from "react";
import { UserImage } from "@/components/user-image";
import { Siren } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CommentProps {
  user_name: string;
}

export const Comment: FC<CommentProps> = ({ user_name }) => {
  return (
    <div className="flex flex-col w-11/12 self-center">
      <div className="flex flex-row w-full gap-4">
        <span className="flex flex-col items-center gap-1">
          <UserImage width={40} height={40} />
          <p className="max-w-[10rem] text-xs opacity-60 text-center">
            {user_name}
          </p>
        </span>
        <p className="w-full bg-slate-100 rounded-md py-2 px-4 text-sm dark:bg-neutral-950 dark:border dark:border-neutral-900">
          Comentario criado por <strong>{user_name}</strong>
        </p>

        <Button className="self-center" size={"icon"} variant="destructive">
          <Siren size={25} />
        </Button>
      </div>
    </div>
  );
};
