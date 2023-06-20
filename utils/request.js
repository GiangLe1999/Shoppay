import axios from "axios";

export const saveCart = async (cart, user_id) => {
  try {
    const { data } = await axios.post("/api/user/saveCart", {
      cart,
      user_id,
    });
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};

export const saveAddress = async (address, user_id) => {
  try {
    const { data } = await axios.post("/api/user/saveAddress", {
      address,
      user_id,
    });
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};

export const changeDefaultAddress = async (user_id, address_id) => {
  try {
    const { data } = await axios.put("/api/user/manageAddress", {
      user_id,
      address_id,
    });
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};

export const deleteAddress = async (user_id, address_id) => {
  try {
    const { data } = await axios.post("/api/user/deleteAddress", {
      user_id,
      address_id,
    });
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};

export const applyCoupon = async (coupon, user_id) => {
  const { data } = await axios.post("/api/user/applyCoupon", {
    coupon,
    user_id,
  });
  return data;
};

export const uploadHandler = async (formData) => {
  const { data } = await axios.post("/api/cloudinary", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return data;
};
