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
import { Tag } from "@/app/model/tags";

interface ChaptersPaginationProps {
  chaptersTags: Tag<string>[];
}

export const ChaptersPagination: FC<ChaptersPaginationProps> = ({
  chaptersTags,
}) => {
  const { chapter_id } = useParams();

  const getChapterIndex = useMemo(
    () => (t: Tag<string>) => t.id === chapter_id,
    [chapter_id],
  );

  const currentChapter = useMemo(() => {
    const chapterIndex = chaptersTags?.findIndex(getChapterIndex);

    return chapterIndex === -1
      ? { id: "not-found", index: -1 }
      : {
          id: chaptersTags && chaptersTags[chapterIndex]?.id,
          index: chapterIndex,
        };
  }, [chaptersTags, getChapterIndex]);

  const getPreviousHref = () =>
    currentChapter.index > 0
      ? `${chaptersTags[currentChapter.index - 1].id}`
      : "";

  const getPreviousClassName = () =>
    `${currentChapter.index === 0 ? "cursor-not-allowed opacity-50" : ""} text-xs`;

  const minChapterLength = useMemo(
    () => Math.min(2, chaptersTags?.length),
    [chaptersTags?.length],
  );

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={getPreviousClassName()}
            href={getPreviousHref()}
          />
        </PaginationItem>
        {chaptersTags?.slice(0, minChapterLength).map((c, i) => (
          <PaginationItem key={i}>
            <PaginationLink
              className="text-xs"
              key={c.id}
              href={c.id}
              isActive={currentChapter.index === i}
            >
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        {chaptersTags?.length - 2 && chaptersTags?.length > 3 ? (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        ) : null}

        {chaptersTags?.map((t, i, chapters) =>
          i === chapters.length - 1 && i > 3 ? (
            <PaginationItem key={i}>
              <PaginationLink
                className="text-xs"
                key={t.id}
                href={t.id}
                isActive={currentChapter.index === i}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ) : null,
        )}

        <PaginationItem>
          <PaginationNext
            className={`${currentChapter.index === chaptersTags?.length - 1 && "cursor-not-allowed opacity-50"} text-xs`}
            href={`${currentChapter.index < chaptersTags?.length - 1 ? `${chaptersTags[currentChapter.index + 1].id}` : ""} `}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
