import { FC, useState } from "react";
import { ChapterDto, CommentData } from "@/app/model/chapter-dto";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import { fetcher } from "@/hooks/fetcher";
import { ProfileDto } from "@/app/model/profile-dto";
import Image from "next/image";
import { DeleteButton } from "@/components/buttons/delete-button";
import { ReportDrawer } from "@/components/report-drawer";
import { ReportButton } from "@/components/buttons/report-button";
import { useParams } from "next/navigation";
import { UserImage } from "@/components/user-image";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CancelButton } from "@/components/buttons/cancel-button";

interface CommentProps {
  comment: CommentData;
  onRemove: (commentId: string) => void;
  onSuccess: VoidFunction;
  chapter: ChapterDto;
}

const PROFILE_SERVICE_URL = String(process.env.NEXT_PUBLIC_PROFILES_API_URL);
const CHAPTER_SERVICE_URL = String(process.env.NEXT_PUBLIC_CHAPTERS_API_URL);

export const Comment: FC<CommentProps> = ({
  onRemove,
  comment,
  chapter,
  onSuccess,
}) => {
  const { data: session } = useSession() as any;
  const userId = session?.user.id;
  const date = format(comment.createdAt, "dd/MM/yyyy");
  const { id: bookId } = useParams();
  const [answerComment, setAnswerComment] = useState(false);
  const [commentAnswer, setCommentAnswer] = useState("");

  const [openReport, setOpenReport] = useState(false);

  const { data: authorProfile } = useSWR(
    `${PROFILE_SERVICE_URL}/${comment.author.id}`,
    fetcher<ProfileDto>({}).get,
  );

  async function createAnswer() {
    const answerData: CommentData = {
      id: userId + Date.now(),
      author: session?.user,
      content: commentAnswer,
      createdAt: Date.now(),
    };

    comment = {
      ...comment,
      otherComments: comment.otherComments
        ? [...comment.otherComments, answerData]
        : [answerData],
    };

    const chapterDto: ChapterDto = {
      ...chapter,
      comments: chapter.comments.map((c) => {
        if (c.id === comment.id) {
          return comment;
        }
        return c;
      }),
    };

    await fetcher<ChapterDto>({
      token: session?.access_token,
      body: chapterDto,
    })
      .put(`${CHAPTER_SERVICE_URL}/${chapter}?bookId=${bookId}`)
      .then(() => {
        setAnswerComment(false);
        setCommentAnswer("");
        onSuccess();
      });
  }

  function removeOtherComment(commentId: string) {
    comment = {
      ...comment,
      otherComments: comment.otherComments?.filter((c) => c.id !== commentId),
    };

    const chapterDto: ChapterDto = {
      ...chapter,
      comments: chapter.comments.map((c) => {
        if (c.id === comment.id) {
          return comment;
        }
        return c;
      }),
    };

    fetcher<ChapterDto>({
      token: session?.access_token,
      body: chapterDto,
    })
      .put(`${CHAPTER_SERVICE_URL}/${chapter}?bookId=${bookId}`)
      .then(onSuccess);
  }

  return (
    <div className="flex flex-col w-full self-center gap-2 pl-4 md:pl-10">
      <div className="flex flex-row w-full justify-between">
        <span className="flex flex-row items-center gap-2">
          <Image
            className="rounded-full object-cover w-8 h-8"
            loading="lazy"
            decoding="async"
            src={authorProfile ? authorProfile.urlImage : "/user.png"}
            alt="Profile's Image"
            title={authorProfile?.name!}
            width={40}
            height={40}
            quality={100}
          />
          <p className="max-w-[10rem] text-xs opacity-60 text-center">
            {authorProfile?.username}
          </p>
        </span>
        <p className="self-end text-[0.6rem] opacity-50 mr-12">{date}</p>
      </div>
      <div className="flex flex-row justify-between gap-4 items-baseline">
        <div className="flex flex-col w-[95%] justify-end items-end gap-1">
          <p className="w-full bg-slate-100 rounded-md py-2 px-4 text-sm dark:bg-neutral-950 dark:border dark:border-neutral-900 opacity-70 dark:opacity-90">
            {comment.content}
          </p>

          {comment.author.id !== userId && !answerComment && (
            <button
              className="text-xs text-violet-500 dark:text-violet-400 hover:opacity-70 transition-all duration-300"
              onClick={() => setAnswerComment(true)}
            >
              Responder
            </button>
          )}

          {answerComment && (
            <section className="flex flex-col w-full items-end justify-end gap-2">
              <div className="flex flex-row w-full gap-4">
                <span className="flex items-center">
                  <UserImage
                    width={45}
                    height={45}
                    className={"w-12 h-10 md:h-12"}
                  />
                </span>
                <Textarea
                  className="dark:bg-zinc-950 text-sm"
                  placeholder="Insira sua resposta..."
                  name="comment"
                  id="comment"
                  rows={3}
                  value={commentAnswer}
                  onChange={(e) => setCommentAnswer(e.target.value)}
                />
              </div>
              <div className="flex flex-row gap-2">
                <CancelButton onClick={() => setAnswerComment(false)} />
                <Button disabled={!comment} onClick={createAnswer}>
                  Responder
                </Button>
              </div>
            </section>
          )}
        </div>

        {comment.author.id === userId ? (
          <DeleteButton onClick={() => onRemove(comment.id)} />
        ) : (
          <div>
            <ReportDrawer
              isOpen={openReport}
              setIsOpen={setOpenReport}
              trigger={<ReportButton id={"report"} />}
              complements={{ ...comment, bookId }}
            />
          </div>
        )}
      </div>

      {comment.otherComments?.map(async (c) => {
        const author = await fetcher<ProfileDto>({}).get(
          `${PROFILE_SERVICE_URL}/${c.author.id}`,
        );
        const commentDate = format(c.createdAt, "dd/MM/yyyy");

        return (
          <div key={c.id} className="flex flex-col w-11/12 mx-auto gap-1">
            <div className="flex flex-row w-full justify-between gap-4">
              <span className="flex flex-row items-center gap-2">
                <Image
                  className="rounded-full object-cover w-6 h-6"
                  loading="lazy"
                  decoding="async"
                  src={author.urlImage}
                  alt="Profile's Image"
                  title={c.author.title}
                  width={40}
                  height={40}
                  quality={100}
                />
                <p className="max-w-[10rem] text-xs opacity-60 text-center">
                  {author.username}
                </p>
              </span>
              <p className="self-center text-[0.6rem] opacity-50 mr-4 md:mr-8">
                {commentDate}
              </p>
            </div>
            <div className="flex flex-row w-[95%] justify-end items-center gap-2 mb-2">
              <p className="w-full bg-slate-100 rounded-md py-2 px-4 text-sm dark:bg-neutral-950 dark:border dark:border-neutral-900 opacity-70 dark:opacity-90">
                {c.content}
              </p>
              {c.author.id === userId ? (
                <DeleteButton onClick={() => removeOtherComment(c.id)} />
              ) : (
                <div>
                  <ReportDrawer
                    isOpen={openReport}
                    setIsOpen={setOpenReport}
                    trigger={<ReportButton id={"report"} />}
                    complements={{ ...c, bookId }}
                  />
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
