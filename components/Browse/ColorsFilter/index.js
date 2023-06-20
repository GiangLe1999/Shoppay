import { useState } from "react";
import styled from "../styles.module.scss";
import { FaMinus, FaPlus } from "react-icons/fa";

export default function ColorsFilter({ colors }) {
  const [show, setShow] = useState(true);
  return (
    <div className={styled.filter}>
      <h3>
        Colors <span>{show ? <FaMinus /> : <FaPlus />}</span>
      </h3>

      {show && (
        <div className={styled.filter__colors}>
          {colors.map((color, i) => (
            <button style={{ background: `${color}` }} key={i}></button>
          ))}
        </div>
      )}
    </div>
  );
}
