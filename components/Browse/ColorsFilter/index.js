import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useRouter } from "next/router";

import styled from "../styles.module.scss";
import { replaceQuery } from "@/utils/filter";

export default function ColorsFilter({ colors, colorHandler, checkChecked }) {
  const [show, setShow] = useState(true);
  const router = useRouter();
  const existedColor = router.query.color;
  return (
    <div className={styled.filter}>
      <h3>
        Colors <span>{show ? <FaMinus /> : <FaPlus />}</span>
      </h3>

      {show && (
        <div className={styled.filter__colors}>
          {colors.map((color, i) => {
            const check = checkChecked("color", color);
            return (
              <button
                onClick={() =>
                  replaceQuery(existedColor, check, color, colorHandler)
                }
                style={{ background: `${color}` }}
                className={check ? styled.colorActiveFilter : ""}
                key={i}
              ></button>
            );
          })}
        </div>
      )}
    </div>
  );
}
