import { FC } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationComponentProps {
  page: number;
  pathname: string;
  text: string;
  totalPages: number;
}

export const PaginationComponent: FC<PaginationComponentProps> = ({
  page,
  pathname,
  text,
  totalPages,
}) => {
  const items = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={`${page === 1 && "cursor-not-allowed opacity-50"} text-xs`}
            href={`${page > 1 ? `${pathname}?text=${text}&page=${page - 1}` : ""} `}
          />
        </PaginationItem>

        {items?.map((_, i) => (
          <PaginationItem key={i}>
            <PaginationLink
              className="text-xs"
              href={`${pathname}?text=${text}&page=${i + 1}`}
              isActive={page === i + 1}
            >
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            className={`${page === totalPages! && "cursor-not-allowed opacity-50"} text-xs`}
            href={`${page < totalPages! ? `${pathname}?text=${text}&page=${page + 1}` : ""} `}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
