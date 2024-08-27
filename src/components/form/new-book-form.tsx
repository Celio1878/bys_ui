import {FC} from "react";
import {Form} from "@/components/ui/form";
import {Card} from "@/components/ui/card";
import {useFormContext} from "react-hook-form";
import {InputFormField} from "@/components/form/fields/input-form-field";
import {TextAreaFormField} from "@/components/form/fields/text-area-form-field";
import {SelectFormField} from "@/components/form/fields/select-form-field";
import {CheckboxListFormField} from "@/components/form/fields/checkbox-list-form-field";
import {InputTagFormField} from "@/components/form/fields/input-tag-form-field";
import {SelectItemsSearchFormField} from "@/components/form/fields/select-items-search-form-field";
import {AgeRangeTags, CopyrightTags, GenreTags, Tag, WarningTags} from "@/app/model/tags";
import useSWR from "swr";
import {fetcher} from "@/hooks/fetcher";
import {ProfileDto} from "@/app/model/profile-dto";

const PROFILES_SERVICE_URL = String(process.env.NEXT_PUBLIC_PROFILES_API_URL);

export const NewBookForm: FC = () => {
  const form = useFormContext();
  
  const {data: profiles} = useSWR(
    PROFILES_SERVICE_URL!,
    fetcher<ProfileDto[]>({})get,
  )
  
  const authorTagList = tagList(profiles!);

  return (
    <Card className="max-h-[30rem] px-8 py-4 mt-2 bg-slate-50 overflow-y-scroll">
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
            name={"ageRange"}
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
            listItems={authorTagList}
            name={"coauthors"}
            label={"CoAutores"}
            inputPlaceholder={"Procure pelo autor ..."}
            heading={"Autores"}
            textOnEmpty={"Autor nao encontrado."}
            buttonText={"Selecione os CoAutores"}
            key={"coauthors"}
          />
        </form>
      </Form>
    </Card>
  );
};

function tagList(profiles: ProfileDto[]): Tag<string>[] {
  const profileTags: Tag<string>[] = [];
  profiles?.forEach((p) => profileTags.push({id: p.id, title: p.name}));
  
  return profileTags;
}
