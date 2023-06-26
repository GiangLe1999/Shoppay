/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useMediaQuery } from "react-responsive";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import styled from "./styles.module.scss";
import { menuArray } from "@/data/home";

export default function FeaturedCategories() {
  const isMobile = useMediaQuery({ query: "(max-width: 500px)" });

  return (
    <div className={styled.featuredCategories}>
      <div className={styled.featuredCategories__title}>
        <h3>Featured categories</h3>
        <img src="/images/top-categories.png" alt="Official" />
      </div>
      <Swiper
        slidesPerView={isMobile ? 2 : 5}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="offers_swiper"
        rewind={true}
      >
        {menuArray
          .filter((c) => c.featured)
          .map((category, index) => {
            return (
              <SwiperSlide key={index}>
                <Link className={styled.featuredCategories__item} href="">
                  <img
                    src={`/images/featured-category/${category.featuredImg}`}
                    alt=""
                  />
                  <h4>{category.name}</h4>
                </Link>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </div>
  );
}
