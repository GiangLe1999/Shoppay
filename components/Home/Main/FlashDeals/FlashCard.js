/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaOpencart } from "react-icons/fa";

import styled from "./styles.module.scss";
import NextImage from "@/components/NextImage";
import { priceAfterDiscount } from "@/utils/productUltils";
import { addToCart, updateCart } from "@/store/cartSlice";

const FlashCard = ({ product }) => {
  const { cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const addToCartHandler = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const { data } = await axios.get(
      `/api/product/${product.parentId}?style=${product.style}&size=${0}`
    );

    if (data.quantity < 1) {
      toast.error("This product is out of stock");
    } else {
      let _uniqueId = `${data._id}_${product.style}_0`;

      let exist = cart.cartItems.find((p) => p._uniqueId === _uniqueId);

      if (exist) {
        let newCart = cart.cartItems.map((p) => {
          if (p._uniqueId == exist._uniqueId) {
            return { ...p, qty: p.qty + 1 };
          }
          return p;
        });
        dispatch(updateCart(newCart));
      } else {
        //Nếu chưa tồn tại thì push vào item mới
        dispatch(
          addToCart({
            ...data,
            qty: 1,
            size: product.sizes[0].size,
            sizeIndex: 0,
            _uniqueId,
          })
        );

        toast.success("Add product to cart successfully!");
      }
    }
  };

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
            onClick={addToCartHandler}
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
