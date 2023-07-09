import React, { useState } from "react";
import { BiSearchAlt } from "react-icons/bi";

import styled from "../styles.module.scss";
import SearchItem from "./SearchItem";
import { useRouter } from "next/router";

function SearchResults({ products, showSearchResults, query }) {
  const router = useRouter();
  return (
    <div
      className={styled.search__results}
      style={{
        transform:
          products.length > 0 && showSearchResults
            ? "scale3d(1,1,1)"
            : "scale3d(1,0,1)",
      }}
    >
      <div className={styled.search__heading}>
        <BiSearchAlt size={20} />
        Products
      </div>
      <div className={styled.search__body}>
        {products.map((product) => (
          <SearchItem key={product._id} product={product} />
        ))}
      </div>
      <div
        onMouseDown={() => router.push("/browse?search=" + query)}
        className={styled.search__seeAll}
      >
        See all results...
      </div>
    </div>
  );
}

export default React.memo(SearchResults);
