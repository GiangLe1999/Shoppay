/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { RiSearch2Line } from "react-icons/ri";
import { FaOpencart } from "react-icons/fa";

import styled from "./styles.module.scss";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const Main = ({ searchHandler2 }) => {
  const { cart } = useSelector((state) => ({ ...state }));
  const router = useRouter();
  const [query, setQuery] = useState(router.query.search || "");

  const searchHandler = (e) => {
    e.preventDefault();
    //Sau khi submit search form, chuyển hướng người dùng về Browse page
    if (query && query.trim().length > 0) {
      if (router.pathname !== "/browse") {
        router.push(`/browse?search=${query}`);
      } else {
        searchHandler2(query);
      }
    } else {
      toast.error("Invalid search query!");
    }
  };

  return (
    <div className={styled.main}>
      <div className={styled.main__container}>
        {/* logo */}
        <Link href="/">
          <div className={styled.logo}>
            <img src="/logo.png" alt="Logo Shoppay" />
          </div>
        </Link>

        {/* Search */}
        <form onSubmit={searchHandler} className={styled.search}>
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
          />
          <button type="submit" className={styled.search__icon}>
            <RiSearch2Line />
          </button>
        </form>

        {/* Cart */}
        <Link href="/cart">
          <div className={styled.cart}>
            <FaOpencart />
            <span>{cart.cartItems.length}</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Main;
