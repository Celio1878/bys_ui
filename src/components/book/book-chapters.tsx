"use client";

import { FC } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tag } from "@/app/model/story";
import { usePathname } from "next/navigation";
import { ChapterLink } from "@/components/chapter-link";

interface BookChaptersProps {
  chapters_tags: Tag<string>[];
}

export const BookChapters: FC<BookChaptersProps> = ({ chapters_tags }) => {
  const pathname = usePathname();

  return (
    <Card className="w-11/12 divide-y divide-dashed divide-slate-200 dark:divide-slate-800">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-4xl">Capitulos</CardTitle>
      </CardHeader>
      {chapters_tags.map((chapter) => (
        <CardContent
          key={chapter.id}
          className="flex flex-row items-center justify-between w-full text-sm pt-6 underline underline-offset-4"
        >
          <ChapterLink
            href={`${pathname}/chapters/${chapter.id}`}
            label={chapter.title}
          />
        </CardContent>
      ))}
    </Card>
  );
};
