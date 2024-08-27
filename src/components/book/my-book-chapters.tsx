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

interface MyBookChaptersProps {
  chaptersTags: Tag<string>[];
}

const SERVICE_URL = String(process.env.NEXT_PUBLIC_CHAPTERS_API_URL);

export const MyBookChapters: FC<MyBookChaptersProps> = ({ chaptersTags }) => {
  const { data: session } = useSession() as any;
  const pathname = usePathname();
  const { id } = useParams();
  const router = useRouter();

  async function onRemove(chapterId: string) {
    await fetcher<void>({ token: session?.access_token }).delete(
      `${SERVICE_URL}/${id}/chapters/${chapterId}`,
    );
  }

  function onEdit(chapterId: string) {
    router.push(`${pathname}/chapters/${chapterId}`);
  }

  return (
    <Card className="w-11/12 divide-y divide-dashed divide-slate-200 dark:divide-slate-800">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-4xl">Capitulos</CardTitle>
        <NewChapterButton />
      </CardHeader>
      {chaptersTags.map((chapter, i) => (
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
                action: (
                  <RemoveChapterToast
                    onRemove={async () => await onRemove(chapter.id)}
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
