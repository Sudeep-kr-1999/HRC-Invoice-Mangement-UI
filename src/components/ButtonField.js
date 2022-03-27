import React, { useContext, useState } from "react";
import ButtonGroup from "@mui/material/ButtonGroup";
import SearchField from "./SearchField";
import ButtonComponent from "./ButtonComponent";
import DialogComponent from "./DialogComponent";
import { DialogDisplayContext } from "./StateProvider";
function ButtonField() {
  const [dialogType, setdialogType] = useState("");
  const [dialogElement, setdialogElement] = useState([]);
  const displayState = useContext(DialogDisplayContext);

  const advanceSearchFunction = () => {
    setdialogType("Advance Search");
    const dialogElemententry = [
      { field: "Document ID", type: "text" },
      { field: "Invoice Id", type: "text" },
      { field: "Customer Number", type: "text" },
      { field: "Business Year", type: "text" },
    ];
    setdialogElement(dialogElemententry);
    displayState.changeDisplay("flex");
  };

  const addFunction = () => {
    setdialogType("Add");
    const dialogElemententry = [
      { field: "Business Code", type: "text" },
      { field: "Customer Number", type: "text" },
      { field: "Clear Date", type: "date" },
      { field: "Business Year", type: "text" },
      { field: "Document id", type: "text" },
      { field: "Posting Date", type: "date" },
      { field: "Document Create Date", type: "date" },
      { field: "Due Date", type: "date" },
      { field: "Invoice Currency", type: "text" },
      { field: "Document type", type: "text" },
      { field: "Posting Id", type: "text" },
      { field: "Total open amount", type: "text" },
      { field: "Baseline Create Date", type: "date" },
      { field: "Customer Payment Terms", type: "text" },
      { field: "Invoice id", type: "text" },
    ];
    setdialogElement(dialogElemententry);
    displayState.changeDisplay("flex");
  };

  const editFunction = () => {
    setdialogType("Edit");
    const dialogElemententry = [
      { field: "Invoice Currency", type: "text" },
      { field: "Customer Payment Terms", type: "text" },
    ];
    setdialogElement(dialogElemententry);
    displayState.changeDisplay("flex");
  };

  const deleteFunction = () => {
    const dialogElemententry = [
      {
        field: "Are you sure you want to delete these record[s]?"
      },
    ];
    setdialogType("Delete Records ?");
    setdialogElement(dialogElemententry);
    displayState.changeDisplay("flex");
  };
  return (
    <div className="relative flex justify-around items-center mt-5 py-10 px-10 bg-grid h-10">
      <div className="relative flex flex-1 justify-center items-center">
        <ButtonGroup
          fullWidth
          sx={{ position: "relative", display: "flex", flex: "1" }}
        >
          <ButtonComponent name="PREDICT" />
          <ButtonComponent name="ANALYTICS VIEW" />
          <ButtonComponent
            name="ADVANCE SEARCH"
            workingFunction={advanceSearchFunction}
          />
        </ButtonGroup>
      </div>
      <div className="relative flex flex-1 justify-center items-center">
        <SearchField label="Search Customer ID" />
      </div>

      <div className="relative flex flex-1 justify-center items-center">
        <ButtonGroup
          fullWidth
          sx={{ position: "relative", display: "flex", flex: "1" }}
        >
          <ButtonComponent name="ADD" workingFunction={addFunction} />
          <ButtonComponent name="EDIT" workingFunction={editFunction} />
          <ButtonComponent name="DELETE" workingFunction={deleteFunction} />
        </ButtonGroup>
      </div>
      <DialogComponent dialogName={dialogType} dialogElement={dialogElement} />
    </div>
  );
}

export default ButtonField;
