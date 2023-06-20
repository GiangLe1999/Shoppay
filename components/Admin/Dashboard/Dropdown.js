/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { Button } from "@mui/material";
import Link from "next/link";
import {
  AiOutlineHome,
  AiOutlineUser,
  AiOutlineBell,
  AiOutlineSetting,
} from "react-icons/ai";
import { signOut } from "next-auth/react";
import {
  FcCurrencyExchange,
  FcList,
  FcParallelTasks,
  FcPlus,
  FcPortraitMode,
  FcPuzzle,
  FcSalesPerformance,
  FcShop,
  FcSms,
  FcTimeline,
} from "react-icons/fc";
import { FaSignOutAlt } from "react-icons/fa";

import styled from "./styles.module.scss";

export default function Dropdown({ userImage }) {
  const [show, setShow] = useState(false);

  return (
    <div
      className={styled.dropdown}
      onMouseOver={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <div className={styled.dropdown__toggle}>
        <img src={userImage} alt="" />
      </div>

      <div
        className={`${styled.dropdown__content} ${show ? styled.active : ""}`}
      >
        <div className={styled.dropdown__content_icons}>
          <div className={styled.dropdown__content_icons_icon}>
            <Link href="/admin/dashboard">
              <FcList />
            </Link>
          </div>
          <div className={styled.dropdown__content_icons_icon}>
            <Link href="/admin/dashboard/sales">
              <FcSalesPerformance />
            </Link>
          </div>
          <div className={styled.dropdown__content_icons_icon}>
            <Link href="/admin/dashboard/orders">
              <FcCurrencyExchange />
            </Link>
          </div>
          <div className={styled.dropdown__content_icons_icon}>
            <Link href="/admin/dashboard/users">
              <FcPortraitMode />
            </Link>
          </div>
          <div className={styled.dropdown__content_icons_icon}>
            <Link href="/admin/dashboard/messages">
              <FcSms />
            </Link>
          </div>
          <div className={styled.dropdown__content_icons_icon}>
            <Link href="/admin/dashboard/product/all">
              <FcShop />
            </Link>
          </div>
          <div className={styled.dropdown__content_icons_icon}>
            <Link href="/admin/dashboard/product/create">
              <FcPlus />
            </Link>
          </div>
          <div className={styled.dropdown__content_icons_icon}>
            <Link href="/admin/dashboard/categories">
              <FcParallelTasks />
            </Link>
          </div>
          <div className={styled.dropdown__content_icons_icon}>
            <Link href="/admin/dashboard/subcategories">
              <FcTimeline />
            </Link>
          </div>
          <div className={styled.dropdown__content_icons_icon}>
            <Link href="/admin/dashboard/coupons">
              <FcPuzzle />
            </Link>
          </div>
        </div>

        <div className={styled.dropdown__content_items}>
          <div className={styled.dropdown__content_items_item}>
            <Link href="/">
              <AiOutlineHome />
            </Link>
          </div>
          <div className={styled.dropdown__content_items_item}>
            <Link href="/">
              <AiOutlineUser />
            </Link>
          </div>
          <div className={styled.dropdown__content_items_item}>
            <Link href="/">
              <AiOutlineBell />
            </Link>
          </div>

          <div className={styled.dropdown__content_items_item}>
            <Link href="/">
              <AiOutlineSetting />
            </Link>
          </div>
        </div>

        <div className={`${styled.btn} ${styled.dropdown__logout}`}>
          <Button
            endIcon={<FaSignOutAlt />}
            variant="contained"
            onClick={() => signOut()}
          >
            Log out
          </Button>
        </div>
      </div>
    </div>
  );
}
