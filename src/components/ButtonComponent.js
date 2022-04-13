import React from "react";
import Button from "@mui/material/Button";
import RefreshIcon from "@mui/icons-material/Refresh";
function ButtonComponent({ name, workingFunction, state }) {
  return name !== "REFRESH" ? (
    <Button
      variant="outlined"
      disabled={state}
      sx={{
        color: "white",
        borderColor: "#14aff1",
        ":hover": { backgroundColor: "#14aff1" },
        position: "relative",
        display: "flex",
        margin: "5px",
      }}
      onClick={workingFunction}
    >
      {name}
    </Button>
  ) : (
    <Button
      variant="outlined"
      sx={{
        color: "white",
        borderColor: "#14aff1",
        ":hover": { backgroundColor: "#14aff1" },
        position: "relative",
        display: "flex",
        margin: "5px",
      }}
      onClick={workingFunction}
    >
      <RefreshIcon />
    </Button>
  );
}

export default React.memo(ButtonComponent);

// button color
// #14aff1
