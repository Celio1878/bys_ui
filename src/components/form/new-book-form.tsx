import { FC, useEffect } from "react";
import { Form } from "@/components/ui/form";
import { Card } from "@/components/ui/card";
import { useFormContext } from "react-hook-form";
import { InputFormField } from "@/components/form/fields/input-form-field";
import { TextAreaFormField } from "@/components/form/fields/text-area-form-field";
import { SelectFormField } from "@/components/form/fields/select-form-field";
import {
  AgeRangeTags,
  CopyrightTags,
  GenreTags,
  WarningTags,
} from "@/app/model/story";
import { CheckboxListFormField } from "@/components/form/fields/checkbox-list-form-field";
import { InputTagFormField } from "@/components/form/fields/input-tag-form-field";
import { SelectItemsSearchFormField } from "@/components/form/fields/select-items-search-form-field";

interface NewBookFormProps {
  set_book_data: (book_data: any) => void;
}

export const NewBookForm: FC<NewBookFormProps> = ({ set_book_data }) => {
  const form = useFormContext();

  useEffect(() => {
    form.watch((value) => set_book_data(value));
  }, [form]);

  return (
    <Card className="max-h-[35rem] px-8 py-4 mt-2 bg-slate-50 overflow-y-scroll">
      <Form {...form}>
        <form className="space-y-6">
          <InputFormField form={form} name={"title"} label={"Titulo"} />

          <TextAreaFormField
            name={"description"}
            label={"Sinopse"}
            form={form}
          />

          <SelectFormField
            name={"genre"}
            label={"Categorias"}
            form={form}
            placeholder={"Selecione uma categoria"}
            list_items={GenreTags}
            key={"genre"}
          />

          <SelectFormField
            name={"age_range"}
            label={"Faixa Etaria"}
            form={form}
            placeholder={"Selecione a faixa etaria"}
            list_items={AgeRangeTags}
            key={"age_range"}
          />

          <CheckboxListFormField
            form={form}
            name={"warnings"}
            list_items={WarningTags}
            label={"Alertas"}
            key={"warnings"}
          />

          <SelectFormField
            name={"copyright"}
            label={"Direitos Autorais"}
            form={form}
            list_items={CopyrightTags}
            placeholder={"Selecione o Copyright"}
            key={"copyright"}
          />

          <InputTagFormField
            label={"Tags"}
            name={"tags"}
            placeholder={"Insira uma tag"}
            key={"tags"}
            form={form}
          />

          <SelectItemsSearchFormField
            form={form}
            list_items={authors}
            name={"coauthors"}
            label={"CoAutores"}
            input_placeholder={"Procure pelo autor ..."}
            heading={"Autores"}
            text_on_empty={"Autor nao encontrado."}
            button_text={"Selecione os CoAutores"}
            key={"coauthors"}
          />
        </form>
      </Form>
    </Card>
  );
};

const authors = [
  { title: "Autor 1", id: "author_1" },
  { title: "Autor 2", id: "author_2" },
  { title: "Autor 3", id: "author_3" },
  { title: "Autor 4", id: "author_4" },
  { title: "Autor 5", id: "author_5" },
  { title: "Autor 6", id: "author_6" },
  { title: "Autor 7", id: "author_7" },
  { title: "Autor 8", id: "author_8" },
  { title: "Autor 9", id: "author_9" },
];
