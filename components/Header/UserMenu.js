/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import { signOut, signIn } from "next-auth/react";
import { BiLogOut } from "react-icons/bi";

import styled from "./styles.module.scss";
import { RevealWrapper } from "next-reveal";

const UserMenu = ({ session }) => {
  return (
    <div className={styled.menu}>
      <h4>Welcome to ShopPay!</h4>
      {session ? (
        <div className={styled.userInfo}>
          <img
            src={session.user.image}
            alt="Avatar"
            className={styled.menu__img}
          />
          <div className={styled.col}>
            <h3>{session.user.name}</h3>
            <span onClick={() => signOut()}>
              <BiLogOut /> Sign out
            </span>
          </div>
        </div>
      ) : (
        <div className={styled.flex}>
          <button className={styled.btn__primary}>Register</button>
          <button className={styled.btn__outline} onClick={() => signIn()}>
            Login
          </button>
        </div>
      )}
      <ul>
        <li>
          <Link href="/profile">Account</Link>
        </li>
        <li>
          <Link href="/profile/orders">My Orders</Link>
        </li>
        <li>
          <Link href="/profile/messages">Message Center</Link>
        </li>
        <li>
          <Link href="/profile/address">Address</Link>
        </li>
        <li>
          <Link href="/profile/wishlist">Wishlist</Link>
        </li>
      </ul>
    </div>
  );
};

export default UserMenu;
