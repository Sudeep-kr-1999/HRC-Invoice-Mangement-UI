import React, { useContext, useState } from "react";
import ButtonGroup from "@mui/material/ButtonGroup";
import SearchField from "./SearchField";
import ButtonComponent from "./ButtonComponent";
import DialogComponent from "./DialogComponent";
import { DialogDisplayContext } from "./StateProvider";

function ButtonField() {
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
  } = useContext(DialogDisplayContext);

  // function for "ADVANCE SEARCH" button
  const advanceSearchFunction = () => {
    setdialogHeading("Advance Search");
    const dialogElemententry = [
      { field: "Document ID", type: "text", name: "doc_id" },
      { field: "Invoice Id", type: "text", name: "invoice_id" },
      { field: "Customer Number", type: "text", name: "cust_number" },
      { field: "Business Year", type: "text", name: "business_year" },
    ];
    setdialogElement(dialogElemententry);
    changeDialogDisplay("flex");
  };

  // function for "ADD" button
  const addFunction = () => {
    setdialogHeading("Add");
    const dialogElemententry = [
      { field: "Business Code", type: "text", name: "business_code" },
      { field: "Customer Number", type: "text", name: "cust_number" },
      { field: "Clear Date", type: "date", name: "clear_date" },
      { field: "Business Year", type: "text", name: "business_year" },
      { field: "Document id", type: "text", name: "doc_id" },
      { field: "Posting Date", type: "date", name: "posting_date" },
      {
        field: "Document Create Date",
        type: "date",
        name: "document_create_date",
      },
      { field: "Due Date", type: "date", name: "due_in_date" },
      { field: "Invoice Currency", type: "text", name: "invoice_currency" },
      { field: "Document type", type: "text", name: "document_type" },
      { field: "Posting Id", type: "text", name: "posting_id" },
      { field: "Total open amount", type: "text", name: "total_open_amount" },
      {
        field: "Baseline Create Date",
        type: "date",
        name: "baseline_create_date",
      },
      {
        field: "Customer Payment Terms",
        type: "text",
        name: "cust_payment_terms",
      },
      { field: "Invoice id", type: "text", name: "invoice_id" },
    ];
    setdialogElement(dialogElemententry);
    changeDialogDisplay("flex");
  };

  // function for "EDIT" button
  const editFunction = () => {
    setdialogHeading("Edit");
    const dialogElemententry = [
      { field: "Invoice Currency", type: "text", name: "new_invoice_currency" },
      {
        field: "Customer Payment Terms",
        type: "text",
        name: "new_cust_payment_terms",
      },
    ];
    setdialogElement(dialogElemententry);
    changeDialogDisplay("flex");
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
