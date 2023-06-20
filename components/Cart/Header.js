/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import { MdPlayArrow } from "react-icons/md";

import styled from "./styles.module.scss";

const Header = ({ link, text }) => {
  return (
    <div className={styled.header}>
      <div className={styled.header__container}>
        <div className={styled.header__left}>
          <Link href="/">
            <img src="/logo.png" alt="" />
          </Link>
        </div>
        <div className={styled.header__right}>
          <Link href={link}>
            {text}
            <MdPlayArrow />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
