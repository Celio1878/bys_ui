import { ProfileDto } from "@/app/model/profile-dto";
import { FC, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { fetcher } from "@/hooks/fetcher";
import { toast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { UserRoundPen } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { InputFormField } from "@/components/form/fields/input-form-field";
import { TextAreaFormField } from "@/components/form/fields/text-area-form-field";

const PROFILE_SERVICE_URL = String(process.env.NEXT_PUBLIC_PROFILES_API_URL);

interface EditProfileProps {
  profile: ProfileDto;
  token: string;
  onSuccess: VoidFunction;
}

export const UpdateProfileDrawer: FC<EditProfileProps> = ({
  profile,
  token,
  onSuccess,
}) => {
  const form = useForm();
  const [openForm, setOpenForm] = useState(false);
  const [imageVersion, setImageVersion] = useState(0);

  async function onSave() {
    const data = form.getValues();

    const dto: ProfileDto = {
      ...profile,
      username: data.username,
      bio: data.bio,
      urlImage: data.urlImage,
    };

    await fetcher<ProfileDto>({ token, body: dto })
      .put(`${PROFILE_SERVICE_URL}/${profile.id}`)
      .then(() => {
        toast({
          title: "Perfil atualizado!",
          type: "foreground",
          role: "status",
        });
        setOpenForm(false);
        form.reset();
      })
      .catch((err) =>
        toast({
          title: "Erro ao atualizar perfil!",
          description: err.message,
          type: "foreground",
          role: "status",
          variant: "destructive",
        }),
      )
      .finally(onSuccess);
  }

  const handleUploadImage = useCallback(
    async (file: File) => {
      try {
        const isValid = await new Promise<boolean>((resolve) => {
          const img = new Image();
          img.onload = () => resolve(true);
          img.src = URL.createObjectURL(file);
        });

        if (!isValid) return;

        const s3Url = await fetcher<string>({ token })
          .get(`${PROFILE_SERVICE_URL}/${profile.id}/image?type=${file.type}`)
          .catch((err) => {
            console.error(err);
            throw new Error("Failed to get S3 URL");
          });

        const res = await fetch(s3Url, {
          body: file,
          method: "PUT",
          headers: { "Content-Type": file.type },
        });

        if (!res.ok) throw new Error(res.statusText);

        const urlImage = s3Url.split("?")[0];
        form.setValue("urlImage", urlImage);
        setImageVersion(imageVersion + 1);
      } catch (error) {
        console.error("Upload failed:", error);
        form.setError("cover", { message: "Upload failed" });
        toast({
          title: "Erro ao inserir imagem.",
          variant: "destructive",
          type: "foreground",
        });
      }
    },
    [form, imageVersion, profile.id, token],
  );

  useEffect(() => {
    form.setValue("username", profile.username || profile.name);
    form.setValue("bio", profile.bio);
    form.setValue("urlImage", profile.urlImage);
  }, [form, profile, handleUploadImage]);

  return (
    <Dialog
      key={"update-profile-data-modal"}
      modal
      open={openForm}
      onOpenChange={setOpenForm}
    >
      <DialogTrigger asChild>
        <Button
          size="sm"
          title="Atualizar Perfil"
          id="update-profile-button"
          variant="secondary"
        >
          <UserRoundPen size="20" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[30rem]">
        <DialogHeader>
          <DialogTitle>Editar Perfil</DialogTitle>
          <DialogDescription>
            Voce pode alterar a imagem, nome e descricao do seu perfil.
          </DialogDescription>
        </DialogHeader>
        <Card
          className="flex flex-col max-h-[25rem] px-8 py-4 items-center bg-slate-50 overflow-y-auto"
          key={imageVersion}
        >
          <Form {...form}>
            <img
              className="rounded-full w-20 h-20 mb-2 object-cover"
              src={profile?.urlImage}
              key={imageVersion + 1}
              alt={profile.username}
              width={150}
              height={150}
            />
            <form className="flex flex-col w-full gap-y-4">
              <Input
                className="w-full cursor-pointer bg-indigo-300 hover:bg-indigo-400 dark:bg-indigo-300 dark:hover:bg-indigo-400 text-white transition-all duration-300"
                type="file"
                accept={"image/*"}
                id="picture"
                name="picture"
                title="Selecione uma imagem"
                onChange={(e) =>
                  e.target.files?.[0] && handleUploadImage(e.target.files[0])
                }
                disabled={form.formState.disabled}
                placeholder="Selecione uma imagem"
              />
              <InputFormField name="username" label="Nome" form={form} />
              <TextAreaFormField name="bio" label="Descricao" form={form} />
            </form>
          </Form>
        </Card>
        <DialogFooter>
          <Button onClick={onSave}>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
