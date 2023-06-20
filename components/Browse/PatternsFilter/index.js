import { useState } from "react";
import styled from "../styles.module.scss";
import { FaMinus, FaPlus } from "react-icons/fa";

export default function PatternsFilter({ patterns }) {
  const [show, setShow] = useState(true);
  return (
    <div className={styled.filter}>
      <h3>
        Patterns <span>{show ? <FaMinus /> : <FaPlus />}</span>
      </h3>

      {show && (
        <div className={styled.filter__sizes}>
          {patterns.map((pattern, i) => (
            <div className={styled.filter__sizes_size} key={i}>
              <input type="checkbox" name="style" id={pattern} />
              <label htmlFor={pattern}>
                {pattern.length > 12
                  ? `${pattern.substring(0, 12)}...`
                  : pattern}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
