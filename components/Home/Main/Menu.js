/* eslint-disable @next/next/no-img-element */
import { menuArray } from "@/data/home";
import Link from "next/link";
import { MdDashboard } from "react-icons/md";

import styled from "./styles.module.scss";

const Menu = () => {
  return (
    <div className={styled.menu}>
      <ul>
        <a href="" className={styled.menu__header}>
          <MdDashboard />
          CATEGORIES
        </a>
        <div className={styled.menu__list}>
          {menuArray.map((item, index) => (
            <li className={styled.menu__item} key={index}>
              <Link href={item.link}>
                <div className={styled.menu__item_img}>
                  <img src={`/categories/${item.images}`} alt="" />
                </div>
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </div>
      </ul>
    </div>
  );
};

export default Menu;
