import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

import styled from "../styles.module.scss";
import "react-toastify/dist/ReactToastify.css";
import { replaceQuery } from "@/utils/filter";

export default function Card({ category, checkChecked, categoryHandler }) {
  const [show, setShow] = useState(false);
  const router = useRouter();
  const existedCategory = router.query.category || "";
  const check = checkChecked("category", category._id);

  return (
    <label
      key={category._id}
      htmlFor={category._id}
      onClick={() => {}}
      className={styled.filter__categories_category}
    >
      <input
        type="radio"
        name="category"
        id={category._id}
        onClick={() => {
          categoryHandler(check ? {} : category._id);
        }}
        checked={check}
      />
      <div className={styled.flex}>
        <span>{category.name}</span>
        <span>{show ? <FaMinus /> : <FaPlus />}</span>
      </div>
    </label>
  );
}
