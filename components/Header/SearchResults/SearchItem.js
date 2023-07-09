import NextImage from "@/components/NextImage";
import { priceAfterDiscount, sortPricesArr } from "@/utils/productUltils";
import Link from "next/link";
import React from "react";

import styled from "../styles.module.scss";
import { useRouter } from "next/router";

export default function SearchItem({ product }) {
  const prices = sortPricesArr(product.subProducts[0]?.sizes)[0];
  const router = useRouter();

  const priceFrom = product.subProducts[0]?.discount
    ? priceAfterDiscount(prices, product.subProducts[0].discount)
    : prices;

  return (
    <div
      key={product._id}
      className={styled.search__body_item}
      onMouseDown={() => router.push(`/product/${product.slug}?style=0`)}
      style={{ cursor: "pointer" }}
    >
      <div className={styled.search__body_img}>
        <NextImage src={product.subProducts[0].images[0].url} />
      </div>
      <div className={styled.search__body_infos}>
        <p>{product.name}</p>
        <p>From ${priceFrom}</p>
        {product.subProducts[0]?.discount > 0 && (
          <div className={styled.search__body_sale}>
            <strike>From ${prices}</strike> |
            <span>
              Save ${(prices - priceFrom).toFixed(2)} (
              {product.subProducts[0]?.discount}%)
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
