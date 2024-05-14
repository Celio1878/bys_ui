import { FC } from "react";
import { Form } from "@/components/ui/form";
import { Card } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { InputFormField } from "@/components/form-fields/input-form-field";
import { TextAreaFormField } from "@/components/form-fields/text-area-form-field";
import { SelectFormField } from "@/components/form-fields/select-form-field";
import {
  AgeRangeTags,
  CopyrightTags,
  GenreTags,
  WarningTags,
} from "@/app/model/story";
import { CheckboxListFormField } from "@/components/form-fields/checkbox-list-form-field";
import { InputTagFormField } from "@/components/form-fields/input-tag-form-field";
import { SelectItemsSearchFormField } from "@/components/form-fields/select-items-search-form-field";

export const NewBookForm: FC = () => {
  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      genre: "",
      copyright: "",
      age_range: "",
      tags: [] as string[],
      warnings: [] as string[],
      coauthors: [] as string[],
    },
  });

  function onSubmit(values: any) {
    console.log(values, "FORM VALUES");
  }

  return (
    <Card className="max-h-[35rem] px-8 py-4 mt-2 bg-slate-50 overflow-y-scroll">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <InputFormField
            form_control={form.control}
            name={"title"}
            label={"Titulo"}
          />

          <TextAreaFormField
            name={"description"}
            label={"Sinopse"}
            form_control={form.control}
          />

          <SelectFormField
            name={"genre"}
            label={"Categorias"}
            form_control={form.control}
            placeholder={"Selecione uma categoria"}
            list_items={GenreTags}
            key={"genre"}
          />

          <SelectFormField
            name={"age_range"}
            label={"Faixa Etaria"}
            form_control={form.control}
            placeholder={"Selecione a faixa etaria"}
            list_items={AgeRangeTags}
            key={"age_range"}
          />

          <CheckboxListFormField
            form_control={form.control}
            name={"warnings"}
            list_items={WarningTags}
            label={"Alertas"}
            key={"warnings"}
          />

          <SelectFormField
            name={"copyright"}
            label={"Direitos Autorais"}
            form_control={form.control}
            list_items={CopyrightTags}
            placeholder={"Selecione o Copyright"}
            key={"copyright"}
          />

          <InputTagFormField
            label={"Tags"}
            name={"tags"}
            form_control={form.control}
            placeholder={"Insira uma tag"}
            key={"tags"}
          />

          <SelectItemsSearchFormField
            form_control={form.control}
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
  { label: "Autor 1", value: "author_1" },
  { label: "Autor 2", value: "author_2" },
  { label: "Autor 3", value: "author_3" },
  { label: "Autor 4", value: "author_4" },
  { label: "Autor 5", value: "author_5" },
  { label: "Autor 6", value: "author_6" },
  { label: "Autor 7", value: "author_7" },
  { label: "Autor 8", value: "author_8" },
  { label: "Autor 9", value: "author_9" },
];
