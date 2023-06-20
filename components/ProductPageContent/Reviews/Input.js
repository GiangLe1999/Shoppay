import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function FullWidthTextField({
  setValue,
  label,
  id,
  multiline,
  rows,
  value,
}) {
  return (
    <Box
      sx={[
        {
          width: "100%",
          maxWidth: "100%",
          backgroundColor: "white",
          borderRadius: 3,
        },
      ]}
    >
      <TextField
        fullWidth
        label={label}
        id={id}
        onChange={(event) => {
          setValue(event.target.value);
        }}
        multiline={multiline}
        rows={rows}
        value={value}
      />
    </Box>
  );
}
