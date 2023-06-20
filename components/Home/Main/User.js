/* eslint-disable @next/next/no-img-element */
import { useSession } from "next-auth/react";
import Link from "next/link";
import { AiOutlineMessage } from "react-icons/ai";
import { FiHeart } from "react-icons/fi";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { AiOutlineSetting } from "react-icons/ai";
import { AiOutlineFire } from "react-icons/ai";
import { BsTruck } from "react-icons/bs";
import { HiUser } from "react-icons/hi";

import styled from "./styles.module.scss";

const User = () => {
  const { data: session } = useSession();

  return (
    <div className={styled.user}>
      <div className={styled.user__container}>
        {session ? (
          <div className={styled.user__infos}>
            <img src={session?.user?.image} alt={session?.user?.name} />
            <h4>{session?.user?.name}</h4>
            <span>
              Role : {session?.user?.role} <HiUser />
            </span>
          </div>
        ) : (
          <div className={styled.user__infos}>
            <img src="/images/default-avt.png" alt={session?.user?.name} />
            <p>You haven&apos;t logged in</p>
            <div className={styled.user__infos_btns}>
              <button>Register</button>
              <button>Login</button>
            </div>
          </div>
        )}
        <ul className={styled.user__links}>
          <li>
            <Link href="/profile">
              <AiOutlineFire />
              <p>Best seller</p>
            </Link>
          </li>
          <li>
            <Link href="/profile">
              <BsTruck />
              <p>New products</p>
            </Link>
          </li>
          <li>
            <Link href="/profile">
              <AiOutlineSetting />
              <p>Settings</p>
            </Link>
          </li>
          <li>
            <Link href="/profile">
              <HiOutlineClipboardDocumentList />
              <p>Orders</p>
            </Link>
          </li>
          <li>
            <Link href="/profile">
              <AiOutlineMessage />
              <p>Message</p>
            </Link>
          </li>
          <li>
            <Link href="/profile">
              <FiHeart />
              <p>Wishlist</p>
            </Link>
          </li>
        </ul>
        <p className={styled.user__wish}>Happy Shoping!</p>
      </div>
    </div>
  );
};

export default User;
