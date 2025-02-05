export type Tag<T> = {
  id: T;
  title: string;
};

export enum Genre {
  ORIGINAL = "original",
  FANFIC = "fanfic",
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

export const GenreTags: Tag<Genre>[] = [
  { id: Genre.ORIGINAL, title: "Original" },
  { id: Genre.FANFIC, title: "Fanfic" },
  { id: Genre.TERROR, title: "Terror" },
  { id: Genre.ADVENTURE, title: "Aventura" },
  { id: Genre.ACTION, title: "Ação" },
  { id: Genre.FANTASY, title: "Fantasia" },
  { id: Genre.HUMOR, title: "Humor" },
  { id: Genre.ROMANCE, title: "Romance" },
  { id: Genre.THRILLER, title: "Suspense" },
];

export const CopyrightTags: Tag<Copyright>[] = [
  { id: Copyright.PRIVATE, title: "Todos os Direitos Reservados" },
  { id: Copyright.PUBLIC, title: "Domínio Público" },
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
  { id: Warning.SENSITIVE_CONTENT, title: "Conteúdo sensível" },
  { id: Warning.SEX, title: "Sexo" },
  { id: Warning.SPOILERS, title: "Spoilers" },
  { id: Warning.SUICIDE, title: "Suicídio" },
  { id: Warning.TORTURE, title: "Tortura" },
  { id: Warning.VIOLENCE, title: "Violência" },
];

type SanitizeTagList = {
  tagList: Tag<string>[];
  newTag: Tag<string>;
};

export function sanitizeTagList({
  tagList,
  newTag,
}: SanitizeTagList): Tag<string>[] {
  const exists = tagList?.some((t) => t.id === newTag.id);

  if (exists) {
    return tagList?.filter((t) => t.id !== newTag.id);
  }

  return tagList?.concat(newTag);
}
