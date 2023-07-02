/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import styled from "../styles.module.scss";

import { useRouter } from "next/router";
import { replaceQuery } from "@/utils/filter";
import CheckboxItem from "../CheckboxItem";
import ShowAllBtn from "../ShowAllBtn";
import useSeeMore from "@/hook/useSeeMore";
import PlusMinusBtn from "../PlusMinusBtn";

export default function BrandsFilter({ brands, brandHandler, checkChecked }) {
  const [show, setShow] = useState(true);
  const router = useRouter();
  const { itemsQty, showAllHandler, hideBtn } = useSeeMore(brands);

  const existedBrand = router.query.brand || "";

  return (
    <div className={styled.filter}>
      <h3>
        Brands{" "}
        <PlusMinusBtn show={show} onClick={() => setShow((prev) => !prev)} />
      </h3>

      {show && (
        <>
          {brands.length > 0 ? (
            <div>
              {brands.slice(0, itemsQty).map((brand, i) => {
                const check = checkChecked("brand", brand);
                return (
                  <CheckboxItem
                    key={i}
                    onClick={() => {
                      replaceQuery(existedBrand, check, brand, brandHandler);
                    }}
                    id={brand}
                    check={check}
                    content={brand}
                    name="brand"
                    type="checkbox"
                  />
                );
              })}
            </div>
          ) : (
            <p style={{ padding: "10px 0" }}>Found no brands</p>
          )}
          {brands.length > 5 && (
            <div className={`${styled.showHideBtn}`}>
              <ShowAllBtn hideBtn={hideBtn} onClick={showAllHandler} />
            </div>
          )}
        </>
      )}
    </div>
  );
}
