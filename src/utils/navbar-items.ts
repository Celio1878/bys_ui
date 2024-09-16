export type NavbarItem = {
  label: string;
  key: string;
  href: string;
};

export const navbarItems: NavbarItem[] = [
  {
    label: "Original",
    key: "original",
    href: "/search?text=original&page=1",
  },
  {
    label: "Aventura",
    key: "adventure",
    href: "/search?text=aventura&page=1",
  },
  {
    label: "Comedia",
    key: "comedy",
    href: "/search?text=comedia&page=1",
  },
  {
    label: "Fantasia",
    key: "fantasy",
    href: "/search?text=fantasia&page=1",
  },
  {
    label: "Terror",
    key: "terror",
    href: "/search?text=terror&page=1",
  },
  {
    label: "Suspense",
    key: "thriller",
    href: "/search?text=suspense&page=1",
  },

  {
    label: "Acao",
    key: "action",
    href: "/search?text=acao&page=1",
  },
  {
    label: "Romance",
    key: "romance",
    href: "/search?text=romance&page=1",
  },
];
