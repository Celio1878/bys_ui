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
import { BookFormValues, initialValues } from "@/utils/form-data";
import { CreateBookDto, Story, Tag } from "@/app/model/story";
import { useBookApi } from "@/hooks/useBookApi";
import { useSession } from "next-auth/react";
import { fetcher } from "@/hooks/fetcher";
import useSWR from "swr";

interface BookDrawerProps {
  bookId?: string;
  buttonLabel: string | ReactNode;
  modalTitle: string;
  onConfirmClick: VoidFunction;
  trigger?: VoidFunction;
}

const BOOK_SERVICE_URL = String(process.env.NEXT_PUBLIC_BOOKS_API_URL);

export const BookDrawer: FC<BookDrawerProps> = ({
  bookId,
  buttonLabel,
  modalTitle,
  onConfirmClick,
  trigger,
}) => {
  const { data: session } = useSession() as any;
  const [openForm, setOpenForm] = useState(false);
  const [tabName, setTabName] = usState("content");
  const formMethods = useForm({
    defaultValues: initialValues,
  });
  const { updateBook, createBook } = useBookApi();

  const { data: book } = useSWR(
    bookId && `${BOOK_SERVICE_URL}/${bookId}`,
    fetcher<Story>({ token: session?.access_token }).get,
  );

  useEffect(() => {
    if (book) {
      const bookFormState: BookFormValues = {
        ...book,
        ageRange: JSON.stringify(book.ageRange),
        copyright: JSON.stringify(book.copyright),
        genre: JSON.stringify(book.genre),
      };

      return formMethods.reset(bookFormState);
    }
  }, [book]);

  useEffect(() => {
    if (openForm) setTabName("content");
  }, [openForm]);

  const authorTag: Tag<string> = {
    id: session?.user?.id,
    title: session?.user?.name,
  };
  const newBookDto = createBookDto(authorTag, formMethods.getValues());

  const updatedBook = book && updateBookDto(book!, formMethods.getValues());

  return (
    <Dialog modal open={openForm} onOpenChange={setOpenForm}>
      <DialogTrigger asChild>
        <button onClick={trigger}>{buttonLabel}</button>
      </DialogTrigger>
      <DialogContent aria-describedby={"Insert Book Steps"}>
        <DialogHeader>
          <DialogTitle>{modalTitle}</DialogTitle>
        </DialogHeader>
        <FormProvider {...formMethods}>
          <NewBookSteps tabName={tabName} bookDto={newBookDto} />
        </FormProvider>
        <DialogFooter>
          <NewBookDrawerButtons
            tabName={tabName}
            setTabName={setTabName}
            bookValues={formMethods.getValues()}
            onClose={() => setOpenForm(false)}
            onConfirmClick={async () => {
              book
                ? updateBook(book.id, updatedBook!).then(() => {
                    setOpenForm(false);
                    onConfirmClick();
                  })
                : createBook(newBookDto).then(() => {
                    setOpenForm(false);
                    onConfirmClick();
                  });
            }}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

function convertToJson(str: string) {
  try {
    return JSON.parse(str);
  } catch (e) {
    return { id: "", title: "" };
  }
}

function createBookDto(
  authorTag: Tag<string>,
  bookValues: BookFormValues,
): CreateBookDto {
  return {
    id: bookValues.title.toLowerCase().replace(/\s/g, "-") + "-" + authorTag.id,
    title: bookValues.title,
    description: bookValues.description,
    genre: convertToJson(bookValues.genre),
    copyright: convertToJson(bookValues.copyright),
    ageRange: convertToJson(bookValues.ageRange),
    author: authorTag,
    tags: bookValues.tags,
    warnings: bookValues.warnings,
    coauthors: bookValues.coauthors,
  };
}

function updateBookDto(
  initialValues: Story,
  bookValues: BookFormValues,
): Story {
  return {
    id: initialValues.id,
    title: bookValues.title,
    description: bookValues.description,
    genre: convertToJson(bookValues.genre),
    copyright: convertToJson(bookValues.copyright),
    ageRange: convertToJson(bookValues.ageRange),
    author: initialValues.author,
    tags: bookValues.tags,
    warnings: bookValues.warnings,
    coauthors: bookValues.coauthors,
    publishAt: initialValues.publishAt,
    chapters: initialValues.chapters,
    followers: initialValues.followers,
  };
}
