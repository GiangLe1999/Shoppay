import { useState } from "react";
import styled from "../styles.module.scss";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useRouter } from "next/router";

export default function ShippingFeeFilter({ checkChecked, shippingHandler }) {
  const shippingFees = ["Free", "Charged"];
  const [show, setShow] = useState(true);

  return (
    <div className={styled.filter}>
      <h3>
        Shipping Fee <span>{show ? <FaMinus /> : <FaPlus />}</span>
      </h3>

      {show && (
        <div className={styled.filter__shippingFees}>
          {shippingFees.map((fee, i) => {
            const check = checkChecked("shipping", fee);

            return (
              <label
                className={styled.filter__shippingFees_shippingFee}
                key={i}
                htmlFor={fee}
                onClick={() => {
                  shippingHandler(check ? {} : fee);
                }}
              >
                <input
                  type="radio"
                  name="shippingFee"
                  id={fee}
                  checked={check}
                />
                <span>{fee}</span>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}
