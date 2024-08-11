import { FC, useState } from "react";
import Image from "next/image";
import { BookMetadata } from "@/components/book/book-metadata";
import { Heart, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { Story } from "@/app/model/story";
import useSWRMutation from "swr/mutation";
import { fetcher } from "@/hooks/fetcher";
import { useSession } from "next-auth/react";

const SERVICE_URL = String(process.env.NEXT_PUBLIC_BOOKS_API_URL);

interface BookContentProps {
  bookData: Story;
}

export const BookContent: FC<BookContentProps> = ({ bookData }) => {
  const { data: session } = useSession() as any;
  const pathname = usePathname();
  const bysUrl = `https://beyourstories.com/${pathname}`;
  const [following, setFollowing] = useState(false);

  const liked = bookData.followers.some(
    (follower) => follower.id === session?.user.email,
  );

  function followerList() {
    if (liked) {
      return bookData.followers.filter(
        (follower) => follower.id !== session?.user.email,
      );
    }

    return [
      ...bookData.followers,
      { title: session?.user.name, id: session?.user.email },
    ];
  }

  const dto: Story = {
    ...bookData,
    followers: followerList(),
  };

  const { trigger } = useSWRMutation(
    `${SERVICE_URL}/book/${bookData.id}/follower`,
    fetcher<any>({
      body: dto,
      token: session?.access_token,
    }).put,
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
  const bookValues = {
    ...bookData,
    coauthors: bookData.coauthors.concat(bookData.author),
  };

  return (
    <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start justify-center md:px-8 lg:px-0">
      <div className="flex flex-col items-center justify-center gap-2">
        <Image
          className="hover:shadow-lg hover:shadow-black/50 transition duration-500"
          src={"/cover.jpg"}
          alt={"cover"}
          width={200}
          height={220}
          priority={true}
        />
        {!inMyLibrary && (
          <div className="flex flex-row items-center justify-center gap-6">
            <Button
              className="rounded-full hover:text-red-500 transition-all duration-500"
              variant="ghost"
              onClick={() => {
                trigger().then(() =>
                  toast({
                    title: `Curtindo ${bookData.title}.`,
                    description: `Siga o autor ${bookData.author.title}!`,
                    type: "background",
                    role: "banner",
                    className: "bg-indigo-600 text-white dark:bg-sky-800",
                  }),
                );
                setFollowing(!following);
              }}
            >
              <Heart
                className={liked ? "text-red-500 animate-pulse scale-110" : ""}
              />
            </Button>
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
      <BookMetadata bookData={bookValues} />
    </div>
  );
};
