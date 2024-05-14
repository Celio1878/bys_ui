import { FC } from "react";
import Link from "next/link";

interface MyBooksLinkProps {
  action: VoidFunction;
}

export const MyBooksLink: FC<MyBooksLinkProps> = ({ action }) => {
  return (
    <Link
      className="border rounded-md py-2.5 px-4 font-semibold hover:text-white hover:bg-indigo-700 transition-all duration-300"
      href="/my-books"
    >
      Meus Livros
    </Link>
  );
};
