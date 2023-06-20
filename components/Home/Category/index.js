/* eslint-disable @next/next/no-img-element */
import { useMediaQuery } from "react-responsive";

import { GiLargeDress, GiHighHeel, GiHeartNecklace } from "react-icons/gi";

import styled from "./styles.module.scss";
import Link from "next/link";

const Category = ({ header, products, background, icon }) => {
  const isMedium = useMediaQuery({ query: "(max-width: 1023px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 500px)" });

  return (
    <div className={styled.category}>
      <div className={styled.category__header}>
        <Link href="">
          <h3>
            {header}{" "}
            {icon === "dress" ? (
              <GiLargeDress />
            ) : icon === "heels" ? (
              <GiHighHeel />
            ) : icon === "accessories" ? (
              <GiHeartNecklace />
            ) : (
              ""
            )}
          </h3>
        </Link>
      </div>
      <div className={styled.category__products}>
        {products
          .slice(0, isMobile ? 6 : isMedium ? 4 : 6)
          .map((product, index) => {
            return (
              <div className={styled.product} key={index}>
                <img src={product.image} alt="" />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Category;
