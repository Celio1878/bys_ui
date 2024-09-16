"use client";

import { ChapterFormCard } from "@/components/chapter/chapter-form-card";
import { useParams, useRouter } from "next/navigation";
import useSWR from "swr";
import { fetcher } from "@/hooks/fetcher";
import { ChapterDto } from "@/app/model/chapter-dto";
import { useSession } from "next-auth/react";
import { Suspense, useEffect, useState } from "react";
import useSWRMutation from "swr/mutation";
import { toast } from "@/components/ui/use-toast";
import { Loading } from "@/components/loading";
import { BookDto } from "@/app/model/book-dto";
import { Tag } from "@/app/model/tags";

const BOOK_SERVICE_URL = String(process.env.NEXT_PUBLIC_BOOKS_API_URL);
const SERVICE_URL = String(process.env.NEXT_PUBLIC_CHAPTERS_API_URL);

export default function UpdateChapterPage() {
  const router = useRouter();
  const { data: session } = useSession() as any;
  const { id, chapter_id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { data: book } = useSWR(
    `${BOOK_SERVICE_URL}/${id}`,
    fetcher<BookDto>({ token: session?.access_token }).get,
  );

  const { data: chapter, isLoading } = useSWR(
    `${SERVICE_URL}/${chapter_id}?bookId=${id}`,
    fetcher<ChapterDto>({ token: session?.access_token }).get,
  );

  const dto: ChapterDto = {
    ...chapter!,
    title,
    content,
  };

  const { trigger: updateChapter } = useSWRMutation(
    `${SERVICE_URL}/${chapter_id}?bookId=${id}`,
    fetcher<ChapterDto>({ body: dto, token: session?.access_token }).put,
  );

  useEffect(() => {
    if (chapter) {
      setContent(chapter.content);
      setTitle(chapter.title);
    }
  }, [chapter]);

  if (isLoading) return <Loading />;

  return (
    <Suspense fallback={<Loading />}>
      <ChapterFormCard
        formTitle="Atualizar capitulo"
        chapterTitle={title}
        content={chapter ? chapter.content : content}
        onTitleChange={setTitle}
        onContentChange={setContent}
        onSave={() => {
          if (!dto.title || dto.content.length < 10) {
            toast({
              title: "Erro ao salvar capitulo",
              description: "Preencha todos os campos",
              type: "foreground",
            });

            return;
          }

          Promise.all([
            updateChapter(),
            fetcher({
              body: upsertBookChapters(book!, dto),
              token: session?.access_token,
            }).put(`${BOOK_SERVICE_URL}/${id}`),
          ]).then(() => {
            toast({
              className: "bg-violet-500 text-white",
              title: `Capitulo ${dto.title} Salvo!`,
              description: "Livro atualizado com sucesso!",
              type: "foreground",
            });
            router.back();
          });
        }}
      />
    </Suspense>
  );
}

function upsertBookChapters(book: BookDto, chapter: ChapterDto): BookDto {
  const chapterTag: Tag<string> = {
    id: chapter.id,
    title: chapter.title,
  };

  const newBookChapters = book.chapters.map((t) => {
    if (t.id === chapterTag.id) {
      return {
        ...t,
        title: chapterTag.title,
      };
    }
    return t;
  });

  return {
    ...book,
    chapters: newBookChapters,
  };
}
