import { Button } from "@mui/material";
import { Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { MdAssignmentAdd } from "react-icons/md";

import styled from "./styles.module.scss";
import "react-toastify/dist/ReactToastify.css";

import AdminInput from "@/components/Input/AdminInput";
import { toast } from "react-toastify";
import axios from "axios";
import AdminSelect from "@/components/Input/AdminSelect";

const SubCreate = ({ categories, setSubCategories }) => {
  const [name, setName] = useState("");
  const [parent, setParent] = useState("");

  const validate = Yup.object({
    name: Yup.string()
      .required("Sub-category name is required.")
      .min(2, "Sub-category name must be bewteen 2 and 30 characters.")
      .max(30, "Sub-category name must be bewteen 2 and 30 characters.")
      .matches(
        /^[aA-zZ\s]+$/,
        "Numbers and special characters are not allowed."
      ),
    parent: Yup.string().required("Please choose a parent category."),
  });

  const submitHandler = async () => {
    try {
      const { data } = await axios.post("/api/admin/subcategory", {
        name,
        parent,
      });
      setSubCategories(data.subCategories);
      setName("");
      setParent("");
      console.log(data);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{ name: name, parent: parent }}
        validationSchema={validate}
        onSubmit={submitHandler}
      >
        {(formik) => (
          <Form>
            <div className={styled.header}>Create a sub-category</div>
            <div className={styled.input_wrapper}>
              <AdminInput
                type="text"
                label="Sub-Category name"
                name="name"
                placeholder="Ex: Iphone, Ipad, ..."
                onChange={(e) => setName(e.target.value)}
                className="fixSpan"
              />

              <AdminSelect
                label="Parent-Category"
                name="parent"
                placeholder="Select an option ..."
                onChange={(e) => setParent(e.target.value)}
                data={categories}
                className="fixSpan"
              />
            </div>

            <div className={`${styled.btn} ${styled.form_btn}`}>
              <Button
                variant="contained"
                type="submit"
                startIcon={<MdAssignmentAdd />}
                color="info"
              >
                Add Sub-Category
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default SubCreate;
