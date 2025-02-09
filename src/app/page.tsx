"use client";

import { Suspense } from "react";
import { Loading } from "@/components/loading";
import useSWR from "swr";
import { fetcher } from "@/hooks/fetcher";
import GlobalError from "@/app/global-error";
import { BookDto } from "@/app/model/book-dto";
import { ProfileDto } from "@/app/model/profile-dto";
import { MainProfilesSection } from "@/components/main-profile-section";
import { BooksCarouselSection } from "@/components/books-carousel-section";
import { JoinUsSection } from "@/components/main-page/join-us-section";
import { HelloSection } from "@/components/main-page/hello-section";
import { FeaturesSection } from "@/components/main-page/features-section";
import { SecuritySection } from "@/components/main-page/security-section";

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
      <HelloSection />
      <FeaturesSection />
      <SecuritySection />
      <BooksCarouselSection books={books!} />
      <MainProfilesSection profiles={profiles!} />
      <JoinUsSection />
    </Suspense>
  );
}
