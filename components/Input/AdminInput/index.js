import { ErrorMessage, useField } from "formik";

import styled from "./styles.module.scss";

const AdminInput = ({ placeholder, label, className, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div>
      <label
        className={`${styled.label} ${
          meta.touched && meta.error ? styled.inputError : ""
        } ${className ? styled[className] : ""} `}
      >
        <span>{label}</span>
        <input
          type={field.type}
          name={field.name}
          placeholder={placeholder}
          {...field}
          {...props}
        />
      </label>
      {meta.touched && meta.error ? (
        <span className={styled.inputError__msg}>
          <ErrorMessage name={field.name} />
        </span>
      ) : (
        <span className={styled.inputError__skeleton}></span>
      )}
    </div>
  );
};

export default AdminInput;
