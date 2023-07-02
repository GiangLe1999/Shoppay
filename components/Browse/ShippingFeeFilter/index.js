import { useState } from "react";
import styled from "../styles.module.scss";
import { FaMinus, FaPlus } from "react-icons/fa";
import CheckboxItem from "../CheckboxItem";
import PlusMinusBtn from "../PlusMinusBtn";

export default function ShippingFeeFilter({ checkChecked, shippingHandler }) {
  const shippingFees = ["Free", "Charged"];
  const [show, setShow] = useState(true);

  return (
    <div className={styled.filter}>
      <h3>
        Shipping Fee
        <PlusMinusBtn show={show} onClick={() => setShow((prev) => !prev)} />
      </h3>

      {show && (
        <div>
          {shippingFees.map((fee, i) => {
            const check = checkChecked("shipping", fee);

            return (
              <CheckboxItem
                key={i}
                onClick={() => {
                  shippingHandler(check ? {} : fee);
                }}
                id={fee}
                check={check}
                content={fee}
                name="shippingFee"
                type="radio"
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
