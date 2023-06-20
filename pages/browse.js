import Link from "next/link";
import React from "react";
import { Button } from "@mui/material";

import styled from "@/styles/Browse.module.scss";
import db from "@/utils/db";
import { Product } from "@/models/Product";
import { Category } from "@/models/Category";
import { SubCategory } from "@/models/SubCategory";
import { filterArray, randomize, removeDuplicates } from "@/utils/arrayUltils";
import Header from "@/components/Header";
import BreadCrumb from "@/components/BreadCrumb";
import ProductCard from "@/components/ProductCard";
import CategoryFilter from "@/components/Browse/CategoryFilter";
import SizesFilter from "@/components/Browse/SizesFilter";
import ColorsFilter from "@/components/Browse/ColorsFilter";
import BrandsFilter from "@/components/Browse/BrandsFilter";
import StylesFilter from "@/components/Browse/StylesFilter";
import PatternsFilter from "@/components/Browse/PatternsFilter";
import MaterialsFilter from "@/components/Browse/MaterialsFilter";
import GenderFilter from "@/components/Browse/GenderFilter";
import HeadingFilters from "@/components/Browse/HeadingFilters";
import { useRouter } from "next/router";

export default function BrowsePage({
  categories,
  products,
  subCategories,
  sizes,
  colors,
  brands,
  styles,
  patterns,
  materials,
}) {
  const router = useRouter();

  const filter = ({ search, category, brand, style }) => {
    const path = router.pathname;
    if (search) router.query.search = search;
    if (category) router.query.category = category;
    if (brand) router.query.brand = brand;
    if (style) router.query.style = style;

    router.push({ pathname: path, query: router.query });
  };

  const searchHandler = (search) => {
    if (search == "") {
      filter({ search: "" });
    } else {
      filter({ search });
    }
  };

  const categoryHandler = (category) => {
    filter({});
  };

  return (
    <div className={styled.browse}>
      <Header searchHandler={searchHandler} />
      <div className={styled.browse__container}>
        <div className={styled.browse__path}>
          <BreadCrumb
            category={"Browse"}
            categoryLink="/browse"
            subCategories={[]}
          />
        </div>

        <div className={styled.browse__tags}>
          {categories.map((c) => (
            <Link href="" key={c._id}>
              {c.name}
            </Link>
          ))}
        </div>

        <div className={styled.browse__store}>
          <div
            className={`${styled.browse__store_filters} ${styled.scrollbar}`}
          >
            <div className={styled.browse__clearBtn}>
              <Button variant="contained">Clear All (3)</Button>
            </div>

            <CategoryFilter
              categories={categories}
              subCategories={subCategories}
            />

            <SizesFilter sizes={sizes} />

            <ColorsFilter colors={colors} />

            <BrandsFilter brands={brands} />

            <StylesFilter styles={styles} />

            <PatternsFilter patterns={patterns} />

            <MaterialsFilter materials={materials} />

            <GenderFilter />
          </div>
          <div className={styled.browse__store_products_wrap}>
            <HeadingFilters />
            <div className={styled.browse__store_products}>
              {products.map((product) => (
                <ProductCard product={product} key={product._id} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  await db.connectDb();

  const searchQuery = ctx.query.search || "";
  const categoryQuery = ctx.query.category || "";

  const searchOptions =
    searchQuery && searchQuery.trim().length > 0
      ? { name: { $regex: searchQuery, $options: "i" } }
      : {};

  const categoryOptions =
    categoryQuery && categoryQuery.trim().length > 0
      ? { category: categoryQuery }
      : {};

  await db.disConnectDb();

  let productsDb = await Product.find({ ...searchOptions, ...categoryOptions })
    .sort({ createdAt: -1 })
    .lean();
  //Dùng hàm helper randomize để random mảng productsDb
  let products = randomize(productsDb);

  let categories = await Category.find().lean();
  let subCategories = await SubCategory.find()
    .populate({ path: "parent", model: Category })
    .lean();

  //Dùng distinct để nhận về mảng chỉ chứa các value tương ứng với key
  let colors = await Product.find().distinct("subProducts.color.color");
  let brandsDb = await Product.find().distinct("brand");
  let sizes = await Product.find().distinct("subProducts.sizes.size");
  let details = await Product.find().distinct("details");

  //Sử dụng hàm helper filterArray lọc ra toàn bộ value của các Object Details
  let stylesDb = filterArray(details, "Style");
  let patternsDb = filterArray(details, "Pattern Type");
  let materialsDb = filterArray(details, "Material");

  //Các kết quả lọc ra phía trên sẽ bị trùng lặp nhau
  //Ta cần remove các duplicate value bằng hàm helper removeDuplicates
  let styles = removeDuplicates(stylesDb);
  let patterns = removeDuplicates(patternsDb);
  let brands = removeDuplicates(brandsDb);
  let materials = removeDuplicates(materialsDb);

  return {
    props: {
      categories: JSON.parse(JSON.stringify(categories)),
      subCategories: JSON.parse(JSON.stringify(subCategories)),
      products: JSON.parse(JSON.stringify(products)),
      sizes,
      colors,
      brands,
      styles,
      patterns,
      materials,
    },
  };
}
