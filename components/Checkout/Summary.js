import { Form, Formik } from "formik";
import { useMemo, useState } from "react";
import * as Yup from "yup";
import Button from "@mui/material/Button";
import { FcApproval } from "react-icons/fc";
import Swal from "sweetalert2";

import styled from "./styles.module.scss";
import ShippingInput from "../Input/ShippingInput";
import { applyCoupon } from "@/utils/request";
import axios from "axios";
import { useRouter } from "next/router";

const Summary = ({
  totalAfterDiscount,
  setTotalAfterDiscount,
  user,
  cart,
  paymentMethod,
  selectedAddress,
}) => {
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState("");
  const [error, setError] = useState("");
  const [orderError, setOrderError] = useState("");

  const Router = useRouter();

  const validateCoupon = Yup.object({
    coupon: Yup.string().required("Please enter a coupon first (if any)"),
  });

  const shipping = useMemo(() => {
    return cart.products.reduce((a, c) => a + c.shipping, 0);
  }, []);

  const applyCouponHandler = async () => {
    const res = await applyCoupon(coupon, user._id);
    if (res.message) {
      setError(res.message);
    } else {
      setTotalAfterDiscount(res.totalAfterDiscount);
      setDiscount(res.discount);
      Swal.fire({
        icon: "success",
        title: "Applied succesfully!",
        text: "Let's place order now with the cheapest price.",
        showConfirmButton: true,
      });
      setError("");
    }
  };

  const placeOrderHandler = async () => {
    try {
      if (paymentMethod == "") {
        Swal.fire({
          icon: "error",
          title: "Failed...",
          text: "Please choose a payment method!",
        });
        return;
      } else if (!selectedAddress) {
        Swal.fire({
          icon: "error",
          title: "Failed...",
          text: "Please choose a shipping address!",
        });
        return;
      }

      const { data } = await axios.post("/api/order/create", {
        products: cart.products,
        shippingAddress: selectedAddress,
        shippingPrice: shipping,
        paymentMethod,
        total:
          discount > 0
            ? totalAfterDiscount + shipping
            : cart.cartTotal + shipping,
        totalBeforeDiscount: cart.cartTotal,
        couponApplied: coupon,
        user_id: user._id,
      });
      Router.push(`/order/${data.order_id}`);
    } catch (error) {
      setOrderError(error.response.data.message);
    }
  };

  return (
    <div className={`${styled.summary} ${styled.card}`}>
      <h2 className={styled.heading}>Order summary</h2>
      <div className={styled.coupon}>
        <Formik
          enableReinitialize
          initialValues={{ coupon }}
          validationSchema={validateCoupon}
          onSubmit={applyCouponHandler}
        >
          {(formik) => (
            <Form>
              <ShippingInput
                required
                id="coupon"
                name="coupon"
                label="Coupon"
                fullWidth
                icon="coupon"
                onChange={(e) => {
                  setCoupon(e.target.value);
                  setError("");
                }}
              />
              {error && <span className={styled.error}>{error}</span>}
              <Button
                type="submit"
                variant="contained"
                className={styled.coupon__submit_btn}
              >
                Apply
              </Button>
            </Form>
          )}
        </Formik>
      </div>

      <div className={styled.summary__infos}>
        {discount > 0 && (
          <div className={styled.summary__infos_couponLine}>
            <span>Coupon applied :</span>
            <span>
              <FcApproval />
              {discount}%
            </span>
          </div>
        )}

        <div className={styled.summary__infos_line}>
          <span>Subtotal : </span>
          <span>${cart.cartTotal}</span>
        </div>

        {totalAfterDiscount < cart.cartTotal && totalAfterDiscount != 0 && (
          <div className={styled.summary__infos_line}>
            <span>New price: </span>
            <span>${totalAfterDiscount}</span>
          </div>
        )}

        <div className={styled.summary__infos_line}>
          <span>Shipping : </span>
          <span>${shipping.toFixed(2)}</span>
        </div>

        <div className={styled.summary__infos_totalLine}>
          <span>Total : </span>
          <span>
            $
            {discount > 0
              ? totalAfterDiscount + shipping
              : cart.cartTotal + shipping}
          </span>
        </div>
      </div>
      <div className={styled.summary__submit_btn} assName="">
        <Button variant="contained" color="error" onClick={placeOrderHandler}>
          Place order
        </Button>
      </div>
    </div>
  );
};

export default Summary;
