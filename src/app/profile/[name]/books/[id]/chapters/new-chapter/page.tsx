"use client";

import { useState } from "react";
import { ChapterFormCard } from "@/components/chapter/chapter-form-card";
import useSWRMutation from "swr/mutation";
import { fetcher } from "@/hooks/fetcher";
import { CreateChapter } from "@/app/model/chapter-dto";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "@/components/ui/use-toast";
import { BookDto, upsertBookChapters } from "@/app/model/book-dto";
import useSWR from "swr";
import { normalizeText } from "@/utils/remove-accents";

const BOOK_SERVICE_URL = String(process.env.NEXT_PUBLIC_BOOKS_API_URL);
const CHAPTERS_SERVICE_URL = String(process.env.NEXT_PUBLIC_CHAPTERS_API_URL);

export default function NewChapterPage() {
  const { data: session } = useSession() as any;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { id } = useParams();
  const router = useRouter();
  const dateNow = Date.now();

  const dto: CreateChapter = {
    id:
      normalizeText(
        title
          .toLowerCase()
          .trim()
          .replaceAll(" ", "-")
          .replaceAll(".", "")
          .replaceAll(",", ""),
      ) + String(dateNow),
    bookId: String(id),
    title: title,
    content: content,
    author: { id: session?.user.id, title: session?.user.name },
    createdAt: dateNow,
  };

  const { data: book } = useSWR(
    `${BOOK_SERVICE_URL}/${id}`,
    fetcher<BookDto>({ token: session?.access_token }).get,
  );

  const { trigger } = useSWRMutation(
    `${CHAPTERS_SERVICE_URL}?bookId=${id}`,
    fetcher<CreateChapter>({ body: dto, token: session?.access_token }).post,
  );

  return (
    <ChapterFormCard
      formTitle="Novo Capítulo"
      content={content}
      chapterTitle={title}
      onTitleChange={setTitle}
      onContentChange={setContent}
      onSave={() => {
        Promise.all([
          trigger(),
          fetcher({
            body: upsertBookChapters(book!, dto),
            token: session?.access_token,
          }).put(`${BOOK_SERVICE_URL}/${id}`),
        ])
          .then(() => {
            toast({
              className: "bg-violet-500 text-white",
              title: `Capítulo ${dto.title} criado!`,
              description: "Livro atualizado com sucesso!",
              type: "foreground",
            });
            router.back();
            return;
          })
          .catch((error) =>
            toast({
              title: "Erro ao salvar capítulo",
              description: String(error),
              type: "foreground",
              variant: "destructive",
            }),
          );
      }}
    />
  );
}
