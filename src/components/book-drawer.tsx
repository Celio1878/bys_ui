"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { BookDto, createBookDto, updateBookDto } from "@/app/model/book-dto";
import { useBookApi } from "@/hooks/use-book-api";
import { useSession } from "next-auth/react";
import { fetcher } from "@/hooks/fetcher";
import useSWR from "swr";
import { Tag } from "@/app/model/tags";
import { ProfileDto, upsertAuthorship } from "@/app/model/profile-dto";

interface BookDrawerProps {
  buttonLabel: string | ReactNode;
  modalTitle: string;
  onConfirmClick: VoidFunction;
  profile: ProfileDto;
  bookId?: string;
  trigger?: VoidFunction;
}

const BOOK_SERVICE_URL = String(process.env.NEXT_PUBLIC_BOOKS_API_URL);
const PROFILE_SERVICE_URL = String(process.env.NEXT_PUBLIC_PROFILES_API_URL);

export const BookDrawer: FC<BookDrawerProps> = ({
  bookId,
  buttonLabel,
  modalTitle,
  onConfirmClick,
  trigger,
  profile,
}) => {
  const { data: session } = useSession() as any;
  const [openForm, setOpenForm] = useState(false);
  const [tabName, setTabName] = useState("content");
  const formMethods = useForm({
    defaultValues: initialValues,
  });
  const { updateBook, createBook } = useBookApi();

  const { data: book } = useSWR(
    bookId && `${BOOK_SERVICE_URL}/${bookId}`,
    fetcher<BookDto>({ token: session?.access_token }).get,
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
  }, [book, formMethods]);

  useEffect(() => {
    if (openForm) setTabName("content");
  }, [openForm]);

  const authorTag: Tag<string> = {
    id: session?.user?.id,
    title: session?.user?.name,
  };
  const newBookDto = createBookDto(authorTag, formMethods.getValues());
  const updatedBook = book && updateBookDto(book!, formMethods.getValues());

  function onUpdateCover() {
    setTabName("confirm");
  }

  return (
    <Dialog modal open={openForm} onOpenChange={setOpenForm}>
      <DialogTrigger asChild>
        <button onClick={trigger}>{buttonLabel}</button>
      </DialogTrigger>
      <DialogContent aria-describedby={"Insert Book Steps"}>
        <DialogDescription></DialogDescription>
        <DialogHeader>
          <DialogTitle>{modalTitle}</DialogTitle>
        </DialogHeader>
        <FormProvider {...formMethods}>
          <NewBookSteps
            tabName={tabName}
            bookDto={newBookDto}
            onUpdateCover={onUpdateCover}
          />
        </FormProvider>
        <DialogFooter>
          <NewBookDrawerButtons
            tabName={tabName}
            setTabName={setTabName}
            bookValues={formMethods.getValues()}
            onClose={() => setOpenForm(false)}
            onConfirmClick={() => {
              const newAuthorship = upsertAuthorship(
                profile!,
                formMethods.getValues(),
                book ? book.id : newBookDto.id,
              );

              newBookDto.coauthors.forEach(async (coauthor) => {
                const author = await fetcher<ProfileDto>({}).get(
                  `${PROFILE_SERVICE_URL}/${coauthor.id}`,
                );
                const newAuthorship = upsertAuthorship(
                  author!,
                  formMethods.getValues(),
                  book ? book.id : newBookDto.id,
                );

                await fetcher({
                  body: newAuthorship,
                  token: session?.access_token,
                }).put(`${PROFILE_SERVICE_URL}/${profile?.id}`);
              });

              book
                ? Promise.all([
                    updateBook(book.id, updatedBook!),
                    fetcher({
                      body: newAuthorship,
                      token: session?.access_token,
                    }).put(`${PROFILE_SERVICE_URL}/${profile?.id}`),
                  ]).then(() => {
                    setOpenForm(false);
                    onConfirmClick();
                  })
                : Promise.all([
                    createBook(newBookDto),
                    fetcher({
                      body: newAuthorship,
                      token: session?.access_token,
                    }).put(`${PROFILE_SERVICE_URL}/${profile?.id}`),
                  ]).then(() => {
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
