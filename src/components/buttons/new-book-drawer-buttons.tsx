import { FC } from "react";
import { NewBookDrawerConfirmButtons } from "@/components/buttons/new-book-drawer-confirm-buttons";
import { NewBookDrawerFormButtons } from "@/components/buttons/new-book-drawer-form-buttons";
import { NewBookDrawerCoverButtons } from "@/components/buttons/new-book-drawer-cover-buttons";
import { useSession } from "next-auth/react";
import { fetcher } from "@/hooks/fetcher";
import { toast } from "@/components/ui/use-toast";
import useSWRMutation from "swr/mutation";

const SERVICE_URL = String(process.env.NEXT_PUBLIC_BOOKS_API_URL);

interface BookDrawerButtonsProps {
  tabName: string;
  setTabName: (tab_name: string) => void;
  onClose: VoidFunction;
  bookValues: any;
  bookCreated: VoidFunction;
}

export const NewBookDrawerButtons: FC<BookDrawerButtonsProps> = ({
  tabName,
  setTabName,
  onClose,
  bookValues,
  bookCreated,
}) => {
  const { data: session } = useSession() as any;

  const disable =
    !bookValues.title ||
    !bookValues.description ||
    !bookValues.genre ||
    !bookValues.copyright ||
    !bookValues.ageRange ||
    bookValues.warnings.length === 0;

  const isJson = (str: string) => {
    try {
      return JSON.parse(str);
    } catch (e) {
      return { id: "", title: "" };
    }
  };

  const dto = {
    id: bookValues.title.toLowerCase().replace(/\s/g, "-") + "-" + Date.now(),
    title: bookValues.title,
    description: bookValues.description,
    genre: isJson(bookValues.genre),
    copyright: isJson(bookValues.copyright),
    ageRange: isJson(bookValues.ageRange),
    author: bookValues.author,
    tags: bookValues.tags,
    warnings: bookValues.warnings,
    coauthors: bookValues.coauthors,
    cover: "",
  };

  const { trigger } = useSWRMutation(
    `${SERVICE_URL}/books`,
    fetcher<any>({
      body: dto,
      token: session?.access_token,
    }).post,
  );

  switch (tabName) {
    case "content":
      return (
        <NewBookDrawerFormButtons
          onCancel={onClose}
          nextStepClick={() => setTabName("cover")}
          disabled={disable}
        />
      );
    case "cover":
      return (
        <NewBookDrawerCoverButtons
          disabled={disable}
          goBackClick={() => setTabName("content")}
          nextStepClick={() => setTabName("confirm")}
        />
      );

    case "confirm":
      return (
        <NewBookDrawerConfirmButtons
          disabled={disable}
          goBackClick={() => setTabName("cover")}
          onConfirmClick={() => {
            trigger().then(() => {
              toast({
                className: "bg-violet-500 text-white",
                title: `Livro ${dto.title} criado!`,
                description: "Seu livro foi criado com sucesso!",
                type: "foreground",
              });
              bookCreated();
              onClose();
            });
          }}
        />
      );
  }
};
