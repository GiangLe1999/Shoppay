import { useState } from "react";

import Create from "@/components/Admin/Coupons/Create";
import List from "@/components/Admin/Coupons/List";
import db from "@/utils/db";
import Layout from "../../../components/Admin/Layout";
import { Coupon } from "@/models/Coupon";

const CategoriesPage = ({ coupons }) => {
  const [data, setData] = useState(coupons);

  return (
    <Layout>
      <Create setCoupons={setData} />
      <List coupons={data} setCoupons={setData} />
    </Layout>
  );
};

export default CategoriesPage;

export async function getServerSideProps(context) {
  await db.connectDb();

  const coupons = await Coupon.find({}).sort({ updatedAt: -1 }).lean();

  return {
    props: {
      coupons: JSON.parse(JSON.stringify(coupons)),
    },
  };
}
