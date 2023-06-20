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

export default function ListItem({ category, setCategories }) {
  const input = useRef(null);

  const [open, setOpen] = useState("");
  const [name, setName] = useState("");

  const updateHandler = async (id) => {
    Popup(
      "Are you sure?",
      `${category.name} category will be changed to ${name}.`,
      "question",
      "Yes, update it!",
      async () => {
        try {
          const { data } = await axios.put("/api/admin/category", { id, name });
          setCategories(data.categories);
          setOpen(false);
        } catch (error) {
          toast.error(error?.response?.data.message);
        }
      },
      "Succesfully!",
      "Category has been updated successfully."
    );
  };

  const removeHandler = async (id) => {
    Popup(
      "Are you sure?",
      `We'll delete ${category.name} category and you won't be able to revert this.`,
      "warning",
      "Yes, delete it!",
      async () => {
        try {
          const { data } = await axios.delete(`/api/admin/category?id=${id}`);
          setCategories(data.categories);
        } catch (error) {
          toast.error(error?.response?.data.message);
        }
      },
      "Deleted!",
      `${category.name} category has been deleted.`
    );
  };

  return (
    <tr className={styled.list__item}>
      <td>
        <input
          style={{ borderBottom: open ? "1px dashed #1976d2" : "none" }}
          className={open ? styled.open : ""}
          type="text"
          value={name ? name : category.name}
          onChange={(e) => setName(e.target.value)}
          //Dựa vào state open để kích hoạt / disable input
          disabled={!open}
          ref={input}
        />
      </td>

      {open ? (
        <td className={styled.list__item_expand}>
          <div className={`${styled.btn} ${styled.cateBtn}`}>
            <Button
              onClick={() => updateHandler(category._id)}
              variant="contained"
              color="info"
              startIcon={<MdAssignmentAdd />}
            >
              Save
            </Button>
          </div>

          <div className={`${styled.btn} ${styled.cateBtn}`}>
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
          <div className={`${styled.btn} ${styled.cateBtn}`}>
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
          <div className={`${styled.btn} ${styled.cateBtn}`}>
            <LoadingButton
              variant="contained"
              color="primary"
              startIcon={<AiTwotoneEdit />}
              loading
              loadingPosition="start"
            >
              Editing...
            </LoadingButton>
          </div>
        )}

        <div className={`${styled.btn} ${styled.cateBtn}`}>
          <Button
            onClick={() => {
              removeHandler(category._id);
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
