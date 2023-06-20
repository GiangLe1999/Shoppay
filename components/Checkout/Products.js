/* eslint-disable @next/next/no-img-element */
import { VscDebugBreakpointFunction } from "react-icons/vsc";
import { BsArrowReturnRight } from "react-icons/bs";

import styled from "./styles.module.scss";

const Products = ({ cart }) => {
  return (
    <div className={`${styled.products} ${styled.card}`}>
      <div className={styled.products__header}>
        <h2 className={styled.heading}>
          Cart{" "}
          <span>
            (
            {`${cart.products.length} ${
              cart.products.length > 1 ? "items" : "item"
            }`}
            )
          </span>
        </h2>
      </div>
      <div className={styled.products__wrap}>
        {cart.products.map((product, index) => {
          return (
            <div className={styled.product} key={index}>
              <div className={styled.product__image}>
                <img src={product.image} alt="" />
              </div>
              <div className={styled.product__infos_wrapper}>
                <h3>{product.name}</h3>
                <div className={styled.product__infos}>
                  <p>
                    <VscDebugBreakpointFunction />
                    <span>Color : </span>{" "}
                    {product.color.image ? (
                      <img src={product.color.image} alt="" />
                    ) : (
                      <span
                        style={{
                          background: product.color.color,
                          width: "15px",
                          height: "15px",
                          borderRadius: "50%",
                          display: "inline-block",
                        }}
                      ></span>
                    )}
                  </p>
                  <p>
                    <VscDebugBreakpointFunction />
                    <span>Size : </span>
                    {product.size}
                  </p>
                  <p>
                    <VscDebugBreakpointFunction />

                    <span>Quantity : </span>
                    {product.qty}
                  </p>
                  <p>
                    <VscDebugBreakpointFunction />
                    <span>Price : </span>${product.price}/item
                  </p>
                  <div className={styled.product__total}>
                    <BsArrowReturnRight />{" "}
                    <p>${(product.price * product.qty).toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className={styled.products__subTotal}>
        Subtotal : <span>${cart.cartTotal.toFixed(2)}</span>
        <span>(this price does not include shipping cost)</span>
      </div>
    </div>
  );
};

export default Products;
