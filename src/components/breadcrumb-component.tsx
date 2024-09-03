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
  bookTitle: string;
  bookLink: string;
  chapterTitle?: string;
  chaptersLink?: string;
}

export const BreadcrumbComponent: FC<BreadcrumbComponentProps> = ({
  bookLink,
  chaptersLink,
  chapterTitle,
  bookTitle,
}) => {
  return (
    <Breadcrumb className="absolute top-[9.5rem] left-5 sm:left-11 mr-auto">
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
          {chapterTitle && chaptersLink ? (
            <BreadcrumbLink href={bookLink}>{bookTitle}</BreadcrumbLink>
          ) : (
            <BreadcrumbPage>{bookTitle}</BreadcrumbPage>
          )}
        </BreadcrumbItem>
        {chapterTitle && chaptersLink && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={chaptersLink}>Capitulos</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{chapterTitle}</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
