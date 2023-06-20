import { useState } from "react";
import styled from "../styles.module.scss";
import { FaMinus, FaPlus } from "react-icons/fa";

export default function MaterialsFilter({ materials }) {
  const [show, setShow] = useState(true);
  return (
    <div className={styled.filter}>
      <h3>
        Patterns <span>{show ? <FaMinus /> : <FaPlus />}</span>
      </h3>

      {show && (
        <div className={styled.filter__sizes}>
          {materials.map((material, i) => (
            <div className={styled.filter__sizes_size} key={i}>
              <input type="checkbox" name="style" id={material} />
              <label htmlFor={material}>
                {material.length > 12
                  ? `${material.substring(0, 12)}...`
                  : material}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
