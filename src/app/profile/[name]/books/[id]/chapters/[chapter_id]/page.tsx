"use client";

import { ChapterFormCard } from "@/components/chapter/chapter-form-card";
import { useParams, useRouter } from "next/navigation";
import useSWR from "swr";
import { fetcher } from "@/hooks/fetcher";
import { ChapterDto, CreateChapter } from "@/app/model/chapter";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import useSWRMutation from "swr/mutation";
import { toast } from "@/components/ui/use-toast";
import { Loading } from "@/components/loading";

const SERVICE_URL = String(process.env.NEXT_PUBLIC_CHAPTERS_API_URL);

export default function UpdateChapterPage() {
  const router = useRouter();
  const { data: session } = useSession() as any;
  const { id, chapter_id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { data: chapter, isLoading } = useSWR(
    `${SERVICE_URL}/books/${id}/chapters/${chapter_id}`,
    fetcher<ChapterDto>({ token: session?.access_token }).get,
  );

  useEffect(() => {
    if (chapter) {
      setTitle(chapter.title);
      setContent(chapter.content);
    }
  }, [chapter]);

  const dto: CreateChapter = {
    ...chapter!,
    title,
    content,
  };

  const { trigger } = useSWRMutation(
    `${SERVICE_URL}/books/${id}/chapters`,
    fetcher<CreateChapter>({ body: dto, token: session?.access_token }).put,
  );

  if (isLoading) return <Loading />;

  return (
    <ChapterFormCard
      formTitle="Atualizar capitulo"
      chapterTitle={title}
      content={content}
      onTitleChange={setTitle}
      onContentChange={setContent}
      onSave={() => {
        trigger().then(() => {
          toast({
            className: "bg-violet-500 text-white",
            title: `Capitulo ${dto.title} criado!`,
            description: "Livro atualizado com sucesso!",
            type: "foreground",
          });

          router.back();
        });
      }}
    />
  );
}
