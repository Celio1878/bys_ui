import { FC, ReactNode, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { Tag } from "@/app/model/tags";
import { Loading } from "@/components/loading";
import useSWR from "swr";
import { fetcher } from "@/hooks/fetcher";
import { BookDto } from "@/app/model/book-dto";

interface BookProps {
  bookTag: Tag<string>;
  buttons?: ReactNode;
  href: string;
}

const SERVICE_URL = String(process.env.NEXT_PUBLIC_BOOKS_API_URL);

export const Book: FC<BookProps> = ({ bookTag, buttons, href }) => {
  const { data: book } = useSWR(
    `${SERVICE_URL}/${bookTag.id}`,
    fetcher<BookDto>({}).get,
  );

  if (!book) {
    return <Loading />;
  }

  return (
    <Suspense fallback={<Loading />}>
      <div className="flex flex-col w-32 h-full gap-2 items-center">
        <Link href={href}>
          <Image
            className="w-full h-[13rem] object-fill cursor-pointer hover:scale-105 hover:shadow-lg hover:shadow-black/50 hover:opacity-90 transition duration-500"
            src={book.cover}
            alt={book.title}
            width={120}
            height={140}
            loading={"lazy"}
          />
        </Link>

        <Link
          className="text-xs hover:font-semibold hover:cursor-pointer hover:underline transition-all duration-150 text-start px-1.5"
          href={href}
        >
          {bookTag.title}
        </Link>
        {buttons}
      </div>
    </Suspense>
  );
};
