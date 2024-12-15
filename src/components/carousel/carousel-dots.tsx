import { FC } from "react";
import { EmblaCarouselType } from "embla-carousel";

interface CarouselDotsProps {
  current: number;
  count: number;
  api?: EmblaCarouselType;
  banner?: boolean;
}

export const CarouselDots: FC<CarouselDotsProps> = ({
  current,
  count,
  api,
  banner,
}) => {
  return (
    <div className="flex justify-center gap-3">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index}>
          {count > 1 && (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`w-2 h-2 rounded-full ${
                index + 1 === current ? "bg-slate-500" : "bg-slate-300"
              }`}
            >
              <span className="sr-only">go to slide {index + 1}</span>
            </button>
          )}
        </div>
      ))}
    </div>
  );
};
