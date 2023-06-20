import { ImUser } from "react-icons/im";
import { GoKey } from "react-icons/go";
import { SiMinutemailer } from "react-icons/si";
import { RxCrossCircled } from "react-icons/rx";
import { MdRepeatOn } from "react-icons/md";
import { useField } from "formik";

import styled from "./styles.module.scss";

const LoginInput = ({ icon, ...props }) => {
  const [field, meta] = useField(props);
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
        ) : (
          ""
        )}
        <input {...field} {...props} />
      </div>
    </>
  );
};

export default LoginInput;
