"use client";

import { BannerCarousel } from "@/components/carousel/banner-carousel";
import { FC, Suspense } from "react";
import { Loading } from "@/components/loading";
import useSWR from "swr";
import { fetcher } from "@/hooks/fetcher";
import GlobalError from "@/app/global-error";
import { BookDto } from "@/app/model/book-dto";
import { ProfileDto } from "@/app/model/profile-dto";
import { MainProfilesSection } from "@/components/main-profile-section";
import { BooksCarouselSection } from "@/components/books-carousel-section";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { GoogleLoginButton } from "@/components/buttons/google-login-button";
import { useSession } from "next-auth/react";

const BOOKS_SERVICE_URL = process.env.NEXT_PUBLIC_BOOKS_API_URL!;
const PROFILES_SERVICE_URL = process.env.NEXT_PUBLIC_PROFILES_API_URL!;

export default function Home() {
  const {
    data: books,
    error: booksErr,
    mutate: getBooks,
  } = useSWR(BOOKS_SERVICE_URL, fetcher<BookDto[]>({}).get);
  const {
    data: profiles,
    error: profilesErr,
    mutate: getProfiles,
  } = useSWR(PROFILES_SERVICE_URL, fetcher<ProfileDto[]>({}).get);

  if (booksErr) return <GlobalError error={booksErr} reset={getBooks} />;
  if (profilesErr)
    return <GlobalError error={profilesErr} reset={getProfiles} />;

  return (
    <Suspense fallback={<Loading />}>
      <HeroSection />
      <FeaturesSection />
      <SecuritySection />
      <BannerCarousel />
      <BooksCarouselSection books={books!} />
      <MainProfilesSection profiles={profiles!} />
      <JoinUsSection />
    </Suspense>
  );
}

const HeroSection: FC = () => {
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
        Bem-vindo ao <span className="text-violet-400">Be Your Stories</span>
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

const FeaturesSection: FC = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      ref={ref}
      className="py-16 px-8 grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 border-t border-t-gray-300 border-b border-b-gray-300"
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {[
        { title: "Descubra Grandes Leituras", icon: "📚" },
        { title: "Escreva Suas Histórias", icon: "✍️" },
        { title: "Faça Parte da Comunidade", icon: "🤝" },
      ].map((feature, index) => (
        <motion.div
          key={index}
          className="flex flex-col items-center text-center"
          variants={childVariants}
        >
          <div className="text-6xl hover:scale-125 transition-transform">
            {feature.icon}
          </div>
          <h3 className="text-2xl font-bold mt-4">{feature.title}</h3>
          <p className="mt-2 text-gray-600">
            Conecte-se com pessoas de ideias semelhantes e explore novos
            horizontes.
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
};

const SecuritySection: FC = () => {
  return (
    <section className="py-16 px-8">
      <motion.div
        className="max-w-4xl mx-auto text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          Segurança e Propriedade de Dados Garantidas
        </h2>
        <p className="mt-4 text-gray-600 text-lg">
          Acreditamos que a sua privacidade é essencial. Por isso, implementamos
          as mais avançadas tecnologias para proteger suas informações e
          garantir que você seja o único proprietário de seus dados.
        </p>
      </motion.div>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {[
          {
            icon: "🔒",
            title: "Segurança Avançada",
            description:
              "Seus dados são protegidos com criptografia de ponta a ponta e armazenados em servidores seguros.",
          },
          {
            icon: "🔑",
            title: "Controle Total",
            description:
              "Você tem controle total sobre seus dados e pode gerenciar suas informações como preferir.",
          },
          {
            icon: "🌐",
            title: "Conformidade Global",
            description:
              "Estamos em conformidade com as principais regulamentações, incluindo LGPD e GDPR.",
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <div className="text-5xl mb-4">{item.icon}</div>
            <h3 className="text-xl font-bold text-gray-800">{item.title}</h3>
            <p className="mt-2 text-gray-600">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const JoinUsSection: FC = () => {
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
