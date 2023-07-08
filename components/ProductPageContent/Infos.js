/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@mui/material";
import { signIn, useSession } from "next-auth/react";
import { useMediaQuery } from "react-responsive";

import { BsFillCaretDownFill } from "react-icons/bs";
import { BiHeart } from "react-icons/bi";
import { TbMinus, TbPlus } from "react-icons/tb";
import { MdCancel } from "react-icons/md";
import { FaOpencart } from "react-icons/fa";
import { AiFillTags } from "react-icons/ai";
import { FcShipped, FcDeployment } from "react-icons/fc";

import styled from "./styles.module.scss";
import StyledAccordion from "./StyledAccordion";
import Ratings from "../Ratings";

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

  const addToWishListHandler = async () => {
    if (!session) {
      toast.error("Please sign in to use this feature!");
      return signIn();
    }

    try {
      const { data } = await axios.put("/api/user/wishlist", {
        product_id: product._id,
        style: product.style,
        size,
      });
      toast.success(data.message);
    } catch (error) {
      return toast.error(error.response.data.message);
    }
  };

  const changeSizeHandler = (newSize, index) => {
    setSize(newSize);
    Router.push(
      {
        pathname: `/product/${product.slug}`,
        query: { style: Router.query.style, size: index },
      },
      undefined,
      { scroll: false }
    );
  };

  const changeStyleHandler = (index) => {
    setSize("");
    setImages(product.subProducts[index].images);
    setActiveImg(product.subProducts[index].images[0]);
    Router.push(
      {
        pathname: `/product/${product.slug}`,
        query: { style: index },
      },
      undefined,
      { scroll: false }
    );
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

        <span className={styled.infos__sizes_title}>
          Select color <BsFillCaretDownFill />
        </span>
        <div className={styled.infos__colors}>
          {product.colors &&
            product.colors.map((color, index) =>
              color.colorImg ? (
                <button
                  key={index}
                  className={
                    index == Router.query.style ? styled.active_color : ""
                  }
                  onClick={() => changeStyleHandler(index)}
                >
                  <img src={color.colorImg} alt={color.colorImg} />
                </button>
              ) : (
                <button
                  key={index}
                  className={
                    index == Router.query.style ? styled.active_color : ""
                  }
                  onClick={() => changeStyleHandler(index)}
                  style={{
                    backgroundColor: `${color.color}`,
                  }}
                ></button>
              )
            )}
        </div>

        <div className={styled.infos__sizes}>
          <span className={styled.infos__sizes_title}>
            Select size <BsFillCaretDownFill />
          </span>
          <div className={styled.infos__sizes_wrapper}>
            {product.sizes.map((size, index) => (
              <button
                onClick={() => changeSizeHandler(size.size, index)}
                key={index}
                className={`${styled.infos__sizes_size} ${
                  index == Router.query.size ? styled.active_size : ""
                }`}
              >
                {size.size}
              </button>
            ))}
          </div>
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

        <div className={styled.infos__flex}>
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
        </div>

        <div className={styled.infos__actions}>
          <Button
            variant="contained"
            disabled={product.quantity < 1}
            style={{ cursor: `${product.quantity < 1 ? "not-allowed" : ""}` }}
            onClick={(e) =>
              addToCartHandler(
                e,
                product._id,
                product.style,
                Router.query.size,
                cart,
                dispatch
              )
            }
            type="button"
          >
            <FaOpencart />
            ADD TO CART
          </Button>
          <Button
            variant="contained"
            type="button"
            onClick={addToWishListHandler}
            color="secondary"
          >
            <BiHeart />
            ADD TO WISHLIST
          </Button>
        </div>
        {error && (
          <span className={styled.error}>
            <MdCancel /> {error}
          </span>
        )}
        <StyledAccordion
          product={product}
          details={[product.description, ...product.details]}
        />
      </div>
    </div>
  );
};

export default Infos;
