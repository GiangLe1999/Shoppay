import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";

import styled from "../styles/Checkout.module.scss";
import { User } from "@/models/User";
import db from "@/utils/db";
import Header from "@/components/Cart/Header";
import Products from "@/components/Checkout/Products";
import Shipping from "@/components/Checkout/Shipping";
import Cart from "@/models/Cart";
import PaymentMethods from "@/components/Checkout/PaymentMethods";
import Summary from "@/components/Checkout/Summary";

const Checkout = ({ cart, user }) => {
  const [addresses, setAddresses] = useState(user?.address || []);
  const [selectedAddress, setSelectedAddress] = useState("");

  const [paymentMethod, setPaymentMethod] = useState("");
  const [totalAfterDiscount, setTotalAfterDiscount] = useState("");

  useEffect(() => {
    let check = addresses.find((a) => a.active == true);

    if (check) {
      setSelectedAddress(check);
    } else {
      setSelectedAddress("");
    }
  }, [addresses]);

  return (
    <>
      <Header link="/cart" text="BACK TO CART" />
      <div className={styled.checkout}>
        <div className={styled.checkout__left_side}>
          <Shipping
            user={user}
            addresses={addresses}
            setAddresses={setAddresses}
          />
          <Products cart={cart} />
        </div>
        <div className={styled.checkout__right_side}>
          <PaymentMethods
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
          />
          <Summary
            totalAfterDiscount={totalAfterDiscount}
            setTotalAfterDiscount={setTotalAfterDiscount}
            user={user}
            cart={cart}
            paymentMethod={paymentMethod}
            selectedAddress={selectedAddress}
          />
        </div>
      </div>
    </>
  );
};

export default Checkout;

export async function getServerSideProps(context) {
  db.connectDb();
  const session = await getSession(context);

  //Lấy ra cart data của user
  const user = await User.findById(session?.user.id);
  const cart = await Cart.findOne({ user: user?._id });
  db.disConnectDb();

  //Nếu data cart rỗng, không che phép truy cập trang checkout
  if (!cart) {
    return {
      redirect: {
        destination: "/cart",
      },
    };
  }

  return {
    props: {
      cart: JSON.parse(JSON.stringify(cart)),
      user: JSON.parse(JSON.stringify(user)),
    },
  };
}
