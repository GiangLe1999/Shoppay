/* eslint-disable @next/next/no-img-element */
import React, { useRef } from "react";
import Swal from "sweetalert2";
import { GiExpand } from "react-icons/gi";
import { FiTrash2 } from "react-icons/fi";
import { CgColorPicker } from "react-icons/cg";
import { ImUpload2 } from "react-icons/im";
import { Button } from "@mui/material";

import styled from "./styles.module.scss";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

export default function Images({
  images,
  setImages,
  header,
  text,
  setColorImage,
  ...props
}) {
  const fileInput = useRef(null);

  const handleImages = (e) => {
    let files = Array.from(e.target.files);
    for (let i = 0; i < files.length; i++) {
      if (i == 6) {
        Swal.fire({
          icon: "error",
          title: "Maximum of total 6 images!",
          text: "Please upload 6 or fewer than 6 images.",
        });

        return;
      }

      if (
        files[i].type !== "image/jpeg" &&
        files[i].type !== "image/png" &&
        files[i].type !== "image/webp"
      ) {
        Swal.fire({
          icon: "error",
          title: "Unsupported format!",
          text: `${files[i].name} format is unsupported! Only JPEG, PNG, WEBP are allowed.`,
        });

        //Khi file không thỏa điều kiện, bỏ quả vòng lặp hiện tại để chạy vòng lặp mới
        continue;
      } else if (files[i].size > 1024 * 1024 * 10) {
        Swal.fire({
          icon: "error",
          title: "Too large image!",
          text: `${files[i].name} size is too large, maximum of 10MB allowed.`,
        });

        continue;
      } else {
        const reader = new FileReader();
        reader.readAsDataURL(files[i]);
        reader.onload = (e) => {
          setImages((images) => [...images, e.target.result]);
        };
      }
    }
    if (images.length > 0) {
      toast.success(
        `Upload ${images.length > 1 ? "images" : "image"} successfully!`
      );
    }
  };

  const removeImageHandler = (img) => {
    setImages((images) => images.filter((item) => item !== img));
  };

  return (
    <div className={styled.images}>
      <div className={`${styled.btn} ${styled.images_btn}`}>
        <Button
          variant="contained"
          type="reset"
          startIcon={<ImUpload2 />}
          color="info"
          disabled={images.length === 6}
          style={{ opacity: `${images.length === 6 && "0.5"}` }}
          onClick={() => fileInput.current.click()}
        >
          {text}
        </Button>
      </div>

      <input
        type="file"
        ref={fileInput}
        hidden
        name={props.name}
        multiple
        accept="image/jpeg, image/png, image/webp, image/gif"
        onChange={(e) => handleImages(e)}
      />

      {!images.length ? (
        <div className={styled.images__empty}>
          <img src="/images/no_image.png" alt="" />
        </div>
      ) : (
        <div className={styled.images__main}>
          <div
            className={`${styled.images__main_grid} ${
              images.length == 2
                ? styled.grid__two
                : images.length == 3
                ? styled.grid__three
                : images.length == 4
                ? styled.grid__four
                : images.length == 5
                ? styled.grid__five
                : images.length == 6
                ? styled.grid__six
                : ""
            }`}
          >
            {images.map((img, i) => (
              <div key={i} className={styled.images__main_grid_wrap}>
                <div className={styled.blur}></div>
                <img src={img} alt="" />
                <div className={styled.images__main_grid_actions}>
                  <button onClick={() => removeImageHandler(img)} type="button">
                    <FiTrash2 />
                  </button>
                  <button onClick={() => setColorImage(img)} type="button">
                    <CgColorPicker />
                  </button>
                  <button type="button">
                    <GiExpand />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
