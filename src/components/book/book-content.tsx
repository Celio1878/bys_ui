import { FC } from "react";
import Image from "next/image";
import { BookMetadata } from "@/components/book/book-metadata";

export const BookContent: FC = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start justify-center">
      <Image
        className="hover:shadow-lg hover:shadow-black/50 transition duration-500"
        src={"/cover.jpg"}
        alt={"cover"}
        width={200}
        height={220}
        priority={true}
      />
      <BookMetadata />
    </div>
  );
};
