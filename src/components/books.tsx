import { FC, useState } from "react";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

export const Books: FC = () => {
  const [api, setApi] = useState<CarouselApi>();

  api?.on("pointerDown", (pointer) => {
    console.log(pointer, "POINTER");
  });

  return (
    <Carousel
      setApi={setApi}
      opts={{
        align: "center",
        breakpoints: {
          "(max-width: 640px)": {
            slidesToScroll: 2,
          },
          "(min-width: 768px)": {
            slidesToScroll: 4,
          },
          "(min-width: 1024px)": {
            slidesToScroll: 5,
          },
          "(min-width: 1280px)": {
            slidesToScroll: 6,
          },
        },
      }}
      className="max-w-xs sm:max-w-screen-sm md:max-w-lg lg:max-w-screen-md xl:max-w-screen-lg"
    >
      <CarouselContent>
        {Array.from({ length: 20 }).map((_, i) => (
          <CarouselItem
            key={i}
            className="basis-1/2 md:basis-1/4 lg:basis-1/5 xl:basis-1/6"
          >
            <Image src={"/cover.jpg"} alt={"cover"} width={140} height={160} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};
