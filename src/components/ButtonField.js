import React, { useCallback, useContext, useState } from "react";
import ButtonGroup from "@mui/material/ButtonGroup";
import SearchField from "./SearchField";
import ButtonComponent from "./ButtonComponent";
import DialogComponent from "./DialogComponent";
import { DialogDisplayContext } from "./StateProvider";
import axios from "axios";
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
    changeCustomerExpression,
    changeisRefreshed,
    changePageNumber,
    changeSearchData,
    changeEditDialogRow,
    searchCustomerExpression,
    changeeditButtonDisableStatus,
    changeDeleteButtonDisableStatus,
    changepredictButtonDisableStatus,
    changeCountTotalData,
    changeDialogBoxPassingData,
    changeEditStatus,
    changeAdditionStatus,
    changeDeletionStatus,
    isRefreshed,
    predictRow,
    changePredictRow,
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
    searchCustomerExpression["customer_number"] !== "" &&
      changeCustomerExpression("");
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
    searchCustomerExpression["customer_number"] !== "" &&
      changeCustomerExpression("");
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

  const predictFunction = useCallback(() => {
    predictRow.forEach(
      ({
        total_open_amount,
        cust_number,
        baseline_create_date,
        business_code,
        clear_date,
        business_year,
        doc_id,
        name_customer,
        cust_payment_terms,
        posting_date,
        due_in_date,
        invoice_currency,
      }) => {
        if (invoice_currency === "USD") {
          axios
            .post("http://127.0.0.1:5000", {
              converted_usd: total_open_amount,
              cust_number,
              baseline_create_date,
              business_code,
              clear_date,
              buisness_year:business_year,
              doc_id,
              name_customer,
              cust_payment_terms,
              posting_date,
              due_in_date,
            })
            .then((response) => {
              if (response.status === 200) {
                console.log(response.data);
              }
            })
            .catch((error) => {
              alert("Some error occured");
            });
        } else if (invoice_currency === "CAD") {
          const converted_usdValue = (
            parseInt(invoice_currency) * 0.8
          ).toString();
          axios
            .post("http://127.0.0.1:5000", {
              converted_usd: converted_usdValue,
              cust_number,
              baseline_create_date,
              business_code,
              clear_date,
              buisness_year:business_year,
              doc_id,
              name_customer,
              cust_payment_terms,
              posting_date,
              due_in_date,
            })
            .then((response) => {
              if (response.status === 200) {
                console.log(response.data);
              }
            })
            .catch((error) => {
              alert("Some error occured");
            });
        }
      }
    );
  }, [predictRow]);

  const refreshFunction = () => {
    changeisRefreshed(isRefreshed + 1);
    changePageNumber(1);
    changeCustomerExpression("");
    changeSearchData(null);
    changeEditDialogRow([]);
    changeeditButtonDisableStatus(true);
    changeDeleteButtonDisableStatus(true);
    changepredictButtonDisableStatus(true);
    changeCountTotalData(0);
    changeDialogBoxPassingData([]);
    changeSearchData(null);
    changeCustomerExpression("");
    changePageNumber(1);
    changeEditDialogRow([]);
    changeEditStatus(0);
    changeAdditionStatus(0);
    changeDeletionStatus(0);
    changePredictRow([]);
  };
  return (
    <div className="relative flex justify-around items-center mt-5 py-10 px-10 bg-grid h-10">
      <div className="relative flex flex-1 justify-center items-center">
        {/* LEFT BUTTON GROUP  */}
        <ButtonGroup
          fullWidth
          sx={{ position: "relative", display: "flex", flex: "1" }}
        >
          <ButtonComponent
            name="PREDICT"
            state={predictButtonDisableStatus}
            workingFunction={predictFunction}
          />
          <ButtonComponent name="ANALYTICS VIEW" />
          <ButtonComponent
            name="ADVANCE SEARCH"
            workingFunction={advanceSearchFunction}
          />
        </ButtonGroup>
        <ButtonComponent name="REFRESH" workingFunction={refreshFunction} />
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
