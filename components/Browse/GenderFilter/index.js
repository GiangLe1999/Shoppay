import { useState } from "react";
import styled from "../styles.module.scss";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useRouter } from "next/router";
import { replaceQuery } from "@/utils/filter";

export default function GenderFilter({ genderHandler, checkChecked }) {
  const genders = ["Men", "Women", "Unisex"];

  const router = useRouter();
  const existedGender = router.query.gender || "";

  const [show, setShow] = useState(true);
  return (
    <div className={styled.filter}>
      <h3>
        Gender <span>{show ? <FaMinus /> : <FaPlus />}</span>
      </h3>

      {show && (
        <>
          {genders.map((gender, i) => {
            const check = checkChecked("gender", gender);
            return (
              <label
                className={styled.filter__genders}
                htmlFor={gender}
                key={i}
                onClick={() => {
                  replaceQuery(existedGender, check, gender, genderHandler);
                }}
              >
                <div className={styled.filter__genders_gender}>
                  <input
                    type="checkbox"
                    name="style"
                    id={gender}
                    checked={check}
                  />
                  <span>{gender}</span>
                </div>
              </label>
            );
          })}
        </>
      )}
    </div>
  );
}
