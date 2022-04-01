import React, { useCallback, useContext, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import API from "../axios";
import { DialogDisplayContext } from "./StateProvider";

function DataGridComponent() {
  console.log("datagrid");
  const [displayRows, setdisplayRows] = useState([]);
  const [pageNo, setpageNo] = useState(1);
  const [passingData, setpassingData] = useState([]);
  const {
    countTotalData,
    changeCountTotalData,
    changeeditButtonDisableStatus,
    changeDeleteButtonDisableStatus,
    changepredictButtonDisableStatus,
  } = useContext(DialogDisplayContext);

  // columns for datagrid
  const columns = [
    { field: "sl_no", headerName: "Sl no", flex: 1 },
    { field: "business_code", headerName: "Business Code", flex: 1 },
    { field: "cust_number", headerName: "Customer Number", flex: 1 },
    { field: "clear_date", headerName: "Clear Date", flex: 1 },
    { field: "business_year", headerName: "Business Year", flex: 1 },
    { field: "doc_id", headerName: "Document Id", flex: 1 },
    { field: "posting_date", headerName: "Posting Date", flex: 1 },
    {
      field: "document_create_date",
      headerName: "Document Create Date",
      flex: 1,
    },
    { field: "due_in_date", headerName: "Due Date", flex: 1 },
    { field: "invoice_currency", headerName: "Invoice Currency", flex: 1 },
    { field: "document_type", headerName: "Document Type", flex: 1 },
    { field: "posting_id", headerName: "Posting Id", flex: 1 },
    { field: "total_open_amount", headerName: "Total Open Amount", flex: 1 },
    {
      field: "baseline_create_date",
      headerName: "Baseline Create Date",
      flex: 1,
    },
    {
      field: "cust_payment_terms",
      headerName: "Customer Payment Terms",
      flex: 1,
    },
    { field: "invoice_id", headerName: "Invoice Id", flex: 1 },
  ];

  const getAllUiDetails = useCallback(
    () =>
      API.get(`GetAllUiDetails?page=${pageNo}`)
        .then((response) => {
          response.status === 200 && setdisplayRows(response.data);
        })
        .catch((error) => console.log("Some Error Occured")),
    [pageNo]
  );

  const getCountUiDetails = useCallback(
    () =>
      API.get(`GetCountUIDetails`)
        .then((response) => {
          response.status === 200 &&
            changeCountTotalData(response.data.totalcount);
        })
        .catch((error) => console.log("Some Error Occured")),
    [countTotalData]
  );

  const handleButtonStatus = (length) => {
    console.log(length);
    {
      if (length > 0) {
        if (length > 1) {
          changepredictButtonDisableStatus(false);
          changeDeleteButtonDisableStatus(false);
          changeeditButtonDisableStatus(true);
        } else {
          changeeditButtonDisableStatus(false);
          changepredictButtonDisableStatus(false);
          changeDeleteButtonDisableStatus(false);
        }
      } else {
        changeeditButtonDisableStatus(true);
        changepredictButtonDisableStatus(true);
        changeDeleteButtonDisableStatus(true);
      }
    }
  };
  useEffect(() => {
    getAllUiDetails();
    getCountUiDetails();
  }, [pageNo]);
  return (
    <div className="relative flex flex-1 h-full w-full mt-0 mb-10 px-5 bg-grid border-cyan-900">
      <DataGrid
        columns={columns}
        checkboxSelection
        rows={displayRows}
        pageSize={10}
        rowsPerPageOptions={[10]}
        aria-label="string"
        getRowId={(row) => row.sl_no}
        autoHeight
        disableExtendRowFullWidth={false}
        paginationMode="server"
        pagination
        rowCount={countTotalData}
        onPageChange={(newPage) => {
          setpageNo(newPage + 1);
        }}
        onSelectionModelChange={(item) => handleButtonStatus(item.length)}
        sx={{
          color: "white",
          border: "none",
          width: 1,
          backgroundColor: "#283d4a",
        }}
      />
    </div>
  );
}

export default React.memo(DataGridComponent);
