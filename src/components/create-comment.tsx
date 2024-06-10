import { FC } from "react";
import { UserImage } from "@/components/user-image";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface CreateCommentProps {
  user_name: string;
}

export const CreateComment: FC<CreateCommentProps> = ({ user_name }) => {
  return (
    <section className="flex flex-col w-full items-end justify-end gap-2">
      <div className="flex flex-row w-full gap-4">
        <span className="flex flex-col items-center gap-1">
          <UserImage width={45} height={45} />
          <p className="max-w-[10rem] text-xs opacity-60 text-center">
            {user_name}
          </p>
        </span>
        <Textarea
          className="dark:bg-zinc-950"
          placeholder="Insira seu comentario..."
        />
      </div>
      <Button>Comentar</Button>
    </section>
  );
};
