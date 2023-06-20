import React from "react";
import Layout from "@/components/Admin/Layout";

import styled from "@/styles/AdminOrder.module.scss";
import CollapsibleTable from "@/components/Admin/Orders/Table";
import db from "@/utils/db";
import { Order } from "@/models/Order";
import { User } from "@/models/User";

export default function OrdersPage({ orders }) {
  return (
    <Layout>
      <div className={styled.header}>Orders</div>
      <CollapsibleTable rows={orders} />
    </Layout>
  );
}

export async function getServerSideProps(ctx) {
  await db.connectDb();

  const orders = await Order.find()
    .populate({ path: "user", model: User, select: "name email image" })
    .sort({ createdAdt: -1 })
    .lean();

  await db.disConnectDb();

  return {
    props: {
      orders: JSON.parse(JSON.stringify(orders)),
    },
  };
}
