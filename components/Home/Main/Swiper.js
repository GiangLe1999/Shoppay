import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper";

import styled from "./styles.module.scss";
import NextImage from "@/components/NextImage";

export default function App() {
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation, Autoplay]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        className="mainSwiper"
      >
        {[...Array(4).keys()].map((i) => (
          <SwiperSlide key={i}>
            <div className={styled.mainSwiper__wrapper}>
              <NextImage
                src={`/images/swiper/${i + 1}.jpg`}
                alt={`Home Banner ${i + 1}`}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
