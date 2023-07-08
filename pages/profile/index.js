import { getSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import NextImage from "@/components/NextImage";
import { RiSave3Fill } from "react-icons/ri";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { Button } from "@mui/material";

import styled from "../../styles/Profile.module.scss";
import Layout from "@/components/Profile/Layout";

import LoginInput from "@/components/Input/LoginInput";
import { BsFillCameraFill } from "react-icons/bs";
import { toast } from "react-toastify";
import Popup from "@/components/Popup";
import dataURItoBlob from "@/utils/dataURItoBlob";
import { uploadHandler } from "@/utils/request";
import axios from "axios";
import StyledDotLoader2 from "@/components/Loaders/DotLoader2";

export default function ProfilePage({ tab }) {
  const [name, setName] = useState("");
  const [ava, setAva] = useState("");

  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const [loading, setLoading] = useState(false);

  const changeAvaHandler = (e) => {
    const file = e.target.files[0];

    if (!file.type.startsWith("image")) {
      return toast.error(
        `${file.name} format is unsupported! Only JPEG, PNG, WEBP are allowed`
      );
    }

    if (!file.size > 1024 * 1024 * 10) {
      return toast.error(
        `${file.name} size is too large, maximum of 10MB allowed.`
      );
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      setAva(e.target.result);
    };
  };

  const fetchUserInfo = async () => {
    setLoading(true);
    const { data } = await axios.get("/api/user/changeInfo");
    setName(data.name);
    setAva(data.image);
    setEmail(data.email);
    setRole(data.role);
    setLoading(false);
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const saveProfileHandler = () => {
    Popup(
      "Are you sure?",
      `Your infomation will be updated after your confirmation.`,
      "question",
      "Yes, update it!",
      async () => {
        try {
          const isBase64 = ava.includes("base64");

          console.log(isBase64);

          if (isBase64) {
            let temp = dataURItoBlob(ava);
            const path = "user avatar images";
            let formData = new FormData();
            formData.append("path", path);
            formData.append("file", temp);

            const avatar_image = await uploadHandler(formData);

            const { data } = await axios.put("/api/user/changeInfo", {
              name,
              ava: avatar_image[0].url,
            });

            setName(data.name);
            setAva(data.image);
          } else {
            const { data } = await axios.put("/api/user/changeInfo", {
              name,
              ava: ava,
            });

            setName(data.name);
            setAva(data.image);
          }
        } catch (error) {
          console.log(error);
        }
      },
      "Succesfully!",
      "User information has been updated successfully."
    );
  };

  const validate = Yup.object({
    name: Yup.string()
      .required("Name cannot be empty. Please fill in!")
      .min(2, "Your name must be between 2 and 16 charaters")
      .max(16, "Your name must be between 2 and 16 charaters")
      .matches(/^[aA-zZ]/, "Numbers and special charaters are not allowed"),
  });

  return (
    <>
      <Layout session={{ name, image: ava }} tab={tab}>
        <div className={styled.profile}>
          {loading ? (
            <StyledDotLoader2 />
          ) : (
            <>
              <h1 className={styled.title}>my profile</h1>
              <div className={styled.flex}>
                <div className={styled.profile__form}>
                  <Formik
                    enableReinitialize
                    initialValues={{
                      name,
                      email,
                      role,
                    }}
                    validationSchema={validate}
                    onSubmit={saveProfileHandler}
                  >
                    {(form) => (
                      <Form>
                        <div className={styled.flex}>
                          <div className={styled.profile__form_inputs}>
                            <LoginInput
                              icon="user"
                              type="text"
                              name="name"
                              label="Name"
                              onChange={(e) => setName(e.target.value)}
                            />

                            <LoginInput
                              icon="email"
                              type="text"
                              id="email"
                              name="email"
                              label="Email"
                              disabled
                            />

                            <LoginInput
                              id="role"
                              name="role"
                              label="Role"
                              icon="admin"
                              disabled
                            />
                          </div>

                          <div className={styled.avatar}>
                            <NextImage src={ava} alt="" />
                            <label
                              className={styled.avatar__upload}
                              htmlFor="imageUpload"
                            >
                              <BsFillCameraFill size={20} />
                            </label>
                            <input
                              type="file"
                              id="imageUpload"
                              hidden
                              onChange={changeAvaHandler}
                            />
                          </div>
                        </div>

                        <div className={`${styled.btn} ${styled.profileBtn}`}>
                          <Button
                            variant="contained"
                            startIcon={<RiSave3Fill />}
                            type="submit"
                          >
                            Save information
                          </Button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </>
          )}
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
