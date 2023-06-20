/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  BsHandbagFill,
  BsHeartFill,
  BsFillCaretDownFill,
} from "react-icons/bs";
import { AiFillTags } from "react-icons/ai";
import { FcShipped, FcDeployment } from "react-icons/fc";
import { useMediaQuery } from "react-responsive";

import styled from "./styles.module.scss";
import "react-toastify/dist/ReactToastify.css";
import { TbMinus, TbPlus } from "react-icons/tb";
import StyledAccordion from "./StyledAccordion";
import Ratings from "../Ratings";
import { addToCart, updateCart } from "@/store/cartSlice";
import axios from "axios";
import { MdCancel } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { signIn, useSession } from "next-auth/react";
import { toast } from "react-toastify";

const Infos = ({ product, setActiveImg, setImages }) => {
  const Router = useRouter();
  const { data: session } = useSession();
  const { cart } = useSelector((state) => ({ ...state }));

  const dispatch = useDispatch();

  const [size, setSize] = useState(Router.query.size);
  const [qty, setQty] = useState(1);
  const [error, setError] = useState("");

  const isSmall = useMediaQuery({ query: "(max-width: 418px)" });

  //Reset lại Quantity khi thay đổi size hoặc style
  useEffect(() => {
    setQty(1);
  }, [Router.query.size, Router.query.style]);

  const addToCartHandler = async () => {
    //Bắt buộc phải chọn size trước khi thêm vào giỏ hàng
    if (!Router.query.size) {
      setError("Please select a size");
      return;
    }
    const { data } = await axios.get(
      `/api/product/${product._id}?style=${product.style}&size=${Router.query.size}`
    );

    //Handle khi số lượng thêm vào giỏ lớn hơn số lượng có sẵn
    if (qty > data.quantity) {
      setError("Not enough items in stock. Try and lower the quantity input");
    } else if (data.quantity < 1) {
      //Handle khi số lượng tồn kho bằng 0
      setError("This product is out of stock");
    } else {
      //Các SP có style, size khác nhau đều được coi là những sp khác nhau
      //Cần gán unique Id cho chúng để phân biệt sản phẩm cũ hay mới trong giỏ hàng
      let _uniqueId = `${data._id}_${product.style}_${Router.query.size}`;

      //Kiểm tra SP với style, size được chọn đã tồn tại trong giỏ hàng chưa
      let exist = cart.cartItems.find((p) => p._uniqueId === _uniqueId);

      //Nếu tồn tại rồi thì update bằng cách cộng thêm số lượng
      if (exist) {
        let newCart = cart.cartItems.map((p) => {
          if (p._uid == exist._uid) {
            return { ...p, qty: p.qty + qty };
          }
          return p;
        });
        dispatch(updateCart(newCart));
      } else {
        //Nếu chưa tồn tại thì push vào item mới
        dispatch(
          addToCart({
            ...data,
            qty,
            size: data.size,
            sizeIndex: Router.query.size,
            _uniqueId,
          })
        );
      }
    }
  };

  const addToWishListHandler = async () => {
    if (!session) {
      return signIn();
    }

    try {
      const { data } = await axios.put("/api/user/wishlist", {
        product_id: product._id,
        style: product.style,
      });
      toast.success(data.message);
    } catch (error) {
      return toast.error(error.response.data.message);
    }
  };

  return (
    <div className={styled.infos}>
      <div className={styled.infos__container}>
        <h1 className={styled.infos__name}>{product.name}</h1>
        <h2 className={styled.infos__sku}>
          <span>SKU</span>: {product.sku}
        </h2>
        <div className={styled.infos__rating}>
          <div className={styled.infos__rating_average}>
            <span
              className={`${styled.infos__rating_underline} ${styled.colored}`}
            >
              {product.rating.toFixed(2)}
            </span>
            <div className={styled.infos__rating_stars}>
              <Ratings defaultRating={product.rating} />
            </div>
          </div>

          <div className={styled.infos__rating_nums}>
            <span className={styled.infos__rating_underline}>
              {product.numReviews}
            </span>
            {product.numReviews == 1 ? " review" : " reviews"}
          </div>

          {!isSmall && (
            <div className={styled.infos__policy}>
              <span className={styled.infos__rating_underline}>
                {product.refundPolicy.replace(" days", "")}
              </span>
              &nbsp;days for return
            </div>
          )}
        </div>
        <div className={styled.infos__price}>
          {product.discount > 0 && size && (
            <span className={styled.infos__price_before}>
              ${product.priceBefore}
            </span>
          )}
          {!size ? (
            <h3 className={styled.infos__price_range}>{product.priceRange}</h3>
          ) : (
            <h3 className={styled.infos__price_single}>${product.price}</h3>
          )}
          {product.discount > 0 && size && (
            <>
              <span
                className={`${styled.infos__price_discount2} ${styled.lift}`}
              >
                <AiFillTags />
                {product.discount}% off
              </span>
            </>
          )}
          {product.discount > 0 && !size && (
            <span className={styled.infos__price_range_discount}>
              Buy now to get{" "}
              <span className={styled.infos__price_discount}>
                {product.discount}%
              </span>
              discount
            </span>
          )}
        </div>
        <span className={styled.infos__shipping}>
          {product.shipping > 0 && (
            <>
              <FcShipped /> ${product.shipping} Shipping fee
            </>
          )}
          {!product.shipping && (
            <>
              <FcShipped /> Free shipping
            </>
          )}
        </span>
        <span className={styled.infos__available}>
          <FcDeployment />
          {size
            ? product.quantity
            : product.sizes.reduce((acc, cur) => acc + cur.qty, 0)}
          &nbsp;pieces available
        </span>
        <div className={styled.infos__sizes}>
          <span className={styled.infos__sizes_title}>
            Select size <BsFillCaretDownFill />
          </span>
          <div className={styled.infos__sizes_wrapper}>
            {product.sizes.map((size, index) => (
              <Link
                href={`/product/${product.slug}?style=${Router.query.style}&size=${index}`}
                key={index}
                className={`${styled.infos__sizes_size} ${
                  index == Router.query.size ? styled.active_size : ""
                }`}
                onClick={() => setSize(size.size)}
              >
                {size.size}
              </Link>
            ))}
          </div>
        </div>
        <span className={styled.infos__sizes_title}>
          Select color <BsFillCaretDownFill />
        </span>
        <div className={styled.infos__colors}>
          {product.colors &&
            product.colors.map((color, index) =>
              color.colorImg ? (
                <Link
                  href={`/product/${product.slug}?style=${index}`}
                  key={index}
                  className={
                    index == Router.query.style ? styled.active_color : ""
                  }
                  onClick={() => {
                    setSize("");
                    setImages(product.subProducts[index].images);
                    setActiveImg(product.subProducts[index].images[0]);
                  }}
                >
                  <img src={color.colorImg} alt={color.colorImg} />
                </Link>
              ) : (
                <Link
                  href={`/product/${product.slug}?style=${index}`}
                  key={index}
                  className={
                    index == Router.query.style ? styled.active_color : ""
                  }
                  onClick={() => {
                    setSize("");
                    setImages(product.subProducts[index].images);
                    setActiveImg(product.subProducts[index].images[0]);
                  }}
                  style={{
                    backgroundColor: `${color.color}`,
                  }}
                ></Link>
              )
            )}
        </div>
        <span className={styled.infos__sizes_title}>
          Select quantity <BsFillCaretDownFill />
        </span>
        <div className={styled.infos__qty}>
          {/* Input value phải lớn hơn 1 thì mới được trừ */}
          <button onClick={() => qty > 1 && setQty((prev) => prev - 1)}>
            <TbMinus />
          </button>
          <span>{qty}</span>
          {/* Input value phải nhỏ hơn số lượng sp hiện có thì mới được cộng */}
          <button
            onClick={() => qty < product.quantity && setQty((prev) => prev + 1)}
          >
            <TbPlus />
          </button>
        </div>
        <div className={styled.infos__actions}>
          <button
            disabled={product.quantity < 1}
            style={{ cursor: `${product.quantity < 1 ? "not-allowed" : ""}` }}
            onClick={addToCartHandler}
            type="button"
          >
            <BsHandbagFill />
            ADD TO CART
          </button>
          <button type="button" onClick={addToWishListHandler}>
            <BsHeartFill />
            ADD TO WISHLIST
          </button>
        </div>
        {error && (
          <span className={styled.error}>
            <MdCancel /> {error}
          </span>
        )}
        <StyledAccordion details={[product.description, ...product.details]} />
      </div>
    </div>
  );
};

export default Infos;