import { FC } from "react";

const BUCKET_URL = process.env.NEXT_PUBLIC_BUCKET_URL;

const PictureSource: FC<{
  sourceDesktopImg: string;
  sourceTabletImg: string;
  sourceMobileImg: string;
  sourceImg: string;
}> = ({ sourceImg, sourceDesktopImg, sourceTabletImg, sourceMobileImg }) => {
  return (
    <picture key={`banner-pic-${3}`}>
      <source media="(max-width: 767px)" srcSet={sourceMobileImg} />
      <source media="(max-width: 1024px)" srcSet={sourceTabletImg} />
      <source media="(max-width: 1280px)" srcSet={sourceDesktopImg} />

      <img
        src={sourceImg}
        className="object-contain md:object-cover rounded-lg"
        alt={"banner"}
      />
    </picture>
  );
};

export const bannerImages = [
  <PictureSource
    key={`banner-pic-${1}`}
    sourceDesktopImg={`${BUCKET_URL}/banners/desktop_img1.jpg`}
    sourceTabletImg={`${BUCKET_URL}/banners/tablet_img1.jpg`}
    sourceMobileImg={`${BUCKET_URL}/banners/mobile_img1.png`}
    sourceImg={`${BUCKET_URL}/banners/desktop_img1.jpg`}
  />,
  <PictureSource
    key={`banner-pic-${2}`}
    sourceDesktopImg={`${BUCKET_URL}/banners/desktop_img2.jpg`}
    sourceTabletImg={`${BUCKET_URL}/banners/tablet_img2.jpg`}
    sourceMobileImg={`${BUCKET_URL}/banners/mobile_img2.png`}
    sourceImg={`${BUCKET_URL}/banners/desktop_img2.png`}
  />,
  <PictureSource
    key={`banner-pic-${3}`}
    sourceDesktopImg={`${BUCKET_URL}/banners/desktop_img3.jpg`}
    sourceTabletImg={`${BUCKET_URL}/banners/tablet_img3.jpg`}
    sourceMobileImg={`${BUCKET_URL}/banners/mobile_img3.png`}
    sourceImg={`${BUCKET_URL}/banners/desktop_img3.png`}
  />,
];
