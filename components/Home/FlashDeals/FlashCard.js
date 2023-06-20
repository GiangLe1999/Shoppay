/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { MdFlashOn } from "react-icons/md";
import styled from "./styles.module.scss";

const FlashCard = ({ product }) => {
  return (
    <div className={styled.card}>
      <div className={styled.card__img}>
        <div className={styled.flash}>
          <MdFlashOn />
          <span>-{product.discount}%</span>
        </div>
        <Link href={product.link}>
          <img src={product.image} alt="" />
        </Link>
      </div>
      <div className={styled.card__infos}>
        <div className={styled.card__price}>
          <span>
            $
            {(product.price - (product.price * product.discount) / 100).toFixed(
              2
            )}
          </span>
          <span>
            {(
              product.price -
              product.price -
              (product.price * product.discount) / 100
            ).toFixed(2)}
            $
          </span>
        </div>
        <div className={styled.card__bar}>
          <div
            className={styled.card__bar_inner}
            style={{ width: "75%" }}
          ></div>
        </div>
        <div className={styled.card__percentage}>{product.sold}%</div>
      </div>
    </div>
  );
};

export default FlashCard;
