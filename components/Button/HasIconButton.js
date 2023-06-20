import React from "react";
import { BiRightArrowAlt } from "react-icons/bi";

import styled from "./styles.module.scss";

const HasIconButton = (props) => {
  return (
    <button {...props} className={styled.button}>
      <p className={styled.button__title}>{props.children}</p>
      <div className={styled.svg__wrap}>
        <BiRightArrowAlt />
      </div>
    </button>
  );
};

export default HasIconButton;
