/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

import { SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import styled from "./styles.module.scss";
import { featuredBrands } from "@/data/home";
import NextImage from "@/components/NextImage";
import CommonSwiper2 from "./CommonSwiper2";

export default function FeaturedBrands() {
  return (
    <div className={styled.featuredBrands}>
      <div className={styled.featuredBrands__title}>
        <h3>Genuine Brands</h3>
        <img src="/images/official.png" alt="Official" />
      </div>
      <CommonSwiper2>
        {featuredBrands.map((brand, index) => {
          return (
            <SwiperSlide key={index}>
              <div className={styled.featuredBrands__container} href="">
                <Link
                  className={styled.featuredBrands__item}
                  href={`/browse?category=${brand.link}`}
                >
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
      </CommonSwiper2>
    </div>
  );
}
