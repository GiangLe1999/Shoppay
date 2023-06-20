/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import styled from "../styles.module.scss";
import { FaMinus, FaPlus } from "react-icons/fa";

export default function BrandsFilter({ brands }) {
  const [show, setShow] = useState(true);
  return (
    <div className={styled.filter}>
      <h3>
        Brands <span>{show ? <FaMinus /> : <FaPlus />}</span>
      </h3>

      {show && (
        <div className={styled.filter__sizes}>
          {brands.map((brand, i) => (
            <button className={styled.filter__brand} key={i}>
              <img src={`/images/brands/${brand}.png`} alt="" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
