/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdDiscount } from "react-icons/md";

import ProductCardSwiper from "./ProductCardSwiper";

import styled from "./styles.module.scss";

const ProductCard = ({ product }) => {
  //Index của subProduct được active

  const [active, setActive] = useState(0);

  //Lấy ra các ảnh của subProduct được active
  const [images, setImages] = useState(product.subProducts[active]?.images);

  //Lấy ra tất cả giá của subProduct được active
  // const [prices, setPrices] = useState(
  //   product.subProducts[active]?.sizes.map((s) => s.price).sort((a, b) => a - b)
  // );

  //Lấy ra màu của tất cả subProducts (toàn bộ màu của product)
  const [styles, setStyles] = useState(
    product.subProducts.map((p) => {
      return p.color;
    })
  );

  let prices = product.subProducts[active].sizes
    .map((s) => s.price)
    .sort((a, b) => a - b);

  const priceRange = product.subProducts[active].discount
    ? `From $${
        prices[0] - (prices?.[0] * product.subProducts[active].discount) / 100
      } to $${
        prices?.[prices?.length - 1] -
        (prices?.[prices?.length - 1] * product.subProducts[active].discount) /
          100
      }`
    : `From $${prices?.[0]} to $${prices?.[prices?.length - 1]}`;

  //Active subProduct thay đổi, cập nhật lại state ảnh và giá
  useEffect(() => {
    setImages(product.subProducts[active]?.images);
  }, [active]);

  return (
    <div className={styled.product}>
      <div className={styled.product__container}>
        <Link href={`/product/${product.slug}?style=${active}`}>
          <div className="">
            <ProductCardSwiper images={images} />
          </div>
        </Link>
        {product.subProducts[active]?.discount ? (
          <div className={styled.product__discount}>
            <img src="/images/discount-tag.png" alt="Discount tag" />
            <span>
              <MdDiscount />
              {product.subProducts[active].discount}%
            </span>
          </div>
        ) : (
          ""
        )}
        <div className={styled.product__infos}>
          <h4>{product.name}</h4>
          <span>{priceRange}</span>
          <div className={styled.product__colors}>
            {styles &&
              styles.map((style, index) =>
                style.image ? (
                  <img
                    key={index}
                    className={index === active && styled.active}
                    onMouseOver={() => {
                      setImages(product.subProducts[index]?.images);
                      setActive(index);
                    }}
                    src={style.image}
                    alt=""
                  />
                ) : (
                  <span
                    key={index}
                    style={{
                      backgroundColor: `${style.color}`,
                      outlineOffset: "2px",
                      cursor: "pointer",
                    }}
                    className={index === active && styled.active}
                    onMouseOver={() => {
                      setImages(product.subProducts[index]?.images);
                      setActive(index);
                    }}
                  ></span>
                )
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
