import { getSession } from "next-auth/react";
import React, { useState } from "react";

import styled from "@/styles/Profile.module.scss";
import Shipping from "@/components/Checkout/Shipping";
import Layout from "@/components/Profile/Layout";
import { User } from "@/models/User";

export default function ProfileAddresses({ user, tab }) {
  const [addresses, setAddresses] = useState(user.address.address || []);
  return (
    <>
      <Layout session={user.user} tab={tab}>
        <div className={styled.shipping}>
          <Shipping
            user={user}
            addresses={addresses}
            setAddresses={setAddresses}
            profile
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

  const address = await User.findById(session.user.id).select("address").lean();

  return {
    props: {
      user: {
        user: session.user,
        address: JSON.parse(JSON.stringify(address)),
      },
      tab,
    },
  };
}
