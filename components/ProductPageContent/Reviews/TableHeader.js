import React from "react";
import { useState } from "react";
import { FcFilledFilter } from "react-icons/fc";

import styled from "./styles.module.scss";
import TableSelect from "./TableSelect";

const ratings = [
  { text: "5 stars", value: "5" },
  { text: "4 stars", value: "4" },
  { text: "3 stars", value: "3" },
  { text: "2 stars", value: "2" },
  { text: "1 star", value: "1" },
];

const orderOptions = [
  {
    text: "Recommended",
    value: "Recommended",
  },
  {
    text: "Newest to Oldest",
    value: "Newest to Oldest",
  },
  {
    text: "Oldest to Newest",
    value: "Oldest to Newest",
  },
];

const TableHeader = ({ reviews, allSizes, colors }) => {
  const [rating, setRating] = useState();
  const [size, setSize] = useState("");
  const [style, setStyle] = useState("");
  const [order, setOrder] = useState("");

  return (
    <div className={styled.table__header_wrap}>
      <div className={styled.table__header_filterBy}>
        <FcFilledFilter />
        Filter reviews by
      </div>
      <div className={styled.table__header_select}>
        <TableSelect
          rating={rating}
          text="Rating"
          data={ratings.filter((x) => x.value != rating)}
          ratingChangeHandler={setRating}
        />
        <TableSelect
          size={size}
          text="Size"
          data={allSizes.filter((s) => s.size !== size)}
          sizeChangeHandler={setSize}
        />
        <TableSelect
          style={style}
          text="Style"
          data={colors.filter((c) => c !== style)}
          styleChangeHandler={setStyle}
        />
        <TableSelect
          order={order}
          text="Order"
          data={orderOptions.filter((c) => c !== order)}
          orderChangeHandler={setOrder}
        />
      </div>
    </div>
  );
};

export default TableHeader;
