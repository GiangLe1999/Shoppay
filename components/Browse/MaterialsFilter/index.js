import { useState } from "react";
import styled from "../styles.module.scss";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useRouter } from "next/router";
import { replaceQuery } from "@/utils/filter";
import CheckboxItem from "../CheckboxItem";
import ShowAllBtn from "../ShowAllBtn";
import useSeeMore from "@/hook/useSeeMore";
import PlusMinusBtn from "../PlusMinusBtn";

export default function MaterialsFilter({
  materials,
  materialHandler,
  checkChecked,
}) {
  const [show, setShow] = useState(true);
  const router = useRouter();
  const { itemsQty, showAllHandler, hideBtn } = useSeeMore(materials);

  const existedMaterial = router.query.material;

  return (
    <div className={styled.filter}>
      <h3>
        Materials
        <PlusMinusBtn show={show} onClick={() => setShow((prev) => !prev)} />
      </h3>

      {show && (
        <>
          <div>
            {materials.length > 0 ? (
              materials.slice(0, itemsQty).map((material, i) => {
                const check = checkChecked("material", material);
                return (
                  <CheckboxItem
                    key={i}
                    onClick={() => {
                      replaceQuery(
                        existedMaterial,
                        check,
                        material,
                        materialHandler
                      );
                    }}
                    id={material}
                    check={check}
                    content={
                      material.length > 20
                        ? `${material.substring(0, 20)}...`
                        : material
                    }
                    name="material"
                    type="checkbox"
                  />
                );
              })
            ) : (
              <p style={{ padding: "10px 0" }}>Found no materials</p>
            )}
          </div>
          {materials.length > 5 && (
            <div className={`${styled.showHideBtn}`}>
              <ShowAllBtn hideBtn={hideBtn} onClick={showAllHandler} />
            </div>
          )}
        </>
      )}
    </div>
  );
}
