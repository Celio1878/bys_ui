"use client";

import { useState } from "react";
import { ChapterFormCard } from "@/components/chapter/chapter-form-card";
import useSWRMutation from "swr/mutation";
import { fetcher } from "@/hooks/fetcher";
import { CreateChapter } from "@/app/model/chapter-dto";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "@/components/ui/use-toast";

const SERVICE_URL = String(process.env.NEXT_PUBLIC_CHAPTERS_API_URL);

export default function NewChapterPage() {
  const { data: session } = useSession() as any;
  const [title, set_title] = useState("");
  const [content, set_content] = useState("");
  const { id } = useParams();
  const route = useRouter();

  const dto: CreateChapter = {
    bookId: String(id),
    title: title,
    content: content,
    author: { id: session?.user.email, title: session?.user.name },
  };

  const { trigger } = useSWRMutation(
    `${SERVICE_URL}/${id}/chapters`,
    fetcher<CreateChapter>({ body: dto, token: session?.access_token }).post,
  );

  return (
    <ChapterFormCard
      formTitle="Novo Capitulo"
      content={content}
      chapterTitle={title}
      onTitleChange={set_title}
      onContentChange={set_content}
      onSave={() => {
        trigger().then(() => {
          toast({
            className: "bg-violet-500 text-white",
            title: `Capitulo ${dto.title} criado!`,
            description: "Livro atualizado com sucesso!",
            type: "foreground",
          });

          route.back();
        });
      }}
    />
  );
}
