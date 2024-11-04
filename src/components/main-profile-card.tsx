"use client";

import { FC, useEffect, useRef, useState } from "react";
import { ProfileDto } from "@/app/model/profile-dto";
import Link from "next/link";
import Image from "next/image";

export const ProfileCard: FC<{ profile: ProfileDto }> = ({ profile }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  if (!isVisible) {
    return <div ref={ref} className="w-28 h-28" />;
  }

  return (
    <div
      ref={ref}
      className="w-28 flex justify-center items-center"
      key={profile.id}
    >
      <Link
        className="text-sm hover:underline transition-all duration-150"
        href={`authors/${profile.id}`}
      >
        <div className="flex flex-col justify-center items-center gap-2">
          <Image
            className="rounded-full hover:scale-125 transition-all duration-150"
            src={profile.urlImage}
            alt={profile.name}
            width={70}
            height={70}
            priority={false}
            quality={100}
          />
          <span className="text-xs text-center">{profile.name} </span>
        </div>
      </Link>
    </div>
  );
};
