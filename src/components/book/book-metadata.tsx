import { FC } from "react";
import { Badge } from "@/components/ui/badge";
import { CalendarFold, Copyright, Users } from "lucide-react";
import { Tag } from "@/app/model/story";

export type BookData = {
  title: string;
  description: string;
  age_range: string;
  warnings: Tag<string>[];
  coauthors: Tag<string>[];
  publish_date: string;
  copyright: string;
  genre: string;
};

interface BookMetadataProps {
  book_data: BookData;
  tags?: Tag<string>[];
}

export const BookMetadata: FC<BookMetadataProps> = ({ book_data, tags }) => {
  return (
    <div className="flex flex-col gap-2.5 w-full sm:max-w-xl px-4 sm:px-0">
      <div className={"flex flex-col gap-1"}>
        <h2 className="font-medium text-2xl text-center sm:text-start">
          {book_data.title}
        </h2>
        <div className="flex flex-wrap gap-1.5">
          <h3 className="bg-red-500 text-xs items-center justify-center p-0.5 text-white font-medium content-center rounded-sm">
            {book_data.age_range}
          </h3>
          {book_data.warnings.map((warning) => (
            <Badge key={warning.id}>{warning.title}</Badge>
          ))}
        </div>
      </div>
      <h4 className="text-xs text-justify">{book_data.description}</h4>
      <span className="text-xs text-justify">
        <Badge variant="secondary">{book_data.genre}</Badge>
      </span>
      <div className="flex flex-row gap-1 items-end">
        <Users className="w-5 mr-1 opacity-30" />
        {book_data.coauthors.map((author, index, authors) => (
          <h3 key={author.id} className="text-xs">
            {index === authors.length - 1
              ? author.title + "."
              : author.title + ","}
          </h3>
        ))}
      </div>
      <h3 className="flex flex-row items-end text-xs gap-x-2">
        <CalendarFold className="w-5 opacity-30" />
        <span>{book_data.publish_date}</span>
      </h3>
      <span className="flex flex-row gap-1 text-xs items-center gap-x-2">
        <Copyright className="w-5 opacity-30" />
        {book_data.copyright}
      </span>
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag: Tag<string>) => (
            <Badge variant="outline" key={tag.id}>
              {tag.title}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};
