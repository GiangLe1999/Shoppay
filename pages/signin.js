/* eslint-disable @next/next/no-img-element */
import LoginInput from "@/components/Input/LoginInput";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineBackward } from "react-icons/ai";
import { BsCheckCircleFill } from "react-icons/bs";
import { MdCancel } from "react-icons/md";
import { useRouter } from "next/router";
import {
  getCsrfToken,
  getProviders,
  getSession,
  signIn,
} from "next-auth/react";
import axios from "axios";

import styled from "../styles/Signin.module.scss";
import HasIconButton from "@/components/Button/HasIconButton";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import StyledDotLoader from "@/components/Loaders/DotLoader";

const initialValues = {
  login_email: "",
  login_password: "",
  full_name: "",
  email: "",
  password: "",
  confirm_password: "",
  success: "",
  error: "",
  login_error: "",
};

const SigninPage = ({ providers, callbackUrl, csrfToken }) => {
  const Router = useRouter();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(initialValues);
  const {
    login_email,
    login_password,
    full_name,
    email,
    password,
    confirm_password,
    success,
    error,
    login_error,
  } = user;

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const loginValidation = Yup.object({
    login_email: Yup.string()
      .required("Email address is required")
      .email("Please enter a valid email address"),
    login_password: Yup.string().required("Please enter your password"),
  });

  const registerValidation = Yup.object({
    full_name: Yup.string()
      .required("What's your name?")
      .min(2, "Your name must be between 2 and 16 charaters")
      .max(16, "Your name must be between 2 and 16 charaters")
      .matches(/^[aA-zZ]/, "Numbers and special charaters are not allowed"),
    email: Yup.string()
      .required("You'll need this when you log in and reset your password")
      .email("Enter a valid email address"),
    password: Yup.string()
      .required("Your account need a password")
      .min(6, "Password must be at least 6 characters")
      .max(36, "Password can't be more than 36 characters"),
    confirm_password: Yup.string()
      .required("Confirm your password")
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });

  const signUpHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/auth/signup", {
        full_name,
        email,
        password,
      });
      setUser({ ...user, error: "", success: data.message });
      setLoading(false);
      setTimeout(async () => {
        let options = {
          redirect: false,
          // Đẩy email và password về cho Credentials
          email: email,
          password: password,
        };

        // Thực hiện login bằng Credentials Provider
        await signIn("credentials", options);
        // Chuyển hướng về Home page
        Router.push("/");
      }, 2000);
    } catch (error) {
      setLoading(false);
      setUser({ ...user, success: "", error: error.response.data.message });
    }
  };

  const signInHandler = async () => {
    setLoading(true);
    // Object options của Credentials Provider
    let options = {
      redirect: false,
      // Đẩy email và password về cho Credentials
      email: login_email,
      password: login_password,
    };

    // Thực hiện login bằng Credentials Provider
    const res = await signIn("credentials", options);

    setUser({ ...user, success: "", error: "" });
    setLoading(false);

    if (res?.error) {
      // Nếu login không thành công, in ra lỗi
      setLoading(false);
      setUser({ ...user, login_error: res?.error });
    } else {
      // Nếu login thành công, tự động chuyển hướng về trang trước khi đăng nhập
      return Router.push(callbackUrl || "/");
    }
  };

  return (
    <>
      {loading && <StyledDotLoader />}
      <Header />
      <div className={styled.login}>
        <div className={styled.login__container}>
          <div className={styled.login__header}>
            <div className={styled.back__svg}>
              <AiOutlineBackward />
            </div>
            <span>
              We&apos;d be happy to have you join us!{" "}
              <Link href="/">Go Store</Link>
            </span>
          </div>
          <div className={styled.login__form}>
            <h1>Sign in</h1>
            <p>Get access to your registered account.</p>
            <Formik
              //reset the form if initialValues changes
              enableReinitialize
              //initial field values of the form
              initialValues={{ login_email, login_password }}
              //A Yup schema or a function that returns a Yup schema. This is used for validation
              validationSchema={loginValidation}
              onSubmit={() => {
                signInHandler();
              }}
            >
              {(form) => (
                <Form method="post" action="/api/auth/signin/email">
                  <input
                    name="csrfToken"
                    type="hidden"
                    defaultValue={csrfToken}
                  />
                  <LoginInput
                    icon="email"
                    placeholder="Your email address"
                    type="text"
                    id="login_email"
                    name="login_email"
                    label="Email"
                    onChange={inputChangeHandler}
                  />
                  <LoginInput
                    label="Password"
                    icon="password"
                    id="login_password"
                    placeholder="Your password"
                    type="text"
                    name="login_password"
                    onChange={inputChangeHandler}
                  />
                  <div className={styled.forgot}>
                    <Link href="/auth/forgot">Forgot password?</Link>
                  </div>
                  <div className={styled.signInBtnWrap}>
                    <HasIconButton type="submit">Sign in</HasIconButton>
                  </div>
                  {login_error && (
                    <span className={styled.error}>
                      <MdCancel /> {login_error}
                    </span>
                  )}
                </Form>
              )}
            </Formik>
            <div className={styled.login__socials}>
              <span className={styled.or}>Or continue with</span>
              <div className={styled.login__socials_wrap}>
                {providers.map((provider) => {
                  if (provider.name === "Credentials") {
                    return;
                  }
                  return (
                    <div key={provider.id}>
                      <button
                        className={styled.social__btn}
                        onClick={() => signIn(provider.id)}
                      >
                        <img
                          src={`./icons/${provider.name}.png`}
                          alt={provider.name}
                        />
                        <p>Sign in with {provider.name}</p>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className={styled.login__container}>
          <div className={styled.login__form}>
            <h2>Sign up</h2>
            <p>Get access to the best E-Shopping services.</p>
            <Formik
              //reset the form if initialValues changes
              enableReinitialize
              //initial field values of the form
              initialValues={{ full_name, email, password, confirm_password }}
              //A Yup schema or a function that returns a Yup schema. This is used for validation
              validationSchema={registerValidation}
              onSubmit={() => {
                signUpHandler();
              }}
            >
              {(form) => (
                <Form>
                  <LoginInput
                    icon="user"
                    placeholder="Your full name"
                    type="text"
                    id="full_name"
                    name="full_name"
                    label="Full name"
                    onChange={inputChangeHandler}
                  />
                  <LoginInput
                    label="Email"
                    icon="email"
                    id="email"
                    placeholder="Your email address"
                    type="text"
                    name="email"
                    onChange={inputChangeHandler}
                  />
                  <LoginInput
                    label="Password"
                    icon="password"
                    id="password"
                    placeholder="Your password"
                    type="text"
                    name="password"
                    onChange={inputChangeHandler}
                  />
                  <LoginInput
                    label="Repeat password"
                    icon="repeat"
                    id="confirm_password"
                    placeholder="Retype your password"
                    type="text"
                    name="confirm_password"
                    onChange={inputChangeHandler}
                  />
                  <div className={styled.signUpBtnWrap}>
                    <HasIconButton type="submit">Sign up</HasIconButton>
                  </div>
                </Form>
              )}
            </Formik>
            <div>
              {success && (
                <span className={styled.success}>
                  {" "}
                  <BsCheckCircleFill />
                  {success}
                </span>
              )}
            </div>
            <div>
              {error && (
                <span className={styled.error}>
                  {" "}
                  <MdCancel />
                  {error}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default SigninPage;

export async function getServerSideProps(context) {
  const { req, query } = context;
  // Extract callbackUrl từ query (URL của trang trước khi truy cập vào login page)
  const { callbackUrl } = query;

  const session = await getSession({ req });

  if (session) {
    return {
      // Nếu người dùng đã đăng nhập protect Signin Page
      // bằng cách chuyển hướng người dùng về lại trang trước đó
      redirect: {
        destination: callbackUrl,
      },
    };
  }

  //get csrfToken bằng method getCsrfToken của next-auth
  const csrfToken = await getCsrfToken(context);

  const providers = Object.values(await getProviders());
  return {
    // Pass thêm csrfToken và callbackUrl vào props
    props: {
      providers,
      csrfToken,
      callbackUrl,
    },
  };
}
