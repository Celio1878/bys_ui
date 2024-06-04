"use client";

import { FC, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tag } from "@/app/model/story";
import { NewChapterButton } from "@/components/buttons/new-chapter-button";
import { ChapterListButtons } from "@/components/buttons/chapter-list-buttons";
import { usePathname, useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { ThumbsDown, ThumbsUp } from "lucide-react";

export const BookChapters: FC = () => {
  const [chapters, set_chapters] = useState(chapters_list);
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();

  function on_remove(index: number) {
    chapters.splice(index, 1);
    set_chapters([...chapters]);
  }

  function on_edit(chapter_id: string) {
    router.push(`${pathname}/chapters/update/${chapter_id}`);
  }

  return (
    <Card className="w-11/12 divide-y divide-dashed">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-4xl">Capitulos</CardTitle>
        <NewChapterButton />
      </CardHeader>
      {chapters.map((chapter, i) => (
        <CardContent
          key={chapter.id}
          className="flex flex-row items-center justify-between w-full text-sm underline pt-6"
        >
          <span>{chapter.title}</span>
          <ChapterListButtons
            on_remove={() =>
              toast({
                title: `Tem certeza?`,
                type: "foreground",
                role: "alert",
                action: (
                  <div className={"flex flex-row space-x-2"}>
                    <ToastAction altText="No Remove">
                      <ThumbsDown />
                    </ToastAction>
                    <ToastAction altText="Remove" onClick={() => on_remove(i)}>
                      <ThumbsUp className="text-red-500" />
                    </ToastAction>
                  </div>
                ),
              })
            }
            on_edit={() => on_edit(chapter.id)}
          />
        </CardContent>
      ))}
    </Card>
  );
};

const chapters_list: Tag<string>[] = [
  { id: "1", title: "Capitulo 1" },
  { id: "2", title: "Capitulo 2" },
  { id: "3", title: "Capitulo 3" },
];
