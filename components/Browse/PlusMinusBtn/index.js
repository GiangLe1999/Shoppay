import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

export default function PlusMinusBtn({ show, onClick }) {
  return (
    <span style={{ cursor: "pointer" }} onClick={onClick}>
      {show ? <FaMinus /> : <FaPlus />}
    </span>
  );
}
