import { useState } from "react";
import styled from "../styles.module.scss";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useRouter } from "next/router";
import { replaceQuery } from "@/utils/filter";

export default function MaterialsFilter({
  materials,
  materialHandler,
  checkChecked,
}) {
  const [show, setShow] = useState(true);
  const router = useRouter();

  const existedMaterial = router.query.material;

  return (
    <div className={styled.filter}>
      <h3>
        Materials <span>{show ? <FaMinus /> : <FaPlus />}</span>
      </h3>

      {show && (
        <div className={styled.filter__materials}>
          {materials.map((material, i) => {
            const check = checkChecked("material", material);
            return (
              <label
                className={styled.filter__materials_material}
                key={i}
                htmlFor={material}
                onClick={() =>
                  replaceQuery(
                    existedMaterial,
                    check,
                    material,
                    materialHandler
                  )
                }
              >
                <input
                  type="checkbox"
                  name="style"
                  id={material}
                  checked={check}
                />
                <span>
                  {material.length > 12
                    ? `${material.substring(0, 12)}...`
                    : material}
                </span>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}
