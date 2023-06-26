import React from "react";
import { FcSearch, FcLike, FcPaid } from "react-icons/fc";
import { toast } from "react-toastify";
import { Tooltip } from "@mui/material";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";

import styled from "./styles.module.scss";
import "react-toastify/dist/ReactToastify.css";
import { addToCart, updateCart } from "@/store/cartSlice";

export default function Actions({
  product,
  productStyle,
  productSize,
  productSizeInText,
}) {
  const { data: session } = useSession();
  const { cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const addToCartHandler = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { data } = await axios.get(
      `/api/product/${product._id}?style=${productStyle}&size=${productSize}`
    );

    //Handle khi số lượng thêm vào giỏ lớn hơn số lượng có sẵn
    if (data.quantity < 1) {
      //Handle khi số lượng tồn kho bằng 0
      toast.error("This product is out of stock");
    } else {
      let _uniqueId = `${data._id}_${productStyle}_${productSize}`;

      let exist = cart.cartItems.find((p) => p._uniqueId === _uniqueId);

      //Nếu tồn tại rồi thì update bằng cách cộng thêm số lượng
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
            size: productSizeInText,
            sizeIndex: productSize,
            _uniqueId,
          })
        );

        toast.success("Add product to cart successfully!");
      }
    }
  };

  const addToWishListHandler = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!session) {
      toast.error("Please login before using this feature!");
      return;
    }

    try {
      const { data } = await axios.put("/api/user/wishlist", {
        product_id: product._id,
        style: productStyle,
      });
      toast.success(data.message);
    } catch (error) {
      return toast.error(error.response.data.message);
    }
  };

  return (
    <div className={styled.actions}>
      <Tooltip title={<p>Quick View</p>} placement="left" arrow>
        <button className={styled.actions__quickview}>
          <FcSearch />
        </button>
      </Tooltip>

      <Tooltip title={<p>Add to Cart</p>} placement="left" arrow>
        <button
          className={styled.actions__addToCart}
          onClick={addToCartHandler}
        >
          <FcPaid />
        </button>
      </Tooltip>

      <Tooltip title={<p>Add to Wishlist</p>} placement="left" arrow>
        <button
          className={styled.actions__wishlist}
          onClick={addToWishListHandler}
        >
          <FcLike />
        </button>
      </Tooltip>
    </div>
  );
}
