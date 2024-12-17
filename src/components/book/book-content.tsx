import { FC } from "react";
import Image from "next/image";
import { BookMetadata } from "@/components/book/book-metadata";
import { Heart, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { BookDto } from "@/app/model/book-dto";
import useSWRMutation from "swr/mutation";
import { fetcher } from "@/hooks/fetcher";
import { useSession } from "next-auth/react";
import { sanitizeTagList, Tag } from "@/app/model/tags";
import useSWR from "swr";
import { ProfileDto } from "@/app/model/profile-dto";

const SERVICE_URL = String(process.env.NEXT_PUBLIC_BOOKS_API_URL);
const PROFILE_SERVICE_URL = String(process.env.NEXT_PUBLIC_PROFILES_API_URL);

interface BookContentProps {
  book: BookDto;
}

export const BookContent: FC<BookContentProps> = ({ book }) => {
  const { data: session } = useSession() as any;
  const pathname = usePathname();
  const bysUrl = `https://beyourstories.com.br${pathname}`;

  const userTag: Tag<string> = {
    id: session?.user?.id!,
    title: session?.user?.name!,
  };

  const { data: profile, mutate: getProfile } = useSWR(
    `${PROFILE_SERVICE_URL}/${session?.user?.id}`,
    fetcher<ProfileDto>({ token: session?.access_token }).get,
  );

  const liked = book?.followers?.some(
    (follower) => follower.id === session?.user.id,
  );

  const dto: BookDto = {
    ...book,
    followers: sanitizeTagList({
      tagList: book?.followers!,
      newTag: userTag,
    }),
  };

  const { trigger: updateBook } = useSWRMutation(
    `${SERVICE_URL}/${book?.id}`,
    fetcher<BookDto>({
      body: dto,
      token: session?.access_token,
    }).put,
  );

  const bookTag: Tag<string> = {
    id: book?.id,
    title: book?.title,
  };

  const profileDto: ProfileDto = {
    ...profile!,
    readList: sanitizeTagList({ tagList: profile?.readList!, newTag: bookTag }),
  };

  const { trigger: updateProfile } = useSWRMutation(
    `${PROFILE_SERVICE_URL}/${session?.user?.id}`,
    fetcher<ProfileDto>({ body: profileDto, token: session?.access_token }).put,
  );

  function copy_url_clipboard() {
    navigator.clipboard.writeText(bysUrl).then(() =>
      toast({
        title: "Link do livro copiado!",
        description: "Compartilhe nas suas redes sociais!!!",
        type: "background",
        role: "banner",
        className: "bg-indigo-600 text-white dark:bg-sky-800",
      }),
    );
  }

  const inMyLibrary = pathname.includes("profile");

  const bookValues: BookDto = {
    ...book!,
    coauthors: book?.coauthors?.concat(book?.author)!,
  };

  return (
    <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start justify-center md:px-8 lg:px-0">
      <div className="flex flex-col items-center justify-center gap-2">
        <Image
          className="hover:shadow-lg hover:shadow-black/50 transition duration-500"
          src={book?.cover! ?? "/user.png"}
          alt={"cover"}
          width={200}
          height={220}
          priority={true}
        />
        {!inMyLibrary && (
          <div className="flex flex-row justify-center gap-6">
            <div className="flex flex-col  items-center justify-center">
              <Button
                className="rounded-full hover:text-red-500 transition-all duration-500"
                variant="ghost"
                onClick={() =>
                  Promise.all([updateBook(), updateProfile()]).finally(() =>
                    getProfile(),
                  )
                }
              >
                <Heart
                  className={
                    liked
                      ? "text-red-500 animate-pulse scale-110 fill-red-500"
                      : ""
                  }
                />
              </Button>
              <span className="text-xs text-gray-400">
                {book?.followers?.length}
              </span>
            </div>
            <Button
              className="hover:opacity-50 transition-opacity duration-500"
              title="Compartilhe"
              variant="ghost"
              onClick={copy_url_clipboard}
            >
              <Share2 />
            </Button>
          </div>
        )}
      </div>
      <BookMetadata book={bookValues} />
    </div>
  );
};
