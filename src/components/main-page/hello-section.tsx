import { FC } from "react";
import { useInView } from "react-intersection-observer";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { GoogleLoginButton } from "@/components/buttons/google-login-button";

export const HelloSection: FC = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { data: session } = useSession();

  return (
    <motion.div
      ref={ref}
      className="h-96 bg-gradient-to-b from-blue-600 to-purple-800 text-white flex flex-col justify-center items-center text-center rounded-2xl"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 1 }}
    >
      <motion.h1
        className="text-5xl md:text-7xl font-bold"
        initial={{ y: 30, opacity: 0 }}
        animate={inView ? { y: 0, opacity: 1 } : {}}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <span className="text-violet-400">Be Your Stories</span>
      </motion.h1>
      <motion.p
        className="mt-4 mb-8 text-xl md:text-2xl"
        initial={{ y: 30, opacity: 0 }}
        animate={inView ? { y: 0, opacity: 1 } : {}}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        Descubra, Escreva e Compartilhe Histórias.
      </motion.p>

      {!session && <GoogleLoginButton />}
    </motion.div>
  );
};
