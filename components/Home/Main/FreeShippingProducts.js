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

export default function FreeShippingProducts({ freeShippingProducts }) {
  const isMobile = useMediaQuery({ query: "(max-width: 500px)" });

  return (
    <div className={styled.freeShippingProducts}>
      <div className={styled.freeShippingProducts__title}>
        <div className={styled.flex}>
          <h3>Free shipping</h3>
          <img src="/images/free-ship.png" alt="" />
        </div>
        <Link href="/browse?shipping=Free">
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
        {freeShippingProducts.map((product, index) => {
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
