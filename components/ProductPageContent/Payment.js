/* eslint-disable @next/next/no-img-element */
import React from "react";

import styled from "./styles.module.scss";
import NextImage from "../NextImage";

const Payment = () => {
  return (
    <div className={styled.payment}>
      <span>Payment Method</span>
      <div className={styled.payment__images}>
        <div className={styled.payment__image_wrap}>
          <div
            style={{
              width: 65,
              height: 40,
              position: "relative",
            }}
          >
            <NextImage src="/images/payment/visa2.webp" alt="Visa" />
          </div>
        </div>
        <div className={styled.payment__image_wrap}>
          <div
            style={{
              width: 65,
              height: 40,
              position: "relative",
            }}
          >
            <NextImage
              src="/images/payment/master-card2.png"
              alt="Mastercard"
            />
          </div>
        </div>
        <div className={styled.payment__image_wrap}>
          <div
            style={{
              width: 65,
              height: 40,
              position: "relative",
            }}
          >
            <NextImage src="/images/payment/paypal2.png" alt="Paypal" />
          </div>
        </div>
      </div>
      <p>
        <div className={styled.payment__guarantee}>
          Guaranteed by
          <img src="/logo.png" alt="Logo" />
        </div>
        <p className={styled.payment__refund}>3 days return stuffs / refund</p>
      </p>
    </div>
  );
};

export default Payment;
