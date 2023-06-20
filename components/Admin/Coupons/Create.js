import { Button, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { MdAssignmentAdd } from "react-icons/md";
import { toast } from "react-toastify";
import axios from "axios";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import "react-toastify/dist/ReactToastify.css";
import styled from "./styles.module.scss";
import AdminInput from "@/components/Input/AdminInput";

const Create = ({ setCoupons }) => {
  const [name, setName] = useState("");
  const [discount, setDiscount] = useState("");

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(tomorrow);

  const validate = Yup.object({
    name: Yup.string()
      .required("Coupon is required.")
      .min(2, "Coupon must be bewteen 2 and 30 characters.")
      .max(30, "Coupon must be bewteen 2 and 30 characters."),
    discount: Yup.number()
      .required("Discount is required.")
      .min(1, "Discount must be at least 1%.")
      .max(99, "Discount must be 99% or less."),
  });

  const submitHandler = async () => {
    try {
      //Nếu ngày bắt đầu và ngày kết thúc trùng nhau thì return hàm
      if (startDate.toString() == endDate.toString()) {
        return toast.error("You can't pick the same Dates.");
      }
      //Nếu ngày ngày kết thúc nằm trước ngày bắt đầu thì return hàm
      else if (endDate.getTime() - startDate.getTime() < 0) {
        return toast.error("Start Date cannot be more than the End Date.");
      }

      const { data } = await axios.post("/api/admin/coupon", {
        coupon: name,
        discount,
        startDate,
        endDate,
      });
      setCoupons(data.coupons);
      toast.success(data.message);
      setName("");
      setDiscount("");
      setStartDate(newDate());
      setEndDate(tomorrow);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const changeStartDateHandler = (newValue) => {
    setStartDate(newValue);
  };

  const changeEndDateHandler = (newValue) => {
    setEndDate(newValue);
  };

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{ name, discount }}
        validationSchema={validate}
        onSubmit={submitHandler}
      >
        {(formik) => (
          <Form>
            <div className={styled.header}>Create a coupon</div>
            <div className={styled.input_wrapper}>
              <AdminInput
                type="text"
                label="Coupon"
                name="name"
                placeholder="Ex: GiAnGlE1920, AKKSiawq0..."
                onChange={(e) => setName(e.target.value)}
                className="fixSpan"
              />

              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label="Start Date"
                  inputFormat="MM/dd/yyyy"
                  value={startDate}
                  onChange={changeStartDateHandler}
                  renderInputs={(params) => <TextField {...params} />}
                  slotProps={{
                    textField: {
                      inputProps: {
                        style: {
                          fontSize: 13,
                          height: 10,
                          fontFamily: "Poppins",
                        },
                      },
                      InputLabelProps: {
                        style: {
                          fontSize: 14,
                          marginLeft: 7,
                          fontFamily: "Poppins",
                          fontWeight: 600,
                        },
                      },
                      sx: {
                        fieldset: { borderColor: "$admin-content-border" },
                      },
                    },
                  }}
                  minDate={new Date()}
                />
              </LocalizationProvider>
            </div>

            <div className={styled.date_picker}>
              {/* Props dateAdapter là thư viện date mà ta chọn
              1 số lựa chọn khác có thể là dayjs, luxon, moment */}
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <AdminInput
                  type="number"
                  label="Discount (max 99)"
                  name="discount"
                  placeholder="Ex: 10, 20, 30, ..."
                  onChange={(e) => setDiscount(e.target.value)}
                  className="fixSpan"
                />

                <DesktopDatePicker
                  label="End Date"
                  inputFormat="MM/dd/yyyy"
                  value={endDate}
                  onChange={changeEndDateHandler}
                  renderInputs={(params) => <TextField {...params} />}
                  slotProps={{
                    textField: {
                      inputProps: {
                        style: {
                          fontSize: 13,
                          height: 10,
                          fontFamily: "Poppins",
                        },
                      },
                      InputLabelProps: {
                        style: {
                          fontSize: 14,
                          marginLeft: 7,
                          fontFamily: "Poppins",
                          fontWeight: 600,
                        },
                      },
                      sx: {
                        fieldset: { borderColor: "$admin-content-border" },
                      },
                    },
                  }}
                  minDate={tomorrow}
                />
              </LocalizationProvider>
            </div>

            <div className={`${styled.btn} ${styled.form_btn}`}>
              <Button
                variant="contained"
                type="submit"
                startIcon={<MdAssignmentAdd />}
                color="info"
              >
                Add coupon
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Create;
