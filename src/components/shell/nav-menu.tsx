"use client";

import { FC } from "react";
import Link from "next/link";
import { navbar_items } from "@/utils/navbar_items";
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
        opts={{ align: "center" }}
        className="w-full max-w-xs sm:max-w-2xl md:max-w-full"
      >
        <CarouselContent className="md:justify-center mx-0.5 md:mx-0">
          {navbar_items.map((item) => {
            return (
              <CarouselItem
                key={item.key}
                className={`basis-24 md:basis-[5.5rem] lg:basis-1/12 text-center hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300 p-0 py-2 md:mx-1 rounded-md ${item.key === text && "text-sky-500 bg-slate-200 dark:text-sky-200 dark:bg-slate-950"}`}
              >
                <Link href={item.href}>{item.label}</Link>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="md:hidden" />
        <CarouselNext className="md:hidden" />
      </Carousel>
    </nav>
  );
};
