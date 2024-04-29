export const banner_images = [
  <picture key={`banner-pic-${1}`}>
    <source media="(max-width: 767px)" srcSet={`/reader.png`} />
    <source media="(max-width: 1024px)" srcSet={`/reader1.png`} />
    <source media="(max-width: 1280px)" srcSet={`/reader2.png`} />

    <img
      src={`/reader1.png`}
      className="w-full object-contain md:object-cover rounded-lg"
      alt={"banner"}
    />
  </picture>,
  <picture key={`banner-pic-${2}`}>
    <source media="(max-width: 767px)" srcSet={`/reader2.png`} />
    <source media="(max-width: 1024px)" srcSet={`/reader.png`} />
    <source media="(max-width: 1280px)" srcSet={`/reader1.png`} />

    <img
      src={`/reader2.png`}
      className="w-full object-contain md:object-cover rounded-lg"
      alt={"banner"}
    />
  </picture>,
  <picture key={`banner-pic-${3}`}>
    <source media="(max-width: 767px)" srcSet={`/reader1.png`} />
    <source media="(max-width: 1024px)" srcSet={`/reader2.png`} />
    <source media="(max-width: 1280px)" srcSet={`/reader.png`} />

    <img
      src={`/reader.png`}
      className="w-full object-contain md:object-cover rounded-lg"
      alt={"banner"}
    />
  </picture>,
];
