import React, { useEffect, useState } from "react";

import styled from "../styles/Cart.module.scss";

import CartHeader from "../components/Cart/Header";
import Empty from "@/components/Cart/Empty";
import { useDispatch, useSelector } from "react-redux";
import Product from "@/components/Cart/Product";
import Top from "@/components/Cart/Top";
import Checkout from "@/components/Cart/Checkout";
import PaymentMethods from "@/components/Cart/PaymentMethods";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { saveCart } from "@/utils/request";
import axios from "axios";
import { updateCart } from "@/store/cartSlice";
import Footer from "@/components/Footer";

const Cart = () => {
  const { data: session } = useSession();
  const { cart } = useSelector((state) => ({ ...state }));

  console.log(cart);

  const dispatch = useDispatch();
  const Router = useRouter();

  const [selected, setSelected] = useState([]);

  const [shippingFee, setShippingFee] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);

  //Tính giá tiền
  useEffect(() => {
    setShippingFee(() => {
      const newShippingFee = selected?.reduce(
        (a, c) => a + Number(c.shipping),
        0
      );
      return Number(newShippingFee).toFixed(2);
    });

    setSubTotal(() => {
      const newSubTotal = selected?.reduce(
        (a, c) => a + Number(c.price) * c.qty,
        0
      );
      return Number(newSubTotal).toFixed(2);
    });

    setTotal(() => {
      const newTotal = selected?.reduce(
        (a, c) => a + Number(c.shipping) + Number(c.price) * c.qty,
        0
      );
      return Number(newTotal).toFixed(2);
    });
  }, [JSON.stringify(selected)]);

  // Update Cart
  useEffect(() => {
    const update = async () => {
      const { data } = await axios.post("/api/updateCart", {
        products: cart.cartItems,
      });
      dispatch(updateCart(data));
    };
    if (cart.cartItems.length > 0) {
      update();
    }
  }, []);

  //Thêm data vào database sau khi click Continue
  const saveCartToDbHandler = async () => {
    if (session) {
      //Lưu cart vào db
      const res = await saveCart(selected, session.user.id);
      //Chuyển hướng sang trang checkout
      Router.push("/checkout");
    } else {
      signIn();
    }
  };

  return (
    <div>
      <CartHeader text="BACK TO SHOPPING" link="/browse" />
      <div className={styled.cart}>
        <h1>Your shopping cart</h1>
        {cart.cartItems.length > 0 ? (
          <div className={styled.cart__container}>
            <div className={styled.cart__container_left}>
              <Top
                cartItems={cart.cartItems}
                selected={selected}
                setSelected={setSelected}
              />
              <div className={styled.cart__products}>
                {cart.cartItems.map((product) => (
                  <Product
                    key={product._uid}
                    product={product}
                    selected={selected}
                    setSelected={setSelected}
                  />
                ))}
              </div>
            </div>
            <div className={styled.cart__container_right}>
              <Checkout
                shippingFee={shippingFee}
                subTotal={subTotal}
                total={total}
                selected={selected}
                saveCartToDbHandler={saveCartToDbHandler}
              />
              <PaymentMethods />
            </div>
          </div>
        ) : (
          <Empty />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
