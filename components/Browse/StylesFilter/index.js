import { useState } from "react";
import styled from "../styles.module.scss";

import { useRouter } from "next/router";
import { replaceQuery } from "@/utils/filter";
import CheckboxItem from "../CheckboxItem";
import useSeeMore from "@/hook/useSeeMore";
import ShowAllBtn from "../ShowAllBtn";
import PlusMinusBtn from "../PlusMinusBtn";

export default function StylesFilter({ styles, styleHandler, checkChecked }) {
  const [show, setShow] = useState(true);
  const router = useRouter();
  const { itemsQty, showAllHandler, hideBtn } = useSeeMore(styles);

  const existedStyle = router.query.style || "";

  return (
    <div className={styled.filter}>
      <h3>
        Styles{" "}
        <PlusMinusBtn show={show} onClick={() => setShow((prev) => !prev)} />
      </h3>

      {show && (
        <>
          <div>
            {styles.length > 0 ? (
              styles.slice(0, itemsQty).map((style, i) => {
                const check = checkChecked("style", style);
                return (
                  <CheckboxItem
                    key={i}
                    onClick={() =>
                      replaceQuery(existedStyle, check, style, styleHandler)
                    }
                    id={style}
                    check={check}
                    content={
                      style.length > 20 ? `${style.substring(0, 20)}...` : style
                    }
                    name="style"
                    type="checkbox"
                  />
                );
              })
            ) : (
              <p style={{ padding: "10px 0" }}>Found no styles</p>
            )}
          </div>

          {styles.length > 5 && (
            <div className={`${styled.showHideBtn}`}>
              <ShowAllBtn hideBtn={hideBtn} onClick={showAllHandler} />
            </div>
          )}
        </>
      )}
    </div>
  );
}
