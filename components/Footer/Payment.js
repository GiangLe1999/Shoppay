/* eslint-disable @next/next/no-img-element */
import React from "react";

import styled from "./styles.module.scss";

const Payment = () => {
  return (
    <div className={styled.footer__payment}>
      <div className={styled.footer__flexwrap}>
        <img src="/images/payment/visa.webp" alt="Visa" />
        <img src="/images/payment/mastercard.webp" alt="Mastercard" />
        <img src="/images/payment/paypal.webp" alt="Paypal" />
      </div>
    </div>
  );
};

export default Payment;
