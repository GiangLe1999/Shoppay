import React from "react";

import styled from "./styles.module.scss";
import NextImage from "../NextImage";
import Link from "next/link";

export default function HeaderCartItem({ item }) {
  return (
    <Link
      onClick={(e) => e.stopPropagation()}
      rel="noopener noreferrer"
      target="_blank"
      href={`/product/${item.slug}?style=${item.style}&size=${item.sizeIndex}`}
      className={styled.cart__item}
    >
      <div className={styled.cart__item_image}>
        <NextImage src={item.images[0].url} />
        <p>{item.qty}</p>
      </div>
      <div className={styled.cart__item_info}>
        <p>{item.name.substring(0, 40) + "..."}</p>
        <p>
          <span>${item.price.toFixed(2)}</span>
          <strike>${item.priceBefore.toFixed(2)}</strike>
        </p>
      </div>
      <div className={styled.cart__item_amount}>
        ${(item.qty * item.price).toFixed(2)}
      </div>
    </Link>
  );
}
