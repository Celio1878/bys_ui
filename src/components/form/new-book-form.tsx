import { FC } from "react";
import { Form } from "@/components/ui/form";
import { Card } from "@/components/ui/card";
import { useFormContext } from "react-hook-form";
import { InputFormField } from "@/components/form/fields/input-form-field";
import { TextAreaFormField } from "@/components/form/fields/text-area-form-field";
import { SelectFormField } from "@/components/form/fields/select-form-field";
import { CheckboxListFormField } from "@/components/form/fields/checkbox-list-form-field";
import { InputTagFormField } from "@/components/form/fields/input-tag-form-field";
import { SelectItemsSearchFormField } from "@/components/form/fields/select-items-search-form-field";
import {
  AgeRangeTags,
  CopyrightTags,
  GenreTags,
  WarningTags,
} from "@/app/model/tags";
import useSWR from "swr";
import { fetcher } from "@/hooks/fetcher";
import { ProfileDto } from "@/app/model/profile-dto";
import { useSession } from "next-auth/react";

const PROFILES_SERVICE_URL = String(process.env.NEXT_PUBLIC_PROFILES_API_URL);

export const NewBookForm: FC = () => {
  const { data: session } = useSession() as any;
  const form = useFormContext();

  const { data: profiles } = useSWR(
    PROFILES_SERVICE_URL!,
    fetcher<ProfileDto[]>({}).get,
  );

  const authorTagList = profiles?.map(({ id, name }) => ({ id, title: name }));
  const coAuthorsList = authorTagList?.filter(
    (author) => author.id !== session?.user?.id,
  );

  return (
    <Card className="max-h-[25rem] px-8 py-4 mt-2 bg-slate-50 overflow-y-scroll">
      <Form {...form}>
        <form className="space-y-6">
          <InputFormField form={form} name={"title"} label={"Título"} />

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
            listItems={GenreTags}
            key={"genre"}
          />

          <SelectFormField
            name={"ageRange"}
            label={"Faixa Etária"}
            form={form}
            placeholder={"Selecione a faixa etária"}
            listItems={AgeRangeTags}
            key={"age_range"}
          />

          <CheckboxListFormField
            form={form}
            name={"warnings"}
            listItems={WarningTags}
            label={"Alertas"}
            key={"warnings"}
          />

          <SelectFormField
            name={"copyright"}
            label={"Direitos Autorais"}
            form={form}
            listItems={CopyrightTags}
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
            listItems={coAuthorsList!}
            name={"coauthors"}
            label={"CoAutores"}
            inputPlaceholder={"Procure pelo autor ..."}
            heading={"Autores"}
            textOnEmpty={"Autor não encontrado."}
            buttonText={"Selecione os CoAutores"}
            key={"coauthors"}
          />
        </form>
      </Form>
    </Card>
  );
};
