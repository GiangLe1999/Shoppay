import { ImUser } from "react-icons/im";
import { GoKey } from "react-icons/go";
import { SiMinutemailer } from "react-icons/si";
import { RxCrossCircled } from "react-icons/rx";
import { MdRepeatOn } from "react-icons/md";
import { useField } from "formik";

import styled from "./styles.module.scss";
import { FaRegEye, FaRegEyeSlash, FaUserTie } from "react-icons/fa";
import { useState } from "react";

const LoginInput = ({ icon, ...props }) => {
  const [field, meta] = useField(props);
  const [isPassword, setIsPassword] = useState(true);

  const showHidePasswordHandler = () => {
    setIsPassword((prev) => !prev);
  };
  return (
    <>
      {meta.error && meta.touched ? (
        <p className={styled.errorMessage}>
          <RxCrossCircled />
          {meta.error}
        </p>
      ) : (
        <label htmlFor={props.id} className={styled.label}>
          {props.label}
        </label>
      )}
      <div
        className={`${styled.input} ${
          meta.touched && meta.error ? styled.error : ""
        }`}
      >
        {icon === "user" ? (
          <ImUser />
        ) : icon === "email" ? (
          <SiMinutemailer />
        ) : icon === "password" ? (
          <GoKey />
        ) : icon === "repeat" ? (
          <MdRepeatOn />
        ) : icon === "admin" ? (
          <FaUserTie />
        ) : (
          ""
        )}
        <input
          {...field}
          {...props}
          onClick={props.onClick}
          type={
            props.type !== "password"
              ? props.type
              : props.type === "password" && isPassword
              ? "password"
              : "text"
          }
        />
        {icon === "password" || icon === "repeat" ? (
          <div className={styled.showHide} onClick={showHidePasswordHandler}>
            {isPassword ? <FaRegEye /> : <FaRegEyeSlash />}
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default LoginInput;
