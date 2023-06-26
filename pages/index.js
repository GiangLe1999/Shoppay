import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Main from "@/components/Home/Main";

import { Product } from "@/models/Product";
import db from "@/utils/db";

import styled from "../styles/Home.module.scss";
import AllProducts from "@/components/Home/AllProducts";

export default function Home({
  country,
  products,
  flashDeals,
  featuredProducts,
  freeShippingProducts,
}) {
  return (
    <>
      <Header country={country} />
      <div className={styled.home}>
        <div className={styled.container}>
          <Main
            flashDeals={flashDeals}
            featuredProducts={featuredProducts}
            freeShippingProducts={freeShippingProducts}
          />
          <AllProducts products={products} />
        </div>
      </div>
      <Footer country={country} />
    </>
  );
}

export async function getServerSideProps() {
  await db.connectDb();

  //lean method trả về các document dưới dạng plain Object chứ không phải Mongoose document thông thường
  let products = await Product.find().sort({ createdAt: -1 }).lean();

  //Lọc mảng gồm các subProduct có discout cho Component FlashDeals
  const leanProducts = products.map((p) => ({
    parentId: p._id,
    name: p.name,
    slug: p.slug,
    subProducts: p.subProducts,
  }));

  const flashDealsArray = [];
  leanProducts.forEach((p) => {
    for (let i = 0; i < p.subProducts.length; i++) {
      if (p.subProducts[i].discount > 0) {
        const childProduct = {
          name: p.name,
          slug: `${p.slug}?style=${i}`,
          ...p.subProducts[i],
          parentId: p.parentId,
          style: i,
        };

        flashDealsArray.push(childProduct);
      }
    }
  });

  // const featuredProducts = await Product.find()
  //   .sort({ rating: -1, "subProducts.sold": -1 })
  //   .lean();

  const featuredProducts = products
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 10);

  const freeShippingProducts = products
    .filter((p) => p.shipping === 0)
    .slice(0, 10);

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
      flashDeals: JSON.parse(JSON.stringify(flashDealsArray)),
      featuredProducts: JSON.parse(JSON.stringify(featuredProducts)),
      freeShippingProducts: JSON.parse(JSON.stringify(freeShippingProducts)),
      country: {
        name: "Viet Nam",
        flag: "https://cdn.ipregistry.co/flags/emojitwo/vn.svg",
      },
    },
  };
}
