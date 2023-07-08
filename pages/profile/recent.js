import Layout from "@/components/Profile/Layout";
import { User } from "@/models/User";
import axios from "axios";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { useEffect, useState } from "react";

import styled from "@/styles/Profile.module.scss";
import StyledDotLoader2 from "@/components/Loaders/DotLoader2";
import ProductCard from "@/components/ProductCard";
import { useMediaQuery } from "react-responsive";
import NextImage from "@/components/NextImage";
import Link from "next/link";

function RecentProductsPage({ user, tab }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const isMedium = useMediaQuery({ query: "(max-width: 1023px)" });
  const isLarge = useMediaQuery({ query: "(min-width: 1024px)" });

  const fetchRecentData = async (recentlyIds) => {
    setLoading(true);
    const { data } = await axios.post("/api/product/recent", {
      ids: recentlyIds,
    });
    setLoading(false);
    setProducts(data);
  };

  useEffect(() => {
    try {
      const recentlyIds =
        JSON.parse(localStorage.getItem("recent-ids")).slice(0, 6) || [];
      fetchRecentData(recentlyIds);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <Layout session={{ name: user.name, image: user.image }} tab={tab}>
      <Head>
        <title>Recently viewed products</title>
      </Head>
      <div className={styled.recent}>
        <div>
          {loading && <StyledDotLoader2 loading={loading} />}
          {products.length > 0 && !loading && (
            <>
              <div className={styled.header}>
                <h1 className={styled.title}>Recently view products</h1>
              </div>
              <div className={styled.recent__list}>
                {products.map((product) => (
                  <ProductCard
                    product={product}
                    key={product._id}
                    className={
                      isLarge ? "grid__4" : isMedium ? "grid__3" : "grid__2"
                    }
                  />
                ))}
              </div>
            </>
          )}
          {products.length === 0 && !loading && (
            <div className={styled.wishlist__empty}>
              <div className={styled.wishlist__empty_image2}>
                <NextImage src="/images/search.webp" />
              </div>
              <p>Your recently viewed list is empty!</p>
              <p>Seems like you have not view any products yet.</p>
              <p>
                Let&apos;s view some of our products at{" "}
                <Link href="/browse">Browse</Link> page right now!
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(ctx) {
  const { query, req } = ctx;

  const tab = query.tab || 0;
  const session = await getSession(ctx);
  const user = await User.findById(session.user.id)
    .select("image name")
    .populate("wishlist.product")
    .lean();

  return {
    props: {
      user: JSON.parse(JSON.stringify(user)),
      tab,
    },
  };
}

export default RecentProductsPage;
