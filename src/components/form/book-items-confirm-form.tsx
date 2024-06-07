import { FC } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { BookMetadata } from "@/components/book/book-metadata";
import { Tag } from "@/app/model/story";
import { format } from "date-fns";
import { get_tag_by_id } from "@/utils/get_tag_by_id";

type Book = {
  title: string;
  description: string;
  age_range: string;
  copyright: string;
  genre: string;
  warnings: Tag<string>[];
  coauthors: Tag<string>[];
  tags: Tag<string>[];
};

interface BookItemsConfirmFormProps {
  book_data: Book;
}

export const BookItemsConfirmForm: FC<BookItemsConfirmFormProps> = ({
  book_data,
}) => {
  const book = {
    ...book_data,
    age_range: get_tag_by_id(book_data.age_range, "age_range").title,
    copyright: get_tag_by_id(book_data.copyright, "copyright").title,
    genre: get_tag_by_id(book_data.genre, "genre").title,
    publish_date: format(new Date(), "dd/MM/yyyy"),
  };

  return (
    <Card className="flex flex-col max-h-96 items-center gap-4 px-8 py-4 mt-2 bg-slate-50 overflow-y-auto">
      <Image src="/cover.jpg" alt="cover" width={150} height={150} />
      <BookMetadata book_data={book} tags={book_data.tags} />
    </Card>
  );
};
