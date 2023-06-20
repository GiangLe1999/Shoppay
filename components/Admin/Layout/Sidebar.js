/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaAngleDoubleRight } from "react-icons/fa";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

import {
  FcCurrencyExchange,
  FcPortraitMode,
  FcSms,
  FcShop,
  FcPlus,
  FcList,
  FcParallelTasks,
  FcTimeline,
  FcPuzzle,
  FcSalesPerformance,
  FcSettings,
  FcCustomerSupport,
  FcAdvertising,
  FcSynchronize,
} from "react-icons/fc";

import styled from "./styles.module.scss";
import { toggleSidebar } from "@/store/expandSlice";

const Sidebar = () => {
  const { expandSidebar } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const Router = useRouter();

  const route = Router.pathname;

  const expand = expandSidebar.expandSidebar;

  const expandHandler = () => {
    dispatch(toggleSidebar());
  };

  return (
    <div className={`${styled.sidebar} ${expand ? styled.opened : ""}`}>
      {/* Toggle button */}
      <div className={styled.sidebar__toggle} onClick={expandHandler}>
        <div
          className={styled.sidebar__toggle_wrap}
          style={{
            transform: expand ? "rotate(180deg)" : "",
            transition: "all 0.2s",
          }}
        >
          <FaAngleDoubleRight />
        </div>
      </div>

      <div className={styled.sidebar__container}>
        <div className={styled.sidebar__header}>
          <img src="/logo.png" alt="Shoppay" />
          <span>Admin</span>
        </div>

        {/* <div
          className={styled.sidebar__user}
          style={{ width: expand ? "250px" : "" }}
        >
          <img src={session?.user?.image} alt="" />
          <div className={styled.show}>
            <span>Welcome back 👋</span>
            <span>{session?.user?.name}</span>
          </div>
        </div> */}

        {/* Section 1 */}

        <div className={styled.sidebar__dropdown}>
          <div className={styled.sidebar__dropdown_heading}>
            <div className={styled.show}>General</div>
          </div>
          <ul className={styled.sidebar__list}>
            <li className={route === "/admin/dashboard" && styled.active}>
              <Link href="/admin/dashboard">
                <FcList />
                <span className={styled.show}>Dashboard</span>
              </Link>
            </li>

            <li
              className={
                route.includes("/admin/dashboard/sales") && styled.active
              }
            >
              <Link href="/admin/dashboard/sales">
                <FcSalesPerformance />
                <span className={styled.show}>Sales</span>
              </Link>
            </li>

            <li
              className={
                route.includes("/admin/dashboard/orders") && styled.active
              }
            >
              <Link href="/admin/dashboard/orders">
                <FcCurrencyExchange />
                <span className={styled.show}>Orders</span>
              </Link>
            </li>

            <li
              className={
                route.includes("/admin/dashboard/users") && styled.active
              }
            >
              <Link href="/admin/dashboard/users">
                <FcPortraitMode />
                <span className={styled.show}>Users</span>
              </Link>
            </li>

            <li
              className={
                route.includes("/admin/dashboard/messages") && styled.active
              }
            >
              <Link href="/admin/dashboard/messages">
                <FcSms />
                <span className={styled.show}>Messages</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Section 2 */}
        <div className={styled.sidebar__dropdown}>
          <div className={styled.sidebar__dropdown_heading}>
            <div className={styled.show}>Product</div>
          </div>

          <ul className={styled.sidebar__list}>
            <li
              className={
                route.includes("/admin/dashboard/product/all") && styled.active
              }
            >
              <Link href="/admin/dashboard/product/all">
                <FcShop />
                <span className={styled.show}>All Products</span>
              </Link>
            </li>

            <li
              className={
                route.includes("/admin/dashboard/product/create") &&
                styled.active
              }
            >
              <Link href="/admin/dashboard/product/create">
                <FcPlus />
                <span className={styled.show}>Create Products</span>
              </Link>
            </li>
          </ul>
        </div>

        <div className={styled.sidebar__dropdown}>
          <div className={styled.sidebar__dropdown_heading}>
            <div className={styled.show}>Categories</div>
          </div>
          <ul className={styled.sidebar__list}>
            <li
              className={
                route.includes("/admin/dashboard/categories") && styled.active
              }
            >
              <Link href="/admin/dashboard/categories">
                <FcParallelTasks />
                <span className={styled.show}>Parent Categories</span>
              </Link>
            </li>

            <li
              className={
                route.includes("/admin/dashboard/subcategories") &&
                styled.active
              }
            >
              <Link href="/admin/dashboard/subcategories">
                <FcTimeline />
                <span className={styled.show}>Sub Categories</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Section 3 */}
        <div className={styled.sidebar__dropdown}>
          <div className={styled.sidebar__dropdown_heading}>
            <div className={styled.show}>Discount</div>
          </div>
          <ul className={styled.sidebar__list}>
            <li
              className={
                route.includes("/admin/dashboard/coupons") && styled.active
              }
            >
              <Link href="/admin/dashboard/coupons">
                <FcPuzzle />
                <span className={styled.show}>Coupons</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Section 4 */}
        <div className={styled.sidebar__dropdown}>
          <div className={styled.sidebar__dropdown_heading}>
            <div className={styled.show}>Actions</div>
          </div>
          <ul className={styled.sidebar__list}>
            <li>
              <Link href="">
                <FcSettings />
                <span className={styled.show}>Settings</span>
              </Link>
            </li>

            <li>
              <Link href="">
                <FcAdvertising />{" "}
                <span className={styled.show}>Notifications</span>
              </Link>
            </li>

            <li>
              <Link href="">
                <FcCustomerSupport />
                <span className={styled.show}>Customer support</span>
              </Link>
            </li>

            <li>
              <Link href="">
                <FcSynchronize />
                <span className={styled.show}>Log out</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
