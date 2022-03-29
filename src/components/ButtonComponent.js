import React from "react";
import Button from "@mui/material/Button";
function ButtonComponent({ name, workingFunction, state }) {
  console.log("buttoncomponent");
  return (
    <Button
      disabled={state}
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

export default React.memo(ButtonComponent);

// button color
// #14aff1
