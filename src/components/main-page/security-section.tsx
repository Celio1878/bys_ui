import { FC } from "react";
import { motion } from "framer-motion";

export const SecuritySection: FC = () => {
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
