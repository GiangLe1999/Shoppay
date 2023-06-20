import React, { useRef } from "react";
import { toast } from "react-toastify";

import styled from "./styles.module.scss";
import "react-toastify/dist/ReactToastify.css";

export default function Styles({ product, setProduct, colorImage, ...props }) {
  const fileInput = useRef(null);

  const handleImages = (e) => {
    let file = e.target.files[0];
    if (
      file.type !== "image/jpeg" &&
      file.type !== "image/png" &&
      file.type !== "image/webp"
    ) {
      Swal.fire({
        icon: "error",
        title: "Unsupported format!",
        text: `${file.name} format is unsupported! Only JPEG, PNG, WEBP are allowed.`,
      });
    } else if (file.size > 1024 * 1024 * 10) {
      Swal.fire({
        icon: "error",
        title: "Too large image!",
        text: `${file.name} size is too large, maximum of 10MB allowed.`,
      });
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        let obj = {
          color: product.color.color,
          image: e.target.result,
        };
        setProduct({ ...product, color: obj });
        toast.success(
          "Upload Color image successfully. Let's do the next step."
        );
      };
    }
  };

  const removeImageHandler = (img) => {};

  return (
    <div>
      <div className={styled.sizes__guide}>
        <span>
          Or click{" "}
          <button type="button" onClick={() => fileInput.current.click()}>
            here
          </button>{" "}
          to upload Color image
        </span>
      </div>
      <input
        type="file"
        ref={fileInput}
        hidden
        name="colorImageInput"
        accept="image/jpeg, image/png, image/webp, image/gif"
        onChange={(e) => handleImages(e)}
      />
    </div>
  );
}
