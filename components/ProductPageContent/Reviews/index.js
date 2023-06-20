import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import React from "react";
import Ratings from "../../Ratings";
import AddReview from "./AddReview";

import styled from "./styles.module.scss";
import Table from "./Table";

const Reviews = ({ product }) => {
  const { data: session } = useSession();
  const [reviews, setReviews] = useState(product.reviews);

  return (
    <div className={styled.reviews}>
      <div className={styled.reviews__container}>
        <h3>Customer&apos;s average rating ({product.reviews.length} votes)</h3>
        <div className={styled.reviews__stats}>
          <div className={styled.reviews__stats_overview}>
            <div className={styled.reviews__stats_overview_rating}>
              <span>Avarage rating:</span>
              <Ratings defaultRating={product.rating} />
              <b>
                {product.rating === 0
                  ? "No review yet."
                  : product.rating.toFixed(2)}
              </b>
            </div>
          </div>
          <div className={styled.reviews__stats_reviews}>
            {product.ratings.map((rating, index) => {
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
                  <span className={styled.percent}>{rating.percentage}%</span>
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
            <button className={styled.login_btn} onClick={() => signIn()}>
              Login to add a review
            </button>
          )}
        </div>

        <h3>What are they talking about this product?</h3>
        <Table
          reviews={reviews}
          allSizes={product.allSizes}
          colors={product.colors}
        />
      </div>
    </div>
  );
};

export default Reviews;
