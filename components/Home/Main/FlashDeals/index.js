/* eslint-disable @next/next/no-img-element */
import Countdown from "@/components/Countdown";
import styled from "./styles.module.scss";
import React from "react";
import { SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import FlashCard from "./FlashCard";
import CommonSwiper from "../CommonSwiper";

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
      <CommonSwiper>
        <div className={styled.flashDeals__list}>
          {flashDeals.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <FlashCard product={item} />
              </SwiperSlide>
            );
          })}
        </div>
      </CommonSwiper>
    </div>
  );
};

export default FlashDeals;
