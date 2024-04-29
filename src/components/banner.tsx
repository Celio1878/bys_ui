import * as React from "react";
import { FC } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { banner_images } from "@/utils/banner_images";

export const Banner: FC = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true }),
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {banner_images.map((img, i) => (
          <CarouselItem key={i}>
            <div className="px-1.5">{img}</div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};
