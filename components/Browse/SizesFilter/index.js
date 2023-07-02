import { useState } from "react";
import { useRouter } from "next/router";

import styled from "../styles.module.scss";
import useSeeMore from "@/hook/useSeeMore";
import ShowAllBtn from "../ShowAllBtn";
import CheckboxItem from "../CheckboxItem";
import { replaceQuery } from "@/utils/filter";
import PlusMinusBtn from "../PlusMinusBtn";

export default function SizesFilter({ sizes, sizeHandler, checkChecked }) {
  const [show, setShow] = useState(true);
  const router = useRouter();
  const { itemsQty, showAllHandler, hideBtn } = useSeeMore(sizes);

  const existedSize = router.query.size;

  return (
    <div className={styled.filter}>
      <h3>
        Sizes{" "}
        <PlusMinusBtn show={show} onClick={() => setShow((prev) => !prev)} />
      </h3>

      {show && (
        <>
          <div>
            {sizes.length > 0 ? (
              sizes.slice(0, itemsQty).map((size, i) => {
                const check = checkChecked("size", size);
                return (
                  <CheckboxItem
                    key={i}
                    onClick={() => {
                      replaceQuery(existedSize, check, size, sizeHandler);
                    }}
                    id={size}
                    check={check}
                    content={`Size ${size}`}
                    name="size"
                    type="checkbox"
                  />
                );
              })
            ) : (
              <p style={{ padding: "10px 0" }}>Found no sizes</p>
            )}
          </div>
          {sizes.length > 5 && (
            <div className={`${styled.showHideBtn}`}>
              <ShowAllBtn hideBtn={hideBtn} onClick={showAllHandler} />
            </div>
          )}
        </>
      )}
    </div>
  );
}
