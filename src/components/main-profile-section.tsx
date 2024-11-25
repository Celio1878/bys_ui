import { FC } from "react";
import { ProfileDto } from "@/app/model/profile-dto";
import { ProfileCard } from "@/components/main-profile-card";
import { motion } from "framer-motion";

export const MainProfilesSection: FC<{ profiles: ProfileDto[] }> = ({
  profiles,
}) => {
  const authors = profiles?.filter((profile) => profile.authorship.length > 0);

  if (authors?.length === 0) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.section
      className="w-full flex flex-col gap-8 justify-center items-center my-28"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h1
        className="font-bold text-3xl underline underline-offset-4"
        variants={itemVariants}
      >
        Principais Autores
      </motion.h1>
      <motion.div
        className="flex flex-wrap gap-4 justify-center items-center"
        variants={containerVariants}
      >
        {authors?.map((author) => (
          <motion.div key={author.id} variants={itemVariants}>
            <ProfileCard profile={author!} />
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};
