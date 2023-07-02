import { useState } from "react";
import styled from "../styles.module.scss";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useRouter } from "next/router";
import { replaceQuery } from "@/utils/filter";
import CheckboxItem from "../CheckboxItem";
import PlusMinusBtn from "../PlusMinusBtn";

export default function GenderFilter({ genderHandler, checkChecked }) {
  const genders = ["Men", "Women", "Unisex"];

  const router = useRouter();
  const existedGender = router.query.gender || "";

  const [show, setShow] = useState(true);
  return (
    <div className={styled.filter}>
      <h3>
        Gender
        <PlusMinusBtn show={show} onClick={() => setShow((prev) => !prev)} />
      </h3>

      {show && (
        <>
          {genders.map((gender, i) => {
            const check = checkChecked("gender", gender);
            return (
              <CheckboxItem
                key={i}
                onClick={() => {
                  replaceQuery(existedGender, check, gender, genderHandler);
                }}
                id={gender}
                check={check}
                content={gender}
                name="gender"
                type="checkbox"
              />
            );
          })}
        </>
      )}
    </div>
  );
}
