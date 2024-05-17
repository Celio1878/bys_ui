import { FC, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

interface BookProps {
  href: string;
  title: string;
  buttons?: ReactNode;
}

export const Book: FC<BookProps> = ({ title, buttons, href = "" }) => {
  return (
    <div className="flex flex-col w-[10rem] gap-2 items-center">
      <Link href={href}>
        <Image
          className="cursor-pointer hover:scale-105 hover:shadow-lg hover:shadow-black/50 hover:opacity-90 transition duration-500"
          src={"/cover.jpg"}
          alt={"cover"}
          width={140}
          height={160}
          priority={true}
        />
      </Link>

      <Link
        className="w-10/12 hover:font-semibold hover:cursor-pointer hover:underline transition-all duration-150 text-start"
        href={href}
      >
        {title}
      </Link>
      {buttons}
    </div>
  );
};
