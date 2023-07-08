/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { FaOpencart } from "react-icons/fa";
import NextImage from "@/components/NextImage";

import { addToCartHandler, priceAfterDiscount } from "@/utils/productUltils";

import styled from "./styles.module.scss";
import "react-toastify/dist/ReactToastify.css";

const FlashCard = ({ product }) => {
  const { cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  return (
    <div className={styled.flashDeals__item}>
      <Link href={`/product/${product.slug}`}>
        <div className={styled.flashDeals__item_img}>
          <NextImage src={product.images[0].url} alt="" />
        </div>

        <div className={styled.flashDeals__item_infos}>
          <div
            className={styled.flex}
            style={{ justifyContent: "space-between" }}
          >
            <div className={styled.flashDeals__item_discount}>
              <span>{product.discount}% off</span>
              <span>Deal</span>
            </div>
          </div>

          <h5 className={styled.flashDeals__item_name}>{product.name}</h5>

          <div className={styled.flashDeals__item_price}>
            <span>$</span>
            <span>
              {priceAfterDiscount(product.sizes[0].price, product.discount)}
            </span>
            <span>List Price : </span>
            <span>$</span>
            <span>{product.sizes[0].price}</span>
          </div>

          <button
            className={styled.flashDeals__item_btn}
            onClick={(e) =>
              addToCartHandler(
                e,
                product.parentId,
                product.style,
                0,
                cart,
                dispatch
              )
            }
          >
            <span>
              <FaOpencart />
            </span>
            <span>Add to Cart</span>
          </button>
        </div>
      </Link>
    </div>
  );
};

export default FlashCard;
