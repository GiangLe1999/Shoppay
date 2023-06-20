/* eslint-disable @next/next/no-img-element */
import React from "react";

import styled from "./styles.module.scss";

const Payment = () => {
  return (
    <div className={styled.payment}>
      <span>Payment Method</span>
      <div className={styled.payment__images}>
        <div className={styled.payment__image}>
          <img src="/images/payment/visa2.webp" alt="Visa" />
        </div>
        <div className={styled.payment__image}>
          <img src="/images/payment/master-card2.png" alt="Mastercard" />
        </div>
        <div className={styled.payment__image}>
          <img src="/images/payment/paypal2.png" alt="Paypal" />
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
