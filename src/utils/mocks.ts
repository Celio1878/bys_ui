import {
  AgeRangeTags,
  CopyrightTags,
  GenreTags,
  Tag,
  Warning,
  WarningTags,
} from "@/app/model/story";
import { format } from "date-fns";

type BookFormValues = {
  title: string;
  description: string;
  genre: string;
  copyright: string;
  age_range: string;
  tags: Tag<string>[];
  warnings: Tag<Warning>[];
  author: Tag<string>;
  coauthors: Tag<string>[];
};

export function get_book_data(id: string): BookFormValues {
  return {
    title: "Livro " + id,
    description:
      "Todo autor aspira em ser esse tecelão de realidades e de conseguir arrebatar o leitor dessa maneira. Penso que, mais do que uma boa história e bons personagens, o que captura o leitor é a prosa e as descrições. Quando escrevemos, lutamos para encaixar no vocabulário aquilo que o olhar da mente enxerga com tanta clareza. Quando lemos, sentimos desgosto e abandonamos livros que falham em descrever de maneira clara o mundo que vivemos, ou o mundo imaginário, em todas as suas camadas físicas, psicológicas e emocionais.",
    tags: [{ id: "taste", title: "taste" }],
    age_range: AgeRangeTags[0].id,
    warnings: [
      { id: WarningTags[1].id, title: WarningTags[1].title },
      { id: WarningTags[3].id, title: WarningTags[3].title },
      { id: WarningTags[4].id, title: WarningTags[4].title },
    ],
    author: { id: "author_0", title: "Autor 0" },
    coauthors: [
      { title: "Autor 3", id: "author_3" },
      { title: "Autor 4", id: "author_4" },
    ],
    copyright: CopyrightTags[1].id,
    genre: GenreTags[0].id,
  };
}

const chapters_list: Tag<string>[] = [
  { id: "1", title: "Capitulo 1" },
  { id: "2", title: "Capitulo 2" },
  { id: "3", title: "Capitulo 3" },
  { id: "4", title: "Capitulo 4" },
  { id: "5", title: "Capitulo 5" },
  { id: "6", title: "Capitulo 6" },
];

export const book_data = {
  title: "My Book",
  description:
    "Todo autor aspira em ser esse tecelão de realidades e de conseguir arrebatar o leitor dessa maneira. Penso que, mais do que uma boa história e bons personagens, o que captura o leitor é a prosa e as descrições. Quando escrevemos, lutamos para encaixar no vocabulário aquilo que o olhar da mente enxerga com tanta clareza. Quando lemos, sentimos desgosto e abandonamos livros que falham em descrever de maneira clara o mundo que vivemos, ou o mundo imaginário, em todas as suas camadas físicas, psicológicas e emocionais.",
  coauthors: [
    { id: "1", title: "Debora" },
    { id: "2", title: "Maria" },
  ],
  author: { id: "3", title: "Celio" },
  age_range: AgeRangeTags[1].title,
  warnings: [WarningTags[1], WarningTags[3], WarningTags[4], WarningTags[7]],
  copyright: CopyrightTags[1].title,
  genre: GenreTags[1].title,
  publish_date: format(new Date(), "dd/MM/yyyy"),
  chapters: chapters_list,
};

export const chapter = {
  title: "Capitulo 1",
  content: `<p>In the heart of a bustling city, where the streets hummed with the <span style="color: #FF0000">rhythm of life</span>, a <span style="color: #FF4500">young woman</span> named <mark>Emily</mark> found herself at a crossroads. Her days were filled with the monotony of a corporate job, a routine that left her yearning for something more.</p>
<p>One fateful evening, as she sat alone in her apartment, <mark>Emily</mark> stumbled upon an advertisement for a writing workshop. Intrigued, she decided to take a chance and sign up, determined to reignite the creative spark that had long been <span style="color: #FF00FF">dormant within her</span>.</p><hr>
<p><em>The workshop was a revelation</em>, <u>Emily</u> recalled, her eyes shining with newfound purpose. <strong>Under the guidance of a seasoned author, she learned to weave words into tapestries of emotion, painting vivid scenes that transported her readers to distant lands and into the depths of the human experience.</strong></p>
<p>As the weeks passed, Emily's confidence grew, and her passion for writing blossomed. She found herself lost in the worlds she created, her fingers dancing across the keyboard as she poured her heart and soul into every sentence.</p><p>Little did she know, this was just the beginning of a journey that would forever change the course of her life.</p>`,
};
