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

const TableHeader = ({ reviews, allSizes, colors, filter, setFilter }) => {
  const [rating, setRating] = useState();

  return (
    <div className={styled.table__header_wrap}>
      <div className={styled.table__header_filterBy}>
        <FcFilledFilter />
        Filter reviews by
      </div>
      <div className={styled.table__header_select}>
        <TableSelect
          rating={filter.rating}
          text="Rating"
          data={ratings.filter((x) => x.value != filter.rating)}
          changeHandler={setFilter}
        />
        <TableSelect
          size={filter.size}
          text="Size"
          data={allSizes.filter((s) => s !== filter.size)}
          changeHandler={setFilter}
        />
        <TableSelect
          style={filter.style}
          text="Style"
          data={colors.filter((c) => c !== filter.style)}
          changeHandler={setFilter}
        />
        <TableSelect
          order={filter.order}
          text="Order"
          data={orderOptions.filter((c) => c.value !== filter.order)}
          changeHandler={setFilter}
        />
      </div>
    </div>
  );
};

export default TableHeader;
