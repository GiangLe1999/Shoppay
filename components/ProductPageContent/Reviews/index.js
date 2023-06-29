import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import React from "react";
import Ratings from "../../Ratings";
import AddReview from "./AddReview";

import styled from "./styles.module.scss";
import Table from "./Table";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@mui/material";

const Reviews = ({ product, ratings }) => {
  const { data: session } = useSession();
  const [reviews, setReviews] = useState([]);
  const [filter, setFilter] = useState({
    rating: "",
    size: "",
    style: {},
    order: "",
  });

  useEffect(() => {
    try {
      const fetchReviews = async () => {
        const data = await axios.get(`/api/product/${product._id}/review`);
        setReviews(data.data);
      };

      fetchReviews();
    } catch (error) {
      toast.error(error.response?.data.message);
    }
  }, []);

  useEffect(() => {
    try {
      const filters = async () => {
        const { data } = await axios.post(
          `/api/product/${product._id}/review`,
          {
            filter: filter,
          }
        );
        setReviews(data);
      };

      if (
        filter.rating ||
        filter.size ||
        Object.keys(filter.style).length > 0 ||
        filter.order
      ) {
        filters();
      }
    } catch (error) {
      toast.error(error.response?.data.message);
    }
  }, [filter]);

  return (
    <div className={styled.reviews}>
      <div className={styled.reviews__container}>
        <h3>Customer&apos;s average rating ({product.numReviews} votes)</h3>
        <div className={styled.reviews__stats}>
          <div className={styled.reviews__stats_overview}>
            <div className={styled.reviews__stats_overview_rating}>
              <span>Avarage rating:</span>
              <Ratings defaultRating={product.rating} />
              <b>
                {product.rating === 0
                  ? "No review yet"
                  : product.rating.toFixed(2)}
              </b>
            </div>
          </div>

          <div className={styled.reviews__stats_reviews}>
            {ratings.map((rating, index) => {
              return (
                <div
                  className={styled.reviews__stats_reviews_review}
                  key={index}
                >
                  <div className={styled.stars}>
                    <Ratings defaultRating={5 - index} />
                  </div>
                  <div className={styled.bar}>
                    <div
                      className={styled.bar__inner}
                      style={{ width: `${rating.percentage}%` }}
                    ></div>
                  </div>
                  <span className={styled.percent}>
                    {rating.percentage !== "NaN" ? rating.percentage : 0}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <h3>Add your own reviews</h3>
        <div className={styled.reviews__form}>
          {session ? (
            <AddReview product={product} setReviews={setReviews} />
          ) : (
            <div className={styled.login_btn}>
              <Button variant="contained" onClick={() => signIn()}>
                Login to add a review
              </Button>
            </div>
          )}
        </div>

        <h3>What are they talking about this product?</h3>
        <Table
          reviews={reviews}
          allSizes={product.allSizes}
          colors={product.colors}
          filter={filter}
          setFilter={setFilter}
          setReviews={setReviews}
        />
      </div>
    </div>
  );
};

export default Reviews;
