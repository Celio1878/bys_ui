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

export const BannerCarousel: FC = () => {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));
  const { current, count, setApi, api } = useCarouselComponent();

  return (
    <section className="flex flex-col items-center justify-center mt-2 mb-20">
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
            <CarouselItem key={i}>
              <div className="place-self-center">{img}</div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <CarouselDots {...{ api, count, current }} />
    </section>
  );
};
