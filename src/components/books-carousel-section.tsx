import { FC } from "react";
import { BookDto } from "@/app/model/book-dto";
import { BooksCarousel } from "@/components/carousel/books-carousel";
import { GenreTags } from "@/app/model/tags";

export const BooksCarouselSection: FC<{ books: BookDto[] }> = ({ books }) => {
  return (
    <section className="flex flex-col gap-12 md:w-full px-2">
      {books?.length! > 0 && (
        <BooksCarousel
          key={"highlighted"}
          sectionTitle={"Lançamentos"}
          books={books!}
        />
      )}

      {GenreTags.map((section) => {
        const booksByGenre = books?.filter(
          (book) => book.genre.id === section.id,
        );

        if (!booksByGenre || booksByGenre.length === 0) return null;

        return (
          <BooksCarousel
            key={section.id}
            sectionTitle={section.title}
            books={booksByGenre}
          />
        );
      })}
    </section>
  );
};
