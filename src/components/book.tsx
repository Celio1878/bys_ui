import { FC, ReactNode } from "react";
import Image from "next/image";

interface BookProps {
  title: string;
  buttons?: ReactNode;
}

export const Book: FC<BookProps> = ({ title, buttons }) => {
  return (
    <div className="flex flex-col w-[10rem] gap-2 items-center">
      <Image
        className="cursor-pointer hover:scale-105 hover:shadow-lg hover:shadow-black/50 hover:opacity-90 transition duration-500"
        src={"/cover.jpg"}
        alt={"cover"}
        width={140}
        height={160}
        priority={true}
      />

      <h3 className="w-10/12 hover:font-semibold hover:cursor-pointer hover:underline transition-all duration-150 text-start">
        {title}
      </h3>
      {buttons}
    </div>
  );
};
