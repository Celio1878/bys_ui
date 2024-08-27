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
import { Story, Tag } from "@/app/model/story";

interface BookCarouselProps {
  sectionTitle: string;
  books: Story[];
}

export const BooksCarousel: FC<BookCarouselProps> = ({
  sectionTitle,
  books,
}) => {
  const { current, count, setApi, api, books_breakpoints } =
    useCarouselComponent();

  function carouselLength(standard: number, length: number) {
    if (length < standard) return length;

    return standard;
  }

  return (
    <div className="w-full flex flex-col">
      <h1 className="text-2xl font-semibold underline ml-0.5 lg:ml-1">
        {sectionTitle}
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
          {books?.map((book) => {
            const tag: Tag<string> = {
              id: book.id,
              title: book.title,
            };

            return (
              <CarouselItem
                key={book.id}
                className={`basis-1/${carouselLength(2, books.length)} md:basis-1/${carouselLength(4, books.length)} lg:basis-1/${carouselLength(5, books.length)} xl:basis-1/${carouselLength(6, books.length)} p-2`}
              >
                <Book bookTag={tag} href={`/books/${book.id}`} />
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
