"use client";

import { FC } from "react";
import Link from "next/link";
import { navbarItems } from "@/utils/navbar-items";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useSearchParams } from "next/navigation";

export const NavMenu: FC = () => {
  const text = useSearchParams().get("text");

  return (
    <nav className="flex w-full items-center justify-center py-3">
      <Carousel
        opts={{ align: "center", dragFree: true }}
        className="w-full max-w-xs sm:max-w-2xl md:max-w-full"
      >
        <CarouselContent className="md:justify-center -mr-0.5 -ml-0.5 md:-mx-0">
          {navbarItems.map((item) => {
            return (
              <Link
                className={`text-center font-semibold text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300 py-2 px-2 sm:px-3 mx-1 md:mx-0.5 rounded-md ${item.key === text && "text-sky-500 font-semibold bg-slate-200 dark:text-sky-200 dark:bg-slate-950"}`}
                href={item.href}
                key={item.key}
              >
                <CarouselItem className="p-0">{item.label}</CarouselItem>
              </Link>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="md:hidden" />
        <CarouselNext className="md:hidden" />
      </Carousel>
    </nav>
  );
};
