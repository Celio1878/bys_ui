import { Form } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { FC, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import useSWR from "swr";
import { fetcher } from "@/hooks/fetcher";
import { ProfileDto } from "@/app/model/profile-dto";
import { InputFormField } from "@/components/form/fields/input-form-field";
import { TextAreaFormField } from "@/components/form/fields/text-area-form-field";
import { SelectItemsSearchFormField } from "@/components/form/fields/select-items-search-form-field";
import { useSession } from "next-auth/react";

const PROFILES_SERVICE_URL = String(process.env.NEXT_PUBLIC_PROFILES_API_URL);

export const ReportForm: FC = () => {
  const form = useFormContext();
  const [reportUser, setReportUser] = useState(false);

  const { data: profiles } = useSWR(
    PROFILES_SERVICE_URL,
    fetcher<ProfileDto[]>({}).get,
  );

  const authorTagList = profiles?.map(({ id, name }) => ({ id, title: name }));

  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      form.setValue("name", session?.user?.name);
      form.setValue("email", session?.user?.email);
    }
  }, [status]);

  return (
    <Form {...form}>
      <form className="space-y-4">
        <InputFormField
          key="report-name"
          name="name"
          label="Nome"
          form={form}
          disabled={status === "authenticated"}
        />

        <InputFormField
          key="report-email"
          name="email"
          label="Email"
          form={form}
          disabled={status === "authenticated"}
        />

        <InputFormField
          key="report-title"
          name="reportTitle"
          label="Titulo"
          form={form}
        />

        <TextAreaFormField
          key="report-description"
          name="reportDescription"
          label="Descricao"
          form={form}
          placeholder="Insira a descricao do problema..."
        />

        <div className="flex items-center gap-2">
          <Checkbox
            id="checkbox-report"
            checked={reportUser}
            onCheckedChange={() => setReportUser(!reportUser)}
          />
          <label
            htmlFor="checkbox-report-label"
            className="text-xs text-slate-600"
          >
            Algum perfil envolvido?
          </label>
        </div>

        {reportUser ? (
          <SelectItemsSearchFormField
            form={form}
            listItems={authorTagList!}
            label={""}
            name={"profile"}
            buttonText={"Selecione o perfil"}
            heading={""}
            textOnEmpty={"Nenhum perfil encontrado"}
            inputPlaceholder={"Procurar pelo perfil..."}
          />
        ) : null}
      </form>
    </Form>
  );
};
