import { FC, useEffect, useState } from "react";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

interface BookCarouselProps {
  title: string;
}

export const Books: FC<BookCarouselProps> = ({ title }) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-semibold underline ml-2">{title}</h1>
      <Carousel
        setApi={setApi}
        opts={{
          loop: true,
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
        <CarouselContent className="ml-0.5 sm:ml-0">
          {Array.from({ length: 20 }).map((_, i) => (
            <CarouselItem
              key={i}
              className="basis-1/2 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 p-2"
            >
              <Image
                className={
                  "cursor-pointer hover:scale-105 transition duration-500"
                }
                src={"/cover.jpg"}
                alt={"cover"}
                width={140}
                height={160}
                priority={false}
              />
              <h3 className="hover:font-semibold hover:cursor-pointer hover:underline transition-all duration-150 mt-2">
                Titulo
              </h3>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="flex justify-center gap-3 mt-4 mr-0 lg:mr-3">
        {Array.from({ length: count }).map((_, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={`w-2 h-2 rounded-full ${
              index + 1 === current ? "bg-slate-500" : "bg-slate-300"
            }`}
          >
            <span className="sr-only">go to slide {index + 1}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
