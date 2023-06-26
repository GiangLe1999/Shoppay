/* eslint-disable @next/next/no-img-element */
import styles from "./styles.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import Link from "next/link";
import { TbEdit } from "react-icons/tb";
import { AiOutlineEye } from "react-icons/ai";
import { RiDeleteBin2Line } from "react-icons/ri";

import "swiper/css";
import "swiper/css/pagination";

import styled from "./styles.module.scss";
import { format } from "date-fns";

export default function ProductCard({ product }) {
  return (
    <div className={styled.product}>
      <h3 className={styled.product__name}>{product.name}</h3>

      <div className={styled.product__subTitle}>
        <h4 className={styled.product__subTitle_category}>
          <span>Category : </span>
          <span>{product.category.name}</span>
        </h4>
        &nbsp;|
        <h4 className={styled.product__subTitle_updated}>
          <span>Last update : </span>
          <span>{format(new Date(product.updatedAt), "MM/dd/yyyy")}</span>
        </h4>
      </div>

      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation]}
        className={`products_swiper ${styled.admin_swiper}`}
        style={{ padding: "5px 0 5px 5px" }}
        breakpoints={{
          450: {
            slidesPerView: 2,
          },
          630: {
            slidesPerView: 3,
          },
          920: {
            slidesPerView: 4,
          },
          1232: {
            slidesPerView: 5,
          },
          1520: {
            slidesPerView: 6,
          },
        }}
      >
        {product.subProducts.map((p, i) => (
          <SwiperSlide key={i}>
            <div className={styled.product__item}>
              <div className={styled.product__item_img}>
                <img src={p.images[0].url} alt="" />
              </div>
              <div className={styled.product__actions}>
                <Link href={`/admin/dashboard/product/${product._id}`}>
                  <TbEdit />
                </Link>
                <Link href={`/product/${product.slug}?style=${i}`}>
                  <AiOutlineEye />
                </Link>
                <Link href="">
                  <RiDeleteBin2Line />
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
