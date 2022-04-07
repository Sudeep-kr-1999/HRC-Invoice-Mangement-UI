import { TextField } from "@mui/material";
import React, { useCallback, useContext, useState } from "react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import ButtonComponent from "./ButtonComponent";
import ButtonGroup from "@mui/material/ButtonGroup";
import { DialogDisplayContext } from "./StateProvider";
import API from "../axios";

function DialogComponent({ dialogName, dialogElement }) {
  let isBusinessCodeExist;
  let isCustomerNumberExist;
  let isInvoiceIdorDocIdExist;
  const [apiBody, setapiBody] = useState({
    business_code: "U001",
    cust_number: "200704045",
    clear_date: "2022-03-13",
    business_year: "2022",
    doc_id: "1938001531",
    posting_date: "2022-03-13",
    document_create_date: "2022-03-13",
    due_in_date: "2022-03-13",
    invoice_currency: "USD",
    document_type: "RV",
    posting_id: "1",
    total_open_amount: "1998.64",
    baseline_create_date: "2022-03-13",
    cust_payment_terms: "NAA8",
    invoice_id: "1930702251",
    customer_number: "200704045",
    sl_no: "48580",
    new_invoice_currency: "INR",
    new_cust_payment_terms: "ABCD",
  });
  console.log("dialogcomponent");
  const {
    dialogDisplay,
    changeDialogDisplay,
    dialogBoxPassingData,
    changeDialogBoxPassingData,
    searchData,
    changeSearchData,
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

  const formatDate = useCallback(
    (date) => {
      var d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [year, month, day].join("-");
    },
    [
      apiBody.clear_date,
      apiBody.posting_date,
      apiBody.document_create_date,
      apiBody.baseline_create_date,
    ]
  );

  const cancelFunction = () => {
    changeDialogDisplay("none");
    changeDialogBoxPassingData([]);
  };

  const checkBusinessCode = useCallback(
    async ({ business_code }) => {
      try {
        const response = await API.get(
          `CheckBusiness?business_code="${business_code}"`
        );
        if (response.status === 200) {
          isBusinessCodeExist = response.data.isBusinessExists;
        }
      } catch (error) {
        console.log("Some Error Occured");
      }
    },
    [apiBody.business_code]
  );
  const checkCustomerNumber = useCallback(
    async ({ cust_number }) => {
      try {
        const response = await API.get(
          `CheckCustomer?cust_number="${cust_number}"`
        );
        if (response.status === 200) {
          isCustomerNumberExist = response.data.isCustomerExists;
        }
      } catch (error) {
        console.log("Some Error Occured");
      }
    },
    [apiBody.cust_number]
  );
  const checkInvoiceAndDocId = useCallback(
    async ({ doc_id, invoice_id }) => {
      try {
        const response = await API.get(
          `CheckInvoiceidAndDocId?doc_id="${doc_id}"&invoice_id="${invoice_id}"`
        );
        if (response.status === 200) {
          isInvoiceIdorDocIdExist = response.data.isInvoiceOrDocExist;
        }
      } catch (error) {
        console.log("Some Error Occured");
      }
    },
    [apiBody.doc_id, apiBody.invoice_id]
  );
  const addFunction = useCallback(async () => {
    console.log("addfunction");
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

    console.log(apiBody);
    await checkBusinessCode({ business_code });
    await checkCustomerNumber({ cust_number });
    await checkInvoiceAndDocId({ doc_id, invoice_id });
    console.log(
      isBusinessCodeExist,
      isCustomerNumberExist,
      isInvoiceIdorDocIdExist
    );
    if (isBusinessCodeExist !== 1) {
      alert(
        "Entered Business Code donot Exist. Please verify your Business Code"
      );
    } else if (isCustomerNumberExist !== 1) {
      alert(
        "Entered Customer Number donot Exist. Please verify your Customer Number"
      );
    } else if (isInvoiceIdorDocIdExist === 1) {
      alert(
        "Entered Invoice Id or Document Id already Exist. Please provide unique entry to these fields"
      );
    } else {
      API.post(`AddInvoiceEntry`, {
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
      })
        .then((response) => {
          response.status === 200 && alert("Data Added Successfully");
        })
        .catch((error) => console.log("Some Error Occured"));
    }
  }, [apiBody]);

  const editFunction = useCallback(() => {
    console.log("editfunction");
    console.log(dialogBoxPassingData);
    changeDialogBoxPassingData([]);
  }, [apiBody]);

  const deleteFunction = useCallback(() => {
    console.log(dialogBoxPassingData);
    changeDialogBoxPassingData([]);
  }, [dialogBoxPassingData]);
  const searchFunction = useCallback(() => {
    console.log("searchfunction");
  }, [apiBody]);

  return (
    <div
      className="fixed top-0 left-0 h-screen w-screen items-center justify-center z-10"
      style={{ display: `${dialogDisplay}` }}
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
                      // width: "25rem",
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
                      label={element.field}
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
                          label={element.field}
                          name={element.name}
                          InputProps={{ disableUnderline: true }}
                          required
                          {...params}
                          variant="standard"
                          sx={{
                            backgroundColor: "white",
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
