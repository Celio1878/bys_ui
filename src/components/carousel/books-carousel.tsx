import { FC, useCallback, useMemo } from "react";
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
import { BookDto } from "@/app/model/book-dto";

interface BookCarouselProps {
  sectionTitle: string;
  books: BookDto[];
}

export const BooksCarousel: FC<BookCarouselProps> = ({
  sectionTitle,
  books,
}) => {
  const { current, count, setApi, api, booksBreakpoints } =
    useCarouselComponent();

  const carouselLength = useCallback((standard: number, length: number) => {
    if (length < standard) return length;

    return standard;
  }, []);

  const breakpointClasses = useMemo(
    () => ({
      base: carouselLength(2, books?.length),
      md: carouselLength(4, books?.length),
      lg: carouselLength(5, books?.length),
      xl: carouselLength(6, books?.length),
    }),
    [books?.length, carouselLength],
  );

  return (
    <div className="w-full flex flex-col">
      <h1 className="text-2xl font-semibold underline text-start mb-1 ml-3">
        {sectionTitle}
      </h1>
      <Carousel
        setApi={setApi}
        opts={{
          loop: false,
          align: "center",
          breakpoints: booksBreakpoints,
        }}
        className="max-w-xs sm:max-w-screen-sm md:max-w-2xl lg:max-w-screen-md xl:max-w-screen-lg"
      >
        <CarouselContent className=" lg:-ml-3.5">
          {books?.map((book) => (
            <CarouselItem
              key={book.id}
              className={`basis-1/${breakpointClasses.base} md:basis-1/${breakpointClasses.md} lg:basis-1/${breakpointClasses.lg} xl:basis-1/${breakpointClasses.xl} py-2`}
            >
              <Book bookTag={book} href={`/books/${book.id}`} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <CarouselDots {...{ api, count, current }} />
    </div>
  );
};
