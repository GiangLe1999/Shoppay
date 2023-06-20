import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Category from "@/components/Home/Category";
import FlashDeals from "@/components/Home/FlashDeals";
import Main from "@/components/Home/Main";
import SectionTitle from "@/components/Home/SectionTitle/SectionTitle";
import ProductCard from "@/components/ProductCard";
import ProductsSwiper from "@/components/ProductsSwiper";
import {
  gamingSwiper,
  homeImproveSwiper,
  women_accessories,
  women_dresses,
  women_shoes,
  women_swiper,
} from "@/data/home";
import { Product } from "@/models/Product";
import db from "@/utils/db";
import axios from "axios";
import { useSession } from "next-auth/react";
import { MdReadMore } from "react-icons/md";

import styled from "../styles/Home.module.scss";

export default function Home({ country, products }) {
  return (
    <>
      <Header country={country} />
      <div className={styled.home}>
        <div className={styled.container}>
          <Main />
          <FlashDeals />

          <div className={styled.home__section}>
            <div className={styled.home__section_title}>
              <SectionTitle
                title={"Featured Products"}
                color="#bf323f"
                icon="featured"
              />
            </div>
            <div className={styled.home__products}>
              {products.map((product) => {
                return <ProductCard key={product._id} product={product} />;
              })}
            </div>
          </div>

          <div className={styled.home__section}>
            <SectionTitle title={"For Women"} color="#a03988" icon="women" />
            <div className={styled.home__category}>
              <Category
                header="Dresses"
                products={women_dresses}
                icon="dress"
              />
              <Category
                header="High Heels"
                products={women_shoes}
                icon="heels"
              />
              <Category
                header="Accessories"
                products={women_accessories}
                icon="accessories"
              />
            </div>
            <div>
              <h3 className={styled.home__categoryHeader}>
                More and More
                <MdReadMore />
              </h3>
              <ProductsSwiper products={women_swiper} />
            </div>
          </div>

          <div className={styled.home__section}>
            <div className={styled.home__section_title}>
              <SectionTitle title={"For Gamers"} color="#314385" icon="gamer" />
            </div>
            <ProductsSwiper products={gamingSwiper} />
          </div>

          <div className={styled.home__section}>
            <div className={styled.home__section_title}>
              <SectionTitle
                title={"House Improvements"}
                color="#4b3c2f"
                icon="house"
              />
            </div>
            <ProductsSwiper products={homeImproveSwiper} />
          </div>
        </div>
      </div>
      <Footer country={country} />
      <main></main>
    </>
  );
}

export async function getServerSideProps() {
  db.connectDb();

  //lean method trả về các document dưới dạng plain Object chứ không phải Mongoose document thông thường
  let products = await Product.find().sort({ createdAt: -1 }).lean();

  // let country;
  // try {
  //   let data = await axios.get(
  //     "https://api.ipregistry.co/?key=ng3oke5gnbj5os01"
  //   );
  //   country = data?.data.location?.country;
  // } catch (err) {
  //   console.log(err);
  // }

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      country: {
        name: "Viet Nam",
        flag: "https://cdn.ipregistry.co/flags/emojitwo/vn.svg",
      },
    },
  };
}
