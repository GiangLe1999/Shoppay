/* eslint-disable @next/next/no-img-element */
import { updateCart } from "@/store/cartSlice";
import { useEffect } from "react";
import { useState } from "react";
import { FcShop, FcFullTrash } from "react-icons/fc";
import { MdOutlineKeyboardArrowRight, MdPlayArrow } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useMediaQuery } from "react-responsive";

import styled from "./styles.module.scss";
import Link from "next/link";

const Product = ({ product, selected, setSelected }) => {
  const { cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const [active, setActive] = useState(null);

  const isSmall = useMediaQuery({ query: "(max-width: 684px)" });
  const isSuperSmall = useMediaQuery({ query: "(max-width: 488px)" });

  //Tăng 1 hoặc giảm 1
  const updateQtyHandler = (type) => {
    let newCart = cart.cartItems.map((p) => {
      if (p._uniqueId === product._uniqueId) {
        return {
          ...p,
          qty: type === "plus" ? p.qty + 1 : p.qty - 1,
        };
      }
      return p;
    });
    dispatch(updateCart(newCart));

    //Sau khi check item, tăng số lượng vẫn cập nhất total và subTotal
    if (selected.length > 0) {
      setSelected(() => {
        const newSelected = [...selected];

        const itemIndex = newSelected.findIndex(
          (a) => a._uniqueId === product._uniqueId
        );

        const newItem = { ...newSelected[itemIndex] };

        if (type === "plus") {
          newItem.qty = newItem.qty + 1;
        } else {
          newItem.qty = newItem.qty - 1;
        }

        newSelected[itemIndex] = newItem;

        return newSelected;
      });
    }
  };

  //Gỡ SP ra khỏi giỏ hàng
  const removeFromCartHandler = () => {
    let newCart = cart.cartItems.filter(
      (p) => p._uniqueId !== product._uniqueId
    );

    dispatch(updateCart(newCart));
  };

  useEffect(() => {
    //Kiểm tra xem sản phẩm có được nằm trong list selected không khi cart vừa mount và khi selected thay đổi
    const check = selected?.find((p) => {
      return p._uniqueId == product._uniqueId;
    });

    //Nếu có thì set active để kích hoạt class active cho checkbox
    setActive(check);
  }, [selected]);

  //Handle khi click vào checkbox
  const selectHandler = () => {
    //Nếu SP trước đó đã tồn tại trong selected rồi thì gỡ
    if (active) {
      setSelected(selected?.filter((p) => p._uniqueId !== product._uniqueId));
    } else {
      //Nếu SP trước đó chưa tồn tại trong selected thì thêm
      setSelected([...selected, product]);
    }
  };

  const showPopupHandler = () => {
    Swal.fire({
      title: "Are you sure?",
      text: `This item will be removed form cart!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        removeFromCartHandler();
        Swal.fire(
          "Deleted!",
          "Your item has been removed from cart.",
          "success"
        );
      }
    });
  };

  return (
    <div className={styled.cart__product}>
      {/* Out of stock */}
      {product.quantity < 1 && <div className={styled.blur}></div>}
      <div className={styled.cart__product_header}>
        <div
          className={`${styled.checkbox} ${active ? styled.active : ""}`}
          onClick={selectHandler}
        ></div>
        <Link href={"/"}>
          <FcShop />
          Shoppay
          <MdPlayArrow />
        </Link>
      </div>
      <div className={styled.cart__product_body}>
        {/* Col 1 */}
        <div className={styled.infos}>
          <div
            className={`${styled.checkbox} ${active ? styled.active : ""}`}
            onClick={selectHandler}
          ></div>
          {!isSmall && <img src={product.images[0].url} alt="" />}
          <div className={styled.detail}>
            <h3>{product.name}</h3>
            {product.size && (
              <p>
                <span>Size :&nbsp;</span>
                {product.size}
              </p>
            )}
            <p>
              <span>Color :&nbsp;</span>
              {product.color.image ? (
                <img src={product.color.image} alt="" />
              ) : (
                <span
                  style={{
                    backgroundColor: product.color.color,
                    width: "15px",
                    height: "15px",
                    borderRadius: "50%",
                    display: "inline-block",
                  }}
                ></span>
              )}
            </p>
            {!isSuperSmall && (
              <p>
                <span>Ship fee :&nbsp;</span>
                {product.shipping ? `$${product.shipping}` : "Free shipping"}
              </p>
            )}
            {!isSuperSmall && (
              <p>
                <span>Detail :&nbsp;</span>
                <Link
                  target="_blank"
                  href={`/product/${product.slug}?style=${product.style}&size=${product.sizeIndex}`}
                >
                  Click here <MdOutlineKeyboardArrowRight />
                </Link>
              </p>
            )}
          </div>
        </div>

        {/* Col 2 */}
        <div className={styled.price}>
          {product.discount > 0 && !isSmall && (
            <p className={styled.price__discount}>
              Discount :&nbsp;&nbsp;
              <span>-{product.discount}%</span>
            </p>
          )}

          <div className={styled.price__number}>
            {product.price && <span>${product.price.toFixed(2)}</span>}
            {product.price !== product.priceBefore && !isSmall && (
              <del>${product.priceBefore}</del>
            )}
          </div>
        </div>

        {/* Col 3 */}
        <div className={styled.quantity}>
          <button
            disabled={product.qty < 2}
            onClick={() => updateQtyHandler("minus")}
          >
            -
          </button>
          <span>{product.qty}</span>
          <button
            disabled={product.qty == product.quantity}
            onClick={() => updateQtyHandler("plus")}
          >
            +
          </button>
        </div>

        {/* Col 4 */}
        <span className={styled.amount}>
          ${(product.price * product.qty).toFixed(2)}
        </span>

        {/* Col 5 */}
        <div className={styled.action}>
          {/* <div style={{ zIndex: 2 }}>
            <BsHeart />
          </div> */}
          <div
            className={styled.action__delete}
            style={{ zIndex: 2 }}
            onClick={showPopupHandler}
          >
            <FcFullTrash />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
