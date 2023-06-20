import { Button, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import axios from "axios";
import { useRef } from "react";
import { useState } from "react";
import { AiFillDelete, AiTwotoneEdit } from "react-icons/ai";
import { GiCancel } from "react-icons/gi";
import { MdAssignmentAdd } from "react-icons/md";
import { toast } from "react-toastify";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import styled from "./styles.module.scss";
import Popup from "@/components/Popup";
import { format } from "date-fns";

export default function ListItem({ coupon, setCoupons }) {
  const inputRef = useRef(null);

  const [open, setOpen] = useState("");
  const [name, setName] = useState("");
  const [discount, setDiscount] = useState("");

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(tomorrow);

  const changeStartDateHandler = (newValue) => {
    setStartDate(newValue);
  };

  const changeEndDateHandler = (newValue) => {
    setEndDate(newValue);
  };

  const updateHandler = async (id) => {
    Popup(
      "Are you sure?",
      `${coupon.coupon} coupon will be updated after your confirmation.`,
      "question",
      "Yes, update it!",
      async () => {
        try {
          const { data } = await axios.put("/api/admin/coupon", {
            id,
            coupon: name || coupon.coupon,
            discount: discount || coupon.discount,
            startDate: startDate || coupon.startDate,
            endDate: endDate || coupon.endDate,
          });

          setCoupons(data.coupons);
          setOpen(false);
        } catch (error) {
          toast.error(error?.response?.data.message);
        }
      },
      "Succesfully!",
      "Coupon has been updated successfully."
    );
  };

  const removeHandler = async (id) => {
    Popup(
      "Are you sure?",
      `We'll delete ${coupon.coupon} coupon and you won't be able to revert this.`,
      "warning",
      "Yes, delete it!",
      async () => {
        try {
          const { data } = await axios.delete(`/api/admin/coupon?id=${id}`);
          setCoupons(data.coupons);
        } catch (error) {
          toast.error(error?.response?.data.message);
        }
      },
      "Deleted!",
      `${coupon.coupon} coupon has been deleted.`
    );
  };

  return (
    <tr className={styled.list__item}>
      <td>
        <input
          style={{ borderBottom: open ? "1px dashed #1976d2" : "none" }}
          className={open ? styled.open : ""}
          type="text"
          value={name ? name : coupon?.coupon}
          onChange={(e) => setName(e.target.value)}
          //Dựa vào state open để kích hoạt / disable input
          disabled={!open}
          ref={inputRef}
        />
      </td>

      <td>
        {open ? (
          <input
            style={{ borderBottom: open ? "1px dashed #1976d2" : "none" }}
            className={open ? styled.open : ""}
            type="text"
            value={discount ? discount : coupon?.discount}
            onChange={(e) => setDiscount(e.target.value)}
            //Dựa vào state open để kích hoạt / disable input
            disabled={!open}
          />
        ) : (
          <span>{coupon.discount}%</span>
        )}
      </td>

      <td>
        {open ? (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              label=""
              inputFormat="MM/dd/yyyy"
              value={startDate}
              onChange={changeStartDateHandler}
              renderInputs={(params) => <TextField {...params} />}
              slotProps={{
                textField: {
                  variant: "standard",
                  inputProps: {
                    style: {
                      fontSize: 13,
                      height: 29,
                      fontWeight: 600,
                      color: "#1976d2",
                      fontFamily: "Poppins",
                    },
                  },
                },
              }}
              sx={{
                width: "90%",
                fieldset: { color: "#fff" },
              }}
              minDate={new Date()}
            />
          </LocalizationProvider>
        ) : (
          <span>{format(new Date(coupon.startDate), "MM/dd/yyyy")}</span>
        )}
      </td>

      <td>
        {open ? (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              label=""
              inputFormat="MM/dd/yyyy"
              value={endDate}
              onChange={changeEndDateHandler}
              renderInputs={(params) => <TextField {...params} />}
              slotProps={{
                textField: {
                  variant: "standard",
                  inputProps: {
                    style: {
                      fontSize: 13,
                      height: 29,
                      fontWeight: 600,
                      color: "#1976d2",
                      fontFamily: "Poppins",
                    },
                  },
                },
              }}
              sx={{ width: "90%" }}
              minDate={tomorrow}
            />
          </LocalizationProvider>
        ) : (
          <span>{format(new Date(coupon.endDate), "MM/dd/yyyy")}</span>
        )}
      </td>

      {open ? (
        <td className={styled.list__item_expand}>
          <div className={`${styled.btn} ${styled.subCateBtn}`}>
            <Button
              onClick={() => updateHandler(coupon?._id)}
              variant="contained"
              color="info"
              startIcon={<MdAssignmentAdd />}
            >
              Save
            </Button>
          </div>

          <div className={`${styled.btn} ${styled.subCateBtn}`}>
            <Button
              onClick={() => {
                setOpen(false);
                setName("");
              }}
              variant="contained"
              color="error"
              startIcon={<GiCancel />}
            >
              Cancel
            </Button>
          </div>
        </td>
      ) : (
        <td>
          <span className={styled.list__item_notEdit}>Not editing</span>
        </td>
      )}

      <td className={styled.list__item_actions}>
        {!open ? (
          <div className={`${styled.btn} ${styled.subCateBtn}`}>
            <Button
              onClick={() => {
                setOpen((prev) => !prev);
                inputRef.current.focus();
              }}
              variant="contained"
              color="info"
              startIcon={<AiTwotoneEdit />}
            >
              Edit
            </Button>
          </div>
        ) : (
          <div className={`${styled.btn} ${styled.subLoadingBtn}`}>
            <LoadingButton
              variant="contained"
              color="primary"
              startIcon={<AiTwotoneEdit />}
              loading
              loadingPosition="start"
              size="small"
            >
              Editing
            </LoadingButton>
          </div>
        )}

        <div className={`${styled.btn} ${styled.subCateBtn}`}>
          <Button
            onClick={() => {
              removeHandler(coupon._id);
            }}
            variant="contained"
            color="error"
            startIcon={<AiFillDelete />}
          >
            Delete
          </Button>
        </div>
      </td>
    </tr>
  );
}
