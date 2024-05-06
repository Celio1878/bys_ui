export type NavbarItem = {
  label: string;
  key: string;
  href: string;
};

export const navbar_items: NavbarItem[] = [
  {
    label: "Original",
    key: "original",
    href: "/search?genre=original",
  },
  {
    label: "Aventura",
    key: "adventure",
    href: "/search?genre=adventure",
  },
  {
    label: "Comedia",
    key: "comedy",
    href: "/search?genre=comedy",
  },
  {
    label: "Fantasia",
    key: "fantasy",
    href: "/search?genre=fantasy",
  },
  {
    label: "Terror",
    key: "terror",
    href: "/search?genre=terror",
  },
  {
    label: "Suspense",
    key: "thriller",
    href: "/search?genre=thriller",
  },

  {
    label: "Acao",
    key: "action",
    href: "/search?genre=action",
  },
  {
    label: "Romance",
    key: "romance",
    href: "/search?genre=romance",
  },
];
