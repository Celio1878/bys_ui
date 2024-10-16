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
import { Suspense } from "react";
import { BookDto } from "@/app/model/book-dto";
import { GoogleLoginButton } from "@/components/buttons/google-login-button";
import { toast } from "@/components/ui/use-toast";

const BOOK_SERVICE_URL = String(process.env.NEXT_PUBLIC_BOOKS_API_URL);
const CHAPTER_SERVICE_URL = String(process.env.NEXT_PUBLIC_CHAPTERS_API_URL);

export default function ChapterPage() {
  const { id, chapter_id } = useParams();
  const { data: session, status } = useSession() as any;

  const { data: book } = useSWR(
    `${BOOK_SERVICE_URL}/${id}`,
    fetcher<BookDto>({}).get,
  );

  const { data: chapter, mutate: getChapter } = useSWR(
    session && `${CHAPTER_SERVICE_URL}/${chapter_id}?bookId=${id}`,
    fetcher<ChapterDto>({ token: session?.access_token }).get,
  );

  if (!chapter) return <Loading />;

  if (!session || status === "unauthenticated") {
    toast({
      title: "Você precisa estar logado para LER e COMENTAR!",
      variant: "destructive",
      duration: 10000,
      type: "foreground",
      role: "alert",
      action: <GoogleLoginButton />,
    });

    return (
      <div className="flex flex-row items-center text-red-500 underline gap-2 min-h-[30rem] md:min-h-[45rem] lg:min-h-[29.5rem]">
        <GoogleLoginButton />
        <p>para visualizar e comentar!</p>
      </div>
    );
  }

  return (
    <Suspense fallback={<Loading />}>
      <div className="max-w-9/12 w-full lg:w-10/12 flex flex-col items-center justify-center gap-10 pt-8">
        <BreadcrumbComponent
          bookLink={`/books/${id}`}
          chaptersLink={`/books/${id}/#chapters`}
          chapterTitle={chapter?.title}
          bookTitle={book?.title!}
        />
        <Card className="w-full py-2 px-6 sm:px-16 bg-gray-50 mt-8 sm:mt-0 dark:bg-amber-300 dark:bg-opacity-50">
          <CardHeader>
            <CardTitle className="text-center text-black">
              {chapter?.title}
            </CardTitle>
          </CardHeader>
          <CardContent
            className="flex flex-col gap-1 p-0 leading-6 indent-2.5"
            dangerouslySetInnerHTML={{ __html: chapter?.content! }}
          />
        </Card>

        <ChaptersPagination chaptersTags={book?.chapters!} />
        <Separator />
        <Card className="max-w-full sm:max-w-11/12 lg:max-w-9/12 w-full md:w-10/12 flex flex-col bg-slate-50">
          <CardHeader>
            <CardTitle>Comentarios</CardTitle>
          </CardHeader>
          <Separator />
          <CardContent className="flex flex-col w-full mt-10 gap-8">
            <CreateComment chapter={chapter} onSuccess={getChapter} />

            <Separator />
            {chapter?.comments?.map((comment) => (
              <Comment
                key={comment.id}
                comment={comment}
                onRemove={async (id: string) => {
                  const chapterDto = removeCommentToChapter(chapter, id);
                  await fetcher<ChapterDto>({
                    token: session?.access_token,
                    body: chapterDto,
                  }).put(`${CHAPTER_SERVICE_URL}/${chapter_id}?bookId=${id}`);
                  await getChapter();
                }}
              />
            ))}
          </CardContent>
        </Card>
      </div>
    </Suspense>
  );
}
