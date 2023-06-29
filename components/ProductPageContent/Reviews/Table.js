/* eslint-disable @next/next/no-img-element */
import usePagination from "./Pagination";
import { useState } from "react";
import { Pagination } from "@mui/material";

import styled from "./styles.module.scss";
import Review from "./Review";
import TableHeader from "./TableHeader";

const Table = ({
  reviews,
  allSizes,
  colors,
  filter,
  setFilter,
  setReviews,
}) => {
  const [page, setPage] = useState(1);
  const PER_PAGE = 3;

  //Tính ra số lượng reviews hiển thị mỗi trang
  const count = Math.ceil(reviews.length / PER_PAGE);
  const _DATA = usePagination(reviews, PER_PAGE);

  //Tham khảo tại: https://mui.com/material-ui/react-pagination/
  const changePageHandler = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  return (
    <div className={styled.table}>
      <div className={styled.table__header}>
        <TableHeader
          reviews={reviews}
          allSizes={allSizes}
          colors={colors}
          filter={filter}
          setFilter={setFilter}
        />
      </div>

      {reviews.length > 0 ? (
        <div className={styled.table__data}>
          {/* Map qua data của page hiện tại và render các review thuộc page đó*/}
          {_DATA.currentData().map((review, index) => (
            <Review review={review} key={index} setReviews={setReviews} />
          ))}
        </div>
      ) : (
        <div className={styled.table__empty}>
          <img src="/images/no-comments.png" alt="" />
          <p>No comment yet!</p>
          <p>Be the first to give this product a review.</p>
        </div>
      )}
      <div className={styled.pagination}>
        {/* Sử dụng Component Pagination của MUI để render giao diện */}
        <Pagination
          //Số review hiển thị mỗi page
          count={count}
          //Set state page bằng với số page hiện tại
          page={page}
          variant="round"
          shape="rounded"
          //Thay đổi page
          onChange={changePageHandler}
        />
      </div>
    </div>
  );
};

export default Table;
