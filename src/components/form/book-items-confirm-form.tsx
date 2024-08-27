import { FC } from "react";
import { Card } from "@/components/ui/card";
import { BookMetadata } from "@/components/book/book-metadata";
import { Tag } from "@/app/model/tags";
import Image from "next/image";

const BUCKET_URL = String(process.env.NEXT_PUBLIC_BUCKET_URL);

interface BookItemsConfirmFormProps {
  book: any;
  session: any;
}

export const BookItemsConfirmForm: FC<BookItemsConfirmFormProps> = ({
  book,
  session,
}) => {
  const author: Tag<string> = {
    id: session?.user?.email!,
    title: session?.user?.name!,
  };

  const newBookData = {
    ...book,
    coauthors: book.coauthors.concat(author),
    publishAt: Date.now() / 1000,
  };

  return (
    <Card className="flex flex-col max-h-96 items-center gap-4 px-8 py-4 mt-2 bg-slate-50 overflow-y-auto">
      <Image
        src={`${BUCKET_URL}/books/${book.id}/cover.jpeg`}
        alt="cover"
        width={120}
        height={150}
      />
      <BookMetadata bookData={newBookData} tags={book.tags} />
    </Card>
  );
};
