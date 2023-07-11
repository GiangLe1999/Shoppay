/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useMediaQuery } from "react-responsive";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import styled from "./styles.module.scss";
import { goodPrices } from "@/data/home";
import NextImage from "@/components/NextImage";

export default function GoodPrice() {
  const isMedium = useMediaQuery({ minWidth: 481, maxWidth: 740 });
  const isSmall = useMediaQuery({ maxWidth: 480 });

  return (
    <div className={styled.goodPrice}>
      <div className={styled.goodPrice__title}>
        <h3>Good Price</h3>
        <img src="/images/good-price.png" alt="Official" />
      </div>
      <Swiper
        slidesPerView={isSmall ? 1 : isMedium ? 2 : 3}
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
                  <NextImage
                    src={`/images/good-price/${item.image1}.png`}
                    alt=""
                  />
                </Link>
                <div className={styled.goodPrice__item_right}>
                  <Link href="">
                    <NextImage
                      src={`/images/good-price/${item.image2}.png`}
                      alt=""
                    />
                  </Link>
                  <Link href="">
                    <NextImage
                      src={`/images/good-price/${item.image3}.png`}
                      alt=""
                    />
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
