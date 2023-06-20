import styled from "./styles.module.scss";
import TextField from "@mui/material/TextField";
import { useField, ErrorMessage } from "formik";
import { TbAbc, Tb123 } from "react-icons/tb";
import { MdDiscount } from "react-icons/md";

const ShippingInput = (props) => {
  const [field, meta] = useField(props);

  return (
    <div className={styled.input__container}>
      <div
        className={`${styled.input} ${
          meta.touched && meta.error && styled.error
        }`}
      >
        <div className={styled.input__wrapper}>
          <TextField {...props} {...field} onChange={props.onChange} />
          {!field.value && (
            <div className={styled.input__icon}>
              {props.icon === "text" ? (
                <TbAbc />
              ) : props.icon === "number" ? (
                <Tb123 />
              ) : props.icon === "coupon" ? (
                <MdDiscount />
              ) : (
                ""
              )}
            </div>
          )}
        </div>
      </div>
      <p>{meta.touched && meta.error && <ErrorMessage name={field.name} />}</p>
    </div>
  );
};

export default ShippingInput;
