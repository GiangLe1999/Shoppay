/* eslint-disable @next/next/no-img-element */
import { AiFillSafetyCertificate, AiOutlineMenuUnfold } from "react-icons/ai";
import { HiHeart } from "react-icons/hi";
import { FaHandsHelping } from "react-icons/fa";
import {
  RiCustomerServiceFill,
  RiAccountPinCircleFill,
  RiArrowDropDownFill,
} from "react-icons/ri";
import { useSession } from "next-auth/react";
import { useMediaQuery } from "react-responsive";
import Link from "next/link";

import styled from "./styles.module.scss";
import UserMenu from "./UserMenu";
import { useDispatch } from "react-redux";
import { toggleMobileCate } from "@/store/mobileCateSlice";

const Top = ({ country }) => {
  const { data: session } = useSession();
  const isSmallScreen = useMediaQuery({ query: "(max-width: 816px)" });
  const isExtraSmallScreen = useMediaQuery({ query: "(max-width: 386px)" });
  const dispatch = useDispatch();

  return (
    <div className={styled.top}>
      <div className={styled.top__container}>
        <div>
          <div
            className={styled.menuIcon}
            onClick={() => dispatch(toggleMobileCate())}
          >
            <AiOutlineMenuUnfold size={24} />
          </div>
        </div>
        <ul className={styled.top__list}>
          {!isExtraSmallScreen && (
            <li className={styled.li}>
              <img src={country?.flag} alt={country?.name} />
              <span>{country?.name} / VND</span>
            </li>
          )}
          {!isSmallScreen && (
            <>
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
            </>
          )}

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
