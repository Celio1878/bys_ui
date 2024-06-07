import { FC } from "react";
import Link from "next/link";

interface ChapterLinkProps {
  href: string;
  label: string;
}

export const ChapterLink: FC<ChapterLinkProps> = ({ href, label }) => {
  return (
    <Link className="hover:font-medium transition duration-200" href={href}>
      {label}
    </Link>
  );
};
