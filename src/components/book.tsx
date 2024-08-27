import { FC, ReactNode, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { Tag } from "@/app/model/story";
import useSWR from "swr";
import { fetcher } from "@/hooks/fetcher";
import { Loading } from "@/components/loading";

interface BookProps {
  bookTag: Tag<string>;
  buttons?: ReactNode;
  href: string;
}

const SERVICE_URL = process.env.NEXT_PUBLIC_BOOKS_API_URL!;

export const Book: FC<BookProps> = ({ bookTag, buttons, href }) => {
  const { data: s3Url } = useSWR(
    `${SERVICE_URL}/${bookTag.id}/cover/image`,
    fetcher<string>({}).get,
  );

  return (
    <Suspense fallback={<Loading />}>
      <div className="flex flex-col w-[10rem] h-[20rem] gap-2 items-center">
        <Link href={href}>
          <Image
            className="object-cover cursor-pointer hover:scale-105 hover:shadow-lg hover:shadow-black/50 hover:opacity-90 transition duration-500"
            src={s3Url ? s3Url : "/user.png"}
            alt={"Book Cover"}
            width={120}
            height={140}
            loading={"lazy"}
          />
        </Link>

        <Link
          className="w-10/12 text-xs hover:font-semibold hover:cursor-pointer hover:underline transition-all duration-150 text-start"
          href={href}
        >
          {bookTag.title}
        </Link>
        {buttons}
      </div>
    </Suspense>
  );
};
