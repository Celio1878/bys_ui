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
  total?: any[];
}

export const PaginationComponent: FC<PaginationComponentProps> = ({
  page,
  pathname,
  text,
  total,
}) => {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={`${page === 1 && "cursor-not-allowed opacity-50"} text-xs`}
            href={`${page > 1 ? `${pathname}?text=${text}&page=${page - 1}` : ""} `}
          />
        </PaginationItem>

        {total?.map((_, k) => (
          <PaginationItem key={k}>
            <PaginationLink
              className="text-xs"
              href={`${pathname}?text=${text}&page=${k + 1}`}
              isActive={page === k + 1}
            >
              {k + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            className={`${page === total?.length && "cursor-not-allowed opacity-50"} text-xs`}
            href={`${page < total?.length! ? `${pathname}?text=${text}&page=${page + 1}` : ""} `}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
