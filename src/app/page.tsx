"use client";

import { BannerCarousel } from "@/components/carousel/banner-carousel";
import { Suspense } from "react";
import { Loading } from "@/components/loading";
import { BooksCarousel } from "@/components/carousel/books-carousel";
import useSWR from "swr";
import { fetcher } from "@/hooks/fetcher";
import GlobalError from "@/app/global-error";
import { BookDto } from "@/app/model/book-dto";
import { ProfileDto } from "@/app/model/profile-dto";
import Image from "next/image";
import Link from "next/link";
import { GenreTags } from "@/app/model/tags";

const BOOKS_SERVICE_URL = process.env.NEXT_PUBLIC_BOOKS_API_URL!;
const PROFILES_SERVICE_URL = process.env.NEXT_PUBLIC_PROFILES_API_URL!;

export default function Home() {
  const {
    data: books,
    error: booksErr,
    mutate: getBooks,
  } = useSWR(BOOKS_SERVICE_URL, fetcher<BookDto[]>({}).get);
  const {
    data: profiles,
    error: profilesErr,
    mutate: getProfiles,
  } = useSWR(PROFILES_SERVICE_URL, fetcher<ProfileDto[]>({}).get);

  if (booksErr) return <GlobalError error={booksErr} reset={getBooks} />;
  if (profilesErr)
    return <GlobalError error={profilesErr} reset={getProfiles} />;

  return (
    <Suspense fallback={<Loading />}>
      <BannerCarousel />
      <section className="flex flex-col gap-20">
        <BooksCarousel
          key={"highlighted"}
          sectionTitle={"Destaque"}
          books={books!}
        />

        {GenreTags.map((section) => {
          const booksByGenre = books?.filter(
            (book) => book.genre.id === section.id,
          );

          if (!booksByGenre || booksByGenre.length === 0) return null;

          return (
            <BooksCarousel
              key={section.id}
              sectionTitle={section.title}
              books={booksByGenre}
            />
          );
        })}
      </section>

      <section className="w-full flex flex-col gap-8 justify-center items-center mt-28">
        <h1 className="font-bold text-3xl underline underline-offset-4">
          Principais Autores
        </h1>
        <div className="flex flex-wrap gap-8 justify-center items-center">
          {profiles?.map((profile) => (
            <div
              className="w-28 flex justify-center items-center"
              key={profile.id}
            >
              <Link
                className="text-sm hover:underline transition-all duration-150"
                href={`authors/${profile.id}`}
              >
                <div className="flex flex-col justify-center items-center gap-2">
                  <Image
                    className="rounded-full"
                    {...{
                      src: profile.urlImage,
                      alt: profile.name,
                      width: 100,
                      height: 100,
                      priority: true,
                      quality: 100,
                    }}
                  />
                  <span className="text-xs text-center">{profile.name}</span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </Suspense>
  );
}
