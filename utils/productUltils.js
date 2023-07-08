import { addToCart, updateCart } from "@/store/cartSlice";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const sortPricesArr = (products) => {
  return products.map((product) => product.price).sort((a, b) => a - b);
};

export const priceAfterDiscount = (beforePrice, discount) => {
  return (beforePrice - (beforePrice * discount) / 100).toFixed(2);
};

export const findAllSizes = (subProducts) => {
  const sizeObjectsArr = subProducts
    .map((subProduct) => subProduct.sizes)
    .flat();

  const sizeArr = sizeObjectsArr
    .map((sizeObj) => sizeObj.size)
    .sort((a, b) => a - b);

  return [...new Set(sizeArr)];
};

export const calculatePercentage = (reviewsArr, numsOfStar) => {
  const reviewNumsByStar = reviewsArr.filter(
    (r) => r.rating === numsOfStar || r.rating - 0.5 === numsOfStar
  );

  return ((reviewNumsByStar.length / reviewsArr.length) * 100).toFixed(1);
};

export const addToCartHandler = async (e, id, style, size, cart, dispatch) => {
  e.preventDefault();
  e.stopPropagation();
  const { data } = await axios.get(
    `/api/product/${id}?style=${style}&size=${size}`
  );

  if (data.quantity < 1) {
    toast.error("This product is out of stock");
  } else {
    let _uniqueId = `${id}_${style}_${size}`;

    let exist = cart.cartItems.find((p) => p._uniqueId === _uniqueId);

    if (exist) {
      let newCart = cart.cartItems.map((p) => {
        if (p._uniqueId == exist._uniqueId) {
          return { ...p, qty: p.qty + 1 };
        }
        return p;
      });
      dispatch(updateCart(newCart));
      toast.success(
        "Increase quantity of this product in your cart successfully!"
      );
    } else {
      dispatch(
        addToCart({
          ...data,
          qty: 1,
          size: data.size,
          sizeIndex: size,
          _uniqueId,
        })
      );

      toast.success("Add product to cart successfully!");
    }
  }
};

export const calculateSubPrice = (items) => {
  const newSubTotal = items.reduce((a, c) => a + Number(c.price) * c.qty, 0);
  return Number(newSubTotal).toFixed(2);
};

export const calculateTotalShipping = (items) => {
  const newShippingFee = items?.reduce((a, c) => a + Number(c.shipping), 0);
  return Number(newShippingFee).toFixed(2);
};

export const calculateTotal = (items) => {
  const newTotal = items.reduce(
    (a, c) => a + Number(c.shipping) + Number(c.price) * c.qty,
    0
  );
  return Number(newTotal).toFixed(2);
};
