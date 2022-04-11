import React, { useContext } from "react";
import TextField from "@mui/material/TextField";
import { DialogDisplayContext } from "./StateProvider";
function SearchField({ label }) {
  const {
    searchCustomerExpression,
    changeCustomerExpression,
    changePageNumber,
  } = useContext(DialogDisplayContext);

  return (
    <TextField
      id="outlined-basic"
      label={label}
      variant="standard"
      size="small"
      margin="dense"
      value={searchCustomerExpression.customer_number}
      onChange={(e) => {
        changeCustomerExpression(e.target.value);
        changePageNumber(1);
      }}
      InputProps={{ disableUnderline: true }}
      sx={{
        backgroundColor: "white",
        borderRadius: "5px",
        paddingX: "50px",
        paddingY: "2px",
        height: "3rem",
      }}
    />
  );
}

export default React.memo(SearchField);
