import { FC } from "react";
import { BookDto } from "@/app/model/book-dto";
import { BooksCarousel } from "@/components/carousel/books-carousel";
import { GenreTags } from "@/app/model/tags";

export const BooksCarouselSection: FC<{ books: BookDto[] }> = ({ books }) => {
  if (!books) return null;

  const newestBooks = books
    ?.filter((book) => book.createdAt)
    .sort((a, b) => b.createdAt! - a.createdAt!)
    .slice(0, 50);

  const biggestBooks = books
    ?.filter((book) => book.chapters)
    .sort((a, b) => b.chapters.length - a.chapters.length)
    .slice(0, 30);

  return (
    <section className="flex flex-col gap-12 md:w-full px-2">
      {newestBooks?.length! > 0 && (
        <BooksCarousel
          key={"highlighted"}
          sectionTitle={"Lançamentos"}
          books={newestBooks}
        />
      )}

      {biggestBooks?.length! > 0 && (
        <BooksCarousel
          key={"biggest"}
          sectionTitle={"Maiores"}
          books={biggestBooks}
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
