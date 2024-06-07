import {
  AgeRange,
  AgeRangeTags,
  Copyright,
  CopyrightTags,
  Genre,
  GenreTags,
  Tag,
} from "@/app/model/story";

export function get_tag_by_id(
  id: string,
  type: "age_range" | "copyright" | "genre",
): Tag<AgeRange | Copyright | Genre | string> {
  const tagLookup: { [key: string]: Tag<AgeRange | Copyright | Genre>[] } = {
    age_range: AgeRangeTags,
    copyright: CopyrightTags,
    genre: GenreTags,
  };

  const tags = tagLookup[type];
  if (tags) {
    const tag = tags.find((t) => t.id === id);
    if (tag) {
      return tag;
    }
  }

  return { id: "", title: "" };
}
