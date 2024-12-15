"use client";

import React, { FC, useMemo } from "react";
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
import { normalizeText } from "@/utils/remove-accents";

interface ChaptersPaginationProps {
  chaptersTags: Tag<string>[];
}

export const ChaptersPagination: FC<ChaptersPaginationProps> = ({
  chaptersTags,
}) => {
  const { chapter_id } = useParams();
  const chapterIdSanitized = normalizeText(chapter_id.toString());

  const getChapterIndex = useMemo(
    () => (t: Tag<string>) => {
      const tagIdSanitized = normalizeText(t.id);
      return tagIdSanitized === chapterIdSanitized;
    },
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

  const getNextHref = () =>
    currentChapter.index < chaptersTags?.length - 1
      ? `${chaptersTags[currentChapter.index + 1].id}`
      : "";

  const getNextClassName = () =>
    `${currentChapter.index === chaptersTags?.length - 1 ? "cursor-not-allowed opacity-50" : ""} text-xs`;

  const visiblePages = useMemo(() => {
    const totalPages = chaptersTags?.length || 0;
    const current = currentChapter.index;

    if (totalPages <= 7) {
      return chaptersTags?.map((_, i) => i);
    }

    let pages = [0];

    if (current > 2) {
      pages.push(-1);
    }

    for (
      let i = Math.max(1, current - 1);
      i <= Math.min(current + 1, totalPages - 2);
      i++
    ) {
      pages.push(i);
    }

    if (current < totalPages - 3) {
      pages.push(-1);
    }

    pages.push(totalPages - 1);

    return pages;
  }, [chaptersTags?.length, currentChapter.index]);

  const isFirstPage = currentChapter.index === 0;
  const isLastPage = currentChapter.index === chaptersTags?.length - 1;

  const handlePreviousClick = (e: React.MouseEvent) => {
    if (isFirstPage) {
      e.preventDefault();
      return;
    }
  };

  const handleNextClick = (e: React.MouseEvent) => {
    if (isLastPage) {
      e.preventDefault();
      return;
    }
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={getPreviousClassName()}
            href={getPreviousHref()}
            onClick={handlePreviousClick}
          />
        </PaginationItem>
        {visiblePages?.map((page) =>
          page === -1 ? (
            <PaginationItem key={`ellipsis-${page}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={page}>
              <PaginationLink
                className="text-xs"
                href={chaptersTags[page].id}
                isActive={currentChapter.index === page}
              >
                {page + 1}
              </PaginationLink>
            </PaginationItem>
          ),
        )}

        <PaginationItem>
          <PaginationNext
            className={getNextClassName()}
            href={getNextHref()}
            onClick={handleNextClick}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
