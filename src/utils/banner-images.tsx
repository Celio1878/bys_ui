const BUCKET_URL = process.env.NEXT_PUBLIC_BUCKET_URL;

export const bannerImages = [
  <picture key={`banner-pic-${1}`}>
    <source
      media="(max-width: 767px)"
      srcSet={`${BUCKET_URL}/banners/desktop_img1.png`}
    />
    <source
      media="(max-width: 1024px)"
      srcSet={`${BUCKET_URL}/banners/tablet_img1.jpg`}
    />
    <source
      media="(max-width: 1280px)"
      srcSet={`${BUCKET_URL}/banners/desktop_img1.png`}
    />

    <img
      src={`${BUCKET_URL}/banners/desktop_img1.png`}
      className="w-[40rem] object-contain md:object-cover rounded-lg"
      alt={"banner"}
    />
  </picture>,
  <picture key={`banner-pic-${2}`}>
    <source
      media="(max-width: 767px)"
      srcSet={`${BUCKET_URL}/banners/desktop_img2.png`}
    />
    <source
      media="(max-width: 1024px)"
      srcSet={`${BUCKET_URL}/banners/tablet_img2.jpg`}
    />
    <source
      media="(max-width: 1280px)"
      srcSet={`${BUCKET_URL}/banners/desktop_img2.png`}
    />

    <img
      src={`${BUCKET_URL}/banners/desktop_img2.png`}
      className="w-[40rem] object-contain md:object-cover rounded-lg"
      alt={"banner"}
    />
  </picture>,
  <picture key={`banner-pic-${3}`}>
    <source
      media="(max-width: 767px)"
      srcSet={`${BUCKET_URL}/banners/desktop_img3.png`}
    />
    <source
      media="(max-width: 1024px)"
      srcSet={`${BUCKET_URL}/banners/tablet_img3.jpg`}
    />
    <source
      media="(max-width: 1280px)"
      srcSet={`${BUCKET_URL}/banners/desktop_img3.png`}
    />

    <img
      src={`${BUCKET_URL}/banners/desktop_img3.png`}
      className="w-[40rem] object-contain md:object-cover rounded-lg"
      alt={"banner"}
    />
  </picture>,
];
