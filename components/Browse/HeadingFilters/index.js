import { Tooltip } from "@mui/material";
import styled from "./styles.module.scss";
import { AiTwotoneStar } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { useState } from "react";
import Link from "next/link";
import { BsCheckLg } from "react-icons/bs";

export default function HeadingFilters() {
  const [show, setShow] = useState(false);
  return (
    <div className={styled.filters}>
      <div className={styled.filters__price}>
        <span>Price :</span>
        <input type="number" placeholder="min" min="0" />
        <input type="number" placeholder="max" min="0" />
      </div>

      <div className={styled.filters__priceBtns}>
        <Tooltip
          title={<h4>Check out products under 10$</h4>}
          placement="top"
          arrow
        >
          <button className={styled.tooltip_btn}>
            <span style={{ height: "10%" }}></span>
          </button>
        </Tooltip>

        <Tooltip
          title={<h4>Check out products between 10$ and 50$</h4>}
          placement="top"
          arrow
        >
          <button className={styled.tooltip_btn}>
            <span style={{ height: "25%" }}></span>
          </button>
        </Tooltip>

        <Tooltip
          title={<h4>Check out products between 50$ and 100$</h4>}
          placement="top"
          arrow
        >
          <button className={styled.tooltip_btn}>
            <span style={{ height: "50%" }}></span>
          </button>
        </Tooltip>

        <Tooltip
          title={<h4>Check out products between 100$ and 500$</h4>}
          placement="top"
          arrow
        >
          <button className={styled.tooltip_btn}>
            <span style={{ height: "75%" }}></span>
          </button>
        </Tooltip>

        <Tooltip
          title={<h4>Check out products for more than 500$</h4>}
          placement="top"
          arrow
        >
          <button className={styled.tooltip_btn}>
            <span style={{ height: "100%" }}></span>
          </button>
        </Tooltip>
      </div>

      <div className={styled.filters__shipping}>
        <input type="checkbox" name="shipping" id="shipping" />
        <label htmlFor="shipping">Free shipping</label>
      </div>
      <div className={styled.filters__rating}>
        <input type="checkbox" name="rating" id="rating" />
        <label htmlFor="rating">
          <AiTwotoneStar />
          <AiTwotoneStar />
          <AiTwotoneStar />
          <AiTwotoneStar /> & up
        </label>
      </div>

      <div className={styled.filters__sort}>
        <span>Sort by</span>
        <div
          className={styled.filters__sort_list}
          onMouseOver={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
        >
          <button>
            Recommend
            <div
              style={{ transform: `${show ? "rotate(180deg)" : "rotate(0)"}` }}
            >
              <IoIosArrowDown />
            </div>
          </button>
          <ul
            style={{
              transform: `${show ? "scale3d(1,1,1)" : "scale3d(1,0,1)"}`,
            }}
          >
            <li>
              <Link href="">
                <b>
                  Recommend <BsCheckLg />
                </b>
              </Link>
            </li>

            <li>
              <Link href="">Most Popular</Link>
            </li>

            <li>
              <Link href="">New Arrivals</Link>
            </li>

            <li>
              <Link href="">Top Reviewed</Link>
            </li>

            <li>
              <Link href="">Price (low to high)</Link>
            </li>

            <li>
              <Link href="">Price (high to low)</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
