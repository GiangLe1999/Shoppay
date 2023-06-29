import { useState } from "react";
import { Button, Rating } from "@mui/material";

import styled from "./styles.module.scss";
import "react-toastify/dist/ReactToastify.css";
import Select from "./Select";
import Images from "./Images";
import FullWidthTextField from "./Input";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import dataURItoBlob from "@/utils/dataURItoBlob";
import { uploadHandler } from "@/utils/request";
import axios from "axios";
import { toast } from "react-toastify";
import StyledDotLoader from "@/components/Loaders/DotLoader";

let fits = ["Small", "True to Size", "Large"];

const AddReview = ({ product, setReviews }) => {
  const [size, setSize] = useState("");
  const [style, setStyle] = useState("");
  const [fit, setFit] = useState("");
  const [enteredFeature, setEnteredFeature] = useState("");
  const [enteredQuality, setEnteredQuality] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState("");
  const [images, setImages] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    let uploaded_images = [];

    if (!size) {
      Swal.fire({
        icon: "error",
        title: "Found no size!",
        text: "Please select a size of the product.",
      });
      return;
    } else if (!style) {
      Swal.fire({
        icon: "error",
        title: "Found no style!",
        text: "Please select a style of the product.",
      });
      return;
    } else if (!fit) {
      Swal.fire({
        icon: "error",
        title: "Found no fit!",
        text: "Please select a fit of the product.",
      });
      return;
    } else if (!enteredFeature) {
      Swal.fire({
        icon: "error",
        title: "How about outstanding features?",
        text: "Please mention at least one outstand feature of the product.",
      });
      return;
    } else if (!enteredQuality) {
      Swal.fire({
        icon: "error",
        title: "How about the quality?",
        text: "Please provide your comment about quality of the product.",
      });
      return;
    } else if (!review) {
      Swal.fire({
        icon: "error",
        title: "What is your thought about this product?",
        text: "Please provide some lines of your thought about the product.",
      });
      return;
    } else if (!rating) {
      Swal.fire({
        icon: "error",
        title: "What is your rating?",
        text: "Please provide your rating of the product.",
      });
      return;
    } else {
      setLoading(true);

      if (images.length > 0) {
        let temp = images.map((img) => dataURItoBlob(img));
        const path = "reviews images";
        let formData = new FormData();
        formData.append("path", path);
        temp.forEach((img) => formData.append("file", img));
        uploaded_images = await uploadHandler(formData);
      }

      try {
        const { data } = await axios.put(`/api/product/${product._id}/review`, {
          size,
          style,
          fit,
          feature: enteredFeature,
          quality: enteredQuality,
          review,
          rating,
          images: uploaded_images,
        });

        if (data) {
          setStyle("");
          setSize("");
          setFit("");
          setEnteredFeature("");
          setEnteredQuality("");
          setReview("");
          setImages([]);
          setRating("");

          setReviews(data.reviews);
          setLoading(false);
          toast.success("Add review successfully!");
        }
      } catch (error) {
        setLoading(false);
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <>
      {loading && <StyledDotLoader />}
      <div className={styled.reviews__add}>
        <div className={styled.reviews__add_wrap}>
          <div className={styled.reviews__add_select}>
            <Select
              size={size}
              text="Size"
              data={product.allSizes.filter((s) => s !== size)}
              sizeChangeHandler={setSize}
            />
            <Select
              style={style}
              text="Style"
              data={product.colors.filter((c) => c !== style)}
              styleChangeHandler={setStyle}
            />
            <Select
              fit={fit}
              text="How does it fit"
              data={fits.filter((f) => f !== fit)}
              fitChangeHandler={setFit}
            />
          </div>
          <Images images={images} setImages={setImages} />
          <div className={styled.reviews__add_flex}>
            <FullWidthTextField
              setValue={setEnteredFeature}
              label="Outstanding features"
              id="features"
              value={enteredFeature}
            />
            <FullWidthTextField
              setValue={setEnteredQuality}
              label="Quality of product"
              id="quality"
              value={enteredQuality}
            />
          </div>

          <FullWidthTextField
            setValue={setReview}
            label="Your review"
            id="review"
            multiline
            rows={1}
            value={review}
          />
          <div className={styled.reviews__add_rating}>
            <span>Your rating:</span>
            <Rating
              name="half-rating-red"
              defaultValue={0}
              value={rating}
              precision={0.5}
              onChange={(e) => setRating(e.target.value)}
            />
          </div>
          <div className={styled.submit_btn}>
            <Button variant="contained" type="submit" onClick={submitHandler}>
              Submit review
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddReview;
