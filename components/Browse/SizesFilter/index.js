import { useState } from "react";
import styled from "../styles.module.scss";
import { FaMinus, FaPlus } from "react-icons/fa";
import Size from "./Size";
import { useRouter } from "next/router";

export default function SizesFilter({ sizes, sizeHandler, checkChecked }) {
  const [show, setShow] = useState(true);

  const router = useRouter();

  const existedSize = router.query.size;

  return (
    <div className={styled.filter}>
      <h3>
        Sizes <span>{show ? <FaMinus /> : <FaPlus />}</span>
      </h3>

      {show && (
        <div className={styled.filter__sizes}>
          {sizes.map((size, i) => {
            const check = checkChecked("size", size);
            return (
              <Size
                key={i}
                size={size}
                existedSize={existedSize}
                sizeHandler={sizeHandler}
                check={check}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
