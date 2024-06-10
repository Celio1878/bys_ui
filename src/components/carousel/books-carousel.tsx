import { FC } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Book } from "@/components/book";
import { CarouselDots } from "@/components/carousel/carousel-dots";
import { useCarouselComponent } from "@/lib/use-carousel-component";

interface BookCarouselProps {
  section_title: string;
}

export const BooksCarousel: FC<BookCarouselProps> = ({ section_title }) => {
  const { current, count, setApi, api, books_breakpoints } =
    useCarouselComponent();

  return (
    <div className="w-full flex flex-col">
      <h1 className="text-2xl font-semibold underline ml-0.5 lg:ml-1">
        {section_title}
      </h1>
      <Carousel
        setApi={setApi}
        opts={{
          loop: true,
          align: "center",
          breakpoints: books_breakpoints,
        }}
        className="max-w-xs sm:max-w-screen-sm md:max-w-2xl lg:max-w-screen-md xl:max-w-screen-lg"
      >
        <CarouselContent className="-mr-3.5 lg:-ml-3.5">
          {Array.from({ length: 20 }).map((_, i) => {
            const title = "Livro " + i;
            const id = title.replace(/\s/g, "-").toLowerCase();
            const href = `/books/${id}`;

            return (
              <CarouselItem
                key={i}
                className="basis-1/2 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 p-2"
              >
                <Book {...{ title, href }} />
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <CarouselDots {...{ api, count, current }} />
    </div>
  );
};
