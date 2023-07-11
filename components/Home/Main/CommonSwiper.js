import React from "react";
import { Swiper } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import { useMediaQuery } from "react-responsive";

export default function CommonSwiper({ children }) {
  const isLarge = useMediaQuery({ minWidth: 951, maxWidth: 1033 });
  const isPrettyLarge = useMediaQuery({ minWidth: 857, maxWidth: 950 });
  const isMedium = useMediaQuery({ minWidth: 639, maxWidth: 856 });
  const isSmall = useMediaQuery({ maxWidth: 638 });

  return (
    <Swiper
      slidesPerView={
        isSmall ? 1 : isMedium ? 2 : isPrettyLarge ? 3 : isLarge ? 2 : 3
      }
      spaceBetween={20}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Pagination, Navigation]}
      className="products_swiper"
      rewind={true}
    >
      {children}
    </Swiper>
  );
}
