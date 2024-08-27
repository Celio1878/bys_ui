export type Tag<T> = {
  id: T;
  title: string;
};

export enum Genre {
  ORIGINAL = "original",
  ADVENTURE = "adventure",
  ACTION = "action",
  TERROR = "terror",
  THRILLER = "thriller",
  HUMOR = "humor",
  ROMANCE = "romance",
  FANTASY = "fantasy",
}

export enum Copyright {
  PRIVATE = "private",
  PUBLIC = "public",
}

export enum Warning {
  ADULTERY = "adultery",
  ALCOHOL = "alcohol",
  BDSM = "bdsm",
  BISEXUAL = "bisexual",
  SENSITIVE_CONTENT = "sensitive-content",
  DRUGS = "drugs",
  RAPE = "rape",
  HETEROSEXUAL = "heterosexual",
  HOMOSEXUAL = "homosexual",
  INTERSEXUALITY = "intersexuality",
  INAPPROPRIATE_LANGUAGE = "inappropriate-language",
  SEX = "sex",
  SPOILERS = "spoilers",
  SUICIDE = "suicide",
  TORTURE = "torture",
  VIOLENCE = "violence",
}

export enum AgeRange {
  FREE = "free",
  TEN = "ten",
  TWELVE = "twelve",
  SIXTEEN = "sixteen",
  EIGHTEEN = "eighteen",
}

export type Story = {
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

export const GenreTags: Tag<Genre>[] = [
  { id: Genre.ORIGINAL, title: "Original" },
  { id: Genre.TERROR, title: "Terror" },
  { id: Genre.ADVENTURE, title: "Aventura" },
  { id: Genre.ACTION, title: "Acao" },
  { id: Genre.FANTASY, title: "Fantasia" },
  { id: Genre.HUMOR, title: "Humor" },
  { id: Genre.ROMANCE, title: "Romance" },
  { id: Genre.THRILLER, title: "Suspense" },
];

export const CopyrightTags: Tag<Copyright>[] = [
  { id: Copyright.PRIVATE, title: "Todos os Direitos Reservados" },
  { id: Copyright.PUBLIC, title: "Dominio Publico" },
];

export const AgeRangeTags: Tag<AgeRange>[] = [
  { id: AgeRange.FREE, title: "Livre" },
  { id: AgeRange.TEN, title: "+10" },
  { id: AgeRange.TWELVE, title: "+12" },
  { id: AgeRange.SIXTEEN, title: "+16" },
  { id: AgeRange.EIGHTEEN, title: "+18" },
];

export const WarningTags: Tag<Warning>[] = [
  { id: Warning.ADULTERY, title: "Adultério" },
  { id: Warning.ALCOHOL, title: "Álcool" },
  { id: Warning.BDSM, title: "BDSM" },
  { id: Warning.BISEXUAL, title: "Bissexualidade" },
  { id: Warning.DRUGS, title: "Drogas" },
  { id: Warning.HETEROSEXUAL, title: "Heterossexualidade" },
  { id: Warning.HOMOSEXUAL, title: "Homossexualidade" },
  { id: Warning.INAPPROPRIATE_LANGUAGE, title: "Linguagem Imprópria" },
  { id: Warning.INTERSEXUALITY, title: "Intersexualidade" },
  { id: Warning.RAPE, title: "Estupro" },
  { id: Warning.SENSITIVE_CONTENT, title: "Conteudo Sensivel" },
  { id: Warning.SEX, title: "Sexo" },
  { id: Warning.SPOILERS, title: "Spoilers" },
  { id: Warning.SUICIDE, title: "Suicídio" },
  { id: Warning.TORTURE, title: "Tortura" },
  { id: Warning.VIOLENCE, title: "Violência" },
];

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
