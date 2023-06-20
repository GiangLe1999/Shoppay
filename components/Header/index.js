import React from "react";
import Ad from "./Ad";
import Main from "./Main";

import styled from "./styles.module.scss";
import Top from "./Top";

const Header = ({ country, searchHandler }) => {
  return (
    <header className={styled.header}>
      <Ad />
      <Top country={country} />
      <Main searchHandler2={searchHandler} />
    </header>
  );
};

export default Header;
