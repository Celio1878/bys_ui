import { FC, memo } from "react";
import { signIn } from "next-auth/react";
import { GoogleIcon } from "@/components/icons/google-icon";
import { Button } from "@/components/ui/button";

export const GoogleLoginButton: FC = memo(() => {
  return (
    <Button className="gap-1.5" onClick={() => signIn("google")}>
      <span>Login</span> <GoogleIcon width={20} height={20} />
    </Button>
  );
});

GoogleLoginButton.displayName = "GoogleLoginButton";
