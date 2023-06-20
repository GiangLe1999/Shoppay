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

const Create = ({ setCategories }) => {
  const [name, setName] = useState("");
  const validate = Yup.object({
    name: Yup.string()
      .required("Category name is required.")
      .min(2, "Category name must be bewteen 2 and 30 characters.")
      .max(30, "Category name must be bewteen 2 and 30 characters.")
      .matches(
        /^[aA-zZ\s]+$/,
        "Numbers and special characters are not allowed."
      ),
  });

  const inputChangeHandler = (e) => setName(e.target.value);

  const submitHandler = async () => {
    try {
      const { data } = await axios.post("/api/admin/category", { name });
      setCategories(data.categories);
      setName("");
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{ name }}
        validationSchema={validate}
        onSubmit={submitHandler}
      >
        {(formik) => (
          <Form>
            <div className={styled.header}>Create a category</div>
            <AdminInput
              type="text"
              label="Category name"
              name="name"
              placeholder="Ex: Smartphone, Accessories, ..."
              onChange={inputChangeHandler}
            />
            <div className={`${styled.btn} ${styled.form_btn}`}>
              <Button
                variant="contained"
                type="submit"
                startIcon={<MdAssignmentAdd />}
                color="info"
              >
                Add category
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Create;
