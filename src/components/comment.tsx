import { FC } from "react";
import { UserImage } from "@/components/user-image";
import { Flag, Trash2 } from "lucide-react";
import { CommentData } from "@/app/model/chapter-dto";
import { format } from "date-fns";
import { useSession } from "next-auth/react";

interface CommentProps {
  comment: CommentData;
  onRemove: (commentId: string) => void;
}

export const Comment: FC<CommentProps> = ({ onRemove, comment }) => {
  const { data: session } = useSession() as any;
  const userId = session?.user.id;
  const date = format(comment.createdAt, "dd/MM/yyyy");

  return (
    <div className="flex flex-col w-full self-center gap-2 pl-4 md:pl-10">
      <div className="flex flex-row w-full justify-between gap-4">
        <span className="flex flex-row items-center gap-2">
          <UserImage width={40} height={40} />
          <p className="max-w-[10rem] text-xs opacity-60 text-center">
            {comment.author.title}
          </p>
        </span>
        <p className="self-center text-xs opacity-50">{date}</p>
      </div>
      <div className="flex flex-row justify-between gap-4">
        <p className="w-full bg-slate-100 rounded-md py-2 px-4 text-sm dark:bg-neutral-950 dark:border dark:border-neutral-900 opacity-70 dark:opacity-90">
          {comment.content}
        </p>

        {comment.author.id === userId ? (
          <button
            className="text-red-500 hover:opacity-60 transition-all duration-300"
            name={`remove-comment-${comment.author.id}`}
            title={`Remover comentario de ${comment.author.title}`}
            onClick={() => onRemove(comment.id)}
          >
            <Trash2 size={20} />
          </button>
        ) : (
          <button
            className="self-center p-2 rounded-full bg-red-100 bg-opacity-50 dark:bg-transparent text-orange-500 hover:text-red-500 hover:bg-red-50 hover:scale-125 transition-all duration-300"
            name={`report-comment-${comment.author.id}`}
            title={`Reportar comentario de ${comment.author.title}`}
          >
            <Flag size={15} />
          </button>
        )}
      </div>
    </div>
  );
};
