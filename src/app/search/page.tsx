"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Image from "next/image";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const text = searchParams.get("text");
  const page = searchParams.get("page");
  const pathname = usePathname();

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <div className="flex flex-col pt-10 gap-4">
        <div className="flex flex-row text-center items-center justify-start gap-2">
          <p className="text-slate-400">Busca por: </p>
          <h1 className="text-xl font-medium capitalize">{text}</h1>
        </div>

        <div className="flex flex-wrap w-full items-center justify-center mb-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="flex flex-col w-[10rem] gap-2 p-4">
              <Image
                className="cursor-pointer hover:scale-105 transition duration-500"
                src={"/cover.jpg"}
                alt={"cover"}
                width={140}
                height={160}
                priority={true}
              />

              <h3>Titulo</h3>
            </div>
          ))}
        </div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                className={`${page === "1" && "cursor-not-allowed opacity-50"}`}
                href={`${Number(page) > 1 ? `${pathname}?text=${text}&page=${Number(page) - 1}` : ""} `}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href={`${pathname}?text=${text}&page=1`}
                isActive={page === "1" && true}
              >
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href={`${pathname}?text=${text}&page=2`}
                isActive={page === "2" && true}
              >
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href={`${pathname}?text=${text}&page=3`}
                isActive={page === "3" && true}
              >
                3
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                className={`${page === "3" && "cursor-not-allowed opacity-50"}`}
                href={`${Number(page) < 3 ? `${pathname}?text=${text}&page=${Number(page) + 1}` : ""} `}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </Suspense>
  );
}
