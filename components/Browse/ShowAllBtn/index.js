import { Button } from "@mui/material";
import React from "react";
import { BsCaretDownFill, BsCaretUpFill } from "react-icons/bs";

export default function ShowAllBtn({ hideBtn, onClick }) {
  return (
    <Button
      endIcon={
        hideBtn ? <BsCaretUpFill size={13} /> : <BsCaretDownFill size={13} />
      }
      variant="outlined"
      onClick={onClick}
    >
      {hideBtn ? "Collapse" : "See all"}
    </Button>
  );
}
