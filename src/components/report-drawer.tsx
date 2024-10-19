import { FC, ReactNode, useEffect, useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FormProvider, useForm } from "react-hook-form";
import { CancelButton } from "@/components/buttons/cancel-button";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ReportForm } from "@/components/form/report-form";
import useSWRMutation from "swr/mutation";
import { fetcher } from "@/hooks/fetcher";
import { ReportDto } from "@/app/model/report-dto";
import { useSession } from "next-auth/react";
import { toast } from "@/components/ui/use-toast";

type ReportFormValues = {
  name: string;
  email: string;
  reportTitle: string;
  reportDescription: string;
  profile: string[];
};

const initialValues: ReportFormValues = {
  name: "",
  email: "",
  reportTitle: "",
  reportDescription: "",
  profile: [],
};

interface ReportFormProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  trigger: ReactNode;
  complements?: any;
}

const PROFILE_SERVICE_URL = String(process.env.NEXT_PUBLIC_PROFILES_API_URL);
const emailRegex = /\S+@\S+\.\S+/;

export const ReportDrawer: FC<ReportFormProps> = ({
  isOpen,
  setIsOpen,
  trigger,
  complements,
}) => {
  const formMethods = useForm({
    defaultValues: initialValues,
  });
  const [isValidEmail, setIsValidEmail] = useState(false);

  const { data: session, status } = useSession() as any;

  const userData = useMemo(() => {
    return {
      id: status === "authenticated" ? session?.user?.id : "",
      email:
        status === "authenticated"
          ? session?.user?.email
          : formMethods.watch("email"),
      name:
        status === "authenticated"
          ? session?.user?.name
          : formMethods.watch("name"),
    };
  }, [status, session, formMethods.getValues()]);

  const reportDto: ReportDto = useMemo(() => {
    return {
      title: formMethods.watch("reportTitle"),
      content: formMethods.watch("reportDescription"),
      userData,
      aboutWho: formMethods.watch("profile") as any,
      aboutComment: complements,
    };
  }, [userData, complements, formMethods.getValues()]);

  const { trigger: createReport } = useSWRMutation(
    `${PROFILE_SERVICE_URL}/report`,
    fetcher<ReportDto>({ body: reportDto }).post,
  );

  const isReportInvalid = useMemo(() => {
    return (
      !reportDto.title ||
      !reportDto.content ||
      !userData.email ||
      !isValidEmail ||
      !userData.name
    );
  }, [reportDto, userData, isValidEmail]);

  useEffect(() => {
    const email = userData.email;

    if (!emailRegex.test(email)) {
      formMethods.setError("email", {
        type: "manual",
        message: "Insira um email válido",
      });
      setIsValidEmail(false);
    } else {
      formMethods.clearErrors("email");
      setIsValidEmail(true);
    }
  }, [userData.email, formMethods]);

  const handleSuccessToast = () => {
    toast({
      description:
        "Nós recebemos sua mensagem e nosso time entrará em contato em breve.",
      type: "foreground",
    });
  };

  const handleErrToast = (err: any) => {
    toast({
      title: "Erro ao enviar report",
      description: err?.message || "Ocorreu um erro desconhecido.",
      type: "foreground",
    });
  };

  function handleSubmit() {
    createReport()
      .then(() => {
        handleSuccessToast();
        formMethods.clearErrors();
        formMethods.reset();
        setIsOpen(false);
      })
      .catch(handleErrToast);
  }

  return (
    <Dialog modal open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent aria-describedby={"Report"}>
        <DialogHeader>
          <DialogTitle>Fale com a gente!</DialogTitle>
          <DialogDescription>
            Diga-nos o que está acontecendo.
          </DialogDescription>
        </DialogHeader>
        <FormProvider {...formMethods}>
          <Card className="px-6 py-4 bg-slate-50">
            <ReportForm />
          </Card>
        </FormProvider>
        <DialogFooter className="flex flex-row justify-end">
          <CancelButton onClick={() => setIsOpen(false)} />
          <Button disabled={isReportInvalid} onClick={handleSubmit}>
            Enviar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
