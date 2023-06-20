import { useState } from "react";
import styled from "../styles.module.scss";
import { FaMinus, FaPlus } from "react-icons/fa";

export default function GenderFilter() {
  const genders = ["Men", "Women", "Unisex"];
  const [show, setShow] = useState(true);
  return (
    <div className={styled.filter}>
      <h3>
        Patterns <span>{show ? <FaMinus /> : <FaPlus />}</span>
      </h3>

      {show && (
        <div className={styled.filter__sizes}>
          {genders.map((gender, i) => (
            <div className={styled.filter__sizes_size} key={i}>
              <input type="checkbox" name="style" id={gender} />
              <label htmlFor={gender}>{gender}</label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
