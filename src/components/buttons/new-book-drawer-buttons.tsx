import { FC } from "react";
import { NewBookDrawerConfirmButtons } from "@/components/buttons/new-book-drawer-confirm-buttons";
import { NewBookDrawerFormButtons } from "@/components/buttons/new-book-drawer-form-buttons";
import { NewBookDrawerCoverButtons } from "@/components/buttons/new-book-drawer-cover-buttons";
import { useSession } from "next-auth/react";

const SERVICE_URL = String(process.env.NEXT_PUBLIC_BOOKS_API_URL);

interface BookDrawerButtonsProps {
  tabName: string;
  setTabName: (tab_name: string) => void;
  onClose: VoidFunction;
  bookValues: any;
  onConfirmClick: VoidFunction;
}

export const NewBookDrawerButtons: FC<BookDrawerButtonsProps> = ({
  tabName,
  setTabName,
  onClose,
  bookValues,
  onConfirmClick,
}) => {
  const { data: session } = useSession() as any;

  const disable =
    !bookValues.title ||
    !bookValues.description ||
    !bookValues.genre ||
    !bookValues.copyright ||
    !bookValues.ageRange ||
    bookValues.warnings.length === 0;

  function convertToJson(str: string) {
    try {
      return JSON.parse(str);
    } catch (e) {
      return { id: "", title: "" };
    }
  }

  const dto = {
    id: bookValues.title.toLowerCase().replace(/\s/g, "-") + "-" + Date.now(),
    title: bookValues.title,
    description: bookValues.description,
    genre: convertToJson(bookValues.genre),
    copyright: convertToJson(bookValues.copyright),
    ageRange: convertToJson(bookValues.ageRange),
    author: { id: session?.user?.id!, title: session?.user?.name! },
    tags: bookValues.tags,
    warnings: bookValues.warnings,
    coauthors: bookValues.coauthors,
  };

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
          onConfirmClick={onConfirmClick}
        />
      );
  }
};
