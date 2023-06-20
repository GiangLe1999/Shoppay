import { ErrorMessage, useField } from "formik";

import styled from "./styles.module.scss";

const AdminSelect = ({ placeholder, label, data, className, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className={styled.wrapper}>
      <label
        className={`${styled.label} ${
          meta.touched && meta.error ? styled.inputError : ""
        } ${className ? styled[className] : ""}`}
      >
        <span>{label}</span>
        <select
          name={field.name}
          defaultValue={""}
          {...field}
          {...props}
          style={{
            color: field.value == "" && "rgb(163, 163, 163)",
            fontStyle: field.value == "" && "italic",
          }}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {data.map((item, index) => (
            <option key={item._id} value={item._id || item.name}>
              {item.name}
            </option>
          ))}
        </select>
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

export default AdminSelect;
