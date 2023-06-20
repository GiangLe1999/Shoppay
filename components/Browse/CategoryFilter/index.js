import { useState } from "react";
import styled from "../styles.module.scss";
import { FaMinus, FaPlus } from "react-icons/fa";
import Card from "./Card";

export default function CategoryFilter({ categories, subCategories }) {
  const [show, setShow] = useState(true);
  return (
    <div className={styled.filter}>
      <h3>
        Category <span>{show ? <FaMinus /> : <FaPlus />}</span>
      </h3>

      {show &&
        categories.map((category, i) => (
          <Card key={i} category={category} subCategories={subCategories} />
        ))}
    </div>
  );
}
