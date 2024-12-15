"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChaptersPagination } from "@/components/chapters-pagination";
import { BreadcrumbComponent } from "@/components/breadcrumb-component";
import { useParams } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { useSession } from "next-auth/react";
import { CreateComment } from "@/components/create-comment";
import { Comment } from "@/components/comment";
import useSWR from "swr";
import { fetcher } from "@/hooks/fetcher";
import { ChapterDto, removeCommentToChapter } from "@/app/model/chapter-dto";
import { Loading } from "@/components/loading";
import { Suspense, useCallback, useEffect, useMemo } from "react";
import { BookDto } from "@/app/model/book-dto";
import { GoogleLoginButton } from "@/components/buttons/google-login-button";
import { toast } from "@/components/ui/use-toast";

const BOOK_SERVICE_URL = String(process.env.NEXT_PUBLIC_BOOKS_API_URL);
const CHAPTER_SERVICE_URL = String(process.env.NEXT_PUBLIC_CHAPTERS_API_URL);
const UNAUTHENTICATED_MESSAGE = "Você precisa logar para LER e COMENTAR!";

export default function ChapterPage() {
  const { id, chapter_id } = useParams();
  const { data: session, status } = useSession() as any;

  const { data: book } = useSWR(
    `${BOOK_SERVICE_URL}/${id}`,
    fetcher<BookDto>({}).get,
    { revalidateOnFocus: false },
  );

  const {
    data: chapter,
    mutate: getChapter,
    isLoading,
  } = useSWR(
    session && `${CHAPTER_SERVICE_URL}/${chapter_id}?bookId=${id}`,
    fetcher<ChapterDto>({ token: session?.access_token }).get,
    { revalidateOnFocus: false },
  );

  const handleRemoveComment = useCallback(
    async (commentId: string) => {
      if (!chapter) return;
      const chapterDto = removeCommentToChapter(chapter, commentId);
      await fetcher<ChapterDto>({
        token: session?.access_token,
        body: chapterDto,
      }).put(`${CHAPTER_SERVICE_URL}/${chapter_id}?bookId=${id}`);
      await getChapter();
    },
    [chapter, session?.access_token, chapter_id, id, getChapter],
  );

  const memoizedChapterContent = useMemo(
    () => (
      <CardContent
        className="p-3 sm:py-6 flex flex-col gap-1 indent-2.5"
        dangerouslySetInnerHTML={{ __html: chapter?.content || "" }}
      />
    ),
    [chapter?.content],
  );

  useEffect(() => {
    if (status === "unauthenticated") {
      const tenSeconds = 10000;

      toast({
        title: UNAUTHENTICATED_MESSAGE,
        variant: "destructive",
        duration: tenSeconds,
        type: "foreground",
        role: "alert",
        action: <GoogleLoginButton />,
      });
    }
  }, [status]);

  if (status === "unauthenticated") {
    return (
      <div className="flex flex-row items-center justify-center text-red-500 underline gap-2 min-h-[30rem] md:min-h-[45rem] lg:min-h-[29.5rem]">
        <GoogleLoginButton />
        <span>para visualizar!</span>
      </div>
    );
  }

  if (isLoading) return <Loading />;

  return (
    <Suspense fallback={<Loading />}>
      <div className="max-w-9/12 w-full lg:px-28 flex flex-col items-center justify-center gap-10 pt-8">
        <BreadcrumbComponent
          bookLink={`/books/${id}`}
          chaptersLink={`/books/${id}/#chapters`}
          chapterTitle={chapter?.title}
          bookTitle={book?.title!}
        />
        <Card className="w-full py-2 sm:px-16 bg-gray-50 mt-8 sm:mt-0 dark:bg-amber-300 dark:bg-opacity-50">
          <CardHeader>
            <CardTitle className="text-center font-semibold text-2xl md:text-3xl">
              {chapter?.title}
            </CardTitle>
          </CardHeader>
          {memoizedChapterContent}
        </Card>
        <ChaptersPagination chaptersTags={book?.chapters!} />
        <Separator />
        <Card className="max-w-full sm:max-w-11/12 lg:max-w-9/12 w-full md:w-10/12 flex flex-col bg-slate-50">
          <CardHeader>
            <CardTitle>Comentários</CardTitle>
          </CardHeader>
          <Separator />
          <CardContent className="flex flex-col w-full mt-10 gap-8">
            <CreateComment chapter={chapter!} onSuccess={getChapter} />
            <Separator />
            {chapter?.comments?.map((comment) => (
              <Comment
                key={comment.id}
                comment={comment}
                onRemove={handleRemoveComment}
              />
            ))}
          </CardContent>
        </Card>
      </div>
    </Suspense>
  );
}
