/* eslint-disable @next/next/no-img-element */
import { useEffect } from "react";
import { BiChevronsRight } from "react-icons/bi";
import { FcInfo, FcPaid } from "react-icons/fc";
import Swal from "sweetalert2";

import styled from "../../styles/Order.module.scss";
import { Order } from "@/models/Order";
import { User } from "@/models/User";
import Header from "@/components/Cart/Header";
import db from "@/utils/db";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

import StripePayment from "@/components/StripePayment";
import axios from "axios";
import { useState } from "react";

const OrderPage = ({ orderData, paypal_client_id, stripe_public_key }) => {
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const [error, setError] = useState("");

  useEffect(() => {
    if (orderData._id) {
      paypalDispatch({
        type: "resetOptions",
        value: {
          "client-id": paypal_client_id,
          currency: "USD",
        },
      });
      paypalDispatch({
        type: "setLoadingStatus",
        value: "pending",
      });
    }
  }, [OrderPage]);

  const createOrderHandler = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [{ amount: { value: orderData.total } }],
      })
      .then((order_id) => order_id);
  };

  const onApproveHandler = (data, actions) => {
    return actions.order.capture().then(async function (details) {
      try {
        const { data } = await axios.put(`/api/order/${orderData._id}/pay`, {
          details,
          order_id: orderData._id,
        });

        Swal.fire({
          icon: "success",
          title: "Successfully!",
          text: "We'll deliver the package to you as soon as possible.",
          confirmButtonText: "Ok",
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            window.location.reload(false);
          }
        });
      } catch (error) {
        setError(error.message);
      }
    });
  };
  const onErrorHandler = (error) => {
    console.log(error);
  };

  return (
    <>
      <Header link="/checkout" text="BACK TO CHECKOUT" />
      <div className={styled.order}>
        <div className={styled.container}>
          <div className={`${styled.order__infos} ${styled.card}`}>
            <div className={styled.order__infos_heading}>
              <h1 className={styled.heading}>Review your order</h1>
              <h2>
                <span>Order_id:</span> {orderData._id}
              </h2>
            </div>
            <div className={styled.order__infos_status}>
              <span>
                <FcInfo /> Payment status :
              </span>
              {orderData.isPaid ? <span>Already</span> : <span>Not yet</span>}
            </div>
            <div className={styled.order__infos_status}>
              <span>
                <FcInfo />
                Order status :
              </span>
              <span>{orderData.status}</span>
            </div>
            <div className={styled.order__infos_status}>
              <span>
                <FcInfo /> Order details :
              </span>
              <span>
                Include {orderData.products.length}{" "}
                {orderData.products.length > 1 ? "items" : item}
              </span>
            </div>
            <div className={styled.order__products}>
              {orderData.products.map((product) => (
                <div key={product._id} className={styled.product}>
                  <div className={styled.product__img}>
                    <img src={product.image} alt={product.name} />
                  </div>
                  <div className={styled.product__infos}>
                    <h3 className={styled.product__infos_name}>
                      {product.name}
                    </h3>
                    <div className={styled.product__infos_row}>
                      <p>Color : </p>
                      {product.color.image ? (
                        <img src={product.color.image} alt="" />
                      ) : (
                        <span
                          style={{ backgroundColor: product.color.color }}
                        ></span>
                      )}
                      <BiChevronsRight /> <p>Size : </p>
                      {product.size} <BiChevronsRight /> <p>Quantity : </p>
                      {product.qty} <BiChevronsRight /> <p>Price : </p>$
                      {product.price}
                    </div>
                    <div className={styled.product__infos_total}>
                      <span>Amount :</span> $
                      {(product.price * product.qty).toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
              <div className={styled.order__total}>
                {orderData.couponApplied ? (
                  <>
                    <div className={styled.order__total_sub}>
                      <span>Subtotal</span>
                      <span>${orderData.totalBeforeDiscount}</span>
                    </div>
                    <div className={styled.order__total_sub}>
                      <span>
                        Coupon applied <em>({orderData.couponApplied})</em>
                      </span>
                      <span>
                        - $
                        {(
                          orderData.totalBeforeDiscount - orderData.total
                        ).toFixed(2)}
                      </span>
                    </div>
                    <div className={styled.order__total_sub}>
                      <span>Shipping fee</span>
                      <span>${orderData.shippingPrice.toFixed(2)}</span>
                    </div>
                    <div className={styled.order__total_sub}>
                      <span>Tax price</span>
                      <span>${orderData.taxPrice.toFixed(2)}</span>
                    </div>
                    <div className={styled.order__total_sub2}>
                      <span> TOTAL TO PAY</span>
                      <span>${orderData.total}</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className={styled.order__total_sub}>
                      <span>Tax price</span>
                      <span>{orderData.taxPrice}</span>
                    </div>
                    <div className={styled.order__total_sub}>
                      <span>TOTAL TO PAY</span>
                      <span>${orderData.total}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className={`${styled.order__actions} ${styled.card}`}>
            <h2 className={styled.heading}>Customer&apos;s order</h2>
            <div className={styled.order__address}>
              <div className={styled.order__address_userInfos}>
                <img src={orderData.user.image} alt="" />
                <div className={styled.order__address_userName}>
                  <span>{orderData.user.name}</span>
                  <span>{orderData.user.email}</span>
                </div>
              </div>
              <div className={styled.order__address_shipping}>
                <h3>Shipping address</h3>
                <div className={styled.order__address_line}>
                  <span>Full name : </span>
                  <span>
                    {orderData.shippingAddress.firstName}{" "}
                    {orderData.shippingAddress.lastName}
                  </span>
                </div>

                <div className={styled.order__address_line}>
                  <span>Address : </span>
                  <span>{orderData.shippingAddress.address1}</span>
                </div>

                <div className={styled.order__address_line}>
                  <span>State / City : </span>
                  <span>
                    {orderData.shippingAddress.state},{" "}
                    {orderData.shippingAddress.city}
                  </span>
                </div>

                <div className={styled.order__address_line}>
                  <span>Zip code : </span>
                  <span>{orderData.shippingAddress.zipCode}</span>
                </div>
              </div>

              <div className={styled.order__address_shipping}>
                <h3>Billing address</h3>
                <div className={styled.order__address_line}>
                  <span>Full name : </span>
                  <span>
                    {orderData.shippingAddress.firstName}{" "}
                    {orderData.shippingAddress.lastName}
                  </span>
                </div>

                <div className={styled.order__address_line}>
                  <span>Address : </span>
                  <span>{orderData.shippingAddress.address1}</span>
                </div>

                <div className={styled.order__address_line}>
                  <span>State / City : </span>
                  <span>
                    {orderData.shippingAddress.state},{" "}
                    {orderData.shippingAddress.city}
                  </span>
                </div>

                <div className={styled.order__address_line}>
                  <span>Zip code : </span>
                  <span>{orderData.shippingAddress.zipCode}</span>
                </div>
              </div>
            </div>
            {!orderData.isPaid ? (
              <div className={styled.order__payment}>
                {orderData.paymentMethod == "paypal" && (
                  <div>
                    {isPending ? (
                      <span>loading....</span>
                    ) : (
                      <PayPalButtons
                        createOrder={createOrderHandler}
                        onApprove={onApproveHandler}
                        onError={onErrorHandler}
                      ></PayPalButtons>
                    )}
                  </div>
                )}

                {orderData.paymentMethod == "credit_card" && (
                  <StripePayment
                    total={orderData.total}
                    order_id={orderData._id}
                    stripe_public_key={stripe_public_key}
                  />
                )}
              </div>
            ) : (
              <div className={styled.paid}>
                <FcPaid /> Payment completed!
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderPage;

export async function getServerSideProps(context) {
  const { id } = context.query;

  await db.connectDb();

  const orderData = await Order.findById(id)
    .populate({
      path: "user",
      model: User,
    })
    .lean();

  let paypal_client_id = process.env.PAYPAL_CLIENT_ID;
  let stripe_public_key = process.env.STRIPE_PUBLIC_KEY;

  db.disConnectDb();

  return {
    props: {
      orderData: JSON.parse(JSON.stringify(orderData)),
      paypal_client_id,
      stripe_public_key,
    },
  };
}
