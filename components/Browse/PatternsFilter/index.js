import { useState } from "react";
import styled from "../styles.module.scss";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useRouter } from "next/router";
import { replaceQuery } from "@/utils/filter";

export default function PatternsFilter({
  patterns,
  patternHandler,
  checkChecked,
}) {
  const [show, setShow] = useState(true);
  const router = useRouter();

  const existedPattern = router.query.pattern || "";

  return (
    <div className={styled.filter}>
      <h3>
        Patterns <span>{show ? <FaMinus /> : <FaPlus />}</span>
      </h3>

      {show && (
        <div className={styled.filter__patterns}>
          {patterns.map((pattern, i) => {
            const check = checkChecked("pattern", pattern);
            return (
              <label
                className={styled.filter__patterns_pattern}
                key={i}
                htmlFor={pattern}
                onClick={() =>
                  replaceQuery(existedPattern, check, pattern, patternHandler)
                }
              >
                <input
                  type="checkbox"
                  name="pattern"
                  id={pattern}
                  check={check}
                />
                <span>{pattern}</span>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}
