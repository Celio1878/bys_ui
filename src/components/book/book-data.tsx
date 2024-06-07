import { FC, ReactNode } from "react";
import { BookContent } from "@/components/book/book-content";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";

interface BookDataProps {
  book_data: any;
  chapters_component: ReactNode;
}

export const BookData: FC<BookDataProps> = ({
  book_data,
  chapters_component,
}) => {
  return (
    <Card className="flex flex-col w-full items-center justify-center py-8">
      <BookContent book_data={book_data} />
      <Separator className="w-11/12 my-10" />
      {chapters_component}
    </Card>
  );
};
