import React from "react";
import { Swiper } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import { useMediaQuery } from "react-responsive";

export default function CommonSwiper2({ children }) {
  const isMedium = useMediaQuery({ minWidth: 481, maxWidth: 740 });
  const isMobile = useMediaQuery({ maxWidth: 480 });

  return (
    <Swiper
      slidesPerView={isMobile ? 2 : isMedium ? 3 : 5}
      spaceBetween={20}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Pagination, Navigation]}
      className="offers_swiper"
      rewind={true}
    >
      {children}
    </Swiper>
  );
}
