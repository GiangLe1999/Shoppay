import { AiOutlineMinusSquare, AiOutlinePlusSquare } from "react-icons/ai";

import styled from "./styles.module.scss";
import "react-toastify/dist/ReactToastify.css";

export default function Details({ details, product, setProduct }) {
  const changeDetailHandler = (i, e) => {
    const values = [...details];
    values[i][e.target.name] = e.target.value;
    setProduct({ ...product, details: values });
  };

  const removeHandler = (i) => {
    const values = [...details];
    values.splice(i, 1);
    setProduct({ ...product, details: values });
  };

  return (
    <div className={styled.details}>
      {details.length === 0 && (
        <div className={styled.sizes__guide}>
          <span>
            Click{" "}
            <button
              type="button"
              onClick={() =>
                setProduct({
                  ...product,
                  details: [...details, { size: "", qty: "", price: "" }],
                })
              }
            >
              here
            </button>{" "}
            to add more detail for product
          </span>
        </div>
      )}

      {details
        ? details.map((detail, i) => (
            <div className={styled.sizes__row} key={i}>
              <div className={styled.sizes__row_actions}>
                <div
                  className={styled.sizes__row_action}
                  onClick={() =>
                    setProduct({
                      ...product,
                      details: [...details, { name: "", value: "" }],
                    })
                  }
                >
                  <AiOutlinePlusSquare /> Add more detail
                </div>
                <div
                  className={styled.sizes__row_action2}
                  onClick={() => removeHandler(i)}
                >
                  <AiOutlineMinusSquare />
                  Remove this detail
                </div>
              </div>

              <div className={`${styled.clickToAdd} ${styled.clickToAdd3}`}>
                <input
                  type="text"
                  name="name"
                  placeholder="Property"
                  value={detail.name}
                  onChange={(e) => changeDetailHandler(i, e)}
                />
                <input
                  type="text"
                  name="value"
                  placeholder="Description"
                  min={1}
                  value={detail.value}
                  onChange={(e) => changeDetailHandler(i, e)}
                />
              </div>
            </div>
          ))
        : ""}
    </div>
  );
}
