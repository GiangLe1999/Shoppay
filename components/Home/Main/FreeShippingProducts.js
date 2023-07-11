/* eslint-disable @next/next/no-img-element */
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import Link from "next/link";

import { SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import styled from "./styles.module.scss";
import ProductCard from "@/components/ProductCard";
import CommonSwiper from "./CommonSwiper";

export default function FreeShippingProducts({ freeShippingProducts }) {
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
      <CommonSwiper>
        {freeShippingProducts.map((product, index) => {
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
