import { FC, useState } from "react";
import { UserImage } from "@/components/user-image";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { fetcher } from "@/hooks/fetcher";
import { addCommentToChapter, ChapterDto } from "@/app/model/chapter-dto";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";

interface CreateCommentProps {
  chapter: ChapterDto;
  onSuccess: VoidFunction;
}

const CHAPTER_SERVICE_URL = String(process.env.NEXT_PUBLIC_CHAPTERS_API_URL);

export const CreateComment: FC<CreateCommentProps> = ({
  chapter,
  onSuccess,
}) => {
  const { data: session } = useSession() as any;
  const { id, chapter_id } = useParams();

  const [comment, setComment] = useState("");

  async function handleSubmit() {
    if (comment) {
      const chapterDto = addCommentToChapter(comment, chapter!, session?.user);
      await fetcher<ChapterDto>({
        token: session?.access_token,
        body: chapterDto,
      }).put(`${CHAPTER_SERVICE_URL}/${chapter_id}?bookId=${id}`);
      setComment("");
      onSuccess();
    }
  }

  return (
    <section className="flex flex-col w-full items-end justify-end gap-2">
      <div className="flex flex-row w-full gap-4">
        <span className="flex items-center">
          <UserImage width={45} height={45} />
        </span>
        <Textarea
          className="dark:bg-zinc-950 text-sm"
          placeholder="Insira seu comentario..."
          name="comment"
          id="comment"
          rows={3}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>
      <Button disabled={!comment} onClick={async () => await handleSubmit()}>
        Comentar
      </Button>
    </section>
  );
};
