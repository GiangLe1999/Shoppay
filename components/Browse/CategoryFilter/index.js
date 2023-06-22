import { useState } from "react";
import styled from "../styles.module.scss";
import { FaMinus, FaPlus } from "react-icons/fa";

import Card from "./Card";

export default function CategoryFilter({
  categories,
  subCategories,
  categoryHandler,
  checkChecked,
}) {
  const [show, setShow] = useState(true);

  return (
    <div className={styled.filter}>
      <h3>
        Category <span>{show ? <FaMinus /> : <FaPlus />}</span>
      </h3>

      {show && (
        <div className={styled.filter__categories}>
          {categories.map((category, i) => {
            return (
              <Card
                key={category._id}
                categoryHandler={categoryHandler}
                category={category}
                checkChecked={checkChecked}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
