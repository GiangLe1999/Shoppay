import { Button } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import axios from "axios";
import { useRef } from "react";
import { useState } from "react";
import { AiFillDelete, AiTwotoneEdit, AiFillCloseSquare } from "react-icons/ai";
import { GiCancel } from "react-icons/gi";
import { MdAssignmentAdd } from "react-icons/md";
import { toast } from "react-toastify";
import styled from "./styles.module.scss";
import Popup from "@/components/Popup";

export default function ListItem({
  categories,
  subCategory,
  setSubCategories,
}) {
  const input = useRef(null);

  const [open, setOpen] = useState("");
  const [name, setName] = useState("");
  const [parent, setParent] = useState("");

  const updateHandler = async (id) => {
    Popup(
      "Are you sure?",
      `${subCategory.name} subCategory will be updated after your confirmation.`,
      "question",
      "Yes, update it!",
      async () => {
        try {
          const { data } = await axios.put("/api/admin/subcategory", {
            id,
            name: name || subCategory?.name,
            parent: parent || subCategory?.parent._id,
          });

          setSubCategories(data.subCategories);
          setOpen(false);
        } catch (error) {
          toast.error(error?.response?.data.message);
        }
      },
      "Succesfully!",
      "Sub-Category has been updated successfully."
    );
  };

  const removeHandler = async (id) => {
    Popup(
      "Are you sure?",
      `We'll delete ${subCategory.name} Sub-Category and you won't be able to revert this.`,
      "warning",
      "Yes, delete it!",
      async () => {
        try {
          const { data } = await axios.delete(
            `/api/admin/subcategory?id=${id}`
          );
          setSubCategories(data.subCategories);
          console.log(data);
        } catch (error) {
          toast.error(error?.response?.data.message);
        }
      },
      "Deleted!",
      `${subCategory.name} Sub-Category has been deleted.`
    );
  };

  return (
    <tr className={styled.list__item}>
      <td>
        <input
          style={{ borderBottom: open ? "1px dashed #1976d2" : "none" }}
          className={open ? styled.open : ""}
          type="text"
          value={name ? name : subCategory?.name}
          onChange={(e) => setName(e.target.value)}
          //Dựa vào state open để kích hoạt / disable input
          disabled={!open}
          ref={input}
        />
      </td>

      <td>
        {open ? (
          <select
            className={open ? styled.open : ""}
            style={{ borderBottom: open ? "1px dashed #1976d2" : "none" }}
            onChange={(e) => setParent(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        ) : (
          <span>{subCategory?.parent.name}</span>
        )}
      </td>

      {open ? (
        <td className={styled.list__item_expand}>
          <div className={`${styled.btn} ${styled.subCateBtn}`}>
            <Button
              onClick={() => updateHandler(subCategory?._id)}
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
                input.current.focus();
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
              removeHandler(subCategory._id);
              input.current.focus();
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
