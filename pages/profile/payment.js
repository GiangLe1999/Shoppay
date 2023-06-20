import Layout from "@/components/Profile/Layout";
import { getSession } from "next-auth/react";
import React, { useState, useEffect } from "react";

import styled from "@/styles/Profile.module.scss";
import { User } from "@/models/User";
import PaymentMethods from "@/components/Checkout/PaymentMethods";

export default function ProfilePayment({ user, tab, defaultPaymentMethod }) {
  const [dbPM, setDbPM] = useState(defaultPaymentMethod);
  const [paymentMethod, setPaymentMethod] = useState(defaultPaymentMethod);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    setDisabled(!paymentMethod || dbPM == paymentMethod);
  }, [paymentMethod, dbPM]);

  return (
    <>
      <Layout session={user.user} tab={tab}>
        <div className={styled.payment}>
          <PaymentMethods
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            profile
            //Khi default PM giống với lựa chọn hiện tại hoặc khi không lựa chọn PM nào thì Disable button
            disabled={disabled}
            setDisabled={setDisabled}
            setDbPM={setDbPM}
          />
        </div>
      </Layout>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const { query, req } = ctx;
  const session = await getSession(ctx);
  const tab = query.tab || 0;

  const user = await User.findById(session.user.id).select(
    "defaultPaymentMethod"
  );

  return {
    props: {
      user: session,
      tab,
      defaultPaymentMethod: JSON.parse(
        JSON.stringify(user.defaultPaymentMethod)
      ),
    },
  };
}
