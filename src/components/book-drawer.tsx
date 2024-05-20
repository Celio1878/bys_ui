"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FC, useState } from "react";
import { NewBookDrawerButtons } from "@/components/buttons/new-book-drawer-buttons";
import { NewBookSteps } from "@/components/new-book-steps";
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormProvider, useForm } from "react-hook-form";

export const BookDrawer: FC = () => {
  const [open, setOpen] = useState(false);
  const [tab_name, set_tab_name] = useState("content");
  const form_methods = useForm({
    defaultValues: {
      title: "",
      description: "",
      genre: "",
      copyright: "",
      age_range: "",
      tags: [],
      warnings: [],
      coauthors: [],
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="absolute right-5 sm:right-32 sm:gap-2 items-center justify-center">
          <PlusIcon />
          <span className="hidden sm:block">Novo Livro</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <FormProvider {...form_methods}>
          <DialogHeader>
            <DialogTitle>Novo Livro</DialogTitle>
          </DialogHeader>
          <NewBookSteps tab_name={tab_name} />
          <DialogFooter>
            <NewBookDrawerButtons
              tab_name={tab_name}
              set_tab_name={set_tab_name}
              book_values={form_methods.getValues()}
              on_cancel={() => setOpen(false)}
            />
          </DialogFooter>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};
