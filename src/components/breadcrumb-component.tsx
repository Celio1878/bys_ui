import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { FC } from "react";

interface BreadcrumbComponentProps {
  book_title: string;
  book_link: string;
  chapter_title?: string;
  chapters_link?: string;
}

export const BreadcrumbComponent: FC<BreadcrumbComponentProps> = ({
  book_link,
  chapters_link,
  chapter_title,
  book_title,
}) => {
  return (
    <Breadcrumb className="absolute top-[10rem] sm:left-11 mr-auto">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href={"/"}>Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Livros</BreadcrumbPage>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          {chapter_title && chapters_link ? (
            <BreadcrumbLink href={book_link}>{book_title}</BreadcrumbLink>
          ) : (
            <BreadcrumbPage>{book_title}</BreadcrumbPage>
          )}
        </BreadcrumbItem>
        {chapter_title && chapters_link && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={chapters_link}>Capitulos</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{chapter_title}</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
