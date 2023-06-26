/* eslint-disable @next/next/no-img-element */
import { useMediaQuery } from "react-responsive";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import styled from "./styles.module.scss";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

export default function FeaturedProducts({ featuredProducts }) {
  const isMobile = useMediaQuery({ query: "(max-width: 500px)" });

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
      <Swiper
        slidesPerView={isMobile ? 2 : 3}
        spaceBetween={20}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="products_swiper"
        rewind={true}
      >
        {featuredProducts.map((product, index) => {
          return (
            <SwiperSlide key={index}>
              <ProductCard product={product} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
