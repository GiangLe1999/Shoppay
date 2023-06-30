/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useMediaQuery } from "react-responsive";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import styled from "./styles.module.scss";
import { featuredBrands } from "@/data/home";
import NextImage from "@/components/NextImage";

export default function FeaturedBrands() {
  const isMobile = useMediaQuery({ query: "(max-width: 500px)" });

  return (
    <div className={styled.featuredBrands}>
      <div className={styled.featuredBrands__title}>
        <h3>Genuine Brands</h3>
        <img src="/images/official.png" alt="Official" />
      </div>
      <Swiper
        slidesPerView={isMobile ? 2 : 5}
        spaceBetween={20}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="offers_swiper"
        rewind={true}
      >
        {featuredBrands.map((brand, index) => {
          return (
            <SwiperSlide key={index}>
              <div className={styled.featuredBrands__container} href="">
                <Link className={styled.featuredBrands__item} href="">
                  <div style={{ display: "grid", placeItems: "center" }}>
                    <div className={styled.featuredBrands__item_img}>
                      <NextImage
                        src={`/images/featured-brand/${brand.image}.png`}
                        alt=""
                      />
                    </div>
                  </div>
                  <h4>{brand.cateName}</h4>
                </Link>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
