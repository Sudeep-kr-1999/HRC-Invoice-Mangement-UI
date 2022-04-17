import { TextField } from "@mui/material";
import React, { useCallback, useContext, useEffect, useState } from "react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import ButtonComponent from "./ButtonComponent";
import ButtonGroup from "@mui/material/ButtonGroup";
import { DialogDisplayContext } from "./StateProvider";
import API from "../axios";
function DialogComponent({ dialogName, dialogElement }) {
  const [apiBody, setapiBody] = useState({
    business_code: "",
    cust_number: "",
    clear_date: "",
    business_year: "",
    doc_id: "",
    posting_date: "",
    document_create_date: "",
    due_in_date: "",
    invoice_currency: "",
    document_type: "",
    posting_id: "",
    total_open_amount: "",
    baseline_create_date: "",
    cust_payment_terms: "",
    invoice_id: "",
    new_invoice_currency: "",
    new_cust_payment_terms: "",
  });
  const {
    dialogDisplay,
    changeDialogDisplay,
    dialogBoxPassingData,
    editDialogrow,
    changeDialogBoxPassingData,
    changeSearchData,
    changeCountTotalData,
    countTotalData,
    changeeditButtonDisableStatus,
    changeDeleteButtonDisableStatus,
    changepredictButtonDisableStatus,
    changeEditDialogRow,
    changeEditStatus,
    changeAdditionStatus,
    changeDeletionStatus,
    isRefreshed,
    editStatus,
    additionStatus,
    deletionStatus,
  } = useContext(DialogDisplayContext);

  let actionType = "";

  let grid_col_value_class = "";

  if (dialogName === "Add") {
    grid_col_value_class = "relative grid grid-cols-4";
    actionType = "ADD";
  } else if (dialogName === "Advance Search") {
    grid_col_value_class = "relative grid grid-cols-2";
    actionType = "SEARCH";
  } else if (dialogName === "Edit") {
    grid_col_value_class = "relative grid grid-cols-2";
    actionType = "EDIT";
  } else if (dialogName === "Delete Records ?") {
    grid_col_value_class = "relative grid grid-cols-2";
    actionType = "DELETE";
  }

  const formatDate = useCallback((date) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }, []);

  const searchFunction = useCallback(async () => {
    let advSearchStatus = false;
    if (
      apiBody.doc_id !== "" &&
      apiBody.invoice_id !== "" &&
      apiBody.cust_number !== "" &&
      apiBody.business_year !== ""
    ) {
      const { doc_id, invoice_id, cust_number, business_year } = apiBody;
      try {
        const response = await API.get(
          `GetSearchParameters?doc_id="${doc_id}"&invoice_id="${invoice_id}"&customer_number="${cust_number}"&business_year="${business_year}"`
        );
        if (response.status === 200) {
          advSearchStatus = true;
          changeSearchData(response.data);
        }
      } catch (error) {
        alert("Some Error Occured");
      }

      if (advSearchStatus) {
        changeDialogDisplay("none");
      }
    } else {
      alert("Please provide all the required information");
    }
  }, [apiBody, changeDialogDisplay, changeSearchData]);

  const cancelFunction = () => {
    changeDialogDisplay("none");
    setapiBody((previousState) => ({
      ...previousState,
      business_code: "",
      cust_number: "",
      clear_date: "",
      business_year: "",
      doc_id: "",
      posting_date: "",
      document_create_date: "",
      due_in_date: "",
      invoice_currency: "",
      document_type: "",
      posting_id: "",
      total_open_amount: "",
      baseline_create_date: "",
      cust_payment_terms: "",
      invoice_id: "",
      new_invoice_currency: "",
      new_cust_payment_terms: "",
    }));
    if (dialogName === "Edit") {
      changeDialogBoxPassingData([]);
      changeeditButtonDisableStatus(true);
      changeDeleteButtonDisableStatus(true);
      changepredictButtonDisableStatus(true);
    } else if (dialogName === "Delete Records ?") {
      changeDialogBoxPassingData([]);
      changeDialogDisplay("none");
      changeeditButtonDisableStatus(true);
      changeDeleteButtonDisableStatus(true);
      changepredictButtonDisableStatus(true);
    }
  };

  const checkBusinessCode = useCallback(async ({ business_code }) => {
    try {
      const response = await API.get(
        `CheckBusiness?business_code="${business_code}"`
      );
      if (response.status === 200) {
        return response.data.isBusinessExists;
      }
    } catch (error) {
      console.log("Some Error Occured");
    }
  }, []);
  const checkCustomerNumber = useCallback(async ({ cust_number }) => {
    try {
      const response = await API.get(
        `CheckCustomer?cust_number="${cust_number}"`
      );
      if (response.status === 200) {
        return response.data.isCustomerExists;
      }
    } catch (error) {
      console.log("Some Error Occured");
    }
  }, []);
  const checkInvoiceAndDocId = useCallback(async ({ doc_id, invoice_id }) => {
    try {
      const response = await API.get(
        `CheckInvoiceidAndDocId?doc_id="${doc_id}"&invoice_id="${invoice_id}"`
      );
      if (response.status === 200) {
        return response.data.isInvoiceOrDocExist;
      }
    } catch (error) {
      console.log("Some Error Occured");
    }
  }, []);
  const addFunction = useCallback(async () => {
    let dataAdditionStatus = false;
    if (
      apiBody.business_code !== "" &&
      apiBody.cust_number !== "" &&
      apiBody.clear_date !== "" &&
      apiBody.business_year !== "" &&
      apiBody.doc_id !== "" &&
      apiBody.posting_date !== "" &&
      apiBody.document_create_date !== "" &&
      apiBody.due_in_date !== "" &&
      apiBody.invoice_currency !== "" &&
      apiBody.document_type !== "" &&
      apiBody.posting_id !== "" &&
      apiBody.total_open_amount !== "" &&
      apiBody.baseline_create_date !== "" &&
      apiBody.cust_payment_terms !== "" &&
      apiBody.invoice_id !== ""
    ) {
      const {
        business_code,
        cust_number,
        clear_date,
        business_year,
        doc_id,
        posting_date,
        document_create_date,
        due_in_date,
        invoice_currency,
        document_type,
        posting_id,
        total_open_amount,
        baseline_create_date,
        cust_payment_terms,
        invoice_id,
      } = apiBody;
      const businessExist = await checkBusinessCode({ business_code });
      const customerExist = await checkCustomerNumber({ cust_number });
      const invoicedocExist = await checkInvoiceAndDocId({
        doc_id,
        invoice_id,
      });

      if (businessExist !== 1) {
        alert(
          "Entered Business Code donot Exist. Please verify your Business Code"
        );
        setapiBody((previousState) => ({
          ...previousState,
          business_code: "",
        }));
      } else if (customerExist !== 1) {
        alert(
          "Entered Customer Number donot Exist. Please verify your Customer Number"
        );
        setapiBody((previousState) => ({ ...previousState, cust_number: "" }));
      } else if (invoicedocExist === 1) {
        alert(
          "Entered Invoice Id or Document Id already Exist. Please provide unique entry to these fields"
        );
        setapiBody((previousState) => ({
          ...previousState,
          invoice_id: "",
          doc_id: "",
        }));
      } else {
        try {
          const response = await API.post(`AddInvoiceEntry`, {
            business_code,
            cust_number,
            clear_date,
            business_year,
            doc_id,
            posting_date,
            document_create_date,
            due_in_date,
            invoice_currency,
            document_type,
            posting_id,
            total_open_amount,
            baseline_create_date,
            cust_payment_terms,
            invoice_id,
          });
          if (response.status === 200) {
            alert("Data Added Successfully");
            dataAdditionStatus = true;
          }
        } catch (error) {
          console.log("Some Error Occured");
        }
      }
      if (dataAdditionStatus) {
        changeCountTotalData(countTotalData + 1);
        changeAdditionStatus(additionStatus + 1);
        changeDialogDisplay("none");
        setapiBody((previousState) => ({
          ...previousState,
          business_code: "",
          cust_number: "",
          clear_date: "",
          business_year: "",
          doc_id: "",
          posting_date: "",
          document_create_date: "",
          due_in_date: "",
          invoice_currency: "",
          document_type: "",
          posting_id: "",
          total_open_amount: "",
          baseline_create_date: "",
          cust_payment_terms: "",
          invoice_id: "",
        }));
      }
    } else {
      alert("Please provide all the requried information for adding the data");
    }
  }, [
    apiBody,
    changeCountTotalData,
    changeDialogDisplay,
    checkBusinessCode,
    checkCustomerNumber,
    checkInvoiceAndDocId,
    changeAdditionStatus,
    countTotalData,
    additionStatus,
  ]);

  const editFunction = useCallback(async () => {
    let sl_no = dialogBoxPassingData[0];
    let dataEditionStatus = false;
    if (
      apiBody.new_invoice_currency !== "" &&
      apiBody.new_cust_payment_terms !== ""
    ) {
      const { new_invoice_currency, new_cust_payment_terms } = apiBody;
      try {
        const response = await API.post(`EditInvoice`, {
          sl_no,
          new_invoice_currency,
          new_cust_payment_terms,
        });
        if (response.status === 200) {
          alert("Data Edited Successfully");
          dataEditionStatus = true;
        }
      } catch (error) {
        alert("Some Error Occured");
      }

      if (dataEditionStatus) {
        changeEditStatus(editStatus + 1);
        changeDialogBoxPassingData([]);
        changeDialogDisplay("none");
        changeeditButtonDisableStatus(true);
        changeDeleteButtonDisableStatus(true);
        changepredictButtonDisableStatus(true);
        changeEditDialogRow([]);
        setapiBody((previousState) => ({
          ...previousState,
          new_invoice_currency: "",
          new_cust_payment_terms: "",
        }));
        if (
          apiBody.doc_id !== "" &&
          apiBody.invoice_id !== "" &&
          apiBody.cust_number !== "" &&
          apiBody.business_year !== ""
        ) {
          searchFunction();
        }
      }
    } else {
      alert("Please provide all the required Information");
    }
  }, [
    apiBody,
    dialogBoxPassingData,
    changeDialogBoxPassingData,
    changeDialogDisplay,
    changeDeleteButtonDisableStatus,
    changeeditButtonDisableStatus,
    changepredictButtonDisableStatus,
    changeEditDialogRow,
    searchFunction,
    changeEditStatus,
    editStatus,
  ]);

  const deleteFunction = useCallback(async () => {
    let delete_list = dialogBoxPassingData;
    let data_deletionStatus = false;
    try {
      const response = await API.delete("DeleteInvoice", {
        data: { delete_list },
      });
      if (response.status === 200) {
        alert("Data Deleted Successfully");
        data_deletionStatus = true;
      }
    } catch (error) {
      alert("Some Error Occured");
    }

    if (data_deletionStatus) {
      if (
        apiBody.doc_id !== "" &&
        apiBody.invoice_id !== "" &&
        apiBody.cust_number !== "" &&
        apiBody.business_year !== ""
      ) {
        searchFunction();
        setapiBody((previousState) => ({
          ...previousState,
          cust_number: "",
          business_year: "",
          doc_id: "",
          invoice_id: "",
        }));
      }
      changeCountTotalData(countTotalData - delete_list.length);
      changeDialogBoxPassingData([]);
      changeDeletionStatus(deletionStatus + 1);
      changeDialogDisplay("none");
      changeeditButtonDisableStatus(true);
      changeDeleteButtonDisableStatus(true);
      changepredictButtonDisableStatus(true);
    }
  }, [
    apiBody,
    dialogBoxPassingData,
    changeDialogBoxPassingData,
    changeCountTotalData,
    changeDeleteButtonDisableStatus,
    changeDialogDisplay,
    changeeditButtonDisableStatus,
    changepredictButtonDisableStatus,
    countTotalData,
    searchFunction,
    changeDeletionStatus,
    deletionStatus,
  ]);
  useEffect(() => {
    setapiBody((previousState) => ({
      ...previousState,
      new_invoice_currency:
        editDialogrow.length !== 0 ? editDialogrow[0].invoice_currency : "",
      new_cust_payment_terms:
        editDialogrow.length !== 0 ? editDialogrow[0].cust_payment_terms : "",
    }));
  }, [editDialogrow, editStatus]);
  useEffect(() => {
    if (isRefreshed > 0) {
      setapiBody({
        business_code: "",
        cust_number: "",
        clear_date: "",
        business_year: "",
        doc_id: "",
        posting_date: "",
        document_create_date: "",
        due_in_date: "",
        invoice_currency: "",
        document_type: "",
        posting_id: "",
        total_open_amount: "",
        baseline_create_date: "",
        cust_payment_terms: "",
        invoice_id: "",
        new_invoice_currency: "",
        new_cust_payment_terms: "",
      });
    }
  }, [isRefreshed]);

  return (
    <div
      className="fixed top-0 left-0 h-screen w-screen items-center justify-center z-50"
      style={{
        display: `${dialogDisplay}`,
        backgroundColor: "rgba(0, 0, 0, 0.75)",
      }}
    >
      <div className="relative border h-auto w-auto m-10 p-5 flex flex-col rounded-md bg-grid">
        <div className="relative text-white m-5 text-2xl">{dialogName}</div>
        <div className={`${grid_col_value_class}`}>
          {actionType !== "DELETE"
            ? dialogElement.map((element, index) =>
                element.type === "text" ? (
                  <TextField
                    InputProps={{ disableUnderline: true }}
                    key={index}
                    name={element.name}
                    label={element.field}
                    type={element.type}
                    variant="standard"
                    value={apiBody[element.name]}
                    onChange={(e) =>
                      setapiBody((previousState) => ({
                        ...previousState,
                        [e.target.name]: e.target.value,
                      }))
                    }
                    required
                    sx={{
                      backgroundColor: "white",
                      margin: "1rem",
                      borderRadius: "0.2rem",
                      paddingLeft: "10px",
                    }}
                  />
                ) : (
                  <LocalizationProvider
                    key={index}
                    dateAdapter={AdapterDateFns}
                  >
                    <DatePicker
                      required
                      label={element.field}
                      InputProps={{
                        disableUnderline: true,
                        color: "white",
                      }}
                      name={element.name}
                      value={apiBody[element.name]}
                      onChange={(newValue) =>
                        setapiBody((previousState) => ({
                          ...previousState,
                          [element.name]: formatDate(newValue),
                        }))
                      }
                      views={["year", "month", "day"]}
                      renderInput={(params) => (
                        <TextField
                          InputLabelProps={{
                            style: { color: "grey" },
                          }}
                          InputProps={{ disableUnderline: true }}
                          required
                          {...params}
                          variant="standard"
                          sx={{
                            backgroundColor: "white",
                            color: "white",
                            // width: "25rem",
                            margin: "1rem",
                            borderRadius: "0.2rem",
                            paddingRight: "10px",
                          }}
                        />
                      )}
                    />
                  </LocalizationProvider>
                )
              )
            : dialogElement.map((element, index) => (
                <b
                  key={index}
                  style={{
                    color: "white",
                    margin: "1rem",
                    borderRadius: "0.2rem",
                    paddingLeft: "10px",
                  }}
                >
                  {element.field}
                </b>
              ))}
        </div>
        <div className="relative m-5 flex flex-1">
          {actionType !== "DELETE" ? (
            <ButtonGroup
              fullWidth
              sx={{ position: "relative", display: "flex", flex: "1" }}
            >
              {actionType === "ADD" ? (
                <ButtonComponent
                  name={actionType}
                  workingFunction={addFunction}
                />
              ) : actionType === "EDIT" ? (
                <ButtonComponent
                  name={actionType}
                  workingFunction={editFunction}
                />
              ) : (
                actionType === "SEARCH" && (
                  <ButtonComponent
                    name={actionType}
                    workingFunction={searchFunction}
                  />
                )
              )}
              <ButtonComponent name="CANCEL" workingFunction={cancelFunction} />
            </ButtonGroup>
          ) : (
            <ButtonGroup
              fullWidth
              sx={{ position: "relative", display: "flex", flex: "1" }}
            >
              <ButtonComponent name="CANCEL" workingFunction={cancelFunction} />
              <ButtonComponent
                name={actionType}
                workingFunction={deleteFunction}
              />
            </ButtonGroup>
          )}
        </div>
      </div>
    </div>
  );
}
export default React.memo(DialogComponent);
