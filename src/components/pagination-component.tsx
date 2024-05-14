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
}

export const PaginationComponent: FC<PaginationComponentProps> = ({
  page,
  pathname,
  text,
}) => {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={`${page === 1 && "cursor-not-allowed opacity-50"}`}
            href={`${page > 1 ? `${pathname}?text=${text}&page=${page - 1}` : ""} `}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            href={`${pathname}?text=${text}&page=1`}
            isActive={page === 1 && true}
          >
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            href={`${pathname}?text=${text}&page=2`}
            isActive={page === 2 && true}
          >
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            href={`${pathname}?text=${text}&page=3`}
            isActive={page === 3 && true}
          >
            3
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            className={`${page === 3 && "cursor-not-allowed opacity-50"}`}
            href={`${page < 3 ? `${pathname}?text=${text}&page=${page + 1}` : ""} `}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
