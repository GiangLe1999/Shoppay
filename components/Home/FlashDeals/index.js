import Countdown from "@/components/Countdown";
import { MdFlashOn } from "react-icons/md";
import styled from "./styles.module.scss";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { Navigation } from "swiper";
import { flashDealsArray } from "@/data/home";
import FlashCard from "./FlashCard";

const FlashDeals = () => {
  return (
    <div className={styled.flashDeals}>
      <div className={styled.flashDeals__header}>
        <h2>
          FLASH SALE <MdFlashOn />
        </h2>
        <Countdown date={new Date(2023, 7, 25)} />
      </div>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation]}
        className="flashDeals_Swiper"
        rewind={true}
        breakpoints={{
          300: { slidesPerView: 1 },
          500: { slidesPerView: 2 },
          769: { slidesPerView: 3 },
          1025: { slidesPerView: 4 },
          1200: { slidesPerView: 5 },
        }}
      >
        <div className={styled.flashDeals__list}>
          {flashDealsArray.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <FlashCard product={item} />
              </SwiperSlide>
            );
          })}
        </div>
      </Swiper>
    </div>
  );
};

export default FlashDeals;
