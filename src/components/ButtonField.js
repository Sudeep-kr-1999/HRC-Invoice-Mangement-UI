import React from "react";
import ButtonGroup from "@mui/material/ButtonGroup";
import SearchField from "./SearchField";
import ButtonComponent from "./ButtonComponent";
function ButtonField() {
  return (
    <div className="relative flex justify-around items-center mt-5 py-10 px-10 bg-grid h-10">
      <div className="relative flex flex-1 justify-center items-center">
        <ButtonGroup>
          <ButtonComponent name="PREDICT"/>
          <ButtonComponent name="ANALYTICS VIEW" />
          <ButtonComponent name="ADVANCE SEARCH"/>
        </ButtonGroup>
      </div>
      <div className="relative flex flex-1 justify-center items-center">
        <SearchField label="Search Customer ID" />
      </div>

      <div className="relative flex flex-1 justify-center items-center">
        <ButtonGroup>
          <ButtonComponent name="ADD" />
          <ButtonComponent name="EDIT" />
          <ButtonComponent name="DELETE" />
        </ButtonGroup>
      </div>
    </div>
  );
}

export default ButtonField;
