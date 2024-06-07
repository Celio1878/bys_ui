"use client";

import { FC, useMemo } from "react";
import { useParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Tag } from "@/app/model/story";

interface ChaptersPaginationProps {
  chapters_tags: Tag<string>[];
}

export const ChaptersPagination: FC<ChaptersPaginationProps> = ({
  chapters_tags,
}) => {
  const { chapter_id } = useParams() as { chapter_id: string };

  function get_chapter_id(): { id: string; index: number } {
    const chapter_index = chapters_tags.findIndex(
      (tag) => tag.id === chapter_id,
    );

    return chapter_index === -1
      ? { id: "not-found", index: -1 }
      : { id: chapters_tags[chapter_index].id, index: chapter_index };
  }

  const current_chapter = useMemo(
    () => get_chapter_id(),
    [chapters_tags, chapter_id],
  );

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={`${current_chapter.index === 0 && "cursor-not-allowed opacity-50"}`}
            href={`${current_chapter.index > 0 ? `${chapters_tags[current_chapter.index - 1].id}` : ""} `}
          />
        </PaginationItem>
        {chapters_tags.map((chapter, index) => {
          return (
            <PaginationItem key={index}>
              <PaginationLink
                key={chapter.id}
                href={`${chapter.id}`}
                isActive={current_chapter.index === index}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        <PaginationItem>
          <PaginationNext
            className={`${current_chapter.index === chapters_tags.length - 1 && "cursor-not-allowed opacity-50"}`}
            href={`${current_chapter.index < chapters_tags.length - 1 ? `${chapters_tags[current_chapter.index + 1].id}` : ""} `}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
