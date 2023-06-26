/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import axios from "axios";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { MdAssignmentAdd } from "react-icons/md";
import { Button } from "@mui/material";
import { toast } from "react-toastify";

import styled from "@/styles/CreateProduct.module.scss";
import "react-toastify/dist/ReactToastify.css";
import Layout from "@/components/Admin/Layout";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import db from "@/utils/db";
import SingularSelect from "@/components/Select/SingularSelect";
import MultipleSelect from "@/components/Select/MultipleSelect";
import AdminInput from "@/components/Input/AdminInput";
import Images from "@/components/Admin/CreateProduct/Images";
import Colors from "@/components/Admin/CreateProduct/Colors";
import Styles from "@/components/Admin/CreateProduct/Styles";
import Sizes from "@/components/Admin/CreateProduct/Sizes";
import Details from "@/components/Admin/CreateProduct/Details";
import Questions from "@/components/Admin/CreateProduct/Questions";
import Swal from "sweetalert2";
import dataURItoBlob from "@/utils/dataURItoBlob";
import { uploadHandler } from "@/utils/request";
import StyledDotLoader from "@/components/Loaders/DotLoader";

const initialState = {
  name: "",
  description: "",
  brand: "",
  sku: "",
  discount: "",
  images: [],
  description_images: [],
  parent: "",
  category: "",
  subCategories: [],
  color: {
    color: "",
    image: "",
  },
  sizes: [
    {
      size: "",
      qty: "",
      price: "",
    },
  ],
  details: [
    {
      name: "",
      value: "",
    },
  ],
  questions: [
    {
      question: "",
      answer: "",
    },
  ],
  shippingFee: "",
};

