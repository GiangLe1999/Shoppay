import { useState } from "react";

import styled from "../styles.module.scss";
import ShowAllBtn from "../ShowAllBtn";
import useSeeMore from "@/hook/useSeeMore";
import CheckboxItem from "../CheckboxItem";
import PlusMinusBtn from "../PlusMinusBtn";

export default function CategoryFilter({
  categories,
  subCategories,
  categoryHandler,
  checkChecked,
}) {
  const [show, setShow] = useState(true);
  const { itemsQty, showAllHandler, hideBtn } = useSeeMore(categories);

  return (
    <div className={styled.filter}>
      <h3>
        Category{" "}
        <PlusMinusBtn show={show} onClick={() => setShow((prev) => !prev)} />
      </h3>

      {show && (
        <div className={styled.filter__categories}>
          {categories.slice(0, itemsQty).map((category, i) => {
            const check = checkChecked("category", category._id);

            return (
              <CheckboxItem
                key={i}
                onClick={() => {
                  categoryHandler(check ? {} : category._id);
                }}
                id={category._id}
                check={check}
                content={category.name}
                name="category"
                type="radio"
              />
            );
          })}
          {categories.length > 5 && (
            <div className={`${styled.showHideBtn}`}>
              <ShowAllBtn hideBtn={hideBtn} onClick={showAllHandler} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
