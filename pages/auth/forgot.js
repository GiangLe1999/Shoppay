import Link from "next/link";
import { AiOutlineBackward } from "react-icons/ai";
import { BsCheckCircleFill } from "react-icons/bs";
import { MdCancel } from "react-icons/md";
import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import LoginInput from "@/components/Input/LoginInput";
import HasIconButton from "@/components/Button/HasIconButton";
import styled from "../../styles/Forgot.module.scss";
import axios from "axios";
import StyledDotLoader from "@/components/Loaders/DotLoader";

const Forgot = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const emailValidation = Yup.object({
    email: Yup.string()
      .required("Email address is required")
      .email("Please enter a valid email address"),
  });

  const forgotHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/auth/forgot", { email });
      setError("");
      setSuccess(data.message);
      setLoading(false);
    } catch (error) {
      setSuccess("");
      setLoading(false);
      setError(error.response.data.message);
    }
  };

  return (
    <>
      {loading && <StyledDotLoader />}
      <Header />
      <div className={styled.forgot}>
        <div className={styled.forgot__wrap}>
          <div className={styled.forgot__header}>
            <div className={styled.back__svg}>
              <AiOutlineBackward /> Back to login page
            </div>
            <p>Let us know your email to receive password reset link.</p>
          </div>
          <div className={styled.forgot__form}>
            <Formik
              enableReinitialize
              initialValues={{ email }}
              validationSchema={emailValidation}
              onSubmit={() => {
                forgotHandler();
              }}
            >
              {(form) => (
                <Form>
                  <LoginInput
                    icon="email"
                    placeholder="Type here if you remember it"
                    type="text"
                    id="email"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <div className={styled.btnWrap}>
                    <HasIconButton type="submit">Submit</HasIconButton>
                  </div>
                  {success && !error && (
                    <span className={styled.success}>
                      <BsCheckCircleFill />
                      {success}
                    </span>
                  )}
                  {error && !success && (
                    <span className={styled.error}>
                      <MdCancel />
                      {error}
                    </span>
                  )}
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Forgot;
