import { FC, ReactNode } from "react";
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
import { toast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";
import { ReportForm } from "@/components/form/report-form";

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
  onConfirm: VoidFunction;
  trigger: ReactNode;
}

export const ReportDrawer: FC<ReportFormProps> = ({
  isOpen,
  setIsOpen,
  onConfirm,
  trigger,
}) => {
  const formMethods = useForm({
    defaultValues: initialValues,
  });

  return (
    <Dialog modal open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent aria-describedby={"Report"}>
        <DialogHeader>
          <DialogTitle>Fale com a gente!</DialogTitle>
          <DialogDescription>
            Diga-nos o que esta acontecendo.
          </DialogDescription>
        </DialogHeader>
        <FormProvider {...formMethods}>
          <Card className="px-6 py-4 bg-slate-50">
            <ReportForm />
          </Card>
        </FormProvider>
        <DialogFooter className="flex flex-row justify-end">
          <CancelButton onClick={() => setIsOpen(false)} />
          <Button
            disabled={false}
            onClick={() => {
              toast({
                description:
                  "Nos recebemos sua mensagem e nosso time entrara em contato em breve.",
                type: "foreground",
              });

              formMethods.clearErrors();
              formMethods.reset();

              onConfirm();
              setIsOpen(false);
            }}
          >
            Enviar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
