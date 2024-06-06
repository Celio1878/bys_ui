import { FC } from "react";
import Image from "next/image";
import { BookMetadata } from "@/components/book/book-metadata";
import { format } from "date-fns";
import {
  AgeRangeTags,
  CopyrightTags,
  GenreTags,
  WarningTags,
} from "@/app/model/story";

export const BookContent: FC = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start justify-center">
      <Image
        className="hover:shadow-lg hover:shadow-black/50 transition duration-500"
        src={"/cover.jpg"}
        alt={"cover"}
        width={200}
        height={220}
        priority={true}
      />
      <BookMetadata book_data={book_data} />
    </div>
  );
};

const book_data = {
  title: "My Book",
  description:
    "Todo autor aspira em ser esse tecelão de realidades e de conseguir arrebatar o leitor dessa maneira. Penso que, mais do que uma boa história e bons personagens, o que captura o leitor é a prosa e as descrições. Quando escrevemos, lutamos para encaixar no vocabulário aquilo que o olhar da mente enxerga com tanta clareza. Quando lemos, sentimos desgosto e abandonamos livros que falham em descrever de maneira clara o mundo que vivemos, ou o mundo imaginário, em todas as suas camadas físicas, psicológicas e emocionais.",
  coauthors: [
    { id: "1", title: "Debora" },
    { id: "2", title: "Maria" },
  ],
  age_range: AgeRangeTags[1].title,
  warnings: [WarningTags[1], WarningTags[3], WarningTags[4], WarningTags[7]],
  copyright: CopyrightTags[1].title,
  genre: GenreTags[1].title,
  publish_date: format(new Date(), "dd/MM/yyyy"),
};
