import { useCallback, useEffect, useMemo, useState } from "react";
import type { CarouselApi } from "@/components/ui/carousel";

interface Props {
  api: CarouselApi;
  setApi: (api: CarouselApi) => void;
  current: number;
  count: number;
  booksBreakpoints: { [key: string]: { slidesToScroll: number } };
}

export function useCarouselComponent(): Props {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const handleSelect = useCallback(() => {
    setCurrent((api?.selectedScrollSnap() as any) + 1);
  }, [api]);

  useEffect(() => {
    if (!api) return;

    const scrollSnapList = api.scrollSnapList();
    const newCount = scrollSnapList.length;
    const newCurrent = api.selectedScrollSnap() + 1;

    if (newCount !== count) {
      setCount(newCount);
    }

    if (newCurrent !== current) {
      setCurrent(newCurrent);
    }

    api.on("select", handleSelect);

    return () => {
      api.off("select", handleSelect);
    };
  }, [api, current, count, handleSelect]);

  const booksBreakpoints = useMemo(
    () => ({
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
    }),
    [],
  );

  return {
    api,
    setApi,
    current,
    count,
    booksBreakpoints,
  };
}
