import { useState } from "react";
import styled from "../styles.module.scss";
import Ratings from "@/components/Ratings";
import CheckboxItem from "../CheckboxItem";
import PlusMinusBtn from "../PlusMinusBtn";

export default function StarsFilter({ checkChecked, ratingHandler }) {
  const [show, setShow] = useState(true);

  return (
    <div className={styled.filter}>
      <h3>
        Ratings{" "}
        <PlusMinusBtn show={show} onClick={() => setShow((prev) => !prev)} />
      </h3>

      {show && (
        <div>
          {[5, 4, 3].map((stars, i) => {
            const check = checkChecked("rating", stars.toString());
            return (
              <CheckboxItem
                key={i}
                onClick={() => {
                  ratingHandler(check ? {} : stars);
                }}
                id={stars}
                check={check}
                content={
                  <>
                    <Ratings value={stars} />
                    {stars !== 5 ? <>&nbsp;and over</> : ""}
                  </>
                }
                name="ratings"
                type="radio"
                classname="rating"
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
