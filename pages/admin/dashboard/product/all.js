import styled from "@/styles/AllProducts.module.scss";
import Layout from "@/components/Admin/Layout";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import db from "@/utils/db";
import ProductCard from "@/components/Admin/AllProducts/ProductCard";
import ProductItem from "@/components/Admin/AllProducts/ProductItem";
import { useMemo } from "react";

export default function AllProductsPage({ products }) {
  const statistics = useMemo(() => {
    const subProductsSizes = products.map((p) =>
      p.subProducts.map((s) => s.sizes).flat()
    );

    const itemQty = subProductsSizes.flat().length;

    const outStock = subProductsSizes.filter(
      (o) => o.reduce((a, c) => a + c.qty, 0) == 0
    );

    const productCategories = products.map((p) => p.category._id);
    const productUniqueCategories = [...new Set(productCategories)];

    return { itemQty, outStock, productUniqueCategories };
  }, [products]);

  return (
    <Layout>
      <div className={styled.header}>All products</div>

      {/* Statistics */}
      <div className={styled.products__stats}>
        <div className={styled.products__stats_item}>
          <span>Total products</span>
          <span>{products.length}</span>
        </div>

        <div className={styled.products__stats_item}>
          <span>Out of stock</span>
          <span>{statistics.outStock.length}</span>
        </div>

        <div className={styled.products__stats_item}>
          <span>Total item</span>
          <span>{statistics.itemQty}</span>
        </div>

        <div className={styled.products__stats_item}>
          <span>Categories</span>
          <span>{statistics.productUniqueCategories.length}</span>
        </div>
      </div>

      {/* Table */}
      <div className={styled.products__table}>
        <table className={styled.list}>
          <thead>
            <th>Product name</th>
            <th>Category</th>
            <th>Styles</th>
            <th>Inventory</th>
            <th>Date added</th>
          </thead>
          <tbody>
            {products?.map((product) => (
              <ProductItem key={product._id} product={product} />
            ))}
          </tbody>
        </table>
      </div>

      <div className={styled.header}>products & styles</div>
      {/* Swiper */}
      <div className={styled.products_swiper}>
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  await db.connectDb();

  const products = await Product.find({})
    .populate({ path: "category", model: Category })
    .sort({ createdAt: -1 })
    .lean();

  await db.disConnectDb();

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
