import { useEffect, useState } from "react";
import Head from "next/head";

import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import { SubCategory } from "@/models/SubCategory";
import db from "@/utils/db";
import {
  calculatePercentage,
  findAllSizes,
  priceAfterDiscount,
  sortPricesArr,
} from "@/utils/productUltils";

import styled from "../../styles/Product.module.scss";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import BreadCrumb from "@/components/BreadCrumb";
import MainSwiper from "@/components/ProductPageContent/MainSwiper";
import Infos from "@/components/ProductPageContent/Infos";
import Reviews from "@/components/ProductPageContent/Reviews";
import Payment from "@/components/ProductPageContent/Payment";
import axios from "axios";
import { toast } from "react-toastify";

const ProductPage = ({ product, style, size }) => {
  const [activeImg, setActiveImg] = useState("");
  const [ratings, setRatings] = useState([]);
  const [loadRatings, setLoadRatings] = useState(false);

  let subProduct = product.subProducts[style];

  let prices = sortPricesArr(subProduct.sizes);

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
      ? `$${priceAfterDiscount(
          prices[0],
          subProduct.discount
        )} ~ $${priceAfterDiscount(
          prices?.[prices?.length - 1],
          subProduct.discount
        )}`
      : `$${prices?.[0]} ~ $${prices?.[prices?.length - 1]}`,

    price:
      subProduct?.discount > 0
        ? priceAfterDiscount(subProduct.sizes[size]?.price, subProduct.discount)
        : subProduct.sizes[size].price,
    priceBefore: subProduct.sizes[size].price,
    quantity: subProduct.sizes[size].qty,
    allSizes: findAllSizes(product.subProducts),
  };

  const [images, setImages] = useState(newProduct.images);

  useEffect(() => {
    const fetchRatings = async () => {
      setLoadRatings(true);
      const { data } = await axios.get(`/api/product/${newProduct._id}/review`);
      setRatings([
        { percentage: calculatePercentage(data, 5) },
        { percentage: calculatePercentage(data, 4) },
        { percentage: calculatePercentage(data, 3) },
        { percentage: calculatePercentage(data, 2) },
        { percentage: calculatePercentage(data, 1) },
      ]);
      setLoadRatings(false);
    };

    try {
      fetchRatings();
    } catch (error) {
      setLoadRatings(false);
      toast.error(error.response.data.message);
    }
  }, []);

  useEffect(() => {
    let recentIds = JSON.parse(localStorage.getItem("recent-ids")) || [];
    recentIds.unshift(newProduct._id.toString());
    const uniqueRecentIds = [...new Set(recentIds)];
    localStorage.setItem("recent-ids", JSON.stringify(uniqueRecentIds));
  }, []);

  return (
    <div>
      <Head>
        <title>{newProduct.name}</title>
        <meta name="description" content={newProduct.description} />
      </Head>
      <Header />
      <div className={styled.product}>
        <div className={styled.container}>
          {/* BreadCrumb */}
          <BreadCrumb
            category={newProduct.category.name}
            categoryLink={""}
            subCategories={newProduct.subCategories}
          />

          <main className={styled.product__main}>
            <div className={styled.product__main_column}>
              {/* Product Content: Main image */}
              <MainSwiper images={images} activeImg={activeImg} />
              <Payment />
            </div>

            {/* Product Content: Infos */}
            <Infos
              product={newProduct}
              setActiveImg={setActiveImg}
              setImages={setImages}
            />
          </main>
          <Reviews
            product={newProduct}
            ratings={ratings}
            loadRatings={loadRatings}
          />
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
    .lean();

  await db.disConnectDb();

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
      style,
      size,
    },
  };
}
