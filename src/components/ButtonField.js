import React, { useContext, useState } from "react";
import ButtonGroup from "@mui/material/ButtonGroup";
import SearchField from "./SearchField";
import ButtonComponent from "./ButtonComponent";
import DialogComponent from "./DialogComponent";
import { DialogDisplayContext } from "./StateProvider";

function ButtonField() {
  console.log("buttonfield");
  // state "dialogHeading" for passing to the dialogName props in DialogComponent
  const [dialogHeading, setdialogHeading] = useState("");

  // state "dialogElement" for passing to dialogElement props in DialogComponent
  const [dialogElement, setdialogElement] = useState([]);

  // changeDialogDisplay function for handling dialog display using DialogDisplayContext
  const {
    changeDialogDisplay,
    editButtonDisableStatus,
    deleteButtonDisableStatus,
    predictButtonDisableStatus,
    dialogBoxPassingData,
  } = useContext(DialogDisplayContext);

  // function for "ADVANCE SEARCH" button
  const advanceSearchFunction = () => {
    setdialogHeading("Advance Search");
    const dialogElemententry = [
      { field: "Document ID", type: "text" },
      { field: "Invoice Id", type: "text" },
      { field: "Customer Number", type: "text" },
      { field: "Business Year", type: "text" },
    ];
    setdialogElement(dialogElemententry);
    changeDialogDisplay("flex");
  };

  // function for "ADD" button
  const addFunction = () => {
    setdialogHeading("Add");
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
    changeDialogDisplay("flex");
  };

  // function for "EDIT" button
  const editFunction = () => {
    setdialogHeading("Edit");
    const dialogElemententry = [
      { field: "Invoice Currency", type: "text" },
      { field: "Customer Payment Terms", type: "text" },
    ];
    setdialogElement(dialogElemententry);
    changeDialogDisplay("flex");
    console.log(dialogBoxPassingData);
  };
  // function for "DELETE" button
  const deleteFunction = () => {
    const dialogElemententry = [
      {
        field: "Are you sure you want to delete these record[s] ?",
      },
    ];
    setdialogHeading("Delete Records ?");
    setdialogElement(dialogElemententry);
    changeDialogDisplay("flex");
    console.log(dialogBoxPassingData);
  };
  return (
    <div className="relative flex justify-around items-center mt-5 py-10 px-10 bg-grid h-10">
      <div className="relative flex flex-1 justify-center items-center">
        {/* LEFT BUTTON GROUP  */}
        <ButtonGroup
          fullWidth
          sx={{ position: "relative", display: "flex", flex: "1" }}
        >
          <ButtonComponent name="PREDICT" state={predictButtonDisableStatus} />
          <ButtonComponent name="ANALYTICS VIEW" />
          <ButtonComponent
            name="ADVANCE SEARCH"
            workingFunction={advanceSearchFunction}
          />
        </ButtonGroup>
      </div>

      {/* SEARCH FIELD  */}
      <div className="relative flex flex-1 justify-center items-center">
        <SearchField label="Search Customer ID" />
      </div>

      <div className="relative flex flex-1 justify-center items-center">
        {/* RIGHT BUTTON GROUP  */}
        <ButtonGroup
          fullWidth
          sx={{ position: "relative", display: "flex", flex: "1" }}
        >
          <ButtonComponent name="ADD" workingFunction={addFunction} />
          <ButtonComponent
            name="EDIT"
            workingFunction={editFunction}
            state={editButtonDisableStatus}
          />
          <ButtonComponent
            name="DELETE"
            workingFunction={deleteFunction}
            state={deleteButtonDisableStatus}
          />
        </ButtonGroup>
      </div>

      {/* DYNAMIC DIALOG COMPONENT  */}
      <DialogComponent
        dialogName={dialogHeading}
        dialogElement={dialogElement}
      />
    </div>
  );
}

export default React.memo(ButtonField);
