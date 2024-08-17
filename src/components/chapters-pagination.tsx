"use client";

import { FC, useMemo } from "react";
import { useParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Tag } from "@/app/model/story";

interface ChaptersPaginationProps {
  chaptersTags: Tag<string>[];
}

export const ChaptersPagination: FC<ChaptersPaginationProps> = ({
  chaptersTags,
}) => {
  const { chapter_id } = useParams();

  const currentChapter = useMemo(() => {
    const chapterIndex = chaptersTags.findIndex((tag) => tag.id === chapter_id);

    return chapterIndex === -1
      ? { id: "not-found", index: -1 }
      : { id: chaptersTags[chapterIndex].id, index: chapterIndex };
  }, [chaptersTags, chapter_id]);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={`${currentChapter.index === 0 && "cursor-not-allowed opacity-50"} text-xs`}
            href={`${currentChapter.index > 0 ? `${chaptersTags[currentChapter.index - 1].id}` : ""} `}
          />
        </PaginationItem>
        {chaptersTags.slice(0, 3).map((chapter, index) => (
          <PaginationItem key={index}>
            <PaginationLink
              className="text-xs"
              key={chapter.id}
              href={chapter.id}
              isActive={currentChapter.index === index}
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        {chaptersTags.length - 2 && chaptersTags.length > 3 ? (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        ) : null}

        {chaptersTags.map((chapter, index, chapters) =>
          index === chapters.length - 1 && index > 3 ? (
            <PaginationItem key={index}>
              <PaginationLink
                className="text-xs"
                key={chapter.id}
                href={`${chapter.id}`}
                isActive={currentChapter.index === index}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ) : null,
        )}

        <PaginationItem>
          <PaginationNext
            className={`${currentChapter.index === chaptersTags.length - 1 && "cursor-not-allowed opacity-50"} text-xs`}
            href={`${currentChapter.index < chaptersTags.length - 1 ? `${chaptersTags[currentChapter.index + 1].id}` : ""} `}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
