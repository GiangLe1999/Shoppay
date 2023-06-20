/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";

import styled from "./styles.module.scss";
import { CgColorPicker } from "react-icons/cg";
import { ColorExtractor } from "react-color-extractor";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Colors({
  product,
  setProduct,
  name,
  colorImage,
  ...props
}) {
  const [colors, setColors] = useState([]);

  const renderSwatches = () => {
    return colors.map((color, id) => {
      return (
        <div className={styled.square__color} key={id}>
          <div
            className={styled.square__color_fill}
            style={{ backgroundColor: color }}
            onClick={() => {
              setProduct({
                ...product,
                color: {
                  color,
                  image: product.color.image,
                },
              });
              toast.success("Choose main color successfully!");
            }}
          ></div>
          <span className={styled.square__color_text} style={{ color: color }}>
            {color}
          </span>
        </div>
      );
    });
  };

  return (
    <div className={styled.colors}>
      <input
        type="text"
        value={product.color.color}
        hidden
        name={name}
        {...props}
      />
      <div className="">
        {colors.length === 0 && (
          <span className={styled.colors__guide}>
            Click Extract Color button{" "}
            <span className={styled.colors__guide_svg}>
              <CgColorPicker />
            </span>
            on Product image to receive colors.
          </span>
        )}
        <ColorExtractor getColors={(colors) => setColors(colors)}>
          <img src={colorImage} style={{ display: "none" }} alt="" />
        </ColorExtractor>
        <div className={styled.wheel}>{renderSwatches()}</div>
      </div>
    </div>
  );
}
