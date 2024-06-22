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
  SEX_INSINUATION = "sex-insinuation",
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
  synopsis: string;
  genre: Tag<Genre>;
  tags: Tag<string>[];
  copyright: Tag<Copyright>;
  age_range: Tag<AgeRange>;
  warns: Tag<Warning>[];
  author: Tag<string>;
  coauthors: Tag<string>[];
  chapters: Tag<string>[];
  created_at: number;
  comments_id: string;
  who_liked: Tag<string>[];
};

export const GenreTags: Tag<Genre>[] = [
  { id: Genre.ACTION, title: "Acao" },
  { id: Genre.ADVENTURE, title: "Aventura" },
  { id: Genre.FANTASY, title: "Fantasia" },
  { id: Genre.HUMOR, title: "Humor" },
  { id: Genre.ORIGINAL, title: "Original" },
  { id: Genre.ROMANCE, title: "Romance" },
  { id: Genre.TERROR, title: "Terror" },
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
  // { id: Warning.SEX_INSINUATION, title: "Insinuação de Sexo" },
  { id: Warning.SPOILERS, title: "Spoilers" },
  { id: Warning.SUICIDE, title: "Suicídio" },
  { id: Warning.TORTURE, title: "Tortura" },
  { id: Warning.VIOLENCE, title: "Violência" },
];
