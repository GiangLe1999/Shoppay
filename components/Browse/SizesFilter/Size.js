import { FaMinus, FaPlus } from "react-icons/fa";
import { useState } from "react";

import styled from "../styles.module.scss";

export default function Size({ size, existedSize, sizeHandler, check }) {
  return (
    <label
      htmlFor={size}
      className={styled.filter__sizes_size}
      onClick={() => {
        sizeHandler(existedSize ? `${existedSize}_${size}` : size);
      }}
    >
      <input type="checkbox" name="size" id={size} checked={check} />
      <span>Size {size}</span>
    </label>
  );
}
