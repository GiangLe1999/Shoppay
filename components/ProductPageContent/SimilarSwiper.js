/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { simillar_products } from "../../data/products";

import styles from "./styles.module.scss";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Navigation } from "swiper";

export default function SimilarSwiper() {
  return (
    <Swiper
      slidesPerView={4}
      spaceBetween={1}
      slidesPerGroup={3}
      navigation={true}
      modules={[Navigation]}
      className="similar_swiper products__swiper"
      rewind={true}
      breakpoints={{
        640: {
          width: 640,
          slidesPerView: 4,
        },
      }}
    >
      {simillar_products.map((p, index) => (
        <SwiperSlide key={index}>
          <Link href="">
            <img src={p} alt="" />
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
