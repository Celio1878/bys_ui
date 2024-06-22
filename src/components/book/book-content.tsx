import { FC, useState } from "react";
import Image from "next/image";
import { BookMetadata } from "@/components/book/book-metadata";
import { Heart, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

interface BookContentProps {
  book_data: any;
}

export const BookContent: FC<BookContentProps> = ({ book_data }) => {
  const [liked, set_liked] = useState(false);
  const pathname = usePathname();
  const { toast } = useToast();
  const full_url = `https://beyourstories.com/${pathname}`;

  function copy_url_clipboard() {
    navigator.clipboard.writeText(full_url).then(() =>
      toast({
        title: "Link do livro copiado!",
        description: "Compartilhe nas suas redes sociais!!!",
        type: "background",
        role: "banner",
        className: "bg-indigo-600 text-white dark:bg-sky-800",
      }),
    );
  }

  const in_my_library = pathname.includes("profile");
  const book_values = {
    ...book_data,
    coauthors: book_data.coauthors.concat(book_data.author),
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
        {!in_my_library && (
          <div className="flex flex-row items-center justify-center gap-6">
            <Button
              className="rounded-full"
              variant="ghost"
              onClick={() => set_liked(!liked)}
            >
              <Heart
                className={liked ? "text-red-500 animate-pulse scale-110" : ""}
              />
            </Button>
            <Button
              title="Compartilhe"
              variant="ghost"
              onClick={copy_url_clipboard}
            >
              <Share2 />
            </Button>
          </div>
        )}
      </div>
      <BookMetadata book_data={book_values} />
    </div>
  );
};
