/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import Head from "next/head";
import NextImage from "@/components/NextImage";
import { getSession } from "next-auth/react";
import { Button } from "@mui/material";
import { FaTrash } from "react-icons/fa";

import styled from "@/styles/Profile.module.scss";
import { User } from "@/models/User";
import Layout from "@/components/Profile/Layout";
import { addToCartHandler, priceAfterDiscount } from "@/utils/productUltils";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Popup from "@/components/Popup";
import StyledDotLoader from "@/components/Loaders/DotLoader";
import Link from "next/link";

export default function Wishlist({ user, tab }) {
  const [products, setProducts] = useState(user.wishlist);
  const { cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const removeFromWishlistHandler = (id) => {
    Popup(
      "Are you sure?",
      `This item will be removed from your wishlist.`,
      "question",
      "Yes, remove it!",
      async () => {
        setLoading(true);
        const { data } = await axios.patch(`/api/user/wishlist/${id}`);
        setProducts(data);
        setLoading(false);
      },
      "Succesfully!",
      "Removed item from wishlist successfully."
    );
  };

  return (
    <Layout session={{ name: user.name, image: user.image }} tab={tab}>
      {loading && <StyledDotLoader />}
      <Head>
        <title>Wishlist</title>
      </Head>
      <div className={styled.wishlist}>
        <>
          {products.length > 0 && (
            <div className={styled.header}>
              <h1 className={styled.title}>MY WISHLIST</h1>
            </div>
          )}
          <div className={styled.wishlist__list}>
            {products.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <td>Product</td>
                    <td>Unit price</td>
                    <td>Stock status</td>
                    <td>Add to cart</td>
                  </tr>
                </thead>
                <tbody style={{ position: "relative" }}>
                  {products.map((product, index) => (
                    <tr key={product._id + index}>
                      <td>
                        <div className={styled.wishlist__flex}>
                          <div
                            className={styled.wishlist__products_remove}
                            onClick={() =>
                              removeFromWishlistHandler(product._id)
                            }
                          >
                            <FaTrash />
                          </div>

                          <div className={styled.wishlist__products_images}>
                            <NextImage
                              src={
                                product.product.subProducts[
                                  user.wishlist[index].style
                                ].images[0].url
                              }
                              alt={product.product.name}
                            />
                          </div>

                          <div className={styled.wishlist__products_infos}>
                            <p>
                              <span>Name : </span>
                              <p>
                                {product.product.name.substring(0, 30) + "..."}
                              </p>
                            </p>
                            <p>
                              <span>Style : </span>
                              {product.product.subProducts[
                                user.wishlist[index].style
                              ].image ? (
                                <img
                                  src={
                                    product.product.subProducts[product.style]
                                      .color.image
                                  }
                                  alt=""
                                />
                              ) : (
                                <span
                                  style={{
                                    width: "20px",
                                    height: "20px",
                                    display: "inlineBlock",
                                    background:
                                      product.product.subProducts[product.style]
                                        .color.color,
                                    borderRadius: "50%",
                                  }}
                                ></span>
                              )}
                            </p>
                            <p>
                              <span>Size : </span>
                              {
                                product.product.subProducts[product.style]
                                  .sizes[product.size].size
                              }
                            </p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div
                          className={`${styled.wishlist__flex} ${styled.wishlist__products_price}`}
                        >
                          {product.product.subProducts[product.style].discount >
                          0 ? (
                            <>
                              <span style={{ textDecoration: "line-through" }}>
                                $
                                {
                                  product.product.subProducts[product.style]
                                    .sizes[product.size].price
                                }
                              </span>
                              <span
                                className={styled.wishlist__products_afterPrice}
                              >
                                $
                                {priceAfterDiscount(
                                  product.product.subProducts[product.style]
                                    .sizes[product.size].price,
                                  product.product.subProducts[product.style]
                                    .discount
                                )}
                              </span>
                            </>
                          ) : (
                            <span
                              className={styled.wishlist__products_afterPrice}
                            >
                              $
                              {
                                product.product.subProducts[product.style]
                                  .sizes[product.size].price
                              }
                            </span>
                          )}
                        </div>
                      </td>
                      <td>
                        {product.product.subProducts[product.style].sizes[
                          product.size
                        ].qty > 0
                          ? "In stock"
                          : "Out stock"}
                      </td>
                      <td className={`${styled.btn} ${styled.wishlist__btn}`}>
                        <Button
                          onClick={(e) =>
                            addToCartHandler(
                              e,
                              product.product._id,
                              product.style,
                              product.size,
                              cart,
                              dispatch
                            )
                          }
                          variant="contained"
                        >
                          Add to cart
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className={styled.wishlist__empty}>
                <div className={styled.wishlist__empty_image}>
                  <NextImage src="/images/empty-wishlist-3.webp" />
                </div>
                <p>Your Wishlist is empty!</p>
                <p>Seems like you don&apos;t have wishes here.</p>
                <p>
                  Let&apos;s make a wish at <Link href="/browse">Browse</Link>{" "}
                  page right now!
                </p>
              </div>
            )}
          </div>
        </>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(ctx) {
  const { query, req } = ctx;

  const tab = query.tab || 2;
  const session = await getSession(ctx);
  const user = await User.findById(session.user.id)
    .select("image name wishlist")
    .populate("wishlist.product")
    .lean();

  return {
    props: { user: JSON.parse(JSON.stringify(user)), tab },
  };
}
