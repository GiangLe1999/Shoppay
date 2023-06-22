import { useRef, useState } from "react";
import styled from "../styles.module.scss";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useRouter } from "next/router";
import { replaceQuery } from "@/utils/filter";

export default function StylesFilter({ styles, styleHandler, checkChecked }) {
  const [show, setShow] = useState(true);
  const router = useRouter();
  const existedStyle = router.query.style || "";

  return (
    <div className={styled.filter}>
      <h3>
        Styles <span>{show ? <FaMinus /> : <FaPlus />}</span>
      </h3>

      {show && (
        <div className={styled.filter__styles}>
          {styles.map((style, i) => {
            const check = checkChecked("style", style);
            return (
              <label
                className={styled.filter__styles_style}
                key={i}
                onClick={() =>
                  replaceQuery(existedStyle, check, style, styleHandler)
                }
                htmlFor={style}
              >
                <input
                  type="checkbox"
                  name="style"
                  id={style}
                  checked={check}
                />
                <span>{style}</span>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}
