import styled from "./styles.module.scss";
import React, { useState } from "react";
import MainSwiper from "./Swiper";
import FeaturedBrands from "./FeaturedBrands";
import Menu from "./Menu";

import GoodPrice from "./GoodPrice";
import FeaturedCategories from "./FeaturedCategories";
import FlashDeals from "./FlashDeals";
import FeaturedProducts from "./FeaturedProducts";
import FreeShippingProducts from "./FreeShippingProducts";
import AnimateWrapper from "@/components/AnimateWrapper";
import { useMediaQuery } from "react-responsive";
import { useDispatch, useSelector } from "react-redux";
import { toggleMobileCate } from "@/store/mobileCateSlice";

const Main = ({ flashDeals, featuredProducts, freeShippingProducts }) => {
  const isSmallScreen = useMediaQuery({ query: "(max-width: 950px)" });
  const { showMobileCate } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  return (
    <>
      <div className={styled.main}>
        <div
          className={`${styled.main__backdrop} ${
            showMobileCate.showMobileCate && styled.activeBackdrop
          }`}
          onClick={() => dispatch(toggleMobileCate())}
        ></div>
        <div
          className={`${styled.main__cateMobile} ${
            showMobileCate.showMobileCate && styled.active
          }`}
        >
          {isSmallScreen && <Menu />}
        </div>
        <AnimateWrapper origin="left">
          <div className={styled.main__left}>
            <Menu />
          </div>
        </AnimateWrapper>
        <div className={styled.main__right}>
          <AnimateWrapper>
            <MainSwiper />
          </AnimateWrapper>

          <AnimateWrapper origin="right">
            <FeaturedBrands />
          </AnimateWrapper>

          <AnimateWrapper origin="right">
            <FeaturedCategories />
          </AnimateWrapper>

          <AnimateWrapper origin="right">
            <GoodPrice />
          </AnimateWrapper>

          <AnimateWrapper origin="right">
            <FlashDeals flashDeals={flashDeals} />
          </AnimateWrapper>

          <AnimateWrapper origin="right">
            <FeaturedProducts featuredProducts={featuredProducts} />
          </AnimateWrapper>

          <AnimateWrapper origin="right">
            <FreeShippingProducts freeShippingProducts={freeShippingProducts} />
          </AnimateWrapper>
        </div>
      </div>
    </>
  );
};

export default Main;
