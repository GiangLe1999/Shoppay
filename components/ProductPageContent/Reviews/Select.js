/* eslint-disable @next/next/no-img-element */
import { ClickAwayListener } from "@mui/material";
import { useState } from "react";
import { IoArrowDown, IoArrowUp } from "react-icons/io5";

import styled from "./styles.module.scss";

const Select = ({
  size,
  style,
  fit,
  text,
  data,
  sizeChangeHandler,
  styleChangeHandler,
  fitChangeHandler,
}) => {
  const [visible, setVisible] = useState(false);

  const handleClickAway = () => {
    if (visible) {
      setVisible(false);
    }
  };

  const chooseAllOptionHandler = () => {
    if (text == "Size") {
      sizeChangeHandler("all");
      setVisible(false);
    } else if (text == "Style") {
      styleChangeHandler("all");
      setVisible(false);
    } else if (text == "How does it fit") {
      fitChangeHandler("all");
      setVisible(false);
    }
  };

  return (
    <div className={styled.select}>
      <span className={styled.select__title}>{text} :</span>
      <div className={styled.select__header}>
        <span
          className={`flex ${styled.select__header_wrap}`}
          onClick={() => setVisible((prev) => !prev)}
        >
          <span>
            {text === "Size" ? size || `Select ${text}` : ""}

            {text === "Style" && style.colorImg && (
              <img src={style.colorImg} alt="" />
            )}
            {text === "Style" && !style.colorImg && style.color && (
              <span
                style={{
                  background: `${style.color}`,
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                }}
              ></span>
            )}
            {text === "Style" && style === "all" && "All"}
            {text === "Style" && !style && "Select Style"}

            {text == "How does it fit" ? fit || "Select" : ""}
          </span>

          {visible ? <IoArrowUp /> : <IoArrowDown />}
        </span>
        {visible && (
          <ClickAwayListener onClickAway={handleClickAway}>
            <ul className={styled.select__header_menu}>
              {text == "Size" && size !== "all" && (
                <li onClick={chooseAllOptionHandler}>
                  <span>All</span>
                </li>
              )}
              {text == "Style" && style !== "all" && (
                <li onClick={chooseAllOptionHandler}>
                  <span>All</span>
                </li>
              )}
              {text == "How does it fit" && fit !== "all" && (
                <li onClick={chooseAllOptionHandler}>
                  <span>All</span>
                </li>
              )}
              {data.map((item, index) => {
                if (text == "Size") {
                  return (
                    <li
                      key={index}
                      onClick={() => {
                        sizeChangeHandler(item.size);
                        setVisible(false);
                      }}
                    >
                      <span>{`Size ${item.size}`}</span>
                    </li>
                  );
                }
                if (text == "Style") {
                  return (
                    <li
                      key={index}
                      onClick={() => {
                        styleChangeHandler(item);
                        setVisible(false);
                      }}
                    >
                      <span>
                        {item.colorImg ? (
                          <img src={item.colorImg} alt="" />
                        ) : (
                          <span
                            style={{
                              background: `${item.color}`,
                              width: "30px",
                              height: "30px",
                              borderRadius: "50%",
                            }}
                          ></span>
                        )}
                      </span>
                    </li>
                  );
                }
                if (text == "How does it fit") {
                  return (
                    <li
                      key={index}
                      onClick={() => {
                        fitChangeHandler(item);
                        setVisible(false);
                      }}
                    >
                      <span>{item}</span>
                    </li>
                  );
                }
              })}
            </ul>
          </ClickAwayListener>
        )}
      </div>
    </div>
  );
};

export default Select;
