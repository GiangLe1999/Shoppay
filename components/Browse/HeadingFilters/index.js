import { Tooltip } from "@mui/material";
import styled from "./styles.module.scss";
import { IoIosArrowDown } from "react-icons/io";
import { useState } from "react";
import { useRouter } from "next/router";
import { FcCheckmark } from "react-icons/fc";

export default function HeadingFilters({
  priceHandler,
  multiPriceHandler,
  sortHandler,
}) {
  const [show, setShow] = useState(false);

  const router = useRouter();
  const sortQuery = router.query.sort || "";

  return (
    <div className={styled.filters}>
      <div className={styled.filters__priceBtns_wrap}>
        <span>Price range :</span>
        <div className={styled.filters__priceBtns}>
          <Tooltip
            title={<h4>Check out products for more than 500$</h4>}
            placement="top"
            arrow
            onClick={() => multiPriceHandler(500, "")}
          >
            <button className={styled.tooltip_btn}>
              <span style={{ height: "100%" }}></span>
            </button>
          </Tooltip>

          <Tooltip
            title={<h4>Check out products between 100$ and 500$</h4>}
            placement="top"
            arrow
            onClick={() => multiPriceHandler(100, 500)}
          >
            <button className={styled.tooltip_btn}>
              <span style={{ height: "75%" }}></span>
            </button>
          </Tooltip>

          <Tooltip
            title={<h4>Check out products between 50$ and 100$</h4>}
            placement="top"
            arrow
            onClick={() => multiPriceHandler(50, 100)}
          >
            <button className={styled.tooltip_btn}>
              <span style={{ height: "50%" }}></span>
            </button>
          </Tooltip>

          <Tooltip
            title={<h4>Check out products between 10$ and 50$</h4>}
            placement="top"
            arrow
            onClick={() => multiPriceHandler(10, 50)}
          >
            <button className={styled.tooltip_btn}>
              <span style={{ height: "25%" }}></span>
            </button>
          </Tooltip>

          <Tooltip
            title={<h4>Check out products under 10$</h4>}
            placement="top"
            arrow
            onClick={() => multiPriceHandler(0, 10)}
          >
            <button className={styled.tooltip_btn}>
              <span style={{ height: "10%" }}></span>
            </button>
          </Tooltip>
        </div>
      </div>

      <div className={styled.filters__price}>
        <span>Price range :</span>
        <input
          type="number"
          placeholder="Min price"
          min="0"
          onChange={(e) => priceHandler(e.target.value, "min")}
          value={router.query.price?.split("_")[0] || 0}
        />
        <input
          type="number"
          placeholder="Max price"
          min="0"
          onChange={(e) => priceHandler(e.target.value, "max")}
          value={router.query.price?.split("_")[1] || 0}
        />
      </div>

      <div className={styled.filters__sort}>
        <span>Sort by :</span>
        <div
          className={styled.filters__sort_list}
          onMouseOver={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
        >
          <button>
            {sortQuery == ""
              ? "Recommend"
              : sortingOptions.find((x) => x.value === sortQuery).name}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                transform: `${show ? "rotate(180deg)" : "rotate(0)"}`,
              }}
            >
              <IoIosArrowDown />
            </div>
          </button>

          <ul
            style={{
              transform: `${show ? "scale3d(1,1,1)" : "scale3d(1,0,1)"}`,
            }}
          >
            {sortingOptions.map((option, i) => (
              <li key={i} onClick={() => sortHandler(option.value)}>
                <a>
                  {sortQuery === option.value ? (
                    <b>{option.name}</b>
                  ) : (
                    option.name
                  )}
                  {sortQuery === option.value ? <FcCheckmark /> : ""}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

const sortingOptions = [
  {
    name: "Recommend",
    value: "Recommend",
  },
  {
    name: "Most Popular",
    value: "popular",
  },
  {
    name: "New Arrivals",
    value: "newest",
  },
  {
    name: "Top Selling",
    value: "topSelling",
  },
  {
    name: "Top Reviewed",
    value: "topReviewed",
  },
  {
    name: "Price (low to high)",
    value: "priceLowToHight",
  },
  {
    name: "Price (high to low)",
    value: "priceHighToLow",
  },
];
