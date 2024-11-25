import { FC, useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { bannerImages } from "@/utils/banner-images";
import { CarouselDots } from "@/components/carousel/carousel-dots";
import { useCarouselComponent } from "@/lib/use-carousel-component";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

export const BannerCarousel: FC = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: false }));
  const { current, count, setApi, api } = useCarouselComponent();

  return (
    <motion.section
      ref={ref}
      className="flex flex-col items-center justify-center mt-2 mb-20"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
    >
      <Carousel
        setApi={setApi}
        opts={{ loop: true }}
        plugins={[plugin.current]}
        className="w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {bannerImages.map((img, i) => (
            <CarouselItem key={`carousel-item-${i}`}>
              <div className="place-self-center">{img}</div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <CarouselDots {...{ api, count, current, banner: true }} />
    </motion.section>
  );
};
