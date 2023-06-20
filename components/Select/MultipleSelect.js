import React, { useEffect, useState } from "react";
import {
  OutlinedInput,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  Stack,
  Chip,
} from "@mui/material";

import { MdCancel } from "react-icons/md";
import { FcCheckmark } from "react-icons/fc";

export default function MultiSelect({ header, data, handleChange, disabled }) {
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    setSelectedOptions([]);
  }, [data]);

  return (
    <FormControl sx={{ width: "100%", padding: 0 }}>
      <InputLabel>{header}</InputLabel>
      <Select
        multiple
        value={selectedOptions}
        onChange={(e) => {
          setSelectedOptions(e.target.value);
          handleChange(e);
        }}
        disabled={disabled}
        input={<OutlinedInput label={header} />}
        renderValue={(selected) => (
          <Stack gap={1} direction="row" flexWrap="wrap">
            {selected.map((value) => (
              <Chip
                key={value._id}
                label={value.name}
                onDelete={() =>
                  setSelectedOptions(
                    selectedOptions.filter((item) => item !== value)
                  )
                }
                deleteIcon={
                  <MdCancel onMouseDown={(event) => event.stopPropagation()} />
                }
              />
            ))}
          </Stack>
        )}
      >
        {data.map((item) => (
          <MenuItem
            key={item._id}
            value={item}
            sx={{ justifyContent: "space-between" }}
          >
            {item.name}
            {selectedOptions.includes(item) ? <FcCheckmark /> : null}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
