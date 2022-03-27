import React from "react";
import Button from "@mui/material/Button";
function ButtonComponent({ name, workingFunction }) {
  return (
    <Button
      sx={{
        color: "white",
        ":hover": { backgroundColor: "#14aff1" },
        position: "relative",
        display: "flex",
      }}
      onClick={workingFunction}
    >
      {name}
    </Button>
  );
}

export default ButtonComponent;

// button color
// #14aff1
