/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import styled from "../styles.module.scss";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useRouter } from "next/router";
import { replaceQuery } from "@/utils/filter";

export default function BrandsFilter({
  brands,
  brandHandler,
  removeByIndex,
  checkChecked,
}) {
  const [show, setShow] = useState(true);
  const router = useRouter();
  const existedBrand = router.query.brand || "";

  return (
    <div className={styled.filter}>
      <h3>
        Brands <span>{show ? <FaMinus /> : <FaPlus />}</span>
      </h3>

      {show && (
        <div className={styled.filter__brands}>
          {brands.map((brand, i) => {
            const check = checkChecked("brand", brand);
            return (
              <button
                className={`${styled.filter__brands_brand} ${
                  check ? styled.activeFilter : ""
                }`}
                key={i}
                onClick={() => {
                  replaceQuery(existedBrand, check, brand, brandHandler);
                }}
              >
                <img src={`/images/brands/${brand}.png`} alt="" />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
