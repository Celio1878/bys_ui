import { FC } from "react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { GoogleLoginButton } from "@/components/buttons/google-login-button";

export const JoinUsSection: FC = () => {
  const { data: session } = useSession();

  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-500 text-white py-20 text-center rounded-2xl">
      <motion.h2
        className="text-4xl font-bold"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1, type: "spring", stiffness: 80 }}
      >
        Junte-se à Nossa Comunidade
      </motion.h2>
      <motion.p
        className="mt-4 mb-8 text-lg"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        Torne-se parte de uma comunidade em constante crescimento de leitores e
        escritores.
      </motion.p>

      {!session && <GoogleLoginButton />}
    </div>
  );
};
