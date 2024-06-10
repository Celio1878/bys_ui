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
import {
  AgeRangeTags,
  CopyrightTags,
  GenreTags,
  Tag,
  Warning,
  WarningTags,
} from "@/app/model/story";

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
            book_values={form_methods.getValues()}
            on_cancel={() => setOpen(false)}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

function get_book_data(id: string): BookFormValues {
  return {
    title: "Livro " + id,
    description:
      "Todo autor aspira em ser esse tecelão de realidades e de conseguir arrebatar o leitor dessa maneira. Penso que, mais do que uma boa história e bons personagens, o que captura o leitor é a prosa e as descrições. Quando escrevemos, lutamos para encaixar no vocabulário aquilo que o olhar da mente enxerga com tanta clareza. Quando lemos, sentimos desgosto e abandonamos livros que falham em descrever de maneira clara o mundo que vivemos, ou o mundo imaginário, em todas as suas camadas físicas, psicológicas e emocionais.",
    tags: [{ id: "taste", title: "taste" }],
    age_range: AgeRangeTags[0].id,
    warnings: [
      { id: WarningTags[1].id, title: WarningTags[1].title },
      { id: WarningTags[3].id, title: WarningTags[3].title },
      { id: WarningTags[4].id, title: WarningTags[4].title },
    ],
    coauthors: [
      { title: "Autor 3", id: "author_3" },
      { title: "Autor 4", id: "author_4" },
    ],
    copyright: CopyrightTags[1].id,
    genre: GenreTags[0].id,
  };
}
