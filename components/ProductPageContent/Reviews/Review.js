/* eslint-disable @next/next/no-img-element */
import Ratings from "@/components/Ratings";
import prettyDate from "@/lib/date";
import { AiTwotoneLike } from "react-icons/ai";
import { useMediaQuery } from "react-responsive";

import styled from "./styles.module.scss";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import NextImage from "@/components/NextImage";

const Review = ({ review, setReviews }) => {
  const isMedium = useMediaQuery({ query: "(max-width: 926px)" });
  const isSmall = useMediaQuery({ query: "(max-width: 506px)" });
  const { data: session } = useSession();
  const [liked, setLiked] = useState(false);

  const likeHandler = async () => {
    try {
      const { data } = await axios.post(`/api/review/${review._id}`);
      setReviews(data);
      setLiked(true);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (!session) return;
    if (review.likes.length > 0) {
      const liked = review.likes.find(
        (user) => user.toString() === session.user.id
      );
      if (liked) {
        setLiked(true);
      }
    }
  }, []);

  return (
    <div className={styled.review}>
      <div className={styled.review__wrap}>
        <div className={styled.review__detail}>
          <div className={styled.review__detail_ava}>
            <img src={review.reviewBy?.image} alt="" />
          </div>

          <div className={styled.review__detail_infos}>
            <p>{review.reviewBy?.name}</p>
            <div className={styled.review__detail_rating}>
              <Ratings defaultRating={review.rating} value={review.rating} />
            </div>

            <div className={styled.review__detail_date}>
              <span>Rating time : </span>
              &nbsp;
              {!isSmall
                ? prettyDate(review.updatedAt)
                : new Date(review.updatedAt).toLocaleDateString("en-US")}
              {!isMedium && (
                <>
                  &nbsp;&nbsp;&nbsp;| &nbsp;&nbsp;
                  <span>Overall fit : </span>&nbsp;
                  {review.fit} &nbsp;&nbsp;| &nbsp;&nbsp;
                  <span>Size : </span>
                  &nbsp;
                  {review.size}
                  &nbsp;&nbsp;| &nbsp;&nbsp;
                  <span>Style : </span>&nbsp;&nbsp;
                  {review.style.colorImg ? (
                    <img src={review.style.colorImg} alt="" />
                  ) : (
                    <span
                      style={{
                        background: review.style.color,
                        width: 35,
                        height: 35,
                        display: "inline-block",
                        borderRadius: "50%",
                      }}
                    ></span>
                  )}
                </>
              )}
            </div>

            {isMedium && !isSmall && (
              <div className={styled.review__detail_date}>
                <span>Overall fit : </span>&nbsp;
                {review.fit} &nbsp;&nbsp;| &nbsp;&nbsp;<span>Size : </span>
                &nbsp;
                {review.size}
                &nbsp;&nbsp;| &nbsp;&nbsp;
                <span>Style : </span>&nbsp;&nbsp;
                {review.style.colorImg ? (
                  <img src={review.style.colorImg} alt="" />
                ) : (
                  <span
                    style={{
                      background: review.style.color,
                      width: 35,
                      height: 35,
                      display: "inline-block",
                      borderRadius: "50%",
                    }}
                  ></span>
                )}
              </div>
            )}

            <div className={styled.review__head}>
              <p>
                <span>Outstanding feature: </span>
                {review.feature}
              </p>
              <p>
                <span>Quality of product: </span>
                {review.quality}
              </p>
              <p>
                <span>More detail: </span>&nbsp;
                {review.review}
              </p>
              <p>
                <span>Actual images: </span>&nbsp;
                {review.images.length === 0 ? (
                  "No actual image"
                ) : (
                  <div className={styled.review__images}>
                    {review.images.length > 0 &&
                      review.images.map((img, index) => (
                        <div className={styled.review__image} key={index}>
                          <NextImage src={img?.url} alt="" />
                        </div>
                      ))}
                  </div>
                )}
              </p>
            </div>

            <div className={styled.review__likes_count}>
              {review.likes.length === 0
                ? "Be the first person to like this review!"
                : `${
                    review.likes.length > 1
                      ? `${review.likes.length} people have`
                      : "1 person has"
                  } liked this review!`}
            </div>
          </div>
          <div className={styled.review__likes}>
            <Button variant="contained" onClick={likeHandler} disabled={liked}>
              {review.likes && review.likes?.likes}
              <AiTwotoneLike />
              {liked ? "Liked" : "Like"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
