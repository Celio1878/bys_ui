import { FC, memo, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tag } from "@/app/model/tags";
import { usePathname } from "next/navigation";
import { ChapterLink } from "@/components/chapter-link";

interface BookChaptersProps {
  chaptersTags: Tag<string>[];
}

export const BookChapters: FC<BookChaptersProps> = memo(({ chaptersTags }) => {
  const pathname = usePathname();

  const chapterLinks = useMemo(
    () =>
      chaptersTags?.map((chapter) => (
        <CardContent
          key={chapter.id}
          className="flex flex-row items-center justify-between w-full text-sm pt-6 underline underline-offset-4"
        >
          <ChapterLink
            href={`${pathname}/chapters/${chapter.id}`}
            label={chapter.title}
          />
        </CardContent>
      )),
    [chaptersTags, pathname],
  );

  return (
    <Card className="w-11/12 divide-y divide-dashed divide-slate-200 dark:divide-slate-800 bg-gray-50">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle id="chapters" className="text-4xl">
          Capitulos
        </CardTitle>
      </CardHeader>
      {chapterLinks}
    </Card>
  );
});

BookChapters.displayName = "BookChapters";
