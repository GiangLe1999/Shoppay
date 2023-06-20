import { AiOutlineBackward } from "react-icons/ai";
import { MdCancel } from "react-icons/md";
import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import jwt from "jsonwebtoken";
import { signIn } from "next-auth/react";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import LoginInput from "@/components/Input/LoginInput";
import HasIconButton from "@/components/Button/HasIconButton";
import styled from "../../../styles/Forgot.module.scss";
import StyledDotLoader from "@/components/Loaders/DotLoader";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { BsCheckCircleFill } from "react-icons/bs";

const ResetPassword = ({ user_id }) => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirm_password] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const passwordValidation = Yup.object({
    password: Yup.string()
      .required("Please enter your new password")
      .min(6, "Password must be atleast 6 characters")
      .max(36, "Password can't be more than 36 characters"),
    confirm_password: Yup.string()
      .required("Confirm your password")
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });

  const resetHandler = async () => {
    try {
      setLoading(true);

      const { data } = await axios.put("/api/auth/reset", {
        user_id,
        password,
      });

      setLoading(false);
      setError("");
      setSuccess("Successfully! Back to Home Page after 2 seconds.");

      let options = {
        redirect: false,
        email: data.message.email,
        password: password,
      };
      setTimeout(async () => {
        await signIn("credentials", options);
        window.location.reload(true);
      }, 2000);
    } catch (error) {
      setSuccess("");
      setLoading(false);
      setError(error?.response?.data?.message);
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
          </div>
          <div className={styled.forgot__form}>
            <Formik
              enableReinitialize
              initialValues={{ password, confirm_password }}
              validationSchema={passwordValidation}
              onSubmit={() => {
                resetHandler();
              }}
            >
              {(form) => (
                <Form>
                  <LoginInput
                    icon="password"
                    label="Your new password"
                    placeholder="At least 6 charaters"
                    type="password"
                    id="password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <LoginInput
                    icon="repeat"
                    label="Confirm your new password"
                    placeholder="Exactly match with your new password"
                    type="password"
                    id="confirm_password"
                    name="confirm_password"
                    onChange={(e) => setConfirm_password(e.target.value)}
                  />
                  <div className={styled.btnWrap}>
                    <HasIconButton type="submit">Change password</HasIconButton>
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

export default ResetPassword;

export async function getServerSideProps(context) {
  const { query, req } = context;
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }

  const token = query.token;
  const user_id = jwt.verify(token, process.env.RESET_TOKEN_SECRET);
  return {
    props: {
      user_id: user_id.id,
    },
  };
}
