import { FC, memo } from "react";
import { signIn } from "next-auth/react";
import { GoogleIcon } from "@/components/icons/google-icon";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export const GoogleLoginButton: FC = memo(() => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ y: 0, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : {}}
      transition={{ delay: 0.9, duration: 0.8 }}
    >
      <Button
        className="gap-1.5 hover:opacity-75 transition-all duration-300"
        onClick={() => signIn("google")}
        title={"Login com Google"}
      >
        <span>Login</span> <GoogleIcon width={20} height={20} />
      </Button>
    </motion.div>
  );
});

GoogleLoginButton.displayName = "GoogleLoginButton";
