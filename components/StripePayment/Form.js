import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { Button } from "@mui/material";
import Swal from "sweetalert2";

import styled from "./styles.module.scss";
import axios from "axios";

const CARD_OPTIONS = {
  iconStyle: "solid",

  style: {
    base: {
      fontSize: "16px",
    },
  },
};

const Form = ({ order_id, total }) => {
  const [error, setError] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  const submitHandler = async (e) => {
    e.preventDefault();

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (!error) {
      try {
        const { id } = paymentMethod;

        const res = await axios.post(`/api/order/${order_id}/payWithStripe`, {
          amount: total,
          id,
        });
        if (res.data.success) {
          Swal.fire({
            icon: "success",
            title: "Successfully!",
            text: "We'll deliver the package to you as soon as possible.",
            confirmButtonText: "Ok",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload(false);
            }
          });
        }
      } catch (error) {
        setError(error);
      }
    } else {
      setError(error.message);
    }
  };

  return (
    <>
      <form onSubmit={submitHandler} className={styled.stripe}>
        <CardElement options={CARD_OPTIONS} />
        <Button variant="contained" type="submit" className={styled.submitBtn}>
          PAY NOW
        </Button>
        {error && <span className={styled.error}>{error}</span>}
      </form>
    </>
  );
};

export default Form;
