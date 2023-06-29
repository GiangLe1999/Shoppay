/* eslint-disable @next/next/no-img-element */
import { ClickAwayListener } from "@mui/material";
import { useState } from "react";
import { IoArrowDown, IoArrowUp } from "react-icons/io5";

import styled from "./styles.module.scss";

const TableSelect = ({
  rating,
  size,
  style,
  text,
  order,
  data,
  changeHandler,
}) => {
  const [visible, setVisible] = useState(false);

  const handleClickAway = () => {
    if (visible) {
      setVisible(false);
    }
  };

  const chooseAllOptionHandler = () => {
    if (text == "Size") {
      changeHandler((prev) => ({ ...prev, size: "all" }));
      setVisible(false);
    } else if (text == "Style") {
      changeHandler((prev) => ({ ...prev, style: "all" }));
      setVisible(false);
    } else if (text == "Rating") {
      changeHandler((prev) => ({ ...prev, rating: "all" }));
      setVisible(false);
    } else if (text == "Order") {
      changeHandler((prev) => ({ ...prev, order: "all" }));
      setVisible(false);
    }
  };

  return (
    <div className={styled.select}>
      <span className={styled.select__title2}>{text} :</span>
      <div className={styled.select__header}>
        <span
          className={`flex ${styled.select__header_wrap}`}
          onClick={() => setVisible((prev) => !prev)}
        >
          <span>
            {text === "Rating" && !rating && `Select ${text}`}
            {text === "Rating" &&
              rating &&
              `${rating} ${rating > 1 ? "stars" : "star"}`}

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
            {text === "Style" &&
              Object.keys(style).length === 0 &&
              "Select Style"}

            {text === "Order" ? order || `Select ${text}` : ""}
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
              {text == "Rating" && rating !== "all" && (
                <li onClick={chooseAllOptionHandler}>
                  <span>All</span>
                </li>
              )}
              {text == "Order" && order !== "all" && (
                <li onClick={chooseAllOptionHandler}>
                  <span>All</span>
                </li>
              )}
              {data.map((item, index) => {
                if (text == "Rating") {
                  return (
                    <li
                      key={index}
                      onClick={() => {
                        changeHandler((prev) => ({
                          ...prev,
                          rating: item.value,
                        }));
                        setVisible(false);
                      }}
                    >
                      <span>{item.text}</span>
                    </li>
                  );
                }
                if (text == "Size") {
                  return (
                    <li
                      key={index}
                      onClick={() => {
                        changeHandler((prev) => ({
                          ...prev,
                          size: item,
                        }));
                        setVisible(false);
                      }}
                    >
                      <span>{`Size ${item}`}</span>
                    </li>
                  );
                }
                if (text == "Style") {
                  return (
                    <li
                      key={index}
                      onClick={() => {
                        changeHandler((prev) => ({
                          ...prev,
                          style: item,
                        }));
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
                if (text == "Order") {
                  return (
                    <li
                      key={index}
                      onClick={() => {
                        changeHandler((prev) => ({
                          ...prev,
                          order: item.value,
                        }));
                        setVisible(false);
                      }}
                    >
                      <span>{item.value}</span>
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

export default TableSelect;
