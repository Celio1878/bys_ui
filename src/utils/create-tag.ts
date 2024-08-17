interface CreateTagReturn {
  id: string;
  title: string;
}

export function createTag(value: string): CreateTagReturn {
  const id = value.toLowerCase().replace(/\s+/g, "-");
  const title = value.trim();

  return { id, title };
}
