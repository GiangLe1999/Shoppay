/* eslint-disable @next/next/no-img-element */
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

import "swiper/css";
import "swiper/css/pagination";

import styled from "./styles.module.scss";

const ProductsSwiper = ({ header, products }) => {
  return (
    <div className={styled.wrapper}>
      {header && <div className={styled.header}>{header}</div>}
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation]}
        rewind={true}
        className="products__swiper"
        breakpoints={{
          300: { slidesPerView: 1 },
          360: { slidesPerView: 2 },
          600: { slidesPerView: 3 },
          769: { slidesPerView: 4 },
          1025: { slidesPerView: 5 },
          1200: { slidesPerView: 6 },
        }}
      >
        {products.map((product, index) => (
          <SwiperSlide key={index}>
            <div className={styled.product}>
              <div className={styled.product__img}>
                <img src={product.image} alt={product.name} />
              </div>
              <div className={styled.product__infos}>
                <h3>{product.name}</h3>
                <span>${product.price}</span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductsSwiper;
