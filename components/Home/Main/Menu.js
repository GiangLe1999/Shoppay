import Link from "next/link";
import Image from "next/image";
import { MdDashboard } from "react-icons/md";

import styled from "./styles.module.scss";
import { menuArray } from "@/data/home";
import { AiFillCloseSquare } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { toggleMobileCate } from "@/store/mobileCateSlice";

const Menu = () => {
  const dispatch = useDispatch();
  return (
    <div className={styled.menu}>
      <ul>
        <a className={styled.menu__header}>
          <MdDashboard size={25} />
          CATEGORIES
          <button
            className={styled.menu__header_btn}
            onClick={() => dispatch(toggleMobileCate())}
          >
            <AiFillCloseSquare size={20} />
          </button>
        </a>
        <div className={styled.menu__list}>
          {menuArray.map((item, index) => (
            <li className={styled.menu__item} key={index}>
              <Link
                href={`/browse?category=${item.link}`}
                onClick={() => dispatch(toggleMobileCate())}
              >
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
