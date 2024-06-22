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
import { Button } from "@/components/ui/button";
import { FormProvider, useForm } from "react-hook-form";
import { Tag, Warning } from "@/app/model/story";
import { get_book_data } from "@/utils/mocks";
import { useSession } from "next-auth/react";

type BookFormValues = {
  title: string;
  description: string;
  genre: string;
  copyright: string;
  age_range: string;
  tags: Tag<string>[];
  warnings: Tag<Warning>[];
  coauthors: Tag<string>[];
};

const initial_values: BookFormValues = {
  title: "",
  description: "",
  genre: "",
  copyright: "",
  age_range: "",
  tags: [],
  warnings: [],
  coauthors: [],
};

interface BookDrawerProps {
  id?: string;
  button_type: "default" | "secondary" | "outline" | "ghost";
  button_label: string | ReactNode;
  modal_title: string;
}

export const BookDrawer: FC<BookDrawerProps> = ({
  id,
  button_label,
  button_type,
  modal_title,
}) => {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const [tab_name, set_tab_name] = useState("content");
  const form_methods = useForm({
    defaultValues: initial_values,
  });

  useEffect(() => {
    if (id) {
      const book_data = get_book_data(id);
      return form_methods.reset(book_data);
    }

    return () => form_methods.reset(initial_values);
  }, [id]);

  useEffect(() => {
    if (open) set_tab_name("content");
  }, [open]);

  const book_data = {
    ...form_methods.getValues(),
    author: { id: session?.user?.email!, title: session?.user?.name! },
  };

  return (
    <Dialog modal open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={button_type}
          className="sm:gap-2 items-center justify-center"
        >
          {button_label}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{modal_title}</DialogTitle>
        </DialogHeader>
        <FormProvider {...form_methods}>
          <NewBookSteps tab_name={tab_name} />
        </FormProvider>
        <DialogFooter>
          <NewBookDrawerButtons
            tab_name={tab_name}
            set_tab_name={set_tab_name}
            book_values={book_data}
            on_cancel={() => setOpen(false)}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
