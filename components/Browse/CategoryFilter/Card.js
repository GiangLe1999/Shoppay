import { FaMinus, FaPlus } from "react-icons/fa";
import { useState } from "react";

import styled from "../styles.module.scss";
import { useRouter } from "next/router";

export default function Card({ category }) {
  const [show, setShow] = useState(false);
  const router = useRouter();

  return (
    <>
      <section>
        <li>
          <input type="radio" name="filter" id={category._id} />
          <label htmlFor={category._id}>
            <a>{category.name}</a>
            <span>{show ? <FaMinus /> : <FaPlus />}</span>
          </label>
        </li>
      </section>
    </>
  );
}
