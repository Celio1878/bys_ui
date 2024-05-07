export type NavbarItem = {
  label: string;
  key: string;
  href: string;
};

export const navbar_items: NavbarItem[] = [
  {
    label: "Original",
    key: "original",
    href: "/search?text=original&page=1",
  },
  {
    label: "Aventura",
    key: "adventure",
    href: "/search?text=adventure&page=1",
  },
  {
    label: "Comedia",
    key: "comedy",
    href: "/search?text=comedy&page=1",
  },
  {
    label: "Fantasia",
    key: "fantasy",
    href: "/search?text=fantasy&page=1",
  },
  {
    label: "Terror",
    key: "terror",
    href: "/search?text=terror&page=1",
  },
  {
    label: "Suspense",
    key: "thriller",
    href: "/search?text=thriller&page=1",
  },

  {
    label: "Acao",
    key: "action",
    href: "/search?text=action&page=1",
  },
  {
    label: "Romance",
    key: "romance",
    href: "/search?text=romance&page=1",
  },
];
