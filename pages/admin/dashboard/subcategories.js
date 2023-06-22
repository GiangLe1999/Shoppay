import React from "react";
import { useState } from "react";

import db from "@/utils/db";
import Layout from "../../../components/Admin/Layout";
import { Category } from "@/models/Category";
import { SubCategory } from "@/models/SubCategory";
import SubCreate from "@/components/Admin/SubCategories/Create";
import SubList from "@/components/Admin/SubCategories/List";

export default function SubCategoriesPage({ categories, subCategories }) {
  const [data, setData] = useState(subCategories);
  return (
    <Layout>
      <SubCreate setSubCategories={setData} categories={categories} />
      <SubList
        subCategories={data}
        setSubCategories={setData}
        categories={categories}
      />
    </Layout>
  );
}

export async function getServerSideProps(context) {
  await db.connectDb();

  const categories = await Category.find({}).sort({ updatedAt: -1 }).lean();
  const subCategories = await SubCategory.find({})
    .populate({ path: "parent", model: Category })
    .lean()
    .sort({ updatedAt: -1 })
    .lean();

  return {
    props: {
      categories: JSON.parse(JSON.stringify(categories)),
      subCategories: JSON.parse(JSON.stringify(subCategories)),
    },
  };
}
