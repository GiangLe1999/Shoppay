import { useState } from "react";
import styled from "../styles.module.scss";
import { FaMinus, FaPlus } from "react-icons/fa";
import Size from "./Size";

export default function SizesFilter({ sizes }) {
  const [show, setShow] = useState(true);
  return (
    <div className={styled.filter}>
      <h3>
        Sizes <span>{show ? <FaMinus /> : <FaPlus />}</span>
      </h3>

      {show && (
        <div className={styled.filter__sizes}>
          {sizes.map((size, i) => (
            <Size key={i} size={size} />
          ))}
        </div>
      )}
    </div>
  );
}
