import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { DataGrid } from "@mui/x-data-grid";
import API from "../axios";
import { DialogDisplayContext } from "./StateProvider";

function DataGridComponent() {
  const timeoutClear = useRef();
  const timeoutClear1 = useRef();
  const {
    countTotalData,
    changeCountTotalData,
    changeeditButtonDisableStatus,
    changeDeleteButtonDisableStatus,
    changepredictButtonDisableStatus,
    changeDialogBoxPassingData,
    dialogBoxPassingData,
    searchData,
    searchCustomerExpression,
    pageNumber,
    changePageNumber,
    changeEditDialogRow,
    editStatus,
    additionStatus,
    deletionStatus,
    changePredictRow
  } = useContext(DialogDisplayContext);
  const [displayRows, setdisplayRows] = useState([]);
  // columns for datagrid
  const columns = [
    { field: "sl_no", headerName: "Sl no", width: 60, align: "center" },
    {
      field: "business_code",
      headerName: "Business Code",
      width: 120,
      align: "center",
    },
    {
      field: "cust_number",
      headerName: "Customer Number",
      width: 140,
      align: "center",
    },
    {
      field: "clear_date",
      headerName: "Clear Date",
      width: 110,
      align: "center",
    },
    {
      field: "business_year",
      headerName: "Business Year",
      width: 120,
      align: "center",
    },
    { field: "doc_id", headerName: "Document Id", width: 120, align: "center" },
    {
      field: "posting_date",
      headerName: "Posting Date",
      width: 120,
      align: "center",
    },
    {
      field: "document_create_date",
      headerName: "Document Create Date",
      width: 180,
      align: "center",
    },
    {
      field: "due_in_date",
      headerName: "Due Date",
      width: 100,
      align: "center",
    },
    {
      field: "invoice_currency",
      headerName: "Invoice Currency",
      width: 140,
      align: "center",
    },
    {
      field: "document_type",
      headerName: "Document Type",
      width: 130,
      align: "center",
    },
    {
      field: "posting_id",
      headerName: "Posting Id",
      width: 100,
      align: "center",
    },
    {
      field: "total_open_amount",
      headerName: "Total Open Amount",
      width: 150,
      align: "center",
    },
    {
      field: "baseline_create_date",
      headerName: "Baseline Create Date",
      width: 160,
      align: "center",
    },
    {
      field: "cust_payment_terms",
      headerName: "Customer Payment Terms",
      width: 190,
      align: "center",
    },
    {
      field: "invoice_id",
      headerName: "Invoice Id",
      width: 100,
      align: "center",
    },
    {
      field: "aging_bucket",
      headerName: "Aging Bucket",
      width: 120,
      align: "center",
    },
  ];

  const getAllUiDetails = useCallback(() => {
    if (
      searchData === null &&
      searchCustomerExpression.customer_number === ""
    ) {
      API.get(`GetAllUiDetails?page=${pageNumber}`)
        .then((response) => {
          response.status === 200 && setdisplayRows(response.data);
        })
        .catch((error) => console.log("Some Error Occured"));
    } else if (
      searchCustomerExpression.customer_number === "" &&
      searchData !== null
    ) {
      setdisplayRows(searchData);
    } else if (
      searchData === null &&
      searchCustomerExpression.customer_number !== ""
    ) {
      clearTimeout(timeoutClear.current);
      timeoutClear.current = setTimeout(() => {
        API.get(
          `GetSearchCustomerId?customer_number=${searchCustomerExpression.customer_number}&page=${pageNumber}`
        )
          .then((response) => {
            if (response.status === 200) {
              setdisplayRows(response.data);
            }
          })
          .catch((error) => console.log("Some Error Occured"));
      }, 500);
    }
  }, [pageNumber, searchData, searchCustomerExpression]);

  const getCountUiDetails = useCallback(() => {
    if (
      searchData === null &&
      searchCustomerExpression.customer_number === ""
    ) {
      API.get(`GetCountUIDetails`)
        .then((response) => {
          response.status === 200 &&
            changeCountTotalData(response.data.totalcount);
        })
        .catch((error) => console.log("Some Error Occured"));
    } else if (
      searchCustomerExpression.customer_number === "" &&
      searchData !== null
    ) {
      changeCountTotalData(searchData.length);
    } else if (
      searchCustomerExpression.customer_number !== "" &&
      searchData === null
    ) {
      clearTimeout(timeoutClear1.current);
      timeoutClear1.current = setTimeout(() => {
        API.get(
          `CustomerIdSearchCount?customer_number=${searchCustomerExpression.customer_number}`
        )
          .then((response) => {
            if (response.status === 200) {
              changeCountTotalData(response.data.total_customer_count);
            }
          })
          .catch((error) => console.log("Some Error Occured"));
      }, 500);
    }
  }, [searchData, changeCountTotalData, searchCustomerExpression]);

  const handleButtonStatus = (item) => {
    let length = item.length;
    changeDialogBoxPassingData(item);
    const predict = displayRows.filter((row) => item.includes(row.sl_no));
    changePredictRow(predict);
    if (length > 0) {
      if (length > 1) {
        changepredictButtonDisableStatus(false);
        changeDeleteButtonDisableStatus(false);
        changeeditButtonDisableStatus(true);
      } else {
        changeeditButtonDisableStatus(false);
        changepredictButtonDisableStatus(false);
        changeDeleteButtonDisableStatus(false);
        const selectedRow = displayRows.filter((row) => row.sl_no === item[0]);
        changeEditDialogRow(selectedRow);
      }
    } else {
      changeeditButtonDisableStatus(true);
      changepredictButtonDisableStatus(true);
      changeDeleteButtonDisableStatus(true);
    }
  };
  useEffect(() => {
    getAllUiDetails();
  }, [
    pageNumber,
    editStatus,
    searchData,
    deletionStatus,
    additionStatus,
    searchCustomerExpression,
  ]);

  useEffect(() => {
    getCountUiDetails();
  }, [searchData, searchCustomerExpression]);
  return (
    <div className="relative flex flex-1 h-full w-full mt-0 px-5 bg-grid border-cyan-900">
      <DataGrid
        columns={columns}
        checkboxSelection
        rows={displayRows}
        pageSize={10}
        rowsPerPageOptions={[10]}
        aria-label="string"
        getRowId={(row) => row.sl_no}
        disableExtendRowFullWidth={false}
        paginationMode="server"
        selectionModel={dialogBoxPassingData}
        page={pageNumber - 1}
        rowCount={countTotalData}
        onPageChange={(newPage) => {
          changePageNumber(newPage + 1);
        }}
        onSelectionModelChange={(item) => {
          handleButtonStatus(item);
        }}
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
