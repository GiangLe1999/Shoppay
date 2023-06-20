import { useState } from "react";
import styled from "../styles.module.scss";
import { FaMinus, FaPlus } from "react-icons/fa";

export default function StylesFilter({ styles }) {
  const [show, setShow] = useState(true);
  return (
    <div className={styled.filter}>
      <h3>
        Styles <span>{show ? <FaMinus /> : <FaPlus />}</span>
      </h3>

      {show && (
        <div className={styled.filter__sizes}>
          {styles.map((style, i) => (
            <div className={styled.filter__sizes_size} key={i}>
              <input type="checkbox" name="style" id={style} />
              <label htmlFor={style}>{style}</label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
