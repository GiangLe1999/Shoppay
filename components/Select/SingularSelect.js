import { MenuItem, TextField } from "@mui/material";
import { useField, ErrorMessage } from "formik";
import styled from "./styles.module.scss";
import { useEffect } from "react";

const SingularSelect = ({ data, placeholder, ...rest }) => {
  const [field, meta] = useField(rest);

  useEffect(() => {
    rest.handleChange(field.name, field.value);
  }, [field.value]);

  return (
    <div className={styled.input}>
      <TextField
        variant="outlined"
        select
        fullWidth
        label={placeholder}
        //Thêm class để CSS border cho Input
        className={`${styled.select} ${
          meta.touched && meta.error && styled.error_select
        }`}
        SelectProps={{
          MenuProps: {
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "center",
            },
            getContentAnchorEl: null,
          },
        }}
        {...field}
        {...rest}
      >
        {data.map((option, index) => (
          <MenuItem key={index} value={option._id || option.name || option}>
            {option.name || option}
          </MenuItem>
        ))}
      </TextField>
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

export default SingularSelect;
