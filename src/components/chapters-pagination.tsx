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
  chapters_tags: Tag<string>[];
}

export const ChaptersPagination: FC<ChaptersPaginationProps> = ({
  chapters_tags,
}) => {
  const { chapter_id } = useParams() as { chapter_id: string };

  const current_chapter = useMemo(() => {
    const chapter_index = chapters_tags.findIndex(
      (tag) => tag.id === chapter_id,
    );

    return chapter_index === -1
      ? { id: "not-found", index: -1 }
      : { id: chapters_tags[chapter_index].id, index: chapter_index };
  }, [chapters_tags, chapter_id]);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={`${current_chapter.index === 0 && "cursor-not-allowed opacity-50 text-xs"} text-xs`}
            href={`${current_chapter.index > 0 ? `${chapters_tags[current_chapter.index - 1].id}` : ""} `}
          />
        </PaginationItem>
        {chapters_tags.slice(0, 3).map((chapter, index) => (
          <PaginationItem key={index}>
            <PaginationLink
              className="text-xs"
              key={chapter.id}
              href={chapter.id}
              isActive={current_chapter.index === index}
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        {chapters_tags.length - 2 && chapters_tags.length > 3 ? (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        ) : null}

        {chapters_tags.map((chapter, index, chapters) =>
          index === chapters.length - 1 && index > 3 ? (
            <PaginationItem key={index}>
              <PaginationLink
                className="text-xs"
                key={chapter.id}
                href={`${chapter.id}`}
                isActive={current_chapter.index === index}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ) : null,
        )}

        <PaginationItem>
          <PaginationNext
            className={`${current_chapter.index === chapters_tags.length - 1 && "cursor-not-allowed opacity-50 text-xs"} text-xs`}
            href={`${current_chapter.index < chapters_tags.length - 1 ? `${chapters_tags[current_chapter.index + 1].id}` : ""} `}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
