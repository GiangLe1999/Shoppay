import Create from "@/components/Admin/Categories/Create";
import List from "@/components/Admin/Categories/List";
import { Category } from "@/models/Category";
import db from "@/utils/db";
import { useState } from "react";
import Layout from "../../../components/Admin/Layout";

const CategoriesPage = ({ categories }) => {
  const [data, setData] = useState(categories);

  return (
    <Layout>
      <Create setCategories={setData} />
      <List categories={data} setCategories={setData} />
    </Layout>
  );
};

export default CategoriesPage;

export async function getServerSideProps(context) {
  await db.connectDb();

  const categories = await Category.find({}).sort({ updatedAt: -1 }).lean();

  return {
    props: {
      categories: JSON.parse(JSON.stringify(categories)),
    },
  };
}
