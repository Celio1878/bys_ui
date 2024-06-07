"use client";

import { FC, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tag } from "@/app/model/story";
import { NewChapterButton } from "@/components/buttons/new-chapter-button";
import { ChapterListButtons } from "@/components/buttons/chapter-list-buttons";
import { usePathname, useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { RemoveChapterToast } from "@/components/remove-chapter-toast";

interface MyBookChaptersProps {
  chapters_tags: Tag<string>[];
}

export const MyBookChapters: FC<MyBookChaptersProps> = ({ chapters_tags }) => {
  const { toast } = useToast();
  const pathname = usePathname();
  const router = useRouter();
  const [chapters, set_chapters] = useState(chapters_tags);

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
          className="flex flex-row items-center justify-between w-full text-sm pt-6"
        >
          <span>{chapter.title}</span>

          <ChapterListButtons
            on_remove={() =>
              toast({
                title: `Tem certeza?`,
                type: "foreground",
                role: "alert",
                action: <RemoveChapterToast on_remove={() => on_remove(i)} />,
              })
            }
            on_edit={() => on_edit(chapter.id)}
          />
        </CardContent>
      ))}
    </Card>
  );
};
