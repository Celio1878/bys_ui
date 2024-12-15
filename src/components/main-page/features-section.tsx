import { FC } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

export const FeaturesSection: FC = () => {
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
