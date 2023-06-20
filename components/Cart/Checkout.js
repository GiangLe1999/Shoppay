import { FcShipped } from "react-icons/fc";

import styled from "./styles.module.scss";

const Checkout = ({
  subTotal,
  shippingFee,
  total,
  selected,
  saveCartToDbHandler,
}) => {
  return (
    <div className={`${styled.cart__checkout} ${styled.card}`}>
      {/* Line 1 */}
      <div className={styled.cart__checkout_line}>
        <span>Subtotal</span>
        <span>${subTotal}</span>
      </div>

      {/* Line 2 */}
      <div className={styled.cart__checkout_line}>
        <span>Shipping</span>
        <span>${shippingFee}</span>
      </div>

      {/* Line 3 */}
      <div className={styled.cart__checkout_total}>
        <span>Total</span>
        <span>${total}</span>
      </div>

      <span className={styled.cart__checkout_tax}>(Tax included if any)</span>

      <div className={styled.cart__checkout_days}>
        <span>Receive after</span>
        <span>
          <FcShipped /> 3 days
        </span>
      </div>

      <div className={styled.cart__checkout_note}>
        <span>
          * Clicking &quot;Continue&quot; means you agree to abide by the
          Shoppay Terms
        </span>
      </div>

      <div className={styled.cart__checkout_submit}>
        <button
          disabled={selected?.length === 0}
          style={{
            background: `${selected?.length === 0 ? "#eee" : ""}`,
            cursor: `${selected?.length === 0 ? "not-allowed" : ""}`,
          }}
          onClick={() => saveCartToDbHandler()}
        >
          Continue ({selected?.length})
        </button>
      </div>
    </div>
  );
};

export default Checkout;
