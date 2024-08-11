"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FC, ReactNode, useEffect, useState } from "react";
import { NewBookDrawerButtons } from "@/components/buttons/new-book-drawer-buttons";
import { NewBookSteps } from "@/components/new-book-steps";
import { FormProvider, useForm } from "react-hook-form";
import { Story, Tag, Warning } from "@/app/model/story";
import { useSession } from "next-auth/react";
import useSWRMutation from "swr/mutation";
import { fetcher } from "@/hooks/fetcher";

export type BookFormValues = {
  title: string;
  description: string;
  genre: string;
  copyright: string;
  ageRange: string;
  tags: Tag<string>[];
  warnings: Tag<Warning>[];
  coauthors: Tag<string>[];
  author: Tag<string>;
};

const initialValues: BookFormValues = {
  title: "",
  description: "",
  genre: "",
  copyright: "",
  ageRange: "",
  tags: [],
  warnings: [],
  coauthors: [],
  author: { id: "", title: "" },
};

interface BookDrawerProps {
  id?: string;
  buttonType: "default" | "secondary" | "outline" | "ghost";
  buttonLabel: string | ReactNode;
  modalTitle: string;
  bookCreated: VoidFunction;
}

const BOOK_SERVICE_URL = String(process.env.NEXT_PUBLIC_BOOKS_API_URL);

export const BookDrawer: FC<BookDrawerProps> = ({
  id,
  buttonLabel,
  buttonType,
  modalTitle,
  bookCreated,
}) => {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const [tabName, setTabName] = useState("content");
  const formMethods = useForm({
    defaultValues: initialValues,
  });

  const { trigger, data: book } = useSWRMutation(
    `${BOOK_SERVICE_URL}/book/${id}`,
    fetcher<Story>({}).get,
  );

  useEffect(() => {
    if (book) {
      const bookToForm: BookFormValues = {
        ageRange: JSON.stringify(book.ageRange),
        copyright: JSON.stringify(book.copyright),
        genre: JSON.stringify(book.genre),
        title: book.title,
        description: book.description,
        warnings: book.warnings,
        coauthors: book.coauthors,
        author: book.author,
        tags: book.tags,
      };
      return formMethods.reset(bookToForm);
    }

    return () => formMethods.reset(initialValues);
  }, [book]);

  useEffect(() => {
    if (open) setTabName("content");
  }, [open]);

  const bookData = {
    ...formMethods.getValues(),
    author: { id: session?.user?.email!, title: session?.user?.name! },
  };

  return (
    <Dialog modal open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button onClick={() => trigger()}>{buttonLabel}</button>
      </DialogTrigger>
      <DialogContent aria-describedby={"Insert Book Steps"}>
        <DialogHeader>
          <DialogTitle>{modalTitle}</DialogTitle>
        </DialogHeader>
        <FormProvider {...formMethods}>
          <NewBookSteps tabName={tabName} />
        </FormProvider>
        <DialogFooter>
          <NewBookDrawerButtons
            tabName={tabName}
            setTabName={setTabName}
            bookValues={bookData}
            onClose={() => setOpen(false)}
            bookCreated={bookCreated}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
