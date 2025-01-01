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

  return (
    <div className="w-full flex flex-col">
      <h1 className="text-2xl font-semibold underline text-start mb-1 ml-1 self-start">
        {sectionTitle}
      </h1>
      <Carousel
        setApi={setApi}
        opts={{
          loop: false,
          align: "center",
          breakpoints: booksBreakpoints,
        }}
        className="max-w-sm sm:max-w-full"
      >
        <CarouselContent>
          {books?.map((b) => (
            <CarouselItem key={b.id} className="basis-auto py-2">
              <Book bookTag={b} href={`/books/${b.id}`} />
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
