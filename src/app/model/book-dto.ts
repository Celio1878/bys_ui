import { BookFormValues } from "@/utils/form-data";
import { AgeRange, Copyright, Tag, Warning } from "@/app/model/tags";
import { CreateChapter } from "@/app/model/chapter-dto";
import { normalizeText } from "@/utils/remove-accents";

export type BookDto = {
  id: string;
  title: string;
  description: string;
  genre: Tag<string>;
  copyright: Tag<Copyright>;
  ageRange: Tag<AgeRange>;
  author: Tag<string>;
  tags: Tag<string>[];
  warnings: Tag<Warning>[];
  coauthors: Tag<string>[];
  chapters: Tag<string>[];
  followers: Tag<string>[];
  createdAt: number;
  cover: string;
};

export type CreateBookDto = {
  id: string;
  title: string;
  description: string;
  genre: Tag<string>;
  copyright: Tag<string>;
  ageRange: Tag<string>;
  author: Tag<string>;
  tags: Tag<string>[];
  warnings: Tag<string>[];
  coauthors: Tag<string>[];
  cover: string;
};

function convertToJson(str: string) {
  try {
    return JSON.parse(str);
  } catch (e) {
    return { id: "", title: "" };
  }
}

export function createBookDto(
  authorTag: Tag<string>,
  bookValues: BookFormValues,
): CreateBookDto {
  return {
    id:
      normalizeText(
        bookValues.title
          .toLowerCase()
          .trim()
          .replaceAll(" ", "-")
          .replaceAll(".", "")
          .replaceAll(",", ""),
      ) +
      "-" +
      authorTag.id,
    title: bookValues.title,
    description: bookValues.description,
    genre: convertToJson(bookValues.genre),
    copyright: convertToJson(bookValues.copyright),
    ageRange: convertToJson(bookValues.ageRange),
    author: authorTag,
    tags: bookValues.tags,
    warnings: bookValues.warnings,
    coauthors: bookValues.coauthors,
    cover: bookValues.cover,
  };
}

export function updateBookDto(
  initialValues: BookDto,
  bookValues: BookFormValues,
): BookDto {
  return {
    id: initialValues.id,
    title: bookValues.title,
    description: bookValues.description,
    genre: convertToJson(bookValues.genre),
    copyright: convertToJson(bookValues.copyright),
    ageRange: convertToJson(bookValues.ageRange),
    author: initialValues.author,
    tags: bookValues.tags,
    warnings: bookValues.warnings,
    coauthors: bookValues.coauthors,
    createdAt: initialValues.createdAt,
    chapters: initialValues.chapters,
    followers: initialValues.followers,
    cover: initialValues.cover,
  };
}

export function upsertBookChapters(
  book: BookDto,
  chapter: CreateChapter,
): BookDto {
  const chapterTag: Tag<string> = {
    id: chapter.id,
    title: chapter.title,
  };

  const exists = book.chapters.some((tag) => tag.id === chapterTag.id);

  if (exists) {
    return book;
  }

  return {
    ...book,
    chapters: [...book.chapters, chapterTag],
  };
}
