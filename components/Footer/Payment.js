import React from "react";

import styled from "./styles.module.scss";
import NextImage from "../NextImage";

const Payment = () => {
  return (
    <div className={styled.footer__payment}>
      <div className={styled.footer__payment_img}>
        <NextImage src="/images/payment/visa2.webp" alt="Visa" />
      </div>
      <div className={styled.footer__payment_img}>
        <NextImage src="/images/payment/master-card2.png" alt="Mastercard" />
      </div>
      <div className={styled.footer__payment_img}>
        <NextImage src="/images/payment/paypal2.png" alt="Paypal" />
      </div>
    </div>
  );
};

export default Payment;
