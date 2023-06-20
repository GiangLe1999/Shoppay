import { FaMinus, FaPlus } from "react-icons/fa";
import { useState } from "react";

import styled from "../styles.module.scss";

export default function Size({ size }) {
  return (
    <div className={styled.filter__sizes_size}>
      <input type="checkbox" name="size" id={size} />
      <label htmlFor={size}>{size}</label>
    </div>
  );
}
