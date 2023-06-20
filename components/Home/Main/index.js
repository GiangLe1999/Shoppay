import styled from "./styles.module.scss";
import React from "react";
import MainSwiper from "./Swiper";
import Offers from "./Offers";
import Menu from "./Menu";
import User from "./User";
import Header from "./Header";

import { BsListUl } from "react-icons/bs";

const Main = () => {
  return (
    <>
      <a href="" className={styled.category__header}>
        <BsListUl />
        <b>CATEGORIES</b>
      </a>
      <div className={styled.main}>
        <Header />
        <Menu />
        <MainSwiper />
        <Offers />
        <User />
      </div>
    </>
  );
};

export default Main;
