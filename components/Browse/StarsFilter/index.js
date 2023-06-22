import { useState } from "react";
import styled from "../styles.module.scss";
import { FaMinus, FaPlus } from "react-icons/fa";
import Ratings from "@/components/Ratings";

export default function StarsFilter({ checkChecked, ratingHandler }) {
  const [show, setShow] = useState(true);
  return (
    <div className={styled.filter}>
      <h3>
        Ratings <span>{show ? <FaMinus /> : <FaPlus />}</span>
      </h3>

      {show && (
        <div className={styled.filter__ratings}>
          {[5, 4, 3].map((stars, i) => {
            const check = checkChecked("rating", stars.toString());
            return (
              <label
                className={styled.filter__ratings_rating}
                key={i}
                htmlFor={stars}
                onClick={() => {
                  ratingHandler(check ? {} : stars);
                }}
              >
                <input type="radio" name="rating" id={stars} checked={check} />
                <span>
                  <Ratings value={stars} />
                  {stars !== 5 ? <>&nbsp;and over</> : ""}
                </span>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}
