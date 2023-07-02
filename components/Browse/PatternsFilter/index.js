import { useState } from "react";
import styled from "../styles.module.scss";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useRouter } from "next/router";
import { replaceQuery } from "@/utils/filter";
import CheckboxItem from "../CheckboxItem";
import ShowAllBtn from "../ShowAllBtn";
import useSeeMore from "@/hook/useSeeMore";
import PlusMinusBtn from "../PlusMinusBtn";

export default function PatternsFilter({
  patterns,
  patternHandler,
  checkChecked,
}) {
  const [show, setShow] = useState(true);
  const router = useRouter();
  const { itemsQty, showAllHandler, hideBtn } = useSeeMore(patterns);

  const existedPattern = router.query.pattern || "";

  return (
    <div className={styled.filter}>
      <h3>
        Patterns{" "}
        <PlusMinusBtn show={show} onClick={() => setShow((prev) => !prev)} />
      </h3>

      {show && (
        <>
          <div>
            {patterns.length > 0 ? (
              patterns.map((pattern, i) => {
                const check = checkChecked("pattern", pattern);
                return (
                  <CheckboxItem
                    key={i}
                    onClick={() => {
                      replaceQuery(
                        existedPattern,
                        check,
                        pattern,
                        patternHandler
                      );
                    }}
                    id={pattern}
                    check={check}
                    content={pattern}
                    name="pattern"
                    type="checkbox"
                  />
                );
              })
            ) : (
              <p style={{ padding: "10px 0" }}>Found no patterns</p>
            )}
          </div>
          {patterns.slice(0, itemsQty).length > 5 && (
            <div className={`${styled.showHideBtn}`}>
              <ShowAllBtn hideBtn={hideBtn} onClick={showAllHandler} />
            </div>
          )}
        </>
      )}
    </div>
  );
}
