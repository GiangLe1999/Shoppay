import React from "react";

import styled from "../styles.module.scss";

export default function CheckboxItem({
  onClick,
  name,
  id,
  check,
  content,
  type,
  classname,
}) {
  return (
    <label htmlFor={id} onClick={onClick} className={`${styled[classname]}`}>
      <div className={styled.filter__input}>
        <input type={type} name={name} id={id} checked={check} />
        <span>{content}</span>
      </div>
    </label>
  );
}