export default function CreateProductPage({ parents, categories }) {
  const [product, setProduct] = useState(initialState);
  const [subs, setSubs] = useState([]);
  const [colorImage, setColorImage] = useState("");
  const [images, setImages] = useState([]);
  const [description_images, setDescription_images] = useState([]);
  const [loading, setLoading] = useState(false);

  const validate = Yup.object({
    name: Yup.string()
      .required("Please add a name")
      .min(10, "Product name must bewteen 10 and 300 characters.")
      .max(300, "Product name must bewteen 10 and 300 characters."),
    brand: Yup.string().required("Please add a brand"),
    category: Yup.string().required("Please select a category."),
    sku: Yup.string().required("Please add a sku/number"),
    color: Yup.string().required("Please add a color"),
    description: Yup.string().required("Please add a description"),
  });

  //Khi change parent input field, thực hiện fetch API theo _id của parent product để nhận về data
  useEffect(() => {
    axios
      .get(`/api/admin/product/${product.parent}`)
      .then(({ data }) => {
        if (data) {
          setProduct({
            ...product,
            name: data.name,
            description: data.description,
            brand: data.brand,
            category: data.category,
            subCategories: data.subCategories,
            questions: [],
            details: [],
          });

          toast.success(
            "Chose parent. No need to choose Category & Sub-Categories any more."
          );
        }
      })
      .catch((e) => console.log(e));
  }, [product.parent]);

  //Fetch về toàn bộ subCategory của 1 Category
  useEffect(() => {
    axios
      .get(`/api/admin/subcategory?category=${product.category}`)
      .then(({ data }) => {
        setSubs(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [product.category]);

  const createProductHandler = async (e) => {
    if (images.length < 1) {
      Swal.fire({
        icon: "error",
        title: "Not found any images!",
        text: "Please upload at least 1 image of product (Step 2).",
      });
      return;
    }

    if (product.color.color == "" && product.color.image == "") {
      Swal.fire({
        icon: "error",
        title: "Not found any main color!",
        text: "Please choose a main color for product (Step 3).",
      });
      return;
    }

    for (let i = 0; i < product.sizes.length; i++) {
      if (
        product.sizes[i].size == "" ||
        product.sizes[i].price == "" ||
        product.sizes[i].qty == ""
      ) {
        Swal.fire({
          icon: "error",
          title: "Lack of sizes infos!",
          text: "Please fill all informations on sizes (Step 5).",
        });
        setLoading(false);

        return;
      }
    }

    setLoading(true);

    let uploaded_images = [];
    let style_image = "";

    if (images) {
      let temp = images.map((img) => dataURItoBlob(img));
      const path = "product images";
      let formData = new FormData();
      formData.append("path", path);
      temp.forEach((image) => {
        formData.append("file", image);
      });
      //Upload ảnh product lên Cloudinary và nhận về mảng chứa các URL
      uploaded_images = await uploadHandler(formData);
    }

    if (product.color.image) {
      let temp = dataURItoBlob(product.color.image);
      const path = "product style images";
      let formData = new FormData();
      formData.append("path", path);
      formData.append("file", temp);
      //Upload Color image lên Cloudinary và nhận về URL
      let cloudinary_style_img = await uploadHandler(formData);
      style_image = cloudinary_style_img[0].url;
    }

    try {
      const { data } = await axios.post("/api/admin/product", {
        ...product,
        images: uploaded_images,
        color: {
          image: style_image,
          color: product.color.color,
        },
      });

      setLoading(false);

      toast.success(data.message);

      window.location.reload(false);
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const selectHandleChange = (name, value) => {
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Layout>
      {loading && <StyledDotLoader />}
      <div className={styled.header}>Create product</div>
      <Formik
        enableReinitialize
        initialValues={{
          name: product.name,
          brand: product.brand,
          description: product.description,
          category: product.category,
          subCategories: product.subCategories,
          parent: product.parent,
          sku: product.sku,
          discount: product.discount,
          color: product.color.color,
          imageInputFile: "",
          styleInput: "",
        }}
        validationSchema={validate}
        validator={() => ({})}
        onSubmit={createProductHandler}
      >
        {(formik) => (
          <Form>
            <div className={styled.form__row_section}>
              <div className={styled.subHeader}>
                <span>Step 1 :</span> &nbsp;Add to an existing product
                (required)
              </div>
              {/* Onchange sẽ thay đổi value của state parent thành _id của product được chọn */}
              <div className={styled.form__row_flex}>
                <SingularSelect
                  name="parent"
                  placeholder="Parent product"
                  data={parents}
                  header="Add to an existing product"
                  handleChange={selectHandleChange}
                />

                <SingularSelect
                  name="category"
                  placeholder="Category"
                  data={categories}
                  header="Select a category"
                  handleChange={selectHandleChange}
                  //Nếu đã có parent thì không cần phải chọn Category và Subs nữa
                  disabled={product.parent}
                />
              </div>

              <MultipleSelect
                data={subs}
                header="Sub-Categories"
                name="subCategories"
                handleChange={handleChange}
                //Nếu đã có parent thì không cần phải chọn Category và Subs nữa
                disabled={product.parent}
                value={product.category}
              />
            </div>

            <div className={styled.form__row_section}>
              <div className={styled.subHeader}>
                <span>Step 2 :</span> &nbsp;Upload images (required)
              </div>
              <Images
                name="imageInputFile"
                header=""
                text="Add images"
                images={images}
                setImages={setImages}
                setColorImage={setColorImage}
              />
            </div>

            <div className={styled.form__row_section}>
              <div className={styled.subHeader}>
                <span>Step 3 :</span> &nbsp;Pick product color (required)
              </div>

              <Colors
                name="color"
                product={product}
                setProduct={setProduct}
                colorImage={colorImage}
                setColorImage={setColorImage}
                images={images}
              />
              <div className={styled.form__row_flex}>
                {product.color.color && (
                  <div className={styled.color_span}>
                    <span>
                      Color&nbsp;
                      <b style={{ fontWeight: 600 }}>{product.color.color}</b>
                      &nbsp;has been chosen
                    </span>
                    <span style={{ background: product.color.color }}></span>
                  </div>
                )}
              </div>
            </div>

            <div className={styled.form__row_section}>
              <Styles product={product} setProduct={setProduct} />
              {product.color.image && (
                <img
                  src={product.color.image}
                  className={styled.image_span}
                  alt=""
                />
              )}
            </div>

            <div className={styled.form__row_section}>
              <div className={styled.subHeader}>
                <span>Step 4 :</span> &nbsp;Basic infos (required)
              </div>
              <AdminInput
                type="text"
                label="Name"
                name="name"
                placeholder=""
                onChange={handleChange}
                className="fixSpan"
              />
              <div className={styled.form__row_flex}>
                <AdminInput
                  type="text"
                  label="SKU"
                  name="sku"
                  placeholder=""
                  onChange={handleChange}
                  className="fixSpan"
                />
                <AdminInput
                  type="text"
                  label="Description"
                  name="description"
                  placeholder=""
                  onChange={handleChange}
                  className="fixSpan"
                />
              </div>
              <div className={styled.form__row_flex}>
                <AdminInput
                  type="text"
                  label="Brand"
                  name="brand"
                  placeholder=""
                  onChange={handleChange}
                  className="fixSpan"
                />
                <AdminInput
                  type="text"
                  label="Discount"
                  name="discount"
                  placeholder=""
                  onChange={handleChange}
                  className="fixSpan"
                />
              </div>
            </div>

            <div className={styled.form__row_section}>
              <div className={styled.subHeader}>
                <span>Step 5 :</span> &nbsp;Choose sizes, quantity & price
                (required)
              </div>
              <Sizes
                sizes={product.sizes}
                product={product}
                setProduct={setProduct}
              />
            </div>

            <div className={styled.form__row_section}>
              <div className={styled.subHeader}>
                <span>Step 6 :</span> &nbsp;Additional details (optional)
              </div>
              <Details
                details={product.details}
                product={product}
                setProduct={setProduct}
              />
            </div>

            <div className={styled.form__row_section}>
              <div className={styled.subHeader}>
                <span>Step 7 :</span> &nbsp;Common questions (optional)
              </div>

              <Questions
                questions={product.questions}
                product={product}
                setProduct={setProduct}
              />
            </div>

            <div className={`${styled.btn} ${styled.submit_btn}`}>
              <Button
                variant="contained"
                type="submit"
                startIcon={<MdAssignmentAdd />}
                color="info"
              >
                Create product
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Layout>
  );
}

export async function getServerSideProps(ctx) {
  await db.connectDb();
  // Chỉ chọn 2 field name và subProducts
  const results = await Product.find().select("name subProducts").lean();
  const categories = await Category.find().lean();

  db.disConnectDb();

  return {
    props: {
      parents: JSON.parse(JSON.stringify(results)),
      categories: JSON.parse(JSON.stringify(categories)),
    },
  };
}
