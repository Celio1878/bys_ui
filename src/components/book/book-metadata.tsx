import { FC } from "react";
import { Badge } from "@/components/ui/badge";
import { CalendarFold, Copyright, NotebookText, Users } from "lucide-react";
import { Tag } from "@/app/model/story";
import Link from "next/link";
import { format, fromUnixTime } from "date-fns";

interface BookMetadataProps {
  bookData: any;
  tags?: Tag<string>[];
}

export const BookMetadata: FC<BookMetadataProps> = ({ bookData, tags }) => {
  const date = format(fromUnixTime(bookData.publishAt), "dd/MM/yyyy");

  return (
    <div className="flex flex-col gap-2.5 w-full sm:max-w-xl px-4 sm:px-0">
      <div className={"flex flex-col gap-1"}>
        <h2 className="font-medium text-2xl text-center sm:text-start">
          {bookData.title}
        </h2>
        <div className="flex flex-wrap gap-1.5">
          <h3 className="bg-red-500 text-xs items-center justify-center p-0.5 text-white font-medium content-center rounded-sm">
            {bookData.ageRange.title}
          </h3>
          {bookData.warnings.map((warning: any) => (
            <Badge key={warning.id}>{warning.title}</Badge>
          ))}
        </div>
      </div>
      <h4 className="text-xs text-justify">{bookData.description}</h4>
      <h3 className="flex flex-row items-end text-xs gap-x-2">
        <NotebookText className="w-5 opacity-30" />
        <span>{bookData.genre.title}</span>
      </h3>
      <div className="flex flex-row gap-1 items-end">
        <Users className="w-5 mr-1 opacity-30" />
        {bookData.coauthors.map(
          (author: Tag<string>, index: number, authors: Tag<string>[]) => (
            <Link
              href={`/authors/${author.id}`}
              key={author.id}
              className="text-xs hover:font-semibold hover:underline transition-all duration-200"
            >
              {index === authors.length - 1
                ? author.title + "."
                : author.title + ","}
            </Link>
          ),
        )}
      </div>
      <h3 className="flex flex-row items-end text-xs gap-x-2">
        <CalendarFold className="w-5 opacity-30" />
        <span>{date}</span>
      </h3>
      <span className="flex flex-row gap-1 text-xs items-center gap-x-2">
        <Copyright className="w-5 opacity-30" />
        {bookData.copyright.title}
      </span>
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <Badge variant="outline" key={tag.id}>
              {tag.title}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};
