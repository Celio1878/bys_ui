import { FC } from "react";
import { UserImage } from "@/components/user-image";
import { Flag } from "lucide-react";

interface CommentProps {
  userName: string;
}

export const Comment: FC<CommentProps> = ({ userName }) => {
  return (
    <div className="flex flex-col w-11/12 self-center">
      <div className="flex flex-row w-full gap-4">
        <span className="flex flex-col items-center gap-1">
          <UserImage width={40} height={40} />
          <p className="max-w-[10rem] text-xs opacity-60 text-center">
            {userName}
          </p>
        </span>
        <p className="w-full bg-slate-100 rounded-md py-2 px-4 text-sm dark:bg-neutral-950 dark:border dark:border-neutral-900">
          Comentario criado por <strong>{userName}</strong>
        </p>

        <button
          className="self-center p-2 rounded-full bg-transparent text-red-500 hover:text-red-600 hover:bg-red-50 hover:scale-125 transition-all duration-300"
          name={`report-comment-${userName}`}
          title={`Reportar comentario de ${userName}`}
        >
          <Flag size={15} />
        </button>
      </div>
    </div>
  );
};
