import React, { useState } from "react";
import { AiOutlineMinusSquare, AiOutlinePlusSquare } from "react-icons/ai";

import styled from "./styles.module.scss";
import "react-toastify/dist/ReactToastify.css";
import { sizesList } from "@/data/sizes";
import { toast } from "react-toastify";

export default function Sizes({ sizes, product, setProduct }) {
  const [noSize, setNoSize] = useState(false);
  const changeSizeHandler = (i, e) => {
    const values = [...sizes];
    values[i][e.target.name] = e.target.value;
    setProduct({ ...product, sizes: values });
  };
  const removeHandler = (i) => {
    if (sizes.length > 1) {
      const values = [...sizes];
      values.splice(i, 1);
      setProduct({ ...product, sizes: values });
    }
  };

  return (
    <div className={styled.sizes}>
      <div className={styled.sizes__guide}>
        {noSize ? (
          <span>
            Click{" "}
            <button
              type="button"
              onClick={() => {
                setNoSize(false);
                toast.success(
                  "Product has size. Please enter size, size quantiy and size price."
                );
              }}
            >
              here
            </button>{" "}
            if product has size
          </span>
        ) : (
          <span>
            Click{" "}
            <button
              type="button"
              onClick={() => {
                setNoSize(true);

                let data = [sizes[0]].map((item) => ({
                  qty: item.qty,
                  price: item.price,
                }));

                setProduct({ ...product, sizes: data });

                toast.success(
                  "Product has no size. Please enter quantiy and price."
                );
              }}
            >
              here
            </button>{" "}
            if product has no size
          </span>
        )}
      </div>

      {sizes
        ? sizes.map((size, i) => (
            <div className={styled.sizes__row} key={i}>
              {!noSize ? (
                <div className={styled.sizes__row_actions}>
                  <div
                    className={styled.sizes__row_action}
                    onClick={() =>
                      setProduct({
                        ...product,
                        sizes: [...sizes, { size: "", qty: "", price: "" }],
                      })
                    }
                  >
                    <AiOutlinePlusSquare /> Add more size
                  </div>
                  <div
                    className={styled.sizes__row_action2}
                    onClick={() => removeHandler(i)}
                  >
                    <AiOutlineMinusSquare />
                    Remove this size
                  </div>
                </div>
              ) : (
                ""
              )}
              <div
                className={`${styled.clickToAdd} ${
                  noSize && styled.clickToAdd2
                } selectInput`}
              >
                {!noSize && (
                  <select
                    name="size"
                    value={noSize ? "" : size.size}
                    disabled={noSize}
                    style={{ display: `${noSize ? "none" : ""}` }}
                    onChange={(e) => changeSizeHandler(i, e)}
                  >
                    <option value="">Select a size</option>
                    {sizesList.map((s) => (
                      <option value={s} key={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                )}
                <input
                  type="number"
                  name="qty"
                  placeholder={noSize ? "Product Quantity" : "Size Quantity"}
                  min={0}
                  value={size.qty}
                  onChange={(e) => changeSizeHandler(i, e)}
                />
                <input
                  type="number"
                  name="price"
                  placeholder={noSize ? "Product Price" : "Size Price"}
                  min={1}
                  value={size.price}
                  onChange={(e) => changeSizeHandler(i, e)}
                  step="0.01"
                />
              </div>
            </div>
          ))
        : ""}
    </div>
  );
}
