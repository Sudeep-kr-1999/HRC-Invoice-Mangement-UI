import React from "react";
import TextField from "@mui/material/TextField";
function SearchField({ label }) {
  return (
    <TextField
      id="outlined-basic"
      label={label}
      variant="standard"
      size='small'
      margin="dense"
      InputProps={{ disableUnderline: true, }}
      sx={{ backgroundColor: "white", borderRadius: "5px", paddingX: "50px", paddingY:"2px",height:"3rem"}}
    />
  );
}

export default React.memo(SearchField);
