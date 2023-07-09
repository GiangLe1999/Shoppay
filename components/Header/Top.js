/* eslint-disable @next/next/no-img-element */
import { AiFillSafetyCertificate } from "react-icons/ai";
import { HiHeart } from "react-icons/hi";
import { FaHandsHelping } from "react-icons/fa";
import {
  RiCustomerServiceFill,
  RiAccountPinCircleFill,
  RiArrowDropDownFill,
} from "react-icons/ri";

import styled from "./styles.module.scss";
import Link from "next/link";
import UserMenu from "./UserMenu";
import { useSession } from "next-auth/react";

const Top = ({ country }) => {
  const { data: session } = useSession();

  return (
    <div className={styled.top}>
      <div className={styled.top__container}>
        <div></div>
        <ul className={styled.top__list}>
          <li className={styled.li}>
            <img src={country?.flag} alt={country?.name} />
            <span>{country?.name} / VND</span>
          </li>
          <li className={styled.li}>
            <AiFillSafetyCertificate />
            <span>Buyer Protection</span>
          </li>
          <li className={styled.li}>
            <RiCustomerServiceFill />
            <span>Customer Service</span>
          </li>
          <li className={styled.li}>
            <FaHandsHelping />
            <span>Help</span>
          </li>
          <li className={styled.li}>
            <HiHeart />
            <Link href="/profile/wishlist?tab=2&q=wishlist">
              <span>Wishlist</span>
            </Link>
          </li>
          <li className={styled.li}>
            {session ? (
              <div className={styled.flex}>
                <img src={session.user.image} alt="Avatar" />
                <span>{session.user.name}</span>
                <RiArrowDropDownFill />
              </div>
            ) : (
              <div className={styled.flex}>
                <RiAccountPinCircleFill />
                <span>Account</span>
                <RiArrowDropDownFill />
              </div>
            )}
            <UserMenu session={session} />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Top;
