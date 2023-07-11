/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdDiscount } from "react-icons/md";

import ProductCardSwiper from "./ProductCardSwiper";

import styled from "./styles.module.scss";
import { priceAfterDiscount, sortPricesArr } from "@/utils/productUltils";
import Ratings from "../Ratings";
import Actions from "../Actions";

const ProductCard = ({ product, className }) => {
  //Index của subProduct được active
  const [active, setActive] = useState(0);
  const [sizeActive, setSizeActive] = useState(0);
  const [showActions, setShowActions] = useState(false);

  //Lấy ra các ảnh của subProduct được active
  const [images, setImages] = useState(product.subProducts[active]?.images);

  //Lấy ra màu của tất cả subProducts (toàn bộ màu của product)
  const [styles, setStyles] = useState(
    product.subProducts.map((p) => {
      return p.color;
    })
  );

  let prices = sortPricesArr(product.subProducts[active]?.sizes);

  const priceFrom = product.subProducts[active]?.discount
    ? priceAfterDiscount(prices[0], product.subProducts[active].discount)
    : prices?.[0];

  //Active subProduct thay đổi, cập nhật lại state ảnh và giá
  useEffect(() => {
    setImages(product.subProducts[active]?.images);
  }, [active]);

  return (
    <div className={`${styled.product} ${className}`}>
      <div className={styled.product__container}>
        <Link
          href={`/product/${product.slug}?style=${active}&size=${sizeActive}`}
        >
          <div
            style={{ position: "relative" }}
            onMouseOver={() => setShowActions(true)}
            onMouseLeave={() => setShowActions(false)}
          >
            <ProductCardSwiper images={images} />
            <div
              className={styled.product__infos_actions}
              style={{
                transform: showActions ? "scale3d(1,1,1)" : "scale3d(1,0,1)",
              }}
            >
              <Actions
                product={product}
                productStyle={active}
                productSize={sizeActive}
              />
            </div>{" "}
            {product.subProducts[active]?.discount ? (
              <div className={styled.product__infos_discount}>
                <MdDiscount />
                <p>{product.subProducts[active].discount}%</p>
              </div>
            ) : (
              ""
            )}
          </div>

          <div className={styled.product__infos}>
            <div className={styled.product__infos_colors}>
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

            <div className={styled.product__infos_sizes}>
              {product.subProducts[active]?.sizes.map((size, i) => {
                return (
                  <div key={i}>
                    <button
                      onClick={() => setSizeActive(i)}
                      className={sizeActive === i && styled.sizeActive}
                      htmlFor="size"
                    >
                      {size.size ? size.size : "No"}
                    </button>
                  </div>
                );
              })}
            </div>

            <h4 className={styled.product__infos_name}>{product.name}</h4>

            <div className={styled.product__infos_flex}>
              <div className={styled.product__infos_price}>
                <span>from </span>
                <span>$</span>
                <span>{priceFrom}</span>
                {product.subProducts[active]?.discount > 0 && (
                  <>
                    <span>$</span>
                    <span>{prices[0]}</span>
                  </>
                )}
              </div>

              <div className={styled.product__infos_ratings}>
                <Ratings value={product.rating} />
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
