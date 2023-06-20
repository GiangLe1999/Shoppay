import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import { SubCategory } from "@/models/SubCategory";
import db from "@/utils/db";
import Head from "next/head";

import styled from "../../styles/Product.module.scss";
import BreadCrumb from "@/components/BreadCrumb";
import MainSwiper from "@/components/ProductPageContent/MainSwiper";
import { useState } from "react";
import Infos from "@/components/ProductPageContent/Infos";
import Reviews from "@/components/ProductPageContent/Reviews";
import { User } from "@/models/User";
import Payment from "@/components/ProductPageContent/Payment";

const ProductPage = ({ product }) => {
  const [activeImg, setActiveImg] = useState("");
  const [images, setImages] = useState(product.images);
  return (
    <div>
      <Head>
        <title>{product.name}</title>
        <meta name="description" content={product.description} />
      </Head>
      <Header />
      <div className={styled.product}>
        <div className={styled.container}>
          {/* BreadCrumb */}
          <BreadCrumb
            category={product.category.name}
            categoryLink={""}
            subCategories={product.subCategories}
          />

          <main className={styled.product__main}>
            <div className={styled.product__main_column}>
              {/* Product Content: Main image */}
              <MainSwiper images={images} activeImg={activeImg} />
              <Payment />
            </div>

            {/* Product Content: Infos */}
            <Infos
              product={product}
              setActiveImg={setActiveImg}
              setImages={setImages}
            />
          </main>
          <Reviews product={product} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductPage;

export async function getServerSideProps(context) {
  const { query } = context;
  const slug = query.slug;
  const style = query.style;
  const size = query.size || 0;

  await db.connectDb();
  let product = await Product.findOne({ slug })
    //path là property category cần điền thông tin
    .populate({ path: "category", model: Category })
    .populate({ path: "subCategories", model: SubCategory })
    .populate({ path: "reviews.reviewBy", model: User })
    .lean();
  let subProduct = product.subProducts[style];
  let prices = subProduct?.sizes.map((s) => s.price).sort((a, b) => a - b);

  function calculatePercentage(num) {
    const nums = product.reviews.filter(
      (r) => r.rating == num || r.rating == num - 0.5
    );
    return ((nums.length / product.numReviews) * 100).toFixed(1);
  }

  let newProduct = {
    ...product,
    style,
    images: subProduct?.images,
    sizes: subProduct?.sizes,
    discount: subProduct?.discount,
    sku: subProduct?.sku,
    colors: product.subProducts.map((p) => {
      if (p.color.image && p.color.color) {
        return { colorImg: p.color.image, color: p.color.color };
      } else {
        return { color: p.color.color };
      }
    }),
    priceRange: subProduct?.discount
      ? `$${prices[0] - (prices?.[0] * subProduct.discount) / 100} ~ $${
          prices?.[prices?.length - 1] -
          (prices?.[prices?.length - 1] * subProduct.discount) / 100
        }`
      : `$${prices?.[0]} ~ $${prices?.[prices?.length - 1]}`,

    price:
      subProduct?.discount > 0
        ? (
            subProduct.sizes[size].price -
            (subProduct.sizes[size].price * subProduct.discount) / 100
          ).toFixed(2)
        : subProduct.sizes[size].price,
    priceBefore: subProduct.sizes[size].price,
    quantity: subProduct.sizes[size].qty,
    ratings: [
      { percentage: calculatePercentage(5) },
      { percentage: calculatePercentage(4) },
      { percentage: calculatePercentage(3) },
      { percentage: calculatePercentage(2) },
      { percentage: calculatePercentage(1) },
    ],
    allSizes: product.subProducts
      .map((p) => p.sizes)
      .flat()
      .sort((a, b) => a.size - b.size)
      .filter((e, i, a) => a.findIndex((e2) => e2.size === e.size) === i),
  };

  await db.disConnectDb();

  return {
    props: {
      product: JSON.parse(JSON.stringify(newProduct)),
    },
  };
}
