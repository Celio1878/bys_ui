import { FC } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { BookMetadata } from "@/components/book/book-metadata";
import { Tag } from "@/app/model/story";
import { format } from "date-fns";
import { useSession } from "next-auth/react";

type Book = {
  title: string;
  description: string;
  ageRange: string;
  copyright: string;
  genre: string;
  warnings: Tag<string>[];
  coauthors: Tag<string>[];
  tags: Tag<string>[];
};

interface BookItemsConfirmFormProps {
  bookData: Book;
}

export const BookItemsConfirmForm: FC<BookItemsConfirmFormProps> = ({
  bookData,
}) => {
  const { data: session } = useSession();
  const author: Tag<string> = {
    id: session?.user?.email!,
    title: session?.user?.name!,
  };

  const book = {
    ...bookData,
    coauthors: bookData.coauthors.concat(author),
    ageRange: JSON.parse(bookData.ageRange),
    copyright: JSON.parse(bookData.copyright),
    genre: JSON.parse(bookData.genre),
    publishAt: format(new Date(), "dd/MM/yyyy"),
  };

  return (
    <Card className="flex flex-col max-h-96 items-center gap-4 px-8 py-4 mt-2 bg-slate-50 overflow-y-auto">
      <Image src="/cover.jpg" alt="cover" width={150} height={150} />
      <BookMetadata bookData={book} tags={bookData.tags} />
    </Card>
  );
};
