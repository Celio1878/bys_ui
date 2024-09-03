"use client";

import { FC } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tag } from "@/app/model/tags";
import { NewChapterButton } from "@/components/buttons/new-chapter-button";
import { ChapterListButtons } from "@/components/buttons/chapter-list-buttons";
import { useParams, usePathname, useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { RemoveChapterToast } from "@/components/remove-chapter-toast";
import { fetcher } from "@/hooks/fetcher";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import { BookDto } from "@/app/model/book-dto";

interface MyBookChaptersProps {
  chaptersTags: Tag<string>[];
}

const BOOK_SERVICE_URL = String(process.env.NEXT_PUBLIC_BOOKS_API_URL);
const CHAPTERS_SERVICE_URL = String(process.env.NEXT_PUBLIC_CHAPTERS_API_URL);

export const MyBookChapters: FC<MyBookChaptersProps> = ({ chaptersTags }) => {
  const { data: session } = useSession() as any;
  const pathname = usePathname();
  const { id } = useParams();
  const router = useRouter();

  async function onRemove(chapterId: string) {
    await fetcher<void>({ token: session?.access_token }).delete(
      `${CHAPTERS_SERVICE_URL}/${chapterId}?bookId=${id}`,
    );
  }

  const { data: book, mutate } = useSWR(
    `${BOOK_SERVICE_URL}/${id}`,
    fetcher<BookDto>({ token: session?.access_token }).get,
  );

  function onEdit(chapterId: string) {
    router.push(`${pathname}/chapters/${chapterId}`);
  }

  return (
    <Card className="w-11/12 divide-y divide-dashed divide-slate-200 dark:divide-slate-800">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-4xl">Capitulos</CardTitle>
        <NewChapterButton />
      </CardHeader>
      {chaptersTags.map((chapter) => (
        <CardContent
          key={chapter.id}
          className="flex flex-row items-center justify-between w-full text-sm pt-6"
        >
          <span>{chapter.title}</span>

          <ChapterListButtons
            onRemove={() =>
              toast({
                title: `Tem certeza?`,
                type: "foreground",
                role: "alert",
                className: "border border-red-500",
                action: (
                  <RemoveChapterToast
                    onRemove={() => {
                      Promise.all([
                        onRemove(chapter.id),
                        fetcher({
                          body: removeChapter(book!, chapter.id),
                          token: session?.access_token,
                        }).put(`${BOOK_SERVICE_URL}/${id}`),
                      ]).then(() => {
                        mutate().then(() =>
                          toast({
                            className: "bg-violet-500 text-white",
                            title: `Capitulo ${chapter.title} Removido!`,
                            description: "Livro atualizado com sucesso!",
                            type: "foreground",
                          }),
                        );
                      });
                    }}
                  />
                ),
              })
            }
            onEdit={() => onEdit(chapter.id)}
          />
        </CardContent>
      ))}
    </Card>
  );
};

function removeChapter(book: BookDto, id: string): BookDto {
  book.chapters = book.chapters.filter((t) => t.id !== id);

  return book;
}
