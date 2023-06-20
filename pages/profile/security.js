import { Form, Formik } from "formik";
import { getSession, signOut } from "next-auth/react";
import React, { useState } from "react";
import * as Yup from "yup";

import styled from "@/styles/Profile.module.scss";
import "react-toastify/dist/ReactToastify.css";

import LoginInput from "@/components/Input/LoginInput";
import Layout from "@/components/Profile/Layout";
import { Button } from "@mui/material";
import { RiExchangeLine } from "react-icons/ri";
import { toast } from "react-toastify";
import axios from "axios";

export default function ProfileSecurity({ user, tab }) {
  const [current_password, setCurrent_password] = useState("");
  const [password, setPassword] = useState("");
  const [conf_password, setConf_password] = useState("");

  const validate = Yup.object({
    current_password: Yup.string()
      .required(
        "Enter a combination of at least six numbers, letters and punctuation marks (such as ! and &)."
      )
      .min(6, "Password must be atleast 6 characters.")
      .max(36, "Password can't be more than 36 characters"),
    password: Yup.string()
      .required(
        "Enter a combination of at least six numbers, letters and punctuation marks (such as ! and &)."
      )
      .min(6, "Password must be atleast 6 characters.")
      .max(36, "Password can't be more than 36 characters"),
    conf_password: Yup.string()
      .required("Confirm your password.")
      .oneOf([Yup.ref("password")], "Passwords must match."),
  });

  const changePasswordHandler = async () => {
    try {
      const { data } = await axios.put("/api/user/changePassword", {
        current_password,
        password,
      });
      setCurrent_password("");
      setPassword("");
      setConf_password("");
      toast.success(data.message);
      signOut();
    } catch (error) {
      return toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <Layout session={user.user} tab={tab}>
        <div className={styled.security}>
          <h1 className={styled.title}>My Account Password</h1>
          <Formik
            enableReinitialize
            initialValues={{ current_password, password, conf_password }}
            validationSchema={validate}
            onSubmit={changePasswordHandler}
          >
            {(form) => (
              <Form>
                <LoginInput
                  icon="password"
                  placeholder="Your account current password"
                  type="password"
                  name="current_password"
                  label="Current password"
                  value={current_password}
                  onChange={(e) => setCurrent_password(e.target.value)}
                />
                <LoginInput
                  icon="password"
                  placeholder="Your new password"
                  type="password"
                  name="password"
                  value={password}
                  label="New password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <LoginInput
                  icon="repeat"
                  placeholder="Retype your new password"
                  type="password"
                  name="conf_password"
                  value={conf_password}
                  label="Confirm new password"
                  onChange={(e) => setConf_password(e.target.value)}
                />

                <div className={styled.btn}>
                  <Button
                    startIcon={<RiExchangeLine />}
                    className={styled.btn}
                    variant="contained"
                    type="submit"
                  >
                    Change password
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Layout>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const { query, req } = ctx;
  const session = await getSession(ctx);
  const tab = query.tab || 0;

  return {
    props: {
      user: session,
      tab,
    },
  };
}
