**Shoppay Fullstack E-Commerce Store**
======================================

Website gồm:

- Giao diện phục vụ khách hàng

- Admin Dashboard

**Công nghệ sử dụng**
----------------------------------------

- NextJS / Next Auth
- React / Redux Toolkit
- SASS
- Material UI (MUI)
- Formik
- MongoDB

**Một số tính năng chính**
----------------------------------------

- Giao diện phục vụ khách hàng
- Admin Dashboard

**Giao diện Website phục vụ khách hàng**
----------------------------------------

### **Homepage**
**Banner sử dụng SwiperJS**.

![shoppay-home-page](https://github.com/GiangLe1999/Shoppay/assets/100833182/74529668-d93e-4b1d-88d4-4596cd097932)


**Giao diện Flash Sale với đồng hồ đếm ngược**.

![shoppay-flash-sale](https://github.com/GiangLe1999/Shoppay/assets/100833182/87f43445-1271-4750-9a0f-0f95135cb6de)


**Product card sẽ gồm thông tin các biến thể: Phân loại theo màu sắc, size. Mỗi biến thể sẽ có thông tin khuyến mãi, giá tiền và hình ảnh hiển thị khác nhau.**

![product-card](https://github.com/GiangLe1999/Shoppay/assets/100833182/b240739d-0dbf-4dc1-954a-d51ba62ad660)

### **Single product page**

**Phần thông tin sản phẩm khác nhau tùy vào màu sắc, size. Hình ảnh có chức năng Zoom X2.**

![shoppay-product-page](https://github.com/GiangLe1999/Shoppay/assets/100833182/f8fb8041-b15a-482d-8210-188395c9508f)

![shoppay-product-page-different-color](https://github.com/GiangLe1999/Shoppay/assets/100833182/47c23e70-7d44-424c-8a71-baeaed5fbe4b)


**Click vào ảnh để xem mở lốc ảnh của sản phẩm.**

![product-images](https://github.com/GiangLe1999/Shoppay/assets/100833182/115161c0-6ad5-4122-9248-5dbbffdffdd9)

**Nút Add to Cart thêm trực tiếp sản phẩm có size, màu sắc đang được chọn vào giỏ hàng.**

![shoppay-add-to-cart](https://github.com/GiangLe1999/Shoppay/assets/100833182/534053fc-2366-40d8-8bdc-1a1bd29cd1ce)

![add-to-cart-sucessfully](https://github.com/GiangLe1999/Shoppay/assets/100833182/1f873664-3f20-4a07-bc17-1739a2d6afc9)


**Chỉ số rating dựa vào số sao người dùng đánh giá.**

![product-rating](https://github.com/GiangLe1999/Shoppay/assets/100833182/41b31933-13c2-4827-b37c-2143d579ad2f)

**Phần đánh giá cho phép người đăng tải cả hình ảnh sản phẩm.**

![product-review](https://github.com/GiangLe1999/Shoppay/assets/100833182/f3894766-7f59-4a1d-ad0f-c229f4817a45)

![comment-with-image](https://github.com/GiangLe1999/Shoppay/assets/100833182/56edc327-ff59-4a79-b6b4-9949899a5187)


### **Cart page**

**Trang giỏ hàng cho phép các hành động CRUD, manage bằng Redux toolkit.**

![cart-page](https://github.com/GiangLe1999/Shoppay/assets/100833182/79bba207-0187-4611-b4c4-af6995886df8)

### **Checkout page**

**Checkout page cho phép người thêm nhiều địa chỉ, lựa chọn địa chỉ nào là địa chỉ chính.**
**Cho phép lựa chọn phương thức thanh toán: Paypal, Credit card hoặc Pay on cash.**

![checkout-page](https://github.com/GiangLe1999/Shoppay/assets/100833182/1454d3fc-1f35-4c72-87d8-f9f6b44997fb)


**Trang thanh toán liệt kê chi tiết đơn hàng và là nơi khách hàng thực hiện thanh toán (Paypal hoặc Credit card).**

![pay-for-order](https://github.com/GiangLe1999/Shoppay/assets/100833182/76980d3d-487e-4180-88c2-27ff0c8961bd)

### **Profile page**

**Wishlist được lưu vào data của mỗi người dùng. Có thể đẩy sản phẩm từ Wishlist sang giỏ hàng.**

![wish-list-page](https://github.com/GiangLe1999/Shoppay/assets/100833182/eb2184ec-04e3-4029-b1a7-0793b8d24bfb)


**Trang Profile cho phép chỉnh sửa hồ sơ cá nhân, xem chi tiết đơn hàng, lựa chọn phương thức thanh toán mặc định, lựa chọn địa chỉ nhận hàng mặc định, ...**

![profile-page](https://github.com/GiangLe1999/Shoppay/assets/100833182/edea0a9a-b4de-491b-8479-a5be12bdaf04)

### **Filter  & Sort page**

**Trang filter & sort hỗ trợ người dùng lọc sản phẩm theo danh mục, màu sắc, size, thuộc tính, có ship hay miễn phí ship, ... Sort theo giá, theo độ phổ biến, theo chất lượng, ...**

![filter-page](https://github.com/GiangLe1999/Shoppay/assets/100833182/2bb7da0c-5d80-4543-8ced-22b5bc641c8a)

### **Authentication page**

**Trang Authentication cho phép Đăng ký và Đăng nhập tài khoản (nếu có). Hỗ trợ đăng nhập bằng Github, Google, Twitter, Facebook, Auth0.**

![authentication-page](https://github.com/GiangLe1999/Shoppay/assets/100833182/5d37a769-0771-4c75-b560-c69a070b9907)


**Hỗ trợ người dùng lấy lại mật khẩu bằng cách gửi về Email chứa link reset password.**

![forgot-password](https://github.com/GiangLe1999/Shoppay/assets/100833182/8128c830-3871-42e3-80b2-b6eceff0026c)

**Giao diện Admin Dashboard**
-----------------------------
![admin-dashboard](https://github.com/GiangLe1999/Shoppay/assets/100833182/8db0cf9c-0bc8-41a6-8573-d08dda50b401)
![create-product](https://github.com/GiangLe1999/Shoppay/assets/100833182/d23d7f5e-6b0c-4c3b-b9d7-454ca789c4d5)
