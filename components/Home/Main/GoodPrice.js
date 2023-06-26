/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useMediaQuery } from "react-responsive";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import styled from "./styles.module.scss";
import { goodPrices } from "@/data/home";

export default function GoodPrice() {
  const isMobile = useMediaQuery({ query: "(max-width: 500px)" });

  return (
    <div className={styled.goodPrice}>
      <div className={styled.goodPrice__title}>
        <h3>Good Price</h3>
        <img src="/images/good-price.png" alt="Official" />
      </div>
      <Swiper
        slidesPerView={isMobile ? 2 : 3}
        spaceBetween={20}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="offers_swiper"
        rewind={true}
      >
        {goodPrices.map((item, index) => {
          return (
            <SwiperSlide key={index}>
              <div className={styled.goodPrice__item} href="">
                <Link href="" className={styled.goodPrice__item_left}>
                  <img src={`/images/good-price/${item.image1}.png`} alt="" />
                </Link>
                <div className={styled.goodPrice__item_right}>
                  <Link href="">
                    <img src={`/images/good-price/${item.image2}.png`} alt="" />
                  </Link>
                  <Link href="">
                    <img src={`/images/good-price/${item.image3}.png`} alt="" />
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
