import Link from "next/link";
import Image from "next/image";
import { MdDashboard } from "react-icons/md";

import styled from "./styles.module.scss";
import { menuArray } from "@/data/home";

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
                  <Image
                    fill={true}
                    style={{ objectFit: "cover" }}
                    src={`/categories/${item.images}`}
                    alt={item.name}
                  />
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
