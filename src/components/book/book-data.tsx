import { FC, ReactNode } from "react";
import { BookContent } from "@/components/book/book-content";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { Story } from "@/app/model/story";

interface BookDataProps {
  bookData: Story;
  chaptersComponent: ReactNode;
}

export const BookData: FC<BookDataProps> = ({
  bookData,
  chaptersComponent,
}) => {
  return (
    <Card className="flex flex-col w-full items-center justify-center py-8 bg-slate-100">
      <BookContent bookData={bookData} />
      <Separator className="w-11/12 my-10" />
      {chaptersComponent}
    </Card>
  );
};
