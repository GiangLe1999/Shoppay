/* eslint-disable @next/next/no-img-element */
import React, { useRef, useState } from "react";
import Link from "next/link";
import { useMediaQuery } from "react-responsive";
import { MdDiscount } from "react-icons/md";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import styled from "./styles.module.scss";
import { offersArray } from "@/data/home";

export default function Offers() {
  const isMobile = useMediaQuery({ query: "(max-width: 500px)" });

  return (
    <div className={styled.offers}>
      <Swiper
        slidesPerView={isMobile ? 2 : 3}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="offers_swiper"
        rewind={true}
      >
        {offersArray.map((offer, index) => {
          return (
            <SwiperSlide key={index}>
              <Link href="">
                <img src={offer.image} alt="" />
              </Link>
              <span>${offer.price}</span>
              <span>
                <MdDiscount />
                {offer.discount}%
              </span>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
