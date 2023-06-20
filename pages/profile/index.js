import Layout from "@/components/Profile/Layout";
import { getSession } from "next-auth/react";
import React from "react";

export default function ProfilePage({ user, tab }) {
  return (
    <>
      <Layout session={user.user} tab={tab}></Layout>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const { query, req } = ctx;
  const session = await getSession(ctx);
  const tab = query.tab || 0;

  return {
    props: {
      user: session,
      tab,
    },
  };
}
