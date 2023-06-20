import Link from "next/link";
import React from "react";

import styled from "./styles.module.scss";

const Ad = () => {
  return (
    <Link href="/browse">
      <div className={styled.ad}></div>
    </Link>
  );
};

export default Ad;
