import styled from "./styles.module.scss";
import React from "react";
import MainSwiper from "./Swiper";
import FeaturedBrands from "./FeaturedBrands";
import Menu from "./Menu";

import { BsListUl } from "react-icons/bs";
import GoodPrice from "./GoodPrice";
import FeaturedCategories from "./FeaturedCategories";
import FlashDeals from "./FlashDeals";
import FeaturedProducts from "./FeaturedProducts";
import FreeShippingProducts from "./FreeShippingProducts";

const Main = ({ flashDeals, featuredProducts, freeShippingProducts }) => {
  return (
    <>
      <div className={styled.main}>
        <div className={styled.main__left}>
          <Menu />
        </div>
        <div className={styled.main__right}>
          <MainSwiper />
          <FeaturedBrands />
          <FeaturedCategories />
          <GoodPrice />
          <FlashDeals flashDeals={flashDeals} />
          <FeaturedProducts featuredProducts={featuredProducts} />
          <FreeShippingProducts freeShippingProducts={freeShippingProducts} />
        </div>
      </div>
    </>
  );
};

export default Main;
