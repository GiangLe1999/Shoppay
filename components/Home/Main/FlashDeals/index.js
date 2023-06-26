/* eslint-disable @next/next/no-img-element */
import Countdown from "@/components/Countdown";
import { MdFlashOn } from "react-icons/md";
import styled from "./styles.module.scss";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { Navigation } from "swiper";
import FlashCard from "./FlashCard";

const FlashDeals = ({ flashDeals }) => {
  return (
    <div className={styled.flashDeals}>
      <div className={styled.flashDeals__title}>
        <Countdown date={new Date(2023, 7, 25)} />
        <h3>
          <span>FLASH SALE</span>
          <img src="/images/limited.png" alt="" />
        </h3>
      </div>
      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        navigation={true}
        modules={[Navigation]}
        className="flashDeals_Swiper"
        rewind={true}
        breakpoints={{
          300: { slidesPerView: 1 },
          500: { slidesPerView: 2 },
          769: { slidesPerView: 3 },
          1025: { slidesPerView: 3 },
          1200: { slidesPerView: 3 },
        }}
      >
        <div className={styled.flashDeals__list}>
          {flashDeals.map((item, index) => {
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
