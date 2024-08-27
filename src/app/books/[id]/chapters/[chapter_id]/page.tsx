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
import { ChapterDto } from "@/app/model/chapter";
import { Loading } from "@/components/loading";
import { Suspense } from "react";

const CHAPTER_SERVICE_URL = String(process.env.NEXT_PUBLIC_CHAPTERS_API_URL);
const BOOK_SERVICE_URL = String(process.env.NEXT_PUBLIC_BOOKS_API_URL);

export default function ChapterPage() {
  const { id, chapter_id } = useParams();
  const { data: session } = useSession() as any;

  const { data: book } = useSWR(
    `${BOOK_SERVICE_URL}/${id}`,
    fetcher<Stor>({}).get,
  );

  const { data: chapter } = useSWR(
    `${CHAPTER_SERVICE_URL}/${id}/chapters/${chapter_id}`,
    fetcher<ChapterDto>({ token: session?.access_token }).get,
  );

  return (
    <Suspense fallback={<Loading />}>
      <div className="max-w-9/12 flex flex-col items-center justify-center gap-10 pt-8">
        <BreadcrumbComponent
          bookLink={`/books/${id}`}
          chaptersLink={`/books/${id}/#chapters`}
          chapterTitle={chapter?.title}
          bookTitle={book?.title!}
        />
        <Card className="w-full py-2 px-6 sm:px-16 bg-gray-50 mt-8 sm:mt-0">
          <CardHeader>
            <CardTitle className="text-center">{chapter?.title}</CardTitle>
          </CardHeader>
          <CardContent
            className="flex flex-col gap-1 p-0 leading-6 indent-2.5"
            dangerouslySetInnerHTML={{ __html: chapter?.content! }}
          />
        </Card>

        <ChaptersPagination chaptersTags={book?.chapters!} />
        <Separator />
        <Card className="w-full flex flex-col bg-slate-50">
          <CardHeader>
            <CardTitle>Comentarios</CardTitle>
          </CardHeader>
          <Separator />
          <CardContent className="flex flex-col w-full mt-7 gap-10">
            <CreateComment user_name={session?.user.name} />
            <Separator />
            <Comment userName={session?.user.name} />
            <Comment userName={session?.user.name} />
            <Comment userName={session?.user.name} />
          </CardContent>
        </Card>
      </div>
    </Suspense>
  );
}
