/* eslint-disable @next/next/no-img-element */
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import Link from "next/link";

import { SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import styled from "./styles.module.scss";
import ProductCard from "@/components/ProductCard";
import CommonSwiper from "./CommonSwiper";

export default function FeaturedProducts({ featuredProducts }) {
  return (
    <div className={styled.featuredProducts}>
      <div className={styled.featuredProducts__title}>
        <div className={styled.flex}>
          <h3>Featured Products</h3>
          <img src="/images/featured-products.png" alt="" />
        </div>
        <Link href="/browse?sort=popular">
          See more
          <MdOutlineKeyboardDoubleArrowRight />
        </Link>
      </div>
      <CommonSwiper>
        {featuredProducts.map((product, index) => {
          return (
            <SwiperSlide key={index}>
              <ProductCard product={product} />
            </SwiperSlide>
          );
        })}
      </CommonSwiper>
    </div>
  );
}
