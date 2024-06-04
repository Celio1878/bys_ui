import { FC } from "react";
import { Badge } from "@/components/ui/badge";
import { CalendarFold, Users } from "lucide-react";
import { Tag } from "@/app/model/story";
import { format } from "date-fns";

export const BookMetadata: FC = () => {
  return (
    <div className="flex flex-col space-y-4 w-10/12 sm:w-1/3">
      <div className={"flex flex-col gap-y-1"}>
        <h2 className="font-medium text-2xl text-center sm:text-start">
          {title}
        </h2>
        <div className="flex flex-wrap gap-1">
          <h3 className="bg-red-500 text-xs items-center justify-center p-0.5 text-white font-medium content-center">
            +12
          </h3>
          <Badge>Violencia</Badge>
          <Badge>Treta</Badge>
          <Badge>Maluquice</Badge>
          <Badge>Doideiras</Badge>
        </div>
      </div>
      <h4 className="text-xs text-justify">{description}</h4>
      <div className="flex flex-row space-x-1 items-end">
        <Users className="w-5 mr-1 opacity-30" />
        {authors_list.map((author, index, authors) => (
          <h3 key={author.id} className="text-xs">
            {index === authors.length - 1
              ? author.title + "."
              : author.title + ","}
          </h3>
        ))}
      </div>
      <h3 className="flex flex-row items-end text-xs gap-x-2">
        <CalendarFold className="w-5 opacity-30" /> <span>{current_date}</span>
      </h3>
    </div>
  );
};

const title = "My Book";

const description: string =
  "Todo autor aspira em ser esse tecelão de realidades e de conseguir arrebatar o leitor dessa maneira. Penso que, mais do que uma boa história e bons personagens, o que captura o leitor é a prosa e as descrições. Quando escrevemos, lutamos para encaixar no vocabulário aquilo que o olhar da mente enxerga com tanta clareza. Quando lemos, sentimos desgosto e abandonamos livros que falham em descrever de maneira clara o mundo que vivemos, ou o mundo imaginário, em todas as suas camadas físicas, psicológicas e emocionais.";

const authors_list: Tag<string>[] = [
  { id: "1", title: "Debora" },
  { id: "2", title: "Maria" },
];

const current_date = format(new Date(), "dd/MM/yyyy");
